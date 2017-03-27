'use strict'
/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
marginLeft = 40
var axis = d3.axisLeft()
var dataset = []
var barUniqueLeft = []


// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style("padding", "10px 10px 20px 30px")
  .style("border", "1px solid #f5f5f5")

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.map((row) => {
      dataset.push(row.GoalsScored)
      if(barUniqueLeft.indexOf(row.GoalsScored) === -1) {
        barUniqueLeft.push(row.GoalsScored)
      }
    })
    barUniqueLeft.sort().reverse()

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, height])

    const scale = d3.scaleLinear()
      .domain([d3.max(dataset), 0])
      .range([0, height])

    const xScale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([0, width])

    const axisLeft = d3.axisLeft(scale).tickValues(barUniqueLeft)
    const axisBottom = d3.axisBottom(xScale).ticks(dataset.length)
    svg.append("g")
    .call(axisLeft)
    .attr("transform", "translate(-1, 0)")

    svg.append("g")
    .call(axisBottom)
    .attr("transform", "translate(0, 300)")

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', 'teal')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('width', (d) => {
      return (width / dataset.length) - 5
    })
    .attr('y', height)
    .transition()
      .delay( (d, i) => {
        return i * 30
      })
      .attr('height', (d) => {
        return yScale(d)
      })
      .attr('y', (d) => {
        return height - yScale(d)
      }).duration(1000)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()
