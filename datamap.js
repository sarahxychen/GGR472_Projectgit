/*--------------------------------------------------------------------
//SOCIOECONOMIC MAP SECTION- SARAH
--------------------------------------------------------------------*/

// Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWh4eWNoZW4iLCJhIjoiY2xyZnB4c2h0MDhnMzJqcGpvZ2sxOHk4byJ9.yIz3cOJ6CJBeoUb3hvbBFA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initialize data map and edit to your preference
const map2 = new mapboxgl.Map({
    container: 'datamap', // container id in HTML
    style: 'mapbox://styles/sarahxychen/clskmpfs603tf01p25v25bs4j',  //change if we want
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12 // starting zoom level
  });

// Add zoom and full screen controls to the map.
map2.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.FullscreenControl());

//View GeoJSON data on map as interactive layer: CMHC Data

let cmhcgeojson;

// Fetch GeoJSON from URL and store response as JSON
fetch('https://raw.githubusercontent.com/sarahxychen/GGR472_Projectgit/main/Data_/CHMC_combined.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        cmhcgeojson = response; // Store geojson as variable using URL from fetch response
    });

//View and style source data as geojson 
map2.on('load', () => {
    map2.addSource('cmhc_data', {
        type: 'geojson',
        data: cmhcgeojson
    });
    
    map2.addLayer({
        'id': 'cmhc_data',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
          'fill-color': 'grey',
          'fill-opacity': 0.4,
          'fill-outline-color': 'blue'
        }
    });
    
});

//View GeoJSON data on map as interactive layer: Census data

let censusgeojson;

// Fetch GeoJSON from URL and store response as JSON
fetch('https://raw.githubusercontent.com/sarahxychen/GGR472_Projectgit/main/Data_/CensusData.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        censusgeojson = response; // Store geojson as variable using URL from fetch response
    });

//View and style source data as geojson 
map2.on('load', () => {
    map2.addSource('census_data', {
        type: 'geojson',
        data: censusgeojson
    });
    
    map2.addLayer({
        'id': 'census_data',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
          'fill-color': 'blue',
          'fill-opacity': 0.4,
          'fill-outline-color': 'blue'
        }
    });
    
});

 //Add toggle feature for each layer

//Change housing layer display based on check box using setLayoutProperty method
    document.getElementById('cmhc_data').addEventListener('change', (e) => {
        map2.setLayoutProperty(
            'cmhc_data',
            'visibility',
             e.target.checked ? 'visible' : 'none'
         );
    });

//Change census layer display based on check box using setLayoutProperty method
    document.getElementById('census_data').addEventListener('change', (e) => {
        map2.setLayoutProperty(
            'census_data',
            'visibility',
             e.target.checked ? 'visible' : 'none'
        );
    });

