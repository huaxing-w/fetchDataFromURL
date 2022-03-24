const https = require('https');
const fs=require('fs');
const crypto = require('crypto');

// https.get('https://coderbyte.com/api/challenges/json/age-counting', function (res) {
//   let {statusCode}=res;
//   let contentType = res.headers['content-type'];
//   res.setEncoding('utf8');
//   let temp='';
  
//   res.on('data',(d)=>{
    
    
//   })

//   res.on("error", (e) => {
//     console.log("error", e)
//   });
   
// });



https.get('https://coderbyte.com/api/challenges/json/age-counting', function (res) {
  let {statusCode}=res;
  let contentType = res.headers['content-type'];
  res.setEncoding('utf-8');
  let data='';
  res.on('data',function(item){
    data+=item;
  });
  res.on('end',function(){
    let s=JSON.parse(data).data;
    let array=s.split(' ');
    
    let file=fs.createWriteStream('output.txt');
    file.on('error',function(err){
      console.log(err);
    });
    let N=array.length;
    let flag=0;
    for(let i=0;i<N;i+=2){
      let strKey=array[i].substring(4,array[i].length-1);
      let ageVal=array[i+1].substring(4,array[i+1].length-1);
      
      if(ageVal==32){
        if (flag==0){
          file.write(strKey);
          flag+=1;
        }
        else(
          file.write('\n'+strKey)
        )
        
      }
    }
    file.end();

    fs.createReadStream('./output2.txt').pipe(crypto.createHash('sha1').setEncoding('hex')).on('finish',function(){
      console.log(this.read());
    })
    
  })
  
});


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', function (res) {
  let {statusCode}=res;
  let contentType = res.headers['content-type'];
  res.setEncoding('utf8');
  let data='';

  res.on('data',function(item){
    data+=item;
  });
  res.on('end',function(){
    let parsedData=JSON.parse(data).hobbies;
    let ans='';
    for(const item of parsedData){
      ans+=item+','+' ';
    }
    let ans2=ans.substring(0,ans.length-2);
    console.log(ans2);

  })
  // res.on('data',(d)=>{
    
  //   data=JSON.parse(d).hobbies;
    
  //   let ans=''
  //   for(const item of data){
  //     ans+=item+','+' ';
  //   }
  //   let ans2=ans.substring(0,ans.length-2);
  //   console.log(ans2);
  // })
});





// const axios = require('axios')

// axios
//   .get('https://coderbyte.com/api/challenges/json/age-counting')
//   .then(res => {
//     console.log(`statusCode: ${res.status}`)
//     console.log(res.data)
//     console.log(JSON.parse(res.data));
//   })
//   .catch(error => {
//     console.error(error)
//   })



