import * as d3 from 'd3'
import React from 'react'
import './App.css'

const App: React.FC = () => {

  const map_constructor = React.useCallback(() => {
    let data = new Array()
    let xpos = 1
    let ypos = 1
    let width = 50
    let height = 50
    let value = 0
    let rows = 10
    let cols = 10

    for (let row = 0;row < rows;row++) {
      data.push(new Array())
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

    let column = row.selectAll(".square")
      .data(function (d: any) { return d })
      .enter().append("rect")
      .attr("class", function (d: any) { return `${d.i}-${d.j}` })
      .attr("x", function (d: any) { return d.x })
      .attr("y", function (d: any) { return d.y })
      .attr("width", function (d: any) { return d.width })
      .attr("height", function (d: any) { return d.height })
      .style("fill", "#fff")
      .style("stroke", "#222")

    d3.selectAll("rect").on("click", (e: MouseEvent) => {
      console.log(e.target)
    })
  }, [])

  React.useEffect(() => {
    map_constructor()
  }, [])

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
