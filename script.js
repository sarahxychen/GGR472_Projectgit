/*--------------------------------------------------------------------
GGR472 Group Project
--------------------------------------------------------------------*/

// //Tab functions
// function openTab(evt, cityName) {
//     // Declare all variables
//     var i, tabcontent, tablinks;
  
//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
  
//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
  
//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }

// //Default Tab; Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();



/*--------------------------------------------------------------------
//BIA MAP SECTION- CHARLOTTE
--------------------------------------------------------------------*/
// Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWh4eWNoZW4iLCJhIjoiY2xyZnB4c2h0MDhnMzJqcGpvZ2sxOHk4byJ9.yIz3cOJ6CJBeoUb3hvbBFA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****
// map.addSource('biapoly', {
// type: 'geojson',
// data: '/Users/charlottekafkagibbons/Documents/GitHub/GGR472_Projectgit/Data/.Business-Improvement-Areas.geojson.icloud'
// })

// map.addLayer({
//   'id': 'BIA-polylayer',
  
// })



















/*--------------------------------------------------------------------
//VIEW GEOJSON POINT DATA ON MAP (copy paste to your section)
--------------------------------------------------------------------*/
// let colgeojson;

// // Fetch GeoJSON from URL and store response as JSON
// fetch('https://raw.githubusercontent.com/sarahxychen/GGR472_Lab4git/main/data/pedcyc_collision_06-21.geojson') //UPDATE THIS AFTER PUBLISHING
//     .then(response => response.json())
//     .then(response => {
//         console.log(response); //Check response in console
//         colgeojson = response; // Store geojson as variable using URL from fetch response
//     });

// //View and style source data as geojson 
// map.on('load', () => {
//     map.addSource('pedbike_collision', {
//         type: 'geojson',
//         data: colgeojson
//     });
    
//     map.addLayer({
//         'id': 'collision_pts',
//         'type': 'circle',
//         'source': 'pedbike_collision',
//         'paint': {
//             'circle-radius': 4,
//             'circle-color': '#010c1c'
//         }
//     });
    
// });
