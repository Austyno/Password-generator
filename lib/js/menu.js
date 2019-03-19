// const {Menu} = require('electron');

// const mainMenu = Menu.buildFromTemplate(menuTemplate);
//       Menu.setApplicationMenu(mainMenu);
const {BrowserWindow} = require('electron')
let mainWindow;

const menuTemplate = [
  {
    label : 'file',
    submenu:[
      {
        label:'Save',
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
    label: 'Passwords',
    submenu: [
      {
        label : 'Saved PassWords',
        click(){
          mainWindow.webContents.send('saved-pass');
        }
      }
    ]
  }
];

  // if (process.platform === 'darwin') {
  //   const name = app.getName();
  //   menuTemplate.unshift({
  //     label: name,
  //     submenu: [{
  //       label: 'Quit',
  //       accelerator: 'Command+Q',
  //       click: function () {app.quit() }
  //     }] 
  //   })
  // }
  
  module.exports = menuTemplate;