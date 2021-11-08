jQuery(document).ready(function($)
{
 
    $('#divReceive').hide();

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
        //console.log(response);
        Receive(response, id);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });
  });
  
function Receive(val, id) 
{
    $('.secretCode').hide();
    $('.wallet').hide();
    $('#divReceive').show();

    $("#divReceive").html('<p style="color:white; margin-top: 3em;">You must send ' + id + ' to address:</p><p style="color:chartreuse;">' + val + '</p>'
    + '<button type="button" style="background-color:red; color:white; margin-top: 5em; margin-left: 35%;">Exit</button>');

    $('#divReceive button').click(function()
    {
        $('#divReceive').hide();
        $('.secretCode').show();
        $('.wallet').show();
    });
}

});