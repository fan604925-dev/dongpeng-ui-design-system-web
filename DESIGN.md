---
version: "1.1.0"
name: "Dongpeng Universal Design System"
description: "东鹏通用设计基础：供设计师、前端与 AI 共同使用的视觉事实源。"
colors:
  primary: "#E61817"
  primary-hover: "#C91413"
  primary-active: "#A80F0F"
  primary-subtle: "#FFF5F5"
  on-primary: "#FFFFFF"
  text-primary: "#303133"
  text-secondary: "#606266"
  text-muted: "#909399"
  text-disabled: "#C0C4CC"
  canvas: "#F5F6F8"
  surface: "#FFFFFF"
  surface-subtle: "#FAFAFA"
  border: "#EBEEF5"
  border-strong: "#DCDFE6"
  success: "#34A853"
  success-subtle: "#F0F9F4"
  warning: "#FF9D37"
  warning-subtle: "#FFF7ED"
  error: "#E61817"
  error-subtle: "#FFF5F5"
typography:
  display-lg:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.25
  heading-lg:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.33
  heading-md:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
  heading-sm:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.375
  body-md:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.54
  label-md:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.43
  label-sm:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  data-lg:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.2
  data-md:
    fontFamily: "HarmonyOS Sans SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  full: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "16px"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "12px"
  tag-success:
    backgroundColor: "{colors.success-subtle}"
    textColor: "{colors.success}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "8px"
  alert-warning:
    backgroundColor: "{colors.warning-subtle}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "16px"
  metric-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# 东鹏通用设计体系

**文档定位：** 本文档是东鹏产品界面的设计事实源，面向设计师、前端与 AI。YAML 中的 token 为精确规范；正文说明其使用意图与边界。新增页面和组件应先复用本文件，而不是自行定义颜色、字号、间距或圆角。

**适用范围：** Web 管理端和通用业务页面的基础视觉规范。RTM 等业务系统可在此基础上补充业务模式，但业务专属尺寸、信息结构与组件细则不属于本文件。

**版本记录：**

| 版本 | 日期 | 负责人 | 变更摘要 |
| --- | --- | --- | --- |
| 1.1.0 | 2026-08-04 | 设计与前端共同维护 | 新增 5 个基础组件 token 与网页应用示例。 |
| 1.0.0 | 2026-07-30 | 设计与前端共同维护 | 建立品牌、色彩、字体、间距、形状、图标与延伸规则。 |

## Overview

东鹏界面应传达**专业、可靠、克制且高效**的企业级体验。信息密度可以较高，但必须依靠清晰的文字层级、留白、容器和分割线保持秩序。

品牌红用于最重要的行动、当前选中状态、关键完成信号和错误提示。它是强调色，不是页面背景色；普通文字、装饰和多个并列操作不应争夺品牌红的注意力。

## Colors

色彩只通过 YAML 中定义的 token 使用，不直接在页面中新增近似色值。

| 角色 | Token | 用途 | 禁止用途 |
| --- | --- | --- | --- |
| 品牌与主行动 | `primary` | 每屏一个最重要的确认/提交行动、当前导航和关键状态 | 大面积页面底色、普通图标、多个同权操作 |
| 品牌状态 | `primary-hover` / `primary-active` | 主行动的悬停和按下状态 | 作为新的独立品牌色 |
| 品牌弱化背景 | `primary-subtle` | 选中行、轻量提示、危险状态背景 | 正文文字背景或强调大段内容 |
| 文字 | `text-primary` / `text-secondary` / `text-muted` | 依次用于主要内容、辅助说明和低优先级元数据 | 用品牌红代替普通文字层级 |
| 画布与容器 | `canvas` / `surface` / `surface-subtle` | 页面底、主要卡片、分组或弱化区域 | 用重阴影人为堆叠层级 |
| 边框 | `border` / `border-strong` | 默认分隔、聚焦或更明确的边界 | 代替信息层级和留白 |
| 状态色 | `success` / `warning` / `error` | 成功、需关注、失败或危险的语义状态 | 只为装饰或区分普通模块 |

正文文本必须采用 `text-primary`、`text-secondary` 或 `text-muted`。`on-primary` 仅用于 `primary`、`primary-hover`、`primary-active` 等深色品牌底上的文字；`success` 和 `warning` 不承载白色小字号正文，以免对比度不足。

## Typography

默认字体为 `HarmonyOS Sans SC`；不可用时按 token 中的 `Microsoft YaHei`、`PingFang SC`、系统无衬线字体顺序回退。全局使用统一字体栈，禁止同一界面混用无明确语义的字体。

