import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";
//import styled from "styled-components";

//STYLING WITH STYLED-COMPONENTS
// //inject this func because in the end that `` creates a string
//and then you create a StyledButton in the DOM

// const StyledButton = styled.button`
//   background-color: ${(props) => (props.alt ? "red" : "green")};
//   color: white;
//   font: inherit;
//   border: 1px solid black;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => (props.alt ? "salmon" : "lightgreen")};
//     color: black;
//   }
// `;

class App extends Component {
  state = {
    persons: [
      { id: "asd1qsc", name: "Max", age: 28 },
      { id: "df1gfeb", name: "Manu", age: 29 },
      { id: "4sdg42e", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
  };

  deletePersonHandler = (personIndex) => {
    //copy the array in a new one with slice
    const persons = this.state.persons.slice();
    //deleting the person in that index with splice
    persons.splice(personIndex, 1);
    //updating the state with the new array
    this.setState({ persons: persons });
  };

  nameChangedHandler = (event, id) => {
    //find the person
    const personIndex = this.state.persons.findIndex((pers) => {
      return pers.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //update the persons array with a copy of updated persons
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    //replaced by styled-components
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid black",
      padding: "8px",
      cursor: "pointer",
      //this syntax is possible only with radium
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black",
      },
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      //replaced by styled-components

      // style.backgroundColor = "red";
      // //this syntax is possible only with radium
      // style[":hover"] = {
      //   backgroundColor: "salmon",
      //   color: "black",
      // };
    }

    //App.css classes
    const classes = []; // "red bold"
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }

    //StyleRoot comes from radium to use @media
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button
          className="button"
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//radium injects additional syntax
export default App;
