import React from "react";
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

function CallerDetails({ wsCallDetails }) {
  const INITIAL_STATE = {
    callerName: "",
    callerNumber: "",
    calleeName: "",
    calleeNumber: "",
  };

  const [callDetails, setCallDetails] = React.useState(INITIAL_STATE);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const validateCallDetails = () => {
    const patt = new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/);
    if (!callDetails.callerName || !callDetails.calleeName) {
      return "Empty data. Kindly enter name";
    }
    if (!callDetails.callerNumber || !callDetails.calleeNumber) {
      return "Empty phone number. Kindly enter phone numbers";
    } else if (
      !patt.test(callDetails.callerNumber) ||
      !patt.test(callDetails.calleeNumber)
    ) {
      return "Invalid phone number format. Kindly enter correct format (Example: +918000800080)";
    }
    return "";
  };

  const handleCall = () => {
    const invalidMsg = validateCallDetails();
    if (!invalidMsg) {
      fetch("api/v1/call", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(callDetails),
      })
        .then((response) => response.json())
        .then((data) => console.log({ data }));
      console.log("hii");
    } else {
      alert(invalidMsg);
    }
  };

  const handleChange = (e) => {
    console.log("xxx", e.currentTarget.name, e.currentTarget.value);
    const updatedValue = {
      ...callDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setCallDetails(updatedValue);
  };

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

      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Duration</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>5 min</DropdownItem>
          <DropdownItem>10 min</DropdownItem>
          <DropdownItem>15 min</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Container>
  );
}

export default CallerDetails;
