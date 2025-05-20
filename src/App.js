import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './components/LocationMarker'
import LocationInfoBox from './components/LocationInfoBox'
import Map from './components/Map'
import Header from './components/Header'
import Loader from './components/Loader'

// define constants
const NATURAL_EVENT_WILDFIRE = 8;

// Expanded mock data for global distribution
const mockEventData = [];
const globalRegions = {
  NORTH_AMERICA_WEST: { latRange: [30, 60], lonRange: [-125, -100], count: 15 }, // Western N. America
  NORTH_AMERICA_EAST: { latRange: [25, 50], lonRange: [-100, -70], count: 10 }, // Eastern N. America
  SOUTH_AMERICA: { latRange: [-55, 12], lonRange: [-80, -35], count: 15 },     // South America
  EUROPE: { latRange: [35, 60], lonRange: [-10, 40], count: 15 },          // Europe
  AFRICA_NORTH: { latRange: [0, 35], lonRange: [-20, 50], count: 10 },       // Northern Africa
  AFRICA_SOUTH: { latRange: [-35, 0], lonRange: [10, 50], count: 10 },        // Southern Africa
  ASIA_RUSSIA: { latRange: [40, 70], lonRange: [40, 140], count: 10 },       // Russia/Central Asia
  ASIA_SOUTH_EAST: { latRange: [-10, 30], lonRange: [90, 150], count: 15 },  // SE Asia / Indonesia
  AUSTRALIA: { latRange: [-40, -10], lonRange: [110, 155], count: 10 }       // Australia
};

const getRandomCoords = (latRange, lonRange) => {
  const lat = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
  const lon = Math.random() * (lonRange[1] - lonRange[0]) + lonRange[0];
  return { lat, lon };
};

let fireIdCounter = 0;
for (const regionKey in globalRegions) {
  const region = globalRegions[regionKey];
  const numFires = region.count; // Use defined count per region
  for (let i = 0; i < numFires; i++) {
    fireIdCounter++;
    const { lat, lon } = getRandomCoords(region.latRange, region.lonRange);
    mockEventData.push({
      id: `fire-mock-${fireIdCounter}`,
      title: `Mock Fire ${fireIdCounter} (${lat.toFixed(2)}, ${lon.toFixed(2)}) - ${regionKey.replace(/_/g, ' ')}`,
      categories: [{ id: NATURAL_EVENT_WILDFIRE }],
      geometries: [{ coordinates: [lon, lat] }]
    });
  }
}

/* Previous smaller mock data - commented out
const mockEventData = [
  {
    id: 'fire-mock-1',
// ... (rest of old mock data) ...
  }
];
*/

const MapComponent = ({ eventData, center = { lat: 20, lng: 0 }, zoom = 2 }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = eventData.map((ev, index) => {
        if(ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} />
        }
        return null
    })

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={ center }
                defaultZoom={ zoom }
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

// Function to parse CSV text into an array of objects
/* Commenting out parseCSV for now
const parseCSV = (csvText) => {
    if (!csvText || typeof csvText !== 'string') {
        console.error("FIRMS Data: Invalid CSV text received");
        return [];
    }

    try {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            console.warn("FIRMS Data: CSV has no data rows or only a header.");
            return [];
        }

        // Remove any BOM character if present
        const firstLine = lines[0].replace(/^\uFEFF/, '');
        const headers = firstLine.split(',').map(header => header.trim().toLowerCase());
        console.log("FIRMS Data: Parsed Headers:", headers);

        const data = [];
        const latIndex = headers.indexOf('latitude');
        const lonIndex = headers.indexOf('longitude');

        if (latIndex === -1 || lonIndex === -1) {
            console.error("FIRMS Data: CSV headers missing 'latitude' or 'longitude'. Headers found:", headers);
            return [];
        }

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length !== headers.length) {
                console.warn(`FIRMS Data: Skipping malformed row ${i}:`, lines[i]);
                continue;
            }

            const lat = parseFloat(values[latIndex]);
            const lng = parseFloat(values[lonIndex]);
            
            if (isNaN(lat) || isNaN(lng)) {
                console.warn(`FIRMS Data: Invalid coordinates at row ${i}:`, lines[i]);
                continue;
            }

            const id = `fire-${lat}-${lng}-${i}`;
            data.push({
                id: id,
                title: `Fire Spot (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
                categories: [{ id: NATURAL_EVENT_WILDFIRE }],
                geometries: [{ coordinates: [lng, lat] }]
            });
        }

        console.log(`FIRMS Data: Successfully parsed ${data.length} fire locations`);
        return data;
    } catch (error) {
        console.error("FIRMS Data: Error parsing CSV:", error);
        return [];
    }
};
*/

function App() {
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log("Using mock fire data...");
        // Simulate API call delay
        setTimeout(() => {
            setEventData(mockEventData);
            setLoading(false);
            console.log("Mock fire data loaded:", mockEventData);
        }, 1000);

        /* Commenting out actual fetch for now
        const fetchFireData = async () => {
            setLoading(true);
            setError(null);
            console.log("FIRMS Data: Starting to fetch fire data via local proxy...");
            
            try {
                const res = await fetch('/firmsdata');
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('text/csv')) {
                    console.warn('FIRMS Data: Unexpected content type:', contentType);
                }

                const csvText = await res.text();
                if (csvText.trim().toLowerCase().startsWith('<!doctype html>')) {
                    throw new Error('Received HTML instead of CSV data');
                }

                const parsedData = parseCSV(csvText);
                if (parsedData.length === 0) {
                    throw new Error('No valid fire data found in the response');
                }

                setEventData(parsedData);
                setError(null);
            } catch (error) {
                console.error("FIRMS Data: Failed to fetch or parse fire data:", error);
                setError(error.message);
                setEventData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFireData();
        */
    }, []);

    return (
        <div>
            <Header />
            {error && <div className="error-message">Error: {error}</div>}
            {!loading ? <Map eventData={eventData} /> : <Loader />}
        </div>
    );
}

export default App;