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

    //2006 Housing Standard (Housing_st)

//     map2.addLayer({
//         'id': '2006_housingst',
//         'type': 'fill',
//         'source': 'cmhc_data',
//         'paint': {

//     // refer to legend in experience builder to classify each layer
//     //         'circle-radius': [
//     //             'interpolate', //INTERPOLATE expression produces continuous results by interpolating between value pairs
//     //             ['linear'], //linear interpolation between stops but could be exponential ['exponential', base] where base controls rate at which output increases
//     //             ['zoom'], //zoom expression changes appearance with zoom level
//     //             10, 7, // when zoom is 10 (or less), radius will be 7px
//     //             12, 5 // when zoom is 12 (or greater), radius will 5px
//     //        ],
//     //    'circle-color': [
//     //        'step', // STEP expression produces stepped results based on value pairs //Classify biking points based on type of bike parking capacity in column: Bicycle_capacity to display ramp colour on points
//     //        ['get', 'BICYCLE_CAPACITY'], // GET expression retrieves property value from 'capacity' data field
//     //        '#f07dcf', // Colour assigned to any values < first step (so 0-9)
//     //        10, '#d10496', // Colours assigned to values >= each step (10-19)
//     //        20, '#d9027c', // >=(20-29)
//     //        30, '#9c0259', // >=(30-119)
//     //        120, '#52022f', // >=(120)
//         }
//     });
    
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