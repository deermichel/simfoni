const { app, BrowserWindow } = require("electron");

const devMode = process.env.NODE_ENV === "dev";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"; // TODO: remove

let mainWindow;

const createMainWindow = () => {
    const window = new BrowserWindow({
        webPreferences: { webSecurity: false }, // TODO: better player to avoid file:// urls
    });

    if (devMode) {
        window.webContents.openDevTools();
        window.loadURL("http://localhost:8080");
    } else {
        window.loadFile("index.html");
    }

    window.on("closed", () => {
        mainWindow = null;
    });

    return window;
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
