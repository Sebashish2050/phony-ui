import React from "react";
import { Row, Col } from "reactstrap";
import StopWatch from './StopWatch';

const Timer = (props) => {
  const { callDetails } = props;

  if (callDetails.callStatus === "in-queued" || !callDetails.callStatus) {
    return <></>;
  }

  return (
    <>
      {callDetails.callStatus === "in-progress" ? (
        <Row className="stopWatch">
          <StopWatch seconds={0} minutes={0} hours={0} />
        </Row>
      ) : (
        <>
          <Row>
            <Col md={4}>Start Time</Col>
            <Col md={8}>{callDetails.startTime}</Col>
          </Row>
          <Row>
            <Col md={4}>End Time</Col>
            <Col md={8}>{callDetails.endTime}</Col>
          </Row>
          <Row>
            <Col md={4}>Call Duration</Col>
            <Col md={8}>{callDetails.duration}</Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Timer;
