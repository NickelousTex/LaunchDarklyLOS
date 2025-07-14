import React, { createContext, useState } from "react";
import { STARTER_PERSONAS } from "./personaData";
import { useLDClient } from "launchdarkly-react-client-sdk";

export const LoginContext = createContext({
  userObject: STARTER_PERSONAS[0],
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
  allUsers: STARTER_PERSONAS,
});

export const LoginProvider = ({ children }) => {
  const [userObject, setUserObject] = useState(STARTER_PERSONAS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState(STARTER_PERSONAS);
  const ldClient = useLDClient();

  const loginUser = (email) => {
    const chosenPersona = allUsers.find((p) => p.personaemail === email) || allUsers[0];
    setUserObject(chosenPersona);
    setIsLoggedIn(true);
    // Send persona data as context to LaunchDarkly
    if (ldClient) {
      ldClient.identify({
        kind: "user",
        key: chosenPersona.personaemail,
        name: chosenPersona.personaname,
        email: chosenPersona.personaemail,
        role: chosenPersona.personarole,
        tier: chosenPersona.personatier,
        image: chosenPersona.personaimage,
      });
    }
  };

  const logoutUser = () => {
    setUserObject(allUsers[0]);
    setIsLoggedIn(false);
    // Optionally reset context in LaunchDarkly
    if (ldClient) {
      ldClient.identify({
        kind: "user",
        key: allUsers[0].personaemail,
        name: allUsers[0].personaname,
        email: allUsers[0].personaemail,
        role: allUsers[0].personarole,
        tier: allUsers[0].personatier,
        image: allUsers[0].personaimage,
      });
    }
  };

  return (
    <LoginContext.Provider value={{ userObject, isLoggedIn, loginUser, logoutUser, allUsers }}>
      {children}
    </LoginContext.Provider>
  );
}; 