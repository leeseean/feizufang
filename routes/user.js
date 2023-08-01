var express = require("express");
var router = express.Router();
const prisma = require("../prisma/prisma");
const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require("../utils/validator");
// 登录路由
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!(validateUsername(username) && validatePassword(password))) {
    return res.send({
      ok: false,
      msg: "请检查输入格式",
    });
  }
  // 在此处进行身份验证，检查用户名和密码是否正确
  const result = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
  });
  if (result) {
    // 用户名和密码验证通过
    // 将用户信息存储在会话中
    req.session.user = {
      username: result.username,
      balance: result.balance,
      user_id: result.id,
      // 其他用户相关信息...
    };

    res.send({
      ok: true,
      msg: "登录成功",
    });
  } else {
    res.send({
      ok: false,
      msg: "用户名或密码错误",
    });
  }
});

// 登出路由
router.post("/logout", (req, res) => {
  // 销毁会话
  req.session.destroy();

  res.send({ ok: true, msg: "退出成功！" });
});

router.post("/register", (req, res) => {
  // 在此处进行身份验证，检查用户名和密码是否正确
  const { username, password, email } = req.body;
  if (
    !(
      validateUsername(username) &&
      validatePassword(password) &&
      validateEmail(email)
    )
  ) {
    return res.send({
      ok: false,
      msg: "请检查输入格式",
    });
  }
  prisma.user
    .create({
      data: {
        username,
        password,
      },
    })
    .then((result) => {
      if (result) {
        // 用户名和密码验证通过
        // 将用户信息存储在会话中
        req.session.user = {
          username: result.username,
          balance: result.balance,
          user_id: result.id,
          // 其他用户相关信息...
        };

        res.send({
          ok: true,
          msg: "注册成功",
        });
      }
    })
    .catch((err) => {
      res.send({
        ok: false,
        msg: JSON.stringify(err),
      });
    });
});

// 受保护的路由
/*app.get("/protected", (req, res) => {
  // 检查会话中是否存在用户信息
  if (req.session.user) {
    // 用户已登录，可以访问受保护的页面
    res.send("欢迎访问受保护的页面！");
  } else {
    // 用户未登录，重定向到登录页面
    res.redirect("/login");
  }
});*/
router.post("/exchange-product", async (req, res) => {
  const { user_id, detail_id } = req.body;

  try {
    const product = await prisma.detail.findUnique({
      where: {
        id: detail_id,
      },
    });
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (user.balance < product.required_points) {
        return res.send({ ok: false, msg: "余额不足" });
      }

      // 更新用户余额
      await tx.user
        .update({
          where: {
            id: user_id,
          },
          data: {
            balance: user.balance - product.required_points,
          },
        })
        .then((o) => {
          req.session.user.balance = o.balance;
        });

      // 添加积分变动记录
      await tx.points_log.create({
        data: {
          user_id,
          points_change: -product.required_points,
          remark: `兑换  ${detail_id}`,
          points_type: "exchange",
        },
      });

      // 执行兑换商品的业务逻辑，accee_list添加两者关联
      await tx.access_list.create({
        data: {
          user_id,
          detail_id,
        },
      });
      return res.send({ ok: true, msg: "兑换成功" });
    });
  } catch (e) {
    console.log(e);
    res.send({ ok: false, msg: "操作异常，请稍后再试" });
  }
});

module.exports = router;
