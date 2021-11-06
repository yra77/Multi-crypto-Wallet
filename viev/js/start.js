

jQuery(document).ready(function($)
{

$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/start',
    success: function(response) 
    { 
        $('#secretCode').html(response);
       // console.log(response);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });
 
});