- 页面主标题使用 `heading-lg` 或 `heading-md`；卡片、区域标题使用 `heading-sm`。
- 默认正文使用 `body-md`；紧凑列表和说明使用 `body-sm`；控件和短标签使用 `label-md` 或 `label-sm`。
- 指标、金额、数量等关键数据使用 `data-lg` 或 `data-md`，数值需右对齐或采用等宽对齐策略以便比较。
- 中英混排、数字和单位保持同一 token 的字号与行高；单位应降低权重或使用辅助文字层级，不能抢占数据本身。
- 单屏建议最多使用三种字阶和三种字重。长标题可换行；表格、导航和操作标签应截断并提供完整内容提示。

## Layout

设计采用以 `4px` 为最小单位的节奏体系；只使用 `spacing` token 定义的 4、8、12、16、24、32、40px 间距。未定义的间距需先在设计评审中确认，再扩展 token。

- 桌面端优先：管理端保留信息密度和多列布局；较窄屏幕优先压缩边距、截断非关键文本或允许横向滚动，不自行将复杂后台改造成移动端堆叠页面。
- 页面使用 `canvas`，内容分组使用 `surface` 或 `surface-subtle`，相关信息用 `md`（16px）以上内边距建立边界。
- 同层级面板的间距必须一致；同一页面中，优先通过留白和分组表达关系，而非增加边框数量。
- 响应式断点、栅格列数和业务页面的固定高度由各业务规范补充，不在本通用文档中预设。

## Elevation & Depth

东鹏界面采用平面化的层级表达：页面画布使用浅灰色，主内容使用白色容器，边界使用细分割线。默认不使用明显投影。

只有浮层、拖拽对象或必须脱离上下文的临时界面可以使用轻微阴影；阴影只说明层级，不承担品牌装饰。优先顺序为：背景色差异、容器、留白、分割线，最后才是阴影。

## Shapes

默认矩形交互元素和紧凑容器使用 `rounded.sm`（4px），以保持企业级的利落感；需要更柔和的独立分组可使用 `rounded.md`（8px）；头像、状态点、圆形图标按钮使用 `rounded.full`。

同一页面不要混用多种无语义的圆角。除非有明确的品牌或业务需求，禁止使用超过 8px 的卡片圆角、胶囊式大容器或高度装饰化的渐变形状。

图标统一使用 Lucide 图标库，描边固定为 `2px`：行内控件、导航、表格和搜索使用 `16px`；快捷操作、告警与标题旁强调使用 `24px`。图标应表达动作或状态，不能用 emoji、Unicode 字符或手绘近似图形替代。

## Components

本版已提供 5 个基础组件的首批 token（主按钮、输入框、状态标签、警告提示、数据卡片），对应网页中的“DESIGN.md 应用示例”。其余组件仍按以下延伸原则新增：

1. 复用已有颜色、字体、间距和圆角 token；若现有 token 不足，先提出 token 变更，再实现组件。
2. 每个可交互组件必须定义默认、悬停、按下、禁用、聚焦与错误/选中等适用状态；状态通过语义 token 区分，不能只改变颜色深浅而忽略可访问性。
3. 所有文字、图标和可操作区域应满足可读性与键盘操作需求；关键文字与背景组合满足 WCAG AA 正常文本对比度（至少 4.5:1）。
4. 一屏仅保留一个视觉最突出的主行动；其他操作以次级、文字或菜单层级呈现。
5. 业务组件可在所属业务目录维护补充规范，但必须明确引用本文件的基础 token；不得覆盖全局 token 的语义。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 使用 `primary` 表达一屏最重要的行动或当前选中状态。 | 将品牌红用在所有按钮、标题、图标和装饰上。 |
| 从 `spacing` 选择间距，并让同层级面板保持一致。 | 为局部对齐随意使用 5、10、14、18px 等新值。 |
| 用字体层级、留白和浅色容器组织高密度信息。 | 用重阴影、粗边框和多个高饱和色制造层级。 |
| 使用指定字体栈和 Lucide 16px/24px、2px 描边图标。 | 混用 emoji、文字图标、不同线宽或无来源的 SVG。 |
| 在新增组件前补齐其所有交互与无障碍状态。 | 只绘制默认状态，或只靠颜色表达状态差异。 |
| 将 RTM 的专属规格保留在业务规范中，并引用本文件。 | 将单一业务页面的尺寸、布局和内容强行升级为品牌标准。 |

## Maintenance

- 设计基础变更先更新本文件，再同步 Figma 与前端实现；颜色、字阶、间距、圆角和语义变化必须由设计与前端共同确认。
- 每次变更更新版本记录，注明日期、负责人和影响范围；破坏性变更应提升主版本号或明确迁移说明。
- 提交前使用 `npx -p @google/design.md designmd lint DESIGN.md` 校验结构、token 引用与可检查的对比度。该命令在 Windows PowerShell 中使用 `designmd` 别名。
- 后续需要代码接入时，可从本文件导出 Tailwind/CSS token；在未完成评审前不得把导出产物视为新的设计事实源。
