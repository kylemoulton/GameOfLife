import _ from 'lodash';
import React, { Component } from 'react';
import LifeTile from './LifeTile';
import { connect } from 'react-redux';
import { createGrid } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.createGrid(30, 30);
  }

  renderGrid() {
    if (this.props.grid != null) {
      return _.map(this.props.grid, gridLine => {
        return (
          <div style={{margin:"0px", height: "26px"}}>
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


  // renderGrid() {
  //   if (this.props.grid != null) {
  //     return _.map(this.props.grid, gridLine => {
  //       return _.map(gridLine, currentCell => {
  //         return <LifeTile
  //           key={currentCell.coordX.toString() + '-' + currentCell.coordY.toString()}
  //           initialCell={ currentCell }
  //           />;
  //       });
  //     });
  //   }
  // }

  render() {
    return (
      <div className="container" style={{textAlign: "center", marginTop: "50px"}}>
        {this.renderGrid()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { grid: state.grid };
}

export default connect(mapStateToProps, { createGrid })(App);
