   
jQuery(document).ready(function($)
{
  
  $('.butSend').click(function()
  {
    var id = $(this).closest("tr").attr("id");//this.parentNode.id;  
    
    $('.secretCode').hide();
    $('.wallet').hide();
    $('#divReceive').show();

    $("#divReceive")
    .html(
      '<p style="color:chartreuse; margin-top: 3em;">Input the address to receive ' + id + ' :</p>'
    + '<input style="outline: none !important; border: rgb(97, 142, 179);border-bottom: 1px solid rgb(142, 235, 56);" id="inpAddress" type="text" placeholder="address to receive"/>'
    + '<p style="color:chartreuse; margin-top: 2em;">Amount to sending:</p>'
    + '<input style="outline:none !important; border: rgb(97, 142, 179);border-bottom: 1px solid rgb(142, 235, 56);" id="inpAmount" type="text" placeholder="amount to sending"/>'
    + '<p style="font-size: 70%; color:deeppink;" id="resultResponse"></p>'
    + '<p><button id="send" type="button" style="width:6em;background-color:green; color:white; margin-top: 5em;">Send</button></p>'
    + '<p><button id="exit" type="button" style="width:6em;background-color:red; color:white; margin-top: 5em; margin-left: 35%;">Exit</button></p>'
    );


    $('#send').click(function()
    {
      var addressTo = document.getElementById("inpAddress");
      var amount = document.getElementById("inpAmount");
     
      if(addressTo.value.length > 10 && Number(amount.value) > 0.0000001)
      {
        $('#resultResponse').text(Send(id, addressTo.value, amount.value));
      }
      else
      {
        $('#resultResponse').text("amount or address - failure")
      }
       
    });

    $('#exit').click(function()
    {
      $('#divReceive').hide();
      $('.secretCode').show();
      $('.wallet').show();
    });

  });
 
  function Send(id, addressTo, amount) 
  {
    var res = '';
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/send',
      data: {
               id :id,
               addressTo: addressTo,
               amount: amount
            },
      async: false,
      success: function(response) 
      { 
          //console.log(response);
          res = response;     
      },
      error: function(xhr, status, err) 
      {
        console.log(xhr.responseText);
      }
     });
     
     return res;  
  }

});
