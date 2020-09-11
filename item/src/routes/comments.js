// 留言路由
const router = require("koa-router")();
const { create, getList, del ,update} = require("../controller/comment");
const { loginCheck } = require("../middleware/loginCheck");

router.prefix("/comment");

// 新增留言
router.post("/create", loginCheck, async (ctx, next) => {
  const { content } = ctx.request.body;
  const { username } = ctx.session.userInfo;
  // 提交留言
  const newComment = await create(content, username);

  ctx.body = {
    errno: 0,
    data: newComment,
  };
});

// 获取留言列表
router.get("/list", loginCheck, async (ctx, next) => {
  let { filterType } = ctx.query;
  // filterType=1 查看全部，filterType=2 只查看自己的
  filterType = parseInt(filterType) || 1;
  let username = "";
  if (filterType === 2) {
    username = ctx.session.userInfo.username;
  }

  // 获取数据库留言
  const list = await getList(username);
  // 返回数据
  ctx.body = {
    errno: 0,
    data: list,
  };
});

// 删除留言
router.post("/del", loginCheck, async (ctx, next) => {
  // 获取用户信息
  const { _id } = ctx.request.body;
  const { username } = ctx.session.userInfo;

  // 删除操作
  try {
    await del(_id, username);
    ctx.body = {
      errno: 0,
    };
  } catch (ex) {
    ctx.body = {
      errno: -1,
      msg: "删除失败",
    };
  }
});

// 更新
router.post('/update',loginCheck,async (ctx,next)=>{
    // 获取当前用户信息，以及新的留言内容
    const { _id,content }=ctx.request.body
    const { username } = ctx.session.userInfo;

    // 操作更新
    const newItem=await update(_id,username,content);

    ctx.body={
        errno:0,
        data:newItem
    }

})

module.exports = router;
