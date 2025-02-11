

import {RouteList} from "./routelist";

export const Sidebar = () => {
  return (
    <div className="h-screen w-full p-4 bg-gray-100 overflow-y-auto">
      {/* Routes List */}
      <RouteList />
    </div>
  );
};
