import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import classnames from 'classnames';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleClick(){
    //Send Poll form
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
                    <h5> Poll Question </h5>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" />
                        Option one is this and that—be sure to include why it's great
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" />
                        Option two can be something else and selecting it will deselect option one
                      </Label>
                    </FormGroup>
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
                  <h6> Option one is this and that—be sure to include why it's great </h6> 
                  <p><strong> 200 votes </strong></p>
                  <h6> Option two can be something else and selecting it will deselect option one </h6> 
                  <p><strong> 300 votes </strong></p>
                  <h5> Total: 500 votes </h5>
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