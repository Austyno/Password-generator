const {app, BrowserWindow,Menu,ipcMain,shell,dialog} = require('electron');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'lib/db/password.db', autoload: true });

let mainWindow;
let loginWindow;
let urlWindow;
let masterWindow;

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
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    
    mainWindow = null;
    loginWindow = null;
    urlWindow = null;
    masterWindow = null;
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

function createNewMasterWindow(){
  masterWindow = new BrowserWindow({
    height:250,
    width:250,
    title: ' Save Master Password'
  });
  masterWindow.loadFile('windows/master.html');

}

function save(){
  console.log('saving...');
  createUrlWindow(); 
  // mainWindow.webContents.send('save');
}

app.on('ready', ()=>{
  createWindow();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  
  if (mainWindow === null) {
    createWindow()
  }
})
ipcMain.on('saveMasterPaswd',(e,masterPass)=>{


  var doc = {
    name: 'master',
    masterpass : masterPass
  };

  db.insert(doc,(error,newdoc)=>{

  })
 

  mainWindow.webContents.send('master-saved');
  masterWindow.close();

});

//receive entered url from url window and send to mainWindow 
ipcMain.on('url',(e,pswdUrl)=>{
  mainWindow.webContents.send('url',pswdUrl);
  urlWindow.close();
});

//receive login details
ipcMain.on('login',(e,loginPass)=>{
  mainWindow.webContents.send('login',loginPass);
  loginWindow.close();

})

//reload login window on login error
ipcMain.on('login-error',()=>{
  shell.beep()
  createLoginWindow();
  
});

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
  
  // {
  //   label: ' Dev Tools',
  //   submenu: [
  //     {
  //       label: 'Toggle Devtools',
  //       click(item,focusedwindow){
  //         focusedwindow.toggleDevTools();
  //       }
  //     }
  // ]
  // },

  {
    label: 'Passwords',
    submenu: [
      {
        label : 'Saved PassWords',
        accelerator: 'CmdOrCtrl+g',
        click(){

          db.find({masterpass:{$exists: true}},(error,doc)=>{

            if(doc.length == 0){
              createNewMasterWindow();
            }else{
              createLoginWindow();
            }
          })        
          
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  const name = app.getName();
  menuTemplate.unshift({
    label: name,
    submenu: [{
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {app.quit() }
    }] 
  })
}