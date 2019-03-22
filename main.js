// Modules to control application life and create native browser window
const {app, BrowserWindow,Menu,ipcMain} = require('electron')

// const menuTemplate = require('./lib/js/menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let loginWindow;
let urlWindow;


//insert into db table pswd
// db.tables.pswd.data = [   // You can mix SQL and JavaScript
//   {one:3,two:4},
//   {one:5,two:6},
// ];

    //read data from db
// var res = db.exec("SELECT * FROM test ORDER BY two DESC");



function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null,
    loginWindow = null,
    urlWindow = null
  })
}

function createUrlWindow(){
  urlWindow = new BrowserWindow({
    height:200,
    width:200,
    title: 'Url'
  });
  urlWindow.loadFile('windows/url.html');
}

function createLoginWindow(){
  loginWindow = new BrowserWindow({
    height:250,
    width:250,
    title: 'Login'
  });
  loginWindow.loadFile('windows/login.html');
};

function save(){
  console.log('saving...');
  createUrlWindow(); 
  // mainWindow.webContents.send('save');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  createWindow();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('master-paswd',(e,pass)=>{
  //send to renderer to check against DB details
   mainWindow.webContents.send('master-paswd',pass);
   loginWindow.close()
  
})

//receive entered url from url window and send to mainWindow 
ipcMain.on('url',(e,pswdUrl)=>{
mainWindow.webContents.send('url',pswdUrl);
urlWindow.close();
})

ipcMain.on('login-error',()=>{
  createLoginWindow();
})

//app menu
const menuTemplate = [
  {
    label : 'file',
    submenu:[
      {
        label:'Save',
        accelerator: 'CmdOrCtrl+s',
        click(){
          save()
        }
      },
      
      {
        role: 'reload'
      }
    ]
  },
  {
    label: ' Dev Tools',
    submenu: [
      {
        label: 'Toggle Devtools',
        click(item,focusedwindow){
          focusedwindow.toggleDevTools();
        }
      }
  ]
  },

  {
    label: 'Passwords',
    submenu: [
      {
        label : 'Saved PassWords',
        accelerator: 'CmdOrCtrl+g',
        click(){
          // createLoginWindow();
          mainWindow.webContents.send('master-paswd');
        }
      }
    ]
  }
];
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.