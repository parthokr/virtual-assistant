const { loadUserData, updateUserData } = require("./utils/userData");
const toastr = require("toastr");
const validator = require("validator");
const { ipcRenderer, remote } = require("electron");
document.getElementById("showSignup").addEventListener("click", () => {
  ipcRenderer.send("asynchronous-message", "showSignupForm");
});
const login = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("pwd").value;
    if (username.length == 0) {
      toastr.error("Please provide username", "Username required");
      return;
    }
    if (password.length == 0) {
      toastr.error("Please provide password", "Password required");
      return;
    }
    var python = require("child_process").spawn(
      "./backend/venv/Scripts/python",
      ["./backend/login.py", username, password]
    );
    python.stdout.on("data", function (data) {
    //   console.log("Python response: ", data.toString("utf8"));
        const response = JSON.parse(data.toString());
        console.log(response);
        if(response["logged_in"])
        {
            ipcRenderer.send("asynchronous-message", "successfullyLoggedin");
            updateUserData("loggedIn", true);
        }
        if(response["error"]==="auth_error")
        {
            ipcRenderer.send("asynchronous-message", "wrongPassword");
        }
        if (response["error"] === "username_not_found") {
          ipcRenderer.send("asynchronous-message", "wrongUsername");
        }
      // result.textContent = data.toString("utf8");
    });

    python.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
}
