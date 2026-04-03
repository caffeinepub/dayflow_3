import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Library, Loader2 } from "lucide-react";
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

function scrollActiveChipIntoView(stripEl: HTMLDivElement | null) {
  if (!stripEl) return;
  const active = stripEl.querySelector<HTMLButtonElement>(
    "[data-active='true']",
  );
  if (active) {
    active.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }
}

export default function BibleReaderCard() {
  const [testament, setTestament] = useState<"OT" | "NT">("NT");
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [reference, setReference] = useState("");
  const [translationName, setTranslationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chapterStripRef = useRef<HTMLDivElement>(null);

  const currentBooks = testament === "OT" ? OLD_TESTAMENT : NEW_TESTAMENT;
  const currentBook = BIBLE_BOOKS.find((b) => b.name === selectedBook);
  const maxChapters = currentBook?.chapters ?? 1;

  const handleTestamentChange = (t: "OT" | "NT") => {
    setTestament(t);
    const firstBook = t === "OT" ? OLD_TESTAMENT[0] : NEW_TESTAMENT[0];
    setSelectedBook(firstBook.name);
    setSelectedChapter(1);
  };

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  };

  const handleChapterChange = (ch: number) => {
    setSelectedChapter(ch);
    scrollActiveChipIntoView(chapterStripRef.current);
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((c) => c - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.name === selectedBook);
      if (idx > 0) {
        const prevBook = BIBLE_BOOKS[idx - 1];
        const inOT = OLD_TESTAMENT.some((b) => b.name === prevBook.name);
        setTestament(inOT ? "OT" : "NT");
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
        const inOT = OLD_TESTAMENT.some((b) => b.name === nextBook.name);
        setTestament(inOT ? "OT" : "NT");
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

  const isFirstChapterOfFirst =
    selectedBook === BIBLE_BOOKS[0].name && selectedChapter === 1;
  const isLastChapterOfLast =
    selectedBook === BIBLE_BOOKS[BIBLE_BOOKS.length - 1].name &&
    selectedChapter === maxChapters;

  return (
    <div
      className="bg-df-navy-light border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 shadow-card min-h-[500px]"
      data-ocid="bible.card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-df-red-dim flex items-center justify-center flex-shrink-0">
          <Library className="w-4 h-4 text-df-red" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-df-text leading-tight">
            Bible Reader
          </h2>
          {translationName && (
            <p className="text-[10px] text-df-text-muted uppercase tracking-wider leading-tight mt-0.5">
              {translationName}
            </p>
          )}
        </div>
      </div>

      {/* Testament toggle */}
      <div
        className="flex gap-1.5 p-1 bg-df-navy rounded-xl"
        data-ocid="bible.tab"
      >
        <button
          type="button"
          onClick={() => handleTestamentChange("OT")}
          className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-lg transition-all duration-200 ${
            testament === "OT"
              ? "bg-df-red text-white shadow-sm"
              : "text-df-text-muted hover:text-df-text"
          }`}
        >
          Old Testament
        </button>
        <button
          type="button"
          onClick={() => handleTestamentChange("NT")}
          className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-lg transition-all duration-200 ${
            testament === "NT"
              ? "bg-df-red text-white shadow-sm"
              : "text-df-text-muted hover:text-df-text"
          }`}
        >
          New Testament
        </button>
      </div>

      {/* Book grid */}
      <div
        className="grid grid-cols-3 gap-1.5 max-h-[120px] overflow-y-auto scrollbar-thin"
        data-ocid="bible.select"
      >
        {currentBooks.map((book) => (
          <button
            key={book.name}
            type="button"
            onClick={() => handleBookChange(book.name)}
            className={`text-[11px] font-medium px-2 py-1.5 rounded-lg text-left truncate transition-all duration-150 ${
              selectedBook === book.name
                ? "bg-df-red text-white"
                : "bg-white/[0.06] text-df-text-muted hover:bg-white/[0.10] hover:text-df-text"
            }`}
            title={book.name}
          >
            {book.name}
          </button>
        ))}
      </div>

      {/* Chapter strip */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrevChapter}
          disabled={isFirstChapterOfFirst}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-df-text-muted hover:text-df-text hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          data-ocid="bible.pagination_prev"
          aria-label="Previous chapter"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={chapterStripRef}
          className="flex-1 flex gap-1 overflow-x-auto scrollbar-thin py-0.5"
        >
          {Array.from({ length: maxChapters }, (_, i) => i + 1).map((ch) => (
            <button
              key={ch}
              type="button"
              data-active={ch === selectedChapter ? "true" : "false"}
              onClick={() => handleChapterChange(ch)}
              className={`flex-shrink-0 w-7 h-7 text-[11px] font-semibold rounded-lg transition-all duration-150 ${
                ch === selectedChapter
                  ? "bg-df-red text-white shadow-sm"
                  : "bg-white/[0.06] text-df-text-muted hover:bg-white/[0.10] hover:text-df-text"
              }`}
              aria-label={`Chapter ${ch}`}
            >
              {ch}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNextChapter}
          disabled={isLastChapterOfLast}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-df-text-muted hover:text-df-text hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          data-ocid="bible.pagination_next"
          aria-label="Next chapter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reference label */}
      {reference && !loading && (
        <div className="flex items-center gap-2 -mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-df-red flex-shrink-0" />
          <p className="text-base font-semibold text-df-text">{reference}</p>
        </div>
      )}

      {/* Verse content area */}
      <ScrollArea className="h-[340px]" data-ocid="bible.panel">
        {loading && (
          <div
            className="h-72 flex items-center justify-center"
            data-ocid="bible.loading_state"
          >
            <Loader2 className="w-5 h-5 text-df-red animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div
            className="h-72 flex flex-col items-center justify-center gap-3 text-center px-4"
            data-ocid="bible.error_state"
          >
            <p className="text-df-text-muted text-sm">{error}</p>
            <button
              type="button"
              onClick={() => setSelectedChapter((c) => c)}
              className="text-xs text-df-red hover:text-df-red/80 underline underline-offset-2 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <div className="pr-3 space-y-3 pb-2">
            {verses.map((v) => (
              <div key={v.verse} className="flex gap-3 group">
                <span className="text-[11px] font-bold text-df-red mt-0.5 w-5 flex-shrink-0 leading-5 tabular-nums">
                  {v.verse}
                </span>
                <p className="text-sm text-df-text leading-relaxed flex-1">
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
            <p className="text-df-text-muted text-sm">No verses found.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
