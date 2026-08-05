---
name: dongpeng-ui-design
description: Generate, review, and optimize Dongpeng enterprise UI pages using the repository DESIGN.md as the single Design System source. Use for Enterprise Application Shell, List Page, Dashboard, Form, UI compliance review, and RTM page generation tasks.
---

# Dongpeng UI Design Skill

## Purpose

Generate enterprise application pages that follow the Dongpeng Design System and review existing UI for compliance.

## Source of truth

Read [`../DESIGN.md`](../DESIGN.md) before every task. Do not duplicate, override, or invent Design System rules in this skill.

## Workflow

1. Read `DESIGN.md`.
2. Identify the Page Pattern and whether the task is an Enterprise Application or Brand Landing Page.
3. Select existing Components.
4. Apply Foundation tokens.
5. Validate the result against `DESIGN.md`.

## Generation priority

Foundation → Components → Patterns → Page

For Enterprise Applications, preserve the Application Shell, Tabs, Page Container, and the selected page Pattern.

## Required behavior

- Use existing tokens, components, and patterns.
- Follow Enterprise Application Shell rules for enterprise pages.
- Preserve formal brand Logo assets and existing protected creative assets.
- Validate color, typography, spacing, icon mapping, component states, and page structure before delivery.

## Forbidden behavior

- Do not create colors, radii, spacing, shadows, or tokens.
- Do not add meaningless Page Header icons.
- Do not modify brand Logos or generate replacement brand assets.
- Do not remove protected Hero animation or core creative visual assets.
- Do not substitute an Enterprise Application pattern with a generic dashboard or default component-library style.

## Prompt resources

- [Generate page](prompts/generate-page.md)
- [Generate dashboard](prompts/generate-dashboard.md)
- [Generate enterprise list page](prompts/generate-list-page.md)
- [Review UI](prompts/review-ui.md)

## Example

See [RTM order list](examples/rtm-order-list/README.md) for the first AI-generated enterprise list-page case.
