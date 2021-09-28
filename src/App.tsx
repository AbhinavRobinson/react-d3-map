import * as d3 from 'd3'
import React from 'react'
import './App.css'

const App: React.FC = () => {

  const grid_constructor = () => {
    var data = new Array()
    var xpos = 1 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1
    var width = 50
    var height = 50
    var click = 0

    // iterate for rows	
    for (var row = 0;row < 10;row++) {
      data.push(new Array())

      // iterate for cells/columns inside rows
      for (var column = 0;column < 10;column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          click: click
        })
        // increment the x position. I.e. move it over by 50 (width variable)
        xpos += width
      }
      // reset the x position after a row is complete
      xpos = 1
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += height
    }
    return data
  }

  const map_constructor = React.useCallback(() => {
    var gridData = grid_constructor()
    console.log(gridData)

    var grid = d3.select("#map-grid")
      .append("svg")
      .attr("width", "510px")
      .attr("height", "510px")

    var row = grid.selectAll(".row")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row")

    var column = row.selectAll(".square")
      .data(function (d) { return d })
      .enter().append("rect")
      .attr("class", "square")
      .attr("x", function (d: any) { return d.x })
      .attr("y", function (d: any) { return d.y })
      .attr("width", function (d: any) { return d.width })
      .attr("height", function (d: any) { return d.height })
      .style("fill", "#fff")
      .style("stroke", "#222")
      .on('click', function (d: any) {
        console.log(d)
        d.click++
        if ((d.click) % 4 == 0) { d3.select(this).style("fill", "#fff") }
        if ((d.click) % 4 == 1) { d3.select(this).style("fill", "#2C93E8") }
        if ((d.click) % 4 == 2) { d3.select(this).style("fill", "#F56C4E") }
        if ((d.click) % 4 == 3) { d3.select(this).style("fill", "#838690") }
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
