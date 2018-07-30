var floor = 1;
var num_of_floors = 4;
var bottom_floor = -1;
var floor_names = ["Proof Without Words", "Under construction", "Poly Art", "More Poly Art","Astronomy I", "Astronomy II"]
var mode = 0; //mode == 0 is minimalistic, == 1 is realistic
$(document).on("ready",function(){
  
  //Load floors in positions

  num_of_floors = $(".floor").length;
  for (var i = bottom_floor; i<=num_of_floors; i ++){
    if (floor == i){
      $("#floor"+i).css("transform","translate(0,0)");
    }
    else {

      $("#floor"+i).css("transform","translate(0, " + (floor-i)*1000+"px)");
    }
  }
  
  switchScene(mode);
  $("#switchScene").on("click", function(){
    if (mode == 0){
      mode = 1;
      $("#switchScene").attr("class", "fas fa-square");
    }
    else if (mode == 1){
      mode = 0;
      $("#switchScene").attr("class", "far fa-square");
    }
    switchScene(mode);
    
  })
  $(".go_up").on("click", function(){
    if (floor >= num_of_floors + bottom_floor-1){
      return;
    }
    floor++;
    elevator_move(floor, true);
    
    change_floor(floor, true);
    //Floors seperated by 1000px each, 1000 beacause no one opens sites with a window height of 1000px....
  });
  $(".go_down").on("click", function(){
    
    if (floor <= bottom_floor){
      return;
    }
    floor--;
    elevator_move(floor, false);
    change_floor(floor);
    //Floors seperated by 2000px each, 2000 beacause no one opens sites with a window height of 2000px....
  });
  var topval = (window.innerHeight - 400)/2;
  $(".item").css("top",topval + "px")
  $(".elevatorSpaceAbs").css("top",topval + "px")
  $(".elevatorSpace").css("top",topval + "px")
  $(".elevatorSpaceAbsReal").css("top",topval + "px");
  $(".floor_background").css("top", topval + "px");
  //When window is resized, reset top values for .items
  window.onresize = function(e){
    var topval = (window.innerHeight - 400)/2;
    //400 = height of floors
    $(".item").css("top",topval + "px")
    $(".elevatorSpaceAbs").css("top",topval + "px");
    $(".elevatorSpaceAbsReal").css("top",topval + "px");
    
    $(".elevatorSpace").css("top",topval + "px")
    
    $(".floor_background").css("top", topval + "px");
  }
  
  
  
  //Load svg's as inline svgs
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');  
  });
  document.onreadystatechange = function(){
    if (document.readState = "complete"){
      //If document loads all images and svgs, continue
      $(".floor").css("transition", "transform 2s");
      $(".floor").css("transition-delay", "1s");
    }
  }
  $(".full_screen").on("click", function(){
    toggleFullScreen();
  })
  
});

var floor_num_display_timer;
var elevator_translate_timer;
  
//Display text for what floor user goes to and what floor they are on
//Also move elevator to give impression that it is moving
function elevator_move(current_floor, up){
  if (current_floor > num_of_floors + bottom_floor-1 || current_floor < bottom_floor){
    return;
  }
  var percent = "-30%";
  if (up == false){
    percent = "30%";
  }
  if (mode >= 0){
    $("#floor_num_display").text("Going to floor " + current_floor);
    $("#elevator_door").css("width","100%");
    $("#floor_num_display").css("font-size","20px")
    clearTimeout(elevator_translate_timer);
    elevator_translate_timer = window.setTimeout(function(){
      $(".elevatorSpaceAbs").css("transform","translate(0," + percent + ")");
      $(".elevatorSpaceAbsReal").css("transform","translate(0," + percent + ")");
    }, 1000);
    
    //Realistic
    $(".elevatorDoorLeft").css("width","87.5px");
    $(".elevatorDoorRight").css("width","87px");
    
    clearTimeout(floor_num_display_timer);
    floor_num_display_timer = window.setTimeout(function(){
      $("#floor_num_display").text(current_floor);
      $("#floor_num_display").css("font-size","30px")
      $("#elevator_door").css("width","0%");
      
      //Realistic
      $("#floor_num_display_real").text(current_floor);
      $("#floor_num_display_real").css("font-size","30px")
      $(".elevatorDoorLeft").css("width","0px");
      $(".elevatorDoorRight").css("width","0px");
    },3000);
  }
  
  
  
  
  clearTimeout(elevator_translate_timer);
  elevator_translate_timer = window.setTimeout(function(){
    $(".elevatorSpaceAbs").css("transform","translate(0,0)");
    $(".elevatorSpaceAbsReal").css("transform","translate(0,0)");
    if (current_floor <= num_of_floors + bottom_floor - 1 && current_floor >= bottom_floor){
      $(".floor_title").text(floor_names[current_floor - bottom_floor])
    }
    else{
      $(".floor_title").text("You are at nowhere...")
    }
  }, 2000);
}
  

function change_floor(new_floor){
  if (new_floor > num_of_floors + bottom_floor -1 || new_floor < bottom_floor){
    return;
  }
  for (var i = bottom_floor; i<=num_of_floors; i ++){
    if (new_floor == i){
      $("#floor"+i).css("transform","translate(0,0)");
      
    }
    else {
      $("#floor"+i).css("transform","translate(0, " + (new_floor-i)*1000+"px)");
    }
  }
  
}

//Change display from minimalistic to realistic
function switchScene(modeVal){
  //when changing modes
  if (modeVal == 0){
    $(".elevatorSpaceAbsReal").css("display","none");
    $(".elevatorSpaceAbs").css("display","inline");
    $(".item").css("border-left", "10px solid RGB(50,50,50)");
    $(".floor_background").css("background-image","none");
    $(".floor_background").css("border-top","none");
    $(".floor_background2").css("background-image","none")
    $(".floor_background2").css("border-bottom","none");
    
    //$(".floor_background2").css("background-color","burlywood")
    $(".item").css("color", "RGB(50,50,50)");
    $(".elevatorSpace").css("border-left","10px solid RGB(50,50,50)")
  }
  else if (modeVal == 1){
    $(".elevatorSpaceAbs").css("display","none");
    $(".elevatorSpaceAbsReal").css("display","inline");
    
    //Set CSS
    $(".item").css("color", "white");

    $(".item").css("border-left", "10px solid white");
    $(".floor_background").css("border-top","5px solid RGB(230,230,230)");
    $(".floor_background").css("border-bottom", "15px solid RGB(230,230,230)");
    $(".floor_background2").css("border-bottom","15px solid RGB(230,230,230)")
    $(".elevatorSpace").css("border-left","10px solid white")
    $(".floor_background").css("background-image","url(images/museumstructure/background2.jpg)")
    $(".floor_background2").css("background-image","url(images/museumstructure/floor6.jpg)")
    
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}