// using web map day 1 activity 10 for starter code 
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// get color from the depth
// using the mapping-web dat 2 activity 1 basic NYC Boroughs as example
function chooseColor(depth) {
  switch(depth){
  case "0:10":
    return "green";
  case "11:20" :
    return "yellow";
  case "21:30" :
    return "red";
  case "31:50":
    return "purple";
  case "51:500":
    return "gray";
  }
}

function setRadius(mag) {
  // eliminate zero values because we are doing a multiplication operation
  if (mag === 0) {
    return 1;
  }

  return mag * 3;
}
 
// get radius from the magnitude 

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(mapData) {
  console.log(mapData);
// make magnitude variable 
// var mag = mapData(feature.properties.mag);
  // console.log(mag);
    // get color from the depth
// using the mapping-web dat 2 activity 1 basic NYC Boroughs as example
function chooseColor(depth) {
  switch(depth){
  case "0:10":
    return "green";
  case "11:20" :
    return "yellow";
  case "21:30" :
    return "red";
  case "31:50":
    return "purple";
  case "51:500":
    return "gray";
  }
}

function setRadius(mag) {
  // eliminate zero values because we are doing a multiplication operation
  if (mag === 0) {
    return 1;
  }

  return mag * 3;
}
 
// get radius from the magnitude

    function setStyle(feature) {
      return{
        color: "#000000",
        // call chooseColor function to decide which color to color the marker based on depth)
        fillColor: chooseColor(geometry.point.coordinates[2]),
        fillOpacity: 0.5,
        radius:  setRadius(feature.properties.mag),
        stroke: true,
        weight: 1.5
      };
    } 
   });
  // var depth = data.map(data => data.geometry.point.coordinates[2])
  // console.log(depth)
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(mapData.features);


function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite" : satmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
