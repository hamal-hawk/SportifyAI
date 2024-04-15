import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({user}){

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("academic-resources");
    const[isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        setIsPending(true);
        const blog = {title, body, author: user.id, category: category, comments: new Array()};
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
                <label> Category </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="academic-resources">Academic Resources</option>
                <option value="career-services">Career Services</option>
                <option value="campus">Campus</option>
                <option value="culture">Culture</option>
                <option value="local-community-resources">Local Community Resources</option>
                <option value="social">Social</option>
                <option value="sports">Sports</option>
                <option value="health-and-wellness">Health and Wellness</option>
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
                <option value="alumni">Alumni</option>
                </select>
                
                 {!isPending && <button> Add blog </button>}
                 {isPending && <button disabled> Adding... </button>}
            </form>
        </div>
    );
}