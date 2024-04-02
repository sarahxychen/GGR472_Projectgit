/*--------------------------------------------------------------------
//SOCIOECONOMIC MAP SECTION- SARAH
--------------------------------------------------------------------*/

// Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWh4eWNoZW4iLCJhIjoiY2xyZnB4c2h0MDhnMzJqcGpvZ2sxOHk4byJ9.yIz3cOJ6CJBeoUb3hvbBFA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initialize data map and edit to your preference
const map2 = new mapboxgl.Map({
    container: 'datamap', // container id in HTML
    style: 'mapbox://styles/sarahxychen/clskmpfs603tf01p25v25bs4j',  //change if we want
    center: [-79.36, 43.715],  // starting point, longitude/latitude
    zoom: 10.45 // starting zoom level
  });

// Add zoom and full screen controls to the map.
map2.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.FullscreenControl());

/*--------------------------------------------------------------------
//Data set layer buttton interactivit
--------------------------------------------------------------------*/

//Toggle map container layers as button (APPLIES TO ALL 5 DATA SET LAYERS)
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/*--------------------------------------------------------------------
//Load CMHC data onto map as GeoJSON + classify layer visualizations
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

//Housing Suitability classification: 

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

//Housing Value classification: 

    //2006 Property Value (Value_dwel)

    map2.addLayer({
        'id': '2006_housingval',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Value_dwel'], 
                '#edf8fb', // Colour assigned to any values < first step (so 0-2757)
                2757, '#b2e2e2', // (2757-361068)
                361068, '#66c2a4', // (361068-551676)
                551676, '#2ca25f', // (551676-850786)
                850786, '#006d2c', // >=(850786-1243163)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2011 Property Value (Value_dw_1)

    map2.addLayer({
        'id': '2011_housingval',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Value_dw_1'], 
                '#edf8fb', // Colour assigned to any values < first step (so 0-3183)
                3183, '#b2e2e2', // (3183-422056)
                422056, '#66c2a4', // (422056-587261)
                587261, '#2ca25f', // (587261-851317)
                851317, '#006d2c', // >=(851317-1435459)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2016 Property Value (Total1)

    map2.addLayer({
        'id': '2016_housingval',
        'type': 'fill',
        'source': 'cmhc_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Total1'], 
                '#edf8fb', // Colour assigned to any values < first step (so 0-4895)
                4895, '#b2e2e2', // (4895-609025)
                609025, '#66c2a4', // (609025-799149)
                799149, '#2ca25f', // (799149-1164596)
                1164596, '#006d2c', // >=(1164596-2207725)
                ],
            'fill-outline-color': 'grey'
        },
    });
    
});

/*--------------------------------------------------------------------
//Housing Suitability: 2006-2016 tab
--------------------------------------------------------------------*/

//Step 1: View and classify variable layers (see load CMHC data section)

//Step 2: Add toggle feature for each layer (REDO SO LAYERS START OFF THEN TOGGLE TO TURN ON LIKE LEGEND AND CAN REARRANGE LAYERS)

//Toggle Housing Standard 2006 (starts on- check to turn off)
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

// Step 3: Housing Standard legend (with all 3 years) 

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

//Step 4: Change display of legend based on check box
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

/*--------------------------------------------------------------------
//Housing Value: 2006-2016 tab
--------------------------------------------------------------------*/
//Step 1: View and classify variable layers (see loading CMHC layer section)

// Step 2: Add toggle feature for each layer (REDO SO LAYERS START OFF THEN TOGGLE TO TURN ON LIKE LEGEND AND CAN REARRANGE LAYERS) (OR HAVE ONE LAYER ON AT A TIME)

//Toggle Housing Standard 2006 (starts on- check to turn off)
document.getElementById('2006_housingval').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2006_housingval',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Housing Standard 2011 
document.getElementById('2011_housingval').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2011_housingval',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Housing Standard 2016
document.getElementById('2016_housingval').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2016_housingval',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

// Step 3: Add Housing Property Value Legend (with all 3 years)

//Declare array variables for labels and colours
const legendlabels_2006val = [
    '2006:',
    '0-2757',
    '2757-361,068',
    '361,068-551,676',
    '551,676-850,786',
    '850,786-1,243,163'
];

