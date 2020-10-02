import React from "react";

//GLOBALLY AVAILABLE JS OBJECT
//so that we can pass props from 1 class to another without having to pass it through middle classes
// that they dont need that prop
const authContext = React.createContext({
  authenticated: false,
  login: () => {},
});

export default authContext;
