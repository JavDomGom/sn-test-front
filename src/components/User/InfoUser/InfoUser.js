import React from "react";
import moment from "moment";
import localization from "moment/locale/es";
import { Location, WebSite, DateOfBirth } from "../../../utils/icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;
  return (
    <div className="info-user">
      <h2 className="name">
        {user?.name} {user?.lastName}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biography && <div className="description">{user?.biography}</div>}
      <div className="more-info">
        {user?.location && (
          <p>
            <Location />
            {user?.location}
          </p>
        )}
        {user?.webSite && (
          <a
            href={user.webSite}
            alt={user.webSite}
            target="_blank"
            rel="noopener noreferer"
          >
            <WebSite />
            {user?.webSite}
          </a>
        )}
        {user?.dateOfBirth && (
          <p>
            <DateOfBirth />
            {moment(user.dateOfBirth).locale("es", localization).format("LL")}
          </p>
        )}
      </div>
      <div className="follow-info">
        <p>Following 0</p>
        <p>Followers 0</p>
      </div>
    </div>
  );
}
