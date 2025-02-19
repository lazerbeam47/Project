import { useEffect, useRef, useState } from "react";

const BENGALURU_CENTER = { lat: 12.9716, lng: 77.5946 };

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const polylineInstance = useRef<any>(null);
    const [cachedCoordinates, setCachedCoordinates] = useState<{ lat: number; lng: number }[]>([]);

    // ✅ Load Google Maps API
    useEffect(() => {
        const loadGoogleMaps = () => {
            if (window.google) {
                console.log("✅ Google Maps API already loaded.");
                (window as any).initMap();
                return;
            }

            console.log("⏳ Loading Google Maps API...");
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };

        (window as any).initMap = () => {
            if (mapRef.current && window.google) {
                console.log("✅ Google Maps API Loaded.");
                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: BENGALURU_CENTER,
                    zoom: 12,
                    restriction: {
                        latLngBounds: {
                            north: 13.1736,
                            south: 12.7696,
                            east: 77.7946,
                            west: 77.3946,
                        },
                        strictBounds: true,
                    },
                    scrollwheel: true,
                    draggable: true,
                    disableDoubleClickZoom: true,
                    zoomControl: false,
                });

                console.log("✅ Map initialized successfully.");
            }
        };

        loadGoogleMaps();
    }, []);

    // ✅ Simulating coordinate fetching & caching
    useEffect(() => {
        console.log("📡 Fetching polyline coordinates...");
        // Simulate API response
        setTimeout(() => {
            const fetchedCoordinates = [
                { lat: 12.99676, lng: 77.56877 },
                { lat: 13.00084, lng: 77.53588 },
                { lat: 12.99858, lng: 77.55574 },
                { lat: 12.98115, lng: 77.57466 },
            ];
            setCachedCoordinates(fetchedCoordinates);
            console.log("📌 Cached Coordinates:", fetchedCoordinates);
        }, 1000); // Simulate network delay
    }, []);

    // ✅ Add polyline & markers to map when coordinates change
    useEffect(() => {
        if (!window.google || !mapInstance.current) {
            console.error("❌ Google Maps API not loaded OR Map instance not ready.");
            return;
        }

        if (cachedCoordinates.length < 2) {
            console.warn("⚠️ Not enough coordinates to draw a polyline.");
            return;
        }

        console.log("📍 Adding Polyline & Markers to the map...");

        // Remove existing polyline if any
        if (polylineInstance.current) {
            polylineInstance.current.setMap(null);
            console.log("🗑 Removed existing polyline.");
        }

        // ✅ Create Blue Polyline
        polylineInstance.current = new window.google.maps.Polyline({
            path: cachedCoordinates,
            geodesic: true,
            strokeColor: "#0000FF", // Blue color
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        polylineInstance.current.setMap(mapInstance.current);
        console.log("✅ Polyline successfully added to the map.");

        // ✅ Fit map to polyline
        const bounds = new window.google.maps.LatLngBounds();
        cachedCoordinates.forEach(coord => bounds.extend(coord));
        mapInstance.current.fitBounds(bounds);
        console.log("🔎 Zoomed into polyline.");

        // ✅ Add Start & End Markers
        new window.google.maps.Marker({
          position: cachedCoordinates[0],
          map: mapInstance.current,
          label: {
              text: "Start", // Label on top of marker
              color: "#FFFFFF", // White text
              fontSize: "14px",
              fontWeight: "bold",
          },
          title: "Start",
          icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green for Start
          },
      });
      
      

        new window.google.maps.Marker({
    position: cachedCoordinates[cachedCoordinates.length - 1],
    map: mapInstance.current,
    label: {
        text: "End", // Label on top of marker
        color: "#FFFFFF", // White text
        fontSize: "14px",
        fontWeight: "bold",
    },
    title: "End",
    icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red for End
    },
});


        console.log("📍 Start and End markers added.");

        // ✅ Add Bus Stop Markers (🚍)
        cachedCoordinates.forEach((coord, index) => {
            new window.google.maps.Marker({
                position: coord,
                map: mapInstance.current,
                title: `Bus Stop ${index + 1}`,
                icon: {
                    url: "https://maps.gstatic.com/mapfiles/ms2/micons/bus.png", // Bus stop icon
                    scaledSize: new window.google.maps.Size(32, 32),
                },
            });
        });

        console.log("🚌 Bus stop markers added.");
    }, [cachedCoordinates]);

    return <div ref={mapRef} style={{ height: "calc(100vh - 2rem)", width: "100%" }} />;
}
