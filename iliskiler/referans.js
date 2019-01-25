var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/DBIliskiler_2");

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
    posts:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
});

var user = new mongoose.model("user",userSchema);

//User create
/* user.create({
    email:"bilalkeremoglu@windowslive.com",
    name:"bilal keremoglu"
}); */

//post create
/* post.create({
    title:"uzun bir baslık",
    content:"uzun bir içerik"
},(err,post)=>{
    user.findOne({email:"bilalkeremoglu@windowslive.com"},(err,foundUser)=>{
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save((err,user)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                }
            });
        }
    });
}); */

//görüntüleme
user.findOne({email:"bilalkeremoglu@windowslive.com"}).populate("posts").exec((err,user)=>{
    if(err){
        console.log(err);
    }else{
        console.log(user); 
    }
})