import React from 'react';
import './SideDrawer.css'

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';

    if(props.show){
        drawerClasses = 'side-drawer open'; 
    }

    return (

    <nav className={drawerClasses}>
        <div className="topnav">
        <h1>Conhecimento é poder!</h1>
        <h4>Busque a livraria mais proxima de você!</h4>
            <input type="text" placeholder="Buscar local..." />
        </div>
    </nav>
    )};

export default sideDrawer;