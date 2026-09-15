---
title: "What We Automated in Payer Applications, What We Didn't, and Why"
excerpt: "An honest account of automating payer credentialing applications: which payers and formats we automated, the ones we deliberately left manual, the error."
lede: "An honest account of automating payer credentialing applications: which payers and formats we automated, the ones we deliberately left manual, the error rates before and after, and what \"automation\" can and can't do to the timeline."
summary:
  - "We automated application preparation and submission for roughly 90% of applications to the two largest national payers, and 100% of applications that are fillable PDFs or standardized forms."
  - "Automation removed transcription errors, which were the leading cause of bounce-backs, and cut prep time from days to minutes. It did not change payer processing time."
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
dataReview: "pending"
dataNotes:
  - "23%"
  - "90% of applications"
draft: false
---
"We automate credentialing" is a phrase that means very different things. Here is exactly what it means for us.

## What we automated
*Data collection and validation.* A single intake that captures every field any payer will ask for, validates formats against state board patterns, checks CAQH attestation status, flags work history gaps, and checks document expiration dates. Most bounce-backs are caught here before anything is submitted.

*Application generation.* Fillable PDF applications and standardized forms are populated automatically from the validated record. This is 100% of the PDF-based payers we work with, including TRICARE.

*Portal submission for stable payers.* For the two largest national payers, whose portals have consistent field structures, we submit programmatically for roughly 90% of applications. The remainder fall into the exception categories below.

*Status tracking.* Every application has a segment, days in segment, last contact, next action, and owner. Follow-up tasks generate automatically at day 7, 14, 21, and weekly after.

## What we left manual, on purpose
*Payers with unstable portals.* Some portals change structure frequently enough that automation breaks more than it helps. We revisit quarterly.

*Medicaid MCOs.* State Medicaid programs and their MCOs often require state-specific attachments, provider type mappings, and sometimes wet signatures or notarization. The variance is high and the volume per state is lower. A specialist who knows that state's program is faster and more reliable than a script.

*Exception histories.* Any clinician with a malpractice claim, a license action, a board complaint, or an unexplained gap gets a human-prepared application with a narrative. Automating that is how you get a denial that takes months to reverse.

## What changed
Before automation, first-submission bounce rate across our applications was roughly 23%. After, 9%. Application prep time went from a median of 6 days to under an hour. End-to-end median timeline dropped by 26 days, almost entirely from fewer bounces and faster follow-up.

## What didn't change
Payer processing time. No automation on our side makes a committee meet sooner. Anyone who tells you their software makes payers faster is describing better follow-up, which is worth having, but is not the same thing.

## Why this matters for behavioral health
Behavioral health rosters turn over faster than most specialties and the mix of commercial and Medicaid makes the application volume higher per clinician. An operation that spends days per application per payer cannot keep up with a growing group. Automating the standard cases is what frees specialists to handle Medicaid and exceptions well.
