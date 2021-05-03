const SearchBar = ({ submitSearch, searchText, setSearchText }) => {
  return (
    <>
      <form onSubmit={submitSearch} className="search-form">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter pokemon name..."
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </form>
    </>
  );
};

export default SearchBar;
