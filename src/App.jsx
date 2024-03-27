import React from "react";
import { Routes,Route } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Users/>}></Route>
          <Route path="/places/new" element={<NewPlaces/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
