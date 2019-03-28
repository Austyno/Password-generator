const {ipcRenderer} = require('electron');
const save = document.getElementById('save');
const pswd = document.getElementById('pswd');

save.addEventListener('click',(e)=>{
e.preventDefault();
const masterPass = pswd.value;
        //send entered password to main
        ipcRenderer.send('saveMasterPaswd',masterPass);
        // alert('your master password is '+ pass)
})