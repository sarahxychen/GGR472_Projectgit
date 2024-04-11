// Define access token

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWh4eWNoZW4iLCJhIjoiY2xyZnB4c2h0MDhnMzJqcGpvZ2sxOHk4byJ9.yIz3cOJ6CJBeoUb3hvbBFA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****
// Initialize time map and edit to your preference
const map1 = new mapboxgl.Map({
    container: 'timemap', // container id in HTML
    style: 'mapbox://styles/sarahxychen/clskmpfs603tf01p25v25bs4j',  //change if we want
    center: [-79.42, 43.69],  // starting point, longitude/latitude
    zoom: 10.75 // starting zoom level
});

// Add zoom and rotation controls to the map.
map1.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
map1.addControl(new mapboxgl.FullscreenControl(), 'bottom-left');

map1.on('load', () => {
    map1.addSource('biapoly', {
        'type': 'geojson',
        data: 'https://raw.githubusercontent.com/sarahxychen/GGR472_Projectgit/main/Data_/BIAYearNum.geojson'
    });

    map1.addLayer({
        'id': 'biapoly',
        'type': 'fill',
        'source': 'biapoly',
        'paint': {
            'fill-color': 'grey',
            'fill-opacity': 0.9,
            'fill-outline-color': 'blue',
        },
    });
});

//Phased out popup code below

// // When a click event occurs on a feature in the places layer, open a popup at the
// // location of the feature, with description HTML from its properties.
// map1.on('click', 'biapoly', (e) => {
//     // Copy coordinates array.
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = e.features[0].properties.Descriptio;

//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }

//     new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML(description)
//         .addTo(map1);
// });

// // Change the cursor to a pointer when the mouse is over the places layer.
// map1.on('mouseenter', 'places', () => {
//     map1.getCanvas().style.cursor = 'pointer';
// });

// // Change it back to a pointer when it leaves.
// map1.on('mouseleave', 'places', () => {
//     map1.getCanvas().style.cursor = '';
// });



// map1.on('click', e => {
//     const result = map1.queryRenderedFeatures(e.point, { layers:['biapoly'] });
//     if (result.length) {
//     new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML('<h1>hi</h1>')
//     .addTo(map1);
//     }
// });

//Time slider functionality
document.getElementById('slider').addEventListener('input', (event) => { //create event listener whent he toggle is moved
    const year = parseInt(event.target.value); //set the position of the toggle as a constant
    // update the map
    map1.setFilter('biapoly', ['<=', ['number', ['get', 'YearNum']], year]); //filter for all BIAs established befor or on target year
    document.getElementById('active-year').innerText = year; // update html text with year constant
});


// More defunct popup code:


// When a click event occurs on a feature in the bia layer,
// open a popup at the location of the click, with description
// HTML from the click event's properties.
// map1.on('click', 'biapoly', (e) => {
//     new mapboxgl.Popup()
//         .setLngLat(e.lngLat)
//         .setHTML('<h1>heyo</h1>')
//         .addTo(map1);
// });

// // Change the cursor to a pointer when
// // the mouse is over the states layer.
// map1.on('mouseenter', 'biapoly', () => {
//     map1.getCanvas().style.cursor = 'pointer';
// });

// // Change the cursor back to a pointer
// // when it leaves the BIA polygon layer.
// map1.on('mouseleave', 'biapoly', () => {
//     map1.getCanvas().style.cursor = '';
// });






