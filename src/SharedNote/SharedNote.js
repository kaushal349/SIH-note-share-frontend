import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { GridLoader } from "react-spinners";
import ReactHtmlParser from 'react-html-parser';

import Logo from "../notify.png";


class SharedNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      noteID: "",
      title: "",
      username: "",
      body: "Loading .........",
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({ noteID: this.props.match.params.id });
    axios
      .get("http://3.236.246.163:3000/notes/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState(
          {
            username: response.data.username,
            title: response.data.title,
            body: response.data.body,
          },
          () => {
            this.setState({ loaded: true });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? (
          <div className="container py-3">
            <div
              className="px-3 py-3 rounded d-flex"
              style={{ backgroundColor: "#3f51b5", color: "#fff" }}
            >
              <div>
                <img src={Logo} alt="" height="100px" />
              </div>
              <div className="pl-5 d-flex align-items-center">
                <blockquote className="blockquote my-auto">
                  <p className="mb-0 font-weight-bold text-uppercase" style={{fontSize:"1.8em"}}>
                    {this.state.title}
                  </p>
                  <footer className="blockquote-footer text-white">
                    Shared by: -{" "}
                    <cite title="Source Title">{this.state.username}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="pt-5" style={{overflowY: "auto", height: "800px"}}>{ReactHtmlParser(this.state.body)}</div>
          </div>
        ) : (
          <React.Fragment>
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <GridLoader size={15} color={"#3f51b5"} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default SharedNote;
