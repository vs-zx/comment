const User=require('../model/User')

// 注册     将用户信息放入数据库
async function register(userInfo={}){
    const newUser=await User.create(userInfo);
    return newUser;
}

// 登录 按条件查找数据库
async function login(username,password){
    // 数据库存在登录账户 返回true  ，否则就是false
    const user=await User.findOne({username,password});
    if(user!=null){
        // 登录成功
        return true;
    }
    // 登录失败
    return false;
}

// 导出方法
module.exports={
    register,
    login
}
