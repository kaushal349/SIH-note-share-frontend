import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from 'firebase';
import  Bar  from './components/navBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Logo from "./Blogpost.png";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      };

  }

  render() 
  {
    return (

      <div className="app">
        <div className="app-container">
        <CssBaseline />
          
          < Bar />

          <Sidebar
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote}>
          </Sidebar>

          {
            this.state.selectedNote ?
              <Editor selectedNote={this.state.selectedNote}
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                noteUpdate={this.noteUpdate}>
                </Editor> :
                <img src={Logo} alt="background"  style = {{marginLeft: "20%"}}/>         
                 }
        </div>
      </div>

    );
  }
  componentDidMount = () => {


    firebase
      .firestore()
      .collection("users")
      .doc(this.props.Uid)
      .collection("notes")
      .onSnapshot(serverUpdate => {
        console.log(serverUpdate);

        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          console.log(data);
          data['id'] = _doc.id;

          return data;

        });
        this.setState({ notes: notes });
      });
  }


  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.Uid)
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.Uid)
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection("users")
      .doc(this.props.Uid)
      .collection("notes")
      .doc(note.id)
      .delete();
  }
}

export default App;