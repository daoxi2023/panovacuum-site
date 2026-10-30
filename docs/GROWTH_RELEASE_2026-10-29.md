# 获客承接、产业合作与全站页眉上线记录

日期：2026-10-29。当前阶段：网站接收与公开内容已上线，真实获客成交及产业资本融资尚未完成。

## 已上线

- 所有26个中英文业务页面统一页眉：中美两电话、邮箱和完整地址。手机显示主触点，并可展开查看全部信息。
- 可实际提交的中英文询价和产业合作表单，同域服务端接收后保存到帕诺专用数据库，保存成功才显示编号；没有接入领拓客户库。
- 公开产业合作页、无财务数据的工厂能力介绍、隐私说明。
- 定制真空腔体、精密零件、真空密封焊接三类中英文制造服务页，首页、导航和网站地图均可到达。
- 本机跟进工具支持查看新线索、导出私有表格、更新阶段与下一动作，并保留审计记录。

入口：https://panovacuum.com/zh/request-a-quote/ 、https://panovacuum.com/zh/industrial-partnerships/ 、https://panovacuum.com/en/industrial-partnerships/ 。

## 验收证据

- 最终生产构建及静态导出通过，类型检查通过。
- 接收、幂等、并发限流、非法来源、流式超限、数据库故障和导出保护等22项测试通过。
- 独立代码审查通过；26个业务页面878个站内引用及锚点通过；内部资料、平台配置及保护密钥不进入公开产物。
- 本机浏览器实际提交中文询价、英文产业合作，获得真实接收回执；手机页眉展开后完整显示联系方式。
- 正式部署包含服务端Functions bundle，平台确认production及success，旧成功版本保留。
- 正式域名26个中英文业务页面均返回200，完整联系栏生效。
- 正式接收端合成测试：询价保存成功；产业合作保存成功；同一请求重试返回同一编号，不重复记录；受保护数据库核对两条记录存在。
- 两条正式环境合成测试已通过真实跟进工具标记closed并保留审计，不计入真实业务线索。公开GET请求返回405，不公开记录。

## 未完成事项与限制

- 邮件/即时消息提醒尚未配置。目前须用受保护的本机工具查看新增线索，不能声称收到线索后会自动通知。
- 在线图纸上传未开放，图纸及保密资料另行沟通。
- 真实联系人核实、外联、报价推进、采购承诺、投资意向及尽调仍是业务待办，不能由网页接通替代。
- 内部10条产业资本候选沿用旧桌面线索，未刷新、未联系；中英文外联草稿未发送。财务、股权、客户名单及内部融资材料没有上传官网。
- 最终线上截图复核因浏览器连接连续超时未完成；本机电脑/手机实看、正式页面访问、服务端保存及数据库读回已验证。
- Jev外部发布评估被自动审批阻止，未发送这些运营信息；本轮以本机独立审查、22项测试和正式站实测验收，未伪造外部判决。

## 业务跟进工具

在 /Users/mac/panovacuum-site/ 运行：

- 查看新增：node scripts/inquiries.mjs list --status new
- 查看到期跟进：node scripts/inquiries.mjs list --due
- 导出：node scripts/inquiries.mjs export --output 私有文件的绝对路径
- 更新：node scripts/inquiries.mjs set-status 接收编号 contacted --next-action 具体下一步 --follow-up YYYY-MM-DD

凭据仍从现有本机secret文件读取；.pano-platform.local.json只含平台标识并被忽略。导出内容是客户资料，应放私有目录。

内部工作包：docs/growth/GROWTH_READINESS_2026-10-28.md、OUTREACH_PACK_EN_ZH.md、CAPITAL_PIPELINE.csv。均已被版本控制忽略，不在public/out。知识库由DSH管理，本轮未修改SecondBrain。

## 发布与回滚

当前固定版本：https://a27d9a77.pano-vacuum.pages.dev
旧成功版本：https://a9a0eeb3.pano-vacuum.pages.dev

回滚：Cloudflare控制台 → Workers & Pages → pano-vacuum → Deployments → 选择上述旧成功版本 → Rollback。回滚只切换站点版本，保留新增数据库及已接收记录，不清空线索。源码文件备份保存在本轮工作副本private/release-2026-10-29/source-before/。

后续发布须使用包含functions编译的Cloudflare Wrangler流程，不能仅上传out到GitHub静态Pages来代替；既有GitHub流程不会部署接收后端。本次没有推送GitHub。

- author: codex
