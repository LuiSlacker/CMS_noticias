import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  FormGroup,
  Input,
  Label } from 'reactstrap';
import classnames from 'classnames';
import { NotificationManager } from 'react-notifications';
import * as PagesService from '../../services/pages-service';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      selectedOption: this.props.poll.options[0]._id,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleClick(evt) {
    evt.preventDefault();
    PagesService.votePoll(this.props.activePage, this.state.selectedOption)
      .then(() => {
        NotificationManager.success('Vote submitted successfully!', 'Success');
        this.props.fetchPoll();
      }).catch(() => NotificationManager.error('Failed submitting vote!', 'Error'));
  }

  render() {
    return (<div className="bottomBox">
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Poll
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Results
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <FormGroup tag="fieldset" row>
                  <Col>
                    <h5>{this.props.poll.title}</h5>
                    <p>{this.props.poll.question}</p>
                    {this.props.poll.options.map((option, index) =>
                      <FormGroup key={index} check>
                        <Label check>
                          <Input
                            type="radio"
                            value={option._id}
                            checked={this.state.selectedOption === option._id}
                            onChange={evt => this.setState({ selectedOption: evt.target.value })}
                          />
                          {option.name}
                        </Label>
                      </FormGroup>)}
                    <Button onClick={this.handleClick.bind(this)}>Submit</Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <FormGroup tag="fieldset" row>
                  <Col>
                    <h5> Results </h5>
                    {this.props.poll.options.map((option, index) =>
                      <div>
                        <h6>{option.name}</h6>
                        <p><strong>{option.votes} votes</strong></p>
                      </div>)}
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
    );
  }
}
