import { useEffect, useState } from "react";
import { Stops } from "./stops";

interface StopTimes {
    trip_id: number;
    arrival_time: number;
    departure_time: number;
    stop_id: number;
    stop_sequence: number;
}

interface StopTimesProps {
    trip_id: number;
}

export const StopTimes: React.FC<StopTimesProps> = ({ trip_id }) => {
    const [stoptime, setStoptime] = useState<StopTimes[]>([]);

    useEffect(() => {
        fetch(`http://10.72.244.178:3000/api/stop-times?trip_id=${trip_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("API response", data);
                const stoptimesData: StopTimes[] = data.stop_times || data;
                setStoptime(stoptimesData);
            })
            .catch((err) => console.error("Error fetching stop times:", err));
    }, [trip_id]);

    const stopIds: number[] = stoptime.map((stop) => stop.stop_id);

    return (
        <>
            {stoptime.length > 0 ? ( // ✅ Fixed condition
                <div>
                    {stopIds.length > 0 && <Stops stop_ids={stopIds} />} // Ensure `stopIds` is not empty
                </div>
            ) : (
                <p>No trips available.</p>
            )}
        </>
    );
};
