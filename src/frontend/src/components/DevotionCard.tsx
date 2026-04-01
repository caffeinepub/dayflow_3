import { BookMarked } from "lucide-react";
import { motion } from "motion/react";

interface VerseData {
  reference: string;
  verse: string;
  reflection: string;
}

const VERSES: VerseData[] = [
  {
    reference: "Jeremiah 29:11",
    verse:
      "\u201cFor I know the plans I have for you,\u201d declares the Lord, \u201cplans to prosper you and not to harm you, plans to give you hope and a future.\u201d",
    reflection:
      "God holds your future with purposeful hands. Even in uncertainty, you are not forgotten \u2014 you are guided.",
  },
  {
    reference: "Philippians 4:13",
    verse: "I can do all this through him who gives me strength.",
    reflection:
      "Every challenge you face today, you face with divine strength alongside you. You are not limited by your own power.",
  },
  {
    reference: "John 3:16",
    verse:
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reflection:
      "The greatest act of love in history was done for you. You are infinitely valued and eternally loved.",
  },
  {
    reference: "Psalm 23:1",
    verse: "The Lord is my shepherd, I lack nothing.",
    reflection:
      "When God leads, nothing essential is missing. Rest in the assurance that your true needs are already met.",
  },
  {
    reference: "Romans 8:28",
    verse:
      "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reflection:
      "Even what feels broken today is being woven into something beautiful. Trust the process God is writing in your life.",
  },
  {
    reference: "Isaiah 40:31",
    verse:
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reflection:
      "Waiting on God is not passive \u2014 it is an act of trust that builds wings. Your renewal is coming.",
  },
  {
    reference: "Proverbs 3:5-6",
    verse:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reflection:
      "Surrender your plans to God today. What feels like a detour may be the most direct path to where you need to be.",
  },
  {
    reference: "Matthew 6:33",
    verse:
      "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    reflection:
      "Put God first in this day and watch how everything else finds its proper place around that priority.",
  },
  {
    reference: "Psalm 46:10",
    verse:
      "He says, \u201cBe still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.\u201d",
    reflection:
      "In the noise of today, find a moment of stillness. God\u2019s presence is most clearly heard in the quiet.",
  },
  {
    reference: "2 Corinthians 5:17",
    verse:
      "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reflection:
      "Today you carry the identity of a new creation. Whatever yesterday held, today is a fresh chapter in God\u2019s story.",
  },
  {
    reference: "Psalm 121:1-2",
    verse:
      "I lift up my eyes to the mountains \u2014 where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
    reflection:
      "When you feel overwhelmed, look up. The One who created the cosmos is attentive to your need right now.",
  },
  {
    reference: "Romans 15:13",
    verse:
      "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    reflection:
      "Hope is not wishful thinking \u2014 it is divine power at work within you. Let it overflow to everyone you meet today.",
  },
  {
    reference: "Lamentations 3:22-23",
    verse:
      "Because of the Lord\u2019s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    reflection:
      "This morning is a mercy. God\u2019s compassion has been renewed specifically for you today.",
  },
  {
    reference: "Joshua 1:9",
    verse:
      "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reflection:
      "Courage is not the absence of fear \u2014 it is stepping forward knowing you are never walking alone.",
  },
  {
    reference: "Psalm 37:4",
    verse:
      "Take delight in the Lord, and he will give you the desires of your heart.",
    reflection:
      "As you draw closer to God, your desires align with His will \u2014 and that is where true fulfillment is found.",
  },
  {
    reference: "Isaiah 41:10",
    verse:
      "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    reflection:
      "You are upheld by divine hands today. Whatever threatens to shake you, something stronger holds you firm.",
  },
  {
    reference: "Matthew 11:28",
    verse:
      "Come to me, all you who are weary and burdened, and I will give you rest.",
    reflection:
      "Jesus extends an open invitation to every tired heart. You do not have to carry today\u2019s weight alone.",
  },
  {
    reference: "Ephesians 3:20",
    verse:
      "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.",
    reflection:
      "God\u2019s plans for you exceed your greatest imagination. Dream boldly, then trust Him to exceed even that.",
  },
  {
    reference: "1 Peter 5:7",
    verse: "Cast all your anxiety on him because he cares for you.",
    reflection:
      "Every worry you carry today can be surrendered. God\u2019s care for you is not abstract \u2014 it is personal and deep.",
  },
  {
    reference: "Psalm 91:1",
    verse:
      "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    reflection:
      "There is a place of rest available to you \u2014 not a place you travel to, but a presence you abide in.",
  },
  {
    reference: "Galatians 6:9",
    verse:
      "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    reflection:
      "The seeds of faithfulness you plant today will bear fruit. Do not measure the harvest by today\u2019s effort.",
  },
  {
    reference: "James 1:5",
    verse:
      "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
    reflection:
      "Every decision you face today has a divine counselor available. Ask freely \u2014 God gives wisdom without reluctance.",
  },
  {
    reference: "Psalm 139:14",
    verse:
      "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    reflection:
      "You are not an accident or an afterthought. You were crafted with intention and declared wonderful by your Creator.",
  },
  {
    reference: "Proverbs 16:3",
    verse:
      "Commit to the Lord whatever you do, and he will establish your plans.",
    reflection:
      "Begin today\u2019s tasks as acts of worship. When your work is offered to God, He gives it staying power.",
  },
  {
    reference: "John 14:27",
    verse:
      "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reflection:
      "The peace Jesus offers is not dependent on circumstances. It is a settled assurance that transcends your situation.",
  },
  {
    reference: "Psalm 16:8",
    verse:
      "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.",
    reflection:
      "Where your attention goes, your stability follows. Fix your gaze on God today and find unshakeable ground.",
  },
  {
    reference: "Romans 8:37",
    verse:
      "No, in all these things we are more than conquerors through him who loved us.",
    reflection:
      "You do not merely survive your struggles \u2014 through Christ, you triumph over them. You are a conqueror by design.",
  },
  {
    reference: "2 Timothy 1:7",
    verse:
      "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
    reflection:
      "Fear is not from God. Step boldly into today knowing power, love, and a clear mind are your spiritual inheritance.",
  },
  {
    reference: "Psalm 34:18",
    verse:
      "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reflection:
      "Your pain is not invisible to God \u2014 it draws Him near. In your lowest moments, He is closest.",
  },
  {
    reference: "Hebrews 11:1",
    verse:
      "Now faith is confidence in what we hope for and assurance about what we do not see.",
    reflection:
      "Faith is not blind \u2014 it is sight beyond the visible. Trust what God has promised more than what you currently see.",
  },
  {
    reference: "Micah 6:8",
    verse:
      "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
    reflection:
      "A life well-lived is not complicated: justice, mercy, and humble fellowship with God. Let these guide your day.",
  },
];

