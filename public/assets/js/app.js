$(document).ready(function(){
  
  var chartData = calculateChartData(window.FoodData.breakfasts, window.FoodData.votes);
  if(chartData[0].y !== 0 || chartData[1].y !== 0) {
    createPieChart('breakfastChartContainer'
      ,'Breakfast'
      , chartData);
  }

  chartData = calculateChartData(window.FoodData.lunchs, window.FoodData.votes);
  if(chartData[0].y !== 0 || chartData[1].y !== 0) {
    createPieChart('lunchChartContainer'
      ,'Lunch'
      , chartData);
  }

  chartData = calculateChartData(window.FoodData.snacks, window.FoodData.votes);
  if(chartData[0].y !== 0 || chartData[1].y !== 0) {
    createPieChart('snacksChartContainer'
      ,'snacks'
      , chartData);
  }

  chartData = calculateChartData(window.FoodData.dinners, window.FoodData.votes);
  if(chartData[0].y !== 0 || chartData[1].y !== 0) {
    createPieChart('dinnerChartContainer'
      ,'Dinner'
      , chartData);
  }

  // Bind voting buttons
  $('.voteupButton, .votedownButton').on('click', function(e){
    function revertButton() {
      if(vote) {
        $button.html('<span class="glyphicon glyphicon-thumbs-up"></span>').attr('disabled', false);
      } else {
        $button.html('<span class="glyphicon glyphicon-thumbs-down"></span>').attr('disabled', false);
      }
    }
    e.preventDefault();
    var $button = $(this);
    $button.attr('disabled', true).text('Please wait...');
    var vote;
    if($button.hasClass('voteupButton')) {
      vote = true;
    } else {
      vote = false;
    }
    $.ajax({
      dataType: 'json',
      type: 'POST',
      url : '/api/vote',  
      data: {
        _food: $button.data('food'),
        _menu: $button.data('menu'),
        rating: vote
      },
      success: function(data, textStatus) {
        if(typeof data.error !== 'undefined') {
          alert(data.error);
          revertButton();
          return;
        }
        $button.attr('disabled', false).html('<span class="glyphicon glyphicon-ok"></span> Done!');
        reloadAndGotoAnchor();
      },
      error: function(textStatus) {
        console.log(textStatus);
        alert('An error occured while saving your request. Please try again.')
        revertButton();
      }
    });
  });

  $('#gotoStatistics').on('click', function(e){
    e.preventDefault();
    reloadAndGotoAnchor();
  });
  
});

// Reloads the page to an anchor element
function reloadAndGotoAnchor() {
  window.location.href='/#statistics';
  window.location.reload();
}

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

function calculateChartData(menus, votes) {
  var good = [];
  var bad = [];
  for(var i = 0; i < votes.length; i++) {
    if(menus.indexOf(votes[i]._menu) === -1) {
      continue;
    }
    if(votes[i].rating === true) {
      good.push(votes[i]);
    } else {
      bad.push(votes[i]);
    }
  }
  return [
    {  y: good.length, legendText:"Good" },
    {  y: bad.length, legendText:"Bad" }
  ];
}