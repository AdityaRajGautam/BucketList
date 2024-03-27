import React from "react";
import PlaceList from "../components/PlaceList";


const DUMMY_PLACES = [{
    id:'p1',
    title:'Lal Quila',
    description:'Every '
}]
const UserPlaces = () => {
    return (
        <PlaceList items ={DUMMY_PLACES}/>
    )
}

export default UserPlaces;