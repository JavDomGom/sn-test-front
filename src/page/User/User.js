import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListMessages from "../../components/ListMessages";
import { getUserApi } from "../../api/user";
import { getUserMessagesApi } from "../../api/message";

import "./User.scss";

function User(props) {
  const { match, setRefreshCheckLogIn } = props;
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { params } = match;
  const loggedUser = useAuth();

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        setUser(response);
        if (!response) toast.error("User does not exist.");
      })
      .catch(() => {
        toast.error("User does not exist.");
      });
  }, [params]);

  useEffect(() => {
    getUserMessagesApi(params.id, 1)
      .then((response) => {
        setMessages(response);
      })
      .catch(() => {
        setMessages([]);
      });
  }, [params]);

  const moreData = () => {
    const tmpPage = page + 1;
    setLoadingMessages(true);

    getUserMessagesApi(params.id, tmpPage).then((response) => {
      if (!response) {
        setLoadingMessages(0);
      } else {
        setMessages([...messages, ...response]);
        setPage(tmpPage);
        setLoadingMessages(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogIn={setRefreshCheckLogIn}>
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.lastName}` : "User does not exist."}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__messages">
        <h3>Messages</h3>
        {messages && <ListMessages messages={messages} />}
        <Button onClick={moreData}>
          {!loadingMessages ? (
            loadingMessages !== 0 && "Getting more messages"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);
