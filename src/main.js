const { ipcMain, app, BrowserWindow } = require('electron');
const emotion = require("./emotion.json")


// python ===============================================

var spawn = require('child_process').spawn;


function createWindow () { 
  const win = new BrowserWindow({ 
    width: 1080, 
    height: 720, 
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation : false
    } 
   }) 
  win.loadURL("http://localhost:3000")
} 
app.whenReady().then(() => { 
  createWindow();
    
  // ipc ==================================================
  ipcMain.on("convert script", (event, data) => {
    var path = JSON.parse(data);
    console.log(path.webm);
    console.log(path.mp4);
    // exe 윈도우 파일 실행하기
    const result = spawn('./python_src/webmToMp4/rtc', [
      path.webm,
      path.mp4
    ]);
    // 실행 결과 출력
    result.on('close', (code) => {
      event.reply("convert success",emotion);
    });
    
  });
  ipcMain.on("detecting emotion script")

});
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();
});