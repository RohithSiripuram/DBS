let csv= require('fast-csv');

const fs = require('fs');

const express=require("express");

const mongoose=require("mongoose");




const app=express();


app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

    
mongoose.connect("mongodb+srv://admin-bharath:"+encodeURIComponent("Ippa@123")+"@cluster0.lvknf.mongodb.net/DBSDB1", {useNewUrlParser:true, useUnifiedTopology:true});

    const Customerschema=new mongoose.Schema({
        accountNumber: String,
            resedient:String,
            riskRate:String,
            descript:String
    });
  
    const Customer=new mongoose.model("Customer",Customerschema);

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html")
})

app.post("/predict",function(req,res)
{
    var acnumber=req.body.accountnum;
    Customer.find({accountNumber:acnumber},function(err,items)
    {
        res.render("index1",{risk:items})
    })

})

app.listen(3000,function(req,res)
{
    console.log("Server running on port 3000");
})


var stream = fs.createReadStream("countries_info.csv");

var countriesList=[];

csv
 .parseStream(stream, {headers : true})
 .on("data", function(data){
     countriesList.push(data.ENTITY_KEY)
     
 })
 .on("end", function(){
     console.log(countriesList);
 });


 var stream3 = fs.createReadStream("customer_account_info.csv");

var customersAccountinfo=[];

csv
 .parseStream(stream3, {headers : true})
 .on("data", function(data){
     
     customersAccountinfo.push(data)
     
 })
 .on("end", function(){
    //  console.log(customersAccountinfo);
 });


 var stream4 = fs.createReadStream("customer_info.csv");

 var customerinfo=[];
 
 csv
  .parseStream(stream4, {headers : true})
  .on("data", function(data){
      
      customerinfo.push(data)
      
  })
  .on("end", function(){
    //   console.log(customerinfo);
  });

//  var customerTransactions=[];

//  var stream1=fs.createReadStream("customer_transactions.csv");

//  csv
//  .parseStream(stream1, {headers : true})
//  .on("data", function(data){
//      customerTransactions.push(data)
     
//  })
//  .on("end", function()
//  {
    
//     var c=0;
//     var inputMoney=0,outputMoney=0,outTransactions=0,inpTransactions=0,riskcountrycount=0;

//     if((customerTransactions[0].transaction_Type)=='INN')
//     {
//         inputMoney=(Number)(customerTransactions[0].Transaction_Amount)
//         inpTransactions++;
//         inpTransactions=1;
//             outTransactions=0;
//     }
//     else if((customerTransactions[0].transaction_Type)=='OUT'){
//         outputMoney=((Number)(customerTransactions[0].Transaction_Amount))
//         outTransactions++;
//         inpTransactions=0;
//             outTransactions=1;
//     }

//     for(var j=0;j< countriesList.length;j++ )
//          {
//              if(customerTransactions[0].Transaction_Destination==countriesList[j])
//              {
//                  riskcountrycount++;
//              }
//          }


//     for(var i=1;i< customerTransactions.length;i++)
//  {
//      if(customerTransactions[i].Account_Key==customerTransactions[i-1].Account_Key)
//      {
//          for(var j=0;j< countriesList.length;j++ )
//          {
//              if(customerTransactions[i].Transaction_Destination==countriesList[j])
//              {
//                  riskcountrycount++;
//              }
//          }
//          if(customerTransactions[i].transaction_Type=='INN')
//          {
//              inputMoney+=(Number)(customerTransactions[i].Transaction_Amount)
//              outTransactions++;
             
//          }
//          if(customerTransactions[i].transaction_Type=='OUT')
//          {
//              outputMoney+=(Number)(customerTransactions[i].Transaction_Amount)
//              outTransactions++;
             
//          }
//      }
//      else{



//         var str=customerTransactions[i].Account_Key;
        
 

//  var partyKey="",res="";


//  for(var k=0;k<customersAccountinfo.length;k++)
//  {
//      if(customersAccountinfo[k].account_key==str)
//      {
//          partyKey=customersAccountinfo[k].primary_party_key;
//      }
//  }
 
//  for(var k=0;k<customerinfo.length;k++)
//  {
//      if(customerinfo[k].party_key==partyKey)
//      {
//          res=customerinfo[k].residential_country_cd;
//          break;
//      }
//  }

//  console.log(res);
       

        
//  var description="";
//  var riskFactor="";

//  if(riskcountrycount>10||inputMoney>1000||outputMoney>800)
//  {
//     if(riskcountrycount>10)
//     {
//         description="H1";
//     }
//     else if(inputMoney>1000)
//     {
//         description="H2"; 
//     }
//     else if(outputMoney>800)
//     {
//         description="H3";
//     }
//     riskFactor="High";
    
    
//  }
// else if(riskcountrycount>6||inputMoney>600&&inputMoney<1000||outputMoney>500&&outputMoney<800)
// {
//     if(riskcountrycount>6)
//     {
//         description="M1";
//     }
//     else if(inputMoney>600&&inputMoney<1000)
//     {
//         description="M2"; 
//     }
//     else if(outputMoney>500&&outputMoney<800)
//     {
//         description="M3";
//     }
//     riskFactor="Medium";
// }
// else if(riskcountrycount<10||inputMoney<600||outputMoney<500)
//  {
//     if(riskcountrycount<10)
//     {
//         description="L1";
//     }
//     else if(inputMoney>600&&inputMoney<1000)
//     {
//         description="L2"; 
//     }
//     else if(outputMoney>500&&outputMoney<800)
//     {
//         description="L3";
//     }
//     riskFactor="Low";
// }



// const customer1=new Customer({

//     accountNumber: customerTransactions[i-1].Account_Key,
//     resedient:res,
//     riskRate:riskFactor,
//     descript:description

// })

// customer1.save();

//         // console.log(customerTransactions[i-1].Account_Key);
//         // console.log(inputMoney+" i");
//         // console.log(outputMoney+" o");
//         // console.log(inpTransactions+" in");
//         // console.log(outTransactions+" ou");
//         // console.log(riskcountrycount+" rc");
//         riskcountrycount=0;

// //console.log(customerTransactions);
//       if((customerTransactions[i].transaction_Type)=='INN')
//         {
//             inputMoney=(Number)(customerTransactions[i].Transaction_Amount)
//             outputMoney=0;
//             inpTransactions=1;
//             outTransactions=0;
//         }
//         else if((customerTransactions[i].transaction_Type)=='OUT'){
//             outputMoney=((Number)(customerTransactions[i].Transaction_Amount))
//             inputMoney=0;
//             inpTransactions=0;
//             outTransactions=1;
//         }

//         for(var j=0;j< countriesList.length;j++ )
//          {
//              if(customerTransactions[i].Transaction_Destination==countriesList[j])
//              {
//                  riskcountrycount++;
//              }
//          }
        

//      }
//  }
 

//  });


 

// //  var stream2=fs.createReadStream("customer_account_info.csv");

// //  csv
// //  .parseStream(stream2, {headers : true})
// //  .on("data", function(data){
// //      if(data.account_key);
     
// //  })
// //  .on("end", function(){
// //      console.log("end");
// //   });


  