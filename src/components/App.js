import _ from 'lodash';
import React, { Component } from 'react';
import LifeGrid from './LifeGrid';
import LifeTile from './LifeTile';
import { connect } from 'react-redux';
import { createGrid, processNextGeneration } from '../actions';

class App extends Component {
  state={
    rows: 15,
    cols: 15,
    delay: 350
  };

  componentDidMount() {
    this.props.createGrid(this.state.rows, this.state.cols);
    this.interval = setInterval(() => this.onProcessNextGeneration(), this.state.delay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onRowInputChange(e) {
    const rows = e.target.value;
    this.setState({ rows });
  }

  onColInputChange(e) {
    const cols = e.target.value;
    this.setState({ cols });
  }

  onDelayInputChange(e) {
    const delay = e.target.value;
    this.setState({ delay })
  }


  onGenerateNewGrid() {
    clearInterval(this.interval);
    this.props.createGrid(this.state.rows, this.state.cols);
    this.interval = setInterval(() => this.onProcessNextGeneration(), this.state.delay);
  }

  onStart() {
    this.interval = setInterval(() => this.onProcessNextGeneration(), this.state.delay);
  }

  onStop() {
    clearInterval(this.interval);
  }

  onProcessNextGeneration() {
    this.props.processNextGeneration();
  }

  render() {
    return (
      <div style={{marginTop: "25px", marginBottom: "25px"}}>
        <LifeGrid />
        <div style={{textAlign: "center"}}>
          <div className="row" style={{width: "25%", marginTop: "25px"}}>
            <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.rows} onChange={(e) => this.onRowInputChange(e)}></input>
            <label style={{marginBottom: "10px"}}>Rows</label>
            <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.cols} onChange={(e) => this.onColInputChange(e)}></input>
            <label>Cols</label>
            <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.delay} onChange={(e) => this.onDelayInputChange(e)}></input>
            <label>Delay(ms)</label>
          </div>
          <div className="row">
            <button onClick={() => this.onGenerateNewGrid()}>Update</button>
            <button onClick={() => this.onStop()}>Stop</button>
            <button onClick={() => this.onStart()}>Start</button>
            <button onClick={() => this.onProcessNextGeneration()}>Next Generation</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { grid: state.grid };
}

export default connect(mapStateToProps, { createGrid, processNextGeneration })(App);