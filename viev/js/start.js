
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


   $('.copySecCod').click(function()
   {
    var text = $(".pCopy").text();
    navigator.clipboard.writeText(text);
   });
   
//----------------------------------------BALANCE----------------------------------------//
   $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/balanceAll',
    success: function(response) 
    { 
       //console.log(response);
       UpdateBalance(response);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });

   function UpdateBalance(val) 
   {
        // console.log(val[0]['bitcoin']);
    //$('.wallet  > div')
    $('.wallet table tbody tr').each((index, elem) => 
    {
         if((elem.id).toString() === Object.keys(val[index])[0])
         {
        var bal = Object.values(val[index])[0]; // здесь может быть без [0]
        
            $('#' + elem.id + ' .balance').text(bal);
          
      //Disable button send if balance == 0
              if(bal === 0)
              {
                let button = document.querySelector('#' + elem.id + ' .butSend');
                        button.disabled = true;
                        button.style.background = "gray";
                        button.style.color = "lightsteelblue";
              }

              let price =  $('#' + elem.id + ' .price').text();
              price = price.slice(0, price.indexOf(' '));
             $('#' + elem.id + ' .sum').html(" " + (Number(price)* Number(bal)) + ' $'); 
         }
    });
    
   }
 //----------------------------------------End BALANCE----------------------------------------//

 //----------------------------------------Get price -----------------------------------------//

 $.ajax({
  type: 'POST',
  url: 'http://localhost:8080/price',
  success: function(response) 
  { 
     WievPrice(response);
  },
  error: function(xhr, status, err) 
  {
    console.log(xhr.responseText);
  }
 });

 function WievPrice(val) 
 {
   
  $('.wallet table tbody tr').each((index, elem) => 
  {
      // if((elem.id).toString() === Object.keys(val[index])[0])
      // {
      //   var t = Object.values(val[index]) + '<span style="color:green"> $</span>';
       var percent = val[index][2];
          $('#' + elem.id + ' .price').html(val[index][1] + ' $');
          if (Number(percent) > 0)
                 $('#' + elem.id + ' .percent').css("color","green");
                      else
                      $('#' + elem.id + ' .percent').css("color","rgba(211, 80, 90, 0.993)");
          $('#' + elem.id + ' .percent').html(percent + ' %'); 

      // }
  });

 }
 //----------------------------------------End Get price -----------------------------------------//

});
