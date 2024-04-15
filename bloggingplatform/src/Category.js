import {useEffect, useState} from 'react';
import BlogList from './BlogList';
import useFetch from './Fetch';
import { useParams } from 'react-router-dom';

export default function Category(){
    const category = useParams()['category'];
    let {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    
    return(
       <div className="home">
        {error && <div> Error fetching data </div>}
        {isPending && <div> Loading... </div>}
        {blogs && <BlogList blogs={blogs.filter((blog) => blog.category == category)} title={category}/>}
       </div>
    )
}


