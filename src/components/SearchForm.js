import React, { useState } from "react";

/** Search form component.
 *
 * Props:
 * - handleSearch: function to be called on form submit
 *
 * State:
 * - searchTerm: controlled input for the search term
 */

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Update searchTerm in state on form submission. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="searchTerm"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;
