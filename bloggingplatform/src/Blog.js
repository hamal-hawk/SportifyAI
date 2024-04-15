import { useParams, useNavigate } from "react-router-dom"
import useFetch from "./Fetch";
import { useEffect, useState } from "react";

export default function BlogPost({user}){
    const id = useParams()['id'];
    const [comment, setComment] = useState();
    let {data: blog, isPending, error} = useFetch(`http://localhost:8000/blogs/${id}`);
    const navigate = useNavigate();
    const [comments, setComments] = useState(new Array());

    useEffect(() => {
        if(!isPending){
            let list = new Array();
            for(let comment of blog.comments){
                list.push(comment);
            }
            setComments(list);
        }
    }, [isPending]);

    function handleDelete(){
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        })
        .then(()=>{
            navigate('/home');
        });
    }


    function handleComment(e){
        e.preventDefault();
        let commentsList = comments.slice();
        commentsList.push({comment, author: user.id});
        blog.comments = commentsList;
        setComments(blog.comments);
        console.log("ID: "+id);
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(() => setComment(""));

    }

    return(
        <>
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
            {(user.persona === 'admin' || user.persona === 'moderator' || (!isPending && user.id === blog.author)) && <button onClick={handleDelete}> Delete Blog</button>}
        </div>

        <div className="comment">
            {error && <div> Error fetching data </div>}
            {isPending && <div> Loading... </div>}
            {blog && comments.map(comment => 
                (<article className="comment">
                <h5>{comment.author}</h5>
                <div> {comment.comment} </div>
                </article>)
            )
            }
        </div>

        
        <div>
            <form className="comment-add" onSubmit={handleComment}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                
                 {!isPending && <button> Add Comment </button>}
                 {isPending && <button disabled> Adding... </button>}
            </form>
        </div>
        </>
    )
}