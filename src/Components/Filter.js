import React from "react";

const Filter = (props) => {
  const { filt_name, handleFilter } = props;

  return (
    <div>
      <label style={{ margin: "10px" }}>Find</label>
      <input
        value={filt_name}
        onChange={handleFilter}
        style={{ margin: "10px" }}
      />
    </div>
  );
};
export default Filter;
