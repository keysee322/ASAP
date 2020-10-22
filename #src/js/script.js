
$(".drop-menu-icon").on("click", function(){
  document.getElementsByClassName('drop-menu-close')[0].style.display = "block";
  document.getElementsByClassName('drop-menu')[0].style.display = "block";
  setTimeout(() => {
    document.getElementsByClassName('drop-menu-close')[0].classList.add('opened');
    document.getElementsByClassName('drop-menu')[0].classList.add('opened');
    
  }, 50);
});

$(".drop-menu-close, .close").on("click", function(){
  document.getElementsByClassName('drop-menu-close')[0].classList.remove('opened');
  document.getElementsByClassName('drop-menu')[0].classList.remove('opened');
  setTimeout(() => {
    document.getElementsByClassName('drop-menu-close')[0].style.display = "none";
    document.getElementsByClassName('drop-menu')[0].style.display = "none";
  }, 300);
});

// Отключение скролла при модальном окне
document.addEventListener("DOMContentLoaded", function () {
  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  document.querySelector('[href="#openModal"]').addEventListener('click', function () {
    document.body.style.overflow = 'hidden';
    document.querySelector('#openModal').style.marginLeft = scrollbar;
  });
  document.querySelector('[href="#close"]').addEventListener('click', function () {
    document.body.style.overflow = 'visible';
    document.querySelector('#openModal').style.marginLeft = '0px';
  });
});

// Слайдер на первом экране
let clicked_point = 0;
let prev_point;
let interval_check = false;

    // Интервал для автоматического слайда
let timerId = setInterval(() => {
  if (clicked_point == 3){
    clicked_point = -1;
  }
  interval_check = true;
  $(document.getElementsByClassName('graph')[clicked_point + 1]).trigger('click');
  
}, 5000);

document.addEventListener("DOMContentLoaded", function Appear() {
  $(document.getElementsByClassName('active')[1]).animate({ opacity: '1' }, 200 );
});

    // Обработчик клика
$(".graph").on("click", function(){
  if (interval_check == false){
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (clicked_point == 3){
        clicked_point = -1;
      }
      interval_check = true;
      $(document.getElementsByClassName('graph')[clicked_point + 1]).trigger('click');
      
    }, 5000);
  }
  clicked_point = ($('.graph').index(this));
  prev_point = ($('.graph').index('.active'));
  $(document.getElementsByClassName('active')[1]).animate({ opacity: '0' }, 200 );
  document.getElementsByClassName('active')[0].disabled = false;
  document.getElementsByClassName('active')[0].classList.remove('active');
  document.getElementsByClassName('graph')[clicked_point].classList.add('active');
  
  setTimeout(ClassSwitch, 400);
  function ClassSwitch(){
    document.getElementsByClassName('active')[1].classList.remove('active');
    document.getElementsByClassName('graph-info')[clicked_point].classList.add('active');
    document.getElementsByClassName('active')[0].disabled = true;
    $(document.getElementsByClassName('active')[1]).animate({ opacity: '1' }, 200 );
  }
  interval_check = false;
});


// Слайдер на втором экране
let current = 0;
let buttons = $('.buttons').find('button');
let number = 0;
let difference = '100%';

$('.right').on("click",function(){
  
  $('.slider-hack').animate({ left: '-=' + difference }, 200 );
  document.getElementsByClassName('pictures')[current].classList.remove('active');
  buttons[current].classList.remove('active');
  ++current;
  document.getElementsByClassName('pictures')[current].classList.add('active');
  buttons[current].classList.add('active');
  if (current==4)
    document.getElementsByClassName('right')[0].disabled = true;;
  if (document.getElementsByClassName('left')[0].disabled == true)
  document.getElementsByClassName('left')[0].disabled = false;;
  difference = '100%';
  number = current;
});

$('.left').on("click",function(){
  $('.slider-hack').animate({ left: '+='+ difference }, 200 );
  document.getElementsByClassName('pictures')[current].classList.remove('active');
  buttons[current].classList.remove('active');
  current--;
  document.getElementsByClassName('pictures')[current].classList.add('active');
  buttons[current].classList.add('active');
  if (current === 0)
    document.getElementsByClassName('left')[0].disabled = true;
  if (document.getElementsByClassName('right')[0].disabled = false)
  document.getElementsByClassName('right')[0].disabled = false;
  difference = '100%';
  number = current;
});

$(".buttons").find('button').on("click", function(){
  buttons[number].classList.remove('active');
  buttons[number].disabled = false;
  current = $(this).attr("id");
  this.classList.add('active');
  $(this).disabled = true;
  difference = current - number;
  
  if (difference > 0){
    --current;
    difference = difference * 100 + '%';
    $('.right').trigger('click');
  } else {
    ++current;
    difference = Math.abs(difference) * 100 + '%';
    $('.left').trigger('click');
  }
  number = current;

});