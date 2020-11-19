/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {


  //used the hide the error message for incorrect tweets
  $(".error-empty").hide();
  $(".error-long").hide();



  ///funtion which takes in array of tweets from users and send prepend it to tweets-container in index.html
  const renderTweets = (tweets)=>{
    $("#tweets-container").empty();
    let $usertweet = {};

    for (let tweet of tweets) {
      $usertweet = createTweetElement(tweet);

      $('#tweets-container').prepend($usertweet);
    }
  
 
  };
  ///// function to change the time stamp /////////
  const printdate = function(times) {
    const date = new Date(times);
    return date.toLocaleString();
  };

  //// function to create a new tweet using object input///////
  const createTweetElement = (obj)=>{
    const $usertweet = (
      `<article class = 'usertweet'>  
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
        <div>
         <img src= "/images/flag.png">
         <img src= "/images/retweet.png">
         <img src= "/images/heart.png">
         </div>
        </div>
       </article>`);
    return $usertweet;
  };


  //// function that get usertweet and info from the /tweets as json then call the renderTweets function
  const loadtweets = function() {
    $.ajax({
      method:"GET",
      url:"/tweets",
      dataType:'json'
    }).then((input) => {
      renderTweets(input);
    }).catch(err => console.log(err));
  };
  // loading pr
  

  
  /// form submit, take the tweet from the text area and post it to /tweets
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
      
    } else {
      $.ajax({
        method:"POST",
        url:"/tweets",
        data: $(this).serialize()
     
      }).then(()=>{
        $("#tweet-text").val('');
        loadtweets();
        $(".counter").val(140);
      }).catch(err => console.log(err));
     
    }
    
    
  });
  
  /// used to stop cross scripting
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  
  loadtweets();
});