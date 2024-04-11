import useFetch from "./Fetch"
import Switch from '@mui/material/Switch';
import { useState } from "react";

export default function UsersList(){
    const {data: usersList, isPending, error} = useFetch('http://localhost:8001/users');

//implement toggle button and set user enabled to true/false
//implement user delete (function to handle delete request to users)
    function handleChecked(e){ 
        const selectUser = usersList.filter((user) => user.id == e.target.value)[0];
        fetch('http://localhost:8001/users/'+selectUser.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: selectUser.id, password: selectUser.password, enabled: e.target.checked})
        })
    }
    


    return (
        <div>
           <h1> Users </h1> 
            {!isPending && usersList.filter(user => user.id != 'admin').map((user)=>{
                
                return (
                    <div className='blog-preview' key={user.id}>
                        <h2> {user.id} </h2>
                        <Switch
                        checked={user.enabled}
                        value={user.id}
                        onChange={handleChecked}
                        />
                    </div>   
                    )
            })}
        </div>
    );
}