import _ from 'lodash';
import React, { Component } from 'react';
import LifeTile from './LifeTile';
import { connect } from 'react-redux';
import { createGrid, processNextGeneration } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.createGrid(35, 35);
    this.interval = setInterval(() => this.onProcessNextGeneration(), 350);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderGrid() {
    if (this.props.grid != null) {
      return _.map(this.props.grid, gridLine => {
        return (
          <div key={gridLine[0].coordX} style={{margin:"0px", height: "26px"}}>
            {this.renderRow(gridLine)}
          </div>
        )
      });
    }
  }

  renderRow(gridLine) {
    return _.map(gridLine, currentCell => {
      return <LifeTile
        key={currentCell.coordX.toString() + '-' + currentCell.coordY.toString()}
        initialCell={ currentCell }
        />;
    });
  }

  onProcessNextGeneration() {
    this.props.processNextGeneration();
  }

  render() {
    return (
      <div>
        <div className="container" style={{textAlign: "center", marginTop: "50px"}}>
          {this.renderGrid()}
        </div>
        <button onClick={() => this.onProcessNextGeneration()}>Next Generation</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { grid: state.grid };
}

export default connect(mapStateToProps, { createGrid, processNextGeneration })(App);