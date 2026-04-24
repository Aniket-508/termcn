# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata

- **Project Name:** termcn
- **Date:** 2026-04-18
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Enter docs from homepage via primary navigation

- **Test Code:** [TC001_Enter_docs_from_homepage_via_primary_navigation.py](./TC001_Enter_docs_from_homepage_via_primary_navigation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/0b6d125f-2230-4377-90b2-03427e7915b3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC002 llms.txt renders as plain text and is non-empty

- **Test Code:** [TC002_llms.txt_renders_as_plain_text_and_is_non_empty.py](./TC002_llms.txt_renders_as_plain_text_and_is_non_empty.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/b813b36d-d27a-476e-826b-481e29cbb2a2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC003 Deep-link to theming docs and return to homepage via header

- **Test Code:** [TC003_Deep_link_to_theming_docs_and_return_to_homepage_via_header.py](./TC003_Deep_link_to_theming_docs_and_return_to_homepage_via_header.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/cf048caf-a622-4cd2-a3e5-1c9e9d3cf6ca
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC004 llms-full.txt renders a larger non-HTML text export

- **Test Code:** [TC004_llms_full.txt_renders_a_larger_non_HTML_text_export.py](./TC004_llms_full.txt_renders_a_larger_non_HTML_text_export.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/08f5533a-75b5-40ba-b332-cc834643538f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC005 Cross-navigate from homepage into installation docs

- **Test Code:** [TC005_Cross_navigate_from_homepage_into_installation_docs.py](./TC005_Cross_navigate_from_homepage_into_installation_docs.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/a2487f87-cc9d-4c47-9f9f-5d4e6a57151c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC006 Read registry documentation via direct deep link

- **Test Code:** [TC006_Read_registry_documentation_via_direct_deep_link.py](./TC006_Read_registry_documentation_via_direct_deep_link.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/b9207a21-eb92-4840-b043-7eb34ddc3bda
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC007 Copy-page control produces non-empty copied content

- **Test Code:** [TC007_Copy_page_control_produces_non_empty_copied_content.py](./TC007_Copy_page_control_produces_non_empty_copied_content.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/cc5f9f1b-7a8c-463a-8637-1320a6095e80
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC008 Docs open reliably from homepage header after scrolling

- **Test Code:** [TC008_Docs_open_reliably_from_homepage_header_after_scrolling.py](./TC008_Docs_open_reliably_from_homepage_header_after_scrolling.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/c50209cf-6e19-4adb-9655-2c6eff0fe159
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC009 Homepage sections are readable and stable after scrolling

- **Test Code:** [TC009_Homepage_sections_are_readable_and_stable_after_scrolling.py](./TC009_Homepage_sections_are_readable_and_stable_after_scrolling.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/caa95485-3658-4197-a387-41aa4a1aeec4
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC010 Docs table of contents is absent or minimal on short pages without breaking layout

- **Test Code:** [TC010_Docs_table_of_contents_is_absent_or_minimal_on_short_pages_without_breaking_layout.py](./TC010_Docs_table_of_contents_is_absent_or_minimal_on_short_pages_without_breaking_layout.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/d7cedcdd-f2f1-4e69-97a8-7d82505dc246
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC011 Per-page MDX markdown route returns raw markdown for docs

- **Test Code:** [TC011_Per_page_MDX_markdown_route_returns_raw_markdown_for_docs.py](./TC011_Per_page_MDX_markdown_route_returns_raw_markdown_for_docs.py)
- **Test Error:** TEST FAILURE

The markdown content route exists and returns content, but it does not match the rendered HTML docs page for the same slug.

Observations:

- The raw markdown route /llms.mdx/docs/installation/content.md contains the heading '# Installation'.
- The HTML docs page at /llms.mdx/docs/installation displays the heading '# Introduction'.
- The two pages' topics/headings differ, so the processed markdown does not align with the HTML docs page for this slug.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/f82c73e1-3b46-40f3-9beb-39233498ee0c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC012 Terminal theme selector updates the in-browser terminal renderer

- **Test Code:** [TC012_Terminal_theme_selector_updates_the_in_browser_terminal_renderer.py](./TC012_Terminal_theme_selector_updates_the_in_browser_terminal_renderer.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/78529d4c-f0de-48cf-bebd-594b4d3a62c6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC013 Search: Meta+C copies install command and Enter/click navigates

- **Test Code:** [TC013_Search_MetaC_copies_install_command_and_Enterclick_navigates.py](./TC013_Search_MetaC_copies_install_command_and_Enterclick_navigates.py)
- **Test Error:** TEST BLOCKED

The clipboard read cannot be performed in this test environment, so the test cannot verify the copied install command.

Observations:

- I triggered the copy shortcut (Ctrl/C or ⌘/C) after selecting the Badge registry item in the command menu, but reading navigator.clipboard.readText() is not permitted here (clipboard-read permission not granted).
- The app is currently at /docs/components/ink/typography/badge (the Badge docs page loaded), so navigation to the component docs appears to work.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/5144dee0-1d21-49db-8b76-d0f617542183
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

#### Test TC014 Analytics events fire for tracked copy actions

- **Test Code:** [TC014_Analytics_events_fire_for_tracked_copy_actions.py](./TC014_Analytics_events_fire_for_tracked_copy_actions.py)
- **Test Error:** TEST BLOCKED

The test cannot proceed because the automation environment does not provide a way to register an in-page network request listener or execute arbitrary page scripts needed to intercept POST requests to /\_vercel/insights/event.

Observations:

- The available automation actions do not include a way to inject page script or register network/XHR/fetch listeners.
- Without intercepting network requests from the page, I cannot capture or parse the analytics POST payloads required by this test.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f0df81e8-4e1f-42d0-8739-7ca1fc16688d/02559f6c-4d42-4406-b247-51931360c435
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.

---

## 3️⃣ Coverage & Matching Metrics

- **78.57** of tests passed

| Requirement | Total Tests | ✅ Passed | ❌ Failed |
| ----------- | ----------- | --------- | --------- |
| ...         | ...         | ...       | ...       |

---

## 4️⃣ Key Gaps / Risks

## {AI_GNERATED_KET_GAPS_AND_RISKS}
