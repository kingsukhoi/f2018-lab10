

/*
    Creates map
*/ 
let map;
function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 41.89474, lng: 12.4839},
        mapTypeId: 'satellite',
        zoom: 18
    });
    map.setTilt(45);
    //createMarker( map, 41.89474, 12.4839, "Rome" );

}
/*
    Creates marker and info window using the passed information
*/
function createMarker(map, latitude, longitude, city) {
    let imageLatLong = {lat: latitude, lng: longitude };
    let marker = new google.maps.Marker({
        position: imageLatLong,
        title: city,
        map: map
    });
}

/*
  Now consume web service and add markers to map
*/
window.addEventListener('load', function() {
    const endpoint = 'https://gist.githubusercontent.com/rconnolly/13a1f9394ca609f02b7aa00325f011e1/raw/20a9cffa8bf73a10bbaa245a2670fbd4e3be4bc0/cities-it.json';
    
    fetch(endpoint)
        .then(r => r.json())
        .then((data)=>{
            data.forEach((d)=>{
                createMarker(map, d.Latitude, d.Longitude, d.AsciiName)
            })
        })
        .catch(e=>console.error(e))
    
});

