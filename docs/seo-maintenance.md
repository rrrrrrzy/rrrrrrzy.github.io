# 全站 SEO 与维护手册

主域名：https://www.ziyangrao.com

## 页面与搜索目标

| 页面 | 地址 | 优先覆盖的搜索意图 |
| --- | --- | --- |
| 学术首页 | `/` | Ziyang Rao、饶子扬、姓名 + HKUST / embodied AI / flow matching |
| 研究笔记与项目 | `/blog/` | 作者的研究项目、方法介绍与实验笔记 |
| 个人图库 | `/life/` | 姓名 + personal photographs / life |
| FM Geometry | `/fm-geometry/` | 论文全名、flow matching uncertainty、VLA failure detection |
| 后续原创博客 | `/blog/<id>/` | 与文章内容对应的具体研究问题 |

首页以个人身份和研究方向为主，论文页承接具体方法词。以上是内容定位，没有做关键词搜索量调查。Life 页不是研究排名的重点。没有新增中文翻译页；中英文姓名都出现在首页可见内容与元数据中。

所有公开页面在构建时输出真实正文；导航用正常链接，浏览器返回、分享和直接访问都对应独立网址。旧的 `/#blog` 和 `/#life` 在 JavaScript 加载后跳转到新地址。`/404.html` 带 noindex，GitHub Pages 用它响应不存在的 URL。

## 维护入口

| 要修改什么 | 修改位置 | 自动更新的内容 |
| --- | --- | --- |
| 姓名、身份、简介、研究方向、论文、教育 | `src/data/content.jsx` | 可见正文、Person / ProfilePage 与论文列表结构化数据 |
| 各页面 SEO 标题、描述、类型与路由 | `src/data/seo.js` | title、description、canonical、分享卡片、JSON-LD、sitemap |
| canonical 主域名 | `src/data/site.js` | 全站 canonical、URL、robots 和 sitemap；还需协调 CNAME / DNS |
| FM Geometry 标题、作者、日期、链接 | `src/data/fmGeometry.js` | citation 标签与论文 JSON-LD |
| 照片 | `public/images/` 下的原图 | 构建自动生成 WebP、srcset 和尺寸 manifest |
| 检查逻辑 | `scripts/check-seo.mjs` | 本地、CI 和线上 SEO 验证 |

`index.html` 只保留共享页面骨架。不要在它或另一个 HTML 文件里维护第二份 SEO 描述。不要手写 `dist/sitemap.xml` 或把生成文件复制回 `public/`，新增路由应通过页面注册表进入 sitemap。

头像默认生成 256 / 512 宽度的 WebP，图库生成 640 / 1280 宽度。原图保留，网页按 `srcset` 选择合适资源。`public/images/optimized/` 与 `src/data/imageManifest.json` 为生成文件；图片变化后运行 `npm run images`，提交原图与更新的生成文件。哈希缓存减少重复压缩。纸面图像只记录尺寸，避免反复压缩。

图库支持 `{ src: '/images/gallery/example.jpg', alt: '准确的照片内容描述' }`。旧的字符串格式仍兼容；现有照片已补充与画面对应的 alt，新增照片同样应写有信息的描述，不编造地点或人物。

## 添加论文与博客

论文仍按首作者、已录用、其他预印本的既有排序维护。使用官方论文标题和正确作者列表；不要把预印本写成会议录用。只加真实可用的 PDF、DOI、代码与项目链接。结构化数据会根据可见列表生成，不自动猜测日期或期刊。

一个独立博客条目的示例（放入 `CONFIG.blogs`，不要给它设置 `href`）：

```js
{
    id: 'stable-article-slug',
    title: 'Your descriptive research title',
    date: 'YYYY-MM-DD',
    category: 'Research',
    excerpt: 'A specific summary matching the article content.',
    image: '/images/blog/your-image.jpg',
    imageAlt: 'A useful, factual description of the image',
    content: `## Research question

Your original Markdown article with verified examples and references.`,
}
```

它会生成独立 HTML、BlogPosting、分享卡片和 sitemap 条目。模板已提供 H1，正文从 `##` 开始。日期必须是真实发布日期。只有内容有实质更新时才填 `dateModified`，不要每次构建都刷新。既有 `id` 不随标题变更；如必须改 URL，需要安排重定向，不能只删除旧页。