const legendlabels_2011val = [
    '2011:',
    '0-3183',
    '3183-422,056',
    '422,056-587,261',
    '587,261-851,317',
    '851,317-1,435,459'
];

const legendlabels_2016val = [
    '2016:',
    '0-4895',
    '4895-609,025',
    '609,025-799,149',
    '799,149-1,164,596',
    '1,164,596-2,207,725'
];

const legendcoloursval = [
    'rgba(255, 255, 255, 0.8)',
    '#edf8fb',
    '#b2e2e2',
    '#66c2a4',
    '#2ca25f',
    '#006d2c'
];

//For each layer create a block to put the colour and label in- 2006
legendlabels_2006val.forEach((label_2006val, i) => {
    const colour = legendcoloursval[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-keyval'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label_2006val}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legendval.appendChild(item); //add row to the legend
});

//2011 block- colour and label 
legendlabels_2011val.forEach((label_2011val, i) => {
    const colour = legendcoloursval[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-key'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2011val}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendval.appendChild(item); 
});

//2016 block- colour and label 
legendlabels_2016val.forEach((label_2016val, i) => {
    const colour = legendcoloursval[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-key'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2016val}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendval.appendChild(item); 
});

//Step 4: Toggle display of legend

let legendcheck2 = document.getElementById('legendcheck2');

legendcheck2.addEventListener('click', () => {
    if (legendcheck2.checked) {
        legendcheck2.checked = true;
        legendval.style.display = 'block';
    }
    else {
        legendval.style.display = "none";
        legendcheck2.checked = false;
    }
});

/*--------------------------------------------------------------------
//Load Census data onto map as GeoJSON + classify layer visualizations
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

//Income data classification

    //2001 Income (Inc01)

    map2.addLayer({
        'id': '2001_inc',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Inc01'], 
                '#ffffcc', // Colour assigned to any values < first step (so 0-1)
                1, '#c2e699', // (1-460)
                461, '#78c679', // (461-715)
                716, '#31a354', // (716-1345)
                1346, '#006837', // >=(1346-2555)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2016 Income (Inc16)

    map2.addLayer({
        'id': '2016_inc',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Inc16'], 
                '#ffffcc', // Colour assigned to any values < first step (so 0 - 510)
                511, '#c2e699', // (511-960)
                961, '#78c679', // (961-1805)
                1806, '#31a354', // (1806-3595)
                3596, '#006837', // >=(3596-7410)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2021 Income (Inc21)

    map2.addLayer({
        'id': '2021_inc',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Inc21'], 
                '#ffffcc', // Colour assigned to any values < first step (so 0 - 630)
                631, '#c2e699', // (631-1225)
                1226, '#78c679', // (1226-2245)
                2246, '#31a354', // (2246-4640)
                4641, '#006837', // >=(4641-8930)
                ],
            'fill-outline-color': 'grey'
        },
    });

//Population data classification

    //2001 Population (Pop01)

    map2.addLayer({
        'id': '2001_pop',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Pop01'], 
                '#ffffd4', //Colour assigned to any values < first step (so 0-216)
                216, '#fed98e', // (216-535)
                535, '#fe9929', // (535-828)
                828, '#d95f0e', // (828-1428)
                1428, '#993404', // >=(1428-3099)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2016 Population (Pop16)

    map2.addLayer({
        'id': '2016_pop',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Pop16'], 
                '#ffffd4', //Colour assigned to any values < first step (so 0-649)
                649, '#fed98e', // (649-1228)
                1228, '#fe9929', // (1228-2297)
                2297, '#d95f0e', // (2297-4631)
                4631, '#993404', // >=(4631-7939)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2021 Population (Pop21)

    map2.addLayer({
        'id': '2021_pop',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Pop21'], 
                '#ffffd4', //Colour assigned to any values < first step (so 0-747)
                748, '#fed98e', // (748-1438)
                1439, '#fe9929', // (1439-2662)
                2663, '#d95f0e', // (2663-5506)
                5507, '#993404', // >=(5507-9625)
                ],
            'fill-outline-color': 'grey'
        },
    });

//Employment data classification

    //2001 Emplyment (Emp01)

    map2.addLayer({
        'id': '2001_emp',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Emp01'], 
                '#f1eef6', //Colour assigned to any values < first step (so 0-1)
                1, '#bdc9e1', // (1-460)
                461, '#74a9cf', // (461-715)
                716, '#2b8cbe', // (716-1345)
                1346, '#045a8d', // >=(1346-2555)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2016 Employment (Emp16)

    map2.addLayer({
        'id': '2016_emp',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Emp16'], 
                '#f1eef6', //Colour assigned to any values < first step (so 0-20)
                21, '#bdc9e1', // (21-47)
                48, '#74a9cf', // (48-58)
                59, '#2b8cbe', // (59-68)
                69, '#045a8d', // >=(69-92)
                ],
            'fill-outline-color': 'grey'
        },
    });

    //2021 Employment

    map2.addLayer({
        'id': '2021_emp',
        'type': 'fill',
        'source': 'census_data',
        'paint': {
           'fill-color': [
                'step', 
                ['get', 'Emp21'], 
                '#f1eef6', //Colour assigned to any values < first step (so 0-30)
                31, '#bdc9e1', // (31-46)
                47, '#74a9cf', // (	47-55)
                56, '#2b8cbe', // (56-65)
                66, '#045a8d', // >=(66-85)
                ],
            'fill-outline-color': 'grey'
        },
    });
    
});

/*--------------------------------------------------------------------
//Income: 2001-2021 tab
--------------------------------------------------------------------*/
//Step 1: View and classify variable layers (see load census data section)

// Step 2: Add toggle feature for each layer (make smoother to interactive later)

//Toggle Income 2001 (starts on- check to turn off)
document.getElementById('2001_inc').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2001_inc',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Income 2016
document.getElementById('2016_inc').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2016_inc',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Income 2021
document.getElementById('2021_inc').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2021_inc',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

// Step 3: Add Income Legend (with all 3 years)

//Declare array variables for labels and colours
const legendlabels_2001inc = [
    '2001:',
    '0-1',
    '1-460',
    '461-715',
    '716-1345',
    '1346-2555',
];

const legendlabels_2016inc = [
    '2016:',
    '0-510',
    '511-960',
    '961-1805',
    '1806-3595',
    '3596-7410'
];

const legendlabels_2021inc = [
    '2021:',
    '0-630',
    '631-1225',
    '2246-4640',
    '2246-4640',
    '4641-8930'
];

const legendcoloursinc = [
    'rgba(255, 255, 255, 0.8)',
    '#ffffcc',
    '#c2e699',
    '#78c679',
    '#31a354',
    '#006837'
];

//For each layer create a block to put the colour and label in- 2001
legendlabels_2001inc.forEach((label_2001inc, i) => {
    const colour = legendcoloursinc[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-keyinc'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label_2001inc}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legendinc.appendChild(item); //add row to the legend
});

//2016 block- colour and label 
legendlabels_2016inc.forEach((label_2016inc, i) => {
    const colour = legendcoloursinc[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keyinc'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2016inc}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendinc.appendChild(item); 
});

//2021 block- colour and label 
legendlabels_2021inc.forEach((label_2021inc, i) => {
    const colour = legendcoloursinc[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keyinc'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2021inc}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendinc.appendChild(item); 
});

//Step 4: Toggle display of legend

let legendcheck3 = document.getElementById('legendcheck3');

legendcheck3.addEventListener('click', () => {
    if (legendcheck3.checked) {
        legendcheck3.checked = true;
        legendinc.style.display = 'block';
    }
    else {
        legendinc.style.display = "none";
        legendcheck3.checked = false;
    }
});


/*--------------------------------------------------------------------
//Population: 2001-2021 tab
--------------------------------------------------------------------*/
//Step 1: View and classify variable layers (see insert Census data section)

// Step 2: Add toggle feature for each layer (make smoother to interactive later)

//Toggle Pop 2001 (starts on- check to turn off)
document.getElementById('2001_pop').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2001_pop',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Pop 2016
document.getElementById('2016_pop').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2016_pop',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Pop 2021
document.getElementById('2021_pop').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2021_pop',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

// Step 3: Add Population Legend (with all 3 years)

//Declare array variables for labels and colours
const legendlabels_2001pop = [
    '2001:',
    '0-216',
    '216-535',
    '535-828',
    '828-1428',
    '1428-3099',
];

const legendlabels_2016pop = [
    '2016:',
    '0-649',
    '649-1228',
    '1228-2297',
    '2297-4631',
    '4631-7939'
];

const legendlabels_2021pop = [
    '2021:',
    '0-747',
    '748-1438',
    '1439-2662',
    '2663-5506',
    '5507-9625'
];

const legendcolourspop = [
    'rgba(255, 255, 255, 0.8)',
    '#ffffd4',
    '#fed98e',
    '#fe9929',
    '#d95f0e',
    '#993404'
];

//For each layer create a block to put the colour and label in- 2001
legendlabels_2001pop.forEach((label_2001pop, i) => {
    const colour = legendcolourspop[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-keypop'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label_2001pop}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legendpop.appendChild(item); //add row to the legend
});

//2016 block- colour and label 
legendlabels_2016pop.forEach((label_2016pop, i) => {
    const colour = legendcolourspop[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keypop'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2016pop}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendpop.appendChild(item); 
});

//2021 block- colour and label 
legendlabels_2021pop.forEach((label_2021pop, i) => {
    const colour = legendcolourspop[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keypop'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2021pop}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendpop.appendChild(item); 
});

//Step 4: Toggle display of legend

let legendcheck4 = document.getElementById('legendcheck4');

legendcheck4.addEventListener('click', () => {
    if (legendcheck4.checked) {
        legendcheck4.checked = true;
        legendpop.style.display = 'block';
    }
    else {
        legendpop.style.display = "none";
        legendcheck4.checked = false;
    }
});


/*--------------------------------------------------------------------
//Employment: 2001-2021 tab
--------------------------------------------------------------------*/
//Step 1: View and classify variable layers (See insert Census layer section)

// Step 2: Add toggle feature for each layer (make smoother to interactive later)

//Toggle Employment 2001 (starts on- check to turn off)
document.getElementById('2001_emp').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2001_emp',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Emp 2016
document.getElementById('2016_emp').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2016_emp',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

//Toggle Emp 2021
document.getElementById('2021_emp').addEventListener('change', (e) => {
    map2.setLayoutProperty(
        '2021_emp',
        'visibility',
         e.target.checked ? 'visible' : 'none'
     );
});

// Step 3: Add Employment Legend (with all 3 years)

const legendlabels_2001emp = [
    '2001:',
    '0-1',
    '1-460',
    '461-715',
    '716-1345',
    '1346-2555',
];

const legendlabels_2016emp = [
    '2016:',
    '0-20',
    '21-47',
    '48-58',
    '59-68',
    '69-92'
];

const legendlabels_2021emp = [
    '2021:',
    '0-30',
    '31-46',
    '47-55',
    '56-65',
    '66-85'
];

const legendcoloursemp = [
    'rgba(255, 255, 255, 0.8)',
    '#f1eef6',
    '#bdc9e1',
    '#74a9cf',
    '#2b8cbe',
    '#045a8d'
];

//For each layer create a block to put the colour and label in- 2001
legendlabels_2001emp.forEach((label_2001emp, i) => {
    const colour = legendcoloursemp[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-keyemp'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label_2001emp}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legendemp.appendChild(item); //add row to the legend
});

//2016 block- colour and label 
legendlabels_2016emp.forEach((label_2016emp, i) => {
    const colour = legendcoloursemp[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keyemp'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2016emp}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendemp.appendChild(item); 
});

//2021 block- colour and label 
legendlabels_2021emp.forEach((label_2021emp, i) => {
    const colour = legendcoloursemp[i];
    const item = document.createElement('div'); 
    const key = document.createElement('span'); 
    key.className = 'legend-keyemp'; 
    key.style.backgroundColor = colour; 

    const value = document.createElement('span'); 
    value.innerHTML = `${label_2021emp}`; 

    item.appendChild(key); 
    item.appendChild(value); 
    legendemp.appendChild(item); 
});

//Step 4: Toggle display of legend

let legendcheck5 = document.getElementById('legendcheck5');

legendcheck5.addEventListener('click', () => {
    if (legendcheck5.checked) {
        legendcheck5.checked = true;
        legendemp.style.display = 'block';
    }
    else {
        legendemp.style.display = "none";
        legendcheck5.checked = false;
    }
});