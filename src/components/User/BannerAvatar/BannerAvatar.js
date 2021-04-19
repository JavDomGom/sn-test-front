import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constants";
import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi,
} from "../../../api/follow";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);
  const bannerUrl = user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null;

  const avatarUrl = user?.avatar
    ? `${API_HOST}/getAvatar?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then((response) => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const onUnfollow = () => {
    console.log("user:" + user);
    unfollowUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Edit profile</Button>
          )}

          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnfollow} className="unfollow">
                <span>Following</span>
              </Button>
            ) : (
              <Button onClick={onFollow}>Follow</Button>
            ))}
        </div>
      )}

      <ConfigModal show={showModal} setShow={setShowModal} title="Edit profile">
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
