import React from 'react'
import './App.css'

import * as d3 from 'd3'

import { setInitialState, setPlotState } from './redux/functions/plotState/plotStateSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App: React.FC = () => {
  let rows = 125
  let cols = 125

  // plot state
  const plotState = useAppSelector((state) => state.plot.value)
  // dispatcher
  const dispatch = useAppDispatch()
  // data init done state
  const [dataInitFinished, setDataInitFinished] = React.useState(false)
  // init done state
  const [mapInitFinished, setMapInitFinished] = React.useState(false)

  // Map Constructor
  const mapConstructor = React.useCallback(() => {
    let data = new Array()
    let initialPlotState: number[][] = new Array() // state[x][y] = value for plot x,y
    let xpos = 1
    let ypos = 1
    let width = 7
    let height = 7
    let value = 0

    for (let row = 0;row < rows;row++) {
      data.push(new Array())
      initialPlotState.push(new Array())
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
        initialPlotState[row].push(0)
      }
      xpos = 1
      ypos += height
    }

    dispatch(setInitialState({ value: initialPlotState }))

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

    setDataInitFinished(true)
  }, [])

  // add listener to plots
  const addListeners = React.useCallback(async () => {
    d3.selectAll("rect").on("mouseover", function (e: MouseEvent) {
      // @ts-ignore
      const x = d3.select(this).attr("class").split("-")[0] as number
      // @ts-ignore
      const y = d3.select(this).attr("class").split("-")[1] as number
      dispatch(setPlotState({ i: x, j: y }))
      if (plotState[x][y] === 0) { d3.select(this).style("fill", "#f00") }
      if (plotState[x][y] === 1) { d3.select(this).style("fill", "#0f0") }
      if (plotState[x][y] === 2) { d3.select(this).style("fill", "#00f") }
      if (plotState[x][y] === 3) { d3.select(this).style("fill", "#fff") }
    })
  }, [plotState])

  // Init Map
  React.useEffect(() => {
    mapConstructor()
  }, [mapConstructor])

  // Add Listeners
  React.useEffect(() => {
    if (!mapInitFinished && dataInitFinished) {
      console.log("[Adding Listeners]")
      addListeners()
      setMapInitFinished(true)
    }
  }, [plotState, addListeners, mapInitFinished, dataInitFinished])

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
