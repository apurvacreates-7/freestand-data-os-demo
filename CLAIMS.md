# Claims shown in the demo · verify with engineering before the meeting

Every integration, capacity and process claim that appears on screen, with where it appears. Tick each one or change the copy.

## Integrations

| # | Claim on screen | Where | Status |
|---|---|---|---|
| 1 | Existing CDP read: 70M profiles, nightly batch, 41 minutes | T1 s1, s2, T3 s1 | ☐ |
| 2 | Existing CDP writeback: enriched attributes, consent flags, cohort membership, every 6 hours | T1 s2, s7, s10, T3 s1 | ☐ |
| 3 | Existing CDP match rate 62.4% on phone, email and hashed IDs as fallback | T1 s2 | ☐ |
| 4 | Meta: Custom Audiences upload + Conversions API, est. match 78% | T1 s1, s10 | ☐ |
| 5 | Google: Customer Match via Data Manager API, est. match 64% | T1 s10 drawer | ☐ |
| 6 | Amazon DSP: advertiser audience upload, est. match 52% | T1 s1, s10 | ☐ |
| 7 | Blinkit: retail media audiences, coupons, serviceability aware, est. match 61% | T1 s10, s11, T3 s3 | ☐ |
| 8 | Zepto: retail media audiences, coupons, est. match 58% | T1 s10, T3 s3 | ☐ |
| 9 | Coupon redemption returned by partner webhook (Blinkit) within 7 days | T1 s11, s12 drawer | ☐ |
| 10 | WhatsApp re-engagement: 20 business chatbots, template approved, 94% reachable | T1 s10, T3 s1 | ☐ |
| 11 | Email: 90L sends per month, DKIM and DMARC done | T1 s10, T3 s1 | ☐ |
| 12 | SMS: DLT registered, 97% reachable | T1 s10 | ☐ |
| 13 | Ingest connectors: REST API (OAuth2, 5k rpm), webhook (HMAC), SFTP (PGP) | T1 s2 drawer | ☐ |
| 14 | Warehouse export: parquet daily to BigQuery, Snowflake or S3, no raw PII | T1 s12 drawer | ☐ |
| 15 | Consent withdrawal propagates to ad platforms in 24 h, existing CDP in 6 h, own channels immediately | T1 s8 drawer | ☐ |

## Validation and capacity

| # | Claim on screen | Where | Status |
|---|---|---|---|
| 16 | Video validation: 2,00,000 minutes provisioned | T1 s4, T3 s1 | ☐ |
| 17 | Image validation: 5,00,000 MB provisioned | T1 s4, T3 s1 | ☐ |
| 18 | Eight validation checks: OTP, dedupe, fraud score, pack-code uniqueness, receipt OCR, pincode serviceability, image AI, video AI | T1 s4 | ☐ |
| 19 | Fraud score thresholds: reject ≥ 0.20, review 0.12 to 0.20 | T1 s4 drawer | ☐ |
| 20 | Receipt OCR accept ≥ 0.85 confidence; manual review SLA 4 h | T1 s4 drawer | ☐ |
| 21 | 30L to 2Cr active contacts, elastic without re-platforming | T3 s1 | ☐ |
| 22 | 100 microsites and web apps | T3 s1 | ☐ |
| 23 | Two pipelines: enrichment and existing CDP, two-way | T3 s1 | ☐ |
| 24 | Platform uptime 99.9% monthly, ingestion latency < 5 s p95, cohort refresh hourly | T3 s1 drawer | ☐ |
| 25 | Environments: sandbox, production Mumbai (ap-south-1), DR Hyderabad 4 h RPO | T3 s1 drawer | ☐ |

## Identity, consent, security

| # | Claim on screen | Where | Status |
|---|---|---|---|
| 26 | Identity keys: phone primary, email, device ID, hashed IDs; merge threshold 0.90; reversible 30 days | T1 s3 | ☐ |
| 27 | DPDP consent ledger with purpose tags per brand, notice versioning | T1 s8 | ☐ |
| 28 | PII masked by default; unmasked only for data steward and auditor roles | T1 s8 | ☐ |
| 29 | Retention: raw events 13 months, profile while consented then erase in 30 d, ledger 7 years, exports 7 days | T1 s8 | ☐ |
| 30 | ISO 27001 certified, data residency Mumbai | T1 s8, s1 drawer | ☐ |
| 31 | SHA-256 hashing of phone and email before any export; names, addresses and inferred attributes never exported | T1 s10 | ☐ |

## Product and delivery

| # | Claim on screen | Where | Status |
|---|---|---|---|
| 32 | Adaptive form: skips known fields, max 3 questions per interaction, brand question bank of 74 approved questions | T1 s6, s7 | ☐ |
| 33 | Inferred enrichment from pincode: city tier, affluence band, quick-commerce zone | T1 s7 | ☐ |
| 34 | Ten mechanics live on day 1; new mechanic in 2 to 5 days, configuration only | T2, T3 s3 | ☐ |
| 35 | Mechanic-led messages reply at 3 to 5x plain broadcasts in Mondelez programmes | T1 s11 drawer | ☐ |
| 36 | Prebuilt cohorts: RFM, cross-brand affinity, lapsed, high intent, lookalike seeds, propensity | T1 s9 | ☐ |
| 37 | Frequency caps: WhatsApp 2 per 7 days per brand, SMS 1 per 7 days, quiet hours 21:00 to 09:00 | T1 s10 drawer | ☐ |

All numbers (counts, rates, costs, lift) are illustrative and synthetic. They are labelled as such on every screen.
