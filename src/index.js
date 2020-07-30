import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
// import { firestore } from 'firebase';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { CircularProgress } from "@material-ui/core";


const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth')

var firebaseConfig = {
  apiKey: "AIzaSyCDEIkb3liTJxSdPi0wQ76Xq1YJ0jx8D6I",
  authDomain: "biblography-6adfa.firebaseapp.com",
  databaseURL: "https://biblography-6adfa.firebaseio.com",
  projectId: "biblography-6adfa",
  storageBucket: "biblography-6adfa.appspot.com",
  messagingSenderId: "192403779073",
  appId: "1:192403779073:web:3ab4c8d77df20091cc5a00",
  measurementId: "G-SB2KC6FQCN"
};
firebase.initializeApp(firebaseConfig);


class Index extends Component {

  state = {
    isSignedIn: false,
    uid: ""
  }
  uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
        this.setState({ uid: user.uid })
      })
  }


  render() {
    return (
      <div>
        {this.state.isSignedIn ? (

          console.log("signed in"),
          console.log(this.state.uid),
          (this.state.uid !== "" ? (
            <App Uid={this.state.uid} />
          ) : (<CircularProgress />)

          )
        ) : (
            <div className = "banner" >
              <div className = "layer">
              <p className = "title">Notify</p>
              <p className="line anim-typewriter">Make Notes Like Never before !!</p>
              <StyledFirebaseAuth className="auth"
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
              </div>
            

            </div>

          )}

      </div>
    )
  }
}

export default Index

ReactDOM.render(
  <Index />, document.getElementById("root")
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
