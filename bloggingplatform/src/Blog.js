import { useParams, useNavigate } from "react-router-dom"
import useFetch from "./Fetch";

export default function BlogPost({user}){
    const id = useParams()['id'];
    let {data: blog, isPending, error} = useFetch(`http://localhost:8000/blogs/${id}`);
    const navigate = useNavigate();

    function handleDelete(){
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        })
        .then(()=>{
            navigate('/home');
        });
    }

    return(
        <div className="blog-details">
            {error && <div> Error fetching data </div>}
            {isPending && <div> Loading... </div>}
            {blog && 
            (
                <article>
                    <h2> {blog.title} </h2>
                    <p> Written by: {blog.author}</p>
                    <div> {blog.body} </div>
                </article>
            )
            }
            {(user.persona === 'admin' || user.persona === 'moderator' || (!isPending && user.id === blog.author)) && <button onClick={handleDelete}> Delete </button>}
        </div>
    )
}