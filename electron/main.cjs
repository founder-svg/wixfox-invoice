const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0A0C10',
    title: 'WixFox Studio — Agency ERP & Invoicing',
    icon: path.join(__dirname, '../public/wixfox-fox-logo.svg'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('MainWindow finished loading successfully!');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load URL:', validatedURL, 'Error:', errorCode, errorDescription);
  });

  const distHtmlPath = path.join(__dirname, '../dist/index.html');

  // If built dist/index.html exists, prioritize it for instant offline loading with 0 blank screens
  if (fs.existsSync(distHtmlPath) && process.env.VITE_DEV !== 'true') {
    mainWindow.loadFile(distHtmlPath);
  } else {
    mainWindow.loadURL('http://localhost:5173').catch(() => {
      if (fs.existsSync(distHtmlPath)) {
        mainWindow.loadFile(distHtmlPath);
      }
    });
  }

  // External links (WhatsApp, Wixfox website) open in user's default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
