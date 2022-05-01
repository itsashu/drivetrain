import { ReactElement, useEffect, useState } from "react";
import { fetchData } from "../../api-service/fetch-users-list.api";
import { UserCard } from "../user-card/user-card.component";
import "./auto-complete.component.css";

export const AutoCompleteInput = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [usersList, setUsersList] = useState([] as any[]);

  useEffect(() => {
    if (value.length === 0) {
      setUsersList([]);
    }
  }, [value]);

  const inputHandler = async (event: { target: { value: string } }) => {
    const searchString: string = event.target.value;
    setValue(searchString);
    if (searchString.length > 0) {
      const newList = await fetchData(searchString);
      if (newList) setUsersList(newList);
    }
  };

  const clickHandler = (user: any) => {
    setValue(user.login);
    console.log("Selected User \n");
    console.dir(user);
    setUsersList([]);
  };

  return (
    <>
      <div className="autoComplete">
        <input
          className="inputField"
          placeholder="Enter Name of Users"
          type="text"
          value={value}
          onChange={inputHandler}
        ></input>
        {usersList?.length > 0 && (
          <div className="suggestionsList">
            {usersList.map((user) => (
              <div key={user.id} onClick={() => clickHandler(user)}>
                <UserCard
                  userName={user.login}
                  userInfo={user.id}
                  imgUrl={user.avatar_url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
