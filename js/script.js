window.onload = function() {



//////////////////////////////////////////////////////////////////////бургер////////////////////////////////////////////////////////////////////
const header__burger = document.querySelector('.header__burger');
const menu__nav = document.querySelector('.menu__nav');
const menu__link = document.querySelectorAll('.menu__link');
header__burger.addEventListener('click', (event) => { 
  header__burger.classList.toggle('active');
  menu__nav.classList.toggle('active');
})
for (i = 0; i < menu__link.length; i++) {
  menu__link[i].addEventListener('click', (event) => { 
  header__burger.classList.toggle('active');
  menu__nav.classList.toggle('active');
})
}





//////////////////////////////////////////////////////////////////////плавный скрол////////////////////////////////////////////////////////////////////
document.querySelectorAll('._slow_scroll').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let arr= this.getAttribute('href').split('#');//достаем ссылку делим ее по #  
        let href = arr[arr.length - 1];//достаем последний элимент массива это и будет название нужного нам блока
        const scrollTarget = document.getElementById(href);
         const topOffset = document.querySelector('.menu').offsetHeight;
         console.log(topOffset)//тут мы узнаем какой высоты у нас меню и пропишем ее в падинге у первого блока
       // const topOffset = 0; // если не нужен отступ сверху 
        const elementPosition = scrollTarget.getBoundingClientRect().top;//возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});






////////////////////////////////////////////////////////////////////форма////////////////////////////////////////////////////////////////////
const form = document.getElementById('form');
const message = document.getElementById('message');
let formReq = document.querySelectorAll('._req');
form.addEventListener('submit', formSend); 



async function formSend(e){
	e.preventDefault();
    let error = formValidate(form);// проверяем своим валидатором
    if(error === 0){
    message.className = 'message';//оставляем только класс message(на случай если посетитель уже совершал ошибку то там будет еще и _error, нам такое не недо)
    message.classList.add('_success');
    message.innerHTML = 'mail sent';
    for(let index = 0; index < formReq.length; index++){//удоляем все плейсхолдеры если в них были сообщения об ошибках
        const input = formReq[index];
        input.placeholder = '';
    }
    }else{
	    message.classList.add('_false');
	    message.innerHTML = 'Fill in all the fields';
    }
}



function formValidate(form){
let error = 0;// обнуляем все ошибки

for(let index = 0; index < formReq.length; index++){
  const input = formReq[index];
  formRemoveError(input);

  if(input.classList.contains('_email')){

    if(input.value === ''){
      input.placeholder = 'This field is required';
       formAddError(input);
       error++;
    }
    if(input.value != '' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)){
      input.value = '';
       input.placeholder = 'enter correct e-mail';
      formAddError(input);
      error++;
    }
  } else if(input.classList.contains('_text')){
      if(input.value === ''){
        input.placeholder = 'это поле обязательно для заполнения';
         formAddError(input);
         error++;
      }
      if(input.value != '' && input.value.length < 2){
        input.value = '';
        input.placeholder = 'минимальное количество знаков больше 2';
         formAddError(input);
         error++;
      }
      if(input.value != '' && input.value.length > 5){
        input.value = '';
        input.placeholder = 'максимально количество знаков не больше 5';
         formAddError(input);
         error++;
      }
    }else if(input.getAttribute("type") ==="checkbox" && input.checked === false){
			formAddError(input);
			error++;
		}
}
return error;
}

      function formAddError(input){
        
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
      }

      function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
      }



////////////////////////////////////////////////////////////////////попап////////////////////////////////////////////////////////////////////


  const popup = document.querySelector('.popup')
      const modal_body = document.querySelector('.modal_body')
      const modal = document.querySelector('.modal')
      const cross = document.querySelector('.cross')

      popup.addEventListener('click', (event) => {
        modal.classList.toggle("active");
        modal_body.classList.toggle("active");
      })

      cross.addEventListener('click', (event) => {
        modal.classList.toggle("active");
        modal_body.classList.toggle("active");
      })




















}