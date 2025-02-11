import {Sidebar} from "../components/sidebar";
import Map from "../components/map";

export const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - 25% width */}
      <div className="w-1/4 bg-grey-100 p-4 border-r">
        <Sidebar />
      </div>

      {/* Map - 75% width */}
      <div className="w-3/4">
        <Map />
      </div>

      <div>
        
      </div>
    </div>
  );
};

