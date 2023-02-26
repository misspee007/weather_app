import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./page";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Weather Finder</h1>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/page" element={<Page />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
