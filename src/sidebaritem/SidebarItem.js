import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
//import { removeHTMLTags } from '../helpers';
import { Typography, ListItemIcon, } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';

class SidebarItem extends Component {

    render() {

        
      const { _index, _note, classes, selectedNoteIndex } = this.props;
  
      return(
        <div key={_index}>

          <ListItem 

            className = {selectedNoteIndex === _index ? classes.active : classes.listItem}
            alignItems='flex-end'
              button key = "title" onClick={() => this.selectNote(_note, _index)}>
                  <ListItemIcon>
                    <NotesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary = {<Typography type = "body2" style={{color : 'black'}}> {_note.title}</Typography>}
                  >
                  </ListItemText>

              <ListItemIcon>
                <DeleteIcon onClick={() => this.deleteNote(_note)}
                className={classes.deleteIcon}></DeleteIcon>
              </ListItemIcon>
              
          </ListItem>
        </div>
      );
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => {
      if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
        this.props.deleteNote(note);  
      }
    }
  
  }
  
  export default withStyles(styles)(SidebarItem);
