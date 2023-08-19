const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const { execSync } = require("child_process");

// 定义定时任务的时间规则，每周凌晨1点执行
const cronTime = "0 0 * * 1"; //

// 创建定时任务
cron.schedule(cronTime, () => {
  const rootPath = __dirname; // 当前脚本所在目录（根目录）
  const publicPath = path.join(rootPath, "public"); // public 目录的完整路径

  // 生成 sitemap.xml 文件
  try {
    execSync("node sitemap.js"); // 生成 sitemap.xml 的脚本
    console.log("Sitemap generated.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  // 移动或覆盖 sitemap.xml 文件到 public 目录
  const sitemapPath = path.join(rootPath, "sitemap.xml");
  const newSitemapPath = path.join(publicPath, "sitemap.xml");

  try {
    fs.copyFileSync(sitemapPath, newSitemapPath);
    console.log("Sitemap copied to public directory.");
  } catch (error) {
    console.error("Error copying sitemap to public directory:", error);
  }
});

console.log("Scheduled cron job for sitemap.");

// 保持脚本运行，以便定时任务执行
process.stdin.resume();
