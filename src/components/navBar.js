import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import withStyles from '@material-ui/core/styles/withStyles';
//import styles from './styles'
import firebase from 'firebase'
//import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import { Avatar } from '@material-ui/core';
//import SearchIcon from '@material-ui/icons/Search';
//import TextField from '@material-ui/core/TextField';

import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import InputBase from '@material-ui/core/InputBase';
//import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import MenuIcon from '@material-ui/icons/Menu';
//import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import MailIcon from '@material-ui/icons/Mail';
//import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Select } from 'antd';
import { Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option ,OptGroup } = Select;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //const [value_notes, setValue] = useState(null)
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false)




  // function onChange(value) {
  //   console.log(`selected ${value}`);
  // }

  function onselect(id){
console.log(id);
 

firebase
 .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .doc(id)
      .onSnapshot(doc => {
          const data =  doc.data()
          props.selectNote(data,id)
        })  


  }
  const onSearch = debounce(function onSearch (val) {

    setFetching(!fetching)

    console.log(fetching);
    firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .where('tags', 'array-contains', val)
      .onSnapshot(serverUpdate => {
        console.log(serverUpdate);

        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          console.log(data);
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        setData(notes)
        setFetching(!fetching)

      })
  }, 800)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem >{firebase.auth().currentUser.displayName}</MenuItem>
      <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>

        <p>{firebase.auth().currentUser.displayName}</p>

      </MenuItem>

      <MenuItem onClick={() => firebase.auth().signOut()}>

        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            Notify

          </Typography>
          <div className={classes.search} style={{ width: "300px" }}>
            <Select
              mode="tags"
              // value={value}
              placeholder="Select notes"
              notFoundContent={fetching === true ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={onSearch}
              onSelect = {onselect}
              //onChange={onChange}
              style={{ width: '100%' }}
            >
              {
                data.map(d => (
                  <OptGroup label="Notes">
                  <Option style = {{color : 'black'}} key= {d.id}>{d.title}</Option>
                  </OptGroup>
                  )
                )

              }
            </Select>
          </div>



          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}



// export class Bar extends Component {
// constructor(props) {
//   super(props)

//   this.state = {
//      tag : ""
//   }
// }
// onFill = () =>{
//   this.props.selectTags(this.state.tag)
// }


//   render() {
//     const { classes } = this.props;
//     return (
//       <div className={classes.root} >
//         <CssBaseline />
//         <AppBar position="fixed" className={classes.appBar}>
//           <Toolbar>
//             <Typography variant="h6" noWrap>
//               Notify
// 							</Typography>

//               <form style = {{marginLeft : "auto", display : "flex"}} noValidate autoComplete="off">
//               <TextField size = "small" id="filled-basic" label="Search..." 
//               variant="filled"   
//               placeholder="Search.." 
//               name="search" 
//               onChange = {  e => this.setState({ tag : e.target.value })} 
//               //onChange = {this.props.selectTags(this.state.tag)} 
//               />
//               <SearchIcon  onClick = {this.onFill} style = {{fontSize: "30px" , marginTop : "8px" , cursor : "pointer"}}/>
//               </form>

//             <div className={classes.profileIcon}>
//               <Avatar src={firebase.auth().currentUser.photoURL}>
//               </Avatar>
//               <h4 style={{ color: "white", padding: "8px 8px" }}>
//                 {firebase.auth().currentUser.displayName}
//               </h4>

//             </div>
//             <button className={classes.signOut}
//               onClick={() => firebase.auth().signOut()}>
//               <ExitToAppIcon />
//               <h4 style={{ color: "white" }}>LogOut!</h4>
//             </button>
//           </Toolbar>
//         </AppBar>
//       </div>
//     )
//   }
// }

// export default withStyles(styles)(Bar);
