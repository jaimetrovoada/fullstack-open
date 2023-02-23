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
    <div
      className={`${notification.type} absolute top-4 right-4 rounded-xl border p-4 text-xl`}
      id="notification"
    >
      <p>{notification.msg}</p>
    </div>
  );
};

export default Notification;
