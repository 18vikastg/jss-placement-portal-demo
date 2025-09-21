Parsing assumptions and notes for `placement_drives_2022_2023.csv`

- Dates were normalized to DD/MM/YYYY where possible. Blank dates left as empty string.
- Rows with multiple entries for the same company (e.g., Accenture, TCS, LTI, Mercedes) were split into separate rows with suffixes (e.g., `4-A`, `9-A`, `15-1`).
- For rows where TotalOffers wasn't explicitly provided but department counts were given, `TotalOffers` was used as provided by the dataset when available; otherwise it's computed as the sum of department columns if needed in future versions.
- Some rows had ambiguous formatting in the raw input; I used reasonable splits and preserved original CTC values when present.
- The record for `Vistas Learning` contained `PG=32` and `TotalOffers=32` in the source; this was preserved though it looks like a large number and may be a combined tally.
- The `Target` row had no date; the Date field is left blank for that row.
- Large drive entries (e.g., Toyota repeated) were split into separate rows with an `-A` suffix for clarity.

If you want a different parsing rule (for example always recomputing `TotalOffers` from department columns, or dropping internship-only drives), tell me and I will regenerate the CSV accordingly.

Additional notes for appended 2021–2022 rows:

- Several rows include multiple CTC values or ranges (for example `4.5 & 6.5`, `5.5 to 6`, `16 & 20`). These are preserved as semi-colon or range strings in the `CTC_LPA` field to avoid losing original information. If you prefer a single numeric value, indicate a rule (min, max, average, or primary package) and I'll normalize accordingly.
- Some rows had missing dates — these are left blank in the `Date` column.
- The row labelled `TOTAL` at the end appears to be a batch summary; I preserved it as row `121` with aggregated counts. If you prefer to remove the `TOTAL` row from the drive-level CSV and keep it only in the summary JSON, I can do that.
- Several low/zero-offer rows and placeholder rows (company listed but no offers) were included as-is. If you want to drop rows where `TotalOffers` is 0, I can filter them out.

Next actions available:
- Normalize ambiguous `CTC_LPA` values to a single numeric column (choose min/max/mean/primary).
- Recompute `TotalOffers` as the sum of department columns for all rows and overwrite the `TotalOffers` column.
- Remove the final `TOTAL` row from the CSV and recompute aggregated totals solely in the analysis script.

Notes for appended 2020–2021 rows:

- Several rows use `ND` (Not Disclosed) for `CTC_LPA` — these are preserved as `ND` and treated as non-numeric by the analysis script.
- Where `Branches` information was provided, it was preserved in the CSV `Notes` field (last column). This keeps the original context for later filtering or display.
- A `TOTAL` row (row 173) was preserved for the 2021 batch; it aggregates department totals. If preferred, I can remove all `TOTAL` rows from the drive-level CSV and compute aggregates only via the analysis script.
- Some rows contain multiple dates or messy date ranges (e.g., "19/26 Feb 2020"); dates were normalized when obvious; otherwise left as provided.


