const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(async () => {
  try {
    const win = new BrowserWindow({
      width: 512,
      height: 512,
      show: false,
      frame: false,
      transparent: true,
      webPreferences: {
        offscreen: true
      }
    });

    await win.loadFile(path.join(__dirname, '../public/render-icon.html'));
    
    // Give 500ms for SVG rendering
    await new Promise(r => setTimeout(r, 600));

    const image = await win.webContents.capturePage({ x: 0, y: 0, width: 512, height: 512 });
    const pngBuffer = image.toPNG();
    fs.writeFileSync(path.join(__dirname, '../public/icon-512.png'), pngBuffer);
    console.log('SUCCESS: Rendered icon-512.png, size:', pngBuffer.length);
  } catch (err) {
    console.error('ERROR rendering icon:', err);
  } finally {
    app.quit();
  }
});
