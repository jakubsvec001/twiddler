$(document).ready(function(){
  var $main = $('main');
  $main.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($main);
    index -= 1;
  }

});

console.log('hello')