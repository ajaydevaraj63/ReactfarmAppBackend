const Exp=require('express')
const  Mng=require('mongoose')
const bdyp=require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')
Mng.connect("mongodb+srv://mzc_mca:qwerty.1@cluster0.weiqp.mongodb.net/farmDb",{UseNewUrlParser:true})

var schemamodel1=Mng.model("farmtb",new Mng.Schema(
      {
           title:String,
           about:String,
           image:String,
           price:String
      }
))
var app=Exp()
app.use(bdyp.urlencoded({extended:true}))
app.use(bdyp.json())
app.use((req, res, next) => { 
      res.setHeader("Access-Control-Allow-Origin", "*");  
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
      next(); });
app.post("/api/add",(req,res)=>{
var datas=req.body
var schemamodel=new schemamodel1(datas)
schemamodel.save((error,data)=>{
      if(error)
      {
            res.send({"data":error})
      }
      else{
            res.send({"data":data})
      }
})

})
app.post("/api/delete",(req,res)=>{
      var ddata=req.body
      schemamodel1.findByIdAndDelete(ddata,(error,data)=>{
            if(error)
            {      
                  res.send({"data":error})
            }
            else{
                     res.send(data)
           }
      })
})
app.post("/api/search",(req,res)=>{
      var gdata=req.body
      schemamodel1.find(gdata,(error,data)=>{
            if(error)
            {      
                  res.send({"error":error})
            }
            else{
                  res.send(data)
            }
      })
})       
app.get("/api/view",(req,res)=>{
      schemamodel1.find((error,data)=>{
            if(error){
                  res.send({"data":error})
            }
            else{
                  res.send(data)
            }
      })
})

app.listen(4000,()=>{
console.log('running farm api')
})