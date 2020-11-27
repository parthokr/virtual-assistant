const { loadUserData, updateUserData } = require("./utils/userData");
const swal = require('sweetalert'); 
const toastr = require("toastr");
const validator = require("validator");
const { ipcRenderer, remote } = require("electron");
document.getElementById("showSignup").addEventListener("click", () => {
  ipcRenderer.send("asynchronous-message", "showSignupForm");
});
const promptConfirmationCode = (id) => {
  swal("Confirm your account", "You may forget to enter confirmation code", "warning", {
    content: "input",
  }).then((value) => {
    // swal(`You typed: ${value}`);
    fetch("http://127.0.0.1:3000/verify", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ id: id, code: value }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((res) => {
        if (res["matched"] === true) {
          swal(
            "Congratulations",
            "Your account has been activated. You are logged in.",
            "success"
          );
          ipcRenderer.send("asynchronous-message", "successfullyLoggedin");
          updateUserData("loggedIn", true);
          updateUserData("id", id);
          return true;
        } else {
          swal("Wrong code", "Please recheck your code", "warning").then(() => {
            promptConfirmationCode(id);
          });
        }
      });
  });
};
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
    let loginPostData = {username, password};
    fetch('http://127.0.0.1:3000/login', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(loginPostData), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res["logged_in"])
        {
          if(res["activated"])
          {
              ipcRenderer.send("asynchronous-message", "successfullyLoggedin");
              updateUserData("loggedIn", true);
              updateUserData("id", res["id"]);
          }else{
            promptConfirmationCode(res["id"]);
          }
        }
        else if (res["error"] === "auth_error") {
          ipcRenderer.send("asynchronous-message", "wrongPassword");
        }
        else if (res["error"] === "username_not_found") {
          ipcRenderer.send("asynchronous-message", "wrongUsername");
        }
    })
    ;
    // var python = require("child_process").spawn(
    //   "./backend/venv/Scripts/python",
    //   ["./backend/login.py", username, password]
    // );
    // python.stdout.on("data", function (data) {
    // //   console.log("Python response: ", data.toString("utf8"));
    //     const response = JSON.parse(data.toString());
    //     console.log(response);
    //     if(response["logged_in"])
    //     {
    //         ipcRenderer.send("asynchronous-message", "successfullyLoggedin");
    //         updateUserData("loggedIn", true);
    //     }
    //     if(response["error"]==="auth_error")
    //     {
    //         ipcRenderer.send("asynchronous-message", "wrongPassword");
    //     }
    //     if (response["error"] === "username_not_found") {
    //       ipcRenderer.send("asynchronous-message", "wrongUsername");
    //     }
    //   // result.textContent = data.toString("utf8");
    // });

    // python.stderr.on("data", (data) => {
    //   console.error(`stderr: ${data}`);
    // });

    // python.on("close", (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });
}
