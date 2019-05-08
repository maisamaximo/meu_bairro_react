import React from 'react';
import logo from './logo.svg';
import './App.css';
import { scrypt } from 'crypto';

class App extends React.Component { 

  componentDidMount() {
    this.renderMap()
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
