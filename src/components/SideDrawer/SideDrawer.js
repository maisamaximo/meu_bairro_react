import React from 'react';
import './SideDrawer.css'

class sideDrawer extends React.Component {

    constructor(){
        super();
        this.state = {
            search: '',
        }
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }

    render(){
        let drawerClasses = 'side-drawer';
        let filteredArray = this.props.items.filter((item) => {
            return item.venue.name.toLowerCase().includes(this.state.search.toLowerCase());
        });


        if(this.props.show){
            drawerClasses = 'side-drawer open'; 
        }

        console.log(filteredArray)

    return (

    <nav className={drawerClasses}>
        <div className="topnav">
        <h1>Conhecimento é poder!</h1>
        <h4>Busque a livraria mais proxima de você!</h4>

            <input value={this.state.search} onChange={this.updateSearch.bind(this)} type="text" placeholder="Buscar local..." />
            <ul className="list_venues">{filteredArray.map((item) => {
                return <li key={item.venue.name.toUpperCase()} className="itembutton">{item.venue.name}</li>
            })}</ul>
        </div>
    </nav>
    )};
}

export default sideDrawer;