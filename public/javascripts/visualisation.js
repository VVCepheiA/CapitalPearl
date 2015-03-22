// (function(){

// var yearRingChart   = dc.pieChart("#chart-ring-year"),
//     spendHistChart  = dc.barChart("#chart-hist-spend"),
//     spenderRowChart = dc.rowChart("#chart-row-spenders");

// // use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
// var spendData = [
//     {Charity: 'Community Empowerment Fund', Rewards: '40', Year: 2011},
//     {Charity: 'Paws4ever', Rewards: '10', Year: 2011},
//     {Charity: 'Girl Develop It', Rewards: '40', Year: 2011},
//     {Charity: 'Community Empowerment Fund', Rewards: '70', Year: 2012},
//     {Charity: 'Paws4ever', Rewards: '20', Year: 2012},
//     {Charity: 'Paws4ever', Rewards: '50', Year: 2013},
//     {Charity: 'Girl Develop It', Rewards: '30', Year: 2013}
// ];

// // var donation = !{JSON.stringify(donations)};


// // normalize/parse data
// spendData.forEach(function(d) {
//     d.Rewards = d.Rewards.match(/\d+/);
// });

// // set crossfilter
// var ndx = crossfilter(spendData),
//     yearDim  = ndx.dimension(function(d) {return +d.Year;}),
//     spendDim = ndx.dimension(function(d) {return Math.floor(d.Rewards/10);}),
//     nameDim  = ndx.dimension(function(d) {return d.Charity;}),
//     spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Rewards;}),
//     spendPerCharity = nameDim.group().reduceSum(function(d) {return +d.Rewards;}),
//     spendHist    = spendDim.group().reduceCount();

// yearRingChart
//     .width(200).height(200)
//     .dimension(yearDim)
//     .group(spendPerYear)
//     .innerRadius(50);

// spendHistChart
//     .width(300).height(200)
//     .dimension(spendDim)
//     .group(spendHist)
//     .x(d3.scale.linear().domain([0,10]))
//     .elasticY(true);

// spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
// spendHistChart.yAxis().ticks(2);

// spenderRowChart
//     .width(350).height(200)
//     .dimension(nameDim)
//     .group(spendPerCharity)
//     .elasticX(true);

// dc.renderAll();

// })();