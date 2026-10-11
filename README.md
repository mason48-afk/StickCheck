# StickCheck

Static controller diagnostic application. `dist/` is the deployment root. No build or runtime dependencies.

## Verification

Run `node test.mjs` and `node --check dist/app.mjs`. Physical controller and browser visual QA remain required; no compatible browser automation was available during initial creation.

## Public launch work

- The existing Site is public. Choose and connect a custom domain.
- Test real USB/Bluetooth controllers in desktop Chrome/Firefox/Safari; test non-standard mapping and controller disconnects.
- Confirm ownership/contact information for the public business, add a contact channel, and review privacy details for the final hosting/ad configuration.
- Submit the public domain to Search Console. Add canonical URLs and sitemap for the final domain.
- Apply for AdSense using the site owner's account. No ad code or fabricated publisher IDs are present. Add consent handling and truthful privacy disclosures when ads are activated. Keep ads outside input/test controls.

## Monetization and SEO (updated 2026-10-11)

Repair-provider links were replaced by Amazon.com shopping categories. Affiliate links and ads remain inactive pending the owner's real identifiers and approval. Edit `monetization.json` and run `node configure-monetization.mjs` to configure authorized IDs. This idempotent script adds/removes affiliate tags, nearby paid-link labels, footer disclosures, AdSense verification metadata, ads.txt, and approved display placements. No publisher ID or tracking tag is fabricated.

Read `SEO-NOTES.md` for keyword evidence, limitations and activation requirements. Technical SEO includes crawlable Q&A, canonical URLs, robots and sitemap. The existing Site is public. Google approval and monetization configuration are still needed.

Tests: `node test.mjs`, `node integration-test.mjs`, `node monetization-test.mjs`, `python seo-check.py`, and `node --check dist/app.mjs`. No physical-controller or visual browser verification was available.

## Measurement design

Gamepad axes are read through requestAnimationFrame. A 3-second settling countdown precedes a 10-second resting sample. Approximate 15 ms minimum interval; not a hardware polling-rate measure. Losing focus/visibility or controller connection cancels sampling. Four distinct valid axes required. Metrics: vector mean offset, radial p95, radial maximum, RMS distance from mean. Threshold default 10% is illustrative and never presented as a manufacturer limit. Device IDs are not serial numbers. Firmware deadzones can hide physical motion.

Baseline JSON is validated; untrusted strings are rendered with textContent. Demo results are segregated and cannot be saved/imported as real baselines. Storage failures fall back to in-memory use with export instructions. All diagnostics are local.

## GitHub handoff

Upload the contents of this folder to the repository root. Keep dist/ intact; it is the static hosting publish directory. No build command is required. Uploading to GitHub alone does not deploy the website.

The custom domain and language selector are still pending. Canonical URLs, sitemap and robots.txt currently refer to the existing StickCheck URL; update them when a new domain is connected.

This export excludes Git history, hosting-provider project metadata, and SSH credentials.
