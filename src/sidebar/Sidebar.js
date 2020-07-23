import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import SidebarItem from '../sidebaritem/SidebarItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';



class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }
  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer} style={{ backgroundColor: '#fff', padding: '0px 0px' }}>

          <Typography style={{ fontWeight: "bold", padding: "10px 10px", display: "flex" }}>
            <h2 style = {{marginTop : "9px"}} >Notes</h2>

            {/* <AddIcon style={{ marginLeft: "auto", fontSize: "30px", marginTop: "4px", cursor: "pointer" }}
              onClick={this.newNoteBtnClick}
              className={classes.newNoteBtn}
            /> */}
            
            <Tooltip title="Add" aria-label="add"  onClick={this.newNoteBtnClick}  >
              <Fab color="primary" style={{ marginLeft: "auto", marginTop: "4px", cursor: "pointer"}} >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Typography>
          <Divider ></Divider>
          <List >

            {
              notes.map((_note, _index) => {
                return (
                  <div key={_index}>
                    <SidebarItem
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}>
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
                  onClick={this.newNote}>Add Note</Button>
              </div> :
              null
          }
        </div>
      );
    } else {

      return (<div></div>);
    }
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }
  updateTitle = (txt) => {
    this.setState({ title: txt });
  }
  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  }
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (note) => this.props.deleteNote(note);

}

export default withStyles(styles)(Sidebar);
