import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    function handleSignup(e){
        e.preventDefault();
        fetch('http://localhost:8001/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: username, password, enabled: true})
        })
        .then(
            ()=>navigate('/')
        );
    }

    return(
        <div>
            <form className="create" onSubmit={handleSignup}>
            <label> Name </label>
                <input
                    type="text"
                    value={text}
                    onChange={(e)=>{
                        setText(e.target.value);
                    }}
                    required
                />
                <label> Date of Birth </label>
                <input
                    type="date"
                    value={dob}
                    onChange={(e)=>{
                        setDob(e.target.value);
                    }}
                    required
                />
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
            
                {<button> Signup </button>}
            </form>
        </div>
    )
}