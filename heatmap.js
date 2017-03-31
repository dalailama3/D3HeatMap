$("document").ready(function () {

  $.ajax({
    url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    dataType: "json"
  }).done(function (result) {
    console.log(result)
    var baseTemperature = result.baseTemperature;

    var margin = {  top: 80, right: 140, bottom: 80, left: 100 }
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

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""]

    var yScale = d3.scale.ordinal()
      .domain(monthNames)
      .rangePoints([0, height])


    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(d3.time.year, 10)


    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .tickPadding(8)
      .tickSize(0)


    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
      .attr("x", width / 2 )
      .attr("y", margin.bottom - 20)
      .style({
        "text-anchor": "middle",
        "font-weight": "bold",
        "font-size": "20px"
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
          "font-weight": "bold",
          "font-size": "20px"
        })
        .text("Months")

      var ticks = $("g.y.axis").find(".tick")
      ticks = Array.prototype.slice.call(ticks)
      ticks.forEach((tick, i)=> {
        // console.log(i)
        var $tick = $(tick)
        // console.log($tick.attr("transform"))
        var heightDif = 46.666666666666664;
        var newDif = i * heightDif + (heightDif / 2)
        var translateStr = "translate(0," + newDif + ")"
        $tick.attr("transform", translateStr)
        // console.log($tick.attr("transform"))

      })

      var colorRanges = [];
      for (var i = 1; i <= 9; i++) {
        colorRanges.push(14/9 * i)
      }


      var colors = ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026']

      function assignColor(temp) {

        for (var i = 0; i < colorRanges.length; i ++) {
          if (temp <= colorRanges[i]) {
            result = i;
            break;
          }
        }
        return colors[result];

      }

      //tool-tip
      function withSign (variance) {
        if (variance >= 0) {
          return "+" + variance;
        } else {
          return variance
        }
      }

      var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        var temp = d.variance + baseTemperature;
        return "<span>" + monthNames[d.month - 1] + ", " + d.year + "</span><br><span>" + temp + "&degC" + "</span>" + "<br><span>" + withSign(d.variance) + "</span>"
      })

      //go through data and append rects
      svg.selectAll("rect")
        .data(result.monthlyVariance)
        .enter().append("rect")
        .call(tip)
        .attr("x", function (d) {
          return xScale(new Date(d.year.toString()))
        })
        .attr("y", function (d) {
          return yScale(monthNames[d.month - 1])
        })
        .attr("height", height / 12)
        .attr("width", width / (2015 - 1753) )
        .attr("fill", function (d) {
          var temp = d.variance + baseTemperature;
          return assignColor(temp)
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)

      //add colors legend

    var legendData = colorRanges.map(function (range,i) {
      return [range, colors[i]]
    })

    console.log(legendData)
    var legend = svg.selectAll(".legend")
      .data(legendData)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        var margin = parseInt(i * 18 + 200);
        return "translate(100," + margin + ")";

    });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return d[1];});

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style({
        "text-anchor": "end",
        "font-size": "16px"
      })
      .text(function(d) { return d[0].toFixed(1);})

  //chart title
  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style({
            "font-size": "30px",
            "font-weight": "bold"
        })
        .text("Monthly Global Land-Surface Temperature from 1753-2015")

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top/ 5))
    .attr("text-anchor", "middle")
    .style({
      "font-size": "14px"
    })
    .text("Temperatures are in Celsius and are displayed relative to the Jan 1951-Dec 1980 average of 8.66 degrees celsius")

  })

});
