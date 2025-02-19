import { useEffect } from "react";

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
    useEffect(() => {
        if (stop_ids.length === 0) return;

        fetch("http://10.72.244.178:3000/api/stops")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data); // Log full API response
                console.log("Received stop_ids:", stop_ids); // Log stop_ids from props

                const stopsData: Stop[] = data.stops || [];
                const filteredStops: Stop[] = [];

                // Using a for loop to filter stops
                for (let i = 0; i < stopsData.length; i++) {
                    for (let j = 0; j < stop_ids.length; j++) {
                        if (stopsData[i].stop_id == stop_ids[j]) {
                            filteredStops.push(stopsData[i]);
                            break; // Exit inner loop once a match is found
                        }
                    }
                }

                console.log("Filtered Stops:", filteredStops); // Log filtered stops

                // Extract lat/lng pairs
                const coordinatesArray = [];
                for (let i = 0; i < filteredStops.length; i++) {
                    coordinatesArray.push({
                        lat: filteredStops[i].stop_lat,
                        lng: filteredStops[i].stop_lon
                    });
                }

                console.log("Filtered Coordinates:", coordinatesArray); // 🔹 Print coordinates
            })
            .catch((err) => {
                console.error("Error fetching stops:", err);
            });
    }, [stop_ids]);

    return null; // No UI, just logging data
};
