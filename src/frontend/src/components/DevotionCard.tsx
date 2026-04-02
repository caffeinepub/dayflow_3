import { BookMarked } from "lucide-react";
import { motion } from "motion/react";

interface VerseData {
  reference: string;
  verse: string;
  reflection: string;
}

const VERSES: VerseData[] = [
  // Day 1
  {
    reference: "Jeremiah 29:11",
    verse:
      "\u201cFor I know the plans I have for you,\u201d declares the Lord, \u201cplans to prosper you and not to harm you, plans to give you hope and a future.\u201d",
    reflection:
      "God holds your future with purposeful hands. Even in uncertainty, you are not forgotten \u2014 you are guided.",
  },
  // Day 2
  {
    reference: "Philippians 4:13",
    verse: "I can do all this through him who gives me strength.",
    reflection:
      "Every challenge you face today, you face with divine strength alongside you. You are not limited by your own power.",
  },
  // Day 3
  {
    reference: "John 3:16",
    verse:
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reflection:
      "The greatest act of love in history was done for you. You are infinitely valued and eternally loved.",
  },
  // Day 4
  {
    reference: "Psalm 23:1",
    verse: "The Lord is my shepherd, I lack nothing.",
    reflection:
      "When God leads, nothing essential is missing. Rest in the assurance that your true needs are already met.",
  },
  // Day 5
  {
    reference: "Romans 8:28",
    verse:
      "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reflection:
      "Even what feels broken today is being woven into something beautiful. Trust the process God is writing in your life.",
  },
  // Day 6
  {
    reference: "Isaiah 40:31",
    verse:
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reflection:
      "Waiting on God is not passive \u2014 it is an act of trust that builds wings. Your renewal is coming.",
  },
  // Day 7
  {
    reference: "Proverbs 3:5-6",
    verse:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reflection:
      "Surrender your plans to God today. What feels like a detour may be the most direct path to where you need to be.",
  },
  // Day 8
  {
    reference: "Matthew 6:33",
    verse:
      "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    reflection:
      "Put God first in this day and watch how everything else finds its proper place around that priority.",
  },
  // Day 9
  {
    reference: "Psalm 46:10",
    verse:
      "He says, \u201cBe still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.\u201d",
    reflection:
      "In the noise of today, find a moment of stillness. God\u2019s presence is most clearly heard in the quiet.",
  },
  // Day 10
  {
    reference: "2 Corinthians 5:17",
    verse:
      "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reflection:
      "Today you carry the identity of a new creation. Whatever yesterday held, today is a fresh chapter in God\u2019s story.",
  },
  // Day 11
  {
    reference: "Psalm 121:1-2",
    verse:
      "I lift up my eyes to the mountains \u2014 where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
    reflection:
      "When you feel overwhelmed, look up. The One who created the cosmos is attentive to your need right now.",
  },
  // Day 12
  {
    reference: "Romans 15:13",
    verse:
      "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    reflection:
      "Hope is not wishful thinking \u2014 it is divine power at work within you. Let it overflow to everyone you meet today.",
  },
  // Day 13
  {
    reference: "Lamentations 3:22-23",
    verse:
      "Because of the Lord\u2019s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    reflection:
      "This morning is a mercy. God\u2019s compassion has been renewed specifically for you today.",
  },
  // Day 14
  {
    reference: "Joshua 1:9",
    verse:
      "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reflection:
      "Courage is not the absence of fear \u2014 it is stepping forward knowing you are never walking alone.",
  },
  // Day 15
  {
    reference: "Psalm 37:4",
    verse:
      "Take delight in the Lord, and he will give you the desires of your heart.",
    reflection:
      "As you draw closer to God, your desires align with His will \u2014 and that is where true fulfillment is found.",
  },
  // Day 16
  {
    reference: "Isaiah 41:10",
    verse:
      "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    reflection:
      "You are upheld by divine hands today. Whatever threatens to shake you, something stronger holds you firm.",
  },
  // Day 17
  {
    reference: "Matthew 11:28",
    verse:
      "Come to me, all you who are weary and burdened, and I will give you rest.",
    reflection:
      "Jesus extends an open invitation to every tired heart. You do not have to carry today\u2019s weight alone.",
  },
  // Day 18
  {
    reference: "Ephesians 3:20",
    verse:
      "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.",
    reflection:
      "God\u2019s plans for you exceed your greatest imagination. Dream boldly, then trust Him to exceed even that.",
  },
  // Day 19
  {
    reference: "1 Peter 5:7",
    verse: "Cast all your anxiety on him because he cares for you.",
    reflection:
      "Every worry you carry today can be surrendered. God\u2019s care for you is not abstract \u2014 it is personal and deep.",
  },
  // Day 20
  {
    reference: "Psalm 91:1",
    verse:
      "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    reflection:
      "There is a place of rest available to you \u2014 not a place you travel to, but a presence you abide in.",
  },
  // Day 21
  {
    reference: "Galatians 6:9",
    verse:
      "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    reflection:
      "The seeds of faithfulness you plant today will bear fruit. Do not measure the harvest by today\u2019s effort.",
  },
  // Day 22
  {
    reference: "James 1:5",
    verse:
      "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
    reflection:
      "Every decision you face today has a divine counselor available. Ask freely \u2014 God gives wisdom without reluctance.",
  },
  // Day 23
  {
    reference: "Psalm 139:14",
    verse:
      "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    reflection:
      "You are not an accident or an afterthought. You were crafted with intention and declared wonderful by your Creator.",
  },
  // Day 24
  {
    reference: "Proverbs 16:3",
    verse:
      "Commit to the Lord whatever you do, and he will establish your plans.",
    reflection:
      "Begin today\u2019s tasks as acts of worship. When your work is offered to God, He gives it staying power.",
  },
  // Day 25
  {
    reference: "John 14:27",
    verse:
      "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reflection:
      "The peace Jesus offers is not dependent on circumstances. It is a settled assurance that transcends your situation.",
  },
  // Day 26
  {
    reference: "Psalm 16:8",
    verse:
      "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.",
    reflection:
      "Where your attention goes, your stability follows. Fix your gaze on God today and find unshakeable ground.",
  },
  // Day 27
  {
    reference: "Romans 8:37",
    verse:
      "No, in all these things we are more than conquerors through him who loved us.",
    reflection:
      "You do not merely survive your struggles \u2014 through Christ, you triumph over them. You are a conqueror by design.",
  },
  // Day 28
  {
    reference: "2 Timothy 1:7",
    verse:
      "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
    reflection:
      "Fear is not from God. Step boldly into today knowing power, love, and a clear mind are your spiritual inheritance.",
  },
  // Day 29
  {
    reference: "Psalm 34:18",
    verse:
      "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reflection:
      "Your pain is not invisible to God \u2014 it draws Him near. In your lowest moments, He is closest.",
  },
  // Day 30
  {
    reference: "Hebrews 11:1",
    verse:
      "Now faith is confidence in what we hope for and assurance about what we do not see.",
    reflection:
      "Faith is not blind \u2014 it is sight beyond the visible. Trust what God has promised more than what you currently see.",
  },
  // Day 31
  {
    reference: "Micah 6:8",
    verse:
      "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
    reflection:
      "A life well-lived is not complicated: justice, mercy, and humble fellowship with God. Let these guide your day.",
  },
  // Day 32
  {
    reference: "Psalm 1:1-2",
    verse:
      "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord.",
    reflection:
      "The company you keep shapes who you become. Choose the path where God\u2019s Word is your delight and guide.",
  },
  // Day 33
  {
    reference: "John 15:5",
    verse:
      "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.",
    reflection:
      "Fruitfulness is not the result of more effort but deeper connection. Stay rooted in Christ and watch what grows.",
  },
  // Day 34
  {
    reference: "Isaiah 43:2",
    verse:
      "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
    reflection:
      "The presence of God does not remove every trial, but it ensures no trial can consume you.",
  },
  // Day 35
  {
    reference: "Philippians 4:6-7",
    verse:
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reflection:
      "Anxiety is an invitation to pray. Every worry transformed into a prayer becomes a gateway to God\u2019s peace.",
  },
  // Day 36
  {
    reference: "Deuteronomy 31:6",
    verse:
      "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
    reflection:
      "You will never face anything alone. God\u2019s companionship is not occasional \u2014 it is permanent and unconditional.",
  },
  // Day 37
  {
    reference: "Psalm 27:1",
    verse:
      "The Lord is my light and my salvation \u2014 whom shall I fear? The Lord is the stronghold of my life \u2014 of whom shall I be afraid?",
    reflection:
      "With God as your light, no darkness can define you. With Him as your stronghold, no threat can hold you.",
  },
  // Day 38
  {
    reference: "Colossians 3:23",
    verse:
      "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    reflection:
      "Every task done with devotion to God is an act of worship. Give your best today as an offering to Him.",
  },
  // Day 39
  {
    reference: "1 John 4:18",
    verse:
      "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
    reflection:
      "God\u2019s love for you is complete and unconditional. Let that perfect love push out every fear you carry today.",
  },
  // Day 40
  {
    reference: "Psalm 119:105",
    verse: "Your word is a lamp for my feet, a light on my path.",
    reflection:
      "You don\u2019t need to see the whole road \u2014 just the next step. God\u2019s Word illuminates exactly what you need for today.",
  },
  // Day 41
  {
    reference: "Isaiah 26:3",
    verse:
      "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    reflection:
      "Peace is not found in resolved circumstances but in a mind fixed on God. Choose where you set your thoughts.",
  },
  // Day 42
  {
    reference: "Matthew 5:16",
    verse:
      "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
    reflection:
      "Your life is a witness. How you live today can point others to God without saying a single word.",
  },
  // Day 43
  {
    reference: "Romans 12:2",
    verse:
      "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God\u2019s will is.",
    reflection:
      "Transformation starts in the mind. Feed it with truth today and let your thinking reshape your living.",
  },
  // Day 44
  {
    reference: "Psalm 51:10",
    verse:
      "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
    reflection:
      "Renewal is always available. Invite God to refresh your heart today and restore the joy of walking with Him.",
  },
  // Day 45
  {
    reference: "James 4:8",
    verse: "Come near to God and he will come near to you.",
    reflection:
      "God never pulls away from those who seek Him. Every step you take toward Him is met with His movement toward you.",
  },
  // Day 46
  {
    reference: "1 Thessalonians 5:18",
    verse:
      "Give thanks in all circumstances; for this is God\u2019s will for you in Christ Jesus.",
    reflection:
      "Gratitude is not dependent on your circumstances being ideal. It is an act of trust that God is in every moment.",
  },
  // Day 47
  {
    reference: "Proverbs 4:23",
    verse:
      "Above all else, guard your heart, for everything you do flows from it.",
    reflection:
      "What you allow into your heart shapes the direction of your life. Be intentional about what you let in today.",
  },
  // Day 48
  {
    reference: "Psalm 62:5",
    verse: "Yes, my soul, find rest in God; my hope comes from him.",
    reflection:
      "True rest is not the absence of activity \u2014 it is the presence of God in the midst of it. Let your soul settle in Him.",
  },
  // Day 49
  {
    reference: "2 Chronicles 7:14",
    verse:
      "If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven.",
    reflection:
      "Humility and prayer open the door to God\u2019s response. He hears those who seek Him with a sincere heart.",
  },
  // Day 50
  {
    reference: "John 10:10",
    verse:
      "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.",
    reflection:
      "Jesus didn\u2019t come to give you a minimal existence. He came to fill your life with abundance that the world cannot give.",
  },
  // Day 51
  {
    reference: "Psalm 73:26",
    verse:
      "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.",
    reflection:
      "Even when you feel depleted, God\u2019s strength does not run dry. He is your inexhaustible portion.",
  },
  // Day 52
  {
    reference: "Zephaniah 3:17",
    verse:
      "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    reflection:
      "You are not merely tolerated by God \u2014 you are delighted in. He sings over you with joy today.",
  },
  // Day 53
  {
    reference: "Matthew 7:7",
    verse:
      "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
    reflection:
      "Prayer is not a last resort \u2014 it is a standing invitation. Keep asking, keep seeking, keep knocking.",
  },
  // Day 54
  {
    reference: "Isaiah 55:8-9",
    verse:
      "\u201cFor my thoughts are not your thoughts, neither are your ways my ways,\u201d declares the Lord. \u201cAs the heavens are higher than the earth, so are my ways higher than your ways.\u201d",
    reflection:
      "When life doesn\u2019t make sense, remember that God\u2019s perspective is infinitely higher. Trust what you cannot yet understand.",
  },
  // Day 55
  {
    reference: "Psalm 84:11",
    verse:
      "For the Lord God is a sun and shield; the Lord bestows favor and honor; no good thing does he withhold from those whose walk is blameless.",
    reflection:
      "God is not holding back good things from you. Walk with integrity and trust Him to pour out His favor in His timing.",
  },
  // Day 56
  {
    reference: "Romans 5:8",
    verse:
      "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    reflection:
      "God\u2019s love did not wait for you to be worthy. It was given freely before you ever sought it.",
  },
  // Day 57
  {
    reference: "Nahum 1:7",
    verse:
      "The Lord is good, a refuge in times of trouble. He cares for those who trust in him.",
    reflection:
      "In every storm, God is a shelter. Run to Him not as a last resort, but as a first response.",
  },
  // Day 58
  {
    reference: "John 8:36",
    verse: "So if the Son sets you free, you will be free indeed.",
    reflection:
      "The freedom Christ offers is complete, not partial. Walk in the fullness of that liberation today.",
  },
  // Day 59
  {
    reference: "Psalm 46:1",
    verse: "God is our refuge and strength, an ever-present help in trouble.",
    reflection:
      "God is not a distant observer of your struggles \u2014 He is ever-present, actively working on your behalf.",
  },
  // Day 60
  {
    reference: "Hebrews 4:16",
    verse:
      "Let us then approach God\u2019s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.",
    reflection:
      "You are invited to come boldly to God. He does not meet you with condemnation but with grace and mercy.",
  },
  // Day 61
  {
    reference: "Psalm 103:12",
    verse:
      "As far as the east is from the west, so far has he removed our transgressions from us.",
    reflection:
      "Your forgiven sins have been removed completely \u2014 not partially. God does not hold your past against you.",
  },
  // Day 62
  {
    reference: "John 11:25",
    verse:
      "Jesus said to her, \u201cI am the resurrection and the life. The one who believes in me will live, even though they die.\u201d",
    reflection:
      "Death does not have the final word for those in Christ. The same power that raised Jesus is alive in you today.",
  },
  // Day 63
  {
    reference: "Genesis 1:27",
    verse:
      "So God created mankind in his own image, in the image of God he created them; male and female he created them.",
    reflection:
      "You bear the image of the Creator. This truth gives your existence profound dignity and worth.",
  },
  // Day 64
  {
    reference: "Psalm 145:18",
    verse:
      "The Lord is near to all who call on him, to all who call on him in truth.",
    reflection:
      "Prayer closes every distance. Call out to God honestly today and find Him already beside you.",
  },
  // Day 65
  {
    reference: "Ephesians 2:10",
    verse:
      "For we are God\u2019s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    reflection:
      "Your life has a purpose already prepared by God. You are not searching for meaning \u2014 you are living into it.",
  },
  // Day 66
  {
    reference: "1 Corinthians 13:4-5",
    verse:
      "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking.",
    reflection:
      "Love is an action, not just a feeling. Let how you treat others today reflect the love God has poured into you.",
  },
  // Day 67
  {
    reference: "Psalm 18:2",
    verse:
      "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.",
    reflection:
      "When everything around you shifts, God remains immovable. Anchor yourself in Him today.",
  },
  // Day 68
  {
    reference: "Luke 12:7",
    verse:
      "Indeed, the very hairs of your head are all numbered. Don\u2019t be afraid; you are worth more than many sparrows.",
    reflection:
      "God\u2019s knowledge of you is exhaustively detailed. You are known and treasured beyond measure.",
  },
  // Day 69
  {
    reference: "Psalm 32:8",
    verse:
      "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
    reflection:
      "God is not a distant guide \u2014 He is a personal counselor watching over every step you take.",
  },
  // Day 70
  {
    reference: "John 1:12",
    verse:
      "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.",
    reflection:
      "You are not a stranger to God \u2014 you are His child. Live today in the confidence of that identity.",
  },
  // Day 71
  {
    reference: "1 Chronicles 16:11",
    verse: "Look to the Lord and his strength; seek his face always.",
    reflection:
      "Strength for today is found in God\u2019s presence. Seek His face before you seek solutions.",
  },
  // Day 72
  {
    reference: "Psalm 9:9",
    verse:
      "The Lord is a refuge for the oppressed, a stronghold in times of trouble.",
    reflection:
      "No matter what has pressed down on you, God offers a safe place. You can bring all your burdens to Him.",
  },
  // Day 73
  {
    reference: "2 Corinthians 12:9",
    verse:
      "But he said to me, \u201cMy grace is sufficient for you, for my power is made perfect in weakness.\u201d",
    reflection:
      "Your weaknesses are not disqualifiers \u2014 they are the very places where God\u2019s power shows up most clearly.",
  },
  // Day 74
  {
    reference: "Jeremiah 17:7",
    verse:
      "But blessed is the one who trusts in the Lord, whose confidence is in him.",
    reflection:
      "Confidence rooted in God is unshakeable. Build your trust there and let it hold you when everything else wavers.",
  },
  // Day 75
  {
    reference: "Psalm 40:1-2",
    verse:
      "I waited patiently for the Lord; he turned to me and heard my cry. He lifted me out of the slimy pit, out of the mud and mire; he set my feet on a rock.",
    reflection:
      "Waiting on God is never wasted time. He hears every cry and lifts those who trust in Him.",
  },
  // Day 76
  {
    reference: "Habakkuk 3:19",
    verse:
      "The Sovereign Lord is my strength; he makes my feet like the feet of a deer, he enables me to tread on the heights.",
    reflection:
      "God turns your weakness into sure-footedness. He equips you for the high places He is calling you to.",
  },
  // Day 77
  {
    reference: "Matthew 19:26",
    verse:
      "Jesus looked at them and said, \u201cWith man this is impossible, but with God all things are possible.\u201d",
    reflection:
      "The limits of human ability are not the limits of God\u2019s capability. What looks impossible is workable in His hands.",
  },
  // Day 78
  {
    reference: "Psalm 25:4-5",
    verse:
      "Show me your ways, Lord, teach me your paths. Guide me in your truth and teach me, for you are God my Savior, and my hope is in you all day long.",
    reflection:
      "Invite God to be your teacher today. His truth will redirect every wrong path and confirm every right one.",
  },
  // Day 79
  {
    reference: "Philippians 1:6",
    verse:
      "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.",
    reflection:
      "God does not start work in you and abandon it. He is committed to seeing you through to completion.",
  },
  // Day 80
  {
    reference: "Psalm 56:3",
    verse: "When I am afraid, I put my trust in you.",
    reflection:
      "Fear does not disqualify you from faith. Choosing to trust God in the middle of fear is one of the bravest things you can do.",
  },
  // Day 81
  {
    reference: "Colossians 1:17",
    verse: "He is before all things, and in him all things hold together.",
    reflection:
      "When your world feels like it\u2019s falling apart, remember Christ holds all things together. He holds you, too.",
  },
  // Day 82
  {
    reference: "Isaiah 58:11",
    verse:
      "The Lord will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame.",
    reflection:
      "In the driest seasons of life, God\u2019s guidance and provision remain. He does not abandon you in the desert.",
  },
  // Day 83
  {
    reference: "Luke 1:37",
    verse: "For no word from God will ever fail.",
    reflection:
      "Every promise God has ever spoken is still in effect. His Word does not expire or diminish over time.",
  },
  // Day 84
  {
    reference: "Psalm 31:24",
    verse: "Be strong and take heart, all you who hope in the Lord.",
    reflection:
      "Hope in God gives the heart courage. Lift your head today \u2014 the God of your hope is still at work.",
  },
  // Day 85
  {
    reference: "John 14:6",
    verse:
      "Jesus answered, \u201cI am the way and the truth and the life. No one comes to the Father except through me.\u201d",
    reflection:
      "Jesus is not a pathway among many \u2014 He is the way itself. Walk closely with Him today.",
  },
  // Day 86
  {
    reference: "Romans 8:1",
    verse:
      "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    reflection:
      "You do not carry the weight of condemnation. In Christ, that verdict has been overturned permanently.",
  },
  // Day 87
  {
    reference: "Psalm 100:4-5",
    verse:
      "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name. For the Lord is good and his love endures forever.",
    reflection:
      "Gratitude is the posture of a heart that has truly seen God. Let praise shape how you enter this day.",
  },
  // Day 88
  {
    reference: "Ephesians 6:10",
    verse: "Finally, be strong in the Lord and in his mighty power.",
    reflection:
      "Your strength for today does not come from within yourself \u2014 it comes from the unlimited power of God.",
  },
  // Day 89
  {
    reference: "Psalm 55:22",
    verse:
      "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.",
    reflection:
      "God can handle everything you\u2019re carrying. Hand it over and let Him bear the weight He was never meant to put on you.",
  },
  // Day 90
  {
    reference: "Titus 3:5",
    verse:
      "He saved us, not because of righteous things we had done, but because of his mercy.",
    reflection:
      "Salvation is a gift from God\u2019s mercy, not a reward for your performance. Receive it freely and walk in it fully.",
  },
  // Day 91
  {
    reference: "Job 42:2",
    verse:
      "I know that you can do all things; no purpose of yours can be thwarted.",
    reflection:
      "Nothing in heaven or earth can stop what God has purposed for your life. His plans are unstoppable.",
  },
  // Day 92
  {
    reference: "Psalm 145:8",
    verse:
      "The Lord is gracious and compassionate, slow to anger and rich in love.",
    reflection:
      "God\u2019s response to your failures is compassion, not condemnation. He is rich in love toward you today.",
  },
  // Day 93
  {
    reference: "Hebrews 13:5",
    verse:
      "God has said, \u201cNever will I leave you; never will I forsake you.\u201d",
    reflection:
      "Abandonment is not in God\u2019s vocabulary when it comes to you. His presence is a permanent promise.",
  },
  // Day 94
  {
    reference: "John 16:33",
    verse:
      "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
    reflection:
      "Jesus did not promise a trouble-free life \u2014 He promised His overcoming presence within every trouble.",
  },
  // Day 95
  {
    reference: "Psalm 30:5",
    verse:
      "Weeping may stay for the night, but rejoicing comes in the morning.",
    reflection:
      "Your current sorrow is not your permanent season. Morning is coming, and with it, the joy that God has reserved for you.",
  },
  // Day 96
  {
    reference: "1 John 1:9",
    verse:
      "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
    reflection:
      "Confession is not defeat \u2014 it is the beginning of freedom. God\u2019s forgiveness is waiting the moment you ask.",
  },
  // Day 97
  {
    reference: "Numbers 6:24-26",
    verse:
      "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
    reflection:
      "This ancient blessing is spoken over you today. God\u2019s face is turned toward you with grace and peace.",
  },
  // Day 98
  {
    reference: "Psalm 138:7",
    verse:
      "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes; with your right hand you save me.",
    reflection:
      "Trouble cannot touch what God is protecting. Even in the storm, His hand preserves you.",
  },
  // Day 99
  {
    reference: "Matthew 22:37-39",
    verse:
      "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself.",
    reflection:
      "Love is the summary of everything God asks of you. Let it be the lens through which you see every interaction today.",
  },
  // Day 100
  {
    reference: "Isaiah 30:21",
    verse:
      "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, \u201cThis is the way; walk in it.\u201d",
    reflection:
      "God\u2019s guidance is not hidden from those who seek it. Listen for His voice and follow where He leads.",
  },
  // Day 101
  {
    reference: "Psalm 119:11",
    verse:
      "I have hidden your word in my heart that I might not sin against you.",
    reflection:
      "The Word of God in your heart is your greatest defense and your clearest compass. Fill yourself with it daily.",
  },
  // Day 102
  {
    reference: "Romans 8:38-39",
    verse:
      "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God.",
    reflection:
      "Nothing can cut you off from God\u2019s love. Not failure, not circumstance, not time \u2014 His love is inescapable.",
  },
  // Day 103
  {
    reference: "Psalm 63:3",
    verse: "Because your love is better than life, my lips will glorify you.",
    reflection:
      "God\u2019s love surpasses everything life offers. Once you truly know it, praise becomes your natural response.",
  },
  // Day 104
  {
    reference: "Zechariah 4:6",
    verse:
      "\u201cNot by might nor by power, but by my Spirit,\u201d says the Lord Almighty.",
    reflection:
      "The breakthroughs you need will not come by human effort alone. Rely on God\u2019s Spirit to do what you cannot.",
  },
  // Day 105
  {
    reference: "1 Corinthians 10:13",
    verse:
      "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
    reflection:
      "You are not alone in your struggles, and you are not without a way out. God provides the exit from every temptation.",
  },
  // Day 106
  {
    reference: "Psalm 121:7-8",
    verse:
      "The Lord will keep you from all harm \u2014 he will watch over your life; the Lord will watch over your coming and going both now and forevermore.",
    reflection:
      "God\u2019s watchfulness over you is constant and complete. You are cared for in every moment and every movement.",
  },
  // Day 107
  {
    reference: "Jeremiah 31:3",
    verse:
      "The Lord appeared to us in the past, saying: \u201cI have loved you with an everlasting love; I have drawn you with unfailing kindness.\u201d",
    reflection:
      "God\u2019s love for you has no beginning and no end. His kindness has been drawing you toward Him all along.",
  },
  // Day 108
  {
    reference: "John 4:24",
    verse:
      "God is spirit, and his worshipers must worship in the Spirit and in truth.",
    reflection:
      "Worship is not confined to a building or a moment \u2014 it is a way of living in honest surrender to God.",
  },
  // Day 109
  {
    reference: "Psalm 107:9",
    verse:
      "For he satisfies the thirsty and fills the hungry with good things.",
    reflection:
      "The deepest longings of your soul were made for God alone to fill. Bring your hunger to Him today.",
  },
  // Day 110
  {
    reference: "Acts 1:8",
    verse:
      "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
    reflection:
      "You carry divine power within you. Let it show in the way you love, speak, and live.",
  },
  // Day 111
  {
    reference: "Psalm 19:14",
    verse:
      "May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord, my Rock and my Redeemer.",
    reflection:
      "Make this prayer yours today \u2014 let every word you speak and every thought you hold be an offering to God.",
  },
  // Day 112
  {
    reference: "Proverbs 17:17",
    verse:
      "A friend loves at all times, and a brother is born for a time of adversity.",
    reflection:
      "Be the kind of friend today who shows up not just in celebration but in struggle. That is love in action.",
  },
  // Day 113
  {
    reference: "Isaiah 64:8",
    verse:
      "Yet you, Lord, are our Father. We are the clay, you are the potter; we are all the work of your hand.",
    reflection:
      "You are not a finished product \u2014 you are a work in progress in the hands of a masterful Creator. Trust the shaping.",
  },
  // Day 114
  {
    reference: "Psalm 86:5",
    verse:
      "You, Lord, are forgiving and good, abounding in love to all who call to you.",
    reflection:
      "God\u2019s goodness is not reserved for the perfect \u2014 it is abundantly available to all who simply call on Him.",
  },
  // Day 115
  {
    reference: "Luke 6:27-28",
    verse:
      "But to you who are listening I say: Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you.",
    reflection:
      "Loving your enemies is not weakness \u2014 it is the highest form of strength. It reflects the very heart of God.",
  },
  // Day 116
  {
    reference: "Philippians 4:19",
    verse:
      "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
    reflection:
      "God\u2019s resources are without limit. Every need you have today is within the scope of what He can supply.",
  },
  // Day 117
  {
    reference: "Psalm 37:23",
    verse: "The Lord makes firm the steps of the one who delights in him.",
    reflection:
      "Delight in God is the secret to sure-footed living. When He is your joy, your steps are established.",
  },
  // Day 118
  {
    reference: "2 Peter 1:3",
    verse:
      "His divine power has given us everything we need for a godly life through our knowledge of him who called us by his own glory and goodness.",
    reflection:
      "You are not missing anything needed to live well for God. Everything has already been supplied through Christ.",
  },
  // Day 119
  {
    reference: "Psalm 33:18",
    verse:
      "But the eyes of the Lord are on those who fear him, on those who hope in his unfailing love.",
    reflection:
      "God\u2019s gaze is on you. His eyes are not distracted \u2014 they are fixed with love on those who trust in Him.",
  },
  // Day 120
  {
    reference: "Ezekiel 36:26",
    verse:
      "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.",
    reflection:
      "Where you have grown hard or numb, God offers transformation. He can soften what life has hardened.",
  },
  // Day 121
  {
    reference: "Psalm 3:3",
    verse:
      "But you, Lord, are a shield around me, my glory, the One who lifts my head high.",
    reflection:
      "When shame or sorrow presses your head down, God lifts it. He is your shield and your restored dignity.",
  },
  // Day 122
  {
    reference: "John 13:35",
    verse:
      "By this everyone will know that you are my disciples, if you love one another.",
    reflection:
      "Your love for others is the most powerful testimony you can give. Let it be unmistakable today.",
  },
  // Day 123
  {
    reference: "Isaiah 49:16",
    verse:
      "See, I have engraved you on the palms of my hands; your walls are ever before me.",
    reflection:
      "You are permanently written on God\u2019s hands. Your life is always before Him \u2014 never forgotten, never unseen.",
  },
  // Day 124
  {
    reference: "Psalm 65:11",
    verse:
      "You crown the year with your bounty, and your carts overflow with abundance.",
    reflection:
      "God\u2019s generosity flows through every season of the year. Look for His goodness even in unexpected places today.",
  },
  // Day 125
  {
    reference: "Matthew 28:20",
    verse: "And surely I am with you always, to the very end of the age.",
    reflection:
      "Jesus\u2019 final promise was His presence. You are never without Him \u2014 not today, not ever.",
  },
  // Day 126
  {
    reference: "Psalm 71:14",
    verse:
      "As for me, I will always have hope; I will praise you more and more.",
    reflection:
      "Hope and praise are a daily discipline. Choose them again today, regardless of how yesterday ended.",
  },
  // Day 127
  {
    reference: "1 Peter 2:9",
    verse:
      "But you are a chosen people, a royal priesthood, a holy nation, God\u2019s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.",
    reflection:
      "You are chosen, royal, and set apart. Your identity is far greater than any label the world tries to place on you.",
  },
  // Day 128
  {
    reference: "Romans 10:13",
    verse:
      "For, \u201cEveryone who calls on the name of the Lord will be saved.\u201d",
    reflection:
      "The door of salvation is open to everyone. No one is too far gone for God\u2019s grace to reach.",
  },
  // Day 129
  {
    reference: "Psalm 145:14",
    verse: "The Lord upholds all who fall and lifts up all who are bowed down.",
    reflection:
      "Falling is not final when God is near. He specializes in lifting those who have been brought low.",
  },
  // Day 130
  {
    reference: "2 Samuel 22:33",
    verse: "It is God who arms me with strength and keeps my way secure.",
    reflection:
      "The security you need for today comes from God\u2019s arming, not your own preparation. He equips you for every path.",
  },
  // Day 131
  {
    reference: "Psalm 86:11",
    verse:
      "Teach me your way, Lord, that I may rely on your faithfulness; give me an undivided heart, that I may fear your name.",
    reflection:
      "Ask God for an undivided heart today \u2014 one that is wholly His and not pulled in competing directions.",
  },
  // Day 132
  {
    reference: "John 15:13",
    verse:
      "Greater love has no one than this: to lay down one\u2019s life for one\u2019s friends.",
    reflection:
      "Jesus demonstrated the ultimate love by sacrificing everything for you. How can you lay something down for someone else today?",
  },
  // Day 133
  {
    reference: "Psalm 106:1",
    verse:
      "Praise the Lord. Give thanks to the Lord, for he is good; his love endures forever.",
    reflection:
      "God\u2019s goodness is not circumstantial \u2014 it is eternal. Let that unchanging truth anchor your praise today.",
  },
  // Day 134
  {
    reference: "Colossians 2:6-7",
    verse:
      "So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.",
    reflection:
      "The same way you began your walk with Christ \u2014 by faith \u2014 is how you continue it. Stay rooted.",
  },
  // Day 135
  {
    reference: "Isaiah 12:2",
    verse:
      "Surely God is my salvation; I will trust and not be afraid. The Lord, the Lord himself, is my strength and my defense; he has become my salvation.",
    reflection:
      "Trust removes fear. When you are certain of God as your salvation, anxiety loses its grip.",
  },
  // Day 136
  {
    reference: "Psalm 40:3",
    verse:
      "He put a new song in my mouth, a hymn of praise to our God. Many will see and fear the Lord and put their trust in him.",
    reflection:
      "Your testimony of what God has done is a song that draws others to Him. Don\u2019t be silent about His goodness.",
  },
  // Day 137
  {
    reference: "Luke 18:1",
    verse:
      "Then Jesus told his disciples a parable to show them that they should always pray and not give up.",
    reflection:
      "Persistent prayer is not pestering God \u2014 it is trusting that He is worth returning to again and again.",
  },
  // Day 138
  {
    reference: "Psalm 145:5",
    verse:
      "They speak of the glorious splendor of your majesty \u2014 and I will meditate on your wonderful works.",
    reflection:
      "Take a moment today to consider what God has done. Meditation on His works builds awe and gratitude.",
  },
  // Day 139
  {
    reference: "Micah 7:7",
    verse:
      "But as for me, I watch in hope for the Lord, I wait for God my Savior; my God will hear me.",
    reflection:
      "Waiting with hope is not passive \u2014 it is watchful. God hears you while you wait.",
  },
  // Day 140
  {
    reference: "Romans 12:10",
    verse:
      "Be devoted to one another in love. Honor one another above yourselves.",
    reflection:
      "Putting others first is countercultural and Christlike. Choose to honor someone above yourself today.",
  },
  // Day 141
  {
    reference: "Psalm 20:4",
    verse:
      "May he give you the desire of your heart and make all your plans succeed.",
    reflection:
      "Lay your plans before God today and ask for His blessing over them. He delights in your flourishing.",
  },
  // Day 142
  {
    reference: "Proverbs 18:10",
    verse:
      "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    reflection:
      "In moments of danger or fear, run to God. His name is a place of protection available to you right now.",
  },
  // Day 143
  {
    reference: "John 7:38",
    verse:
      "Whoever believes in me, as Scripture has said, rivers of living water will flow from within them.",
    reflection:
      "God\u2019s Spirit within you is not a trickle \u2014 it is a river. Let it flow out into the lives you touch today.",
  },
  // Day 144
  {
    reference: "Psalm 18:28",
    verse:
      "You, Lord, keep my lamp burning; my God turns my darkness into light.",
    reflection:
      "Where you feel dim or darkened, God brings light. He does not just tolerate your darkness \u2014 He transforms it.",
  },
  // Day 145
  {
    reference: "Ecclesiastes 3:11",
    verse:
      "He has made everything beautiful in its time. He has also set eternity in the human heart.",
    reflection:
      "Your longing for something more is not restlessness \u2014 it is a God-placed awareness of eternity. He makes all things beautiful.",
  },
  // Day 146
  {
    reference: "Psalm 143:8",
    verse:
      "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life.",
    reflection:
      "Greet this morning with trust. Entrust your day to God and watch Him show you the way, step by step.",
  },
  // Day 147
  {
    reference: "Proverbs 11:14",
    verse:
      "For lack of guidance a nation falls, but victory is won through many advisers.",
    reflection:
      "Seek wise counsel today. Humility in asking is a mark of wisdom, not weakness.",
  },
  // Day 148
  {
    reference: "Acts 17:28",
    verse: "For in him we live and move and have our being.",
    reflection:
      "Every breath you take and every step you make is sustained by God. You exist in and through Him.",
  },
  // Day 149
  {
    reference: "Psalm 57:1",
    verse:
      "Have mercy on me, my God, have mercy on me, for in you I take refuge. I will take refuge in the shadow of your wings until the disaster has passed.",
    reflection:
      "When trouble surrounds you, shelter is available under God\u2019s wings. He covers what you cannot protect yourself.",
  },
  // Day 150
  {
    reference: "Hebrews 12:1-2",
    verse:
      "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus.",
    reflection:
      "You are not running alone \u2014 a great crowd cheers you on. Keep your eyes on Jesus and keep running.",
  },
  // Day 151
  {
    reference: "Psalm 27:14",
    verse: "Wait for the Lord; be strong and take heart and wait for the Lord.",
    reflection:
      "Waiting is not inaction \u2014 it is active trust. Be strengthened while you wait for what God is preparing.",
  },
  // Day 152
  {
    reference: "Revelation 21:4",
    verse:
      "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.",
    reflection:
      "Every sorrow you carry today is temporary. God\u2019s final word is comfort, and it is coming.",
  },
  // Day 153
  {
    reference: "Psalm 5:3",
    verse:
      "In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
    reflection:
      "Begin today by speaking to God. Lay your requests before Him and then wait in hopeful expectation.",
  },
  // Day 154
  {
    reference: "John 17:3",
    verse:
      "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.",
    reflection:
      "Eternal life is not just a future destination \u2014 it is a present relationship with God that starts now.",
  },
  // Day 155
  {
    reference: "Psalm 116:2",
    verse:
      "Because he turned his ear to me, I will call on him as long as I live.",
    reflection:
      "God listened to you when you cried out. That responsiveness should compel us to keep calling on Him.",
  },
  // Day 156
  {
    reference: "1 John 5:14",
    verse:
      "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.",
    reflection:
      "Prayer offered in alignment with God\u2019s will is never unheard. Approach Him with confidence today.",
  },
  // Day 157
  {
    reference: "Psalm 72:19",
    verse:
      "Praise be to his glorious name forever; may the whole earth be filled with his glory.",
    reflection:
      "Worship God today knowing that His glory fills all things. You participate in something universal when you praise Him.",
  },
  // Day 158
  {
    reference: "Ephesians 4:32",
    verse:
      "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    reflection:
      "The forgiveness you have received is the measure of the forgiveness you are called to extend to others.",
  },
  // Day 159
  {
    reference: "Psalm 90:14",
    verse:
      "Satisfy us in the morning with your unfailing love, that we may sing for joy and be glad all our days.",
    reflection:
      "Ask God to satisfy you with His love today \u2014 the joy that follows is deeper than any earthly pleasure can provide.",
  },
  // Day 160
  {
    reference: "Isaiah 43:18-19",
    verse:
      "\u201cForget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it?\u201d",
    reflection:
      "God is actively doing something new in your life right now. Don\u2019t let the past blind you to what He is building.",
  },
  // Day 161
  {
    reference: "Psalm 46:5",
    verse:
      "God is within her, she will not fall; God will help her at break of day.",
    reflection:
      "Because God is in you, you cannot ultimately fall. His help arrives at the very moment it is needed.",
  },
  // Day 162
  {
    reference: "Philippians 2:13",
    verse:
      "For it is God who works in you to will and to act in order to fulfill his good purpose.",
    reflection:
      "Even your desire to do good is God working within you. Cooperate with what He is already doing in your heart.",
  },
  // Day 163
  {
    reference: "Psalm 48:9",
    verse: "Within your temple, O God, we meditate on your unfailing love.",
    reflection:
      "Pause today to meditate on how faithfully and fully God has loved you. Let that love reshape your day.",
  },
  // Day 164
  {
    reference: "Luke 11:13",
    verse:
      "If you then, though you are evil, know how to give good gifts to your children, how much more will your Father in heaven give the Holy Spirit to those who ask him!",
    reflection:
      "God\u2019s generosity exceeds the best human parent. Ask for what you need \u2014 He gives freely and abundantly.",
  },
  // Day 165
  {
    reference: "Psalm 93:1",
    verse:
      "The Lord reigns, he is robed in majesty; the Lord is robed in majesty and armed with strength; indeed, the world is established, firm and secure.",
    reflection:
      "Whatever shakes your world today, remember: God reigns. His throne is not threatened by any earthly upheaval.",
  },
  // Day 166
  {
    reference: "Isaiah 46:4",
    verse:
      "Even to your old age and gray hairs I am he, I am he who will sustain you. I have made you and I will carry you; I will sustain and I will rescue you.",
    reflection:
      "God\u2019s commitment to carry you does not weaken with time. He is as faithful to you today as He has always been.",
  },
  // Day 167
  {
    reference: "Psalm 103:2-3",
    verse:
      "Praise the Lord, my soul, and forget not all his benefits \u2014 who forgives all your sins and heals all your diseases.",
    reflection:
      "List God\u2019s benefits to you today. Remembering them is the antidote to a heart that has grown ungrateful.",
  },
  // Day 168
  {
    reference: "2 Corinthians 4:17",
    verse:
      "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.",
    reflection:
      "Your current suffering is not pointless \u2014 it is producing something of eternal weight and glory. Hold on.",
  },
  // Day 169
  {
    reference: "Psalm 92:12",
    verse:
      "The righteous will flourish like a palm tree, they will grow like a cedar of Lebanon.",
    reflection:
      "Flourishing in God is not occasional \u2014 it is the natural result of being planted in His presence. Keep growing.",
  },
  // Day 170
  {
    reference: "Nehemiah 8:10",
    verse: "Do not grieve, for the joy of the Lord is your strength.",
    reflection:
      "Joy in God is not just a feeling \u2014 it is a source of power. Let it sustain you through today\u2019s demands.",
  },
  // Day 171
  {
    reference: "Psalm 34:8",
    verse:
      "Taste and see that the Lord is good; blessed is the one who takes refuge in him.",
    reflection:
      "God\u2019s goodness is not theoretical \u2014 it is experiential. Draw near and discover His goodness for yourself today.",
  },
  // Day 172
  {
    reference: "Galatians 5:22-23",
    verse:
      "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
    reflection:
      "The Spirit\u2019s fruit is already growing within you. Tend to it today by staying connected to the Source.",
  },
  // Day 173
  {
    reference: "Psalm 22:24",
    verse:
      "For he has not despised or scorned the suffering of the afflicted one; he has not hidden his face from him but has listened to his cry for help.",
    reflection:
      "God does not look away from your pain. He turns toward it and hears every cry you raise to Him.",
  },
  // Day 174
  {
    reference: "John 6:35",
    verse:
      "Then Jesus declared, \u201cI am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.\u201d",
    reflection:
      "Every spiritual hunger and thirst can be satisfied in Christ. Come to Him today for the nourishment only He provides.",
  },
  // Day 175
  {
    reference: "Psalm 119:165",
    verse:
      "Great peace have those who love your law, and nothing can make them stumble.",
    reflection:
      "Loving God\u2019s Word produces a stability that external circumstances cannot disturb. Let it anchor you today.",
  },
  // Day 176
  {
    reference: "James 1:17",
    verse:
      "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
    reflection:
      "Every good thing in your life today is a gift from God. His generosity does not shift or diminish.",
  },
  // Day 177
  {
    reference: "Psalm 37:25",
    verse:
      "I was young and now I am old, yet I have never seen the righteous forsaken or their children begging bread.",
    reflection:
      "God\u2019s faithfulness has a track record. Those who trust in Him are not abandoned \u2014 they are provided for.",
  },
  // Day 178
  {
    reference: "1 Corinthians 15:58",
    verse:
      "Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.",
    reflection:
      "Your faithful service to God is never wasted. Every act of love done in His name carries eternal significance.",
  },
  // Day 179
  {
    reference: "Psalm 4:8",
    verse:
      "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    reflection:
      "The peace that enables rest comes from God alone. Lay your worries down tonight and let Him keep watch.",
  },
  // Day 180
  {
    reference: "Isaiah 61:3",
    verse:
      "And provide for those who grieve in Zion \u2014 to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair.",
    reflection:
      "God specializes in exchanges: ashes for beauty, mourning for joy, despair for praise. Let Him make the trade today.",
  },
  // Day 181
  {
    reference: "Psalm 66:20",
    verse:
      "Praise be to God, who has not rejected my prayer or withheld his love from me!",
    reflection:
      "Your prayers are not rejected. God\u2019s love toward you has never been withheld. Keep coming to Him.",
  },
  // Day 182
  {
    reference: "Proverbs 27:1",
    verse:
      "Do not boast about tomorrow, for you do not know what a day may bring.",
    reflection:
      "Today is the gift. Be fully present in it, trusting God with what tomorrow holds.",
  },
  // Day 183
  {
    reference: "Psalm 8:3-4",
    verse:
      "When I consider your heavens, the work of your fingers, the moon and the stars, which you have set in place, what is mankind that you are mindful of them?",
    reflection:
      "The God who crafted the universe is mindful of you. Your smallness doesn\u2019t diminish your significance to Him.",
  },
  // Day 184
  {
    reference: "Luke 15:20",
    verse:
      "But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.",
    reflection:
      "The moment you turn toward God, He runs to meet you. Return is always met with embrace.",
  },
  // Day 185
  {
    reference: "Psalm 23:4",
    verse:
      "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    reflection:
      "The darkest seasons of life do not mean God\u2019s absence. He walks through every shadow with you.",
  },
  // Day 186
  {
    reference: "Hebrews 10:23",
    verse:
      "Let us hold unswervingly to the hope we profess, for he who promised is faithful.",
    reflection:
      "Hold on to your hope \u2014 not because circumstances support it, but because the God who promised is faithful.",
  },
  // Day 187
  {
    reference: "Psalm 127:1",
    verse:
      "Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain.",
    reflection:
      "Invite God into everything you are building today. Without His blessing, even great effort yields little.",
  },
  // Day 188
  {
    reference: "Mark 11:24",
    verse:
      "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.",
    reflection:
      "Prayer offered in faith is powerful. Bring your requests to God today with bold, believing expectation.",
  },
  // Day 189
  {
    reference: "Psalm 18:30",
    verse:
      "As for God, his way is perfect: The Lord\u2019s word is flawless; he shields all who take refuge in him.",
    reflection:
      "God\u2019s ways are perfect even when they don\u2019t look it from your vantage point. Trust the process of His perfect plan.",
  },
  // Day 190
  {
    reference: "1 Samuel 16:7",
    verse:
      "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.",
    reflection:
      "God sees past every exterior. What matters most to Him is the condition and sincerity of your heart.",
  },
  // Day 191
  {
    reference: "Psalm 147:3",
    verse: "He heals the brokenhearted and binds up their wounds.",
    reflection:
      "Bring your broken heart to God today. He is a healer who does not flinch at the depth of any wound.",
  },
  // Day 192
  {
    reference: "John 20:29",
    verse:
      "Then Jesus told him, \u201cBecause you have seen me, you have believed; blessed are those who have not seen and yet have believed.\u201d",
    reflection:
      "Your belief in what you cannot see is not foolishness \u2014 it is a blessed act of faith that God honors.",
  },
  // Day 193
  {
    reference: "Psalm 50:15",
    verse:
      "And call on me in the day of trouble; I will deliver you, and you will honor me.",
    reflection:
      "Trouble is not a sign of God\u2019s absence \u2014 it is an invitation to call on Him and witness His deliverance.",
  },
  // Day 194
  {
    reference: "Ephesians 1:7",
    verse:
      "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\u2019s grace.",
    reflection:
      "Your redemption cost everything, yet it was given freely. Walk today in the full wealth of God\u2019s grace.",
  },
  // Day 195
  {
    reference: "Psalm 24:1",
    verse:
      "The earth is the Lord\u2019s, and everything in it, the world, and all who live in it.",
    reflection:
      "Everything you have has come from God. Live with open hands, knowing He is the source of all things.",
  },
  // Day 196
  {
    reference: "Matthew 6:34",
    verse:
      "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    reflection:
      "Tomorrow\u2019s worries are not yours to carry today. Focus on what God has placed in front of you right now.",
  },
  // Day 197
  {
    reference: "Psalm 29:11",
    verse:
      "The Lord gives strength to his people; the Lord blesses his people with peace.",
    reflection:
      "Strength and peace are God\u2019s gifts to you today. Receive them as intentional blessings from His hand.",
  },
  // Day 198
  {
    reference: "Daniel 3:17",
    verse:
      "If we are thrown into the blazing furnace, the God we serve is able to deliver us from it.",
    reflection:
      "The God you serve is able. Whatever fiery trial you face, His delivering power is greater than any flame.",
  },
  // Day 199
  {
    reference: "Psalm 42:11",
    verse:
      "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
    reflection:
      "Talk to your soul today. Direct your despairing thoughts back to hope \u2014 God is still worthy of praise.",
  },
  // Day 200
  {
    reference: "Revelation 3:20",
    verse:
      "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
    reflection:
      "Jesus is not forcing His way in \u2014 He is knocking patiently. Open the door of your heart to Him today.",
  },
  // Day 201
  {
    reference: "Psalm 81:10",
    verse:
      "I am the Lord your God, who brought you up out of Egypt. Open wide your mouth and I will fill it.",
    reflection:
      "God is ready to fill what you bring open to Him. Don\u2019t approach Him with a closed hand or a closed heart.",
  },
  // Day 202
  {
    reference: "Philippians 3:14",
    verse:
      "I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.",
    reflection:
      "There is a high calling on your life. Press on today \u2014 don\u2019t let setbacks stop what God has started.",
  },
  // Day 203
  {
    reference: "Psalm 136:1",
    verse: "Give thanks to the Lord, for he is good. His love endures forever.",
    reflection:
      "God\u2019s love is not seasonal or situational \u2014 it endures forever. Make thanksgiving your daily starting point.",
  },
  // Day 204
  {
    reference: "Job 23:10",
    verse:
      "But he knows the way that I take; when he has tested me, I will come forth as gold.",
    reflection:
      "The trials you are in are not random \u2014 they are refining. What comes out on the other side will be pure gold.",
  },
  // Day 205
  {
    reference: "Psalm 32:10",
    verse:
      "Many are the woes of the wicked, but the Lord\u2019s unfailing love surrounds the one who trusts in him.",
    reflection:
      "Trust in God is surrounded by His love on every side. You are not exposed \u2014 you are enveloped.",
  },
  // Day 206
  {
    reference: "Romans 1:16",
    verse:
      "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.",
    reflection:
      "The gospel you carry is not a weak story \u2014 it is the power of God. Share it without shame today.",
  },
  // Day 207
  {
    reference: "Psalm 97:10",
    verse:
      "Let those who love the Lord hate evil, for he guards the lives of his faithful ones and delivers them from the hand of the wicked.",
    reflection:
      "Loving God means hating what harms you and others. His protection follows those who align with His heart.",
  },
  // Day 208
  {
    reference: "Luke 10:27",
    verse:
      "He answered: \u2018Love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind\u2019; and, \u2018Love your neighbor as yourself.\u2019",
    reflection:
      "Total love \u2014 toward God and toward people \u2014 is the whole of the Christian life. Pursue it today with everything.",
  },
  // Day 209
  {
    reference: "Psalm 25:9",
    verse: "He guides the humble in what is right and teaches them his way.",
    reflection:
      "Humility opens you to God\u2019s guidance. Those who are teachable are the ones He leads most clearly.",
  },
  // Day 210
  {
    reference: "Jeremiah 33:3",
    verse:
      "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
    reflection:
      "God is not secretive with those who sincerely call to Him. Ask \u2014 and be open to what He reveals.",
  },
  // Day 211
  {
    reference: "Psalm 112:7",
    verse:
      "They will have no fear of bad news; their hearts are steadfast, trusting in the Lord.",
    reflection:
      "A heart anchored in God is not shaken by bad news. Trust prepares you for whatever today may bring.",
  },
  // Day 212
  {
    reference: "1 Kings 19:12",
    verse: "And after the fire came a gentle whisper.",
    reflection:
      "God often speaks in the quiet. Create stillness in your day and listen for His gentle, guiding voice.",
  },
  // Day 213
  {
    reference: "Psalm 17:8",
    verse:
      "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    reflection:
      "You are precious to God \u2014 the apple of His eye. He shelters those He treasures. You are sheltered.",
  },
  // Day 214
  {
    reference: "Matthew 5:8",
    verse: "Blessed are the pure in heart, for they will see God.",
    reflection:
      "Purity of heart is not about perfection \u2014 it is about undivided intention toward God. Seek Him with all you have.",
  },
  // Day 215
  {
    reference: "Psalm 130:5",
    verse:
      "I wait for the Lord, my whole being waits, and in his word I put my hope.",
    reflection:
      "Whole-being waiting is an act of total trust. Plant your hope in God\u2019s Word and let it sustain you in the wait.",
  },
  // Day 216
  {
    reference: "Exodus 14:14",
    verse: "The Lord will fight for you; you need only to be still.",
    reflection:
      "Some battles are not yours to fight \u2014 they belong to God. Stillness is sometimes the most powerful act of faith.",
  },
  // Day 217
  {
    reference: "Psalm 145:13",
    verse:
      "Your kingdom is an everlasting kingdom, and your dominion endures through all generations. The Lord is trustworthy in all he promises and faithful in all he does.",
    reflection:
      "God\u2019s faithfulness is proven across all generations. What He has done before, He will do again for you.",
  },
  // Day 218
  {
    reference: "Jonah 2:7",
    verse:
      "When my life was ebbing away, I remembered you, Lord, and my prayer rose to you, to your holy temple.",
    reflection:
      "Even at your lowest point, prayer can reach God. No situation is too desperate to bring before Him.",
  },
  // Day 219
  {
    reference: "Psalm 47:8",
    verse: "God reigns over the nations; God is seated on his holy throne.",
    reflection:
      "No matter what the news reports today, God remains on His throne. His reign is uninterrupted.",
  },
  // Day 220
  {
    reference: "Romans 15:4",
    verse:
      "For everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope.",
    reflection:
      "Scripture was written for your encouragement. Open it today and let its ancient words speak fresh hope into your situation.",
  },
  // Day 221
  {
    reference: "Psalm 36:7",
    verse:
      "How priceless is your unfailing love, O God! People take refuge in the shadow of your wings.",
    reflection:
      "God\u2019s love is beyond price. Take refuge in it today and let it be enough.",
  },
  // Day 222
  {
    reference: "Isaiah 54:17",
    verse:
      "No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord.",
    reflection:
      "Every weapon raised against you is ultimately ineffective when God is your defender. His promise is your protection.",
  },
  // Day 223
  {
    reference: "Psalm 31:19",
    verse:
      "How abundant are the good things that you have stored up for those who fear you, that you bestow in the sight of all, on those who take refuge in you.",
    reflection:
      "God has stored up good things for you that you haven\u2019t even seen yet. Trust Him for what is still coming.",
  },
  // Day 224
  {
    reference: "Titus 2:11-12",
    verse:
      "For the grace of God has appeared that offers salvation to all people. It teaches us to say \u201cNo\u201d to ungodliness and worldly passions, and to live self-controlled, upright and godly lives.",
    reflection:
      "Grace is not just forgiveness \u2014 it is a teacher. Let it instruct how you live, not just how you are saved.",
  },
  // Day 225
  {
    reference: "Psalm 68:19",
    verse:
      "Praise be to the Lord, to God our Savior, who daily bears our burdens.",
    reflection:
      "God bears your burdens daily \u2014 not once, not occasionally. Every morning He is willing to carry what weighs you down.",
  },
  // Day 226
  {
    reference: "Deuteronomy 7:9",
    verse:
      "Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations.",
    reflection:
      "God\u2019s faithfulness is multigenerational. What He has sworn to, He keeps \u2014 for you, for your children, and beyond.",
  },
  // Day 227
  {
    reference: "Psalm 31:14-15",
    verse:
      "But I trust in you, Lord; I say, \u201cYou are my God.\u201d My times are in your hands.",
    reflection:
      "Place your times \u2014 your schedule, your seasons, your years \u2014 in God\u2019s hands today. He holds them with care.",
  },
  // Day 228
  {
    reference: "John 14:16",
    verse:
      "And I will ask the Father, and he will give you another advocate to help you and be with you forever.",
    reflection:
      "The Holy Spirit is your permanent advocate, counselor, and companion. You are never without divine help.",
  },
  // Day 229
  {
    reference: "Psalm 52:8",
    verse:
      "But I am like an olive tree flourishing in the house of God; I trust in God\u2019s unfailing love for ever and ever.",
    reflection:
      "Rooted in God\u2019s unfailing love, you are designed to flourish. Let your roots go deep in Him today.",
  },
  // Day 230
  {
    reference: "Romans 12:21",
    verse: "Do not be overcome by evil, but overcome evil with good.",
    reflection:
      "Goodness is not passive \u2014 it is an active weapon against evil. Use it boldly in every encounter today.",
  },
  // Day 231
  {
    reference: "Psalm 108:1",
    verse:
      "My heart, O God, is steadfast; I will sing and make music with all my soul.",
    reflection:
      "A steadfast heart is a singing heart. Choose to praise God today even before the circumstances give you reason.",
  },
  // Day 232
  {
    reference: "Hebrews 6:10",
    verse:
      "God is not unjust; he will not forget your work and the love you have shown him as you have helped his people and continue to help them.",
    reflection:
      "No act of love done in God\u2019s name goes unnoticed by Him. He remembers every kind thing you have done.",
  },
  // Day 233
  {
    reference: "Psalm 94:19",
    verse: "When anxiety was great within me, your consolation brought me joy.",
    reflection:
      "God\u2019s consolation is stronger than any anxiety you carry. Bring your overwhelmed heart to Him and find joy.",
  },
  // Day 234
  {
    reference: "Matthew 5:44",
    verse:
      "But I tell you, love your enemies and pray for those who persecute you.",
    reflection:
      "Praying for those who hurt you is one of the most transformative things you can do \u2014 for them and for you.",
  },
  // Day 235
  {
    reference: "Psalm 56:8",
    verse:
      "Record my misery; list my tears on your scroll \u2014 are they not in your record? Then my enemies will turn back when I call for help. By this I will know that God is for me.",
    reflection:
      "Every tear you have cried is recorded by God. He does not miss a moment of your grief. He is for you.",
  },
  // Day 236
  {
    reference: "2 Corinthians 9:8",
    verse:
      "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.",
    reflection:
      "God\u2019s abundance in your life is not for your comfort alone \u2014 it is so you can overflow into the lives of others.",
  },
  // Day 237
  {
    reference: "Psalm 119:50",
    verse:
      "My comfort in my suffering is this: Your promise preserves my life.",
    reflection:
      "God\u2019s promises are lifelines, not just inspiration. Cling to one today and let it carry you through.",
  },
  // Day 238
  {
    reference: "Genesis 50:20",
    verse:
      "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives.",
    reflection:
      "What others meant for harm, God has the authority and ability to redirect for good. Nothing is outside His reach.",
  },
  // Day 239
  {
    reference: "Psalm 9:10",
    verse:
      "Those who know your name trust in you, for you, Lord, have never forsaken those who seek you.",
    reflection:
      "Knowing who God truly is builds trust. Seek Him and you will find someone who has never abandoned anyone who searched.",
  },
  // Day 240
  {
    reference: "Acts 2:28",
    verse:
      "You have made known to me the paths of life; you will fill me with joy in your presence.",
    reflection:
      "Joy in its fullest form is found in God\u2019s presence. Draw near to Him today and find life and joy in Him.",
  },
  // Day 241
  {
    reference: "Psalm 77:14",
    verse:
      "You are the God who performs miracles; you display your power among the peoples.",
    reflection:
      "The God of miracles is the same God you pray to today. He has not retired from the miraculous.",
  },
  // Day 242
  {
    reference: "Matthew 5:6",
    verse:
      "Blessed are those who hunger and thirst for righteousness, for they will be filled.",
    reflection:
      "The spiritual hunger you feel is a gift \u2014 it leads to the fullness only God can provide. Keep hungering for Him.",
  },
  // Day 243
  {
    reference: "Psalm 99:5",
    verse: "Exalt the Lord our God and worship at his footstool; he is holy.",
    reflection:
      "Worship is the recognition of who God truly is \u2014 holy, exalted, and worthy. Let your heart bow before Him today.",
  },
  // Day 244
  {
    reference: "Romans 8:14",
    verse:
      "For those who are led by the Spirit of God are the children of God.",
    reflection:
      "Being led by the Spirit is the hallmark of God\u2019s children. Open yourself to His leading in every decision today.",
  },
  // Day 245
  {
    reference: "Psalm 31:3",
    verse:
      "Since you are my rock and my fortress, for the sake of your name lead and guide me.",
    reflection:
      "God\u2019s leadership is tied to His name and reputation. Trust Him to lead you in ways that honor who He is.",
  },
  // Day 246
  {
    reference: "Proverbs 10:22",
    verse:
      "The blessing of the Lord brings wealth, without painful toil for it.",
    reflection:
      "God\u2019s blessing makes things possible that striving alone never could. Invite His blessing over your work today.",
  },
  // Day 247
  {
    reference: "Psalm 16:11",
    verse:
      "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
    reflection:
      "The path of life runs through God\u2019s presence. Every step taken with Him leads toward a joy that never ends.",
  },
  // Day 248
  {
    reference: "Ephesians 2:4-5",
    verse:
      "But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions.",
    reflection:
      "You were dead, and God chose to make you alive. That is the staggering generosity of His love for you.",
  },
  // Day 249
  {
    reference: "Psalm 89:1",
    verse:
      "I will sing of the Lord\u2019s great love forever; with my mouth I will make your faithfulness known through all generations.",
    reflection:
      "Make God\u2019s faithfulness known today \u2014 to your family, to those you meet, to anyone who will listen.",
  },
  // Day 250
  {
    reference: "Acts 20:35",
    verse: "It is more blessed to give than to receive.",
    reflection:
      "Generosity creates a joy that receiving never can. Look for an opportunity to give today, in any form.",
  },
  // Day 251
  {
    reference: "Psalm 46:7",
    verse: "The Lord Almighty is with us; the God of Jacob is our fortress.",
    reflection:
      "The all-powerful God of history is your fortress today. Nothing can breach what He is protecting.",
  },
  // Day 252
  {
    reference: "Isaiah 43:1",
    verse:
      "But now, this is what the Lord says \u2014 he who created you, Jacob, he who formed you, Israel: \u201cDo not fear, for I have redeemed you; I have summoned you by name; you are mine.\u201d",
    reflection:
      "You are called by name and claimed by God. That identity is more powerful than any fear.",
  },
  // Day 253
  {
    reference: "Psalm 71:5",
    verse:
      "For you have been my hope, Sovereign Lord, my confidence since my youth.",
    reflection:
      "God has been faithful to you through every season of your life, even the ones you have forgotten. He is still your hope.",
  },
  // Day 254
  {
    reference: "Matthew 24:35",
    verse:
      "Heaven and earth will pass away, but my words will never pass away.",
    reflection:
      "In a world where everything seems temporary, God\u2019s Word is permanent. Build your life on what will not crumble.",
  },
  // Day 255
  {
    reference: "Psalm 34:19",
    verse:
      "The righteous person may have many troubles, but the Lord delivers him from them all.",
    reflection:
      "Trouble is not proof of God\u2019s absence \u2014 deliverance is proof of His presence. He brings you through all of them.",
  },
  // Day 256
  {
    reference: "Colossians 3:15",
    verse:
      "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
    reflection:
      "Let peace be the referee of your heart today. When it is absent, pause and ask God to restore it.",
  },
  // Day 257
  {
    reference: "Psalm 7:10",
    verse: "My shield is God Most High, who saves the upright in heart.",
    reflection:
      "The shield you carry is not made by human hands. God Most High covers you \u2014 no attack can penetrate His protection.",
  },
  // Day 258
  {
    reference: "1 Timothy 6:6",
    verse: "But godliness with contentment is great gain.",
    reflection:
      "Contentment paired with devotion to God is the truest form of wealth. It cannot be taken or devalued.",
  },
  // Day 259
  {
    reference: "Psalm 68:5",
    verse:
      "A father to the fatherless, a defender of widows, is God in his holy dwelling.",
    reflection:
      "God has a special heart for the vulnerable. If you feel without support, He steps in as your defender and Father.",
  },
  // Day 260
  {
    reference: "John 3:30",
    verse: "He must become greater; I must become less.",
    reflection:
      "The great secret of a fruitful life is letting God increase in it. Yield more of yourself to Him today.",
  },
  // Day 261
  {
    reference: "Psalm 85:8",
    verse:
      "I will listen to what God the Lord says; he promises peace to his people, his faithful servants.",
    reflection:
      "Listening to God precedes peace. Take time today to be quiet before Him and hear what He has to say.",
  },
  // Day 262
  {
    reference: "Isaiah 33:2",
    verse:
      "Lord, be gracious to us; we long for you. Be our strength every morning, our salvation in time of distress.",
    reflection:
      "Ask God to be your strength specifically this morning. He delights to give it to those who ask.",
  },
  // Day 263
  {
    reference: "Psalm 107:20",
    verse:
      "He sent out his word and healed them; he rescued them from the grave.",
    reflection:
      "God\u2019s Word is not just information \u2014 it carries healing power. Let it speak life into any area of you that needs it.",
  },
  // Day 264
  {
    reference: "Galatians 2:20",
    verse:
      "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
    reflection:
      "Your life is no longer just your own \u2014 it is Christ living through you. Let that reality shape every choice today.",
  },
  // Day 265
  {
    reference: "Psalm 28:7",
    verse:
      "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
    reflection:
      "Trust in God produces help, and help produces joy, and joy produces praise. Begin the cycle today by choosing trust.",
  },
  // Day 266
  {
    reference: "Ezra 8:22",
    verse: "The gracious hand of our God is on everyone who looks to him.",
    reflection:
      "God\u2019s favor rests on those who look to Him. Turn your face toward Him today and receive what His gracious hand provides.",
  },
  // Day 267
  {
    reference: "Psalm 115:14",
    verse: "May the Lord cause you to flourish, both you and your children.",
    reflection:
      "God\u2019s desire is for you to flourish, not merely survive. Believe today that He is actively working that flourishing.",
  },
  // Day 268
  {
    reference: "Matthew 6:8",
    verse: "Your Father knows what you need before you ask him.",
    reflection:
      "God already knows every need you bring to prayer. You are not informing Him \u2014 you are aligning your heart with His.",
  },
  // Day 269
  {
    reference: "Psalm 111:10",
    verse:
      "The fear of the Lord is the beginning of wisdom; all who follow his precepts have good understanding.",
    reflection:
      "Wisdom begins with reverence for God. The more you honor Him, the clearer everything else becomes.",
  },
  // Day 270
  {
    reference: "Isaiah 40:28-29",
    verse:
      "Do you not know? Have you not heard? The Lord is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary, and his understanding no one can fathom. He gives strength to the weary and increases the power of the weak.",
    reflection:
      "God never gets tired of helping you. When your energy is gone, His is not \u2014 and He freely gives it.",
  },
  // Day 271
  {
    reference: "Psalm 148:13",
    verse:
      "Let them praise the name of the Lord, for his name alone is exalted; his splendor is above the earth and the heavens.",
    reflection:
      "God\u2019s greatness surpasses all creation. Let that perspective humble and inspire you as you begin your day.",
  },
  // Day 272
  {
    reference: "John 10:27",
    verse: "My sheep listen to my voice; I know them, and they follow me.",
    reflection:
      "God knows you by name, and His voice is one you can learn to recognize. Listen closely today for His leading.",
  },
  // Day 273
  {
    reference: "Psalm 25:14",
    verse:
      "The Lord confides in those who fear him; he makes his covenant known to them.",
    reflection:
      "There is a deep knowing reserved for those who walk closely with God. Draw near and receive what He confides.",
  },
  // Day 274
  {
    reference: "Joel 2:25",
    verse: "I will repay you for the years the locusts have eaten.",
    reflection:
      "God can restore what was lost in painful seasons. No amount of wasted time or opportunity is beyond His power to redeem.",
  },
  // Day 275
  {
    reference: "Psalm 119:76",
    verse:
      "May your unfailing love be my comfort, according to your promise to your servant.",
    reflection:
      "God\u2019s unfailing love is not a vague concept \u2014 it is a specific comfort available to you right now. Receive it.",
  },
  // Day 276
  {
    reference: "Luke 19:10",
    verse: "For the Son of Man came to seek and to save the lost.",
    reflection:
      "Jesus came with a mission to find you. You were never too lost for Him to seek \u2014 and His mission did not fail.",
  },
  // Day 277
  {
    reference: "Psalm 18:16",
    verse:
      "He reached down from on high and took hold of me; he drew me out of deep waters.",
    reflection:
      "When you were drowning, God reached down. He draws you out of deep waters because His arm is long enough.",
  },
  // Day 278
  {
    reference: "Proverbs 3:9-10",
    verse:
      "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.",
    reflection:
      "Honoring God with your resources is an act of trust. It declares that He is the source and He will provide more.",
  },
  // Day 279
  {
    reference: "Psalm 126:5",
    verse: "Those who sow with tears will reap with songs of joy.",
    reflection:
      "The tears you have shed in faithfulness are seeds. A harvest of joy is on its way for those who keep sowing.",
  },
  // Day 280
  {
    reference: "Romans 8:17",
    verse:
      "Now if we are children, then we are heirs \u2014 heirs of God and co-heirs with Christ, if indeed we share in his sufferings in order that we may also share in his glory.",
    reflection:
      "You are an heir of God, not a servant begging for scraps. Walk in the inheritance that Christ secured for you.",
  },
  // Day 281
  {
    reference: "Psalm 145:4",
    verse:
      "One generation commends your works to another; they tell of your mighty acts.",
    reflection:
      "What God has done for you is worth sharing. Tell the next generation about His faithfulness in your life.",
  },
  // Day 282
  {
    reference: "Proverbs 24:16",
    verse:
      "For though the righteous fall seven times, they rise again, but the wicked stumble when calamity strikes.",
    reflection:
      "Falling does not disqualify you. What defines you is that, with God\u2019s help, you always rise.",
  },
  // Day 283
  {
    reference: "Psalm 30:11",
    verse:
      "You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.",
    reflection:
      "God is in the business of transformation \u2014 turning mourning into movement, sadness into celebration. He can do it for you.",
  },
  // Day 284
  {
    reference: "Colossians 4:2",
    verse: "Devote yourselves to prayer, being watchful and thankful.",
    reflection:
      "Prayer with watchfulness and gratitude is the posture of someone who takes God seriously. Adopt it today.",
  },
  // Day 285
  {
    reference: "Psalm 33:11",
    verse:
      "But the plans of the Lord stand firm forever, the purposes of his heart through all generations.",
    reflection:
      "God\u2019s plans are not subject to revision by circumstances. What He has purposed will come to pass.",
  },
  // Day 286
  {
    reference: "Nehemiah 9:17",
    verse:
      "But you are a forgiving God, gracious and compassionate, slow to anger and abounding in love.",
    reflection:
      "This is who God truly is \u2014 not harsh or distant, but forgiving, gracious, and abounding in love toward you.",
  },
  // Day 287
  {
    reference: "Psalm 89:15",
    verse:
      "Blessed are those who have learned to acclaim you, who walk in the light of your presence, Lord.",
    reflection:
      "Praise and walking in God\u2019s presence go together. Let worship be the atmosphere of your day, not just a Sunday moment.",
  },
  // Day 288
  {
    reference: "Isaiah 60:1",
    verse:
      "Arise, shine, for your light has come, and the glory of the Lord rises upon you.",
    reflection:
      "The glory of God resting on you is an invitation to rise up, not shrink back. Shine today with the light He has given you.",
  },
  // Day 289
  {
    reference: "Psalm 118:14",
    verse:
      "The Lord is my strength and my defense; he has become my salvation.",
    reflection:
      "Your defense in any situation is God Himself. Lean on His strength and let Him be your saving answer today.",
  },
  // Day 290
  {
    reference: "John 6:37",
    verse:
      "All those the Father gives me will come to me, and whoever comes to me I will never drive away.",
    reflection:
      "When you come to Jesus, you are never turned away. His welcome is unconditional and permanent.",
  },
  // Day 291
  {
    reference: "Psalm 37:7",
    verse:
      "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways, when they carry out their wicked schemes.",
    reflection:
      "Still waiting before God is more powerful than anxious comparison. Keep your eyes on Him, not on others\u2019 success.",
  },
  // Day 292
  {
    reference: "Isaiah 51:3",
    verse:
      "The Lord will surely comfort Zion and will look with compassion on all her ruins; he will make her deserts like Eden, her wastelands like the garden of the Lord.",
    reflection:
      "God looks at your ruins with compassion, not contempt. He specializes in turning wastelands into gardens.",
  },
  // Day 293
  {
    reference: "Psalm 91:11",
    verse:
      "For he will command his angels concerning you to guard you in all your ways.",
    reflection:
      "You have invisible protection assigned to you by God. You are guarded in ways you cannot see.",
  },
  // Day 294
  {
    reference: "Matthew 6:26",
    verse:
      "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?",
    reflection:
      "If God feeds the birds, how much more will He provide for you? Your value to Him is immeasurable.",
  },
  // Day 295
  {
    reference: "Psalm 125:1",
    verse:
      "Those who trust in the Lord are like Mount Zion, which cannot be shaken but endures forever.",
    reflection:
      "Trust in God produces a stability that no external force can dismantle. Build your life on it today.",
  },
  // Day 296
  {
    reference: "Ezekiel 37:14",
    verse:
      "I will put my Spirit in you and you will live, and I will settle you in your own land. Then you will know that I the Lord have spoken, and I have done it, declares the Lord.",
    reflection:
      "God\u2019s Spirit gives life to what has been dry and dead. Invite His breath into the areas of your life that need reviving.",
  },
  // Day 297
  {
    reference: "Psalm 31:5",
    verse:
      "Into your hands I commit my spirit; deliver me, Lord, my faithful God.",
    reflection:
      "Surrender is not defeat \u2014 it is trust in its purest form. Place yourself into God\u2019s capable and faithful hands today.",
  },
  // Day 298
  {
    reference: "Romans 4:20-21",
    verse:
      "Yet he did not waver through unbelief regarding the promise of God, but was strengthened in his faith and gave glory to God, being fully persuaded that God had power to do what he had promised.",
    reflection:
      "Be fully persuaded today that God has power to keep every promise He has made to you. Waver not.",
  },
  // Day 299
  {
    reference: "Psalm 71:19",
    verse:
      "Your righteousness, God, reaches to the heavens, you who have done great things. Who is like you, God?",
    reflection:
      "There is no one like God. Let that incomparable greatness fill you with awe and confidence today.",
  },
  // Day 300
  {
    reference: "Philippians 4:8",
    verse:
      "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable \u2014 if anything is excellent or praiseworthy \u2014 think about such things.",
    reflection:
      "Your thoughts shape your experience of life. Deliberately choose to dwell on what is true, lovely, and praiseworthy.",
  },
  // Day 301
  {
    reference: "Psalm 23:6",
    verse:
      "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.",
    reflection:
      "God\u2019s goodness and love are not occasional visitors \u2014 they follow you every day and all the way into eternity.",
  },
  // Day 302
  {
    reference: "Jeremiah 32:27",
    verse:
      "\u201cI am the Lord, the God of all mankind. Is anything too hard for me?\u201d",
    reflection:
      "What you are facing today is not too hard for God. Bring your impossible situations to the God for whom nothing is impossible.",
  },
  // Day 303
  {
    reference: "Psalm 145:16",
    verse: "You open your hand and satisfy the desires of every living thing.",
    reflection:
      "God\u2019s open hand is extended toward you today. Receive what He offers with gratitude and expectation.",
  },
  // Day 304
  {
    reference: "James 5:16",
    verse:
      "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.",
    reflection:
      "Your prayers carry more power than you realize. Bring them with righteous intent today and expect them to work.",
  },
  // Day 305
  {
    reference: "Psalm 28:8",
    verse:
      "The Lord is the strength of his people, a fortress of salvation for his anointed one.",
    reflection:
      "The strength you need is not self-generated \u2014 it comes from the Lord who is the strength of His people.",
  },
  // Day 306
  {
    reference: "Isaiah 55:11",
    verse:
      "So is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it.",
    reflection:
      "Every word God has spoken over your life is still working toward its completion. His Word does not fail.",
  },
  // Day 307
  {
    reference: "Psalm 119:130",
    verse:
      "The unfolding of your words gives light; it gives understanding to the simple.",
    reflection:
      "God\u2019s Word is accessible to anyone who approaches it with humility. It brings light where there is confusion.",
  },
  // Day 308
  {
    reference: "Luke 4:18",
    verse:
      "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free.",
    reflection:
      "The ministry of Jesus is still ongoing through those who follow Him. You are part of the good news He came to bring.",
  },
  // Day 309
  {
    reference: "Psalm 33:6",
    verse:
      "By the word of the Lord the heavens were made, their starry host by the breath of his mouth.",
    reflection:
      "The God who spoke worlds into existence speaks into your situation today. His word has creative power.",
  },
  // Day 310
  {
    reference: "Hebrews 7:25",
    verse:
      "Therefore he is able to save completely those who come to God through him, because he always lives to intercede for them.",
    reflection:
      "Right now, Jesus is interceding for you before the Father. You have the most powerful advocate in the universe.",
  },
  // Day 311
  {
    reference: "Psalm 90:1-2",
    verse:
      "Lord, you have been our dwelling place throughout all generations. Before the mountains were born or you brought forth the whole world, from everlasting to everlasting you are God.",
    reflection:
      "God existed before everything and will outlast everything. He is your most secure home and foundation.",
  },
  // Day 312
  {
    reference: "John 15:16",
    verse:
      "You did not choose me, but I chose you and appointed you so that you might go and bear fruit \u2014 fruit that will last.",
    reflection:
      "You were chosen and appointed by God before you ever chose Him. Walk in that calling with purpose and confidence.",
  },
  // Day 313
  {
    reference: "Psalm 85:2",
    verse:
      "You forgave the iniquity of your people and covered all their sins.",
    reflection:
      "God covered your sins completely \u2014 not partially. Walk today in the freedom of fully forgiven and fully covered.",
  },
  // Day 314
  {
    reference: "Matthew 11:29",
    verse:
      "Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
    reflection:
      "Jesus offers a partnership, not a burden. His yoke brings rest to the soul that the world\u2019s demands never could.",
  },
  // Day 315
  {
    reference: "Psalm 36:5",
    verse:
      "Your love, Lord, reaches to the heavens, your faithfulness to the skies.",
    reflection:
      "God\u2019s love and faithfulness are beyond measurement. Lift your eyes today and be filled with the vastness of His devotion to you.",
  },
  // Day 316
  {
    reference: "Proverbs 14:26",
    verse:
      "Whoever fears the Lord has a secure fortress, and for their children it will be a refuge.",
    reflection:
      "Reverence for God builds security not just for you but for the next generation. How you walk with God today matters far beyond today.",
  },
  // Day 317
  {
    reference: "Psalm 42:1-2",
    verse:
      "As the deer pants for streams of water, so my soul pants for you, my God. My soul thirsts for God, for the living God.",
    reflection:
      "The thirst in your soul is a sacred longing. Nothing in this world can quench it \u2014 only the living God satisfies.",
  },
  // Day 318
  {
    reference: "Romans 8:11",
    verse:
      "And if the Spirit of him who raised Jesus from the dead is living in you, he who raised Christ from the dead will also give life to your mortal bodies because of his Spirit who lives in you.",
    reflection:
      "The resurrection power that raised Jesus from the dead lives within you. That is not a small thing.",
  },
  // Day 319
  {
    reference: "Psalm 31:7",
    verse:
      "I will be glad and rejoice in your love, for you saw my affliction and knew the anguish of my soul.",
    reflection:
      "God sees your anguish. He is not unaware of your pain \u2014 and knowing that He sees is reason enough to rejoice.",
  },
  // Day 320
  {
    reference: "Acts 4:31",
    verse:
      "After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly.",
    reflection:
      "Corporate prayer moves God. When believers pray together, something powerful is released into the world.",
  },
  // Day 321
  {
    reference: "Psalm 145:9",
    verse: "The Lord is good to all; he has compassion on all he has made.",
    reflection:
      "God\u2019s goodness is not exclusive \u2014 it extends to all. Let that generosity inspire how you treat those around you today.",
  },
  // Day 322
  {
    reference: "Isaiah 53:5",
    verse:
      "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
    reflection:
      "Every wound you carry can be brought to the One who was wounded for you. His suffering purchased your healing.",
  },
  // Day 323
  {
    reference: "Psalm 57:10",
    verse:
      "For great is your love, reaching to the heavens; your faithfulness reaches to the skies.",
    reflection:
      "The scale of God\u2019s love and faithfulness toward you is beyond comprehension. Let it be more than enough today.",
  },
  // Day 324
  {
    reference: "1 Corinthians 16:13-14",
    verse:
      "Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love.",
    reflection:
      "Firm faith and courageous strength are meant to operate within love. Let love be the motivation for all you do today.",
  },
  // Day 325
  {
    reference: "Psalm 98:1",
    verse:
      "Sing to the Lord a new song, for he has done marvelous things; his right hand and his holy arm have worked salvation for him.",
    reflection:
      "God has done marvelous things \u2014 let that truth stir a new song in your heart today, even if it\u2019s one no one else can hear.",
  },
  // Day 326
  {
    reference: "Matthew 16:24",
    verse:
      "Then Jesus said to his disciples, \u201cWhoever wants to be my disciple must deny themselves and take up their cross and follow me.\u201d",
    reflection:
      "Following Jesus is not passive \u2014 it requires daily, deliberate surrender. What are you carrying for Him today?",
  },
  // Day 327
  {
    reference: "Psalm 91:14-15",
    verse:
      "Because he loves me, says the Lord, I will rescue him; I will protect him, for he acknowledges my name. He will call on me, and I will answer him.",
    reflection:
      "God\u2019s rescue is tied to relationship. Those who love Him and call on His name find Him answering.",
  },
  // Day 328
  {
    reference: "Romans 12:12",
    verse: "Be joyful in hope, patient in affliction, faithful in prayer.",
    reflection:
      "Three pillars of resilient faith: hope, patience, and prayer. Lean on all three of them today.",
  },
  // Day 329
  {
    reference: "Psalm 36:9",
    verse: "For with you is the fountain of life; in your light we see light.",
    reflection:
      "All true life and understanding flows from God. Stay close to the fountain today and drink deeply.",
  },
  // Day 330
  {
    reference: "Luke 21:33",
    verse:
      "Heaven and earth will pass away, but my words will never pass away.",
    reflection:
      "In a world of constant change, God\u2019s Word is your most stable foundation. Build everything on what will not pass.",
  },
  // Day 331
  {
    reference: "Psalm 86:15",
    verse:
      "But you, Lord, are a compassionate and gracious God, slow to anger, abounding in love and faithfulness.",
    reflection:
      "God\u2019s patience with you is not exhausted. His love and faithfulness toward you continue without interruption.",
  },
  // Day 332
  {
    reference: "Ephesians 5:20",
    verse:
      "Always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.",
    reflection:
      "Gratitude is not situational \u2014 it is meant to be constant. Find something to thank God for in every circumstance.",
  },
  // Day 333
  {
    reference: "Psalm 119:93",
    verse:
      "I will never forget your precepts, for by them you have preserved my life.",
    reflection:
      "God\u2019s Word has kept you alive through seasons you may not even fully remember. Honor it by returning to it daily.",
  },
  // Day 334
  {
    reference: "Hosea 6:3",
    verse:
      "Let us acknowledge the Lord; let us press on to acknowledge him. As surely as the sun rises, he will appear.",
    reflection:
      "God\u2019s appearing in your life is as reliable as sunrise. Press on toward knowing Him and watch Him show up.",
  },
  // Day 335
  {
    reference: "Psalm 123:2",
    verse:
      "As the eyes of slaves look to the hand of their master, as the eyes of a female slave look to the hand of her mistress, so our eyes look to the Lord our God, till he shows us his mercy.",
    reflection:
      "Looking to God for mercy is not a posture of weakness \u2014 it is the wisest thing you can do. He is merciful.",
  },
  // Day 336
  {
    reference: "Matthew 5:9",
    verse:
      "Blessed are the peacemakers, for they will be called children of God.",
    reflection:
      "Being a peacemaker is a divine calling. Where there is conflict in your world, you carry the ability to bring peace.",
  },
  // Day 337
  {
    reference: "Psalm 144:1",
    verse:
      "Praise be to the Lord my Rock, who trains my hands for war, my fingers for battle.",
    reflection:
      "God prepares you for the spiritual and practical battles you face. He does not send you in unprepared.",
  },
  // Day 338
  {
    reference: "1 Samuel 2:2",
    verse:
      "There is no one holy like the Lord; there is no one besides you; there is no Rock like our God.",
    reflection:
      "There is simply no one like God. Let that settled truth give you confidence and peace in whatever you face today.",
  },
  // Day 339
  {
    reference: "Psalm 31:21",
    verse:
      "Praise be to the Lord, for he showed me the wonders of his love when I was in a city under siege.",
    reflection:
      "God\u2019s most remarkable acts of love often happen in the most difficult circumstances. Look for them in yours.",
  },
  // Day 340
  {
    reference: "1 John 3:1",
    verse:
      "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    reflection:
      "You are a child of God \u2014 not a distant relative, not a servant, but a beloved child. Let that truth define you today.",
  },
  // Day 341
  {
    reference: "Psalm 37:40",
    verse:
      "The Lord helps them and delivers them; he delivers them from the wicked and saves them, because they take refuge in him.",
    reflection:
      "Refuge in God is the trigger for His deliverance. Run to Him today and find His saving help waiting.",
  },
  // Day 342
  {
    reference: "Proverbs 31:25",
    verse:
      "She is clothed with strength and dignity; she can laugh at the days to come.",
    reflection:
      "Clothed in God\u2019s strength and dignity, the future holds no terror. Laugh at tomorrow because God is already there.",
  },
  // Day 343
  {
    reference: "Psalm 116:7",
    verse: "Return to your rest, my soul, for the Lord has been good to you.",
    reflection:
      "God\u2019s goodness to you in the past is reason enough to rest today. Let your soul settle into the peace He has earned.",
  },
  // Day 344
  {
    reference: "Matthew 6:10",
    verse: "Your kingdom come, your will be done, on earth as it is in heaven.",
    reflection:
      "Pray this prayer today with sincerity. Invite God\u2019s kingdom to come into your circumstances, your home, your work.",
  },
  // Day 345
  {
    reference: "Psalm 86:8",
    verse:
      "Among the gods there is none like you, Lord; no deeds can compare with yours.",
    reflection:
      "Nothing in all creation compares to God. Worship Him today knowing you are in relationship with the highest being.",
  },
  // Day 346
  {
    reference: "Amos 5:24",
    verse:
      "But let justice roll on like a river, righteousness like a never-failing stream!",
    reflection:
      "God\u2019s heart beats for justice. Align yourself with what He cares about and let His righteousness flow through your actions.",
  },
  // Day 347
  {
    reference: "Psalm 62:1-2",
    verse:
      "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation; he is my fortress, I will never be shaken.",
    reflection:
      "Rest, salvation, stability \u2014 they all come from God alone. Anchor yourself in Him and find that you cannot be shaken.",
  },
  // Day 348
  {
    reference: "Mark 10:27",
    verse:
      "Jesus looked at them and said, \u201cWith man this is impossible, but not with God; all things are possible with God.\u201d",
    reflection:
      "Your impossibles are possible with God. Stop rehearsing the obstacles and start rehearsing who God is.",
  },
  // Day 349
  {
    reference: "Psalm 34:4",
    verse:
      "I sought the Lord, and he answered me; he delivered me from all my fears.",
    reflection:
      "Seeking God is the answer to fear. Those who run to Him find their fears losing their grip.",
  },
  // Day 350
  {
    reference: "1 Timothy 1:17",
    verse:
      "Now to the King eternal, immortal, invisible, the only God, be honor and glory for ever and ever. Amen.",
    reflection:
      "Lift your gaze today to the eternal King. Everything else is temporary; He alone is worthy of eternal honor and glory.",
  },
  // Day 351
  {
    reference: "Psalm 119:105",
    verse: "Your word is a lamp for my feet, a light on my path.",
    reflection:
      "You do not need to see every step \u2014 just the next one. God\u2019s Word lights the way right where you are.",
  },
  // Day 352
  {
    reference: "Habakkuk 2:3",
    verse:
      "For the revelation awaits an appointed time; it speaks of the end and will not prove false. Though it linger, wait for it; it will certainly come and will not delay.",
    reflection:
      "What God has promised has an appointed time. Even when it lingers, it is not late \u2014 it is on schedule.",
  },
  // Day 353
  {
    reference: "Psalm 27:4",
    verse:
      "One thing I ask from the Lord, this only do I seek: that I may dwell in the house of the Lord all the days of my life, to gaze on the beauty of the Lord and to seek him in his temple.",
    reflection:
      "Make the presence of God the one thing you seek above all else today. Everything else flows from that singular pursuit.",
  },
  // Day 354
  {
    reference: "Romans 8:26",
    verse:
      "In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans.",
    reflection:
      "When you don\u2019t know how to pray, the Spirit intercedes for you with perfect understanding. You are never without prayer.",
  },
  // Day 355
  {
    reference: "Psalm 119:89",
    verse: "Your word, Lord, is eternal; it stands firm in the heavens.",
    reflection:
      "The Word of God is not a dated document \u2014 it is eternally alive and relevant to your life today. Trust it fully.",
  },
  // Day 356
  {
    reference: "1 Thessalonians 5:16-17",
    verse: "Rejoice always, pray continually.",
    reflection:
      "Joy and prayer are not Sunday activities \u2014 they are a way of life. Let both flow naturally throughout your entire day.",
  },
  // Day 357
  {
    reference: "Psalm 118:24",
    verse:
      "The Lord has done it this very day; let us rejoice today and be glad.",
    reflection:
      "Today is a day the Lord has made. Whatever it holds, it is His gift and His opportunity for your good.",
  },
  // Day 358
  {
    reference: "John 15:7",
    verse:
      "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you.",
    reflection:
      "Abiding in Christ is the key that unlocks answered prayer. Stay deeply connected to Him and ask boldly.",
  },
  // Day 359
  {
    reference: "Psalm 86:12",
    verse:
      "I will praise you, Lord my God, with all my heart; I will glorify your name forever.",
    reflection:
      "Whole-hearted praise is the highest form of worship. Give God everything you have today \u2014 not just what feels easy.",
  },
  // Day 360
  {
    reference: "Matthew 5:4",
    verse: "Blessed are those who mourn, for they will be comforted.",
    reflection:
      "Your grief is not ignored by God. He blesses the mourning with comfort \u2014 personal, tangible, divine comfort.",
  },
  // Day 361
  {
    reference: "Psalm 145:21",
    verse:
      "My mouth will speak in praise of the Lord. Let every creature praise his holy name for ever and ever.",
    reflection:
      "Let praise be the last word on your lips today and the first word tomorrow. God is worthy of eternal praise.",
  },
  // Day 362
  {
    reference: "2 Corinthians 1:3-4",
    verse:
      "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those with the trouble we ourselves have received from God.",
    reflection:
      "Your pain has a purpose: it equips you to comfort others. The comfort you receive from God is meant to be passed on.",
  },
  // Day 363
  {
    reference: "Psalm 23:3",
    verse:
      "He refreshes my soul. He guides me along the right paths for his name\u2019s sake.",
    reflection:
      "Soul refreshment is something only God can provide. Bring your weary soul to the Shepherd today and let Him restore you.",
  },
  // Day 364
  {
    reference: "Isaiah 65:24",
    verse:
      "Before they call I will answer; while they are still speaking I will hear.",
    reflection:
      "God\u2019s response to your prayer is already being prepared before you finish speaking it. He is that close and attentive to you.",
  },
  // Day 365
  {
    reference: "Revelation 22:20",
    verse:
      "He who testifies to these things says, \u201cYes, I am coming soon.\u201d Amen. Come, Lord Jesus.",
    reflection:
      "This is the great hope of every believer: Christ is coming. Live today in the light of that promise and that longing.",
  },
];

interface DevotionCardProps {
  dayOfYear: number;
}

export default function DevotionCard({ dayOfYear }: DevotionCardProps) {
  const devotion = VERSES[(dayOfYear - 1) % VERSES.length];

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
          <p className="text-[10px] text-amber-400/70">
            Day {dayOfYear} of 365
          </p>
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
