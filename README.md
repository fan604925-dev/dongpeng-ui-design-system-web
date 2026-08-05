# 东鹏 UI 视觉设计体系

## Dongpeng Design Intelligence Platform

```text
AI Design Engine
|
├── Design System (DESIGN.md)
├── Design Skill (skill/)
└── AI Generator
```

`DESIGN.md` is the single Design System source. The [Design Skill](./skill/SKILL.md) provides reusable generation and UI review workflows without duplicating design rules.

## 发布目录

- `public/`：Cloudflare Workers 静态资源
- `docs/`：GitHub Pages 静态资源（手机网络备用地址）

这是用于 GitHub 与 Cloudflare 部署的干净版本。

## 设计规范

前端、设计师与 AI 在新增页面或组件前，应先阅读 [DESIGN.md](./DESIGN.md)。

其中定义了东鹏通用的品牌色、语义色、字体、间距、圆角、图标和组件延伸原则，是本仓库的设计事实源。

- 网站文件位于 `public/`
- 不包含 ZIP、BAT、课程文件
- 不包含超过 Cloudflare 单文件限制的集团 PPTX 模板
- Cloudflare 部署命令：`npx wrangler deploy`
