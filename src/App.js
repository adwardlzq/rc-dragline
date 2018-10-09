import React, { Component } from 'react';
import * as d3 from "d3";
import './App.css';

class App extends Component {
  componentDidMount() {
    this.mouseDragStartX = 0;
    this.mouseDragStartY = 0;

    this.svg = d3.select('#svg')
      .on('click', () => {
        console.log('click');
      })
      .call(d3.drag()
        .on('start', () => {
          console.error('start', d3.mouse(this.svg.node()))
          this.mouseDragStartX = d3.mouse(this.svg.node())[0];
          this.mouseDragStartY = d3.mouse(this.svg.node())[1];
        })
        .on('drag', () => this.drag())
        .on('end', () => this.dragEnd())
      )

    this.g = this.svg.append('g');

    this.paths = this.g.append('g').attr('class', 'pane-path')
    this.mousePath = this.paths.append('path').attr('class', 'connector');
  }

  drag = () => {
    const mouseDragX = d3.mouse(this.svg.node())[0];
    const mouseDragY = d3.mouse(this.svg.node())[1];
    const distanceX = Math.abs(this.mouseDragStartX - mouseDragX);
    const distanceY = Math.abs(this.mouseDragStartY - mouseDragY);
    if ( distanceX < 10  || distanceY < 10) {
      this.mosePathControl(mouseDragX, mouseDragY, 10);
    } else if ( distanceX < 20  || distanceY < 20) {
      this.mosePathControl(mouseDragX, mouseDragY, 20);
    } else if ( distanceX < 30  || distanceY < 30) {
      this.mosePathControl(mouseDragX, mouseDragY, 30);
    } else {
      this.mosePathControl(mouseDragX, mouseDragY, 40);
    }
  }

  mosePathControl = (mouseDragX, mouseDragY, controlNum) => {
    this.mousePath
      .attr('d', ` M ${this.mouseDragStartX} ${this.mouseDragStartY} Q ${this.mouseDragStartX} ${this.mouseDragStartY + controlNum} ${(this.mouseDragStartX + mouseDragX) / 2} ${(this.mouseDragStartY + mouseDragY) / 2} T ${mouseDragX} ${mouseDragY}`);
  }

  dragEnd = () => {
    const mouseDragEndX = d3.mouse(this.svg.node())[0];
    const mouseDragEndY = d3.mouse(this.svg.node())[1];
    if (this.mouseDragStartX !== mouseDragEndX || this.mouseDragStartY !== mouseDragEndY) {
      console.error('end', d3.mouse(this.svg.node()))
      
    }
  }

  render() {
    return (
      <svg
        id="svg"
        onDragOver={(e) => e.preventDefault()}
      />
    );
  }
}

export default App;
