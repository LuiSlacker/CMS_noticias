import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import update from 'immutability-helper';
import * as UserService from '../../../services/user-service';
import * as PagesService from '../../../services/pages-service';

class NewPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answers: [],
      selectedPageId: '',
      pages: [],
    };
  }

  componentDidMount() {
    UserService.fetchAssignedPages(this.props.user._id)
      .then(assignedPages => assignedPages.filter(page => _.isEmpty(page.poll.options)))
      .then(assignedPages => this.setState({
        pages: assignedPages,
        selectedPageId: assignedPages[0] ? assignedPages[0]._id : '',
      }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelectChange(select) {
    this.setState({ selectedPageId: select.currentTarget.selectedOptions[0].value })
  }

  async handleBtnClick(evt) {
    evt.preventDefault();
    await PagesService.persistNewPoll(this.state.selectedPageId, {
      title: this.state.title,
      question: this.state.question,
      options: this.state.answers,
    });
    NotificationManager.success('New poll saved successfully!', 'Success');
  }

  addAnswer() {
    this.setState({
      answers: [
        ...this.state.answers,
        { name: '' },
      ],
    });
  }

  deleteAnswer(index) {
    this.setState({
      answers: update(this.state.answers, { $splice: [[index, 1]] }),
    });
  }

  onAnswerNameUpdate(event, index) {
    this.setState({
      answers: update(this.state.answers, {
        [index]: {
          name: { $set: event.target.value },
        },
      }),
    });
  }

  render() {
    return (
      <div>
        <h5>Create a new poll</h5>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              value={this.state.title}
              onChange={this.handleChange.bind(this)}
              name='title'
              id="title"
              placeholder="poll title" />
          </FormGroup>
          <FormGroup>
            <Label for="question">Question</Label>
            <Input
              type="text"
              value={this.state.question}
              onChange={this.handleChange.bind(this)}
              name='question'
              id="question"
              placeholder="poll question" />
          </FormGroup>
          <FormGroup>
            <Label for="pagesSelect">Page</Label>
            <Input type="select" name="selectedPage" id="pagesSelect" onChange={this.handleSelectChange.bind(this)}>
              {this.state.pages.map((page, index) =>
                <option key={index} value={page._id}>{page.name}</option>)}
            </Input>
          </FormGroup>
          {this.state.answers.map((answer, index) =>
            <FormGroup key={index}>
              <Input
                type="text"
                value={answer.name}
                onChange={evt => this.onAnswerNameUpdate.bind(this)(evt, index)}
                name='answer'
                id="answer"
                placeholder="answer" />
              <Button color="danger" onClick={() => this.deleteAnswer.bind(this)(index)}>Delete</Button>
            </FormGroup>)}
          <Button outline onClick={this.addAnswer.bind(this)}>Add possible answer</Button>
          <Button onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewPoll;
