$(document).ready(function(){

  var todoData = [];
  var box = $("#todo");

  box.bind('keydown', pressEnter);
  $(window).bind('unload', onUnload);
  $('#add').bind('touchstart click', touchAdd);
  run();

  function run()
  {
    if (typeof(localStorage) !== "undefined") 
    {
      if (window.localStorage["eshan"] !== undefined)
        todoData = JSON.parse(window.localStorage["eshan"]);
    }

    if(todoData.length > 0)
    {
      for(var i = 0; i < todoData.length; i++)
        createData(todoData[i]);
    }
  }

  function pressEnter(e)
  {
    if(e.keyCode === 13)
    {
      var input = box.val();
      if(input !== '')
        displayInput(input);

      box.val('');
    }
  }

  function touchAdd()
  {
      var input = box.val();
      if(input !== '')
        displayInput(input);

      box.val('');
  }

  function displayInput(input)
  {
    createData(input);
    todoData.push(input);
  }

  function createData(input)
  {
    var element = $('<div>').addClass('addBox');
    var userText = $('<div>').addClass('input').html(input);
    var remove = $('<div>').addClass('remove').html('x');
    remove.bind('touchstart click', onClose);
    $('#container').append(element.append(userText).append(remove));

    setTimeout(function(){
      element.removeClass('addBox').addClass('box');
    }, 0);
  }

  function onClose(e)
  {
    var element = e.target.parentNode;
    var input = $(element).children('.input').html();

    $(element).removeClass('box').addClass('removeBox');

    setTimeout(function(){
      $(element).remove();
      var index;
      $('.input').each(function(index){
        
        for(var i = 0; i < todoData.length; i++)
        {
          if(todoData[i] === $(this).text())
            index = i;
        }
        
      });
      todoData.splice(index, 1);
    }, 1000);


  }

  function onUnload()
  {
    window.localStorage['eshan'] = JSON.stringify(todoData);
  }
});