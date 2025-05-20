import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

// define constants
const NATURAL_EVENT_WILDFIRE = 8;

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markersData = eventData.map(ev => {
        // FIRMS data is already filtered for fires. We just need to ensure coordinates exist.
        if (ev.geometries && ev.geometries[0] && ev.geometries[0].coordinates) {
            const lat = ev.geometries[0].coordinates[1];
            const lng = ev.geometries[0].coordinates[0];
            return {
                element: (
                    <LocationMarker
                        key={ev.id} // Use the ID generated in App.js
                        lat={lat}
                        lng={lng}
                        onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
                    />
                )
            };
        }
        return null;
    }).filter(markerData => markerData !== null);

    const handleApiLoaded = (map, maps) => {
        // Temporarily disable MarkerClusterer logic
        /*
        new MarkerClusterer({
            map,
            markers: markersData.map(marker => new maps.Marker({
                position: { lat: marker.lat, lng: marker.lng },
                map,
                icon: marker.element
            }))
        });
        */
    };

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCvJfzuhKH-r-5YjGkMwxLpxdfQAPWhkHw' }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {markersData.map(data => data.element)}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map