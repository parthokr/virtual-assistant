const {loadUserData, updateUserData} = require("./utils/userData");
const toastr = require('toastr');
const validator = require('validator');
const {ipcRenderer, remote} = require("electron");
const signup = () => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    if(email.length==0)
    {
        toastr.error("Please provide email", "Email required");
        return;
    }
    if (username.length == 0) {
      toastr.error("Please provide username", "Username required");
      return;
    }
    if (password.length == 0) {
        toastr.error("Please provide password", "Password required");
        return;
    }
    if(!validator.isEmail(email))
    {
        toastr.warning("Please provide valid email", "Invalid email");
        return;
    }
    updateUserData("loggedIn", true);
    // console.log(username);
    // console.log(email);
    // console.log(password);
    var python = require("child_process").spawn("./backend/venv/Scripts/python",
      ["./backend/test.py", username, email, password]
    );
    python.stdout.on("data", function (data) {
        console.log("Python response: ", data.toString("utf8"));
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
document.getElementById("showLogin").addEventListener("click", () => {
    // console.log("Working!");
    ipcRenderer.send("asynchronous-message", "showLoginForm");
});
// const showLoginForm = () => {
//     ipcRenderer.send("asynchronous-message", "showLogin");
// }
// const showSignup = () => {
//   ipcRenderer.send("asynchronous-message", "showSignup");
// };