// Creates a Canvas JS Chart
function createPieChart(chartContainer, chartTitle, dataPoints) {
  var chart = new CanvasJS.Chart(
    chartContainer,
    {
      title: {
        text: chartTitle
      },
      legend:{
        verticalAlign: "center",
        horizontalAlign: "left",
        fontSize: 16,
        fontFamily: "Helvetica"        
      },
      theme: "theme1",
      data: [{        
        type: "pie",       
        indexLabelFontFamily: "Garamond",       
        indexLabelFontSize: 20,
        startAngle:-20,      
        showInLegend: true,
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
}