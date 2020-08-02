import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import SidebarItem from '../sidebaritem/SidebarItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import StarIcon from '@material-ui/icons/Star';


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
      open: false,
      notes: null

    };
  }
  render() {

    const { notebooks, classes, selectedNotebookIndex } = this.props;

    if (notebooks) {
      return (
        <div className={classes.sidebarContainer} style={{ backgroundColor: '#fff', padding: '0px 0px' }}>

          <div style={{ display: 'flex', padding: "10px 10px", justifyContent: 'space-around' }}>

            <Typography style={{ fontWeight: "bold" }}>
              <h2 style={{ marginTop: "9px" }} >Notes</h2>
            </Typography>

            <Tooltip title="Add" aria-label="add" onClick={this.newNoteBtnClick} style={{ padding: '50px' }} >
              <Fab color="primary" style={{ cursor: "pointer" }} >
                <AddIcon />
              </Fab>
            </Tooltip>

          </div>
          <Divider ></Divider>
          <div style={{ height: '50%', overflowY: 'auto' }} >
            <List  >

              {
                notebooks.map((_note, _index) => {
                  return (
                    <div key={_index}>
                      <SidebarItem
                        _note={_note}
                        _index={_index}
                        selectedNotebookIndex={selectedNotebookIndex}
                        selectNotebook={this.selectNotebook}
                        //  deleteNote = {this.deleteNote}
                        deleteNotebook={this.deleteNotebook}
                        selectNote={this.selectNote}
                      >
                      </SidebarItem>
                    </div>
                  )
                })
              }
            </List>


            <Divider></Divider>
            {
              this.state.addingNote ?
                <div>
                  <input type='text'
                    className={classes.newNoteInput}
                    placeholder='Note Title'
                    onKeyUp={(e) => this.updateTitle(e.target.value)}>
                  </input>
                  <Button
                    className={classes.newNoteSubmitBtn}
                    onClick={this.newNotebook}>Add Note</Button>
                </div> :
                null
            }

          </div>
          <div style={{ overflowY: 'auto' }} >


            <List>

              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <StarBorder />
=        </ListItemIcon>
                <ListItemText primary="Favourate" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                {
                  this.state.notes ? (
                    this.state.notes.map(note => {
                      return (
                        <List component="div" disablePadding>
                          <ListItem button className={classes.nested}
                            onClick={() => { this.selectNote(note, note.id) }}
                          >
                            <ListItemIcon>
                              <StarIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary={note.title} />
                          </ListItem>
                        </List>
                      )
                    })
                  ) : (
                      <div style={{ marginLeft: "100px" }}>
                        <CircularProgress />
                      </div>
                    )
                }

              </Collapse>
            </List>
            <Divider></Divider>
          </div>
        </div>
      );
    } else {

      return (null);
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
    firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .where('bookmark', '==', true)
      .onSnapshot(serverUpdate => {
        console.log(serverUpdate);

        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          console.log(data);
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ notes: notes });
        console.log(notes);
      });


  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }

  updateTitle = (txt) => {
    this.setState({ title: txt });
  }

  newNotebook = () => {
    this.props.newNotebook(this.state.title);
    this.setState({ title: null, addingNote: false });
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNotebook = (note) => this.props.deleteNotebook(note);

  selectNotebook = (n, i) => this.props.selectNotebook(n, i)

}

export default withStyles(styles)(Sidebar);
