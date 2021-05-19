import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import CallerDetails from "./CallerDetails";
import Timer from "./Timer";
import "./App.css";

export const App = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [callDetails, setCallDetails] = useState({});

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    let ws = new WebSocket("ws://localhost:8080");

    let connectInterval;
    let timeout = null;
    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");

      setWebSocket(ws);

      timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = (e) => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (timeout + timeout) / 1000
        )} second.`,
        e.reason
      );

      timeout = 2 * timeout; //increment retry interval
      connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };

    ws.onmessage = (event) => {
      console.log("event:: ", event);
      const eventData = JSON.parse(event.data);
      console.log("eventData:: ", eventData.details.callStatus);
      if (eventData.type === "event") {
        setCallDetails(eventData.details);
      }
    };
  };

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  const check = () => {
    if (!webSocket || webSocket.readyState == WebSocket.CLOSED) {
      connect(); //check if websocket instance is closed, if so call `connect` function.
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <CallerDetails wsCallDetails={callDetails} />
        </Col>
        <Col md={4}>
          <Timer callDetails={callDetails} />
        </Col>
      </Row>
    </Container>
  );
};
