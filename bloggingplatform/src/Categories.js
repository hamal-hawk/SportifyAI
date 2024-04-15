import {Link} from 'react-router-dom';
import useFetch from './Fetch';

export default function Categories(){

    return (
        <div className="categories">
            <div className="links">
            <div className="links">
                <Link to="categories/academic-resources">Academic Resources</Link>
                <Link to="categories/career-services">Career Services</Link>
                <Link to="categories/campus">Campus</Link>
                <Link to="categories/culture">Culture</Link>
                <Link to="categories/local-community-resources">Local Community Resources</Link>
                <Link to="categories/social">Social</Link>
                <Link to="categories/sports">Sports</Link>
                <Link to="categories/health-and-wellness">Health and Wellness</Link>
                <Link to="categories/technology">Technology</Link>
                <Link to="categories/travel">Travel</Link>
                <Link to="categories/alumni">Alumni</Link>
            </div>

            </div>

        </div>
    )
}
