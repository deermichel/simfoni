const { app, BrowserWindow } = require("electron");

const devMode = process.env.NODE_ENV === "dev";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"; // TODO: remove

global.mainWindow = null;
global.remoteWindow = null;

const createMainWindow = () => {
    const window = new BrowserWindow();

    if (devMode) {
        window.webContents.openDevTools();
        setTimeout(() => {
            window.loadURL("http://localhost:9000");
        }, 2000);
    } else {
        window.loadFile("index.html");
    }

    window.on("closed", () => {
        global.mainWindow = null;
    });

    return window;
};

const createRemoteWindow = () => {
    const window = new BrowserWindow({
        show: true,
        webPreferences: { webSecurity: false }, // TODO: better player to avoid file:// urls
    });

    if (devMode) {
        window.webContents.openDevTools();
        setTimeout(() => {
            window.loadURL("http://localhost:9001");
        }, 2000);
    } else {
        window.loadFile("index.html");
    }

    return window;
};

app.on("ready", () => {
    global.remoteWindow = createRemoteWindow();
    global.mainWindow = createMainWindow();
});

app.on("window-all-closed", () => { // TODO: problem - hidden BrowserWindow
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// macOS behaviour
app.on("activate", () => {
    if (global.mainWindow === null) {
        global.mainWindow = createMainWindow();
    }
});
