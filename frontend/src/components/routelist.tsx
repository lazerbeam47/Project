import { useState, useEffect } from "react";
import { SearchBar } from "./searchbar";
import { Trips } from "./trips";

interface Route {
  route_id: number;
  route_desc: string;
  route_type: number;
}

export const RouteList: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null); // ✅ State to store selected route_id

  useEffect(() => {
    fetch("http://10.72.244.178:3000/api/routes")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        const routeData: Route[] = data.routes || data;
        setRoutes(routeData);
        setFilteredRoutes(routeData);
      })
      .catch((err) => console.error("Error fetching routes:", err));
  }, []);

  return (
    <div className="h-screen w-full p-4 bg-gray-100">
      <h2 className="flex justify-center text-lg font-bold mb-2">Available Routes</h2>

      {/* Pass full data and function to SearchBar */}
      <SearchBar routes={routes} setFilteredRoutes={setFilteredRoutes} />

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left">Route ID</th>
            <th className="border px-4 py-2 text-left">Route Description</th>
            <th className="border px-4 py-2 text-left">Route Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <tr key={route.route_id} className="border">
                <td className="border px-4 py-2">{route.route_id}</td>
                <td className="border px-4 py-2">{route.route_desc}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => setSelectedRoute(route.route_id)} // ✅ Set selectedRoute on click
                  >
                    Find Route
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No matching routes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/*Conditionally Render Trips */}
      {selectedRoute !== null && <Trips route_id={selectedRoute} />}
    </div>
  );
};







