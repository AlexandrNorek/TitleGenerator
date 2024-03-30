const textContainer = document.getElementById("textContainer");
const imageContainer = document.getElementById("imageContainer");
const imageCheckbox = document.getElementById("imageCheckbox");
const message = document.getElementById("keywordsInput");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => { 

    e.preventDefault();

    const messageText = message.value;
    message.value = '';
    const textInput = document.createElement("div");
    textContainer.innerHTML = `<div id="textInput">${messageText}</div><div class="loader"></div>`;
    textContainer.appendChild(textInput);
    textContainer.scrollTop = textContainer.scrollHeight;

    imageContainer.innerHTML = "";

    fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        message: messageText
        })
    })
    .then(res => res.json())
    .then(response_data => {

        const textResponse = document.createElement("div");
        textContainer.innerHTML = `<div id="textResponse" class="textContainer">${response_data.completion.message.content}</div>`;
        textContainer.appendChild(textResponse);
        textContainer.scrollTop = textContainer.scrollHeight;

        if (imageCheckbox.checked)
        {
            const imageElement = document.createElement("img");
            imageElement.classList.add("generated-image");
            imageElement.setAttribute("src", response_data.image.url);
            imageContainer.appendChild(imageElement);
        }

    })
})
