      


var map = L.map('map').setView([57.15, 65.5], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



fetch ('http:/Folders/TyumenData/data/response1_250.geojson',  {
    method: 'GET'
})
.then(response => response.json())
.then(json => {
    // var circle = L.circle(json, {
    //     color: "red",
    //     fillColor: "#f03",
    //     fillOpacity: 0.5,
    //     radius: 50.0
    // }).addTo(map); 
    let  dtp = false;
    let min = 0;
    let max = 0;
   
    dtp = L.geoJSON (json, {
        style: function(random) {
            return {
                fillColor: 'black',
                color: 'black',
                fillOpacity: 1,
                weight: .5
            };
        },
        pointToLayer: function(feature, latlng) {
            if (feature.properties.date < min || min === 0){
               min = feature.properties.date
            };
            if(feature.properties.date>max){
            max=feature.properties.date;
            };
            //add popup html
            let html = ''; 
            let arrayOfProps = [''];
            arrayOfProps.forEach(function(prop){
                
                html = '<strong>Время:</strong> '+feature.properties.date+', '+feature.properties.Time+'<br> <strong>Вид ДТП: </strong>'+feature.properties.DTP_V+'<br> <strong>Число участников: </strong>'+feature.properties.K_UCH+'<br> <strong>Пострадали - </strong>'+feature.properties.RAN+'<strong>, Погибли - </strong>'+feature.properties.POG+' '
                }); 
            return L.circle(latlng,{
                radius: 9.0
            })
            .bindPopup(html)
        }
        
    }).addTo(map)
    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': min,
            'max': max
        }
    });


// map.fitBounds(earthquakeGeoJson.getBounds());
})
.catch(error =>console.log(error.message));  


