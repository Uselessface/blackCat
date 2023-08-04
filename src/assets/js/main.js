const Buttons = document.querySelectorAll('[data-product]')
const FormOverlay = document.querySelector('.form_container')
const Form = document.querySelector('.main_form')
const ProductInput = document.querySelector('.hidden-input')
const OpeningButtons = document.querySelectorAll('.get_price')


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

window.onload = function() {
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

}