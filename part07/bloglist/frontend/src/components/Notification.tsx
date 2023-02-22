import React from "react";
import { INotification } from "../reducers";

interface Props {
  notification: INotification;
}

const Notification: React.FC<Props> = ({ notification }) => {
  if (notification === null || notification.msg === "") {
    return null;
  }

  return (
    <div className={notification.type} id="notification">
      {notification.msg}
    </div>
  );
};

export default Notification;
