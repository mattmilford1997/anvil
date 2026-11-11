# Content changelog

## 2026-11-11

The contact form (`anvil-leads` on `/contact`) again posts attribution as hidden fields: `first_landing`, `first_referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`. Those values are captured on the first page view of the browser session and stored only in `sessionStorage` (`anvil_attr`). The referrer field is named `first_referrer` because Netlify Forms overwrites a field named `referrer` with the POST Referer header. Visible inquiry fields are unchanged.
