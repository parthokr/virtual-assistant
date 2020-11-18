const mic = document.getElementById("mic");
const addNewCommand = (cmd) => {
    let newCmd = document.createElement("div");
    newCmd.innerHTML = `\
                <div class="d-flex justify-content-end mb-4">\
                            <div class="msg_cotainer_send">\
                                ${cmd}\
                                <span class="msg_time_send">8:55 AM, Today</span>\
                            </div>\
                            <div class="img_cont_msg">\
                                <img src="assets/img/user.svg" class="rounded-circle user_img_msg">\
                            </div>\
                </div>`;
    let commandsCard = document.getElementById("commands");
    commandsCard.appendChild(newCmd);
    commandsCard.scrollTop =  commandsCard.scrollHeight;
}
const addAssistantReply = (cmd) => {
    let newCmd = document.createElement("div");
    newCmd.innerHTML = `
                    <div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src="assets/img/bot.jpg"
                                class="rounded-circle user_img_msg">
                        </div>
                        <div class="msg_cotainer">
                            ${cmd}
                            <span class="msg_time">8:40 AM, Today</span>
                        </div>
                    </div>`;
    let commandsCard = document.getElementById("commands");
    commandsCard.appendChild(newCmd);
    commandsCard.scrollTop =  commandsCard.scrollHeight;
}
mic.addEventListener("click", () => {
    console.log("Listening");
    let listeningAudio = new Audio("assets/audio/listening.mp3");
    listeningAudio.play();
    const _mic = document.getElementById("_mic");
    if (_mic.classList.contains("fa-microphone"))
    {
      _mic.classList.remove("fa-microphone");
      _mic.classList.add("fa-stop-circle");
      document.querySelector("textarea[name='command']").placeholder="Listening...";
    }else{
    _mic.classList.remove("fa-stop-circle");
    _mic.classList.add("fa-microphone");  
          document.querySelector("textarea[name='command']").placeholder = "Type your command...";
    }
        var python = require("child_process").spawn(
          "./backend/venv/Scripts/python",
          ["./backend/process.py",]
        );
        python.stdout.on("data", function (data) {
          console.log("Python response: ", data.toString());
          let res = JSON.parse(data.toString());
            let doneAudio = new Audio("assets/audio/done.mp3");
            doneAudio.play();
          addNewCommand(res["text"]);
          addAssistantReply(res["assistant_reply"]);
        const _mic = document.getElementById("_mic");
        if (_mic.classList.contains("fa-microphone")) {
        _mic.classList.remove("fa-microphone");
        _mic.classList.add("fa-stop-circle");
        document.querySelector("textarea[name='command']").placeholder = "Listening...";
        } else {
        _mic.classList.remove("fa-stop-circle");
        _mic.classList.add("fa-microphone");
        document.querySelector("textarea[name='command']").placeholder = "Type your command...";
        }
        //   const response = JSON.parse(data.toString());
        //   console.log(response);
        //   if (response["signed_up"]) {
        //     ipcRenderer.send("asynchronous-message", "successfullySignedup");
        //   }
          // result.textContent = data.toString("utf8");
        });
});