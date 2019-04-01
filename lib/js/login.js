const {ipcRenderer} = require('electron');
const login = document.getElementById('login');
const pswd = document.getElementById('pswd');

      login.addEventListener('click',(e)=>{
        e.preventDefault();
       

          const loginPass = pswd.value;

           //send entered password to main
          ipcRenderer.send('login',loginPass);
      })