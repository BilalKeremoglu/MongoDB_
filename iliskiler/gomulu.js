var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/DBIliskiler");

//Gönderi şeması
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var post = mongoose.model("post",postSchema);

//User şeması
var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var user = new mongoose.model("user",userSchema);

//Gönderi oluşturma
var newPost = new post({
    title:"Siber Güvenlik",
    content:"Siber güvenlik hakkında her şey."
});

newPost.save((err,post)=>{
    if(err){
        console.log(err);
    }else{
        console.log(post);
    }
});

//User oluşturma
var newUser = new user({
    email:"deneme@windowslive.com",
    name:"Burhan Keremoglu"
});

newUser.posts.push({
    newPost
});

newUser.save((err,user)=>{
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});