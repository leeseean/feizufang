const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const prisma = require("./prisma/prisma");
// 定义你的网站URL
const baseUrl = "https://wxfk.one";
// 静态urls
const urls = [
  {
    url: "/index",
    changefreq: "daily",
    // priority: 1,
    news: {
      publication: {
        name: "菲租房",
        language: "zh",
      },
      publication_date: new Date().toLocaleDateString(),
      title: "菲律宾房产，菲律宾bgc租房，菲律宾买房，菲龙网租房 - 菲租房",
      keywords: "菲租房,Makati租房,帕塞租房,菲律宾租房",
    },
  },
  {
    url: "/erShou",
    changefreq: "weekly",
    // priority: 0.8,
    news: {
      publication: {
        name: "菲律宾二手交易",
        language: "zh",
      },
      publication_date: new Date().toLocaleDateString(),
      title: "菲律宾二手交易网",
      keywords: "二手物品交易,菲律宾二手交易,菲律宾闲鱼",
    },
  },
];

async function genSitemap() {
  // 动态urls，包含分页，详情页
  // 获取租房数据
  const totalRecordsOfRent = await prisma.rentlist.findMany();
  const totalRecordsOfErShou = await prisma.er_shou.findMany();
  const pageSize = 10;
  const totalPagesOfRent = Math.ceil(totalRecordsOfRent.length / pageSize);
  const totalPagesOfErShou = Math.ceil(totalRecordsOfErShou.length / pageSize);
  // 分页http://wxfk.one/index?pageNumber=1
  for (let i = 0; i < totalPagesOfRent; i++) {
    urls.push({
      url: `${baseUrl}/index?pageNumber=${i + 1}`,
      changefreq: "weekly",
      // priority: 0.6,
    });
  }
  // 分页http://wxfk.one/erShou?pageNumber=2
  for (let i = 0; i < totalPagesOfErShou; i++) {
    urls.push({
      url: `${baseUrl}/erShou?pageNumber=${i + 1}`,
      changefreq: "weekly",
      // priority: 0.6,
    });
  }
  // 详情页http://wxfk.one/detail/6153
  for (const item of totalRecordsOfRent) {
    urls.push({
      url: `${baseUrl}/detail/${item.id}`,
      changefreq: "weekly",
      // priority: 0.9,
      news: {
        publication: {
          name: "菲租房",
          language: "zh",
        },
        publication_date: item.dateline,
        title: item.title,
        keywords: item.title,
      },
    });
  }

  // 生成网站地图对象
  const createSitemapStream = (urls) => {
    const stream = new SitemapStream({ hostname: baseUrl });
    urls.forEach((url) => {
      stream.write(url);
    });
    stream.end();
    return stream;
  };
  const sitemapStream = createSitemapStream(urls);

  // 将网站地图内容保存到文件
  const writeStream = createWriteStream("sitemap.xml");
  sitemapStream.pipe(writeStream);
  sitemapStream.on("end", () => {
    console.log("Sitemap generated successfully.");
  });
}

genSitemap();
