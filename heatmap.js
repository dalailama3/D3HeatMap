$("document").ready(function () {

  $.ajax({
    url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    dataType: "json"
  }).done(function (result) {
    console.log(result)
    var baseTemperature = result.baseTemperature;

    var margin = {  top: 80, right: 140, bottom: 60, left: 100 }
    var width = 1300 - margin.left - margin.right
    var height = 700 - margin.top - margin.bottom
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //set up x and y scales

    var xScale = d3.time.scale()
      .domain([new Date("1753"), new Date("2015")])
      .range([0, width])

    var yScale = d3.scale.ordinal()
      .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
      .rangePoints([0, height])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(d3.time.year, 10)


    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width / 2 )
    .attr("y", margin.bottom)
    .style({
      "text-anchor": "middle",
      "font-weight": "bold"
    })
    .text("Years")

    var y = 0 - margin.left

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", y)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style({
        "text-anchor": "middle",
        "font-weight": "bold"
      })
      .text("Months")



  })

});
