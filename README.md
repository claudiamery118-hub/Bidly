# 🎀 BidLy — Sorority Recruitment Matcher

A multi-role web app for sorority recruitment that uses the **Gale-Shapley stable matching algorithm** to match PNMs with houses — the same algorithm used by the NRMP for medical residency placement.

## Roles

| Role | Access |
|------|--------|
| 🌸 **PNM** | Rank houses by preference |
| 🏛 **Recruiter** | Rank PNMs, see where your house stands on PNM lists |
| ⚖️ **Panhellenic** | Manage all houses/PNMs, oversee rankings, run the match |

## Tech Stack

- **React 18** — component-based UI, role-based routing
- **Gale-Shapley algorithm** — O(n²) stable matching in pure JS
- **CSS variables** — custom design system, no UI library

## Getting Started

```bash
npm install
npm start
```

## Deploy (free)

```bash
npm install -g vercel
vercel
```

## Resume Bullet

> *"Built a multi-role React app for sorority recruitment implementing the Gale-Shapley stable matching algorithm (O(n²)). Features role-based access control for PNMs, house recruiters, and Panhellenic admins — same algorithm used by the NRMP for medical residency matching."*

## Algorithm

Gale-Shapley guarantees a **stable match** — no PNM and house mutually prefer each other over their current assignment. The result is PNM-optimal. Runs in O(n²).
