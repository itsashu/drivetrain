import { ReactElement } from "react";
import "./user-card.css";

export type UserCardPropsType = {
  imgUrl: string;
  userName: string;
  userInfo: string;
};

export const UserCard = ({
  imgUrl = "",
  userName = "",
  userInfo = "",
}: UserCardPropsType): ReactElement<UserCardPropsType> => {
  return (
    <div className="flexContainer" aria-hidden>
      <div className="firstColumn">
        <img className="icon" src={imgUrl} alt={"img"} />
      </div>
      <div className="secondColumn">
        <div className="row1">{userName}</div>
        <div className="row2"> {userInfo}</div>
      </div>
    </div>
  );
};
