
const {ipcRenderer,shell,clipboard} = require('electron');
const helper = require('./lib/js/helper');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'lib/db/password.db', autoload: true });

     
const btn = document.getElementById('btn'),
      passDisp = document.getElementById('password');
      // num = Math.floor(Math.random()*(50-10+1)+10);
      

      btn.addEventListener('click',(e)=>{
        helper.generate()               
      })

      document.addEventListener('keyup',(e)=>{
        if(e.which == 13){
          helper.generate()
         }       
      })

//receive entered url from main
ipcRenderer.on('url',(e,pswdUrl)=>{
  const pass = passDisp.value;

   //insert into db 
   const savePass = {
     passWord : pass,
     url : pswdUrl
   }
 db.insert(savePass,(error,newsavePass)=>{
   console.log(newsavePass._id)
 })
 
  //  console.log(pswdUrl);
  //  console.log(pass);
})

//open saved passwords
ipcRenderer.on('saved-pass',()=>{
  
  console.log('opening saved passwords....');
})

ipcRenderer.on('master-paswd',(e,pass)=>{
  
  
  pass = true;
  if(pass){
    
    db.find({},(err,doc)=>{
      console.log(doc);
    })
  }else{
    shell.beep()
    alert('wrong login password')
    ipcRenderer.send('login-error')
  }
  
})

//save passwords to DB
ipcRenderer.on('save',()=>{

  // console.log(passDisp.innerHTML)
})
