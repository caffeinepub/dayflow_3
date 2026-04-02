import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Library, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const BIBLE_BOOKS: { name: string; chapters: number }[] = [
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

export default function BibleReaderCard() {
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [reference, setReference] = useState("");
  const [translationName, setTranslationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // go to previous book
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
      // go to next book
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

  const isFirstChapterOfFirst =
    selectedBook === BIBLE_BOOKS[0].name && selectedChapter === 1;
  const isLastChapterOfLast =
    selectedBook === BIBLE_BOOKS[BIBLE_BOOKS.length - 1].name &&
    selectedChapter === maxChapters;

  return (
    <div
      className="bg-df-navy-light border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 shadow-card"
      data-ocid="bible.card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-df-teal-dim flex items-center justify-center flex-shrink-0">
          <Library className="w-4 h-4 text-df-teal" />
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

      {/* Book & Chapter selectors */}
      <div className="flex items-center gap-2">
        {/* Book dropdown */}
        <div className="flex-1 min-w-0" data-ocid="bible.select">
          <Select value={selectedBook} onValueChange={handleBookChange}>
            <SelectTrigger className="h-8 bg-df-navy border-white/[0.08] text-df-text text-xs focus:ring-df-teal/30">
              <SelectValue placeholder="Book" />
            </SelectTrigger>
            <SelectContent className="bg-df-navy-mid border-white/[0.08] text-df-text max-h-64">
              {BIBLE_BOOKS.map((book) => (
                <SelectItem
                  key={book.name}
                  value={book.name}
                  className="text-xs text-df-text focus:bg-df-teal-dim focus:text-df-teal"
                >
                  {book.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chapter navigation */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={handlePrevChapter}
            disabled={isFirstChapterOfFirst}
            className="w-7 h-8 flex items-center justify-center rounded-lg text-df-text-muted hover:text-df-text hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            data-ocid="bible.pagination_prev"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Chapter dropdown */}
          <div data-ocid="bible.chapter_select">
            <Select
              value={String(selectedChapter)}
              onValueChange={(v) => setSelectedChapter(Number(v))}
            >
              <SelectTrigger className="h-8 w-20 bg-df-navy border-white/[0.08] text-df-text text-xs focus:ring-df-teal/30">
                <span className="text-df-text-muted text-[10px] mr-0.5">
                  Ch
                </span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-df-navy-mid border-white/[0.08] text-df-text max-h-48">
                {Array.from({ length: maxChapters }, (_, i) => i + 1).map(
                  (ch) => (
                    <SelectItem
                      key={ch}
                      value={String(ch)}
                      className="text-xs text-df-text focus:bg-df-teal-dim focus:text-df-teal"
                    >
                      {ch}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={handleNextChapter}
            disabled={isLastChapterOfLast}
            className="w-7 h-8 flex items-center justify-center rounded-lg text-df-text-muted hover:text-df-text hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            data-ocid="bible.pagination_next"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reference label */}
      {reference && !loading && (
        <p className="text-[11px] font-semibold text-df-teal uppercase tracking-widest -mb-2">
          {reference}
        </p>
      )}

      {/* Verse content area */}
      <ScrollArea className="h-80" data-ocid="bible.panel">
        {loading && (
          <div
            className="h-72 flex items-center justify-center"
            data-ocid="bible.loading_state"
          >
            <Loader2 className="w-5 h-5 text-df-teal animate-spin" />
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
              className="text-xs text-df-teal hover:text-df-teal/80 underline underline-offset-2 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <div className="pr-3 space-y-3 pb-2">
            {verses.map((v) => (
              <div key={v.verse} className="flex gap-3 group">
                <span className="text-[11px] font-bold text-df-teal mt-0.5 w-5 flex-shrink-0 leading-5 tabular-nums">
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
