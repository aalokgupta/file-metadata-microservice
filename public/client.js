// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });
  
  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var dream = $('input').val();
  //   $.post('/dreams?' + $.param({dream: dream}), function() {
  //     $('<li></li>').text(dream).appendTo('ul#dreams');
  //     $('input').val('');
  //     $('input').focus();
  //   });
  // });
var file_name;
$('form').submit(function(event) {
    event.preventDefault();
    getoutput();
    console.log("files "+file_name);
    $.post('/upload?' + $.param({dream: file_name}), function() {
    });
  });
  
  function getFile(filePath) {
        return filePath.substr(filePath.lastIndexOf('\\') + 1);//.split('.')[0];
    }

  function getoutput() {
        file_name = getFile(document.getElementById('file').value);
    }
  
});


