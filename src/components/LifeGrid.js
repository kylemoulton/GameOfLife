import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LifeTile from './LifeTile';

class LifeGrid extends Component {
    renderGrid() {
        if (this.props.grid !== null) {
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

export default connect(mapStateToProps)(LifeGrid);