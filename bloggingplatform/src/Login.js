import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login({setLoggedIn, setUser}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();
        fetch('http://localhost:8001/users/'+username)
        .then(res => res.json())
        .then(user => {
            if(user.enabled && password === user.password){
                setLoggedIn(true);
                setUser(user);
                navigate("/home");
            }
            else{
                console.log("Wrong password"); //add something later
            }
        })
        .catch((err) =>{
            console.log(err.message);
        })
        
    }
    return(
        <div>
            <form className="create" onSubmit={handleLogin}>
                <label> Username </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    required
                />
                <label> Password </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                 <button> Login </button>
            </form>
        </div>
    )
}