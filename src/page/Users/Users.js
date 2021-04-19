import React, { useState, useEffect } from "react";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { getUsersApi, followUserApi } from "../../api/follow";

import "./Users.scss";

function Users(props) {
  const { setRefreshCheckLogIn, location, history } = props;
  const [users, setUsers] = useState(null);
  const params = useUserQuery(location);
  const [userType, setUserType] = useState(params.userType || "follow");
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [onSearch] = useDebouncedCallback((value) => {
    setUsers(null);
    history.push({
      search: queryString.stringify({ ...params, search: value, page: 1 }),
    });
  }, 200);

  useEffect(() => {
    getUsersApi(queryString.stringify(params))
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (params.page == 1) {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setLoadingUsers(0);
          } else {
            setUsers([...users, ...response]);
            setLoadingUsers(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeUserType = (userType) => {
    setUsers(null);
    if (userType === "new") {
      setUserType("new");
    } else {
      setUserType("follow");
    }

    history.push({
      search: queryString.stringify({
        userType: userType,
        page: 1,
        search: "",
      }),
    });
  };

  const moreData = () => {
    setLoadingUsers(true);
    const newPage = parseInt(params.page) + 1;
    history.push({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Users"
      setRefreshCheckLogIn={setRefreshCheckLogIn}
    >
      <div className="users__title">
        <h2>Users</h2>
        <input
          type="text"
          placeholder="Search users"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <ButtonGroup className="users__options">
        <Button
          className={userType === "follow" && "active"}
          onClick={() => onChangeUserType("follow")}
        >
          Following
        </Button>
        <Button
          className={userType === "new" && "active"}
          onClick={() => onChangeUserType("new")}
        >
          Not following
        </Button>
      </ButtonGroup>

      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Searching for users
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!loadingUsers ? (
              loadingUsers !== 0 && "Loading more users"
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
        </>
      )}
    </BasicLayout>
  );
}

function useUserQuery(location) {
  const { page = 1, userType = "follow", search } = queryString.parse(
    location.search
  );
  return { page, userType, search };
}

export default withRouter(Users);
