# FM Geometry SEO：实现与发布步骤

目标页面：https://www.ziyangrao.com/fm-geometry/

## 目标搜索词

优先面向国际研究者优化英文。以下按内容相关性选择，并未验证搜索量或竞争程度。

| 层级 | 关键词 | 页面承接内容 |
| --- | --- | --- |
| 优先 | 正式论文全名、展示标题、arXiv 2607.27933 | 正文、引用、论文元数据 |
| 核心 | flow matching uncertainty | title、简介、方法章节 |
| 核心 | VLA failure detection | title、简介、视频章节 |
| 细分 | denoising acceleration、uncertainty estimation in vision-language-action models | 方法、理论、实验证据 |
| 补充 | cost-free uncertainty proxy、online robot failure detection | 贡献、演示、局限 |

论文名称和细分方法词适合作为最初目标。更宽泛的 “flow matching” 竞争大、搜索意图不同，应根据实际展示和点击数据决定是否拓展。

## 已实现

- 首页与项目页在构建时输出真实正文，浏览器加载后由 React hydration 恢复交互，抓取无需依赖 JavaScript 渲染。
- 项目页 title 与 description 明确说明研究问题、方法和应用；保持现有展示标题，并在正文和元数据中补齐 arXiv 正式标题。
- 添加六位作者、首次提交日期 2026-07-30、PDF 链接与 arXiv ID 的 citation 元数据。信息已对照 arXiv 摘要页核验。
- 添加与可见内容一致的 ScholarlyArticle JSON-LD，关联论文、作者与 PDF。这帮助识别内容，不保证排名、富媒体结果或 Google Scholar 单独收录。
- 添加 sitemap.xml、robots.txt，并为首页补 canonical。项目页沿用 www 域名和尾部斜杠作为 canonical。
- 首页 Selected Publications 的论文标题直接链接项目页，减少仅通过 Blog 按钮发现页面的依赖。
- 简介展开 vision-language-action (VLA)，方法标题使用 denoising acceleration 和 flow matching uncertainty，保持文字自然且符合实际研究内容。
- 图像声明尺寸以预留空间，首图优先加载，其余方法图延迟加载。视频仍按需加载。尚未实测 Core Web Vitals。
- 补齐社交分享信息。Open Graph / Twitter 标签用于分享展示，不是独立的搜索排名加分项。

## 发布与收录

1. 本地检查 `npm run build`，再用 `npm run preview` 查看项目页、首页、`/#blog`、深浅色主题以及图表和视频切换。
2. 按仓库现有流程部署：`npm run deploy`。该命令会构建并更新 GitHub Pages 的 master 分支；本次本地 SEO 改动尚未部署。
3. 发布后确认项目页为 HTTP 200，查看网页源代码时能看到论文正文；检查 `/robots.txt` 与 `/sitemap.xml` 均返回 200。
4. 在 Google Search Console 验证域名资源，提交 `https://www.ziyangrao.com/sitemap.xml`，对项目页执行 URL 检查、实时测试和请求编入索引。检查“用户声明的 canonical”与“Google 选择的 canonical”是否一致。
5. 在 Bing Webmaster Tools 提交相同 sitemap。如果主要面向中文搜索，再单独评估百度收录和有实质内容的中文解读页。
6. 核验 `http`、非 `www` 与 GitHub 默认域名到主域名的重定向，避免同一内容有多个可访问版本。canonical 是提示，重定向也需要主机/DNS 配置配合；本次没有修改 DNS。

引用元数据中的 PDF 托管在 arXiv。Google Scholar 通常会优先或合并显示 arXiv 版本，不能以项目页获得一个独立 Scholar 条目作为成功标准。

## 提升排名的后续工作

- 在代码仓库 README / About、arXiv 的适用链接字段、作者主页和实验室论文列表中添加该项目页链接。使用准确的论文标题或项目名作链接文字。外部资源需要在相应账号或仓库中更新，本次未修改。
- 面向 “flow matching uncertainty” 写一篇真正解答问题的技术解读：为何单轨迹能够给出信号、accel 如何计算、如何接入 CUSUM、它何时失效。用例与代码应经过核验，再链接回项目页；不要为同义关键词批量造页面。
- 用 Search Console 记录查询、展示、点击、CTR 和平均排名，先确认收录，再观察哪些词已有展示。收录后按周查看，积累约 4–8 周数据再调整标题；这个时间窗用于观察，不是排名承诺。
- 用 PageSpeed Insights 检查移动端 LCP、INP、CLS。如果共享 JS 或首图成为瓶颈，再基于测量拆分资源和优化图片，不凭猜测重构。

成功标准应分开看：页面可抓取、被收录、目标查询获得展示、最终带来论文与代码访问。仅添加 sitemap 或请求索引不会保证排名靠前。
