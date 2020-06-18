//ANIMATION FUNCTION FOR HELLO
$(document).ready(function(){
  
    var div = $("#hello");  
    div.animate({left: '120px'}, "slow");
    div.animate({fontSize: '3em'}, "slow");
  });
$(document).ready(function(){
      $("#hello").animate({
        opacity: '0.8',
        height: '100px',
      });
    });
  
  $(document).ready(function(){
      $("#hello").slideDown("slow");
    
  });
