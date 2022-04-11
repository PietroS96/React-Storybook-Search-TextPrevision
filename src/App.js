import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import { useSearch, useDebounce } from "./hooks";

function App() {
  const [value, setValue] = useState("");

  const { articles } = useSearch(useDebounce(value));
  return (
    <Autocomplete
      getItemValue={(item) => item.label}
      items={articles}
      renderItem={(item, isHighlighted) => (
        <div key={item.id} style={{ background: isHighlighted ? "lightgray" : "white" }}>
          {item.label}
        </div>
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSelect={(val) => setValue(val)}
    />
  );
}

export default App;
