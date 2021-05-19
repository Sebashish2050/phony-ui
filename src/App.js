import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import CallerDetails from "./components/CallerDetails";
import Timer from "./components/Timer";
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
    ws.onopen = () => {
      console.log("connected websocket");

      setWebSocket(ws);

      timeout = 500; 
      clearTimeout(connectInterval);
    };

    // websocket onclose event listener
    ws.onclose = (e) => {
      console.log(`Socket is closed. Reconnect will be attempted in ${Math.min(10000 / 1000,(timeout + timeout) / 1000)} second.`, e.reason);

      timeout = 2 * timeout;
      connectInterval = setTimeout(check, Math.min(10000, timeout));
    };

    ws.onerror = (err) => {
      console.error("Socket encountered error: ", err.message, "Closing socket");
      ws.close();
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === "event") {
        setCallDetails(eventData.details);
      }
    };
  };

  const check = () => {
    if (!webSocket || webSocket.readyState == WebSocket.CLOSED) {
      connect();
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
