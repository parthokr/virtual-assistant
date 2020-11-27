const {loadUserData, updateUserData} = require("./utils/userData");
const toastr = require('toastr');
const swal = require('sweetalert');
const validator = require('validator');
const {ipcRenderer, remote} = require("electron");
const promptConfirmationCode = (id) => {
    swal("Confirmation code", {
        content: "input",
    })
    .then((value) => {
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
        body: JSON.stringify({"id":id, "code": value}), // body data type must match "Content-Type" header
        })
        .then(res => res.json())
        .then(res => {
            if (res["matched"] === true) {
              swal("Congratulations", "You have successfully created your account", "success").then(()=>{
                ipcRenderer.send(
                  "asynchronous-message",
                  "successfullyLoggedin"
                );
                updateUserData("loggedIn", true);
                updateUserData("id", res["id"]);
                return true;
              });
            } else {
              swal("Wrong code", "Please recheck your code", "warning").then(
                () => {
                  promptConfirmationCode(id);
                }
              );
            }
        })
    });
}
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
    // updateUserData("loggedIn", true);
    // console.log(username);
    // console.log(email);
    // console.log(password);
    let signupPostData = {
        username, 
        email, 
        password
    };
    fetch("http://127.0.0.1:3000/signup", {
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
      body: JSON.stringify(signupPostData), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(res => {
        if(res["signed_up"])
        {
            promptConfirmationCode(res["id"]);
        }else{
          toastr.error("User already existed");
        }
    })
    ;
    // var python = require("child_process").spawn("./backend/venv/Scripts/python",
    //   ["./backend/test.py", username, email, password]
    // );
    // python.stdout.on("data", function (data) {
    //     console.log("Python response: ", data.toString("utf8"));
    //     const response = JSON.parse(data.toString());
    //     console.log(response);
    //     if(response["signed_up"])
    //     {
    //         ipcRenderer.send("asynchronous-message", "successfullySignedup");
    //     }
    //     // result.textContent = data.toString("utf8");
    // });

    // python.stderr.on("data", (data) => {
    //     console.error(`stderr: ${data}`);
    // });

    // python.on("close", (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });
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