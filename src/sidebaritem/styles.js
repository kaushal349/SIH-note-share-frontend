const styles = theme => ({

  nested: {
    paddingLeft: theme.spacing(4),
    cursor: 'pointer',

    '&:hover': {
      borderLeft: '5px solid #2ecc71'
    },
  },
  active : {
    backgroundColor : '',
  },
  listItem: {
      cursor: 'pointer',

      '&:hover': {
        borderLeft: '5px solid #2ecc71'
      },
 
    
    },
    textSection: {
      maxWidth: '100%'
    },  
    deleteIcon: {
      right: '5px',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    },
    AddIcon : {
      right: '5px',
      '&:hover': {
        color: 'green'
      }
    },

    list : {
    color: "grey", 
      '&:hover' : {
        color : "black"
      }
    }
  });
  
  export default styles;