import React from 'react';

//Item class to render each of the list rows
class Item extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="item" style={{top:this.props.top,height:this.props.itemheight}}>
                {this.props.label}
        </div>)
    }
}

export default Item;