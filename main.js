const { app, BrowserWindow } = require("electron");

let window;

const createWindow = () => {
    window = new BrowserWindow({ width: 800, height: 600 });
    window.loadFile("./public/index.html");

    window.webContents.openDevTools();

    window.on("closed", () => {
        window = null;
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// macOS behaviour
app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});
