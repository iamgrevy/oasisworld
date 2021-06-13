fetch("mj.json")
.then(function (response) {
    return response.json();

})
.then(function (jsonData) {
    console.log(jsonData);
  console.log("doin smth else");
   // создаём карту
   var mymap = L.map("mapid").setView([51.2538, 85.3232], 13);

   // загружаем карту (картинку)
   L.tileLayer(
     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF6ZHZhcG9rYSIsImEiOiJjajRiMjVtZDYwNmlpMzNtbHYxbHRnODlxIn0.4TwFuureDX7u8OnF7eBtLg",
     {
       attribution:
         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: "mapbox/streets-v11",
       tileSize: 512,
       zoomOffset: -1,
     }
   ).addTo(mymap);

   var michaeljacksonLocation = jsonData.map(function(jsonData) 
   { // каждый элемент массива превращается в [lat, lng]
    return [jsonData["location-lat"], jsonData["location-long"]];
  });
  console.log(michaeljacksonLocation);

//   

var polyline = L.polyline(michaeljacksonLocation, { color: "red" }).addTo(mymap);
mymap.fitBounds(polyline.getBounds());
    polyline.bindPopup("MJ");


    // для каждого элемента массива jsonData
    jsonData.forEach(function (jsonData) {
      // создаём кружок с координатами, взятыми из элемента массива (переменная stork)
      var circle = L.circle([jsonData["location-lat"], jsonData["location-long"]], {
        radius: 10000,
      });
      // привязываем к кружку поп-ап с данными, взятыми из элемента массива (переменная stork)
      var note = "MJ" + jsonData.city.toUpperCase() + jsonData.time.toUpperCase();
      circle.bindPopup(note);
 
      circle.addTo(mymap);
    });

    });
