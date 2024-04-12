import Switch from '@mui/material/Switch';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from "./Fetch"

export default function UsersList(){
    let {data: usersList, isPending, error} = useFetch('http://localhost:8001/users');
    const navigate = useNavigate();
    const [userEnabled, setUserEnabled] = useState(new Map());

    useEffect(() => {
        if(!isPending){
            let map = new Map();
            for(let user of usersList){
                map.set(user.id, user.enabled);
            }
            setUserEnabled(map);
        }
    }, [isPending, usersList])


//implement user delete (function to handle delete request to users)
    function handleChecked(e){
        let selectedUser = usersList.filter((user) => user.id === e.target.value)[0];
        const newMap = new Map(userEnabled);
        newMap.set(selectedUser.id, e.target.checked);
        setUserEnabled(newMap);
        fetch('http://localhost:8001/users/'+selectedUser.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: selectedUser.id, password: selectedUser.password, enabled: e.target.checked})
        })
    }

    function handleDelete(e){
        let selectedUserId = e.target.value;
        fetch('http://localhost:8001/users/'+selectedUserId, {
            method: 'DELETE'
        })
        .then(() => navigate('/home'))

    }
    


    return (
        <div>
           <h1> Users </h1> 
            {!isPending && userEnabled.size !== 0 && usersList.filter(user => user.persona != 'admin').map((user)=>{
                return (
                    <div className='users-list' key={user.id}>
                        <h2> {user.id} </h2>
                        <Switch
                        checked={userEnabled.get(user.id)}
                        value={user.id}
                        onChange={handleChecked}
                        />
                        <button value={user.id} onClick={handleDelete}> Remove User </button>
                    </div>   
                    )
            })}
        </div>
    );
}