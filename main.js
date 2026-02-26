const electron = require('electron');

const createWindow = (path) => {
    // const win = new BrowserWindow({
    //     width: 800,
    //     height: 600
    // })
    const win = new electron.BrowserWindow({
        fullscreen: false,
        x: 0,
        y: 0
    })

    win.loadFile(path);
    win.maximize();
}

electron.app.whenReady().then(() => {
    createWindow('src/html/screen1.html');

    console.log(electron.screen.getAllDisplays());
})