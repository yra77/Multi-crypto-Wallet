
jQuery(document).ready(function($)
{
 
  $('.butReceive').click(function()
  {
    var id = this.parentNode.id;
  
$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/receive',
    data: {
            id :id
         },
    success: function(response) 
    { 
        console.log(response);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });
  });
  $('.butSend').click(function()
  {
    var id = this.parentNode.id;
$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/send',
    data: {
             id :id
          },
    success: function(response) 
    { 
        console.log(response);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });
  });
 
});