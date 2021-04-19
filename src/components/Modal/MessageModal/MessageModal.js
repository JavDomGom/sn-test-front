import { MSG_MAX_LENGTH } from "../../../utils/constants";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Close } from "../../../utils/icons";
import { addMessageApi } from "../../../api/message";

import "./MessageModal.scss";

export default function MessageModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= MSG_MAX_LENGTH) {
      addMessageApi(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Error sending message, please try again later.");
        });
    }
  };

  return (
    <Modal
      className="message-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Say something."
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", {
              error: message.length > MSG_MAX_LENGTH,
            })}
          >
            {message.length}
          </span>
          <Button
            type="submit"
            disabled={message.length > MSG_MAX_LENGTH || message.length < 1}
          >
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
