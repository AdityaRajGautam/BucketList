import React from "react";
import UsersList from "../components/UsersList";

const Users = () =>{
    const USERS = [
        {
        id:'u1',
        name:'aditya',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3S07jLQ1AuAH158EPPhDAPUJrEJwW6WTSVRLOiHcFXg&s',
        places:3
    }
]
    return (
        <UsersList items={USERS}/>
    )
}

export default Users;