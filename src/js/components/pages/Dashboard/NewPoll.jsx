import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Table, Button, Row, Col } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import update from 'immutability-helper';

class NewPoll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answers: [],
    };

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleBtnClick(evt) {
    evt.preventDefault();
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
            </FormGroup>
          )}
          <Button outline onClick={this.addAnswer.bind(this)}>Add possible answer</Button>
          <Button onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }

}

export default NewPoll;
