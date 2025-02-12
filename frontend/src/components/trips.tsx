import { useEffect, useState } from "react";
import {StopTimes} from "./stop_times"
interface Trip {
    route_id: number;
    service_id: string;
    trip_id: number;
}

interface TripsProps {
    route_id: number; //Receiving `route_id` as prop
}

export const Trips: React.FC<TripsProps> = ({ route_id }) => {
    const [trips, setTrips] = useState<Trip[]>([]);
    useEffect(() => {
        fetch(`http://10.72.244.178:3000/api/trips?route_id=${route_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
                const tripData: Trip[] = data.trips || data;
                const filteredTrips = tripData.filter(trip => trip.route_id === route_id);
                setTrips(filteredTrips);
            })
            .catch((err) => console.error("Error fetching trips:", err));
    }, [route_id]); //fetch data when the route_id changes

    const curr_trip_id = trips.length > 0 ? trips[0].trip_id : null;

    return (
        <div>
            <h2>Trips for Route ID: {route_id}</h2>
            {trips.length > 0 ? (
                <div>
                    {curr_trip_id && <StopTimes trip_id={curr_trip_id} />} 
                    {/*here we send the specific trip id to stop times to get the stop id*/}
                </div>
            ) : (
                <p>No trips available.</p>
            )}
        </div>
    );
};
