import React, { Component } from 'react';
import Cell from './cell';
import Buttons from './buttons';
import { connect } from 'react-redux';
import {changeCell, updateGrid, randomize, reset } from '../actions/grid-actions';
import { changeSpeed } from '../actions/speed-actions';
import { Grid, Row, Col, Clearfix, Jumbotron, Well} from 'react-bootstrap';
 class Board extends Component {
   constructor(props){

     super(props);
this.timerId = null;

}

handleClick = (col, row)=>{

     this.props.onChangeCell(col, row)
   }

upGen =()=>{

  let {speed} = this.props;
  clearTimeout(this.timerId);
/*setTimeout(function run() {
  this.props.onUpdateGrid();
  this.props.onUpdateGeneration();
  this.timerId = setTimeout(run.bind(this), speed);
}.bind(this), speed); */
this.timerId = setInterval(()=>{
  this.props.onUpdateGrid();
},speed)
}


reset= ()=>{
  this.props.onReset();
  clearInterval(this.timerId);
  this.timerId = null;
}
changeSpeed = (event) =>{
  this.props.onChangeSpeed(event.target.value)
  clearTimeout(this.timerId);
  if (this.timerId === null) {
    return;
  }
 this.timerId = setInterval(()=>{
 this.props.onUpdateGrid();
}
 ,event.target.value)

}

  render(){
    let grid =  this.props.grid;
  let arr = grid.map((col, colInx)=>{
        return col.map((cell, cellInx) =>{
          return <Cell key={colInx + cellInx} onClick={(e)=>this.handleClick(colInx, cellInx,e)} value={cell}/>
        })
      })
  return(
    <Grid >
      <Well>
        <h1 className="header text-center">Game of Life</h1>
          <Row>
            <Col lg={6} md={6}>
              <Buttons play={()=>this.upGen()} randomize={()=>this.props.onRandomize()} reset={()=>this.reset()} />
            </Col>
            <Col lg={6} md={6}>
            <div className='input-container'>
               <input
                 className="slider"
             id="typeinp"
             type="range"
             min="100" max="1000"
             value={this.props.speed}
             onChange={this.changeSpeed}
             step="100" />
             </div>
           </Col>
          </Row>
          <Row>
            <Col lg={8} >
              <div className="board">{arr}</div>
            </Col>
            <Col lg={4} >
              <div className="data-table">
                <p>Speed:{this.props.speed} ms</p>
                <p>Generation:{this.props.generation}</p>
              </div>

            </Col>
          </Row>
      </Well>
</Grid>

    );
  }
}

const mapStatesToProps = state =>({
 grid:state.grid,
 speed:state.speed,
 generation:state.generation
});

const mapActionsToProps ={
  onChangeCell: changeCell,
  onUpdateGrid:updateGrid,
  onRandomize:randomize,
  onReset:reset,
  onChangeSpeed: changeSpeed
}

export default connect(mapStatesToProps, mapActionsToProps)(Board);
