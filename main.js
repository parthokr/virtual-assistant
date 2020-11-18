const { app, BrowserWindow, ipcMain, remote } = require("electron");
const {loadUserData} = require("./utils/userData");
let mainWindow;
function createWindow() {
    const userData = loadUserData();
    console.log(userData);
    mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
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
    }
});