$('#addMenuButton').on('click', function(e){
  e.preventDefault();
  var when = $('#when').val();
  var food = $('#food').val();
  if(when === '0' || food === '0') {
    $('#addMenuError').show('fast');
    return;
  } else {
    $('#addMenuError').hide('slow');
  }
  var $button = $(this);
  $button.attr('disabled', true).text('Please Wait...');
  $.ajax({
    url : '/api/menu',
    type: 'POST',
    dataType: 'json',
    data: {
      when: when,
      _food: food
    },
    success: function(data, textStatus) {
      if(typeof data.error !== 'undefined') {
        alert(data.error);
        $button.attr('disabled', false).text('Add');
        return;
      }
      window.location.reload();
    },
    error: function(textStatus) {
      console.log(textStatus);
      alert('There was an error processing your request. Please try again!');
      $button.attr('disabled', false).text('Add');
    }
  });
});