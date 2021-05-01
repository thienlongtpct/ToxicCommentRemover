console.log("App start");

const startApp = () => {
    const sendToxicCheck = () => {
        console.log("Send texts");

        let tagsWithUncheckedText = Array.from(document.querySelectorAll("ytd-comment-renderer:not(.checked)"));
        let texts = tagsWithUncheckedText.map(e => e.querySelector("#content-text").innerHTML);

        fetch("http://localhost:5000/api/checked_toxic", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(texts)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server is not connected");
                }
            })
            .then(result => {
                console.log(result);
                tagsWithUncheckedText.forEach((tag, index) => {
                    if (result.response[index] > 0.5) {
                        tag.style.opacity = 0.3;
                        if (result.response[index] > 0.75) {
                            const originalText =  tag.querySelector("#content-text").innerHTML.toString();
                            const open = document.createElement("span");
                            open.href = "#";
                            open.innerText = "здесь";
                            open.style.textDecoration = "underline";
                            open.style.color = "#4d87c7";
                            open.onclick = () => tag.querySelector("#content-text").innerHTML = originalText;
                            tag.querySelector("#content-text").innerHTML = '';
                            tag.querySelector("#content-text")
                                .appendChild(document.createTextNode("Комментарий скрыт по причине большого токсичности, нажмите "));
                            tag.querySelector("#content-text").appendChild(open);
                            tag.querySelector("#content-text")
                                .appendChild(document.createTextNode(" для его просмотра"));
                        }
                    }
                    tag.classList.add("checked");
                })
            })
            .catch(error => {
                console.log('Error message: ' + error.message);
            });
    }

    const runApp = setInterval(() => sendToxicCheck(), 1000);
}

startApp();