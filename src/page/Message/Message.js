import React, { useState, useEffect } from "react";
import BasicLayout from "../../layout/BasicLayout";
import GetMessage from "../../components/Message";
import { getMessageApi } from "../../api/message";

import "./Message.scss";

export default function Message(props) {
  const { setRefreshCheckLogIn } = props;
  console.log(props)
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getMessageApi("6073267af48320df683d56ba")
      .then((response) => {
        setMessage(response);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BasicLayout className="home" setRefreshCheckLogIn={setRefreshCheckLogIn}>
      <div className="message__title">
        <h2>Message</h2>
      </div>
      {message && <GetMessage message={message} />}
    </BasicLayout>
  );
}
