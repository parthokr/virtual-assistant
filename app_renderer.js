const toastr = require("toastr");
const mic = document.getElementById("mic");
const fadeIn = (element, duration = 600) => {
  element.style.display = '';
  element.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}
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
  // check if any typing animated reply found
  // cmd = makeLinkClickable(cmd);
  let all = document
    .getElementById("commands")
    .querySelectorAll(".msg_cotainer");
  let fetching = all[all.length-2];
  let typing = all[all.length - 1];
  if (typing && typing.classList.contains("c")) {
    fetching.parentNode.remove();
    typing.parentNode.remove();
  }
  let newCmd = document.createElement("div");
  newCmd.innerHTML = `
                    <div class="d-flex justify-content-start mb-4" style="display: none;" id="ass_reply">
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
  fadeIn(newCmd);
  commandsCard.scrollTop = commandsCard.scrollHeight;
}

const addTypingAnimation = () => {
    let newCmd = document.createElement("div");
    newCmd.innerHTML = `
                    <div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src="assets/img/bot.jpg"
                                class="rounded-circle user_img_msg">
                        </div>
                        <div class="msg_cotainer c" id="typing">
                              <span class="circle scaling"></span>
                              <span class="circle scaling"></span>
                              <span class="circle scaling"></span>
                        </div>
                    </div>`;
    let commandsCard = document.getElementById("commands");
    commandsCard.appendChild(newCmd);
    commandsCard.scrollTop = commandsCard.scrollHeight;
}
const runCallBack = (id) => {
  console.log(id);
  addTypingAnimation();
  fetch(`http://127.0.0.1:1234/callback?id=${id}`)
  .then(res => res.json())
  .then(res => {
      let reply = "";
      console.log(res);
      for (i in res.data)
      {
          reply += `<div><b>${i}</b>: ${res.data[i]} </div>`;
      }
      addAssistantReply(reply);
  });

  // let python = require("child_process").spawn("./backend/venv/Scripts/python", [
  //   "./backend/run_callback.py",
  //   id,
  // ]);
  // python.stdout.on("data", (data) => {
  //   console.log(data.toString());
  //   let res = JSON.parse(data.toString());
  //   let reply = "";
  //   console.log(res);
  //   for (i in res.data)
  //   {
  //       reply += `<div><b>${i}</b>: ${res.data[i]} </div>`;
  //   }
  //   addAssistantReply(reply);
  // });
};

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
      fetch("http://127.0.0.1:1234/listen")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if(res["assistant_reply"]!="not_found")
          {
            addNewCommand(res["text"]);
            addAssistantReply(res["assistant_reply"]);
            if(res["call_back"]>-1)
            {
              runCallBack(res["call_back"]);
            }
            _mic.classList.remove("fa-stop-circle");
            _mic.classList.add("fa-microphone");
            document.querySelector("input[name='command']").placeholder =
              "Type your command...";
          }else{
            _mic.classList.remove("fa-stop-circle");
            _mic.classList.add("fa-microphone");
            document.querySelector("input[name='command']").placeholder =
              "Type your command...";
            toastr.warning("Command not found");
          }
        });
      // var python = require("child_process").spawn(
      //   "./backend/venv/Scripts/python",
      //   ["./backend/run.py"]
      // );
      // python.stdout.on("data", function (data) {
      //   console.log("Python response: ", data.toString());
      //   let res = JSON.parse(data.toString());
      //   let doneAudio = new Audio("assets/audio/done.mp3");
      //   doneAudio.play();
      //   if (res["assistant_reply"] == "not_found") {
      //     toastr.warning("Command not found");
      //   }else{
      //     addNewCommand(res["text"]);
      //     addAssistantReply(res["assistant_reply"]);
      //     if(res["call_back"]>-1)
      //     {
      //       runCallBack(res["call_back"]);
      //     }
      //   }
      //   const _mic = document.getElementById("_mic");
      //   if (_mic.classList.contains("fa-stop-circle")) {
      //     _mic.classList.remove("fa-stop-circle");
      //     _mic.classList.add("fa-microphone");
      //     document.querySelector("input[name='command']").placeholder =
      //       "Type your command...";
      //   }
      // });
    }
    else{
      event.preventDefault();
    }
});
const textCommand = (cmd) => {
    console.log(cmd);
    let readable_cmd = cmd.join(" ");
    addNewCommand(readable_cmd);
    console.log(encodeURI(readable_cmd));
    fetch(`http://127.0.0.1:1234/execute?command=${encodeURI(readable_cmd)}`)
      .then((res) => res.json())
      .then((res) => {
          if (res["assistant_reply"] == "not_found") {
            toastr.warning("Command not found");
          } else {
            addAssistantReply(res["assistant_reply"]);
            if (res["call_back"] > -1) {
              console.log("callback found!");
              runCallBack(res["call_back"]);
            }
          }
      });
    // var python = require("child_process").spawn(
    //   "./backend/venv/Scripts/python",
    //   ["./backend/run.py",...cmd]
    // );
    // python.stdout.on("data", function (data) {
    //   console.log("Python response: ", data.toString());
    //   let res = JSON.parse(data.toString());
    //   let doneAudio = new Audio("assets/audio/done.mp3");
    //   doneAudio.play();
    //   if (res["assistant_reply"] == "not_found") {
    //     toastr.warning("Command not found");
    //   } else {
    //     addAssistantReply(res["assistant_reply"]);
    //     if (res["call_back"] > -1) {
    //       console.log("callback found!");
    //       runCallBack(res["call_back"]);
    //     }
    //   }
    // });
}
const command_input = document.querySelector('input[name="command"]');
command_input.addEventListener("keypress", (event) => {
  if(event.keyCode == 13)
  {
    textCommand(command_input.value.split(' '));
    command_input.value = "";
  }
});