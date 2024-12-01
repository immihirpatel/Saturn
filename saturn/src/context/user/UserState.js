import userContext from "./UserContext";
import { useState } from "react";
import React from 'react'



const UserState = (props) => {
    const host = "http://localhost:5000"
    const userInitial = []
    const [user,setUser] = useState(userInitial);
    const getUser = async () => {
  
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        })
        const json = await response.json()
        setUser(json)
        console.log(user)
      }
  return (
    <userContext.Provider value={{ user,getUser }}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserState
