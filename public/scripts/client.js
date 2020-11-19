/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  

  


  const renderTweets = (tweets)=>{
    let $usertweet = {};
    for (let tweet of tweets) {
      $usertweet = createTweetElement(tweet);
      $('#tweets-container').prepend($usertweet);
    }
  
 
  };

  const printdate = function(times) {
    const date = new Date(times);
    return date.toLocaleString();
  };

  const createTweetElement = (obj)=>{
  


    const $usertweet = (`<article class = 'usertweet'>
      
  <div class="userinfo">
    <div class="image" > 
    <img src= ${escape(obj.user.avatars)}>
      <p>${escape(obj.user.name)}</p>
    </div>
    <p>${escape(obj.user.handle)}</p>
   
  </div>
  <div class="usertext">
    <p>${escape(obj.content.text)}</p>
  </div>
  <div class="otherinfo">
   <p>${printdate(obj.created_at)}</p>
  </div>
  
 
</article>`);
    return $usertweet;
  };


  
  const loadtweets = function() {
    $.ajax({
      method:"GET",
      url:"/tweets",
      dataType:'json'
    }).then((input) => {
      $("#tweets-container").empty();
      renderTweets(input);
      
    }).catch(err => console.log(err));
  };

  $(".error-empty").hide();
  $(".error-long").hide();
  $(".tweet-user").submit(function(event) {
    event.preventDefault();
    let newtweet = $('#tweet-text').val();
    if (newtweet === '' || newtweet === null) {
      $(".error-empty").slideDown("fast");
      $("#tweet-text").click(function() {
        $(".error-empty").hide();
      });
      
    } else if (newtweet.length >
      140) {
      $(".error-long").slideDown("fast");
      $("#tweet-text").click(function() {
        $(".error-long").hide();
      });
      //alert(' too long');
    } else {
      
      $.ajax({
        method:"POST",
        url:"/tweets",
        data: $(this).serialize()
     
      }).then(()=>{
      
        loadtweets();
      
      }).catch(err => console.log(err));
      this.reset();
    }
    
    
  });
 
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  
  
});