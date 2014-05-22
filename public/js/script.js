$(document).ready(function(){

$('.topbutton').hover(function(){
	$(this).addClass('active');
}, function(){
	$(this).removeClass('active');
});


$('.groupbutton').hover(function(){
    $(this).addClass('active1');
}, function(){
    $(this).removeClass('active1');
});


$('.search').focus(function() {
  ('input').css('outline-color', '#FF0000');
});


var input = $('input[name=search]').var();

});