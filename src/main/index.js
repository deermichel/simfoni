const { app, BrowserWindow } = require("electron");

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow;

const createMainWindow = () => {
    const window = new BrowserWindow();

    if (isDevelopment) {
        window.webContents.openDevTools();
        window.loadURL("http://localhost:8080");
    } else {
        // TODO
    }

    window.on("closed", () => {
        mainWindow = null;
    });
};

app.on("ready", () => {
    mainWindow = createMainWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// macOS behaviour
app.on("activate", () => {
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});
