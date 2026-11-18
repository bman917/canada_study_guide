# Provincial Economy Questions: Accuracy Audit

**Date:** 2026-02-17
**Source cross-referenced against:** `src/data/discover-canada/11-regions.md`

---

## Questions with Issues

---

### Q236 - New Brunswick: INCORRECT ANSWER

- **Marked correct:** Forestry, agriculture and mining
- **Source (`11-regions.md:85`):** "Forestry, agriculture, **fisheries**, mining, food processing, tourism"
- **Problem:** The discover-canada source lists fisheries as the 3rd industry, and mining 4th. The traditional citizenship test answer (per the Richmond Public Library keys, which are listed as a source) is "forestry, agriculture, and fisheries" - not mining. The quiz swaps fisheries for mining.
- **Verdict: Wrong answer.** Should be "Forestry, agriculture and fisheries."

---

### Q252 - Saskatchewan: IMPRECISE ANSWER

- **Marked correct:** Farming, mining and natural gas
- **Source (`11-regions.md:158`):** "oil **and natural gas** production" (plus potash/uranium mining)
- **Problem:** The source groups "oil and natural gas" together. The answer drops oil entirely and only lists "natural gas." The official citizenship test answer is typically "farming, mining, and oil and gas" or includes potash specifically.
- **Verdict: Partially inaccurate.** Should be "Farming, mining and oil and gas."

---

### Q242 - Nova Scotia: QUESTIONABLE

- **Marked correct:** Coal mining, forestry and agriculture
- **Source (`11-regions.md:71`):** "**Shipbuilding, fisheries**, shipping, coal mining, forestry, agriculture, offshore oil and gas"
- **Problem:** The source lists shipbuilding and fisheries *first*, before coal mining. Option A ("Fisheries, shipbuilding and forestry") is arguably better supported by the source. However, the official citizenship test answer from the Richmond Public Library keys is "coal mining, forestry and agriculture" - so this matches that source.
- **Verdict: Likely correct per official test keys, but misrepresents what the discover-canada source emphasizes most.**

---

### Q222 - Alberta: UNCONFIRMED

- **Marked correct:** Oil, agriculture, and forestry
- **Source (`11-regions.md:173-174`):** Mentions oil/gas and agriculture explicitly. **Forestry is not mentioned for Alberta.**
- **Problem:** The discover-canada source only names two of the three industries listed in the answer. The traditional citizenship test answer does include forestry (northern Alberta has boreal forest), but it is absent from the source file.
- **Verdict: Cannot confirm from this source. Likely still correct per the official guide, but the source material is incomplete for Alberta.**

---

### Q229 - British Columbia: PARTIALLY UNCONFIRMED

- **Marked correct:** Forests, fish and water
- **Source (`11-regions.md:195-196`):** Explicitly mentions forestry ("50% of goods produced") and fishing. **"Water" is not mentioned as a resource.**
- **Problem:** "Water" as a resource is not defined in the source. It may refer to hydroelectric power or Pacific waterway access, but neither is stated explicitly for BC.
- **Verdict: Forests and fish are confirmed. "Water" is not supported by the source text as written.**

---

## Questions That Are Accurate

| Question | Answer | Source Support |
|---|---|---|
| **Q233 - Manitoba** | Agriculture, mining and hydro-electric power | Direct word-for-word match (`11-regions.md:143`) |
| **Q239 - Newfoundland** | Fisheries, oil and gas extraction | Confirmed (`11-regions.md:46`) |
| **Q249 - Quebec** | Pulp and paper, forestry and hydro-electric power | Confirmed (`11-regions.md:109-110`) |

---

## Recommended Fixes

1. **Q236 (New Brunswick):** Change option 3 from "Forestry, agriculture and mining" to "Forestry, agriculture and fisheries" and update `correctIndex` if needed. This is the clearest factual error.

2. **Q252 (Saskatchewan):** Change option 3 from "Farming, mining and natural gas" to "Farming, mining and oil and gas."

3. **Q242 (Nova Scotia):** Consider adding a note in the explanation acknowledging shipbuilding and fisheries as other key industries, since the source prominently features them.

4. **Q222 (Alberta) and Q229 (BC):** Low priority. These match the traditional citizenship test answers and are likely correct per the official guide, even if the discover-canada source file does not fully capture them.
