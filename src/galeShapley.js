/**
 * Gale-Shapley Stable Matching Algorithm
 * O(n²) — same algorithm used by the NRMP for medical residency matching.
 *
 * A matching is stable when no PNM and house mutually prefer each other
 * over their current assignment.
 */
export function galeShapley(pnms, houses, pnmPrefs, housePrefs) {
  const houseRank = {};
  houses.forEach(h => {
    houseRank[h.name] = {};
    const prefs = housePrefs[h.name] || pnms;
    prefs.forEach((p, i) => { houseRank[h.name][p] = i; });
    pnms.forEach(p => {
      if (houseRank[h.name][p] === undefined) houseRank[h.name][p] = prefs.length + 999;
    });
  });

  const nextProposal = {};
  pnms.forEach(p => { nextProposal[p] = 0; });

  const houseMembers = {};
  houses.forEach(h => { houseMembers[h.name] = []; });

  const freePNMs = [...pnms];
  let safety = 0;

  while (freePNMs.length > 0 && safety++ < 100000) {
    const pnm = freePNMs[0];
    const prefs = pnmPrefs[pnm] || houses.map(h => h.name);

    if (nextProposal[pnm] >= prefs.length) { freePNMs.shift(); continue; }

    const houseName = prefs[nextProposal[pnm]];
    nextProposal[pnm]++;

    const house = houses.find(h => h.name === houseName);
    if (!house) continue;

    const members = houseMembers[houseName];

    if (members.length < house.quota) {
      members.push(pnm);
      freePNMs.shift();
    } else {
      const worst = members.reduce((a, b) =>
        houseRank[houseName][a] > houseRank[houseName][b] ? a : b
      );
      if (houseRank[houseName][pnm] < houseRank[houseName][worst]) {
        houseMembers[houseName] = members.filter(m => m !== worst);
        houseMembers[houseName].push(pnm);
        freePNMs.shift();
        freePNMs.unshift(worst);
      }
    }
  }

  const pnmMatch = {};
  houses.forEach(h => {
    houseMembers[h.name].forEach(p => { pnmMatch[p] = h.name; });
  });

  return { pnmMatch, houseMatch: houseMembers };
}
