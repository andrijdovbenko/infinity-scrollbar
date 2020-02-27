import React from 'react';
import Item from './Item';

class Vlist extends React.Component{
    constructor(props){
        super(props);
        this.dataLength = 1000;
        this.renderedItemsRange = 30;
        this.numVisibleItems=Math.trunc(500 / this.props.itemheight);
        this.state={
            start:0,
            end:this.numVisibleItems,
            data: []     
        }
        this.map = new Map();
        this.timerIds = [];
        this.loadData(this.state.start, this.state.end);
        this.containerStyle={height:this.dataLength * this.props.itemheight}
        
        this.scollPos=this.scollPos.bind(this)
    }

    scollPos(){
        let currentIndx=Math.trunc(this.refs.viewPort.scrollTop/this.props.itemheight);
        currentIndx= currentIndx - this.numVisibleItems >= this.dataLength ? currentIndx - this.numVisibleItems:currentIndx;
        if (currentIndx !== this.state.start){
            this.setState({...this.state,
                start:currentIndx,
                end:currentIndx+this.numVisibleItems > this.dataLength -1  ? this.dataLength-1:currentIndx+this.numVisibleItems
            })
        }
    }

    loadData(start, end) {
        start = start - this.renderedItemsRange < 0 ? 0 : start - this.renderedItemsRange;
        end = end + this.renderedItemsRange > this.dataLength ? this.dataLength - 1 : end + this.renderedItemsRange;
        this.getDataFromMap(start, end);
        if (!this.isRequestRequered) {
            this.abortRequests();
        } else {
            this.getDataFromServer(start, end);
        }
        
    }

    getDataFromServer(start, end){
        this.abortRequests();
        const timerId = setTimeout(() => {
            const data = []
            for (let i = start; i <= end; i++){
                const item = {name: `Row ${i}`, id: i}
                data.push(item);
                this.map.set(i, item);
            }
            console.log('data  from server', data);
            this.setState({...this.state, data});
        }, 500);
        this.timerIds.push(timerId);
    }

    abortRequests() {
        this.timerIds.map((timerId => clearInterval(timerId)));
    }

    getDataFromMap(start, end) {
        let isRequestRequered = false
        const data = [];
        for (let i = start; i <= end; i++) {
            if (!this.map.has(i)) isRequestRequered = true;
            const item = this.map.get(i) || {name: `Row`, id: i}
            data.push(item);
        }

        this.setState({...this.state, data});
        this.isRequestRequered = isRequestRequered;
    }

    renderRows(){
        let result=[];
        for (let i=this.state.start - this.renderedItemsRange;i<this.state.end + this.renderedItemsRange;i++){
            let item=this.state.data.find((item) => item.id === i);
            if (item) {
                result.push(<Item key={i} label={item.name} top={i*this.props.itemheight} itemheight={this.props.itemheight} />);
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.start !== this.state.start || prevState.end !== this.state.end) {
            this.loadData(this.state.start, this.state.end);
        }
    }
    
    render(){
        return (
        <div ref="viewPort"  className="viewPort" onScroll={this.scollPos} >
            <div className="itemContainer" style={this.containerStyle}>
                {this.state.data.length ? this.renderRows() : null}
            </div>
        </div>)
    }

}

export default Vlist;