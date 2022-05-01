import { ReactElement, useEffect, useRef, useState } from "react";
import { fetchData } from "../../api-service/fetch-users-list.api";
import { UserCard } from "../user-card/user-card.component";
import "./auto-complete.component.css";

export const AutoCompleteInput = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [usersList, setUsersList] = useState([] as any[]);
  const [page, setPage] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [error, setError] = useState<boolean>(false);

  const listRef = useRef(null);

  useEffect(() => {
    if (value.length === 0) {
      setUsersList([]);
      setError(false);
    }
  }, [value]);

  useEffect(() => {
    if (page > 1) {
      addData(page);
    }
  }, [page]);

  const addData = async (page: number) => {
    const newList: any = await fetchData(value, page);
    if (newList) {
      setUsersList(usersList.concat(newList));
    }
  };

  const onChangeHandler = async (event: { target: { value: string } }) => {
    const searchString: string = event.target.value;
    setValue(searchString);
    if (searchString.length > 0) {
      debounce()(searchString);
    }
  };

  const onClickHandler = (user: any) => {
    setValue(user.login);
    console.log("Selected User \n");
    console.dir(user);
    setUsersList([]);
  };

  const onKeyPressHandler = (event: { keyCode: any }) => {
    switch (event.keyCode) {
      case 13:
        if (selectedIndex !== 1 && usersList.length > 0) {
          onClickHandler(usersList[selectedIndex]);
        }
        console.log(selectedIndex);
        break;
      case 40:
        if (selectedIndex < usersList.length - 1) {
          setSelectedIndex((prev) => prev + 1);
          console.log(selectedIndex + 1 + " " + "down");
        }
        break;
      case 38:
        if (selectedIndex > 0) {
          setSelectedIndex((prev) => prev - 1);
          console.log(selectedIndex - 1 + " " + "up");
        }

        break;
      default:
        break;
    }
    if (selectedIndex > page * 10) {
      setPage((prev) => prev + 1);
    }
  };

  const onScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page + 1);
      }
    }
  };

  let timer: any;
  function debounce(timeout = 500) {
    return async function (queryString: string) {
      clearTimeout(timer);
      timer = setTimeout(async function () {
        if (queryString !== value) {
          try {
            const result = await fetchData.call(this, queryString);
            if (result) {
              setUsersList(result);
            }
          } catch (err) {
            setError(true);
          }
        } else setError(false);
      }, timeout);
    };
  }

  return (
    <div className="autoComplete">
      <input
        className="inputField"
        placeholder="Enter Name of Users"
        type="text"
        value={value}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
      ></input>
      {usersList?.length > 0 && (
        <div className="suggestionsList" onScroll={onScroll} ref={listRef}>
          {usersList.map((user: any, index: number) => (
            <div key={user.avatar_url} onClick={() => onClickHandler(user)}>
              <UserCard
                key={user.avatar_url}
                userName={user.login}
                userInfo={user.id}
                imgUrl={user.avatar_url}
                isSelected={index === selectedIndex}
              />
            </div>
          ))}
        </div>
      )}
      {error && <h2>Unable to load suggestions</h2>}
    </div>
  );
};
