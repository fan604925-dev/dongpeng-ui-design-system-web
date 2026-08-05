# Generate Enterprise List Page

Read `DESIGN.md` first and use the Enterprise List Page pattern.

Generate this fixed structure:

Application Shell → Tabs → Page Container → Page Header → Filter → Toolbar → Table → Pagination

Required checks:

- Keep Page Header as Title plus Description / Metadata, without a decorative title icon.
- Use Form Control left alignment in Filter.
- Use the custom operator Select and Date Range Picker interaction rules when relevant.
- Use 44px Table Header, 48px rows, semantic Status Tags, and `data-table` for numbers.
- Include Table Selection only when the page supports selection; hide Selection Toolbar when selectedCount is 0.
- Include all required Pagination Footer information.
