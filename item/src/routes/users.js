const router = require('koa-router')()
const {register,login}=require('../controller/user')    
const {loginCheck}=require('../middleware/loginCheck')    

router.prefix('/users')

// 获取用户信息
router.get('/getUserInfo',loginCheck,async (ctx,next)=>{
  ctx.body={
    errno:0,
    data:ctx.session.userInfo
  }
});

// 注册 
router.post('/register',async (ctx,next)=>{
  // 获取注册信息
  const userInfo=ctx.request.body;
  // 提交注册
  try{
    const newUser=await register(userInfo);
    // 成功
    ctx.body={
      errno:0,
      data:newUser
    }
  }catch(ex){
    // 失败
    console.log("注册失败：",ex);
    ctx.body={
      errno:-1,
      msg:"注册失败"
    }
  }

});

// 登录
router.post('/login',async (ctx,next)=>{
  const {username,password}=ctx.request.body;
  const res=login(username,password)    // 成功true，失败false
  if(res){
    // 若登录成功，会创建当前用户的session，获取它
    ctx.session.userInfo={
      username,
      password
    }
    // 返回
    ctx.body={
      errno:0
    }
  }else{
    // 登录失败
    ctx.body={
      errno:-1,
      msg:"登录失败"
    }
  }
});


module.exports = router
