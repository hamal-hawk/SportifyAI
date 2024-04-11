import { Link } from "react-router-dom";
export default function BlogList({blogs, title}){
    // const blogs = props.blogs;

    return (
        <div>
        <h1> {title} </h1>
        {blogs.map((blog) =>
            (
            <div className='blog-preview' key={blog.id}>
            <Link to={`http://localhost:3000/blogs/${blog.id}`}> 
                <h2> {blog.title} </h2>
                <p> {"Written by "+blog.author} </p>
             </Link>
            </div>   
            )
)}
</div>
);
    
}