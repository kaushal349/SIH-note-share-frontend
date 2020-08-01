import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from 'firebase';
import  Bar  from './components/navBar';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Logo from "./Blogpost.png";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notebooks : null,
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      tagNotes : null,
      tags : "",
      selectedNotebook : null,
      selectedNotebookIndex : null
      };

  }

  render() 
  {
    return (

      <div className="app">
        
        <div className="app-container">
              
          < Bar 
          selectNote = {this.selectNote} />
       
          <Sidebar
            selectedNotebookIndex={this.state.selectedNotebookIndex}
            notebooks={this.state.notebooks}
            deleteNotebook={this.deleteNotebook}
            selectNotebook={this.selectNotebook}
            selectNote = {this.selectNote}
            newNotebook={this.newNotebook}>
          </Sidebar>

          {
            this.state.selectedNote ?
              <Editor 
                selectedNote={this.state.selectedNote}
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                noteUpdate={this.noteUpdate}>
                </Editor> :
                <div style = {{marginLeft: "300px",display : 'flex',justifyContent : 'center'}}>
                  <img src={Logo} alt="background"   />
                </div>
                        
          }
        </div>
          

      </div>

    );
  }
  componentDidMount = () => {


    firebase
      .firestore()
      .collection("notebooks")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notebooks")
      .onSnapshot(serverUpdate => {
        console.log(serverUpdate);

        const notebook = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          console.log(data);
          data['id'] = _doc.id;


          return data;

        });
        this.setState({ notebooks : notebook });
        //this.setState({tagNotes : notes})
      console.log(notebook);
      });

  }



  selectNote = (note, index) => {
    console.log(note,index);
    this.setState({ selectedNoteIndex: index, selectedNote: note });
}
  selectNotebook = (note, index) => {
  console.log(index,note);
  this.setState({ selectedNotebookIndex : index, selectedNotebook : note });
  }
  
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        tags : noteObj.tags,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  newNotebook = async (title) => {
    const notebook = {
      title: title,
    };
    const newFromDB = await firebase
      .firestore()
      .collection("notebooks")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notebooks")
      .add({
        title: notebook.title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notebooks: [...this.state.notebooks, notebook] });
    const newNotebookIndex = this.state.notebooks.indexOf(this.state.notebooks.filter(_note => _note.id === newID)[0]);

    this.setState({ selectedNotebook: this.state.notebooks[newNotebookIndex], selectedNoteIndex: newNotebookIndex });
  }


  
  deleteNotebook = async (note) => {
    const noteBookIndex = this.state.notebooks.indexOf(note);
    await this.setState({ notebooks : this.state.notebooks.filter(_note => _note !== note) });
    if (this.state.selectedNotebookIndex === noteBookIndex) {
      this.setState({ selectedNotebookIndex: null, selectedNotebook: null });
    } 
    else {
      this.state.notesbooks.length > 1 ?
        this.selectNotebook(this.state.notebooks[this.state.selectedNotebookIndex - 1], this.state.selectedNotebookIndex - 1) :
        this.setState({ selectedNotebookIndex : null, selectedNotebook : null });
    }

    firebase
      .firestore()
      .collection("notebooks")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notebooks")
      .doc(note.id)
      .delete();


      //delete notes correspomding to notebooks
     var delete_note = firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .where("notebookID", "==", note.id);

      delete_note.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          doc.ref.delete();
        });
      });

  }
}

export default App;