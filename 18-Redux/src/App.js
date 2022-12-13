import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
        ;
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
