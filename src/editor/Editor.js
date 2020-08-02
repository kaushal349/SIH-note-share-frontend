import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import { Typography } from '@material-ui/core';
import { Select, Button } from 'antd';


class Editor extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: '',
      tags: '',
      fired: false,
      tag: ''

    };
  }



  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNoteIndex,
      tags: this.props.selectedNote.tags
    });
  }

  componentDidUpdate = () => {
    if (this.props.selectedNoteIndex !== this.state.id) {
      console.log('fired');
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNoteIndex,
        tags: this.props.selectedNote.tags,
      });
    }
  }

  render() {

    const { classes } = this.props;


    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>

        <Grid item xs={12} className={classes.titleInput}>
          <Input
            autoFocus="true"
            style={{ color: "white", width: "200px" }}
            placeholder='Note title...'
            value={this.state.title ? this.state.title : ''}
            onChange={(e) => this.updateTitle(e.target.value)}>
          </Input>


          {
            <div style={{ display: "flex", marginLeft: "200px" , justifyContent : 'space-around'  }} >
            
            <Typography style={{ paddingTop: "10px" }}>
              Tags :
  </Typography>


            <Select mode="tags" style={{ width: '300px', marginLeft: "5px", marginTop: "5px" }} placeholder="Tags"
              onChange={this.handleChange}
              allowClear = {true}
              value={this.state.tags ? this.state.tags : null }
            >
            </Select>

            <Button>
              Go to link
            </Button>
          </div>
          }


        </Grid>
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}>
        </ReactQuill>
      </div>
    );
  }

  
  handleChange = async (value) => {
    await this.setState({ tags: value });
    this.update();
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };
  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
  }
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
      tags: this.state.tags
    })
  }, 1500);
}

export default withStyles(styles)(Editor);

Editor.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }, { 'align': [] }],
    [{ size: [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size', 'code-block',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'color', 'background',
  'image', 'video', 'clean'
]

// chrome.browserAction.onClicked.addListener(function(activeTab){
//   var newURL = "http://stackoverflow.com/";
//   chrome.tabs.create({ url: newURL });
// });