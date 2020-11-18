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
      console.log(JSON.parse(data.toString()));
      // result.textContent = data.toString("utf8");
    });

    python.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
}
