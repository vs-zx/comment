const mongoose=require('mongoose');

// 定义地址、数据库
const url="mongodb://localhost:27017";
const dbName="comment3";

// 基本设置
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',true);

// 开始连接
mongoose.connect(`${url}/${dbName}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// 获取连接实例
const conn=mongoose.connection

// 监察错误
conn.on('error',err=>{
    console.log("连接出错：",err);
});

// 导出
module.exports=mongoose