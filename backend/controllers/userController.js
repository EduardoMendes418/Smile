exports.login = (req,res)=>{
  
    let obj = {
        pageTitle:'Home'
    };

    res.render('login',obj);
};