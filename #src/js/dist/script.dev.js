"use strict";

var direction = true;
var trigger = 1;
var trigger_name;
var trigger_action;
var prev_trigger_name;
var prev_trigger = 1;
var prev_prev_trigger = 1;
var a = 0;
var timer = 7000;

function FirstButton() {
  prev_prev_trigger = prev_trigger;
  prev_trigger = trigger;
  Translate();
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(prev_trigger + "-round")[0].style.border = 10 + -progress * 10 + "px" + " solid #FAB807";
    }
  });
  document.getElementsByClassName(trigger_name)[0].setAttribute("onclick", trigger_action);
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseleave", "OutHover(" + trigger + ")");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseenter", "Hover(" + trigger + ")");
  trigger = 1;
  if (prev_prev_trigger != prev_trigger && prev_prev_trigger != trigger && prev_trigger != trigger) document.getElementsByClassName("wallpaper-" + (10 - (prev_trigger + prev_prev_trigger + trigger)))[0].style.zIndex = -1;
  document.getElementsByClassName("wallpaper-" + prev_prev_trigger)[0].style.zIndex = 0;
  document.getElementsByClassName("wallpaper-" + prev_trigger)[0].style.zIndex = 1;
  document.getElementsByClassName("wallpaper-1")[0].style.zIndex = 2;
  Prev(trigger);
  Translate();
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseleave", "");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseenter", "");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onclick", "");
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(trigger + "-round")[0].style.border = a + progress * (10 - a) + "px" + " solid #FAB807";
    }
  });
}

function OtherButton(number) {
  prev_prev_trigger = prev_trigger;
  prev_trigger = trigger;
  Translate();

  if (prev_prev_trigger != prev_trigger && prev_prev_trigger != number && prev_trigger != number) {
    document.getElementsByClassName("wallpaper-" + (10 - (prev_trigger + prev_prev_trigger + number)))[0].style.zIndex = -1;
  }

  document.getElementsByClassName("wallpaper-" + prev_prev_trigger)[0].style.zIndex = 0;
  document.getElementsByClassName("wallpaper-" + prev_trigger)[0].style.zIndex = 1;
  document.getElementsByClassName("wallpaper-" + number)[0].style.zIndex = 2;
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(prev_trigger + "-round")[0].style.border = 10 + -progress * 10 + "px" + " solid #FAB807";
    }
  });
  document.getElementsByClassName(trigger_name)[0].setAttribute("onclick", trigger_action);
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseleave", "OutHover(" + trigger + ")");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseenter", "Hover(" + trigger + ")");

  if (trigger < number) {
    trigger = number;
    Next(trigger);
  } else {
    trigger = number;
    Prev(trigger);
  }

  Translate();
  document.getElementsByClassName(trigger_name)[0].setAttribute("onclick", "");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseleave", "");
  document.getElementsByClassName(trigger_name)[0].setAttribute("onmouseenter", "");
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(trigger + "-round")[0].style.border = a + progress * (10 - a) + "px" + " solid #FAB807";
    }
  });
}

function Next(number) {
  clearTimeout(timerId);
  timerId = setInterval(function () {
    Hover(trigger);

    if (trigger != 4) {
      OtherButton(trigger + 1);
    } else {
      FirstButton();
    }
  }, timer);
  animate({
    duration: 2000,
    timing: quadEaseOut,
    draw: function draw(progress) {
      document.getElementsByClassName("wallpaper-" + number)[0].style.left = document.documentElement.clientWidth + -progress * document.documentElement.clientWidth + "px";
    }
  });
  setTimeout(Change, 2000);
}

function Prev(number) {
  clearTimeout(timerId);
  timerId = setInterval(function () {
    Hover(trigger);

    if (trigger != 4) {
      OtherButton(trigger + 1);
    } else {
      FirstButton();
    }
  }, timer);
  animate({
    duration: 2000,
    timing: quadEaseOut,
    draw: function draw(progress) {
      document.getElementsByClassName("wallpaper-" + number)[0].style.left = -document.documentElement.clientWidth + progress * document.documentElement.clientWidth + "px";
    }
  });
  setTimeout(Change, 2000);
}

function Change() {
  if ($('.next_slide').length > 1) {
    var itemForDelete = document.getElementsByClassName('next_slide')[0];
    itemForDelete.parentNode.removeChild(itemForDelete);
  } else if ($('.prev_slide').length > 1) {
    var _itemForDelete = document.getElementsByClassName('prev_slide')[0];

    _itemForDelete.parentNode.removeChild(_itemForDelete);
  }
}

function Translate() {
  if (trigger == 1) {
    trigger_name = "first-slide";
    trigger_action = "FirstButton()";
  } else if (trigger == 2) {
    trigger_name = "second-slide";
    trigger_action = "OtherButton(2)";
  } else if (trigger == 3) {
    trigger_name = "third-slide";
    trigger_action = "OtherButton(3)";
  } else if (trigger == 4) {
    trigger_name = "fourth-slide";
    trigger_action = "OtherButton(4)";
  }

  if (prev_trigger == 1) {
    prev_trigger_name = "first-slide";
  } else if (prev_trigger == 2) {
    prev_trigger_name = "second-slide";
  } else if (prev_trigger == 3) {
    prev_trigger_name = "third-slide";
  } else if (prev_trigger == 4) {
    prev_trigger_name = "fourth-slide";
  }
}

function Hover(number) {
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(number + "-round")[0].style.border = a + progress * (10 - a) + "px" + " solid #FAB807";
      a = progress * 10;
    }
  });
}

function OutHover(number) {
  animate({
    duration: 200,
    timing: linear,
    draw: function draw(progress) {
      document.getElementsByClassName(number + "-round")[0].style.border = a + -progress * a + "px" + " solid #FAB807";
      a = 10 - progress * 10;
    }
  });
}

var timerId = setInterval(function () {
  Hover(trigger);

  if (trigger != 4) {
    OtherButton(trigger + 1);
  } else {
    FirstButton();
  }
}, timer);