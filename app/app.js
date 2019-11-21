// IMAGES FOR USERS:
streams.users.shawndrost.image = 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
streams.users.sharksforcheap.image = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
streams.users.mracus.image = 'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
streams.users.douglascalhoun.image = 'https://images.pexels.com/photos/35183/people-homeless-man-male.jpg?auto=compress&cs=tinysrgb&h=750&w=1260'


$(document).ready(function(){

  var $streamContainer = $('.stream-container');
  var displayedTweetCount = 0;
  $streamContainer.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    tweet.image = streams.users[tweet.user].image
    $tweet = generateHTML(tweet);
    $streamContainer.prepend($tweet);
    displayedTweetCount++
    index -= 1;
    $("time.timeago").timeago()
  }

  $( document ).on("click", ".load-more", function(e){
    // e.preventDefault();
    var $streamContainer = $('.streamContainer');
    $streamContainer.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      tweet.image = streams.users[tweet.user].image
      $tweet = generateHTML(tweet);
      $streamContainer.append($tweet);
      index -= 1;
      displayedTweetCount = streams.home.length
      $("time.timeago").timeago()
    }
    $(".load-more").blur();
  });

  $( document ).on('click', ".user-link", function(e){
    $( ".stream-container" ).html(`<div class="streamContainer"></div>`);
    $( ".load-more" ).hide();
    var user = $ ( this ).attr('value');
    var userTweetArray = streams.users[user]
    for (var i = userTweetArray.length-1; i >= 0; i--) {
      tweet = userTweetArray[i];
      tweet.image = streams.users[user].image
      $tweet = generateHTML(tweet);
      $( ".streamContainer" ).append($tweet);
      $("time.timeago").timeago()
    };
  })

  $( document ).on('click', '.nav-link', function(e){
    location.reload();
  });



  function generateHTML(tweet){
    var $tweet = $('<div></div>');
    $tweet.html(`
    <div class="content content-container">
      <img class="user-image" alt='user profile image' src=${tweet.image}>
      <div class="content-text">
        <a class="user-link" href="#" value=${tweet.user}>@${tweet.user}</a>
        <time class="timeago" datetime=${tweet.created_at.toISOString()}>time</time>
      </div> <!-- END content-text -->
      <p class="message">${tweet.message}</p>
    </div>`);
    return $tweet;
  };

  function updateButton(){
    var diff = streams.home.length - displayedTweetCount;
    if (diff >= 0){
      $(".load-more").text(`UPDATE TWIDDLES (${diff})`)
    };
  };

  setInterval(updateButton, 500)
});


