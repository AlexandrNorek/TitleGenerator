const textLog = document.getElementById('text-log');
const imageContainer = document.getElementById('image-container');
const message = document.getElementById('keywords-input');
const form = document.querySelector('form');

const imgCheckbox = document.getElementById('img-checkbox');

form.addEventListener('submit', (e) => { 
e.preventDefault();
const messageText = message.value;
message.value = '';
const textInput = document.createElement('div');
textLog.innerHTML = `<div id="textInput">${messageText}</div><div class="loader"></div>`;
textLog.appendChild(textInput);
textLog.scrollTop = textLog.scrollHeight;   

fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    message: messageText
    })
})
.then(res => res.json())
.then(response_data => {
    const textResponse = document.createElement('div');
    textLog.innerHTML = `<div id="textResponse">${response_data.completion.content}</div>`;
    textLog.appendChild(textResponse);
    textLog.scrollTop = textLog.scrollHeight;

    if (imgCheckbox.checked == true)
    {
    const imageElement = document.createElement('img');
    imageElement.classList.add('generated-image');
    imageElement.setAttribute('src', response_data.image.data[0].url);
    imageContainer.appendChild(imageElement);
    }
})
})
