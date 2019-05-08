import React from 'react';
import './App.css';
import { scrypt } from 'crypto';
import axios from 'axios'

class App extends React.Component { 

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAbF8_JOUKMIpyMWNhkdfW-wyGhORAXvS8&libraries=places&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "UPFD0MA05PPNLCUM0BTECLXFKOZPNOKCH10H1UXMKRJXCE00",
      client_secret: "51PXWYMIAKGEOMI2KTRAVBASGXROQKRH0BDXN0CLNFRJLCGT",
      query: "food",
      near: "São Paulo",
      v: "20190508"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      console.log("error " + error)
    })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -23.599580, lng: -46.631590},
      zoom: 8
    });

    this.state.venues.map(myVenue => {
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      });
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true 
  index.parentNode.insertBefore(script,index)

}
export default App;
