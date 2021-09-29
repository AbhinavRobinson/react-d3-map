import * as d3 from 'd3'
import React from 'react'
import './App.css'
import { setPlotState } from './redux/functions/plotState/plotStateSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App: React.FC = () => {
  // plot state
  const plotState = useAppSelector((state) => state.plot.value)
  // dispatcher
  const dispatch = useAppDispatch()

  // Map Constructor
  const mapConstructor = React.useCallback(() => {
    let data = new Array()
    let initPlots: number[][] = new Array() // initPlots[x][y] = value for plot x,y
    let xpos = 1
    let ypos = 1
    let width = 10
    let height = 10
    let value = 0
    let rows = 150
    let cols = 150

    for (let row = 0;row < rows;row++) {
      data.push(new Array())
      initPlots.push(new Array())
      for (var col = 0;col < cols;col++) {
        data[row].push({
          i: col,
          j: row,
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          value: value
        })
        xpos += width
        initPlots[row].push(0)
      }
      xpos = 1
      ypos += height
    }

    let grid = d3.select("#map-grid")
      .append("svg")
      .attr("width", `${width * rows + 10}px`)
      .attr("height", `${height * cols + 10}px`)

    let row = grid.selectAll(".row")
      .data(data)
      .enter().append("g")
      .attr("class", "row")

    row.selectAll(".square")
      .data(function (d: any) { return d })
      .enter().append("rect")
      .attr("class", function (d: any) { return `${d.i}-${d.j}` })
      .attr("x", function (d: any) { return d.x })
      .attr("y", function (d: any) { return d.y })
      .attr("width", function (d: any) { return d.width })
      .attr("height", function (d: any) { return d.height })
      .style("fill", "#fff")
      .style("stroke", "#111")
  }, [])

  // add listener to plot
  const addListeners = React.useCallback(async () => {
    d3.selectAll("rect").on("mouseover", function () {
      dispatch(setPlotState())
      if (plotState === 0) { d3.select(this).style("fill", "#f00") }
      if (plotState === 1) { d3.select(this).style("fill", "#0f0") }
      if (plotState === 2) { d3.select(this).style("fill", "#00f") }
      if (plotState === 3) { d3.select(this).style("fill", "#fff") }
    })
  }, [plotState])

  // Init Map
  React.useEffect(() => {
    mapConstructor()
  }, [mapConstructor])

  // Add Listeners
  React.useEffect(() => {
    addListeners()
    console.log('plotValue', plotState)
  }, [plotState, addListeners])

  return (
    <div className="App">
      <header className="App-header">
        D3.js Map
      </header>
      <div className="map">
        <div className="map-container" id="map-grid" />
      </div>
    </div>
  )
}

export default App
