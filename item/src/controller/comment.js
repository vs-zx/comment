const Comment=require('../model/Comment')

//  创建留言
async function create(content,username){
    // 存储到数据库
    const newComment=await Comment.create({
        content,
        username
    })
    return newComment;
}

// 从数据库获取留言
async function getList(username=""){
    const whereOpt={};
    if(username){
        whereOpt.username=username;
    }

    const list=await Comment.find(whereOpt).sort({_id:-1});
    return list;
}

// 删除留言项
async function del(_id,username){
    await Comment.deleteOne({
        _id,
        username
    });
}

// 更新留言
async function update(_id,username,content){
    const newItem=await Comment.findOneAndUpdate(
        {_id,username},
        {content},
        {new:true}
    );
    return newItem
}

module.exports={
    create,
    getList,
    del,
    update
}
