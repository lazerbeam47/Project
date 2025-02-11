import { useState } from "react";

interface Route {
  route_id: number;
  route_desc: string;
  route_type: number;
}

interface SearchBarProps {
  routes: Route[];
  setFilteredRoutes: (routes: Route[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ routes, setFilteredRoutes }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = routes.filter(
      (route) =>
        route.route_desc.toLowerCase().includes(value) || 
        route.route_id.toString().includes(value)
    );

    setFilteredRoutes(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search routes..."
      value={query}
      onChange={handleSearch}
      className="p-2 w-full border rounded mb-3"
    />
  );
};

