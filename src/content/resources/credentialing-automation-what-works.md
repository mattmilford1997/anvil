---
title: "What We Automated in Payer Applications, What We Didn't, and Why"
excerpt: "What Anvil automates in payer credentialing applications, what it deliberately keeps manual, and what automation can and cannot do to the timeline."
lede: "An honest account of automating payer credentialing applications: which formats and payers we automate, the ones we deliberately keep manual, where the errors come from, and what \"automation\" can and can't do to the timeline."
summary:
  - "We automate application preparation and submission for payers with fillable-PDF applications and portals with stable field structures, which covers most national commercial volume."
  - "Automation removes transcription errors, the leading cause of bounce-backs, and cuts prep time from days to minutes. It does not change payer processing time."
  - "We left three categories manual on purpose: payers with unstable portals, Medicaid MCOs with state-specific attachments, and any application that touches an exception in the clinician's history."
author: "matt-milford"
publishDate: 2026-11-24
category: "Blog"
icp: ["B"]
pillar: "depth"
keyword: "credentialing automation"
tool: "none"
faq:
  - q: "Can credentialing be fully automated?"
    a: "Preparation, validation, submission for stable payers, and tracking can be. Payer processing and exception cases cannot. Full automation claims usually mean the first list."
  - q: "Which payers are easiest to automate?"
    a: "Those with fillable PDF applications or portals with stable field structures. Large national commercial payers tend to be more stable than state Medicaid programs."
  - q: "Does automation speed up credentialing?"
    a: "It shortens the parts you control: prep, error rate, and follow-up latency. It does not shorten the payer's review. The net effect on total timeline is real but comes from fewer restarts, not faster committees."
  - q: "Should Medicaid credentialing be automated?"
    a: "Selectively. State-specific requirements and lower per-state volume make specialist handling more reliable for most MCOs."
related: ["credentialing-timeline-benchmark-by-payer", "cost-of-credentialing-delays", "roster-add-vs-full-enrollment"]
sourceFile: "02_November_Credentialing.md"
calendarWeek: 8
dataReview: "cleared"
draft: false
---
"We automate credentialing" is a phrase that means very different things. Here is exactly what it means for Anvil, including the parts we chose not to automate.

## The short version
An application to a payer has four jobs: collect the clinician's data, put it in the payer's format, get it to the payer, and chase it until it is loaded. Automation is good at the first three when the format is stable. It is good at the fourth everywhere. It is bad at judgment, and a payer application with a story behind it needs judgment.

| Job | Automated? | Why |
|---|---|---|
| Data collection and validation | Yes, for every payer | Same fields, same rules, every time |
| Application generation | Yes, for fillable PDFs and standard forms | Stable field structure, no judgment needed |
| Portal submission | Yes, for payers with stable portals | Field structures hold still long enough to map |
| Status tracking and follow-up | Yes, for every payer | Cadence and ownership are rules, not judgment |
| Unstable portals | No | Breaks more than it helps; revisited quarterly |
| Medicaid MCOs | Mostly no | State-specific attachments and mappings |
| Exception histories | No | Needs a narrative a human writes |

## What we automated
*Data collection and validation.* A single intake that captures every field any payer will ask for, validates formats against state board patterns, checks CAQH attestation status, flags work history gaps over 30 days, and checks document expiration dates. Most bounce-backs are caught here before anything is submitted. This is the highest-value piece and the least glamorous.

*Application generation.* Fillable PDF applications and standardized forms are populated automatically from the validated record. If a payer accepts a PDF, Anvil generates it. That includes the federal programs that still run on forms.

*Portal submission for stable payers.* For the large national payers whose portals have consistent field structures, Anvil submits programmatically. The applications that fall out are the exception categories below, not the payer's fault.

*Status tracking.* Every application has a segment, days in segment, last contact, next action, and owner. Follow-up tasks generate automatically at day 7, 14, 21, and weekly after. The person doing follow-up opens a list, not a spreadsheet.

## What we left manual, on purpose
*Payers with unstable portals.* Some portals change structure often enough that automation breaks more than it helps. A field moves, a required attachment appears, and a script submits something wrong or nothing at all. For those payers a specialist submits by hand and we revisit quarterly.

*Medicaid MCOs.* State Medicaid programs and their MCOs often require state-specific attachments, provider type mappings, and sometimes wet signatures or notarization. The variance is high and the volume per state is lower. A specialist who knows that state's program is faster and more reliable than a script. The intake, validation, and tracking still run on the platform. The submission does not.

*Exception histories.* Any clinician with a malpractice claim, a license action, a board complaint, or an unexplained gap gets a human-prepared application with a narrative. Automating that is how you get a denial that takes months to reverse.

## What changed
Three things, in order of size.

1. *Fewer bounces.* Transcription errors were the leading cause of first-submission bounce-backs: a digit off in an NPI, a license number in the wrong format, a date typed differently on two forms. When the application is generated from one validated record, that whole class of error goes away. What remains are genuine data problems, and the intake catches most of those too.
2. *Prep time collapsed.* Preparing an application by hand is a matter of days, mostly spent chasing documents and retyping the same fields into a new layout. Generated from a clean record, it is a matter of minutes.
3. *Faster follow-up.* Follow-up used to depend on someone remembering. Now it is a task with a due date. Stalled applications get found in the first week, not the second month.

The total timeline moves because of these three, and mostly because of the first. A bounce restarts the payer's clock. Removing the bounce removes the restart.

## What didn't change
Payer processing time. No automation on our side makes a committee meet sooner. The commonly cited 30 to 90 days of payer review is still the payer's. Anyone who tells you their software makes payers faster is describing better follow-up, which is worth having, but is not the same thing.

## A worked example
Say you have 20 clinicians and 6 payers. That is 120 applications. If 4 of the 6 payers take PDF or stable-portal submissions, about 80 applications generate and submit from the intake record with no retyping. The other 40 are Medicaid and a Blues plan, and a specialist handles those with the same validated data and the same tracker. Your credentialing team's hands-on time goes into 40 applications instead of 120, and the 40 that need judgment get it.

## Why this matters for behavioral health
Behavioral health rosters turn over faster than most specialties, and the mix of commercial and Medicaid makes the application volume higher per clinician. An operation that spends days per application per payer cannot keep up with a growing group. Automating the standard cases is what frees specialists to handle Medicaid and exceptions well. That is the whole design: machines for the repeatable, people for the rest, and one tracker over both.

## Next step

See how [Anvil runs credentialing](/platform/credentialing), or read the [enrollment stage framework](/resources/credentialing-timeline-benchmark-by-payer) for where the days go.
