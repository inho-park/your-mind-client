const { app, BrowserWindow } = require('electron');
const path = require('path');

var spawn = require('child_process').spawn;
// exe 윈도우 파일 실행하기
const result = spawn('./python_src/webmToMp4/rtc2', [
  './python_src/video/test4.webm'
 , './python_src/video/test4.mp4']);


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

  // 실행 결과 출력
  result.stdout.on("data", function(data) {
    console.log(data.toString());
  });
  result.stderr.on('data', function(data) {
    console.log(data.toString());
  })
});
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();
});