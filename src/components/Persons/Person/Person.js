import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

import classes from "./Person.css";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  //this works behind the scenes of React and it has to be like that exactly
  //this gives access to authentication property which is injected via <AuthContext.Consumer>
  //outside of the JSX, everywhere in the class so that we can use it f.e. in an Http Request
  //where we need authentication
  //so now that we use this way we dont need <AuthContext.Consumer> anymore (line 40ish) this.context
  static contextType = AuthContext;

  //to use focus on the last element
  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    {
      /* Aux is an empty wrapper for children so that you dont need to have all the returned JSX in a div 
      We use it when we want to render adjancent elements without the closing div 
      Instead of custom component we can use the React's build in custom component Fragment*/
    }

    //wrapping Persons in <AuthContext.Consumer> and App.js in <AuthContext.Provider>
    //so that we can pass props and consume them without middle classes
    //via context/
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please Log In</p>
        )}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

// You say what type to expect from every prop
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
