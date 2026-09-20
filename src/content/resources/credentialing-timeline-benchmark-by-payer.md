---
title: "Credentialing Takes 90 to 120 Days Because Nobody Is Watching It"
excerpt: "Credentialing runs 90 to 120 days per clinician per payer when unmanaged. Most of that is waiting nobody tracks. Here is where the days go."
lede: "Credentialing is commonly cited at 90 to 120 days per clinician per payer when nobody manages it, and most of that time is waiting that nobody is tracking. Here's where the days go, how the main payer types differ, and the three interventions that cut the parts you control."
summary:
  - "The average credentialing timeline is not a payer processing time. It is payer processing time plus application prep, plus bounce-backs, plus follow-up latency. The last two are yours to control."
  - "The commonly cited 90 to 120 days is not one number. It is 30 to 90 days of payer processing plus the days your own process adds before and after. The gap is the operational tax."
  - "Three things move the number: clean data at intake, automated submission where payers allow it, and a follow-up cadence that is measured in days, not weeks."
author: "matt-milford"
publishDate: 2026-11-03
category: "Blog"
icp: ["A", "B"]
pillar: "speed"
keyword: "credentialing timeline by payer"
tool: "benchmark-download"
faq:
  - q: "What is the credentialing timeline by payer?"
    a: "Payer processing alone is typically 30 to 90 days depending on the payer. End to end, including prep and follow-up, 90 to 120 days is the common average, and it can be cut substantially by controlling the parts that are not payer processing. Credentialing turnaround time is that full calendar, not the payer's queue alone."
  - q: "How long does credentialing take with a national payer?"
    a: "Payer processing alone is typically 30 to 90 days depending on the payer. End to end, including prep and follow-up, 90 to 120 days is the common average, and it can be cut substantially by controlling the parts that are not payer processing."
  - q: "What causes credentialing applications to be rejected?"
    a: "Most first-submission bounces are data mismatches: NPI, work history gaps, expired documents, and CAQH attestation status. These are preventable at intake."
  - q: "Can credentialing be automated?"
    a: "Application preparation and submission can be automated for many payers. Payer processing cannot. The gain is fewer errors and near-zero prep time, which shortens the total timeline and reduces bounces."
  - q: "What is the fastest way to get a clinician billing?"
    a: "Enrolling them on a roster under an entity that already holds the contract, rather than credentialing a new entity from scratch. That is typically weeks instead of months."
related: ["cost-of-credentialing-delays", "roster-add-vs-full-enrollment", "/platform/credentialing"]
sourceFile: "02_November_Credentialing.md"
calendarWeek: 5
dataReview: "cleared"
draft: false
---
Ask any founder how long credentialing takes and they will say "90 to 120 days." Ask them where those days go and the answer is usually "the payer." That is half true, and the half that is false is the half you can fix.

## Where the days actually go
A credentialing timeline has five segments:

1. *Intake to submission.* Collecting the clinician's license, DEA, board certification, malpractice history, work history, CAQH profile, and the 30 to 60 other fields each payer wants. In an unmanaged operation this takes days to weeks, and most of it is waiting on the clinician to send one more document.
2. *Submission to acknowledgment.* The payer confirms receipt. Some do this in a day. Some never do, and you find out by calling.
3. *Payer processing.* The part that is genuinely theirs: primary source verification, committee review, loading. Commonly cited at 30 to 90 days. It varies a lot by payer type.
4. *Bounce-backs.* The application comes back for a missing attestation, a mismatched NPI, a work history gap. Each bounce restarts some or all of segment 3.
5. *Approval to effective date.* Approved is not billable. The effective date can lag approval by weeks, and the roster may not update for another cycle.

The payer controls segment 3. You control 1, 2, 4, and 5. When nobody is watching, segments 1, 2, 4, and 5 add up to more days than segment 3. That is how 30 to 90 days of payer work turns into 90 to 120 days of calendar.

## The framework
A table of averages ages badly and hides the point. Use a table of control instead. For each stage, know who owns it, what usually stalls it, and what lever you have.

| Stage | Who controls it | What typically stalls it | Your lever |
|---|---|---|---|
| Intake to submission | You | Missing documents, expired malpractice certificate, CAQH not re-attested | One intake checklist, validated before anything is sent |
| Submission to acknowledgment | Shared | No confirmation from the payer, wrong submission channel | Confirm receipt within 7 days, every time |
| Payer processing | Payer | Committee calendars, primary source verification backlog | Status checks on a fixed cadence; escalate at the payer's stated turnaround |
| Bounce-backs | You | NPI mismatch, work history gaps, format errors | Fix the intake so the bounce never happens |
| Approval to effective date | Payer, then you | Roster load cycles, effective date never confirmed | Get the effective date in writing; send a test claim on day 1 |

## How payer types differ
Days vary by payer and by month, so treat any number you hear as a snapshot. The patterns are more durable than the numbers.

*National commercial payers.* The most standardized. Portal or fillable-PDF applications, predictable field structures, and a published process. Committee cadence is the main constraint. A roster-add under an existing contract moves much faster than credentialing a new entity.

*Blues plans.* Each state's Blue is its own company with its own application, committee, and quirks. Expect more manual steps, more paper, and more variance from state to state. Format bounces are common because the forms differ from the nationals.

*Medicaid MCOs.* State program enrollment is a prerequisite, then each MCO credentials separately. State-specific attachments, provider type mappings, sometimes notarization. Generally the slowest category and the one where sequencing matters most.

Two things follow. First, your rollout order should reflect this spread: get the fastest, highest-volume payers in first so revenue starts while the slower ones grind. Second, bounce rate is the biggest controllable variable. Every bounce costs weeks, and most bounces are data problems that a good intake process catches before submission.

## Three interventions that move the number
*1. Clean data at intake.* Most bounces trace to five fields: NPI mismatches between the clinician and the group, work history gaps over 30 days without explanation, expired malpractice certificates, CAQH profiles not re-attested, and license numbers that do not match the state board format. A checklist that validates these before submission removes most first-submission bounces.

*2. Automate submission where the payer allows.* A meaningful share of payer applications are fillable PDFs or portals with stable field structures. Anvil populates and submits those from a single validated record. Automation does not make the payer faster. It makes segment 1 nearly zero and removes the transcription errors that cause segment 4.

*3. Follow up in days, not weeks.* Payers do not proactively update you. An application with no status check for 30 days is an application that may have been sitting in a "needs info" queue for 28 of them. A workable cadence: status check at day 7, 14, 21, then weekly. It sounds obvious. Almost nobody does it consistently without a system.

## A worked example
Say you have 20 clinicians and 6 payers. That is 120 applications. If each one loses 2 weeks to a slow intake and another 2 weeks to a bounce, that is 4 weeks per application that the payer did not cause. A month of unbillable time across 20 clinicians is real money, and none of it was the payer's fault. Cut the intake to days and the bounces to a handful, and the same 120 applications finish closer to the payer's own processing time. The [cost of those delays](/resources/cost-of-credentialing-delays) compounds with every hire.

## The tracker problem
Most credentialing trackers are spreadsheets with a "submitted" date and a "status" column that says "pending." That tells you nothing. A useful tracker shows, per application: the segment it is in, days in that segment, last contact date, next action, and owner. That is how Anvil tracks every application, to the day, and it is the difference between finding a stalled application at day 8 and finding it at day 60.

## Next step

Get the enrollment stage checklist: the five stages, the fields that cause most bounces, and the follow-up cadence, on one page. Then see how [Anvil runs credentialing](/platform/credentialing) or [talk to us](/contact) about your rollout order.

---
