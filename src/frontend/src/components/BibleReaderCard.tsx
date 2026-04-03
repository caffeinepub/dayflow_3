import { ScrollArea } from "@/components/ui/scroll-area";
import {
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

  // Case-insensitive book name lookup
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

  // Search state (synchronous — no async needed)
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

  // Fetch chapter verses
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

  // Scroll to highlighted verse
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

  // -- Synchronous search logic --
  const trimmedQuery = searchQuery.trim();
  const showSearchPanel = trimmedQuery.length > 0;

  // Try reference detection first
  const detectedRef =
    trimmedQuery.length > 1 ? detectReference(trimmedQuery) : null;

  // Local keyword matches in current chapter
  const localMatches =
    trimmedQuery.length > 1 && !detectedRef
      ? verses.filter((v) =>
          v.text.toLowerCase().includes(trimmedQuery.toLowerCase()),
        )
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
            placeholder="Search verses or type John 3:16..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            data-ocid="bible.search_input"
            aria-label="Search verses by keyword or reference"
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

        {/* Search results panel */}
        {showSearchPanel && (
          <div
            className="mt-1 bg-white border border-gray-200 rounded-xl p-2 max-h-64 overflow-y-auto z-10 relative shadow-md"
            data-ocid="bible.search_results"
          >
            {/* Reference detection — jump directly */}
            {detectedRef && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-1 pb-1">
                  Go to Reference
                </p>
                <button
                  type="button"
                  onClick={() => handleReferenceNav(detectedRef)}
                  className="w-full text-left rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors group"
                  data-ocid="bible.search_result_item"
                >
                  <span
                    className="block text-sm font-bold leading-tight"
                    style={{ color: SKY }}
                  >
                    {detectedRef.book} {detectedRef.chapter}
                    {detectedRef.verse !== null ? `:${detectedRef.verse}` : ""}
                  </span>
                  <span className="text-xs text-gray-400">
                    Jump to this passage
                  </span>
                </button>
              </div>
            )}

            {/* Local keyword matches */}
            {!detectedRef && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-1 pb-1">
                  Matches in {selectedBook} {selectedChapter}
                </p>
                {localMatches.length === 0 ? (
                  <p className="text-gray-400 text-xs text-center py-3 px-3">
                    No matches in this chapter.
                  </p>
                ) : (
                  <ul className="space-y-0.5">
                    {localMatches.map((v) => (
                      <li key={`local-${v.verse}`}>
                        <button
                          type="button"
                          onClick={() => handleSearchResultClick(v)}
                          className="w-full text-left rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50"
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
                )}
              </div>
            )}

            {/* Google search fallback — always shown when query > 1 char */}
            {trimmedQuery.length > 1 && (
              <div className="mt-1 pt-1 border-t border-gray-100">
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors group"
                  data-ocid="bible.google_search_link"
                  aria-label={`Search Google for ${trimmedQuery}`}
                >
                  {/* Colorful G badge */}
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[11px] font-extrabold leading-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "saturate(1.2)",
                    }}
                    aria-hidden="true"
                  >
                    G
                  </span>
                  <span className="flex-1 text-xs text-gray-600 group-hover:text-blue-700 transition-colors">
                    Search Google for{" "}
                    <span className="font-semibold text-gray-800">
                      &ldquo;{trimmedQuery}&rdquo;
                    </span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                </a>
              </div>
            )}
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
