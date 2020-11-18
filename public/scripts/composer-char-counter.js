$(document).ready(function() {
  $('#tweet-text').on('keyup',function() {
    let keyEn = $(this).val().length;
    let counter = 140 - keyEn;
    $('.counter').text(counter);
    if (counter < 0) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','black');
    }

  });
});