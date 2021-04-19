import React from "react";
import { map, isEmpty } from "lodash";
import User from "./User";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { users } = props;

  if (isEmpty(users)) {
    return (
      <div className="list-users">
        <h2>No results found</h2>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-users">
        {map(users, (user) => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
