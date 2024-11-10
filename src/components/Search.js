import React from "react";

function Search({ onSearch}) {
    // Handle changes in the search input field,Get the current value from the input field
  const handleChange = (e) => {
    const query = e.target.value;
    onSearch(query);  // Call the parent's search handler
  };
  //We RETURN:INPUT FIELD OF THE SEARCH
  //         :Placeholder text when the field is empty
  //         :Trigger handleChange on input change
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
