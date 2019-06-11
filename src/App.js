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
    search: '',
    markers: [],
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
      window.alert("Sem dados para serem exibidos. Erro > " + error)
    })
  }

  initMap = () => {

    var defaultIcon = makeMarkerIcon('C3272B');
    var highlightedIcon = makeMarkerIcon('FFA400');
    const STREET_VIEW_URL = 'http://maps.googleapis.com/maps/api/streetview?size=200x200&location=';
    const STREET_VIEW_API_KEY = 'AIzaSyAc3EkCL8NY4IobkxKJW2d07mYAGHt_sjQ';

    
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -23.597085, lng: -46.6628884},
      zoom: 14,
      mapTypeControl: false
    });

    var infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(myVenue => {

      console.log(myVenue)

      var contentString = `<img class="bgimg" src="${STREET_VIEW_URL}${myVenue.venue.location.formattedAddress[0]},${myVenue.venue.name}&key=${STREET_VIEW_API_KEY}">
      <p style="color: #39C; font-size: 18px">${myVenue.venue.name}
      <br>
      <p> <strong>Address:</strong> ${myVenue.venue.location.formattedAddress[0]} </p>`

      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name,
        icon: defaultIcon,
      });
  
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker)
        map.setCenter(marker.getPosition())
      });

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });

      this.state.markers.push(marker);
    })
    console.log(this.state.markers);
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  focusMarker(event) {
    this.state.markers.forEach(marker => {
      if (marker.title.toLowerCase().includes(event.target.innerHTML.toLowerCase())) {
        console.log(marker.title);
        new window.google.maps.event.trigger(marker, 'click');
      }
    });
  }

  render() {
// lista o nome dos lugares disponíveis
    /* const items = this.state.venues.map((item) =>
        <li key={item.venue.name.toUpperCase()} className="itembutton">{item.venue.name}</li>
    ); */
    let drawerClasses = 'side-drawer';
    let filteredArray = this.state.venues.filter((item) => {
        return item.venue.name.toLowerCase().includes(this.state.search.toLowerCase());
    });

    this.state.markers.forEach((marker) => {
      if(!marker.title.toLowerCase().includes(this.state.search.toLowerCase())) {
        marker.setVisible(false);
      } else {
        marker.setVisible(true);
      }
    });

    if(this.state.sideDrawerOpen){
        drawerClasses = 'side-drawer open'; 
    }

    let backdrop

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <main style={{ marginTop: '60px' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        {/* <SideDrawer show={this.state.sideDrawerOpen} items={this.state.venues} /> */}

        <nav className={drawerClasses}>
          <div className="topnav">
            <h1>Conhecimento é poder!</h1>
            <h4>Busque a livraria mais proxima de você!</h4>

            <input value={this.state.search} onChange={this.updateSearch.bind(this)} type="text" placeholder="Buscar local..." />
            <ul className="list_venues">{filteredArray.map((item) => {
                return <li key={item.venue.name.toUpperCase()} onClick={this.focusMarker.bind(this)} className="itembutton">{item.venue.name}</li>
            })}</ul>
          </div>
        </nav>
        
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
  script.onerror = () => {alert("Falha ao carregar a página.")}

}
export default App;
