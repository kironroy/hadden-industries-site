import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import lightMarkerIcon from "./lig_map_marker.svg";
import darkMarkerIcon from "./drk_map_marker.svg";
import "../index.css";
import "./Locations.css";

function Locations() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const darkModeListener = window.matchMedia("(prefers-color-scheme: dark)");
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);

    darkModeListener.addEventListener("change", handleDarkModeChange);
    return () =>
      darkModeListener.removeEventListener("change", handleDarkModeChange);
  }, []);

  const tileUrl = isDarkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const markerIcon = L.icon({
    iconUrl: isDarkMode ? darkMarkerIcon : lightMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });

  return (
    <div>
      <h1>Hokkaido, Japan</h1>
      <MapContainer
        // Nairobi, Kenya coordinates: [-1.286389, 36.817223]
        // Hokkaido, Japan coordinates: [43.2203, 142.8635]
        center={[43.2203, 142.8635]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url={tileUrl} />
        <Marker position={[43.2203, 142.8635]} icon={markerIcon}>
          <Popup>Hadden Industries Headquarters</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Locations;
