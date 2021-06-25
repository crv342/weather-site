const form = document.querySelector('form')
const input = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

form.addEventListener('submit',(e) => {
    e.preventDefault()
    m1.textContent = 'Loading....'
    fetch('/weather?search=' + input.value).then(response => {
        response.json().then(data => {
            if(data.error){
                m1.textContent = data.error;
                m2.textContent = ''
            }
            else {
                m1.textContent = data.location
                m2.textContent = data.forecastData
                input.value = ''
            }
        })
    })
})