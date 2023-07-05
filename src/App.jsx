import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./router";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        {routes.map((item, i) => {
          return (
            <Route
              key={i}
              path={item.path}
              element={
                <Suspense fallback={<div>加载中...</div>}>
                  <item.element />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
