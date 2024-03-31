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


/*--------------------------------------------------------------------
//View GeoJSON data on map as interactive layer: CMHC Data
--------------------------------------------------------------------*/

let cmhcgeojson;

// Fetch GeoJSON from URL and store response as JSON
fetch('https://raw.githubusercontent.com/sarahxychen/GGR472_Projectgit/main/Data_/CHMC_datav2.geojson')
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

//2006 Housing Standard (Housing_st) (Lecture 6 to classify ramp colouring)

    map2.addLayer({
        'id': '2006_housingst',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs //Classify biking points based on type of bike parking capacity in column: Bicycle_capacity to display ramp colour on points
                ['get', 'Housing_st'], // GET expression retrieves property value from 'capacity' data field
                '#edf8fb', // Colour assigned to any values < first step (so 0-0.1)
                0.1, '#b3cde3', // Colours assigned to values >= each step (0.1-17.2)
                17.2, '#8c96c6', // >=(17.2-24.8)
                24.8, '#8856a7', // >=(24.8-31.5)
                31.5, '#810f7c', // >=((31.5-46.3)
                ],
            'fill-opacity': 0.8, //Opacity set to 0.8 to see and interact with layers underneath still
            'fill-outline-color': 'black'
        },
    });
    
});

//View and classify variable layers

    //2006 Housing Standard (Housing_st)

    //2011 Housing Standard (Housing__1)

    //2016 Housing Standard (Housing__2)

    //2006 Property Value (Value_dwel)

    //2011 Property Value (Value_dw_1)

    //2016 Property Value (Value_dw_2)

/*--------------------------------------------------------------------
//View GeoJSON data on map as interactive layer: Census data
--------------------------------------------------------------------*/

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

//Toggle Housing Standard 2006
document.getElementById('2006_housingst').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2006_housingst',
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

//View and classify variable layers

    //2001 Income 

    //2016 Income

    //2016 Income

    //2001 Emplyment

    //2016 Employment

    //2021 Employment

    //2001 Pop

    //2016 Pop

    //2021 Pop

/*--------------------------------------------------------------------
//Add dynamic legends for each layer (Week 8)
--------------------------------------------------------------------*/
    
    //2006 Housing Standard (Housing_st)

    //2011 Housing Standard (Housing__1)

    //2016 Housing Standard (Housing__2)

    //2006 Property Value (Value_dwel)

    //2011 Property Value (Value_dw_1)

    //2016 Property Value (Value_dw_2)

    //2001 Income 

    //2016 Income

    //2016 Income

    //2001 Emplyment

    //2016 Employment

    //2021 Employment

    //2001 Pop

    //2016 Pop

    //2021 Pop