import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import ListMessages from "../../components/ListMessages";
import { getFollowersMessagesApi } from "../../api/message";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogIn } = props;
  const [messages, setMessages] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    getFollowersMessagesApi(page)
      .then((response) => {
        if (!messages && response) {
          setMessages(formatModel(response));
        } else {
          if (!response) {
            setLoadingMessages(0);
          } else {
            const data = formatModel(response);
            setMessages([...messages, ...data]);
            setLoadingMessages(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingMessages(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogIn={setRefreshCheckLogIn}>
      <div className="home__title">
        <h2>Home</h2>
      </div>
      {messages && <ListMessages messages={messages} />}
      <Button onClick={moreData} className="load-more">
        {!loadingMessages ? (
          loadingMessages !== 0 ? (
            "Load more messages"
          ) : (
            "These are all messages."
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(messages) {
  const messagesTmp = [];
  messages.forEach((message) => {
    messagesTmp.push({
      _id: message._id,
      userId: message.userFollowedID,
      message: message.Msg.message,
      datetime: message.Msg.datetime,
    });
  });
  return messagesTmp;
}
