import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import LogInForm from "../../components/LogInForm";
import LogoNot from "../../assets/png/not-logo.png";
import LogoWhiteNot from "../../assets/png/not-logo-white.png";

import "./SignUpLogIn.scss";

export default function SignUpLogIn(props) {
  const { setRefreshCheckLogIn } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="signup-login" fluid>
        <MainComponent
          openModal={openModal}
          setShowModal={setShowModal}
          setRefreshCheckLogIn={setRefreshCheckLogIn}
        />
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function MainComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogIn } = props;
  return (
    <Col className="signup-login" xs={6}>
      <div>
        <img src={LogoWhiteNot} alt="Not" />
        <h2>Make friends like before</h2>
        <h3>Here, just a little time is enough!</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Sign Up
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(<LogInForm setRefreshCheckLogIn={setRefreshCheckLogIn} />)
          }
        >
          Login
        </Button>
      </div>
    </Col>
  );
}
