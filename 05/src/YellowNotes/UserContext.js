import React from "react";

export const UserContext = React.createContext({
  currentUser: undefined,
  setCurrentUser: () => {},
});
