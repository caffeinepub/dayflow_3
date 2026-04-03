import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Library,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const OLD_TESTAMENT: { name: string; chapters: number }[] = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
];

const NEW_TESTAMENT: { name: string; chapters: number }[] = [
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
];

const BIBLE_BOOKS = [...OLD_TESTAMENT, ...NEW_TESTAMENT];

const SKY = "oklch(0.55 0.17 225)";
const SKY_LIGHT = "oklch(0.62 0.17 225)";
const SKY_DIM = "oklch(0.72 0.17 225 / 0.10)";
const SKY_BORDER = "oklch(0.72 0.17 225 / 0.20)";
const SKY_SOFT = "oklch(0.92 0.06 225)";

// ─── Scriptural Keywords Dictionary ────────────────────────────────────────
interface ScriptureRef {
  label: string;
  book: string;
  chapter: number;
  verse: number;
}

interface ScripturalKeyword {
  keyword: string;
  definition: string;
  references: ScriptureRef[];
}

const SCRIPTURAL_KEYWORDS: ScripturalKeyword[] = [
  {
    keyword: "Grace",
    definition:
      "God's unmerited favor and love freely given to humanity, not based on human effort or deserving, but on His generous nature.",
    references: [
      { label: "Eph 2:8", book: "Ephesians", chapter: 2, verse: 8 },
      { label: "Rom 5:2", book: "Romans", chapter: 5, verse: 2 },
      { label: "2 Cor 12:9", book: "2 Corinthians", chapter: 12, verse: 9 },
      { label: "Tit 2:11", book: "Titus", chapter: 2, verse: 11 },
      { label: "Heb 4:16", book: "Hebrews", chapter: 4, verse: 16 },
    ],
  },
  {
    keyword: "Faith",
    definition:
      "Complete trust and confidence in God and His Word; the assurance of things hoped for and conviction of things not seen.",
    references: [
      { label: "Heb 11:1", book: "Hebrews", chapter: 11, verse: 1 },
      { label: "Rom 10:17", book: "Romans", chapter: 10, verse: 17 },
      { label: "Jas 2:17", book: "James", chapter: 2, verse: 17 },
      { label: "Gal 2:20", book: "Galatians", chapter: 2, verse: 20 },
      { label: "1 Pet 1:7", book: "1 Peter", chapter: 1, verse: 7 },
    ],
  },
  {
    keyword: "Love",
    definition:
      "The supreme attribute of God expressed in sacrificial, unconditional care for others; the foundation of all Christian ethics and relationships.",
    references: [
      { label: "1 Jn 4:8", book: "1 John", chapter: 4, verse: 8 },
      { label: "Jn 3:16", book: "John", chapter: 3, verse: 16 },
      { label: "1 Cor 13:4", book: "1 Corinthians", chapter: 13, verse: 4 },
      { label: "Rom 8:38", book: "Romans", chapter: 8, verse: 38 },
      { label: "1 Jn 4:19", book: "1 John", chapter: 4, verse: 19 },
    ],
  },
  {
    keyword: "Hope",
    definition:
      "A confident expectation and eager anticipation of God's promises being fulfilled, anchoring the soul in certainty of His faithfulness.",
    references: [
      { label: "Rom 15:13", book: "Romans", chapter: 15, verse: 13 },
      { label: "Jer 29:11", book: "Jeremiah", chapter: 29, verse: 11 },
      { label: "Heb 6:19", book: "Hebrews", chapter: 6, verse: 19 },
      { label: "Ps 31:24", book: "Psalms", chapter: 31, verse: 24 },
      { label: "1 Pet 1:3", book: "1 Peter", chapter: 1, verse: 3 },
    ],
  },
  {
    keyword: "Redemption",
    definition:
      "The act of being bought back or set free from sin and its consequences through the sacrificial blood of Jesus Christ.",
    references: [
      { label: "Eph 1:7", book: "Ephesians", chapter: 1, verse: 7 },
      { label: "Col 1:14", book: "Colossians", chapter: 1, verse: 14 },
      { label: "Gal 3:13", book: "Galatians", chapter: 3, verse: 13 },
      { label: "1 Pet 1:18", book: "1 Peter", chapter: 1, verse: 18 },
      { label: "Ps 130:7", book: "Psalms", chapter: 130, verse: 7 },
    ],
  },
  {
    keyword: "Salvation",
    definition:
      "The deliverance of humanity from sin and its eternal consequences through faith in Jesus Christ; the restoration of relationship with God.",
    references: [
      { label: "Jn 3:17", book: "John", chapter: 3, verse: 17 },
      { label: "Acts 4:12", book: "Acts", chapter: 4, verse: 12 },
      { label: "Eph 2:8", book: "Ephesians", chapter: 2, verse: 8 },
      { label: "Rom 10:9", book: "Romans", chapter: 10, verse: 9 },
      { label: "Ps 27:1", book: "Psalms", chapter: 27, verse: 1 },
    ],
  },
  {
    keyword: "Repentance",
    definition:
      "A genuine turning away from sin and a turning toward God, involving a change of heart, mind, and direction of life.",
    references: [
      { label: "Acts 3:19", book: "Acts", chapter: 3, verse: 19 },
      { label: "Luke 15:7", book: "Luke", chapter: 15, verse: 7 },
      { label: "2 Chr 7:14", book: "2 Chronicles", chapter: 7, verse: 14 },
      { label: "Matt 4:17", book: "Matthew", chapter: 4, verse: 17 },
      { label: "2 Pet 3:9", book: "2 Peter", chapter: 3, verse: 9 },
    ],
  },
  {
    keyword: "Forgiveness",
    definition:
      "The release of guilt and the removal of sin's penalty by God's merciful act, available through Christ and to be extended to others.",
    references: [
      { label: "1 Jn 1:9", book: "1 John", chapter: 1, verse: 9 },
      { label: "Matt 6:14", book: "Matthew", chapter: 6, verse: 14 },
      { label: "Eph 4:32", book: "Ephesians", chapter: 4, verse: 32 },
      { label: "Ps 103:12", book: "Psalms", chapter: 103, verse: 12 },
      { label: "Col 3:13", book: "Colossians", chapter: 3, verse: 13 },
    ],
  },
  {
    keyword: "Righteousness",
    definition:
      "The state of being in right standing before God; moral integrity and conformity to God's standards, imputed through Christ.",
    references: [
      { label: "Rom 3:22", book: "Romans", chapter: 3, verse: 22 },
      { label: "Matt 5:6", book: "Matthew", chapter: 5, verse: 6 },
      { label: "Isa 61:10", book: "Isaiah", chapter: 61, verse: 10 },
      { label: "Ps 23:3", book: "Psalms", chapter: 23, verse: 3 },
      { label: "2 Cor 5:21", book: "2 Corinthians", chapter: 5, verse: 21 },
    ],
  },
  {
    keyword: "Holiness",
    definition:
      "The attribute of God's perfect moral purity and separateness from sin; the call for believers to be set apart and consecrated to God.",
    references: [
      { label: "1 Pet 1:16", book: "1 Peter", chapter: 1, verse: 16 },
      { label: "Lev 20:26", book: "Leviticus", chapter: 20, verse: 26 },
      { label: "Heb 12:14", book: "Hebrews", chapter: 12, verse: 14 },
      { label: "Isa 6:3", book: "Isaiah", chapter: 6, verse: 3 },
      { label: "Rev 4:8", book: "Revelation", chapter: 4, verse: 8 },
    ],
  },
  {
    keyword: "Prayer",
    definition:
      "Direct communication with God involving praise, thanksgiving, confession, intercession, and petition; the believer's lifeline to the Father.",
    references: [
      { label: "Matt 6:9", book: "Matthew", chapter: 6, verse: 9 },
      { label: "Phil 4:6", book: "Philippians", chapter: 4, verse: 6 },
      { label: "1 Thess 5:17", book: "1 Thessalonians", chapter: 5, verse: 17 },
      { label: "Jas 5:16", book: "James", chapter: 5, verse: 16 },
      { label: "Ps 145:18", book: "Psalms", chapter: 145, verse: 18 },
    ],
  },
  {
    keyword: "Peace",
    definition:
      "Shalom — completeness and wholeness in God; the tranquility that surpasses human understanding, given by Christ to those who trust Him.",
    references: [
      { label: "Jn 14:27", book: "John", chapter: 14, verse: 27 },
      { label: "Phil 4:7", book: "Philippians", chapter: 4, verse: 7 },
      { label: "Isa 26:3", book: "Isaiah", chapter: 26, verse: 3 },
      { label: "Rom 5:1", book: "Romans", chapter: 5, verse: 1 },
      { label: "Ps 29:11", book: "Psalms", chapter: 29, verse: 11 },
    ],
  },
  {
    keyword: "Joy",
    definition:
      "A deep, abiding delight and gladness rooted in God's presence and promises, independent of external circumstances.",
    references: [
      { label: "Ps 16:11", book: "Psalms", chapter: 16, verse: 11 },
      { label: "Jn 15:11", book: "John", chapter: 15, verse: 11 },
      { label: "Neh 8:10", book: "Nehemiah", chapter: 8, verse: 10 },
      { label: "Phil 4:4", book: "Philippians", chapter: 4, verse: 4 },
      { label: "Gal 5:22", book: "Galatians", chapter: 5, verse: 22 },
    ],
  },
  {
    keyword: "Mercy",
    definition:
      "God's compassionate withholding of deserved punishment; tender love and kindness extended to the weak and undeserving.",
    references: [
      { label: "Lam 3:22", book: "Lamentations", chapter: 3, verse: 22 },
      { label: "Matt 5:7", book: "Matthew", chapter: 5, verse: 7 },
      { label: "Ps 136:1", book: "Psalms", chapter: 136, verse: 1 },
      { label: "Tit 3:5", book: "Titus", chapter: 3, verse: 5 },
      { label: "Mic 6:8", book: "Micah", chapter: 6, verse: 8 },
    ],
  },
  {
    keyword: "Wisdom",
    definition:
      "The God-given ability to understand, judge, and live rightly; the application of divine truth to practical life situations.",
    references: [
      { label: "Prov 1:7", book: "Proverbs", chapter: 1, verse: 7 },
      { label: "Jas 1:5", book: "James", chapter: 1, verse: 5 },
      { label: "Prov 3:13", book: "Proverbs", chapter: 3, verse: 13 },
      { label: "Col 2:3", book: "Colossians", chapter: 2, verse: 3 },
      { label: "Isa 11:2", book: "Isaiah", chapter: 11, verse: 2 },
    ],
  },
  {
    keyword: "Truth",
    definition:
      "The absolute reality and reliability of God's Word; Jesus Christ, who is the way, the truth, and the life incarnate.",
    references: [
      { label: "Jn 14:6", book: "John", chapter: 14, verse: 6 },
      { label: "Jn 8:32", book: "John", chapter: 8, verse: 32 },
      { label: "Ps 119:160", book: "Psalms", chapter: 119, verse: 160 },
      { label: "Jn 17:17", book: "John", chapter: 17, verse: 17 },
      { label: "Eph 4:15", book: "Ephesians", chapter: 4, verse: 15 },
    ],
  },
  {
    keyword: "Light",
    definition:
      "A biblical symbol for God's holiness, truth, and presence; Jesus is the Light of the world, dispelling spiritual darkness.",
    references: [
      { label: "Jn 8:12", book: "John", chapter: 8, verse: 12 },
      { label: "Ps 119:105", book: "Psalms", chapter: 119, verse: 105 },
      { label: "1 Jn 1:5", book: "1 John", chapter: 1, verse: 5 },
      { label: "Matt 5:14", book: "Matthew", chapter: 5, verse: 14 },
      { label: "Isa 60:1", book: "Isaiah", chapter: 60, verse: 1 },
    ],
  },
  {
    keyword: "Darkness",
    definition:
      "A symbol of sin, spiritual blindness, and separation from God; contrasted with God's light to show humanity's need for salvation.",
    references: [
      { label: "Jn 1:5", book: "John", chapter: 1, verse: 5 },
      { label: "Isa 9:2", book: "Isaiah", chapter: 9, verse: 2 },
      { label: "Eph 5:11", book: "Ephesians", chapter: 5, verse: 11 },
      { label: "Col 1:13", book: "Colossians", chapter: 1, verse: 13 },
      { label: "1 Pet 2:9", book: "1 Peter", chapter: 2, verse: 9 },
    ],
  },
  {
    keyword: "Sin",
    definition:
      "Any thought, word, deed, or failure that falls short of God's perfect standard; a transgression against His holy character.",
    references: [
      { label: "Rom 3:23", book: "Romans", chapter: 3, verse: 23 },
      { label: "1 Jn 3:4", book: "1 John", chapter: 3, verse: 4 },
      { label: "Isa 59:2", book: "Isaiah", chapter: 59, verse: 2 },
      { label: "Ps 51:1", book: "Psalms", chapter: 51, verse: 1 },
      { label: "Rom 6:23", book: "Romans", chapter: 6, verse: 23 },
    ],
  },
  {
    keyword: "Covenant",
    definition:
      "A solemn, binding agreement between God and His people, establishing relationship, obligations, and promises for both parties.",
    references: [
      { label: "Gen 9:13", book: "Genesis", chapter: 9, verse: 13 },
      { label: "Jer 31:33", book: "Jeremiah", chapter: 31, verse: 33 },
      { label: "Heb 8:6", book: "Hebrews", chapter: 8, verse: 6 },
      { label: "Luke 22:20", book: "Luke", chapter: 22, verse: 20 },
      { label: "Ps 89:3", book: "Psalms", chapter: 89, verse: 3 },
    ],
  },
  {
    keyword: "Blessing",
    definition:
      "God's favor, provision, and spiritual enrichment bestowed upon His people; also the act of speaking good over others in God's name.",
    references: [
      { label: "Num 6:24", book: "Numbers", chapter: 6, verse: 24 },
      { label: "Ps 1:1", book: "Psalms", chapter: 1, verse: 1 },
      { label: "Eph 1:3", book: "Ephesians", chapter: 1, verse: 3 },
      { label: "Deut 28:2", book: "Deuteronomy", chapter: 28, verse: 2 },
      { label: "Prov 10:22", book: "Proverbs", chapter: 10, verse: 22 },
    ],
  },
  {
    keyword: "Worship",
    definition:
      "The reverent adoration, praise, and honor given to God in response to who He is; a lifestyle of devotion encompassing all of life.",
    references: [
      { label: "Jn 4:24", book: "John", chapter: 4, verse: 24 },
      { label: "Ps 95:6", book: "Psalms", chapter: 95, verse: 6 },
      { label: "Rev 4:11", book: "Revelation", chapter: 4, verse: 11 },
      { label: "Rom 12:1", book: "Romans", chapter: 12, verse: 1 },
      { label: "Matt 4:10", book: "Matthew", chapter: 4, verse: 10 },
    ],
  },
  {
    keyword: "Sanctification",
    definition:
      "The ongoing process of being made holy and set apart for God's purposes, transforming believers into the image of Christ.",
    references: [
      { label: "1 Thess 4:3", book: "1 Thessalonians", chapter: 4, verse: 3 },
      { label: "Jn 17:17", book: "John", chapter: 17, verse: 17 },
      { label: "Heb 10:14", book: "Hebrews", chapter: 10, verse: 14 },
      { label: "1 Cor 6:11", book: "1 Corinthians", chapter: 6, verse: 11 },
      { label: "Rom 8:29", book: "Romans", chapter: 8, verse: 29 },
    ],
  },
  {
    keyword: "Justification",
    definition:
      "The legal declaration by God that a sinner is righteous, not on the basis of their own works, but through faith in Christ's atoning sacrifice.",
    references: [
      { label: "Rom 5:1", book: "Romans", chapter: 5, verse: 1 },
      { label: "Gal 2:16", book: "Galatians", chapter: 2, verse: 16 },
      { label: "Rom 4:5", book: "Romans", chapter: 4, verse: 5 },
      { label: "Acts 13:39", book: "Acts", chapter: 13, verse: 39 },
      { label: "Rom 3:28", book: "Romans", chapter: 3, verse: 28 },
    ],
  },
  {
    keyword: "Atonement",
    definition:
      "The reconciling work of Christ on the cross that covers sin and restores the broken relationship between God and humanity.",
    references: [
      { label: "Lev 17:11", book: "Leviticus", chapter: 17, verse: 11 },
      { label: "Heb 9:22", book: "Hebrews", chapter: 9, verse: 22 },
      { label: "1 Jn 2:2", book: "1 John", chapter: 2, verse: 2 },
      { label: "Isa 53:5", book: "Isaiah", chapter: 53, verse: 5 },
      { label: "Rom 5:11", book: "Romans", chapter: 5, verse: 11 },
    ],
  },
  {
    keyword: "Resurrection",
    definition:
      "Christ's bodily rising from the dead, the cornerstone of Christian faith, guaranteeing the future resurrection of all who believe in Him.",
    references: [
      { label: "1 Cor 15:20", book: "1 Corinthians", chapter: 15, verse: 20 },
      { label: "Jn 11:25", book: "John", chapter: 11, verse: 25 },
      { label: "Rom 6:4", book: "Romans", chapter: 6, verse: 4 },
      { label: "Luke 24:6", book: "Luke", chapter: 24, verse: 6 },
      { label: "Phil 3:10", book: "Philippians", chapter: 3, verse: 10 },
    ],
  },
  {
    keyword: "Baptism",
    definition:
      "An outward sign of an inward spiritual transformation; a public declaration of faith in Christ's death, burial, and resurrection.",
    references: [
      { label: "Matt 28:19", book: "Matthew", chapter: 28, verse: 19 },
      { label: "Acts 2:38", book: "Acts", chapter: 2, verse: 38 },
      { label: "Rom 6:4", book: "Romans", chapter: 6, verse: 4 },
      { label: "Gal 3:27", book: "Galatians", chapter: 3, verse: 27 },
      { label: "1 Pet 3:21", book: "1 Peter", chapter: 3, verse: 21 },
    ],
  },
  {
    keyword: "Holy Spirit",
    definition:
      "The third person of the Trinity who indwells believers, convicting of sin, guiding into truth, and empowering for Christian life and ministry.",
    references: [
      { label: "Jn 14:16", book: "John", chapter: 14, verse: 16 },
      { label: "Acts 1:8", book: "Acts", chapter: 1, verse: 8 },
      { label: "Gal 5:22", book: "Galatians", chapter: 5, verse: 22 },
      { label: "Rom 8:26", book: "Romans", chapter: 8, verse: 26 },
      { label: "1 Cor 12:4", book: "1 Corinthians", chapter: 12, verse: 4 },
    ],
  },
  {
    keyword: "Kingdom",
    definition:
      "The reign and rule of God in human hearts and creation; both a present spiritual reality and a future consummation of God's sovereign purposes.",
    references: [
      { label: "Matt 6:33", book: "Matthew", chapter: 6, verse: 33 },
      { label: "Luke 17:21", book: "Luke", chapter: 17, verse: 21 },
      { label: "Mark 1:15", book: "Mark", chapter: 1, verse: 15 },
      { label: "Rev 11:15", book: "Revelation", chapter: 11, verse: 15 },
      { label: "Col 1:13", book: "Colossians", chapter: 1, verse: 13 },
    ],
  },
  {
    keyword: "Eternal Life",
    definition:
      "The endless, abundant life in unbroken fellowship with God, beginning at salvation and continuing forever; a gift through faith in Jesus.",
    references: [
      { label: "Jn 3:16", book: "John", chapter: 3, verse: 16 },
      { label: "Jn 17:3", book: "John", chapter: 17, verse: 3 },
      { label: "1 Jn 5:11", book: "1 John", chapter: 5, verse: 11 },
      { label: "Rom 6:23", book: "Romans", chapter: 6, verse: 23 },
      { label: "Matt 25:46", book: "Matthew", chapter: 25, verse: 46 },
    ],
  },
  {
    keyword: "Humility",
    definition:
      "A right estimation of oneself before God and others; the posture of dependence on God and preference for others over self.",
    references: [
      { label: "Phil 2:3", book: "Philippians", chapter: 2, verse: 3 },
      { label: "Prov 22:4", book: "Proverbs", chapter: 22, verse: 4 },
      { label: "Matt 23:12", book: "Matthew", chapter: 23, verse: 12 },
      { label: "Jas 4:6", book: "James", chapter: 4, verse: 6 },
      { label: "1 Pet 5:6", book: "1 Peter", chapter: 5, verse: 6 },
    ],
  },
  {
    keyword: "Obedience",
    definition:
      "Wholehearted submission and conformity to God's commands; the fruit of genuine love for God and a transformed heart.",
    references: [
      { label: "Jn 14:15", book: "John", chapter: 14, verse: 15 },
      { label: "1 Sam 15:22", book: "1 Samuel", chapter: 15, verse: 22 },
      { label: "Deut 11:1", book: "Deuteronomy", chapter: 11, verse: 1 },
      { label: "Acts 5:29", book: "Acts", chapter: 5, verse: 29 },
      { label: "Rom 6:16", book: "Romans", chapter: 6, verse: 16 },
    ],
  },
  {
    keyword: "Perseverance",
    definition:
      "Steadfast endurance in faith through trials and tribulations, holding fast to God's promises until the end.",
    references: [
      { label: "Jas 1:3", book: "James", chapter: 1, verse: 3 },
      { label: "Heb 12:1", book: "Hebrews", chapter: 12, verse: 1 },
      { label: "Rom 5:3", book: "Romans", chapter: 5, verse: 3 },
      { label: "Rev 14:12", book: "Revelation", chapter: 14, verse: 12 },
      { label: "2 Tim 4:7", book: "2 Timothy", chapter: 4, verse: 7 },
    ],
  },
  {
    keyword: "Compassion",
    definition:
      "Deep empathy that moves one to act; God's tender concern for the suffering, modeled by Jesus and to be expressed by all believers.",
    references: [
      { label: "Matt 9:36", book: "Matthew", chapter: 9, verse: 36 },
      { label: "Ps 103:13", book: "Psalms", chapter: 103, verse: 13 },
      { label: "Col 3:12", book: "Colossians", chapter: 3, verse: 12 },
      { label: "Lam 3:22", book: "Lamentations", chapter: 3, verse: 22 },
      { label: "1 Pet 3:8", book: "1 Peter", chapter: 3, verse: 8 },
    ],
  },
  {
    keyword: "Patience",
    definition:
      "The ability to endure hardship and wait on God's timing without complaint; a fruit of the Spirit cultivated through trials.",
    references: [
      { label: "Rom 8:25", book: "Romans", chapter: 8, verse: 25 },
      { label: "Heb 6:12", book: "Hebrews", chapter: 6, verse: 12 },
      { label: "Jas 5:11", book: "James", chapter: 5, verse: 11 },
      { label: "Ps 27:14", book: "Psalms", chapter: 27, verse: 14 },
      { label: "Luke 8:15", book: "Luke", chapter: 8, verse: 15 },
    ],
  },
  {
    keyword: "Strength",
    definition:
      "Divine empowerment that enables believers to endure and overcome, drawn from God's own infinite power made available through faith.",
    references: [
      { label: "Phil 4:13", book: "Philippians", chapter: 4, verse: 13 },
      { label: "Isa 40:31", book: "Isaiah", chapter: 40, verse: 31 },
      { label: "Ps 28:7", book: "Psalms", chapter: 28, verse: 7 },
      { label: "Eph 6:10", book: "Ephesians", chapter: 6, verse: 10 },
      { label: "2 Tim 1:7", book: "2 Timothy", chapter: 1, verse: 7 },
    ],
  },
  {
    keyword: "Fear of the Lord",
    definition:
      "Reverent awe, respect, and holy dread before God's majesty; the beginning of wisdom and the foundation of a righteous life.",
    references: [
      { label: "Prov 9:10", book: "Proverbs", chapter: 9, verse: 10 },
      { label: "Ps 111:10", book: "Psalms", chapter: 111, verse: 10 },
      { label: "Isa 33:6", book: "Isaiah", chapter: 33, verse: 6 },
      { label: "Acts 9:31", book: "Acts", chapter: 9, verse: 31 },
      { label: "Deut 10:12", book: "Deuteronomy", chapter: 10, verse: 12 },
    ],
  },
  {
    keyword: "Sovereignty",
    definition:
      "God's absolute and supreme authority over all creation; nothing occurs outside His knowledge or ultimate control.",
    references: [
      { label: "Dan 4:35", book: "Daniel", chapter: 4, verse: 35 },
      { label: "Ps 103:19", book: "Psalms", chapter: 103, verse: 19 },
      { label: "Isa 46:10", book: "Isaiah", chapter: 46, verse: 10 },
      { label: "Rom 9:21", book: "Romans", chapter: 9, verse: 21 },
      { label: "Rev 19:6", book: "Revelation", chapter: 19, verse: 6 },
    ],
  },
  {
    keyword: "Providence",
    definition:
      "God's continuous care, guidance, and governance of all creation; His purposeful working of all things together for good.",
    references: [
      { label: "Rom 8:28", book: "Romans", chapter: 8, verse: 28 },
      { label: "Gen 50:20", book: "Genesis", chapter: 50, verse: 20 },
      { label: "Matt 6:26", book: "Matthew", chapter: 6, verse: 26 },
      { label: "Prov 16:9", book: "Proverbs", chapter: 16, verse: 9 },
      { label: "Ps 23:1", book: "Psalms", chapter: 23, verse: 1 },
    ],
  },
  {
    keyword: "Revelation",
    definition:
      "God's disclosure of Himself and His will to humanity through Scripture, creation, and ultimately through His Son Jesus Christ.",
    references: [
      { label: "Heb 1:1", book: "Hebrews", chapter: 1, verse: 1 },
      { label: "Ps 19:1", book: "Psalms", chapter: 19, verse: 1 },
      { label: "Jn 1:1", book: "John", chapter: 1, verse: 1 },
      { label: "2 Tim 3:16", book: "2 Timothy", chapter: 3, verse: 16 },
      { label: "Matt 11:27", book: "Matthew", chapter: 11, verse: 27 },
    ],
  },
  {
    keyword: "Prophecy",
    definition:
      "A Spirit-inspired message from God, whether foretelling future events or forth-telling God's will to encourage, warn, or instruct His people.",
    references: [
      { label: "2 Pet 1:21", book: "2 Peter", chapter: 1, verse: 21 },
      { label: "Isa 46:9", book: "Isaiah", chapter: 46, verse: 9 },
      { label: "1 Cor 14:3", book: "1 Corinthians", chapter: 14, verse: 3 },
      { label: "Amos 3:7", book: "Amos", chapter: 3, verse: 7 },
      { label: "Rev 1:3", book: "Revelation", chapter: 1, verse: 3 },
    ],
  },
  {
    keyword: "Intercession",
    definition:
      "Praying on behalf of others before God; Jesus Himself intercedes for believers, and we are called to intercede for one another.",
    references: [
      { label: "Rom 8:34", book: "Romans", chapter: 8, verse: 34 },
      { label: "Heb 7:25", book: "Hebrews", chapter: 7, verse: 25 },
      { label: "1 Tim 2:1", book: "1 Timothy", chapter: 2, verse: 1 },
      { label: "Jas 5:16", book: "James", chapter: 5, verse: 16 },
      { label: "Isa 59:16", book: "Isaiah", chapter: 59, verse: 16 },
    ],
  },
  {
    keyword: "Reconciliation",
    definition:
      "The restoration of broken relationship between God and humanity through Christ's sacrifice, calling believers to minister this peace.",
    references: [
      { label: "2 Cor 5:18", book: "2 Corinthians", chapter: 5, verse: 18 },
      { label: "Col 1:20", book: "Colossians", chapter: 1, verse: 20 },
      { label: "Rom 5:10", book: "Romans", chapter: 5, verse: 10 },
      { label: "Eph 2:16", book: "Ephesians", chapter: 2, verse: 16 },
      { label: "Matt 5:24", book: "Matthew", chapter: 5, verse: 24 },
    ],
  },
  {
    keyword: "Healing",
    definition:
      "God's restorative power over sickness, brokenness, and spiritual wounds; demonstrated through Jesus' ministry and available through prayer.",
    references: [
      { label: "Isa 53:5", book: "Isaiah", chapter: 53, verse: 5 },
      { label: "Jas 5:14", book: "James", chapter: 5, verse: 14 },
      { label: "Matt 4:23", book: "Matthew", chapter: 4, verse: 23 },
      { label: "Ps 103:3", book: "Psalms", chapter: 103, verse: 3 },
      { label: "3 Jn 1:2", book: "3 John", chapter: 1, verse: 2 },
    ],
  },
  {
    keyword: "Deliverance",
    definition:
      "God's powerful rescue and freedom from the bondage of sin, evil, fear, and oppression through the authority of Jesus Christ.",
    references: [
      { label: "Ps 34:17", book: "Psalms", chapter: 34, verse: 17 },
      { label: "Gal 1:4", book: "Galatians", chapter: 1, verse: 4 },
      { label: "Luke 4:18", book: "Luke", chapter: 4, verse: 18 },
      { label: "2 Tim 4:18", book: "2 Timothy", chapter: 4, verse: 18 },
      { label: "Col 1:13", book: "Colossians", chapter: 1, verse: 13 },
    ],
  },
  {
    keyword: "Praise",
    definition:
      "The enthusiastic expression of admiration and honor toward God for who He is and what He has done; a weapon in spiritual warfare.",
    references: [
      { label: "Ps 150:6", book: "Psalms", chapter: 150, verse: 6 },
      { label: "Heb 13:15", book: "Hebrews", chapter: 13, verse: 15 },
      { label: "Acts 16:25", book: "Acts", chapter: 16, verse: 25 },
      { label: "Ps 22:3", book: "Psalms", chapter: 22, verse: 3 },
      { label: "Isa 61:3", book: "Isaiah", chapter: 61, verse: 3 },
    ],
  },
  {
    keyword: "Gratitude",
    definition:
      "A heart posture of thankfulness toward God for His gifts, goodness, and grace; expressed in worship, prayer, and daily attitude.",
    references: [
      { label: "1 Thess 5:18", book: "1 Thessalonians", chapter: 5, verse: 18 },
      { label: "Col 3:15", book: "Colossians", chapter: 3, verse: 15 },
      { label: "Ps 107:1", book: "Psalms", chapter: 107, verse: 1 },
      { label: "Phil 4:6", book: "Philippians", chapter: 4, verse: 6 },
      { label: "Eph 5:20", book: "Ephesians", chapter: 5, verse: 20 },
    ],
  },
  {
    keyword: "Trust",
    definition:
      "Relying completely on God's character, promises, and wisdom, even when circumstances seem uncertain or contrary to understanding.",
    references: [
      { label: "Prov 3:5", book: "Proverbs", chapter: 3, verse: 5 },
      { label: "Ps 37:3", book: "Psalms", chapter: 37, verse: 3 },
      { label: "Isa 26:4", book: "Isaiah", chapter: 26, verse: 4 },
      { label: "Jer 17:7", book: "Jeremiah", chapter: 17, verse: 7 },
      { label: "Ps 56:3", book: "Psalms", chapter: 56, verse: 3 },
    ],
  },
  {
    keyword: "Surrender",
    definition:
      "The yielding of one's will, desires, and plans to God's authority and purposes; the key to abundant life and deep peace.",
    references: [
      { label: "Luke 9:23", book: "Luke", chapter: 9, verse: 23 },
      { label: "Rom 12:1", book: "Romans", chapter: 12, verse: 1 },
      { label: "Gal 2:20", book: "Galatians", chapter: 2, verse: 20 },
      { label: "Matt 16:25", book: "Matthew", chapter: 16, verse: 25 },
      { label: "Ps 31:5", book: "Psalms", chapter: 31, verse: 5 },
    ],
  },
  {
    keyword: "Anointing",
    definition:
      "The special empowerment and enablement of the Holy Spirit upon a person for a specific divine calling or assignment.",
    references: [
      { label: "Isa 61:1", book: "Isaiah", chapter: 61, verse: 1 },
      { label: "Luke 4:18", book: "Luke", chapter: 4, verse: 18 },
      { label: "Acts 10:38", book: "Acts", chapter: 10, verse: 38 },
      { label: "1 Jn 2:27", book: "1 John", chapter: 2, verse: 27 },
      { label: "Ps 23:5", book: "Psalms", chapter: 23, verse: 5 },
    ],
  },
  {
    keyword: "Communion",
    definition:
      "The Lord's Supper — a sacred practice of bread and cup commemorating Christ's body and blood, proclaiming His death until He returns.",
    references: [
      { label: "1 Cor 11:23", book: "1 Corinthians", chapter: 11, verse: 23 },
      { label: "Luke 22:19", book: "Luke", chapter: 22, verse: 19 },
      { label: "Matt 26:26", book: "Matthew", chapter: 26, verse: 26 },
      { label: "Jn 6:53", book: "John", chapter: 6, verse: 53 },
      { label: "Acts 2:42", book: "Acts", chapter: 2, verse: 42 },
    ],
  },
  {
    keyword: "Discipleship",
    definition:
      "The process of following Jesus, learning His ways, and being formed into His image; also the call to intentionally invest in others' spiritual growth.",
    references: [
      { label: "Matt 28:19", book: "Matthew", chapter: 28, verse: 19 },
      { label: "Luke 14:27", book: "Luke", chapter: 14, verse: 27 },
      { label: "Jn 8:31", book: "John", chapter: 8, verse: 31 },
      { label: "2 Tim 2:2", book: "2 Timothy", chapter: 2, verse: 2 },
      { label: "1 Cor 11:1", book: "1 Corinthians", chapter: 11, verse: 1 },
    ],
  },
  {
    keyword: "Fasting",
    definition:
      "Voluntarily abstaining from food (or other things) to seek God more earnestly, denying the flesh to sharpen spiritual sensitivity.",
    references: [
      { label: "Matt 6:16", book: "Matthew", chapter: 6, verse: 16 },
      { label: "Isa 58:6", book: "Isaiah", chapter: 58, verse: 6 },
      { label: "Acts 13:2", book: "Acts", chapter: 13, verse: 2 },
      { label: "Joel 2:12", book: "Joel", chapter: 2, verse: 12 },
      { label: "Matt 17:21", book: "Matthew", chapter: 17, verse: 21 },
    ],
  },
  {
    keyword: "Generosity",
    definition:
      "Cheerfully giving of one's time, treasure, and talents as a response to God's abundant grace and a trust in His provision.",
    references: [
      { label: "2 Cor 9:7", book: "2 Corinthians", chapter: 9, verse: 7 },
      { label: "Prov 11:24", book: "Proverbs", chapter: 11, verse: 24 },
      { label: "Luke 21:1", book: "Luke", chapter: 21, verse: 1 },
      { label: "1 Tim 6:18", book: "1 Timothy", chapter: 6, verse: 18 },
      { label: "Matt 6:3", book: "Matthew", chapter: 6, verse: 3 },
    ],
  },
  {
    keyword: "Hospitality",
    definition:
      "The practice of welcoming strangers and fellow believers with warmth and generosity; a tangible expression of God's love.",
    references: [
      { label: "Heb 13:2", book: "Hebrews", chapter: 13, verse: 2 },
      { label: "1 Pet 4:9", book: "1 Peter", chapter: 4, verse: 9 },
      { label: "Rom 12:13", book: "Romans", chapter: 12, verse: 13 },
      { label: "Luke 14:13", book: "Luke", chapter: 14, verse: 13 },
      { label: "Matt 25:35", book: "Matthew", chapter: 25, verse: 35 },
    ],
  },
  {
    keyword: "Justice",
    definition:
      "God's righteous and impartial treatment of all creation; the call for believers to advocate for the oppressed and uphold what is right.",
    references: [
      { label: "Mic 6:8", book: "Micah", chapter: 6, verse: 8 },
      { label: "Ps 89:14", book: "Psalms", chapter: 89, verse: 14 },
      { label: "Isa 1:17", book: "Isaiah", chapter: 1, verse: 17 },
      { label: "Amos 5:24", book: "Amos", chapter: 5, verse: 24 },
      { label: "Matt 23:23", book: "Matthew", chapter: 23, verse: 23 },
    ],
  },
  {
    keyword: "Renewal",
    definition:
      "The divine transformation of the heart and mind, replacing old patterns of thinking with God's perspective and purposes.",
    references: [
      { label: "Rom 12:2", book: "Romans", chapter: 12, verse: 2 },
      { label: "2 Cor 4:16", book: "2 Corinthians", chapter: 4, verse: 16 },
      { label: "Eph 4:23", book: "Ephesians", chapter: 4, verse: 23 },
      { label: "Tit 3:5", book: "Titus", chapter: 3, verse: 5 },
      { label: "Isa 40:31", book: "Isaiah", chapter: 40, verse: 31 },
    ],
  },
  {
    keyword: "Sacrifice",
    definition:
      "An offering made to God at personal cost; ultimately fulfilled in Christ's perfect sacrifice, calling believers to offer themselves wholly.",
    references: [
      { label: "Heb 9:26", book: "Hebrews", chapter: 9, verse: 26 },
      { label: "Rom 12:1", book: "Romans", chapter: 12, verse: 1 },
      { label: "Ps 51:17", book: "Psalms", chapter: 51, verse: 17 },
      { label: "Heb 13:15", book: "Hebrews", chapter: 13, verse: 15 },
      { label: "Eph 5:2", book: "Ephesians", chapter: 5, verse: 2 },
    ],
  },
  {
    keyword: "Serving",
    definition:
      "Following Jesus' example of humble, selfless service to others; greatness in God's kingdom is measured by willingness to serve.",
    references: [
      { label: "Matt 20:28", book: "Matthew", chapter: 20, verse: 28 },
      { label: "Gal 5:13", book: "Galatians", chapter: 5, verse: 13 },
      { label: "1 Pet 4:10", book: "1 Peter", chapter: 4, verse: 10 },
      { label: "Mark 10:45", book: "Mark", chapter: 10, verse: 45 },
      { label: "Jn 13:14", book: "John", chapter: 13, verse: 14 },
    ],
  },
  {
    keyword: "Stewardship",
    definition:
      "The faithful management of all God has entrusted — time, talents, resources, and creation — as a caretaker accountable to God.",
    references: [
      { label: "Luke 16:10", book: "Luke", chapter: 16, verse: 10 },
      { label: "Matt 25:21", book: "Matthew", chapter: 25, verse: 21 },
      { label: "1 Cor 4:2", book: "1 Corinthians", chapter: 4, verse: 2 },
      { label: "1 Pet 4:10", book: "1 Peter", chapter: 4, verse: 10 },
      { label: "Ps 24:1", book: "Psalms", chapter: 24, verse: 1 },
    ],
  },
  {
    keyword: "Temptation",
    definition:
      "An enticement toward sin from the world, flesh, or the enemy; God provides a way of escape and Christ sympathizes as One who overcame.",
    references: [
      { label: "1 Cor 10:13", book: "1 Corinthians", chapter: 10, verse: 13 },
      { label: "Jas 1:14", book: "James", chapter: 1, verse: 14 },
      { label: "Matt 4:1", book: "Matthew", chapter: 4, verse: 1 },
      { label: "Heb 4:15", book: "Hebrews", chapter: 4, verse: 15 },
      { label: "Luke 22:40", book: "Luke", chapter: 22, verse: 40 },
    ],
  },
  {
    keyword: "Transformation",
    definition:
      "The Spirit-led metamorphosis of a believer from old self into the likeness of Christ; an ongoing work of renewal in mind and character.",
    references: [
      { label: "Rom 12:2", book: "Romans", chapter: 12, verse: 2 },
      { label: "2 Cor 3:18", book: "2 Corinthians", chapter: 3, verse: 18 },
      { label: "Eph 4:24", book: "Ephesians", chapter: 4, verse: 24 },
      { label: "Phil 1:6", book: "Philippians", chapter: 1, verse: 6 },
      { label: "Col 3:10", book: "Colossians", chapter: 3, verse: 10 },
    ],
  },
  {
    keyword: "Redemption",
    definition:
      "Being bought back by God from slavery to sin at the price of Christ's blood, resulting in freedom and adoption into God's family.",
    references: [
      { label: "Eph 1:7", book: "Ephesians", chapter: 1, verse: 7 },
      { label: "Col 1:14", book: "Colossians", chapter: 1, verse: 14 },
      { label: "1 Pet 1:18", book: "1 Peter", chapter: 1, verse: 18 },
      { label: "Ps 130:7", book: "Psalms", chapter: 130, verse: 7 },
      { label: "Gal 4:5", book: "Galatians", chapter: 4, verse: 5 },
    ],
  },
  {
    keyword: "Word of God",
    definition:
      "The inspired, authoritative Scripture that reveals God's nature, will, and plan; alive and powerful, the foundation for all doctrine and life.",
    references: [
      { label: "2 Tim 3:16", book: "2 Timothy", chapter: 3, verse: 16 },
      { label: "Heb 4:12", book: "Hebrews", chapter: 4, verse: 12 },
      { label: "Ps 119:105", book: "Psalms", chapter: 119, verse: 105 },
      { label: "Jn 1:1", book: "John", chapter: 1, verse: 1 },
      { label: "Matt 4:4", book: "Matthew", chapter: 4, verse: 4 },
    ],
  },
  {
    keyword: "Creation",
    definition:
      "God's sovereign act of calling all things into existence from nothing; reflecting His power, beauty, and wisdom for His glory.",
    references: [
      { label: "Gen 1:1", book: "Genesis", chapter: 1, verse: 1 },
      { label: "Jn 1:3", book: "John", chapter: 1, verse: 3 },
      { label: "Col 1:16", book: "Colossians", chapter: 1, verse: 16 },
      { label: "Rev 4:11", book: "Revelation", chapter: 4, verse: 11 },
      { label: "Ps 19:1", book: "Psalms", chapter: 19, verse: 1 },
    ],
  },
  {
    keyword: "Trinity",
    definition:
      "The one God eternally existing as three co-equal, co-eternal Persons: Father, Son, and Holy Spirit — distinct yet perfectly united.",
    references: [
      { label: "Matt 28:19", book: "Matthew", chapter: 28, verse: 19 },
      { label: "2 Cor 13:14", book: "2 Corinthians", chapter: 13, verse: 14 },
      { label: "Jn 14:16", book: "John", chapter: 14, verse: 16 },
      { label: "Gen 1:26", book: "Genesis", chapter: 1, verse: 26 },
      { label: "1 Pet 1:2", book: "1 Peter", chapter: 1, verse: 2 },
    ],
  },
  {
    keyword: "Fruit of the Spirit",
    definition:
      "The nine divine virtues produced in believers through the Holy Spirit's work: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.",
    references: [
      { label: "Gal 5:22", book: "Galatians", chapter: 5, verse: 22 },
      { label: "Jn 15:5", book: "John", chapter: 15, verse: 5 },
      { label: "Eph 5:9", book: "Ephesians", chapter: 5, verse: 9 },
      { label: "Col 1:10", book: "Colossians", chapter: 1, verse: 10 },
      { label: "Matt 7:16", book: "Matthew", chapter: 7, verse: 16 },
    ],
  },
  {
    keyword: "Armor of God",
    definition:
      "Spiritual equipment God provides for believers to stand against the enemy: truth, righteousness, peace, faith, salvation, the Word, and prayer.",
    references: [
      { label: "Eph 6:11", book: "Ephesians", chapter: 6, verse: 11 },
      { label: "Eph 6:13", book: "Ephesians", chapter: 6, verse: 13 },
      { label: "2 Cor 10:4", book: "2 Corinthians", chapter: 10, verse: 4 },
      { label: "Rom 13:12", book: "Romans", chapter: 13, verse: 12 },
      { label: "1 Thess 5:8", book: "1 Thessalonians", chapter: 5, verse: 8 },
    ],
  },
  {
    keyword: "Adoption",
    definition:
      "God's act of bringing believers into His family as fully privileged children with all the rights and inheritance of sonship.",
    references: [
      { label: "Gal 4:4", book: "Galatians", chapter: 4, verse: 4 },
      { label: "Rom 8:15", book: "Romans", chapter: 8, verse: 15 },
      { label: "Eph 1:5", book: "Ephesians", chapter: 1, verse: 5 },
      { label: "1 Jn 3:1", book: "1 John", chapter: 3, verse: 1 },
      { label: "Jn 1:12", book: "John", chapter: 1, verse: 12 },
    ],
  },
];

interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleApiResponse {
  reference: string;
  verses: BibleVerse[];
  translation_name: string;
}

// Reference pattern: "John 3:16" or "Genesis 1" etc.
const REFERENCE_REGEX = /^(.+?)\s+(\d+)(?::(\d+))?$/i;

function detectReference(
  query: string,
): { book: string; chapter: number; verse: number | null } | null {
  const match = query.trim().match(REFERENCE_REGEX);
  if (!match) return null;

  const bookQuery = match[1].trim();
  const chapter = Number(match[2]);
  const verse = match[3] ? Number(match[3]) : null;

  const found = BIBLE_BOOKS.find(
    (b) => b.name.toLowerCase() === bookQuery.toLowerCase(),
  );
  if (!found) return null;

  if (chapter < 1 || chapter > found.chapters) return null;

  return { book: found.name, chapter, verse };
}

export default function BibleReaderCard() {
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [reference, setReference] = useState("");
  const [translationName, setTranslationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  const highlightedVerseRef = useRef<HTMLDivElement | null>(null);

  const currentBook = BIBLE_BOOKS.find((b) => b.name === selectedBook);
  const maxChapters = currentBook?.chapters ?? 1;

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((c) => c - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.name === selectedBook);
      if (idx > 0) {
        const prevBook = BIBLE_BOOKS[idx - 1];
        setSelectedBook(prevBook.name);
        setSelectedChapter(prevBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < maxChapters) {
      setSelectedChapter((c) => c + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.name === selectedBook);
      if (idx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[idx + 1];
        setSelectedBook(nextBook.name);
        setSelectedChapter(1);
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      setVerses([]);
      try {
        const bookSlug = selectedBook.replace(/ /g, "+");
        const url = `https://bible-api.com/${bookSlug}+${selectedChapter}?translation=kjv`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: BibleApiResponse = await res.json();
        if (!cancelled) {
          setVerses(data.verses ?? []);
          setReference(data.reference);
          setTranslationName(data.translation_name);
        }
      } catch {
        if (!cancelled) setError("Could not load verses, please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchVerses();
    return () => {
      cancelled = true;
    };
  }, [selectedBook, selectedChapter]);

  useEffect(() => {
    if (highlightedVerse !== null && highlightedVerseRef.current) {
      highlightedVerseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      const timer = setTimeout(() => setHighlightedVerse(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedVerse]);

  // ── Smart search logic ──────────────────────────────────────────────────
  const trimmedQuery = searchQuery.trim();
  const showSearchPanel = trimmedQuery.length >= 2;

  const detectedRef =
    trimmedQuery.length > 1 ? detectReference(trimmedQuery) : null;

  // Keyword matches — starts with or contains the query
  const matchedKeywords =
    showSearchPanel && !detectedRef
      ? SCRIPTURAL_KEYWORDS.filter((k) =>
          k.keyword.toLowerCase().includes(trimmedQuery.toLowerCase()),
        ).slice(0, 4)
      : [];

  // References from top 2 matched keywords (up to 8 total)
  const suggestedRefs: (ScriptureRef & { fromKeyword: string })[] =
    matchedKeywords
      .slice(0, 2)
      .flatMap((k) =>
        k.references.map((r) => ({ ...r, fromKeyword: k.keyword })),
      )
      .slice(0, 8);

  // Local chapter keyword matches
  const localMatches =
    trimmedQuery.length >= 2 && !detectedRef && matchedKeywords.length === 0
      ? verses.filter((v) =>
          v.text.toLowerCase().includes(trimmedQuery.toLowerCase()),
        )
      : trimmedQuery.length >= 2 && !detectedRef
        ? verses
            .filter((v) =>
              v.text.toLowerCase().includes(trimmedQuery.toLowerCase()),
            )
            .slice(0, 3)
        : [];

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(`${trimmedQuery} Bible verse KJV`)}`;

  const handleSearchResultClick = (v: BibleVerse) => {
    setHighlightedVerse(v.verse);
    setSearchQuery("");
  };

  const handleReferenceNav = (ref: {
    book: string;
    chapter: number;
    verse: number | null;
  }) => {
    setSelectedBook(ref.book);
    setSelectedChapter(ref.chapter);
    if (ref.verse !== null) setHighlightedVerse(ref.verse);
    setSearchQuery("");
  };

  const handleScriptureRefClick = (ref: ScriptureRef) => {
    setSelectedBook(ref.book);
    setSelectedChapter(ref.chapter);
    setHighlightedVerse(ref.verse);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const isFirstChapterOfFirst =
    selectedBook === BIBLE_BOOKS[0].name && selectedChapter === 1;
  const isLastChapterOfLast =
    selectedBook === BIBLE_BOOKS[BIBLE_BOOKS.length - 1].name &&
    selectedChapter === maxChapters;

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm card-sky-glow min-h-[600px] relative overflow-hidden"
      style={{ borderTopWidth: "2px", borderTopColor: SKY_BORDER }}
      data-ocid="bible.card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: SKY_DIM,
            boxShadow: `0 0 0 1px ${SKY_BORDER}`,
          }}
        >
          <Library className="w-4 h-4" style={{ color: SKY_LIGHT }} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 leading-tight">
            Bible Reader
          </h2>
          {translationName && (
            <p
              className="text-[10px] uppercase tracking-wider leading-tight mt-0.5"
              style={{ color: "oklch(0.55 0.02 60)" }}
            >
              {translationName}
            </p>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div
          className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-1 transition-all"
          style={{ "--tw-ring-color": SKY_BORDER } as React.CSSProperties}
        >
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scriptures, topics, or type John 3:16..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            data-ocid="bible.search_input"
            aria-label="Search scriptures, topics, or type a reference like John 3:16"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="w-5 h-5 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ── Smart Search Panel ─────────────────────────────────────────── */}
        {showSearchPanel && (
          <div
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl overflow-hidden z-20 shadow-xl"
            style={{
              boxShadow:
                "0 8px 32px oklch(0.72 0.17 225 / 0.15), 0 2px 8px rgba(0,0,0,0.08)",
            }}
            data-ocid="bible.search_results"
          >
            <div className="max-h-[480px] overflow-y-auto">
              {/* ── Section 1: Reference detection ── */}
              {detectedRef && (
                <div className="p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 px-1 pb-2">
                    Go to Reference
                  </p>
                  <button
                    type="button"
                    onClick={() => handleReferenceNav(detectedRef)}
                    className="w-full text-left rounded-xl px-3 py-2.5 transition-colors group"
                    style={{ backgroundColor: SKY_DIM }}
                    data-ocid="bible.search_result_item"
                  >
                    <span
                      className="block text-sm font-bold leading-tight"
                      style={{ color: SKY }}
                    >
                      {detectedRef.book} {detectedRef.chapter}
                      {detectedRef.verse !== null
                        ? `:${detectedRef.verse}`
                        : ""}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5 block">
                      Jump to this passage
                    </span>
                  </button>
                </div>
              )}

              {/* ── Section 1: Scriptural Keywords ── */}
              {!detectedRef && matchedKeywords.length > 0 && (
                <div className="p-3 pb-2">
                  <div className="flex items-center gap-1.5 px-1 pb-2">
                    <BookOpen className="w-3 h-3" style={{ color: SKY }} />
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ color: SKY }}
                    >
                      Scriptural Keywords
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {matchedKeywords.map((kw) => (
                      <li key={kw.keyword}>
                        <div
                          className="rounded-xl px-3 py-2.5 border"
                          style={{
                            backgroundColor: SKY_SOFT,
                            borderColor: SKY_BORDER,
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="text-sm font-bold leading-tight"
                              style={{ color: SKY }}
                            >
                              {kw.keyword}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed">
                            {kw.definition}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Section 2: Related Scriptures ── */}
              {!detectedRef && suggestedRefs.length > 0 && (
                <div className="px-3 pb-3">
                  <div className="flex items-center gap-1.5 px-1 pb-2 pt-1">
                    <BookOpen className="w-3 h-3 text-gray-400" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Related Scriptures
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedRefs.map((ref) => (
                      <button
                        key={`${ref.book}-${ref.chapter}-${ref.verse}`}
                        type="button"
                        onClick={() => handleScriptureRefClick(ref)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: SKY_DIM,
                          color: SKY,
                          border: `1px solid ${SKY_BORDER}`,
                        }}
                        data-ocid="bible.search_result_item"
                        title={`Open ${ref.label} — from ${ref.fromKeyword}`}
                      >
                        {ref.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Section 3: In This Chapter ── */}
              {!detectedRef && localMatches.length > 0 && (
                <div
                  className="px-3 pb-3"
                  style={{
                    borderTop:
                      matchedKeywords.length > 0
                        ? "1px solid oklch(0.93 0.01 225)"
                        : "none",
                    paddingTop: matchedKeywords.length > 0 ? "12px" : "0",
                  }}
                >
                  <div className="flex items-center gap-1.5 px-1 pb-2">
                    <Search className="w-3 h-3 text-gray-400" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      In {selectedBook} {selectedChapter}
                    </p>
                  </div>
                  <ul className="space-y-0.5">
                    {localMatches.map((v) => (
                      <li key={`local-${v.verse}`}>
                        <button
                          type="button"
                          onClick={() => handleSearchResultClick(v)}
                          className="w-full text-left rounded-xl px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50"
                          data-ocid="bible.search_result_item"
                        >
                          <span
                            className="block text-xs font-bold leading-tight mb-0.5"
                            style={{ color: SKY }}
                          >
                            {v.book_name} {v.chapter}:{v.verse}
                          </span>
                          <span className="block text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {v.text.trim()}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No results state */}
              {!detectedRef &&
                matchedKeywords.length === 0 &&
                localMatches.length === 0 && (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs text-gray-400">
                      No results for &ldquo;{trimmedQuery}&rdquo; in this
                      chapter.
                    </p>
                  </div>
                )}

              {/* ── Section 4: Google Fallback ── */}
              <div
                className="mx-3 mb-3 rounded-xl overflow-hidden"
                style={{ borderTop: "1px solid oklch(0.93 0.01 225)" }}
              >
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 transition-colors group rounded-xl mt-2"
                  data-ocid="bible.google_search_link"
                  aria-label={`Search Google for ${trimmedQuery}`}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[11px] font-extrabold leading-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    aria-hidden="true"
                  >
                    G
                  </span>
                  <span className="flex-1 text-xs text-gray-500 group-hover:text-blue-700 transition-colors">
                    Search Google for{" "}
                    <span className="font-semibold text-gray-700">
                      &ldquo;{trimmedQuery}&rdquo;
                    </span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation row: book dropdown + chapter prev/next */}
      <div className="flex items-center gap-2" data-ocid="bible.nav">
        <select
          value={selectedBook}
          onChange={(e) => handleBookChange(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          aria-label="Select book"
        >
          <optgroup label="Old Testament">
            {OLD_TESTAMENT.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="New Testament">
            {NEW_TESTAMENT.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </optgroup>
        </select>

        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(Number(e.target.value))}
          className="w-20 bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          aria-label="Select chapter"
        >
          {Array.from({ length: maxChapters }, (_, i) => i + 1).map((ch) => (
            <option key={ch} value={ch}>
              Ch {ch}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handlePrevChapter}
          disabled={isFirstChapterOfFirst}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          data-ocid="bible.pagination_prev"
          aria-label="Previous chapter"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNextChapter}
          disabled={isLastChapterOfLast}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          data-ocid="bible.pagination_next"
          aria-label="Next chapter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reference label */}
      {reference && !loading && (
        <div className="flex items-center gap-2 -mb-1">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: SKY_LIGHT }}
          />
          <p className="text-base font-semibold text-gray-900">{reference}</p>
        </div>
      )}

      {/* Verse content area */}
      <ScrollArea className="flex-1 min-h-[380px]" data-ocid="bible.panel">
        {loading && (
          <div
            className="h-72 flex items-center justify-center"
            data-ocid="bible.loading_state"
          >
            <Loader2
              className="w-5 h-5 animate-spin"
              style={{ color: SKY_LIGHT }}
            />
          </div>
        )}

        {error && !loading && (
          <div
            className="h-72 flex flex-col items-center justify-center gap-3 text-center px-4"
            data-ocid="bible.error_state"
          >
            <p className="text-gray-400 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => setSelectedChapter((c) => c)}
              className="text-xs hover:opacity-70 underline underline-offset-2 transition-colors"
              style={{ color: SKY }}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <div className="pr-3 space-y-3 pb-2">
            {verses.map((v) => (
              <div
                key={v.verse}
                ref={highlightedVerse === v.verse ? highlightedVerseRef : null}
                className={[
                  "flex gap-3 group transition-all duration-300",
                  highlightedVerse === v.verse ? "rounded-lg px-2 -mx-2" : "",
                ].join(" ")}
                style={
                  highlightedVerse === v.verse
                    ? {
                        backgroundColor: SKY_DIM,
                        boxShadow: `0 0 0 1px ${SKY_BORDER}`,
                      }
                    : {}
                }
              >
                <span
                  className="text-[11px] font-bold mt-0.5 w-5 flex-shrink-0 leading-5 tabular-nums"
                  style={{ color: SKY_LIGHT }}
                >
                  {v.verse}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">
                  {v.text.trim()}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && verses.length === 0 && (
          <div
            className="h-72 flex items-center justify-center"
            data-ocid="bible.empty_state"
          >
            <p className="text-gray-400 text-sm">No verses found.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
