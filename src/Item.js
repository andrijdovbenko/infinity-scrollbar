import React from 'react';

//Item class to render each of the list rows
class Item extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        isShown: false
    }

    render(){
        return (
        <div className="item"
            style={{top:this.props.top,height:this.props.itemheight}}
            onMouseEnter={() => this.setState({isShown: true})}
            onMouseLeave={() => this.setState({isShown: false})}>
            <span>{this.props.label}</span>
            <span>Created by Exton Parson</span>
            <span>Last Modified Jan 17, 2020</span>
            <div className="buttons" style={{display: this.state.isShown ? 'block' : 'none'}}><button>Add</button><button>Edit</button><button>X</button></div>
        </div>)
    }
}

export default Item;