const styles = theme => ({
  active : {
    backgroundColor : '',
  },
  listItem: {
      cursor: 'pointer',

      '&:hover': {
        borderRight: '5px solid #2ecc71'
      },
 
    
    },
    textSection: {
      maxWidth: '100%'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '5px',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    },
    addIcon : {
    }
  });
  
  export default styles;