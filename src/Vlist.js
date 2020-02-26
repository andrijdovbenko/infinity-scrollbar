import React from 'react';
import Item from './Item';

const data = []
function createData(){
	for (let i=0;i<1000000;i++){
        data.push({name: `Row ${i}`});
    }
    console.log('data', data);
}
createData();

class Vlist extends React.Component{
    constructor(props){
        super(props);
        this.numVisibleItems=Math.trunc(300 / this.props.itemheight);
        this.state={
            start:0,
            end:this.numVisibleItems         
        }
        this.containerStyle={height:data.length * this.props.itemheight}
        
        this.scollPos=this.scollPos.bind(this)
    }

    scollPos(){
        let currentIndx=Math.trunc(this.refs.viewPort.scrollTop/this.props.itemheight)
        currentIndx=currentIndx-this.numVisibleItems>=data.length?currentIndx-this.numVisibleItems:currentIndx;
        if (currentIndx!==this.state.start){
            console.log("Redraw");
            this.setState(
                this.state={
                    start:currentIndx,
                    end:currentIndx+this.numVisibleItems>=data.length ? data.length-1:currentIndx+this.numVisibleItems
                }
            )
        }
    }

    loadDataFromServer() {
        
    }
    
    renderRows(){
        let result=[];
        console.log('this.state', this.state, this);
        for (let i=this.state.start;i<=this.state.end;i++){
            let item=data[i];
            result.push(<Item key={i} label={item.name} top={i*this.props.itemheight} itemheight={this.props.itemheight} />);
        }
        console.log('result', result);
        return result;
    }
    
    render(){
        return (
        <div ref="viewPort"  className="viewPort" onScroll={this.scollPos} >
            <div className="itemContainer" style={this.containerStyle}>
                {this.renderRows()}    
            </div>
        </div>)
    }

}

export default Vlist;