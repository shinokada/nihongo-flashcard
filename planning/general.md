# JLPT

Japanese has its own well-established proficiency framework for foreign learners — the **JLPT (Japanese Language Proficiency Test)**.

Here's how it maps out:

| Level  | Description                                                         |
| ------ | ------------------------------------------------------------------- |
| **N5** | Basic Japanese, ~800 vocab, hiragana/katakana                       |
| **N4** | Elementary, ~1,500 vocab, basic kanji                               |
| **N3** | Intermediate, ~3,750 vocab                                          |
| **N2** | Upper-intermediate, ~6,000 vocab, needed for most universities/jobs |
| **N1** | Advanced/near-native, ~10,000+ vocab                                |

So the JLPT uses **5 levels (N5 → N1)**, where N5 is the easiest and N1 is the hardest — the inverse of CEFR's A1→C2 naming direction.

Your existing `vocab-n4.json` already follows this convention. To mirror the Norwegian app's structure, you'd want to add:

```text
vocab-n5.json
vocab-n4.json  ← already exists
vocab-n3.json
vocab-n2.json
vocab-n1.json
```

Worth noting that your current data files (`one-thousand.json`, `three-thousand.json`, etc.) could likely be reorganised into these JLPT buckets, as the N-level vocabulary lists are very well documented. Would you like help restructuring the existing data into JLPT-levelled JSON files in the same format as the Norwegian app?
