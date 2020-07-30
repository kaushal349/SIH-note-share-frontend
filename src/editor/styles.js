const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 5px black'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '20px',
      width: 'calc(100% - 300px)',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px',
    },
    editIcon: {
      position: 'absolute',
      left: '310px',
      top: '80px',
      color: 'white',
      width: '5',
      height: '5'
    },
    editorContainer: {
      height: '720px',
      boxSizing: 'border-box',
      //marginTop : '60px'

    }
  });
  
  export default styles;