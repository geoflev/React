import React, { useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./Cockpit.css";

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  //using useContext hook you can use the authentication anywhere and not only in <AuthContext.Consumer>
  const authContext = useContext(AuthContext);

  //this runs for every update and create
  //it is a react hook which is equivalent to the lifecycle hooks in class based components
  //this is componentDidMount and componentDidUpdate combined just for function components
  useEffect(() => {
    console.log("[Cockpit.js] useEffect");

    //fake http request to show how to control useEffect
    // setTimeout(() => {
    //   alert("Saved data to cloud!");
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      // this shows when we click remove cockpit button
      console.log("[Cockpit.js] cleanup work in useEffect");
    };
    // used ,[props.persons] as a dependency so that useEffect alerts only when we change persons array
    //we can use just [] so react understands that we have no dependencies and it just executes the first time
  }, []);

  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      console.log("[Cockpit.js] cleanup work in 2nd useEffect");
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Log In</button>
    </div>
  );
};

//wrap this so it rerenders only when changed
//improves performance
// cockpit lifecycle executes only when we do something to it
// and not when f.e. type in the input of a person
export default React.memo(cockpit);
