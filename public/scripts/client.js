/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  const renderTweets = (tweets)=>{
    let $usertweet = {};
    for (let tweet of tweets) {
      $usertweet = createTweetElement(tweet);
      $('#tweets-container').append($usertweet);
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
    <img src= ${obj.user.avatars}>
      <p>${obj.user.name}</p>
    </div>
    <p>${obj.user.handle}</p>
   
  </div>
  <div class="usertext">
    <p>${obj.content.text}</p>
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
      renderTweets(input);
      console.log("Hi load tweet works");
    });
  };

  $(".tweet-user").submit(function(event) {
    event.preventDefault();
    $.ajax({
      method:"POST",
      url:"/tweets",
      data: JSON.stringify($(this).serialize())
     
    }).then(()=>{
      console.log(data);
      loadtweets();
      console.log('loaded');
    });
    console.log($(this).serialize(), "!");
   
  });
 
  

  
  renderTweets(data);
});