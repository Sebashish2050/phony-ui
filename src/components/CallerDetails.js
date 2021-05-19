import React, { useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { validateCallDetails, makeApiCall } from '../utils';

function CallerDetails({ wsCallDetails }) {
  const INITIAL_STATE = {
    callerName: "",
    callerNumber: "",
    calleeName: "",
    calleeNumber: "",
    timeLimit: 5,
  };

  const [callDetails, setCallDetails] = React.useState(INITIAL_STATE);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleCall = async () => {
    const invalidMsg = validateCallDetails(callDetails);
    if (!invalidMsg) {
      await makeApiCall(callDetails);
    } else {
      alert(invalidMsg);
    }
  };

  const handleChange = (e) => {
    const updatedValue = {
      ...callDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setCallDetails(updatedValue);
  };

  useEffect(() => {
    if(wsCallDetails.callStatus &&
      (wsCallDetails.callStatus.toLowerCase() === 'completed' || wsCallDetails.callStatus.toLowerCase() === 'busy')
    ){
      setCallDetails(INITIAL_STATE);
    }
  }, [wsCallDetails.callStatus])
  
  return (
    <Container>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="callerName">Caller Name</Label>
              <Input
                type="text"
                name="callerName"
                value={callDetails.callerName}
                id="callerName"
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="callerNumber">Phone Number</Label>
              <Input
                type="tel"
                name="callerNumber"
                value={callDetails.callerNumber}
                id="callerNumber"
                onChange={handleChange}
                placeholder="eg +919099090900"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="callerName">Callee Name</Label>
              <Input
                type="text"
                name="calleeName"
                value={callDetails.calleeName}
                id="calleeName"
                onChange={handleChange}
                placeholder="Enter Callee Name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="callerNumber">Receiver Phone Number</Label>
              <Input
                type="tel"
                name="calleeNumber"
                value={callDetails.calleeNumber}
                id="calleeNumber"
                onChange={handleChange}
                placeholder="eg +919099090900"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <FormGroup>
            <Label for="timeLimit">Select time interval (in Minutes)</Label>
            <Input type="select" name="timeLimit" id="timeLimit" value={callDetails.timeLimit} onChange={handleChange}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </Input>
          </FormGroup>
        </Row>
        <Row>
          {wsCallDetails.callStatus === "in-queued" ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              >
                <span className="sr-only"></span>
              </Spinner>
              Calling...
            </Button>
          ) : (
            <Button color="primary" size="lg" onClick={handleCall}>
              Make A Call
            </Button>
          )}
        </Row>
      </Form>
    </Container>
  );
}

export default CallerDetails;
