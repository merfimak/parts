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

//////////////////////////////////////////////////////////////////////Анимация при прокрутке////////////////////////////////////////////////////////////////////
const animItems = document.querySelectorAll('._anim_items');

if(animItems.length > 0){//проверяем есть ли они такие items и только тогад выполняем эту функцию
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for(let index = 0; index < animItems.length; index++){
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;// высота элемента с учётом вертикальных полей и границ в пикселях.
			const animItemOffset = offset(animItem).top;//позицию элемента относительно верха
			const animStart = 4;//коофициэнт начала анимации

			//момент когда нашему обьекту бедет даваться класс _active
			let animItemPoint = window.innerHeight - animItemHeight / animStart;//когда мы проскролим 1/4 часть нужного itema
			if(animItemHeight > window.innerHeight){//если анимурованый обьект выше окна браузера
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			}else{
				if(!animItem.classList.contains('_anim_no_hide')){//если добавить элементу _anim_no_hide то повторной анимации не будет
					animItem.classList.remove('_active');
				}
				
			}

		}
	}
	//функция offset спизжена из интернета она возвращает позицию элемента относительно верха или лева, например offset(el).top;
	function offset(el){
		const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	setTimeout(() =>{
		animOnScroll()//вызываем эту функцию и при скроле и изначально потому что нужный блок может быть уже должен быть отображонным на экране
	}, 300);
}




//////////////////////////////////////////////////////////////////////tabs////////////////////////////////////////////////////////////////////


  const tabs_button = document.querySelectorAll('.tabs_button');//достаем все кнопки для табов и на каждый цепляем событие клик

  for (i = 0; i < tabs_button.length; i++) {

    tabs_button[i].addEventListener('click', (event) => { 

      tabs_button_active = document.querySelectorAll('.tabs_button.active');// при клике выбераем все элементы с класом active и убираем его
      tabs_item_active = document.querySelectorAll('.tabs_item.active');// у блоков тоже убираем active
      targen_tabs_item = event.currentTarget.getAttribute("data-tab");//берем атрибут из выбранного айтема
      targen_tabs_item = document.querySelector('#' + targen_tabs_item);// достаем нужный таб по Id
        tabs_button_active.forEach(element => {
          element.classList.remove("active");
        });
         tabs_item_active.forEach(element => {
          element.classList.remove("active");// убераем active у всех блоков кроме выбранного
        });
        event.currentTarget.classList.add("active");// добавляем к active к тому на который клацнули
        targen_tabs_item.classList.add("active");//добавляем к active к нужному  блоку 
    })
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






////////////////////////////////////////////////////////////////////accordion////////////////////////////////////////////////////////////////////


    let acc = document.getElementsByClassName("accordion");

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
       
        this.classList.toggle("active");//добовляем выбранной кнопке background-color: #ccc;

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;//nextElementSibling возвращает элемент следующий сразу за указанным в списке дочерних элементов родительского элемента
         if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";//Свойство scrollHeight содержит высоту элемента с учетом вертикальной прокрутки. Если у элемента нет вертикальной полосы прокрутки, то значение scrollHeight равно clientHeight. Свойство clientHeight содержит высоту элемента внутри границ вместе с padding
        }
      });
    }


////////////////////////////////////////////////////////////////////swiper////////////////////////////////////////////////////////////////////




 let swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
      });







}