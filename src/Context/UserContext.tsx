import React, { createContext, useState, useEffect } from "react";

export const Context = createContext({
  userName: "a",
  setUsername(userName: string) {},
  token: false,
  setToken(val: boolean) {},
  search: false,
  setSearch(val: boolean) {},
  id: 0,
  setID(val: number) {},
  total: 0,
  setTotal(val: number) {},
});
const ContextProvider = (props: any) => {
  //   const [userName, setUserName] = useState<any>("a");
  const [search, setSearch] = useState<any>(false);
  const [token, setToken] = useState<any>(false);
  const [username, setUsername] = useState<any>("");
  const [id, setID] = useState<any>("");
  const [total, setTotal] = useState<any>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // console.log("aa");
      setSearch(true);
    } else {
      setSearch(false);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        search: search,
        setSearch: setSearch,
        token: token,
        setToken: setToken,
        id: id,
        setID: setID,
        userName: username,
        setUsername: setUsername,
        total: total,
        setTotal: setTotal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
