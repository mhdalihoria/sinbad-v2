import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEmoptrYPGjPcTVhsDsq3XQTVLQsI92oY",
  });

  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={10}
      center={center}
      // center={{ lat: 33.5155782, lng: 36.297679 }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
