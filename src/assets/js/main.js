const Buttons = document.querySelectorAll('[data-product]')
const FormOverlay = document.querySelector('.form_container')
const Form = document.querySelector('.main_form');
const OpeningButtons = document.querySelectorAll('.get_price');
const form = document.querySelector('.main_form');
const user_name = document.querySelector('#user_name');
const user_city = document.querySelector('#user_city');
const user_checked = document.querySelector('#check');
const bot_check = document.querySelector('#bot_check');
const user_phone = document.querySelector('#user_phone');
const ProductInput = document.querySelector('.hidden-input');
const productInfoList = document.querySelectorAll('.product__info_text');

window.onload = function() {

    OpeningButtons.forEach((el) => {
        el.addEventListener('click', () =>{
            FormOverlay.classList.add('form-open')
        })
    })

    Buttons.forEach(el => {
        el.addEventListener('click', () => {
            ProductInput.value = el.getAttribute('data-product');
        })
    })
    FormOverlay.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(Form)
        if (!withinBoundaries) {
            FormOverlay.classList.remove('form-open')
        }
    })


    // Parse the URL
    function getParameterByName(n) {
        let name = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        let results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    // Give the URL parameters variable names
    const source = getParameterByName('utm_source');
    const medium = getParameterByName('utm_medium');
    const campaign = getParameterByName('utm_campaign');
    const term = getParameterByName('utm_term');

    // Put the variable names into the hidden fields in the form.
    document.querySelector('input[name="utm_source"]').value = source;
    document.querySelector('input[name="utm_medium"]').value = medium;
    document.querySelector('input[name="utm_campaign"]').value = campaign;
    document.querySelector('input[name="utm_term"]').value = term;

    form.addEventListener('submit', (e) => {
        // Отменяем действие по умолчанию
        e.preventDefault();

        // Получаем значения полей формы
        const user_val = user_name.value;
        const city_val = user_city.value;
        const phone_val = user_phone.value;
        const user_checked_val = user_checked.checked;
        const bot_checked_val = bot_check.checked;

        // Проверяем, что поля заполнены
        if (!user_val || !city_val || !phone_val || !user_checked_val) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Проверяем, что имя пользователя содержит только буквы и цифры
        if ((!isValidValue(user_val)) || (!isValidValue(city_val))) {
            alert('Поле может содержать только буквы русского алфавита и только два слова');
            return;
        }
        // Проверяем на заполнение ботом
        if(bot_checked_val){
            alert("bot")
            return
        }

        // Если всё в порядке, отправляем форму
        form.submit();
    });

    function isValidValue(value) {
        // Проверка имени регулярным выражением
        const pattern = /^[A-ЯЁа-яё]+\s?[A-ЯЁа-яё]+$/g;
        return pattern.test(value);
    }


    $('.product__info_text').elimore({
        maxLength: 395,
        moreText: "Показать полностью...",
        lessText: "Скрыть"
    });
}

