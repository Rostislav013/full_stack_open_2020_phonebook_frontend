import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Adding new contact
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // for Filtering (FIND)
  const [showAll, setShowAll] = useState(true);
  const [filt_name, setFilt_name] = useState("");
  const [message, setMessage] = useState("");
  const [notificationColor, setNotificationColor] = useState(false);

  const messageStyle = {
    color: notificationColor ? "green" : "red",
    backgroundColor: "#c7dbc3",
    border: notificationColor ? "solid 1px green" : "solid 1px red",
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toUpperCase().includes(filt_name.toUpperCase())
      );

  const handleFilter = (event) => {
    setFilt_name(event.target.value);
    setShowAll(false);
  };

  const handleNewName = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: "_" + Math.random().toString(36).substr(2, 9),
    };
    // prevent adding existing name
    const names = persons.map((el) => el.name); // array of existing names
    if (newName === "" || newNumber === "") {
      alert("Type a name with number");
    } else if (names.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const idUpdate = persons.find((element) => element.name === newName).id;
        handleUpdateNumber(idUpdate, personObject);
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationColor(true);
        setMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleUpdateNumber = (id) => {
    const personObject = {
      name: newName,
      number: newNumber,
      id: id,
    };

    personService
      .update(id, personObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setNotificationColor(true);
        setMessage(`${personObject.name} number was changed`);

        setTimeout(() => {
          setMessage(null);
        }, 2000);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationColor(false);
        setMessage(
          `Information of ${personObject.name} has already been removed from server`
        );
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete  ${persons.find((element) => element.id === id).name}?`
      )
    ) {
      //console.log("delete", id);
      personService.deletePerson(id).catch((e) => console.log(e.message));
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div style={messageStyle}>
        <p style={{ margin: "10px" }}>{message}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      <Filter filt_name={filt_name} handleFilter={handleFilter} />

      <h3 style={{ margin: "10px" }}>Add a contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2 style={{ margin: "10px" }}>Contacts</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
