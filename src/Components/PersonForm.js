import React from "react";

const PersonForm = (props) => {
  const {
    addPerson,
    newName,
    handleNewName,
    newNumber,
    handleNewNumber,
  } = props;

  return (
    <div>
      <form id="nameForm" onSubmit={addPerson}>
        <div>
          <label style={{ display: "block", marginLeft: "10px" }}>Name</label>
          <input
            value={newName}
            onChange={handleNewName}
            style={{ margin: "10px" }}
          />

          <div>
            <label style={{ display: "block", marginLeft: "10px" }}>
              Number
            </label>
            <input
              type="number"
              value={newNumber}
              onChange={handleNewNumber}
              placeholder="ex. 0441234567"
              style={{ margin: "10px" }}
            />
          </div>
        </div>
        <div>
          <button type="submit" style={{ margin: "10px" }}>
            Add new contact
          </button>
        </div>
      </form>
    </div>
  );
};
export default PersonForm;
