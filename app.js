function sendRequestOnAction() {
    const message = document.getElementById("txtUserInput").value;
    const messageOutput = document.getElementById("txtChatOutput");
    const myHeaders = new Headers();
    const li = document.createElement('li');

    const txt = document.createElement('txt');
    txt.textContent = message;
    messageOutput.appendChild(txt);
    

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-goog-api-key", "AQ.Ab8RN6KFt2Q5oQwtbho-cZp5Teu3hrPIyVkYklsdX1-Q4YJ5AA");

    const raw = JSON.stringify({
    "contents": [
        {
        "parts": [
            {
            "text": `"${message}"`
            }
        ]
        }
    ]
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        
        li.textContent = result.candidates[0].content.parts[0].text;
        
        
        //Must convert a markdown into html before continuing the message
        messageOutput.appendChild(li);

    })
    .catch((error) => console.error(error));


}