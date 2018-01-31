import React, { Component } from 'react';
import { connect } from 'react-redux';

const tileStyle = {
    height: "25px",
    width: "25px",
    border: "1px solid black",
    display: "inline-block",
    margin: "1px"
};

class LifeTile extends Component {
    render() {
        const isAlive = this.props.grid[this.props.initialCell.coordX][this.props.initialCell.coordY].isAlive;
        const tileColor = isAlive ? "green" : "white";
        return <div style={{...tileStyle, backgroundColor: tileColor}} />;
    }
}

function mapStateToProps(state) {
    return {
        grid: state.grid
    };
}

export default connect(mapStateToProps)(LifeTile);