import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles'
import firebase from 'firebase'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';



export class Bar extends Component {
constructor(props) {
  super(props)

  this.state = {
     tag : ""
  }
}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} >
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Notify
							</Typography>

              <form style = {{marginLeft : "auto", display : "flex"}} noValidate autoComplete="off">
              <TextField size = "small" id="filled-basic" label="Search..." variant="filled"   placeholder="Search.." name="search" onKeyDown = {  e => this.setState({ tag : e.target.value })}/>
              <SearchIcon style = {{fontSize: "40px"}}/>
              </form>

            <div className={classes.profileIcon}>
              <Avatar src={firebase.auth().currentUser.photoURL}>
              </Avatar>
              <h4 style={{ color: "white", padding: "8px 8px" }}>
                {firebase.auth().currentUser.displayName}
              </h4>

            </div>
            <button className={classes.signOut}
              onClick={() => firebase.auth().signOut()}>
              <ExitToAppIcon />
              <h4 style={{ color: "white" }}>LogOut!</h4>
            </button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Bar);
