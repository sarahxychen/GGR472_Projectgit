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
    
    // map2.addLayer({
    //     'id': 'cmhc_data',
    //     'type': 'fill',
    //     'source': 'cmhc_data',
    //     'paint': {
    //       'fill-color': 'grey',
    //       'fill-opacity': 0.4,
    //       'fill-outline-color': 'blue'
    //     }
    // });

//View and classify variable layers (Lecture 6 to classify ramp colouring)

    //2006 Housing Standard (Housing_st) 

    map2.addLayer({
        'id': '2006_housingst',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Housing_st'], // GET expression retrieves property value from 'Housing_st' data field
                '#edf8fb', // Colour assigned to any values < first step (so 0-0.1)
                0.1, '#b3cde3', // Colours assigned to values >= each step (0.1-17.2)
                17.2, '#8c96c6', // >=(17.2-24.8)
                24.8, '#8856a7', // >=(24.8-31.5)
                31.5, '#810f7c', // >=((31.5-46.3)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2011 Housing Standard (Total_)

    map2.addLayer({
        'id': '2011_housingst',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Total_'], 
                '#edf8fb', // Colour assigned to any values < first step (so 0-0.1)
                0.1, '#b3cde3', // (0.1-13.1)
                13.1, '#8c96c6', // (13.1-20.3)
                20.3, '#8856a7', // (20.3-27.6)
                27.6, '#810f7c', // >=(27.6-45.0)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2016 Housing Standard (Housing__2)

    map2.addLayer({
        'id': '2016_housingst',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Housing__2'], 
                '#edf8fb', // Colour assigned to any values < first step (so 0-4.9)
                4.9, '#b3cde3', // (4.9-17.3)
                17.3, '#8c96c6', // (17.3-24.5)
                24.5, '#8856a7', // (24.5-31.8)
                31.8, '#810f7c', // >=(31.8-47.3)
                ],
            'fill-outline-color': 'grey'
        },
    });
    
});

    //2006 Property Value (Value_dwel)

    //2011 Property Value (Value_dw_1)

    //2016 Property Value (Value_dw_2)

//Add toggle feature for each layer

//Toggle Housing Standard 2006
document.getElementById('2006_housingst').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2006_housingst',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Housing Standard 2011
document.getElementById('2011_housingst').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2011_housingst',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Housing Standard 2016
document.getElementById('2016_housingst').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2016_housingst',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

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
    
    // map2.addLayer({
    //     'id': 'census_data',
    //     'type': 'fill',
    //     'source': 'census_data',
    //     'paint': {
    //       'fill-color': 'blue',
    //       'fill-opacity': 0.4,
    //       'fill-outline-color': 'blue'
    //     }
    // });
    
});

// //Change housing layer display based on check box using setLayoutProperty method
// document.getElementById('cmhc_data').addEventListener('change', (e) => {
//     map2.setLayoutProperty(
//         'cmhc_data',
//         'visibility',
//          e.target.checked ? 'visible' : 'none'
//      );
// });

// //Change census layer display based on check box using setLayoutProperty method
//     document.getElementById('census_data').addEventListener('change', (e) => {
//         map2.setLayoutProperty(
//             'census_data',
//             'visibility',
//              e.target.checked ? 'visible' : 'none'
//         );
//     });

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
//Add dynamic legends for each layer (Week 8 demo 2)
--------------------------------------------------------------------*/
// Housing Standard legend (with all 3 years)

//Declare array variables for labels and colours
const legendlabels_2006 = [
    '2006:',
    '0-0.1',
    '0.1-17.2',
    '17.2-24.8',
    '24.8-31.5',
    '31.5-46.3'
];

const legendlabels_2011 = [
    '2011:',
    '0-0.1',
    '0.1-13.1',
    '13.1-20.3',
    '20.3-27.6',
    '27.6-45.0'
];

const legendlabels_2016 = [
    '2016:',
    '0-4.9',
    '4.9-17.3',
    '17.3-24.5',
    '24.5-31.8',
    '31.8-47.3'
];

const legendcolours = [
    'rgba(255, 255, 255, 0.8)',
    '#edf8fb',
    '#b3cde3',
    '#8c96c6',
    '#8856a7',
    '#810f7c'
];

//Declare legend variable using legend div tag
const legend = document.getElementById('legend');

//For each layer create a block to put the colour and label in- 2006
legendlabels_2006.forEach((label_2006, i) => {
    const colour = legendcolours[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label_2006}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legend.appendChild(item); //add row to the legend
});

//2011 block- colour and label 
legendlabels_2011.forEach((label_2011, i) => {
    const colour = legendcolours[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-key'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2011}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legend.appendChild(item); 
});

//2016 block- colour and label 
legendlabels_2016.forEach((label_2016, i) => {
    const colour = legendcolours[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-key'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2016}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legend.appendChild(item); 
});

//Change display of legend based on check box
let legendcheck = document.getElementById('legendcheck');

legendcheck.addEventListener('click', () => {
    if (legendcheck.checked) {
        legendcheck.checked = true;
        legend.style.display = 'block';
    }
    else {
        legend.style.display = "none";
        legendcheck.checked = false;
    }
});
    

// //2006 Housing Standard (Housing_st)


// //Declare array variables for labels and colours
// const legendlabels = [
//     '0-0.1',
//     '0.1-17.2',
//     '17.2-24.8',
//     '24.8-31.5',
//     '31.5-46.3'
// ];

// const legendcolours = [
//     '#edf8fb',
//     '#b3cde3',
//     '#8c96c6',
//     '#8856a7',
//     '#810f7c'
// ];

// //Declare legend variable using legend div tag
// const legend = document.getElementById('legend');

// //For each layer create a block to put the colour and label in
// legendlabels.forEach((label, i) => {
//     const colour = legendcolours[i];

//     const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
//     const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

//     key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
//     key.style.backgroundColor = colour; // the background color is retreived from teh layers array

//     const value = document.createElement('span'); //add a value variable to the 'row' in the legend
//     value.innerHTML = `${label}`; //give the value variable text based on the label

//     item.appendChild(key); //add the key (colour cirlce) to the legend row
//     item.appendChild(value); //add the value to the legend row

//     legend.appendChild(item); //add row to the legend
// });


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