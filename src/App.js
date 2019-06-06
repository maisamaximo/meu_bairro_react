import React from 'react';
import './App.css';
import { scrypt } from 'crypto';
import axios from 'axios'
import Toolbar from './components/Toolbar/Toolbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'


class App extends React.Component { 

  state = {
    venues: [],
    sideDrawerOpen: false,
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAc3EkCL8NY4IobkxKJW2d07mYAGHt_sjQ&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "UPFD0MA05PPNLCUM0BTECLXFKOZPNOKCH10H1UXMKRJXCE00",
      client_secret: "JWR1GDXPB0124PT3SJUHP2MGHNIVQKST4OKGDOKQETQJDAYZ",
      llAcc: 100,
      altAcc: 100,
      query: "library",
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

    var defaultIcon = makeMarkerIcon('C3272B');
    var highlightedIcon = makeMarkerIcon('FFA400');

    
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -23.597085, lng: -46.6628884},
      zoom: 14,
      mapTypeControl: false
    });

    var infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(myVenue => {

      //var contentString = '<div class="App-header">teste</div>'
      var contentString = `${myVenue.venue.name}`

      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name,
        icon: defaultIcon,
      });
  
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker)
      });

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    })
  }

  render() {
// lista o nome dos lugares disponíveis
    const items = this.state.venues.map((item) =>
        <li className="itembutton">{item.venue.name}</li>
    );

    let backdrop

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <main style={{ marginTop: '60px' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} items={items} />
        {backdrop}
        <div id="map" className="App">
          <section ref="map" className="map" id="map" role="application"></section>
          <section className="left-column"></section>  
        </div>
      </main>
    );
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new window.google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new window.google.maps.Size(21, 34),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(10, 34),
    new window.google.maps.Size(21,34));
  return markerImage;
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
