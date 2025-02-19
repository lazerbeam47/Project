// import { useEffect, useState } from "react";
// import { Stops } from "./stops";

// interface StopTimes {
//     trip_id: number;
//     arrival_time: number;
//     departure_time: number;
//     stop_id: number;
//     stop_sequence: number;
// }

// interface StopTimesProps {
//     trip_id: number;
// }

// export const StopTimes: React.FC<StopTimesProps> = ({ trip_id }) => {
//     const [stoptime, setStoptime] = useState<StopTimes[]>([]);

//     useEffect(() => {
//         fetch(`http://10.72.244.178:3000/api/stop-times/${trip_id}`)


//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("API response", data);
//                 const stoptimesData: StopTimes[] = data.stop_times || data;
//                 setStoptime(stoptimesData);
//             })
//             .catch((err) => console.error("Error fetching stop times:", err));
//     }, [trip_id]);

//     const stopIds: number[] = stoptime.map((stop) => stop.stop_id);

//     return (
//         <>
//             {stoptime.length > 0 ? ( // ✅ Fixed condition
//                 <div>
//                     {stopIds.length > 0 && <Stops stop_ids={stopIds} />} // Ensure `stopIds` is not empty
//                 </div>
//             ) : (
//                 <p>No trips available.</p>
//             )}
//         </>
//     );
// };
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
        if (!trip_id) return; // Prevent unnecessary fetch calls

        fetch(`http://10.72.244.178:3000/api/stop-times/${trip_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("StopTimes API Response:", data); 
                if (data.stopTimes) {
                    setStoptime(data.stopTimes);
                } else {
                    console.warn("Invalid API response:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching stop times:", error);
            });
    }, [trip_id]);

    const stopIds: number[] = stoptime.map((stop) => stop.stop_id);

    console.log("Filtered Stop IDs:", stopIds); // ✅ Log the filtered stop IDs

    return (
        <>
            {stopIds.length > 0 ? (
                <div>
                    <Stops stop_ids={stopIds} />
                </div>
            ) : (
                <p>No stops available.</p>
            )}
        </>
    );
};
