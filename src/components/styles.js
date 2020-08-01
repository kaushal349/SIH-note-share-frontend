const styles = (theme) => ({
	root: {
        display: 'flex',
  },

	appBar: {
		zIndex: theme.zIndex.drawer + 1
    },
    signOut:{
        backgroundColor:"#3f51b5",
        border: "none",
        borderRadius : "50px",
        color:" white",
        textAlign: "center",
        fontSize: "16px",
        margin: "4px 4px",
        opacity: "1",
        transition: "0.3s",
        marginLeft : "auto",
        display:"flex",
        cursor : "pointer",
        '&:hover': {
            opacity: '0.6'
          }
    },
    profileIcon: {
      display: "flex",
      marginLeft : "60%",
      marginRight : "10px"
    },

    searchIcon : {
      backgroundColor : "#3f51b5",
      display : "flex",
      marginLeft: "auto",
      border : "none",
      padding: "4px 4px",

    },
    searchBar: { 
      backgroundColor : "#3f51b5",
    },
    title : {
      fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    },
	
	toolbar: theme.mixins.toolbar
});

export default styles