import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import MessageModal from "../Modal/MessageModal";
import { logOutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhiteNot from "../../assets/png/not-logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  console.log(props);
  const { setRefreshCheckLogIn } = props;
  const [showModal, setShowModal] = useState(false);
  const user = useAuth();

  const logOut = () => {
    logOutApi();
    setRefreshCheckLogIn(true);
  };

  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhiteNot} alt="Not" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        Home
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} />
        Users
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} />
        Profile
      </Link>
      <Link to="" onClick={logOut}>
        <FontAwesomeIcon icon={faPowerOff} />
        LogOut
      </Link>

      <Button onClick={() => setShowModal(true)}>New message</Button>

      <MessageModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
