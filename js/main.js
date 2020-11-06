/* 575 boilerplate main.js */
window.onload=function(){
  var w=910, h=500;
  //add container to html body
  var container=d3.select("body")
      .append("svg")
      .attr("width", w) //name of attr, then value
      .attr("height", h)
      .attr("class", "container");
//add rectangle within
  var rectangle = container.append("rect")
  //"container" was created with d3, can chain other methods
      .datum(400)
      .attr("width", function(d){
      return 2*d;
    })
      .attr("height", function(d){
      return d;
    })
      .attr("x", 60)
      .attr("y", 50)
      .attr("class", "rectangle");

      var cityPop = [
          {
            city: 'Dubai',
            population: 3331000

          },
          {   city: 'London',
          population: 8982000

          },
          {
              city: 'Moscow',
              population: 11920000
          },
          {
              city: 'New York City',
              population: 8399000
          }
      ];

      //create linear scale withh output and input max and min
      var x=d3.scale.linear()
            .range([100, 820])
            .domain([0,4]);
      //find min, max values of array
      var minPop=d3.min(cityPop, function(d){
        return d.population;
      });

      var maxPop=d3.max(cityPop, function(d){
        return d.population;
      });

      //scael circles center y coordinate
      var y=d3.scale.linear()
        .range([450, 50])
        .domain([0,14000000])

        //determine range of colors based on linear scale
      var color=d3.scale.linear()
          .range([
            "lightblue",
            "darkblue"
          ])
          //position horizontally within minPop and maxPop
          .domain([
            minPop,
            maxPop
          ]);
          //orient axis scale, position just right
      var yAxis=d3.svg.axis()
          .scale(y)
          .orient("left")
      //add, position axis
      var axis=container.append("g")
          .attr("class","axis")
          .attr("transform","translate(60,0)")
      yAxis(axis);

      //add a title, position
      var title=container.append("text")
          .attr("class","title")
          .attr("text-anchor","middle")
          .attr("x", 450)
          .attr("y",30)
          .text("World City Populations")
      //add labels to cityPop
      var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "center")
        .attr("y", function(d){
          return y(d.population);
        });

      //break up labels into nameLine and popLine
      var nameLine=labels.append("tspan")
          .attr("class","nameLine")
          .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.001 / Math.PI)+5;
        })

          .text(function(d){
            return d.city;
          });

    var format=d3.format(",");

    var popLine=labels.append("tspan")
        .attr("class","popLine")
        .attr("x",function(d,i){
          return x(i)+Math.sqrt(d.population*0.0009/Math.PI)+5;  //multiply by .0009 and nameLine by .001


        })
        .attr("dy","15")//position y coordiante of labels
        .text(function(d){
          return " Pop. " + format(d.population);
        });

      var circles=container.selectAll(".circles")
          .data(cityPop)
          .enter()
          .append("circle") //add a circle for each datum
          .attr("class","circles") //give class name, "circles"
          .attr("id", function(d){
            return d.city;
          })
          .attr("r", function(d){//give radius depending on population value
            var area=d.population*0.0004;
            return Math.sqrt(area/Math.PI);
          })

          .attr("cx",function(d,i){//x coordinate, using index
            return x(i);
          })

          .attr("cy",function(d){//y coordinate, using population
            return y(d.population);
          })
          .style("fill",function(d,i){//style circles
            return color(d.population);
          })
          .style("stroke", "#000")

}
