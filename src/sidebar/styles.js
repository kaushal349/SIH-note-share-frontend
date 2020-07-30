const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: ' var(--box-shadow)',
      fontFamily : 'Oxygen',
    },

    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    // newNoteBtn: {
    //    borderRadius: '50px',
    //    backgroundColor: '#2979ff'
    //    '&:hover': {
         
    //     }
    // },
    fab: {
      margin: theme.spacing(2),
    },
    sidebarContainer: {
      //marginTop: '70px',
      width: '300px',
      height: '720px',
      boxSizing: 'border-box',
      float: 'left',
      overflowY: 'hidden',
      overflowX: 'auto',
      boxShadow: '3px 3px 5px #9E9E9E',

    },
    newNoteInput: {
      width: '100%',
      margin: '0px',
      height: '40px',
      outline: 'none',
      border: 'none',
      paddingLeft: '10px',
      '&:focus': {
        outline: '3px solid rgba(81, 203, 238, 1)'
      }
    },
    newNoteSubmitBtn: {
      width: '100%',
      backgroundColor: '#3f51b5',
      borderRadius: '0px',
      color: 'black',
      '&.hover' : {
        backgroundColor : '#3f51b5'
      }
    },
  });
  
  export default styles;