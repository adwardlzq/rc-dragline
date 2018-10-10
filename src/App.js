import React, { Component } from 'react';
import * as d3 from "d3";
import './App.css';

class App extends Component {
  componentDidMount() {
    this.mouseDragStartX = 0;
    this.mouseDragStartY = 0;

    this.svg = d3.select('#svg')
      .call(d3.drag()
        .on('start', () => this.dragStart())
        .on('drag', () => this.drag())
        .on('end', () => this.dragEnd())
      )

    this.g = this.svg.append('g');

    this.paths = this.g.append('g').attr('class', 'pane-path')
    this.mousePath = this.paths.append('path').attr('class', 'connector');
  }

  dragStart = () => {
    this.isPathDrag = false;
    [ this.mouseDragStartX, this.mouseDragStartY ] = d3.mouse(this.svg.node());
  }

  drag = () => {
    this.isPathDrag = true;

    const [ mouseDragX, mouseDragY ] = d3.mouse(this.svg.node());
    this.mousePathControl(mouseDragX, mouseDragY, 'drag');
  }

  dragEnd = () => {
    const [ mouseDragEndX, mouseDragEndY ] = d3.mouse(this.svg.node());
    if (this.isPathDrag) {
      this.mousePathControl(mouseDragEndX, mouseDragEndY, 'end');
    }
  }

  mousePathControl = (mouseDragX, mouseDragY, type) => {
    const distanceX = Math.abs(this.mouseDragStartX - mouseDragX);
    const distanceY = Math.abs(this.mouseDragStartY - mouseDragY);
    if ( distanceX < 10  || distanceY < 10) {
      this.mousePathControlNum(mouseDragX, mouseDragY, 10, type);
    } else if ( distanceX < 20  || distanceY < 20) {
      this.mousePathControlNum(mouseDragX, mouseDragY, 20, type);
    } else if ( distanceX < 30  || distanceY < 30) {
      this.mousePathControlNum(mouseDragX, mouseDragY, 30, type);
    } else {
      this.mousePathControlNum(mouseDragX, mouseDragY, 40, type);
    }
  }

  mousePathControlNum = (mouseDragX, mouseDragY, controlNum, type) => {
    switch(type) {
      case 'drag':
        this.mousePath
          .attr('d', ` M ${this.mouseDragStartX} ${this.mouseDragStartY} Q ${this.mouseDragStartX} ${this.mouseDragStartY + controlNum} ${(this.mouseDragStartX + mouseDragX) / 2} ${(this.mouseDragStartY + mouseDragY) / 2} T ${mouseDragX} ${mouseDragY}`);
        break;
      case 'end':
        this.paths
          .append('path')
          .attr('class', 'connector')
          .attr('d', ` M ${this.mouseDragStartX} ${this.mouseDragStartY} Q ${this.mouseDragStartX} ${this.mouseDragStartY + controlNum} ${(this.mouseDragStartX + mouseDragX) / 2} ${(this.mouseDragStartY + mouseDragY) / 2} T ${mouseDragX} ${mouseDragY}`);;
        break;
      default:
        break;
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
