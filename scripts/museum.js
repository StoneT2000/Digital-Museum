var floor = 1;
var num_of_floors = 4;
var bottom_floor = -2;
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
  
  
  $("#go_up").on("click", function(){
    floor++;
    elevator_move(floor, true);
    
    change_floor(floor, true);
    //Floors seperated by 1000px each, 1000 beacause no one opens sites with a window height of 1000px....
  });
  $("#go_down").on("click", function(){
    floor--;
    elevator_move(floor, false);
    change_floor(floor);
    //Floors seperated by 2000px each, 2000 beacause no one opens sites with a window height of 2000px....
  });
  var topval = (window.innerHeight - 400)/2;
  $(".item").css("top",topval + "px")
  $(".elevatorSpaceAbs").css("top",topval + "px")
  $(".elevatorSpace").css("top",topval + "px")
  //When window is resized, reset top values for .items
  window.onresize = function(e){
    var topval = (window.innerHeight - 400)/2;
    //400 = height of floors
    $(".item").css("top",topval + "px")
    $(".elevatorSpaceAbs").css("top",topval + "px");
    $(".elevatorSpace").css("top",topval + "px")
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
    }
  }
  
  
});

var floor_num_display_timer;
var elevator_translate_timer;
  
//Display text for what floor user goes to and what floor they are on
//Also move elevator to give impression that it is moving
function elevator_move(current_floor, up){
  $("#floor_num_display").text("Going to floor " + current_floor);
  $("#floor_num_display").css("font-size","20px")
  clearTimeout(floor_num_display_timer);
  floor_num_display_timer = window.setTimeout(function(){
    $("#floor_num_display").text(current_floor);
    $("#floor_num_display").css("font-size","30px")
  },2000);
  var percent = "-30%";
  if (up == false){
    percent = "30%";
  }
  $(".elevatorSpaceAbs").css("transform","translate(0," + percent + ")");
  clearTimeout(elevator_translate_timer);
  elevator_translate_timer = window.setTimeout(function(){
    $(".elevatorSpaceAbs").css("transform","translate(0,0)");
  }, 1000);
}

function change_floor(new_floor){
  for (var i = bottom_floor; i<=num_of_floors; i ++){
    if (new_floor == i){
      $("#floor"+i).css("transform","translate(0,0)");
    }
    else {
      $("#floor"+i).css("transform","translate(0, " + (new_floor-i)*1000+"px)");
    }
  }
}