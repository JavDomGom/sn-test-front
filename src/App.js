import React, { useState, useEffect } from "react";
import SignUpLogIn from "./page/SignUpLogIn";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context";
import { isUserLoggedInApi } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogIn, setRefreshCheckLogIn] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedInApi());
    setRefreshCheckLogIn(false);
    setLoadUser(true);
  }, [refreshCheckLogIn]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshCheckLogIn={setRefreshCheckLogIn} />
      ) : (
        <SignUpLogIn setRefreshCheckLogIn={setRefreshCheckLogIn} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
