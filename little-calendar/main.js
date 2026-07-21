const { app, BrowserWindow } = require("electron");

function createWindow() {

    const win = new BrowserWindow({
        width: 500,
        height: 650,

        resizable: false,

        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});