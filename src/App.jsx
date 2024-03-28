import React from "react";
import { Routes,Route } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import Auth from "./users/pages/Auth";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Users/>}></Route>
          <Route path="/places/new" element={<NewPlaces/>}></Route>
          <Route path="/:userId/places" element={<UserPlaces/>}></Route>
          <Route path="/places/:placeId" element={<UpdatePlaces/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
