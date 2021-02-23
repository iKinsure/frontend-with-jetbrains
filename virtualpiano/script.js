
document.addEventListener("keypress", function (event) {
    let key = event.key.toUpperCase();
    if ("AWSEDFTGYHUJ".includes(key)) {
        new Audio("audio/" + key + ".mp3")
            .play().then(() => console.log("The '" + key + "' key is pressed."));
    } else {
        console.warn("The '" + key + "' key is pressed");
    }
});
