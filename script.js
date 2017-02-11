$(document).ready(function(){

  $('.btn').attr('onOff','off').attr('on_click','off');
  $('.btn span').hide();
  $('#btn1').attr('onOff','on').attr('on_click','on');
  $('#btn1 span').show();

  $('.btn').mouseover(function(){
    var that=$(this); 
    if($(this).attr('onOff')=='off'){
      $(this).attr('onOff','on').stop().animate({width:'80px',},function(){that.children('span').show()});
    }   
    return false;
  });

  $('.btn').mouseout(function(){
    var that=$(this);
    if($(this).attr('onOff')=='on'&&$(this).attr('on_click')=='off'){
      $(this).attr('onOff','off').stop().animate({ width:'10px',},function(){that.children('span').hide()});
    }
    return false;
  });

  $('.btn').click(function(){
    $('.btn').css({width:'10px',}).attr('on_click','off').attr('onOff','off').children('span').hide();
    $(this).css({width:'80px',}).attr('on_click','on').attr('onOff','on').children('span').show();
  });

  $('#btn1').click(function(){
    $('.online').show();
    $('.offline').show();
  });
  $('#btn2').click(function(){
    $('.online').show();
    $('.offline').hide();
  });
  $('#btn3').click(function(){
      $('.online').hide();
      $('.offline').show();
  });

  var users=[["Magic"],["freecodecamp"], ["storbeck"], ["terakilobyte"], ["habathcx"],["RobotCaleb"],["thomasballinger"],["noobs2ninjas"],["beohoff"],["ESL_SC2"]];

  for(let i=0;i<users.length;i++){
      
    ajaxData('streams',users[i][0],function(data){

      if(data.stream==null){
        users[i][1]='offline';
      }else{
        users[i][1]='online';
        users[i][2]=data.stream.channel.game+':'+data.stream.channel.status;
      };

      ajaxData('channels',users[i][0],function(data){

        var src=data.logo?data.logo:'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg';
        var url=data.url;
        var content=users[i][2]?users[i][2]:users[i][1];
        var newElement='<div class="user_box '+users[i][1]+'"><img class="logo" src="'+src+'"/><a href="'+url+'" target="_blank" class="name" >'+users[i][0]+'</a><p class="status" ><i>'+content+'</i></p></div>';

        if(users[i][1]=='offline'){
          $(newElement).appendTo($('#on_off'));
        }else{
          $(newElement).insertBefore($('#on_off'));
        };

      });

    });
  }

  function ajaxData(type,name,fn){
    $.ajax({
      url:'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?',
      crossDomain:true,
      type:'get',
      dataType:'jsonp',
      success:fn,
    })
  }
  

          
});