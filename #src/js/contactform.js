jQuery(document).ready(function($) {

	$(".ajax-contact-form").submit(function() {
	var str = $(this).serialize();
	
	$.ajax({
	type: "POST",
	url: "php/mail.php",
	data: str,
	success: function(msg) {
if(msg == 'OK') {
result = '<p>Ваш заказ принят</p>';
SubmitForm();
} else {
alert("Ошибка! Попробуйте позже.")
}
}
});
return false;
});

});

function SubmitForm(){
	x2 = document.createElement('div');
	x2.setAttribute('class', 'success')
	document.getElementsByClassName("first")[0].appendChild(x2);

	x = document.createElement('button');
	x.setAttribute('class', 'success_back')
	x.setAttribute('onclick', 'CloseSubmitForm()')
	document.getElementsByClassName("success")[0].appendChild(x);
	     animate({
        duration: 1500,
        timing: quadEaseOut,
        draw: function(progress) {
          x2.style.opacity = progress;
        }
      });

	x1 = document.createElement('div');
	x1.setAttribute('class', 'success_block')
	document.getElementsByClassName("success_back")[0].appendChild(x1);

	x3 = document.createElement('img');
	x3.setAttribute('class', 'success_img_done');
	x3.setAttribute('src', 'img/Done.png');
	document.getElementsByClassName("success_block")[0].appendChild(x3);

	x4 = document.createElement('h2');
	x4.setAttribute('class', 'success_header')
	var y4 = document.createTextNode("Заказ оформлен");
        x4.appendChild(y4);
	document.getElementsByClassName("success_block")[0].appendChild(x4);

	x5 = document.createElement('p');
	x5.setAttribute('class', 'success_text')
	var y5 = document.createTextNode("В ближайшее время с Вами свяжутся, ожидайте звонка.");
        x5.appendChild(y5);
	document.getElementsByClassName("success_block")[0].appendChild(x5);


}

	function CloseSubmitForm(){
			     animate({
        duration: 1500,
        timing: quadEaseOut,
        draw: function(progress) {
          x2.style.opacity = 1 + -progress;
        }
      });

		setTimeout(DelSubmit ,1200);

		function DelSubmit(){
			x2.parentNode.removeChild(x2);
		}
	}