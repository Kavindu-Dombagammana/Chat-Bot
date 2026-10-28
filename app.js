function sendRequestOnAction() {
    const message = document.getElementById("txtUserInput").value;
    const messageOutput = document.getElementById("txtChatOutput");
    const myHeaders = new Headers();

    document.getElementById("txtChatOutput").innerHTML = `<div>${message}</div><br>`;
    

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
        
        document.getElementById("txtChatOutput").innerHTML = `<div>${DOMPurify.sanitize(marked.parse(result.candidates[0].content.parts[0].text))}</div><br>`;

    })
    .catch((error) => console.error(error));


}