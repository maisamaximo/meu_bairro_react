import React from 'react';
import './SideDrawer.css'

class SideDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filteredItems: [],
            show: props.show,
        };
    }

    handleKeyUp(e) {
        let filteredArray = [];
        filteredArray = this.state.filter(item => {
            return item.key.includes(e.target.value.toUpperCase());
        });

        this.state.filteredItems = filteredArray; 
    }

    render() {
        this.state.items = this.props.items;
        this.state.filteredItems = this.state.items;
        console.log(this.state)

        let drawerClasses = 'side-drawer';

        if (this.props.show) {
            drawerClasses = 'side-drawer open'; 
        }

        return (
            <nav className={drawerClasses}>
                <div className="topnav">
                <h1>Conhecimento é poder!</h1>
                <h4>Busque a livraria mais proxima de você!</h4>
                    <input onKeyUp={this.handleKeyUp} type="text" placeholder="Buscar local..." />
                    <ul className="list_venues">{this.state.filteredItems}</ul>
                </div>
            </nav>
            )
        };
    }

export default SideDrawer;

// const sideDrawer = props => {
    
//     let drawerClasses = 'side-drawer';
//     let filteredArray = props.items;

//     if(props.show){
//         drawerClasses = 'side-drawer open'; 
//     }

//     const handleKeyUp = e => {
//         filteredArray = props.items.filter(item => {
//             return item.key.includes(e.target.value.toUpperCase());
//         });
//         console.log(filteredArray);
//     }