// RandomMule.JS
// Author: Ansal
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);;
}
$('#reloadButton').on('click', function(e){
  e.preventDefault();
  var $button = $(this);
  $button.attr('disabled', true).text('Please wait...');
  var randomNum = getRandomNumber(1, 11);
  $('body').css('background', 'url(/assets/img/bg/' + randomNum + '.JPG) no-repeat top center scroll');
  $.ajax({
    type: 'GET',
    url: '/oneliner/',
    dataType: 'json',
    success: function(data, textStatus) {
      if(typeof data.error === 'undefined') {
        $('.title').text(data.title);
        $('.subtitle').text(data.situation);
      } else {
        alert('Fetching one liner failed. Please try again');
      }
      $button.attr('disabled', false).text('Show Me Another One');
    },
    error: function(textStatus) {
      console.log(textStatus);
      $button.attr('disabled', false).text('Show Me Another One');
      alert('Fetching one liner failed. Please try again');
    }
  });
});

$('#newOnelinerButton').on('click', function(e){
  e.preventDefault();
  $('#onelinerSaved').hide();
  $('#newOnelinerForm').show();
  $('#saveOnelinerButton').show();
  $('#onelinerText').val('');
  $('#onelinerSituation').val('');
  $('#jaagaAnswer').val('');
  $('#qid').val('');
  var $button = $(this);
  $button.attr('disabled', true).text('Please wait...');
  var $modal = $('#newOnelinerModal');
  $button.attr('disabled', true);
  $.ajax({
    url: '/question',
    type: 'get',
    dataType: 'json',
    success: function(data, textStatus) {
      $('#jaagaQuestion').text(data.question);
      $('#qid').val(data.id);
      $modal.modal();
      $button.attr('disabled', false).text('Submit New One');
    },
    error: function(textStatus) {
      console.log(textStatus);
      alert('Your request cannot be processed. Please try again.');
      $button.attr('disabled', false).text('Submit New One');
    }
  });
});

$('#saveOnelinerButton').on('click', function(e){
  e.preventDefault();
  var $button = $(this);
  $button.attr('disabled', true).text('Please wait...');
  var title = $('#onelinerText').val();
  var situation = $('#onelinerSituation').val();
  var answer = $('#jaagaAnswer').val();
  var qid = $('#qid').val();
  if(!title || !situation || !answer) {
    alert('Please fill all the fields');
    $button.attr('disabled', false).text('Submit');
    return;
  }
  $.ajax({
    url: '/oneliner',
    type: 'post',
    dataType: 'json',
    cache: false,
    data: {
      qid: qid,
      answer: answer,
      situation: situation,
      oneliner: title
    },
    success: function(data, textStatus) {
      if(typeof data.error === 'undefined') {
        $button.hide();
        $('#newOnelinerForm').hide();
        $('#onelinerSaved').fadeIn();
      } else {
        alert(data.error);
      }
      $button.attr('disabled', false).text('Submit');
    },
    error: function(textStatus) {
      $button.attr('disabled', false).text('Submit');
      console.log(textStatus);
      alert('Your request cannot be processed. Please try again.');
    }
  });
});