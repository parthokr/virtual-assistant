const mic = document.getElementById("mic");
mic.addEventListener("click", () => {
    console.log("Listening");
    const _mic = document.getElementById("_mic");
    if (_mic.classList.contains("fa-microphone"))
    {
      _mic.classList.remove("fa-microphone");
      _mic.classList.add("fa-stop");
      document.querySelector("textarea[name='command']").placeholder="Listening...";
    }else{
    _mic.classList.remove("fa-stop");
    _mic.classList.add("fa-microphone");  
          document.querySelector("textarea[name='command']").placeholder = "Type your command...";
    }
        var python = require("child_process").spawn(
          "./backend/venv/Scripts/python",
          ["./backend/process.py",]
        );
        python.stdout.on("data", function (data) {
          console.log("Python response: ", data.toString("utf8"));
        const _mic = document.getElementById("_mic");
        if (_mic.classList.contains("fa-microphone")) {
        _mic.classList.remove("fa-microphone");
        _mic.classList.add("fa-stop");
        document.querySelector("textarea[name='command']").placeholder = "Listening...";
        } else {
        _mic.classList.remove("fa-stop");
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