import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import React, { Component } from 'react'

class Editor extends Component {
    constructor() {
      super();
      this.state = {
        text: '',
        title: '',
        id: ''
      };
    }
  
    componentDidMount = () => {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNoteIndex
      });
    }
  
    componentDidUpdate = () => {
      if(this.props.selectedNoteIndex !== this.state.id) {
        this.setState({
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNoteIndex
        });
      }
    }
  
    render() {
  
      const { classes } = this.props;
  
      return(
        <div className={classes.editorContainer}>
          <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
          <input
            className={classes.titleInput}
            placeholder='Note title...'
            value={this.state.title ? this.state.title : ''}
            onChange={(e) => this.updateTitle(e.target.value)}>
          </input>
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
        body: this.state.text
      })
    }, 1500);
  }
  
  export default withStyles(styles)(Editor);

  Editor.modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       
      ['blockquote', 'code-block'],
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] },{ 'align' : []}],
      [{size: []}],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
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
    'header', 'font', 'size','code-block',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent','color','background',
    'image' , 'video','clean'
  ]
  
