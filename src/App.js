import React from 'react';
import './App.css';
import { scrypt } from 'crypto';
import axios from 'axios'

class App extends React.Component { 

  state = {
    venues: []
  }

  componentDidMount() {
    this.renderMap()
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAbF8_JOUKMIpyMWNhkdfW-wyGhORAXvS8&libraries=places&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -23.599580, lng: -46.631590},
      zoom: 8
    });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id: "ZHCS2GW54301UNBEQ1YWXYUV3A1UYJ003HZXMBFKGI5DMMQV",
      client_secret: "N0B1NI4MEBCVXKOOYXREGV1KBDTS3NRC30ILOHXGZ1W123PT",
      query: "food",
      near: "São Paulo",
      v: "201905"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.group[0].items
      })
    })
    .catch(error => {
      console.log("error " + error)
    })
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
