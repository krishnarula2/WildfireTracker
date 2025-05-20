# 🔥 Wildfire Tracker (Powered by NASA Data) 🔥

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Google Maps API](https://img.shields.io/badge/Google_Maps-API-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![NASA FIRMS](https://img.shields.io/badge/Data_Source-NASA_FIRMS-E03C31?style=for-the-badge&logo=nasa&logoColor=white)](https://firms.modaps.eosdis.nasa.gov/)

A web application that visualizes wildfire data from NASA's Fire Information for Resource Management System (FIRMS) on an interactive Google Map. Stay informed about active fire incidents around the globe.

*(Currently using globally distributed mock data for demonstration purposes while live data fetching is being refined.)*

---


## ✨ Key Features

*   **Interactive Map:** Displays wildfire locations using Google Maps.
*   **Global Coverage (Mock Data):** Currently visualizes mock fire incidents across various global regions.
*   **Location Markers:** Clear visual indicators for each fire incident.
*   **Information Pop-ups:** (Future/Planned) Click on a fire icon to get more details (e.g., date, intensity).
*   **Loading State:** Shows a loader while data is being prepared.
*   **Responsive Design:** Adapts to different screen sizes.

---

## 🛠️ Technologies Used

*   **Frontend:**
    *   [React](https://reactjs.org/) (v18)
    *   [Google Map React](https://github.com/google-map-react/google-map-react) - For embedding Google Maps.
    *   [Iconify](https://iconify.design/) - For icons (e.g., fire icon).
*   **Data Source (Intended):**
    *   [NASA FIRMS (Fire Information for Resource Management System)](https://firms.modaps.eosdis.nasa.gov/) - Provides active fire data.
*   **Development Tools:**
    *   [Create React App](https://create-react-app.dev/)
    *   [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) (for proxying API requests during development)
    *   Git & GitHub

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js and npm](https://nodejs.org/) (LTS version recommended)
*   A Google Maps JavaScript API Key.
    *   Visit the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) to create a project and enable the "Maps JavaScript API".
    *   Secure your API key by restricting its usage (e.g., to `localhost` for development).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/krishnarula2/WildfireTracker.git
    cd WildfireTracker
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Configure Google Maps API Key:**
    *   Open the file `src/components/Map.js`.
    *   Find the line with `bootstrapURLKeys={{ key: 'YOUR_API_KEY_HERE' }}`.
    *   Replace `YOUR_API_KEY_HERE` with your actual Google Maps JavaScript API key.
        *Note: The current code has a placeholder key. Ensure you replace it.*
    ```javascript
    // src/components/Map.js
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY' }} // <-- REPLACE THIS
        // ... other props
    >
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your default web browser, usually at `http://localhost:3000`.

---

## 📖 How to Use

*   Once the application loads, you will see a world map.
*   Fire icons indicate the locations of (currently mock) active wildfires.
*   You can pan and zoom the map to explore different regions.

---

## 📊 Data Source

This project aims to use live data from **NASA's Fire Information for Resource Management System (FIRMS)**. FIRMS distributes Near Real-Time (NRT) active fire data within 3 hours of satellite observation from MODIS (Moderate Resolution Imaging Spectroradiometer) and VIIRS (Visible Infrared Imaging Radiometer Suite).

*   [About NASA FIRMS](https://www.earthdata.nasa.gov/learn/find-data/near-real-time/firms)
*   [FIRMS FAQ](https://faq.firms.modaps.eosdis.nasa.gov/)

**Note:** The application is currently configured to use globally distributed mock data for development and demonstration while the live data fetching via a proxy is being refined.


## 🧑‍💻 Author

*   **Krish Narula**
