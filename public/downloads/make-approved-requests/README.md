# Make.com starter kit: approved requests

By Mike Holp · AI Automation Station · Version 1 · November 5, 2026

Move newly added, approved sample requests from an Intake tab to a Work queue
tab in Google Sheets. Learn a polling trigger, a filter, and field mapping.

Full guide: https://www.ai-automation-station.com/guides/make-first-automation.html

## What you need

- Make.com and Google Sheets accounts.
- A new test spreadsheet. The data in this kit is fictional.
- Scenario runs use your Make account allowance; check your plan before scheduling.

## Files

- approved-requests.blueprint.json — the two connected Make modules and filter.
- intake.csv — headers and two sample requests for the Intake tab.
- work-queue.csv — headers only, for the Work queue tab.
- expected-first-run.csv — reference output to compare AFTER your first run.
  Do not import this into the destination: the scenario should create that row.

The blueprint needs your own Google connections and spreadsheet ID. It contains
no account credentials or real spreadsheet IDs. It has not been imported or run
in a live Make account; check the modules and pass the checklist before scheduling.

## 1. Set up the test spreadsheet

1. Create a new Google spreadsheet.
2. Use File > Import > Upload to import intake.csv. Choose Insert new sheet(s)
   and comma as the separator; rename the resulting tab to Intake.
3. Import work-queue.csv into another new tab; rename it to Work queue.
4. Both tabs must have Request ID, Task, Approved in A1:C1. Keep the columns in
   that order and remove blank rows between the headers and sample records.
5. Confirm Intake contains TEST-001 = yes and TEST-002 = no. Work queue should
   contain only the headers. Do not replace your spreadsheet when importing.

## 2. Import and connect the blueprint

1. Create a NEW, empty Make scenario. Leave scheduling off while setting up.
2. In the scenario editor's three-dot menu, choose Import blueprint, select
   approved-requests.blueprint.json, and save the import.
3. Open Google Sheets > Watch New Rows. Add or select your Google connection.
   Keep Search Method = Enter manually. Replace YOUR_TEST_SPREADSHEET_ID with
   the ID between /d/ and /edit in your spreadsheet's URL (not the whole URL).
   Set Sheet Name = Intake, headers = Yes, header range = A1:C1, and limit = 2.
4. Open Google Sheets > Add a Row. Select your Google connection and replace
   YOUR_TEST_SPREADSHEET_ID with the SAME spreadsheet ID. Set Sheet Name =
   Work queue, column range = A-Z (A1:Z1), value input = Raw, insert data =
   Insert rows. Only columns A-C are mapped.
5. Check the destination mappings: column A = trigger Request ID, B = trigger
   Task, C = trigger Approved. They reference columns 0, 1, 2 in the blueprint.
   If field labels refresh after connecting, select these trigger fields again.
6. Open the filter on the connection between modules. Check Approved (column C)
   uses the text Equal to operator and the comparison value yes.
7. For the trigger's starting position, choose All on this new test sheet so
   the first run includes both sample records. Save the scenario.

If your Make interface uses different labels or the import needs repair, follow
the full guide to build the same two modules and filter manually. Do not bypass
the filter just to make a run succeed.

## 3. Run and check

- [ ] Select Run once. Work queue contains exactly one data row: TEST-001,
      Draft a project brief, yes. Compare it with expected-first-run.csv.
- [ ] TEST-002 is absent from Work queue; the filter rejected its no value.
- [ ] Run once again without new input. No additional destination row appears.
- [ ] Append TEST-003, Check a new request, yes to Intake with no blank row.
      Run once. Work queue now contains TEST-001 and TEST-003, once each.
- [ ] Change the already processed TEST-002 to yes and run once. It should NOT
      appear: this trigger watches new rows, not edits to existing rows.
- [ ] Keep scheduling off after this exercise, or choose a schedule that fits
      your plan only after all checks pass. Review the run history.

## Troubleshooting and limits

- Nothing copied: check the selected spreadsheet, tab names, starting position,
  blank rows, Google connection, and the exact yes value without extra spaces.
- Both copied: check the filter is between Watch New Rows and Add a Row and
  compares column C, not Task or Request ID.
- Blank cells: check column order and remap the trigger outputs in Add a Row.
- Duplicates: resetting the trigger cursor, retrying a partial run, or copying
  records can replay rows. This exercise does not deduplicate by Request ID.
  Use a fresh spreadsheet and a fresh scenario for a clean restart.
- This is an append-only practice workflow, not a production approval system.
  Add duplicate protection and failure handling before using real requests.

## Sources

- https://help.make.com/blueprints
- https://apps.make.com/google-sheets-modules
- https://help.make.com/filtering

You may use and adapt this starter kit for your own builds.
