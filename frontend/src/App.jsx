import React, { useCallback, useState } from "react";
import { Routes,Route, } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import Auth from "./users/pages/Auth";
import { authContext } from "./shared/context/context";
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const login = useCallback(()=>{
    setIsLoggedIn(true)
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  },[])


  return (
    <div>
      <main>
        <authContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>
          <MainNavigation/>
            {
              isLoggedIn ? <Routes>
                <Route path="/" element={<Users/>}></Route>
                <Route path="/:userId/places" element={<UserPlaces/>}></Route>
                <Route path="/places/new" element={<NewPlaces/>}></Route>
                <Route path="/places/:placeId" element={<UpdatePlaces/>}></Route>
                <Route path='*' element={<Users></Users>}></Route>
                
              </Routes>:<Routes>
                <Route path="/" element={<Users/>}></Route>
                <Route path="/:userId/places" element={<UserPlaces/>}></Route>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path='*' element={<Auth></Auth>}></Route>
              </Routes>
            }
        </authContext.Provider>
      </main>
    </div>
  );
}

export default App;
