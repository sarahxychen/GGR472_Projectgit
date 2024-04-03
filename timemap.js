// Define access token

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWh4eWNoZW4iLCJhIjoiY2xyZnB4c2h0MDhnMzJqcGpvZ2sxOHk4byJ9.yIz3cOJ6CJBeoUb3hvbBFA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****
// Initialize time map and edit to your preference
const map1 = new mapboxgl.Map({
    container: 'timemap', // container id in HTML
    style: 'mapbox://styles/sarahxychen/clskmpfs603tf01p25v25bs4j',  //change if we want
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12 // starting zoom level
});

// Add zoom and rotation controls to the map.
map1.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
map1.addControl(new mapboxgl.FullscreenControl(), 'bottom-left');

//Add timeslider functionality

// const years = [
//     "1969-01-01",
//     "1970-01-01",
//     "1971-01-01",
//     "1972-01-01",
//     "1973-01-01",
//     "1974-01-01",
//     "1975-01-01",
//     "1976-01-01",
//     "1977-01-01",
//     "1978-01-01",
//     "1979-01-01",
//     "1980-01-01",
//     "1981-01-01",
//     "1982-01-01",
//     "1983-01-01",
//     "1984-01-01",
//     "1985-01-01",
//     "1986-01-01",
//     "1987-01-01",
//     "1988-01-01",
//     "1989-01-01",
//     "1990-01-01",
//     "1991-01-01",
//     "1992-01-01",
//     "1993-01-01",
//     "1994-01-01",
//     "1995-01-01",
//     "1996-01-01",
//     "1997-01-01",
//     "1998-01-01",
//     "1999-01-01",
//     "2000-01-01",
//     "2001-01-01",
//     "2002-01-01",
//     "2003-01-01",
//     "2004-01-01",
//     "2005-01-01",
//     "2006-01-01",
//     "2007-01-01",
//     "2008-01-01",
//     "2009-01-01",
//     "2010-01-01",
//     "2011-01-01",
//     "2012-01-01",
//     "2013-01-01",
//     "2014-01-01",
//     "2015-01-01",
//     "2016-01-01",
//     "2017-01-01",
//     "2018-01-01",
//     "2019-01-01",
//     "2020-01-01",
//     "2021-01-01"
// ];
// function filterBy(year) {
//     const filters = ['==', 'years', year];
//     map1.setFilter('biapoly', filters);

//     // Set the label to the month
//     document.getElementById('years').textContent = years[year];
// };

// function jsonCallback(err, data) {
//     if (err) {
//         throw err;
//     }

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
document.getElementById('slider').addEventListener('input', (event) => {
    const year = parseInt(event.target.value);
    // update the map
    map1.setFilter('biapoly', ['<=', ['number', ['get', 'YearNum']], year]);
    document.getElementById('active-year').innerText = year;
});

// When a click event occurs on a feature in the bia layer,
// open a popup at the location of the click, with description
// HTML from the click event's properties.
map1.on('click', 'biapoly', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map1);
});

// Change the cursor to a pointer when
// the mouse is over the states layer.
map1.on('mouseenter', 'biapoly', () => {
    map1.getCanvas().style.cursor = 'pointer';
});

// Change the cursor back to a pointer
// when it leaves the BIA polygon layer.
map1.on('mouseleave', 'biapoly', () => {
    map1.getCanvas().style.cursor = '';
});






