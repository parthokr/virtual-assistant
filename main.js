const { app, BrowserWindow, ipcMain, remote, dialog, shell } = require("electron");
const {loadUserData} = require("./utils/userData");
let mainWindow;
function createWindow() {
    const userData = loadUserData();
    console.log(userData);
    mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
  const pageToload = userData["loggedIn"] ? "app.html" : "index.html";
  mainWindow.loadFile(pageToload);
//   mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("asynchronous-message", (event, message) => {
    // const loginWindow = new BrowserWindow({
    // width: 800,
    // height: 400,
    // webPreferences: {
    //     nodeIntegration: true,
    // },
    // });
    // loginWindow.loadFile("login.html");
    if (message === "showSignupForm") {
      mainWindow.loadFile("index.html");
    } else if (message === "showLoginForm") {
      mainWindow.loadFile("login.html");
    } else if(message === "successfullySignedup") {
        const res = dialog.showMessageBox(null, {title: "Success", message: "You have been signed up!"});
    } else if(message === "successfullyLoggedin") {
        const res = dialog.showMessageBox(null, {title: "Success", message: "Logged in successfully"});
        mainWindow.loadFile("app.html");
    } else if(message === "wrongPassword") {
         const res = dialog.showMessageBox(null, {title: "Error", message: "Incorrect password"});
    } else if(message === "wrongUsername") {
        const res = dialog.showMessageBox(null, {title: "Error", message: "Incorrect username"});
    }
});