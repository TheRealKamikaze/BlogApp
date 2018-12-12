var express     =require("express"),
    app         =express(),
    bodyparser  =require("body-parser"),
    mongoose    =require("mongoose");
    
mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    created: {type: Date, default: Date.now}
});

var blog=mongoose.model("blog",blogSchema);
  
  
// blog.create({
//     title: "Test Blog!!",
//     image: "https://images.unsplash.com/photo-1531579881625-f9ab707607fe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c931ca93e90863e553d1c09163a76204&auto=format&fit=crop&w=752&q=80",
//     description: "Blog Post che, tamme pasand che? Su kre che?"
// },function(err,blog){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(blog);
//     }
// })  

app.get("/blogs",function(req,res){
    blog.find({},function(err,allBlogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blogs:allBlogs});
        }
        });
    })
  
  
  
    

app.listen(process.env.PORT,process.env.IP,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Blog Server is running");
    }
})