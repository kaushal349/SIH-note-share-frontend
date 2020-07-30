import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
//import { removeHTMLTags } from '../helpers';
import { Typography, ListItemIcon, } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase';
import { Modal, Input, Form } from 'antd';
import List from '@material-ui/core/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import StarBorder from '@material-ui/icons/StarBorder';
import { Popover, Button } from 'antd';
import { Select } from 'antd';
import { message } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
import BookIcon from '@material-ui/icons/Book';

class SidebarItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      notes: null,
      selectNotebookid: null,
      selectedNoteIndex: null,
      selectNoteid: null,
      selectedNote: null,
      selectedNotebook: null,
      visible: false,
      tags: null
    }
  }

  onFinish = (values) => {
    console.log('Success:', values);
    this.newNote(values.title, this.state.tags)
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

  };


  handleClick = async (note) => {
    console.log(note.id);


    this.setState({ open: !this.state.open });

    firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .where('notebookID', '==', note.id)
      .onSnapshot(serverUpdate => {
        console.log(serverUpdate);

        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          console.log(data);
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ notes: notes });
        console.log(notes);
      });

    await this.setState({ selectNotebookid: note.id });
    // console.log(this.state.selectNotebookid);

  };

  render() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    const { _index, _note, classes, selectedNotebookIndex } = this.props;
    const title = (
      <div>
        <Input placeholder="title"
          onChange={(e) => this.titleUpdate(e.target.value)} />
      </div>
    );
    const content = (
      <div >
        {/* <Popover content={title} title="Title" trigger="click">

          <li style={{ display: "flex", cursor: "pointer" }}
            className={classes.list} >
            <EditIcon />
          Edit
        </li>
        </Popover> */}

        <li style={{ display: "flex", cursor: "pointer" }} className={classes.list} onClick={() => {
          this.setState({ visible: true, open: false })
        }}>
          <AddIcon
          />
          Add
          </li>
        <>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            closable={true}
            okButtonProps={{ style: { display: 'none' } }}
          >
            <Form
              onFinish={this.onFinish}
            >
              <Form.Item label="Title" name="title"
                rules={[{ required: true, message: 'Please enter the title !' }]}>
                <Input placeholder="Enter" />
              </Form.Item>
              <Form.Item label="Tags" name="tags">
                <Select mode="tags" style={{ width: '90%' }} placeholder="Tags Mode" onChange={(values) => this.setState({ tags: values })} >
                </Select>,
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit" onClick={() => this.setState({ visible: false })}>
                  Submit
                  </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>




        <li style={{ display: "flex", cursor: "pointer" }}
          className={classes.list}
          onClick={() => this.deleteNotebook(_note)} >
          <DeleteIcon />
          Delete
        </li>

      </div>
    );

    return (
      <div key={_index}>
        <ListItem

          className={selectedNotebookIndex === _index ? classes.active : classes.listItem}
          alignItems='flex-end'
          button key="title"
          onClick={() => this.selectNotebook(_note, _index)}
        >
          <ListItemIcon>
            <BookIcon style={{ minWidth: "40px" }} />
          </ListItemIcon>
          <ListItemText

            primary={<Typography type="body2" style={{ color: 'black' }}> {_note.title}</Typography>}
          >

          </ListItemText>



          <ListItemIcon style={{ display: "flex" }}>

            <Popover placement="right" content={title} trigger="hover">
              <EditIcon />
            </Popover>

            {this.state.open ? <ExpandLess /> : <ExpandMore />}

            <Popover placement="right" content={content} trigger="click">
              <MoreVertIcon />
            </Popover>
          </ListItemIcon>
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit collapsedHeight="0px">


          {this.state.notes ?

            (this.state.notes.map((data, index) => {
              console.log(data);
              return (
                <List key={index} component="div" disablePadding>
                  <ListItem button className={classes.nested}
                    onClick={() => this.selectNote(data, data.id)}>
                    <ListItemIcon>
                      <NotesIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                      <Typography>
                        {data.title}
                      </Typography>
                    }
                    
                      secondary={
data.timestamp ? (
  <div >
  <Typography>

   {data.timestamp.toDate().toLocaleDateString(undefined , options)}
 </Typography>


</div>
) : (
  null
)

                      }
                    />
                    <ListItemIcon>
                      <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={() => this.deleteNote(data, index)} />
                    </ListItemIcon>
                  </ListItem>
                </List>
              )

            })) : (
              <div style={{ marginLeft: "100px" }}>
                <CircularProgress />
              </div>
            )
          }
        </Collapse>
      </div>
    );
  }

  titleUpdate = (noteObj) => {
    firebase
      .firestore()
      .collection("notebooks")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notebooks")
      .doc(this.state.selectNotebookid)
      .update({
        title: noteObj,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  selectNote = (n, i) => {
    console.log(n, i);
    this.setState({ selectedNote: n, selectedNoteIndex: i })
    this.setState({ open: true })
    this.props.selectNote(n, i);
    console.log();

  }


  selectNotebook = (n, i) => {
    console.log(n);
    this.props.selectNotebook(n, i);
    this.handleClick(n)

  }
  deleteNotebook = (_note) => {
    if (window.confirm(`Are you sure you want to delete the nootebook: ${_note.title}`)) {
      this.props.deleteNotebook(_note)
    }
  }

  deleteNote = async (note, index) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      message.success('Click on Yes');

      const noteIndex = this.state.notes.indexOf(note);
      console.log(noteIndex);
      console.log(index)
      await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
      if (index === noteIndex) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
        //  console.log(this.state.selectedNoteIndex);
        this.selectNote(this.state.selectedNote, this.state.selectedNoteIndex)
      }
      else {
        this.state.notes.length > 1 ?
          (this.props.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)) :
          (this.setState({ selectedNoteIndex: null, selectedNote: null }));

      }
      firebase
        .firestore()
        .collection("notes")
        .doc(firebase.auth().currentUser.uid)
        .collection("user_notes")
        .doc(note.id)
        .delete();
    }
  }

  newNote = async (title, tags) => {

    console.log(title, tags, this.state.selectNotebookid)
    const note = {
      title: title,
      body: '',
      tags: tags,
      notebookID: this.state.selectNotebookid,
    };
    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .doc(firebase.auth().currentUser.uid)
      .collection("user_notes")
      .add({
        title: note.title,
        body: note.body,
        tags: note.tags,
        notebookID: note.notebookID,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
}

export default withStyles(styles)(SidebarItem);
