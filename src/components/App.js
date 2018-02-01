import React, { Component } from 'react';
import LifeGrid from './LifeGrid';
import { connect } from 'react-redux';
import { createGrid, processNextGeneration } from '../actions';

class App extends Component {
  state={
    rows: 15,
    cols: 15,
    delay: 500
  };

  componentDidMount() {
    this.props.createGrid(this.state.rows, this.state.cols);
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
  }

  onStart() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.onProcessNextGeneration(), this.state.delay);
  }

  onPause() {
    clearInterval(this.interval);
  }

  onProcessNextGeneration() {
    this.props.processNextGeneration();
  }

  render() {
    return (
      <div style={{marginTop: "25px", marginBottom: "25px"}}>
        <LifeGrid />
        <div className="container" style={{textAlign: "center"}}>
          <div className="row" style={{marginTop: "25px"}}>
            <div className="col l6 offset-l3 m6 offset-m3 s6 offset-s3">
              <div className="col l4 m4 s4">
                <button className="col l10 offset-l1" onClick={() => this.onStart()}>Start</button>
              </div>
              <div className="col l4 m4 s4">
                <button className="col l10 offset-l1" onClick={() => this.onPause()}>Pause</button>
              </div>
              <div className="col l4 m4 s4">
                <button className="col l10 offset-l1" onClick={() => this.onProcessNextGeneration()}>Step Forward</button>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col l4 offset-l4"> 
              <div className="col l4 offset-l1 m4 offset m1 s4 offset-s1">
                <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.rows} onChange={(e) => this.onRowInputChange(e)}></input>
                <label style={{marginBottom: "10px"}}>Rows</label>
              </div>
              <div className="col l4 offset-l2 m4 offset-m2 s4 offset-s2">
                <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.cols} onChange={(e) => this.onColInputChange(e)}></input>
                <label>Cols</label>
              </div>
            </div>
            <div className="col l2 offset-l5 m2 offset-m5 s2 offset-s5">
              <input type="text" style={{textAlign: "center", marginBottom: "0px"}} value={this.state.delay} onChange={(e) => this.onDelayInputChange(e)}></input>
              <label>Delay(ms)</label>
            </div>
          </div>
          <div className="row">
            <button className="col l2 offset-l5" onClick={() => this.onGenerateNewGrid()}>Update/Reset</button>
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