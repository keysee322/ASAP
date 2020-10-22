let map;

function initMap() {
const myLatlng = { lat: 51.531769, lng: 46.027384 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatlng,
	zoom: 12,
	disableDefaultUI: true
  });
  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: ""
  });
  const secretMessage = "Карен лох";
  const infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });
  marker.addListener("click", () => {
    infowindow.open(marker.get("map"), marker);
  });
}