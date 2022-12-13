import { useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";
import { Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
