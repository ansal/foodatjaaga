$('#addFoodButton').on('click', function(e){
  e.preventDefault();
  var title = $('#foodTitle').val();
  var imgUrl = $('#imgUrl').val();
  if(!title || !imgUrl) {
    $('#addFoodError').show();
    return;
  }
  var $button = $(this);
  $button.attr('disabled', true).text('Please Wait...');
  $.ajax({
    url : '/api/food',
    type: 'POST',
    dataType: 'json',
    data: {
      title: title,
      imgUrl: imgUrl
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