import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = ({ posData }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const { data } = posData.pos;
  const center = useMemo(
    () => ({ lat: Number(posData.lat), lng: Number(posData.lng) }),
    []
  );


  const MarkerElements = data.map(position => {
    return <Marker position={{
      lat: Number(position.lat),
      lng: Number(position.lng)
    }} title={position.description}/>
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      {MarkerElements}
    </GoogleMap>
  );
};

export default Map;
// import {useEffect, useRef} from 'react';
// import {Loader} from '@googlemaps/js-api-loader';
// function Map({posData}) {

//   const {data} = posData.pos

//   const googlemap = useRef(null);  useEffect(() => {
//     const loader = new Loader({
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//       version: 'weekly',
//     });
//     let map;
//     loader.load().then(() => {
//       map = new google.maps.Map(googlemap.current, {
//         center: {lat: Number(posData.lat), lng: Number(posData.lng)},
//         zoom: 12,

//       });

//       for (let position of data) {
//         return new google.maps.Marker({
//           map: map,
//           position: {
//             lat: Number(position.lat),
//             lng: Number(position.lng)
//           },
//           title: position.description,
//         });
//       }
//     });
//   });  return (
//     <div style={{width: "100%", height: "500px"}} ref={googlemap} />
//   );
// }

// export default Map
