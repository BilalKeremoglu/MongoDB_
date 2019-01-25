//mongo db için kullandığımız kütüphane
var mongoose = require('mongoose');
//eğer User adında bir db yoksa yeni bir db oluşturacak
mongoose.connect("mongodb://localhost/User");

//nosql veri tabanında şemaya ihtiyaç duymasak da şema oluşturmak developer açısında kolaylık sağlar.
var userSchema = mongoose.Schema({
    name: String,
    lastname: String,
    country: String,
    age: Number
});

//şemamızı modele aktarıp bir değişene eşitliyoruz. tamamen kullanım kolaylığı için. "model name oluşturuken tekil isim kullanmakta fayda var "
//çünkü mongo db User mongodb ye  zaten Users diye kaydedecektir.
var User = mongoose.model("User", userSchema);

//Kullanıcı ekleme 

var degisken = new User({
    name: "bilal",
    lastname: "keremoglu",
    country: "Turkey",
    age: 21
});

//save metodu kayıt işlemini yapar.İçerisine callback func açıyoruz.userDB değişkenine istediğimiz ismi verebiliriz. Bu değişken kayıt bilgisi tutar.
degisken.save((err,userDB)=>{
    if(err){
        console.log("hata var");
    }else{
        console.log("Yeni bir kullanıcı eklendi.")
        console.log(userDB.name);
    }

});
//diğer bi kayıt metodu da create'tir.
User.create({
    name:"ayca",
    lastname:"akar",
    country:"Turkey",
    age:"21"
},(err,userDB)=>{
    if(err){
        console.log("hata var!");    
    }else{
        console.log("kayıt başarılı!");
        console.log(userDB.name);
    }
});

//kayıtları görüntüleme
User.find({},(err,userDB)=>{
    if(err){
        console.log("hata var!");
    }else{
        console.log("kayıtlar geliyor.")
        console.log(userDB);
    }
})

