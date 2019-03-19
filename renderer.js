// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const helper = require('./lib/js/helper');


const btn = document.getElementById('btn'),
      passDisp = document.getElementById('password'),
      num = Math.floor(Math.random()*(50-10+1)+10);
      

      

      btn.addEventListener('click',(e)=>{
        helper.generate()               
      })

      document.addEventListener('keyup',(e)=>{
        if(e.which == 13){
          helper.generate()
         }       
      })


//open saved passwords
ipcRenderer.on('saved-pass',()=>{
  console.log('opening saved passwords....')
})

//save passwords to DB
ipcRenderer.on('save',()=>{
  console.log(passDisp.innerHTML)
})
