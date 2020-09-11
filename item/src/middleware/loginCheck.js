// 登录验证中间件
async function loginCheck(ctx, next) {
  // 登录后，就会有session，
  const session = ctx.session || {};
  const userInfo = session.userInfo;

  if (userInfo && userInfo.username) {
    // 验证成功，进行下一步
    await next();
    return;
  }

  // 验证失败
  ctx.body = {
    errno: -1,
    msg: "验证失败",
  };
}

module.exports ={
    loginCheck
}
