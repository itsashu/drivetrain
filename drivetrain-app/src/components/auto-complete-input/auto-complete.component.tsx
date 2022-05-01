import { ReactElement, useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { UserCard } from "../user-card/user-card.component";
import "./auto-complete.component.css";

const octokit = new Octokit({
  auth: "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",
});

export const AutoCompleteInput = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [usersList, setUsersList] = useState([] as any[]);

  useEffect(() => {
    if (value) {
      fetchData(value);
    }
  }, [value]);

  const fetchData = async (value: string) => {
    try {
      const response = await octokit.request("GET /search/users", { q: value });
      // const data = await response.json();
      console.dir(response);
      setUsersList(response.data.items);
    } catch (e) {
      console.error(e);
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
          onChange={(event) => setValue(event.target.value)}
        ></input>
        {usersList?.length > 0 &&
          usersList.map((user) => (
            <div key={user.id} onClick={() => clickHandler(user)}>
              <UserCard
                userName={user.login}
                userInfo={user.id}
                imgUrl={user.avatar_url}
              />
            </div>
          ))}
      </div>
    </>
  );
};
