import { useState, useEffect } from "react";
import useFetchLocation from "./FetchLocation";

export default function useFetchGoogle(sports) {
    const {location, isPendingLocation, errorLocation } = useFetchLocation();
    const [googleData, setGoogleData] = useState(null);
    const [isPendingGoogle, setIsPendingGoogle] = useState(true);
    const [errorGoogle, setErrorGoogle] = useState(null);
    const SERP_API_KEY = 'b4e205c50f8dc82ad69e46049b1ff39056bdf634f4aff0d6784ba5aa81063456';
    useEffect(() => {
        if (!isPendingLocation && sports.length > 0) {
            setIsPendingGoogle(true);
            const sportsEventsUrl = `https://serpapi.com/search.json?engine=google_events&q=${sports}&near=${location.city}&gl=us&hl=en&num=20&api_key=`+SERP_API_KEY;            
            console.log("url: ", sportsEventsUrl);
            fetch(sportsEventsUrl)
            .then(res => res.json())
            .then(data => {
                const sportsResults = data.events_results.map(event => ({
                    name: event.title,
                    location: event.address.join(' '),
                    hours: event.date.when ? event.date.when : 'No hours available',
                    link: event.link
                }));
                setGoogleData(sportsResults);
                setIsPendingGoogle(false);
            })
            .catch(error => {
                setErrorGoogle(error.message);
                setIsPendingGoogle(false);
            })
        }
    }, [isPendingLocation]);

    return { googleData, isPendingGoogle, errorGoogle };
}
