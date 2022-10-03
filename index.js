const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

const { app, BrowserWindow, ipcMain } = electron;

app.disableHardwareAcceleration()

app.on('ready', () => {
  
  mainWindow = new BrowserWindow({ webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  }});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

});

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration);

  })
})