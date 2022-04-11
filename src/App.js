import React from "react";
import Autocomplete from "react-autocomplete";
import { useSearch, useDebounce, useSearchForm } from "./hooks";

import Input from "./components/Input";

function App() {
  const { searchValue, onSearchChange } = useSearchForm();
  const { articles } = useSearch(useDebounce(searchValue));

  return (
    <Autocomplete
      items={articles}
      renderInput={Input}
      inputProps={{ placeholder: "Inserisci Testo.." }}
      getItemValue={(item) => item.label}
      renderMenu={(children, value, style) => {
        return articles && articles.length ? (
          <div style={{ ...style }} className="input-suggestions">
            {children}
            <a href={`/search?query=${value}`} className="search-link">
              Vedi tutti i risultati
            </a>
          </div>
        ) : (
          <></>
        );
      }}
      renderItem={(item, isHighlighted) => (
        <div key={item.id} style={{ background: isHighlighted ? "lightgray" : "white" }}>
          {item.label}
        </div>
      )}
      value={searchValue}
      onChange={onSearchChange}
    />
  );
}

export default App;
