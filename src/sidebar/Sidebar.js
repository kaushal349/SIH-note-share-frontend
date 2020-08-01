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

    const { notebooks , classes, selectedNotebookIndex } = this.props;

    if (notebooks) {
      return (
        <div className={classes.sidebarContainer} style={{ backgroundColor: '#fff', padding: '0px 0px' }}>

<div style = {{display : 'flex',padding: "10px 10px"}}>

<Typography style={{ fontWeight: "bold", display: "flex" }}>
            <h2 style = {{marginTop : "9px"}} >Notes</h2>

            {/* <AddIcon style={{ marginLeft: "auto", fontSize: "30px", marginTop: "4px", cursor: "pointer" }}
              onClick={this.newNoteBtnClick}
              className={classes.newNoteBtn}
            /> */}
             </Typography>
            <Tooltip title="Add" aria-label="add"  onClick={this.newNoteBtnClick}  >
              <Fab color="primary" style={{ marginLeft: "auto", cursor: "pointer"}} >
                <AddIcon />
              </Fab>
            </Tooltip>
</div>



         
         

          <Divider ></Divider>
          <List >

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
                      deleteNotebook= {this.deleteNotebook}
                      selectNote = {this.selectNote}
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
  newNotebook = () => {
    this.props.newNotebook(this.state.title);
    this.setState({ title: null, addingNote: false });
  }
  
  selectNote = (n, i) => this.props.selectNote(n, i);
  
  deleteNotebook = (note) => this.props.deleteNotebook(note);

  selectNotebook = (n, i) => this.props.selectNotebook(n , i )

}

export default withStyles(styles)(Sidebar);