export default function DevotionCard() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  const devotion = VERSES[dayOfYear % VERSES.length];
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-df-navy-mid shadow-card flex flex-col h-full min-h-[340px] p-5 relative overflow-hidden">
      {/* Warm glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative">
        <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
          <BookMarked className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-df-text">Daily Devotion</h3>
          <p className="text-[10px] text-amber-400/70">{dateStr}</p>
        </div>
      </div>

      {/* Verse */}
      <motion.div
        key={devotion.reference}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col gap-4 relative"
        data-ocid="devotion.card"
      >
        {/* Reference badge */}
        <div className="inline-flex">
          <span className="text-[11px] font-semibold bg-amber-500/15 text-amber-300 rounded-full px-3 py-1 border border-amber-500/20">
            {devotion.reference}
          </span>
        </div>

        {/* Verse text */}
        <blockquote className="border-l-2 border-amber-500/40 pl-3">
          <p className="text-sm leading-relaxed text-df-text/90 italic">
            {devotion.verse}
          </p>
        </blockquote>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-amber-500/10" />
          <span className="text-amber-500/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-amber-500/10" />
        </div>

        {/* Reflection */}
        <div className="bg-amber-500/[0.06] rounded-xl p-3 border border-amber-500/10">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/70 mb-1.5">
            Reflection
          </p>
          <p className="text-xs text-df-text-muted leading-relaxed">
            {devotion.reflection}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