`href` 条目只链接现有项目或外部内容，不创建重复博客正文。新项目页需要在 `src/data/seo.js` 添加路由，并在 App 中提供对应组件；构建会负责 HTML 与 sitemap，无需复制 HTML 模板。

## 每次更新与发布

1. 使用 Node 22（`.nvmrc`），在 `dev` 更新内容。全新环境运行 `npm ci`。
2. `npm run build`：自动优化图片、构建、预渲染并检查。验证 title / description、一个 H1、静态正文、canonical、JSON-LD、图片 alt 与尺寸、站内链接和锚点、资源、sitemap、robots 与域名验证文件。
3. `npm run preview`：查看首页、新增页面以及相关主题与交互。检查浏览器返回、直接访问和手机布局。SEO 自动检查不等于完整视觉验收或 Core Web Vitals 测试。
4. 提交源代码并推送 `dev`。GitHub Actions 的 “Build and SEO checks” 会运行相同检查；CI 不会自动部署，也不需要新增部署密钥。
5. `npm run deploy`：先执行带检查的 build，再按现有流程将产物发布到 `master`。失败的构建不会继续部署。
6. 等待 GitHub Pages 更新后运行 `npm run seo:live`。它检查真实 HTTP 页面及资源；CDN 仍返回旧版本时稍后重试。命令失败不能当作已成功发布。

### 发布回退

GitHub Pages 的发布历史在 `master`；源代码历史在 `dev`。需要回退时，在 `dev` 撤销导致问题的提交（保留历史），运行 build 和 preview，再部署。不要手工替换 `master` 的个别文件或只恢复 CNAME，以免源代码与线上版本不同。

## 搜索收录与持续观察

一次性设置需要站点所有者的账号：在 Google Search Console 验证域名并提交 `https://www.ziyangrao.com/sitemap.xml`；在 Bing Webmaster Tools 提交同一地址。本次代码工作没有登录这些平台或自动提交收录，也没有安装访客统计脚本。

发布新增重要页面后执行 URL 检查、实时测试与请求编入索引。确认 Google 选择的 canonical 与声明的一致。检查 www、非 www、HTTP 和 GitHub 默认域名的跳转；这涉及主机 / DNS 设置，不能仅靠 HTML 标签解决。

| 节奏 | 查看内容 | 采取的动作 |
| --- | --- | --- |
| 每次发布 | 线上检查、新页面 200、无缺图、无 noindex 误配置 | 修复后再请求收录 |
| 每周或有新论文时 | Search Console 收录、目标查询展示 / 点击 / CTR / 平均排名 | 先解决抓取问题，再改善内容和搜索摘要 |
| 每月 | 依赖审计、外部论文 / 代码链接、移动端 PageSpeed Insights | 根据失败项和测量结果安排更新 |
| 每学期或身份变更时 | 姓名、学校、职位、研究方向、CV、Scholar 链接 | 同步正文与元数据，避免旧身份残留 |

建议手动记录观察日期、页面、查询、展示、点击与采取的变化。不要一两天就频繁改标题；积累若干周数据后评估。这里准备的是检查工具和维护流程，没有配置后台定时任务。排名没有固定保证，外部作者主页、实验室和代码仓库的真实相关链接仍很重要。

## 依赖维护记录（2026-10-13）

已应用 npm 的兼容补丁，构建及检查通过。完整 `npm audit` 仍报告 12 项开发依赖告警（8 high、4 moderate），涉及 Vite / esbuild、Tailwind / glob / selector parser 和 gh-pages 的依赖链。报告数量会随着公告和依赖版本变化，实际状态以当天审计为准。

同日 `npm audit --omit=dev` 报告生产依赖告警为 0。

这些包用于构建、开发或部署，不是网页中运行的服务；告警仍应进入维护计划。开发服务器应仅绑定本机，不处理不可信项目输入。不要执行 `npm audit fix --force` 盲目升级：Vite 与 Tailwind 的跨版本迁移需要检查预渲染 API、PostCSS 插件和全部页面的布局。执行 `npm audit --omit=dev` 可单独查看生产依赖风险，但不能替代完整工具链审计。
