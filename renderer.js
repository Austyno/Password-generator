
const {ipcRenderer,shell,clipboard} = require('electron');
const helper = require('./lib/js/helper');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'lib/db/password.db', autoload: true });

const savedPass = document.getElementById('savedPass');

     
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
     password : pass,
     url : pswdUrl
   }
 db.insert(savePass,(error,newsavePass)=>{
  //  console.log(newsavePass._id)
   alert('password saved successfuly');
 })
})


ipcRenderer.on('master-saved',(e)=>{
  showPass();
})

ipcRenderer.on('login',(e,loginPass)=>{
  db.find({masterpass : loginPass},(err,newdoc)=>{

    // console.log(newdoc);
    // return;
    if(newdoc.length == 1){
      showPass()
    }else{
      ipcRenderer.send('login-error');
    }
  })
});



function showPass(){
  db.find({ $not: { name: 'master' } }, function (err, doc) {

    savedPass.innerHTML = '';
    let count =1;
    doc.forEach(pass => {     
      savedPass.innerHTML += `<tr style="background:white"><td>${count++}</td><td>${pass.url}</td><td>${pass.password}</td></tr>` 
    });
  }); 
};

 deleteAll = () => {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    console.log(numRemoved);
  });
}
