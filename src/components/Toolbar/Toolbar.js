import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar-navegation">
        <div>
            <DrawerToggleButton  click={props.drawerClickHandler}/>
        </div>
            <div className="toobar-logo"><a href="/">Meu São Paulo ♡</a></div>
            <div className="spacer" />
            <div className="toolbar-navigation-items">
            <ul>
                <li><a href="/">Sobre</a></li>
                <li><a href="/">Autor</a></li>
            </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;