import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Page = lazy(() => import("./Page"));

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Weather</h1>
      </header>
      <main>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Page />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
