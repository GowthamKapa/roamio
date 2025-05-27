/*import { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { getAuth } from 'firebase/auth';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = { lat: 40.7128, lng: -74.006 };

export default function MapScreen() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/bookmarks?userId=${user.uid}`);
        const data = await res.json();
        setBookmarks(data.bookmarks);
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      }
    };
    fetchBookmarks();
  }, [user]);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const loc = place.geometry.location;
    setMapCenter({ lat: loc.lat(), lng: loc.lng() });
    setSelectedPlace({
      lat: loc.lat(),
      lng: loc.lng(),
      name: place.name,
      address: place.formatted_address,
    });
  };

  if (!isLoaded) return <div className="text-center mt-10">Loading Map…</div>;

  return (
      <div className="relative w-screen h-screen">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
        >
          {bookmarks.map((bm) => (
            <Marker key={bm._id} position={{ lat: bm.lat, lng: bm.lng }} />
          ))}
          {selectedPlace && <Marker position={selectedPlace} />}
        </GoogleMap>

        {/* Overlay UI }
        <div className="absolute top-4 right-4 z-10 w-80">
          <Autocomplete onLoad={(auto) => (autocompleteRef.current = auto)} onPlaceChanged={onPlaceChanged}>
            <input
              className="w-full p-2 border rounded shadow"
              placeholder="Search for a place…"
            />
          </Autocomplete>
        </div>

        <div className="absolute top-4 left-4 z-10 text-xl font-bold bg-white px-4 py-2 rounded shadow">
          Roamio 🧭
        </div>
      </div>
  );
} */

  
// MapScreen.jsx (Recap of the one from the previous response)
import { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { getAuth } from 'firebase/auth';

// const containerStyle = { // This style is applied to GoogleMap's mapContainerStyle
//   width: '100%', 
//   height: '100%', // Ensures map fills its container
// };

const defaultCenter = { lat: 40.7128, lng: -74.006 };

export default function MapScreen() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    libraries: ['places'],
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/bookmarks?userId=${user.uid}`);
        const data = await res.json();
        setBookmarks(data.bookmarks);
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      }
    };
    fetchBookmarks();
  }, [user]);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const loc = place.geometry.location;
        const newCenter = { lat: loc.lat(), lng: loc.lng() };
        setMapCenter(newCenter);
        setSelectedPlace({
          lat: loc.lat(),
          lng: loc.lng(),
          name: place.name,
          address: place.formatted_address,
        });
        if (mapRef.current) {
          mapRef.current.panTo(newCenter);
          mapRef.current.setZoom(15);
        }
      } else {
        console.log('Autocomplete place not found or geometry missing');
      }
    }
  };

  if (!isLoaded) return <div className="text-center mt-10">Loading Map…</div>;

  return (
    // This div itself will be part of the <section> in Dashboard.jsx
    // The section in Dashboard.jsx is already h-screen.
    // The GoogleMap component below will fill this parent div.
    <div className="relative w-full h-full"> 
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }} // Critical for map to fill container
        center={mapCenter}
        zoom={13}
        onLoad={(map) => (mapRef.current = map)}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {bookmarks.map((bm) => (
          <Marker key={bm._id} position={{ lat: bm.lat, lng: bm.lng }} />
        ))}
        {selectedPlace && <Marker position={selectedPlace} />}
      </GoogleMap>

      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-3 bg-white p-4 rounded-lg shadow-lg w-80 md:w-96">
        <h1 className="text-3xl font-bold text-gray-800">🧭 Roamio</h1>
        <p className="text-md text-gray-600 italic">Explore. Bookmark. Roam.</p>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search for a place…"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </Autocomplete>
      </div>
    </div>
  );
}