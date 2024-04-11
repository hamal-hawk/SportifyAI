import {useEffect, useState} from 'react';
import BlogList from './BlogList';
import useFetch from './Fetch';

export default function Home(){

    let {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    
    return(
       <div className="home">
        {error && <div> Error fetching data </div>}
        {isPending && <div> Loading... </div>}
        {blogs && <BlogList blogs={blogs} title="All Blogs" />}
       </div>
    )
}


