$("document").ready(function () {

  $.ajax({
    url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    dataType: "json"
  }).done(function (result) {
    console.log(result)
    var baseTemperature = result.baseTemperature;

    var margin = {  top: 80, right: 140, bottom: 60, left: 100 }
    var width = 1200 - margin.left - margin.right
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

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
      .ticks(12, "")

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

      console.log(result.monthlyVariance)


      var colors = ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026']



      function assignColor(temp) {
        var colorRanges = [];
        for (var i = 1; i <= 9; i++) {
          colorRanges.push(14/9 * i)
        }

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
        .attr("height", height / 24)
        .attr("width", width / (2015 - 1753) )
        .attr("fill", function (d) {
          var temp = d.variance + baseTemperature;
          return assignColor(temp)
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)






  })

});
