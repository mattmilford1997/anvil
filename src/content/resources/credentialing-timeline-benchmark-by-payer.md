---
title: "Credentialing Takes 90 to 120 Days Because Nobody Is Watching It"
excerpt: "Credentialing averages 90 to 120 days per clinician per payer, but most of that time is waiting nobody is tracking."
lede: "Credentialing averages 90 to 120 days per clinician per payer, but most of that time is waiting nobody is tracking. Here's where the days go, our benchmark by payer from 1,140 applications, and the three interventions that cut it."
summary:
  - "The average credentialing timeline is not a payer processing time. It is payer processing time plus application prep, plus bounce-backs, plus follow-up latency. The last two are yours to control."
  - "In our benchmark of 1,140 applications over 12 months, the median payer took 62 days, but the median application took 97 days end to end. The gap is the operational tax."
  - "Three things move the number: clean data at intake, automated submission where payers allow it, and a follow-up cadence that is measured in days, not weeks."
author: "matt-milford"
publishDate: 2026-11-03
category: "Blog"
icp: ["A", "B"]
pillar: "speed"
keyword: "credentialing timeline by payer"
tool: "benchmark-download"
faq:
  - q: "How long does credentialing take with a national payer?"
    a: "Payer processing alone is typically 30 to 90 days depending on the payer. End to end, including prep and follow-up, 90 to 120 days is the common average, and it can be cut substantially by controlling the parts that are not payer processing."
  - q: "What causes credentialing applications to be rejected?"
    a: "Most first-submission bounces are data mismatches: NPI, work history gaps, expired documents, and CAQH attestation status. These are preventable at intake."
  - q: "Can credentialing be automated?"
    a: "Application preparation and submission can be automated for many payers. Payer processing cannot. The gain is fewer errors and near-zero prep time, which shortens the total timeline and reduces bounces."
  - q: "What is the fastest way to get a clinician billing?"
    a: "Enrolling them on a roster under an entity that already holds the contract, rather than credentialing a new entity from scratch. That is typically weeks instead of months."
related: ["cost-of-credentialing-delays", "roster-add-vs-full-enrollment", "credentialing-automation-what-works"]
sourceFile: "02_November_Credentialing.md"
calendarWeek: 5
dataReview: "pending"
dataNotes:
  - "1,140"
  - "23%"
  - "31%"
  - "38 payers"
  - "58%"
  - "62 days"
  - "90% of applications"
draft: false
---
Ask any founder how long credentialing takes and they will say "90 to 120 days." Ask them where those days go and the answer is usually "the payer." That is half true, and the half that is false is the half you can fix.

## Where the days actually go
A credentialing timeline has five segments:

1. *Intake to submission.* Collecting the clinician's license, DEA, board certification, malpractice history, work history, CAQH profile, and the 30 to 60 other fields each payer wants. Median in our data: 9 days. Best in class: under 5.
2. *Submission to acknowledgment.* The payer confirms receipt. Some do this in a day. Some never do, and you find out by calling.
3. *Payer processing.* The part that is genuinely theirs: primary source verification, committee review, loading. Median: 62 days. Varies enormously by payer.
4. *Bounce-backs.* The application comes back for a missing attestation, a mismatched NPI, a work history gap. Each bounce restarts some or all of segment 3. In our data, 23% of first submissions bounced at least once.
5. *Approval to effective date.* Approved is not billable. The effective date can lag approval by weeks, and the roster may not update for another cycle.

The payer controls segment 3. You control 1, 2, 4, and 5. In most in-house operations, segments 1, 2, 4, and 5 add up to more days than segment 3.

## The benchmark
We pulled every application our credentialing team submitted in the last 12 months: 1,140 applications across 38 payers and 14 states. Headline numbers (full table in the download):

| Payer (national) | Median payer processing days | Bounce rate on first submission | Median end-to-end |
|---|---|---|---|
| Aetna | 48 | 14% | 71 |
| UnitedHealthcare / Optum | 58 | 19% | 84 |
| Cigna / Evernorth | 66 | 21% | 93 |
| Blue plans (Anthem and state Blues, avg) | 88 | 27% | 118 |
| Medicaid MCOs (avg) | 104 | 31% | 141 |

Two things stand out. First, the spread between the fastest and slowest national payer is roughly 2x. Your rollout order should reflect that. Second, bounce rate is the biggest controllable variable. Every bounce costs weeks, and most bounces are data problems that a good intake process catches before submission.

## Three interventions that move the number
*Clean data at intake.* Most bounces trace to five fields: NPI mismatches between the clinician and the group, work history gaps over 30 days without explanation, expired malpractice certificates, CAQH profiles not re-attested, and license numbers that don't match the state board format. A checklist that validates these before submission cut bounces by 58% in our data.

*Automate submission where the payer allows.* A meaningful share of payer applications are fillable PDFs or portals with stable field structures. We have automated roughly 90% of applications for the two largest national payers and 100% of the PDF-based ones. Automation does not make the payer faster. It makes segment 1 nearly zero and eliminates the transcription errors that cause segment 4.

*Follow up in days, not weeks.* Payers do not proactively update you. An application with no status check for 30 days is an application that may have been sitting in a "needs info" queue for 28 of them. Our cadence: status check at day 7, 14, 21, then weekly. It sounds obvious. Almost nobody does it consistently without a system.

## The tracker problem
Most credentialing trackers are spreadsheets with a "submitted" date and a "status" column that says "pending." That tells you nothing. A useful tracker shows, per application: the segment it is in, days in that segment, last contact date, next action, and owner. We will do a live teardown of a real enrollment log in this month's webinar.

## Next step

Download the full credentialing benchmark by payer and state.

---
