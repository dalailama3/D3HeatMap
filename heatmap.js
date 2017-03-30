$("document").ready(function () {

  $.ajax({
    url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    dataType: "json"
  }).done(function (result) {
    console.log(result)
    var baseTemperature = result.baseTemperature;

    var margin = {  top: 80, right: 140, bottom: 60, left: 60 }
    var width = 900 - margin.left - margin.right
    var height = 700 - margin.top - margin.bottom
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


  })

});
