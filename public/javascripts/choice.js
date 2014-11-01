$(document).ready(function() {
  /* On window resize, readjust the width/height of the bubbles */
  $(window).resize(
    function(){
        $windowWidth = $(this).width();
        
        $('.bubble').width($(window).width()/12);
        $('.bubble').height($('.bubble').width());
        $bubbleWidth = $('.bubble').width();
        console.log($bubbleWidth);
        $('.pushme').css('top', ($(window).height()*0.4)+'px');
        $('.shadow').css('top', ($(window).height()*0.42)+'px');
        $('p.choice').css('font-size',($(window).width()/17)+'px');
        $('p.choice').css('left', '16%');
    }
  );

  $(window).resize();

  $(function ()
  {
    $(".pushme").mouseenter(function () {
        $(this).animate({top:'+=2%'}, 'fast');
    }).mouseleave(function ()
    {
        $(this).animate({top:'-=2%'}, 'fast');
    });
  });
});

