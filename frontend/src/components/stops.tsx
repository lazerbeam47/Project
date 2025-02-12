import { useState, useEffect } from "react";

interface Stop {
    stop_id: number;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
}

interface StopsProps {
    stop_ids: number[];
}

export const Stops: React.FC<StopsProps> = ({ stop_ids }) => {
    const [stops, setStops] = useState<Stop[]>([]);
    const [filteredStops, setFilteredStops] = useState<Stop[]>([]); // ✅ Store filtered stops

    useEffect(() => {
        fetch("http://10.72.244.178:3000/api/stops")
            .then((res) => res.json())
            .then((data) => {
                console.log("API response", data);
                const stopsData: Stop[] = data.stops || data;

                // ✅ Correct filtering based on stop_ids
                const filtered = stopsData.filter((stop) => stop_ids.includes(stop.stop_id));

                setStops(stopsData);
                setFilteredStops(filtered);
            })
            .catch((err) => console.error("Error fetching stops:", err));
    }, [stop_ids]);
    return(
        <>
    
        </>
    )
}