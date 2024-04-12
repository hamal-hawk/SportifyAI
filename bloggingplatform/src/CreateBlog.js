import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({user}){

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const[isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        setIsPending(true);
        setAuthor(user.id);
        const blog = {title, body, author: user.id};
        fetch('http://localhost:8000/blogs', {
            method :'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        })
        .then(()=>{
            setIsPending(false);
            navigate("/home");
        })
    }

    return(
        <div>
            <form className="create" onSubmit = {handleSubmit}>
                <label> Blog title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}
                    required
                />
                <label> Blog body: </label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                
                 {!isPending && <button> Add blog </button>}
                 {isPending && <button disabled> Adding... </button>}
            </form>
        </div>
    );
}