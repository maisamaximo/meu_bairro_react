import React from 'react';
import './SideDrawer.css'

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';
    let filteredArray = props.items;

    if(props.show){
        drawerClasses = 'side-drawer open'; 
    }

    const handleKeyUp = e => {
        filteredArray = props.items.filter(item => {
            return item.contains(e.target.value);
        });
        console.log(e.target.value);
    }

    return (

    <nav className={drawerClasses}>
        <div className="topnav">
        <h1>Conhecimento é poder!</h1>
        <h4>Busque a livraria mais proxima de você!</h4>
            <input onKeyUp={handleKeyUp} type="text" placeholder="Buscar local..." />
            <ul className="list_venues">{props.items}</ul>
        </div>
    </nav>
    )};

export default sideDrawer;