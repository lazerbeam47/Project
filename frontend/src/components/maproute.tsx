import Map from "./map";

interface MapRouteProps {
  coordinates: { lat: number; lng: number }[];
}

export default function MapRoute({ coordinates }: MapRouteProps) {
  return <Map coordinates={coordinates} />;
}

// import { useEffect, useRef } from "react";

// const BENGALURU_CENTER = { lat: 12.9716, lng: 77.5946 };

// interface MapProps {
//   coordinates: { lat: number; lng: number }[];
// }

// export default function Map({ coordinates }: MapProps) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<google.maps.Map | null>(null);

//   useEffect(() => {
//     const loadGoogleMaps = () => {
//       if (window.google) {
//         (window as any).initMap();
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);
//     };

//     (window as any).initMap = () => {
//       if (mapRef.current && window.google) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: BENGALURU_CENTER,
//           zoom: 13,
//           scrollwheel: true,
//           draggable: true,
//           disableDoubleClickZoom: true,
//           zoomControl: true,
//         });

//         mapInstance.current = map;
//         plotPolyline(map);
//       }
//     };

//     const plotPolyline = (map: google.maps.Map) => {
//       if (coordinates.length < 2) return;

//       new window.google.maps.Polyline({
//         path: coordinates,
//         geodesic: true,
//         strokeColor: "#FF0000",
//         strokeOpacity: 1.0,
//         strokeWeight: 4,
//         map,
//       });
//     };

//     loadGoogleMaps();
//   }, [coordinates]);

//   return <div ref={mapRef} style={{ height: "calc(103vh - 2rem)", width: "100%" }} />;
// }
