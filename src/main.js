const { ipcMain, app, BrowserWindow } = require('electron');
const path = require('path');
// import emotion from "./emotion.json"


// python ===============================================

var spawn = require('child_process').spawn;
// exe 윈도우 파일 실행하기
// const result = spawn('./python_src/webmToMp4/rtc', [
//   './python_src/video/test4.webm'
//  , './python_src/video/test4.mp4']);
function spawning(webm, mp4) {
  spawn('./python_src/webmToMp4/rtc', [
    webm, mp4
  ]);
}

// json file ============================================
// const JsonData = () => {
//   console.log(emotion.Angry);
//   console.log(emotion.Disgusted);
//   console.log(emotion.Happy);
//   console.log(emotion.Fearful);
//   console.log(emotion.Neutral);
//   console.log(emotion.Sad);
//   console.log(emotion.Surprised);
// };


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
    const result = spawn('./python_src/webmToMp4/rtc', [
      path.webm,
      path.mp4
    ]);
    // 실행 결과 출력
    result.stdout.on("data", function(data) {
      console.log(data.toString());
    });
    result.stderr.on('data', function(data) {
      console.log(data.toString());
    });
  
    event.reply("convert success","mp4 video path");
  });

});
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();
});