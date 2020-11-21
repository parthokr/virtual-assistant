const toastr = require("toastr");
const mic = document.getElementById("mic");
const addNewCommand = (cmd) => {
    let newCmd = document.createElement("div");
    newCmd.innerHTML = `\
                <div class="d-flex justify-content-end mb-4">\
                            <div class="msg_cotainer_send">\
                                ${cmd}\
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
                        </div>
                    </div>`;
    let commandsCard = document.getElementById("commands");
    commandsCard.appendChild(newCmd);
    commandsCard.scrollTop =  commandsCard.scrollHeight;
}
mic.addEventListener("click", (event) => {
    console.log("Listening");
    let listeningAudio = new Audio("assets/audio/listening.mp3");
    listeningAudio.play();
    const _mic = document.getElementById("_mic");
    if (_mic.classList.contains("fa-microphone"))
    {
      _mic.classList.remove("fa-microphone");
      _mic.classList.add("fa-stop-circle");
      document.querySelector("input[name='command']").placeholder="Listening...";
      var python = require("child_process").spawn("./backend/venv/Scripts/python", [
        "./backend/run.py",
      ]);
      python.stdout.on("data", function (data) {
        console.log("Python response: ", data.toString());
        let res = JSON.parse(data.toString());
        let doneAudio = new Audio("assets/audio/done.mp3");
        doneAudio.play();
        if (res["assistant_reply"] == "not_found") {
          toastr.warning("Command not found");
        }else{
          addNewCommand(res["text"]);
          addAssistantReply(res["assistant_reply"]);
        }
        const _mic = document.getElementById("_mic");
        if (_mic.classList.contains("fa-stop-circle")) {
          _mic.classList.remove("fa-stop-circle");
          _mic.classList.add("fa-microphone");
          document.querySelector("input[name='command']").placeholder =
            "Type your command...";
        }
      });
    }
    else{
      event.preventDefault();
    }
});
const textCommand = (cmd) => {
  console.log(cmd)
    addNewCommand(cmd.join(" "));
    var python = require("child_process").spawn(
      "./backend/venv/Scripts/python",
      ["./backend/run.py",...cmd]
    );
    python.stdout.on("data", function (data) {
      console.log("Python response: ", data.toString());
      let res = JSON.parse(data.toString());
      let doneAudio = new Audio("assets/audio/done.mp3");
      doneAudio.play();
      if (res["assistant_reply"] == "not_found") {
        toastr.warning("Command not found");
      } else {
        addAssistantReply(res["assistant_reply"]);
      }
    });
}
const command_input = document.querySelector('input[name="command"]');
command_input.addEventListener("keypress", (event) => {
  if(event.keyCode == 13)
  {
    textCommand(command_input.value.split(' '));
    command_input.value = "";
  }
});