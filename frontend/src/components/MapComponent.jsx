import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { ArrowLeft, ChevronRight } from 'lucide-react'; // Import ArrowLeft and ChevronRight icons
import FriendsLocation from './FriendsLocation'; // Import FriendsLocation component

const friendsLocations = [
  { id: 1, name: 'Friend 1', coordinates: [2.3522, 48.8566] }, // Paris
  { id: 2, name: 'Friend 2', coordinates: [-0.1276, 51.5074] }, // London
  { id: 3, name: 'Friend 3', coordinates: [-74.006, 40.7128] }, // New York
  { id: 4, name: 'Friend 4', coordinates: [139.6917, 35.6895] }, // Tokyo
  { id: 5, name: 'Ghaziabad', coordinates: [77.4538, 28.6692] }, // Ghaziabad, India
  { id: 6, name: 'Location 1', coordinates: [77.43464279174805, 28.637487411499023] }, // First location
  { id: 7, name: 'Location 2', coordinates: [77.4596643, 28.6378506] }, // Second location
  { id: 8, name: 'Location 3', coordinates: [77.4818807, 28.6927771] }, // Third location
  { id: 9, name: 'Location 4', coordinates: [77.449791, 28.667856] }, // Fourth location
];

const MapComponent = () => {
  const mapElement = useRef();
  const navigate = useNavigate();
  const [showFriendsLocation, setShowFriendsLocation] = useState(false);

  useEffect(() => {
    const vectorSource = new VectorSource({
      features: friendsLocations.map(friend => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(friend.coordinates)),
          name: friend.name,
        });
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // Placeholder icon
            scale: 0.05,
          }),
        }));
        return feature;
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([77.4538, 28.6692]), // Center on Ghaziabad, India
        zoom: 10,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', backgroundColor: '#2a2b2a' }}>
      <div ref={mapElement} style={{ width: '900px', height: '600px', border: '2px solid #000', borderRadius: '10px' }} />
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          // backgroundColor: '#fff',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          // boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={() => setShowFriendsLocation(!showFriendsLocation)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          // backgroundColor: '#fff',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          // boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        <ChevronRight size={24} />
      </button>
      {showFriendsLocation && (
        <div style={{ position: 'absolute', top: '20px', left: '60px', zIndex: 1000 }}>
          <FriendsLocation />
        </div>
      )}
    </div>
  );
};

export default MapComponent;