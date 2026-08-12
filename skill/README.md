# Dongpeng UI Design Skill

This Skill is the AI usage layer for the Dongpeng Design Intelligence Platform.

It references [`../DESIGN.md`](../DESIGN.md) as its only Design System source. The Skill does not copy or redefine design tokens.

## Version

- Design System Source: `DESIGN.md v3.4.0 Stable`
- Skill structure: `skill/`

## Structure

```text
skill/
├── SKILL.md
├── README.md
├── prompts/
│   ├── generate-page.md
│   ├── generate-dashboard.md
│   ├── generate-list-page.md
│   └── review-ui.md
└── examples/
    └── rtm-order-list/
```

## Capabilities

- Generate enterprise List, Dashboard, Detail, and Form pages
- Review UI against Dongpeng tokens, components, patterns, and governance rules
- Preserve formal brand assets and protected creative visuals

## Use

Read [SKILL.md](SKILL.md), then use a prompt template in `prompts/`.

### Example calls

```text
Use skill/SKILL.md to generate an Enterprise List Page for RTM 提货订单。
Use skill/SKILL.md to generate the Design Intelligence Platform Dashboard。
Use skill/SKILL.md and prompts/review-ui.md to review this page against DESIGN.md。
```
