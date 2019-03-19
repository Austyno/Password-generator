const helper ={
  xters: "!@#$%&*?+",

  //function to shuffle string and make it random to generate enthropy
  shuffle : function(string) {
    var string = string.split(""),
        n = string.length;
  
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = string[i];
        string[i] = string[j];
        string[j] = tmp;
       
    }
    return string.join("");
  },

  //generate password
  generate: function(){
    const input = document.getElementById('sentence');
    var sentence = input.value;          
  
      //convert sentence to array
      const words = sentence.split(' ');
  
  
           if(words.length == 1){
            alert('Word is too short. Enter atleast two words')
            return
            }
      const max = words.length - 1,
            min = 1; 
          
            //convert a random word to uppercase
            const str = words[Math.floor(Math.random()*(max-min+1)+min)].toUpperCase();
  
            //locate 'str' in words and replace with str
            words[words.indexOf(str.toLowerCase())] = str;
        
                  
            let password =[];
  
            for(var i=0; i<words.length;i++){
              
               password.push( words[i]+shuffle(xters).substr(0,1)+':');
                
            }
  
            console.log(password)
            passDisp.innerHTML = password.join(" ")+' '+Math.floor(Math.random()*(50-10+1)+10)+':'
  
  }
  
}
module.exports = helper;
 


