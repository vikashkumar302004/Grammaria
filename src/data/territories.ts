import { Territory, PlayerState, LeaderboardUser } from '@/types/game';

export const INITIAL_PLAYER: PlayerState = {
  name: "Arjun Verma",
  className: "Class: 10 - A",
  level: 12,
  xp: 4250,
  maxXp: 5000,
  coins: 7850,
  gems: 320,
  avatarUrl: "/map-bg.jpg", // placeholder avatar style
  capturedTerritoriesCount: 6,
  totalTerritories: 18,
  streak: 5,
  weakTopics: ["Conditionals", "Reported Speech"],
  strongTopics: ["Simple Tenses", "Articles", "Subject-Verb Agreement"],
};

export const INITIAL_TERRITORIES: Territory[] = [
  {
    id: "centralia",
    name: "Centralia",
    alias: "The Imperial Capital",
    topic: "Mastery of All Grammar Realms",
    grammarCategory: "Mixed Grammar & Synthesis",
    status: "capital-locked",
    enemyControl: 100,
    x: 49,
    y: 53,
    levelRequired: 15,
    xpReward: 1000,
    coinsReward: 1500,
    description: "The grand fortress of Centralia. Unlocks only after conquering broad territories across Grammaria. Features high-stakes mixed challenges.",
    studyGuide: {
      summary: "Centralia tests your overall mastery combining Tenses, Conditionals, Voice, and Syntactical Harmony.",
      keyRules: [
        "Read full context before selecting verb forms.",
        "Watch for indirect speech tense shifts combined with modal verbs.",
        "Ensure Subject-Verb agreement holds across complex relative clauses."
      ],
      examples: [
        { correct: "Had I known about the assault, I would have joined earlier.", incorrect: "If I knew about assault, I will join." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-c1",
        questionText: "Which sentence correctly combines conditional logic and reported speech?",
        options: [
          "He told me that if he had studied, he would pass.",
          "He told me that if he had studied, he would have passed.",
          "He told me if he studies he will pass.",
          "He tells me if he studied he passes."
        ],
        correctAnswerIndex: 1,
        explanation: "In reported past conditional, Third Conditional shifts to 'had studied... would have passed'.",
        difficulty: "Hard",
        attackPower: 35
      }
    ]
  },
  {
    id: "temporalia",
    name: "Temporalia",
    alias: "Realm of Time",
    topic: "Tenses & Temporal Flow",
    grammarCategory: "Verb Tenses",
    status: "captured",
    enemyControl: 0,
    x: 34,
    y: 20,
    levelRequired: 1,
    xpReward: 300,
    coinsReward: 400,
    description: "The ancient clockwork territory where time flows in past, present, and future forms.",
    studyGuide: {
      summary: "Tenses indicate the time of an action or state of being.",
      keyRules: [
        "Present Perfect: Action started in the past and continues or affects the present (has/have + V3).",
        "Past Continuous: Action in progress at a specific time in the past (was/were + V-ing).",
        "Future Perfect: Action that will be completed before a future time (will have + V3)."
      ],
      examples: [
        { correct: "She has lived in Grammaria for five years.", incorrect: "She is living in Grammaria since five years." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-t1",
        questionText: "Identify the correct sentence in the Present Perfect Tense:",
        options: [
          "The knights finished their training yesterday.",
          "The knights have finished their training.",
          "The knights are finishing their training now.",
          "The knights had finished before dusk."
        ],
        correctAnswerIndex: 1,
        explanation: "Present Perfect uses 'have/has' + past participle (finished).",
        difficulty: "Easy",
        attackPower: 25
      }
    ]
  },
  {
    id: "artikel",
    name: "Artikel",
    alias: "The Article Isles",
    topic: "Articles (A, An, The)",
    grammarCategory: "Determiners",
    status: "captured",
    enemyControl: 0,
    x: 51,
    y: 14,
    levelRequired: 1,
    xpReward: 250,
    coinsReward: 300,
    description: "Floating islands where small determiners 'A', 'An', and 'The' rule every noun's destiny.",
    studyGuide: {
      summary: "Articles specify whether a noun is definite or indefinite.",
      keyRules: [
        "Use 'A' before consonant sounds (a book, a university).",
        "Use 'An' before vowel sounds (an hour, an apple).",
        "Use 'The' for specific, unique, or previously mentioned nouns."
      ],
      examples: [
        { correct: "He is an honest commander.", incorrect: "He is a honest commander." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-a1",
        questionText: "Choose the correct article for the blank: 'It was ___ unique victory for Grammaria.'",
        options: ["an", "a", "the", "no article"],
        correctAnswerIndex: 1,
        explanation: "'Unique' starts with a consonant 'y' sound (/juː/), so 'a' is used.",
        difficulty: "Easy",
        attackPower: 25
      }
    ]
  },
  {
    id: "concordia",
    name: "Concordia",
    alias: "High Peaks of Accord",
    topic: "Subject-Verb Agreement",
    grammarCategory: "Syntax & Harmony",
    status: "enemy-controlled",
    enemyControl: 65,
    x: 68,
    y: 19,
    levelRequired: 5,
    xpReward: 450,
    coinsReward: 600,
    description: "Mountainous peaks where subjects and verbs must remain in absolute harmonic agreement.",
    studyGuide: {
      summary: "Singular subjects require singular verbs; plural subjects require plural verbs.",
      keyRules: [
        "Words like 'each', 'everyone', 'neither' take singular verbs.",
        "Collective nouns (team, class) take singular verbs when acting as a unit.",
        "Subjects connected by 'either...or' take the verb agreeing with the closer subject."
      ],
      examples: [
        { correct: "Neither of the soldiers was ready.", incorrect: "Neither of the soldiers were ready." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-c2",
        questionText: "Which verb correctly completes: 'Either the captain or his guards ___ patrolling the wall.'?",
        options: ["is", "are", "was", "be"],
        correctAnswerIndex: 1,
        explanation: "With 'either...or', the verb agrees with the closest subject 'guards' (plural -> are).",
        difficulty: "Medium",
        attackPower: 30
      }
    ]
  },
  {
    id: "tagtown",
    name: "Tagtown",
    alias: "Border Settlement",
    topic: "Question Tags",
    grammarCategory: "Interrogatives",
    status: "captured",
    enemyControl: 0,
    x: 24,
    y: 28,
    levelRequired: 2,
    xpReward: 250,
    coinsReward: 350,
    description: "A bustling border town famous for quick, affirming mini-questions at sentence ends.",
    studyGuide: {
      summary: "Question tags turn statements into questions for confirmation.",
      keyRules: [
        "Positive statement -> Negative tag ('You are ready, aren't you?').",
        "Negative statement -> Positive tag ('They haven't arrived, have they?')."
      ],
      examples: [
        { correct: "She seldom complains, does she?", incorrect: "She seldom complains, doesn't she?" }
      ]
    },
    sampleQuestions: [
      {
        id: "q-tg1",
        questionText: "Complete: 'You finished the quest, ___?'",
        options: ["didn't you", "haven't you", "don't you", "did you"],
        correctAnswerIndex: 0,
        explanation: "Past Simple positive statement 'finished' requires past auxiliary 'didn't you'.",
        difficulty: "Easy",
        attackPower: 20
      }
    ]
  },
  {
    id: "position-point",
    name: "Position Point",
    alias: "Prepositia",
    topic: "Prepositions of Place & Time",
    grammarCategory: "Prepositions",
    status: "enemy-controlled",
    enemyControl: 80,
    x: 28,
    y: 42,
    levelRequired: 4,
    xpReward: 400,
    coinsReward: 500,
    description: "A cliffside beacon marking precise locations in time and space.",
    studyGuide: {
      summary: "Prepositions express relations of place, direction, and time.",
      keyRules: [
        "'In' for enclosed spaces/months/years ('in July', 'in the castle').",
        "'On' for surfaces/days ('on Monday', 'on the table').",
        "'At' for precise times/points ('at 5 PM', 'at the gate')."
      ],
      examples: [
        { correct: "The assault begins at dawn on Monday.", incorrect: "The assault begins in dawn in Monday." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-p1",
        questionText: "Fill in: 'The army arrived ___ the fortress ___ midnight.'",
        options: ["at / at", "in / on", "to / in", "on / at"],
        correctAnswerIndex: 0,
        explanation: "'At' is used for specific locations (the fortress) and specific clock times (midnight).",
        difficulty: "Medium",
        attackPower: 30
      }
    ]
  },
  {
    id: "substitia",
    name: "Substitia",
    alias: "Pronoun Valley",
    topic: "Pronoun Cases & Reference",
    grammarCategory: "Pronouns",
    status: "captured",
    enemyControl: 0,
    x: 18,
    y: 58,
    levelRequired: 3,
    xpReward: 300,
    coinsReward: 400,
    description: "A misty valley where pronouns substitute for nouns seamlessly.",
    studyGuide: {
      summary: "Pronouns replace nouns to prevent repetitive language.",
      keyRules: [
        "Subject pronouns: I, he, she, they, who.",
        "Object pronouns: me, him, her, them, whom.",
        "Reflexive pronouns: myself, themselves (never use 'theirselves')."
      ],
      examples: [
        { correct: "Between you and me, we will win.", incorrect: "Between you and I, we will win." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-s1",
        questionText: "Choose the grammatically correct sentence:",
        options: [
          "The teacher called Maya and I to the desk.",
          "The teacher called Maya and me to the desk.",
          "The teacher called Maya and myself to the desk.",
          "The teacher called Maya and him to the desk."
        ],
        correctAnswerIndex: 1,
        explanation: "Object pronoun 'me' is required after the verb 'called'.",
        difficulty: "Easy",
        attackPower: 25
      }
    ]
  },
  {
    id: "namesworth",
    name: "Namesworth",
    alias: "Noun Citadel",
    topic: "Nouns & Pluralization Rules",
    grammarCategory: "Nouns",
    status: "captured",
    enemyControl: 0,
    x: 34,
    y: 60,
    levelRequired: 1,
    xpReward: 250,
    coinsReward: 350,
    description: "The sturdy masonry citadel representing Proper, Common, Abstract, and Collective nouns.",
    studyGuide: {
      summary: "Nouns name people, places, things, or abstract ideas.",
      keyRules: [
        "Uncountable nouns (information, furniture, advice) take singular verbs and no 'a/an'.",
        "Irregular plurals: criterion -> criteria, phenomenon -> phenomena."
      ],
      examples: [
        { correct: "The commander gave valuable advice.", incorrect: "The commander gave a valuable advice." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-n1",
        questionText: "Which word is an uncountable noun?",
        options: ["Knowledge", "Book", "Territory", "Shield"],
        correctAnswerIndex: 0,
        explanation: "'Knowledge' cannot be counted directly (*two knowledges).",
        difficulty: "Easy",
        attackPower: 20
      }
    ]
  },
  {
    id: "passaggia",
    name: "Passaggia",
    alias: "Comprehension Canyon",
    topic: "Reading Comprehension & Context",
    grammarCategory: "Reading & Inference",
    status: "accessible",
    enemyControl: 90,
    x: 23,
    y: 74,
    levelRequired: 6,
    xpReward: 500,
    coinsReward: 700,
    description: "A winding gorge filled with ancient manuscripts requiring keen analytical eyes.",
    studyGuide: {
      summary: "Passaggia requires analyzing passage logic, context clues, and author intent.",
      keyRules: [
        "Identify topic sentence for main idea.",
        "Look for transition words (however, furthermore) to spot tone shifts."
      ],
      examples: [
        { correct: "Inference must be backed by explicit passage clues.", incorrect: "Relying on wild guesswork." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-ps1",
        questionText: "In the context 'The general was unwavering despite overwhelming odds', what does 'unwavering' mean?",
        options: ["Firm & steadfast", "Hesitant", "Confused", "Terrified"],
        correctAnswerIndex: 0,
        explanation: "'Unwavering' means steady, determined, and resolute.",
        difficulty: "Medium",
        attackPower: 30
      }
    ]
  },
  {
    id: "mannerton",
    name: "Mannerton",
    alias: "Adverb District",
    topic: "Adverbs of Manner & Degree",
    grammarCategory: "Adverbs",
    status: "captured",
    enemyControl: 0,
    x: 35,
    y: 76,
    levelRequired: 3,
    xpReward: 300,
    coinsReward: 400,
    description: "A refined province governing how, when, and to what degree actions occur.",
    studyGuide: {
      summary: "Adverbs modify verbs, adjectives, or other adverbs.",
      keyRules: [
        "Adverbs of manner usually end in '-ly' (swiftly, bravely).",
        "Good (adjective) vs Well (adverb): 'He plays well' (not 'plays good')."
      ],
      examples: [
        { correct: "The archer fired accurately.", incorrect: "The archer fired accurate." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-m1",
        questionText: "Which sentence correctly uses an adverb?",
        options: [
          "She executed the tactical maneuver brilliant.",
          "She executed the tactical maneuver brilliantly.",
          "She executed the tactical maneuver more brilliant.",
          "She executed the tactical maneuver most brilliant."
        ],
        correctAnswerIndex: 1,
        explanation: "'Brilliantly' modifies the action verb 'executed'.",
        difficulty: "Easy",
        attackPower: 20
      }
    ]
  },
  {
    id: "sequentia",
    name: "Sequentia",
    alias: "Sentence Order Wilds",
    topic: "Syntax & Sentence Rearrangement",
    grammarCategory: "Sentence Structure",
    status: "accessible",
    enemyControl: 85,
    x: 32,
    y: 89,
    levelRequired: 7,
    xpReward: 500,
    coinsReward: 650,
    description: "Wildlands where jumbled clauses must be ordered into coherent, powerful statements.",
    studyGuide: {
      summary: "Sequentia challenges you to arrange Subject-Verb-Object and modifiers logically.",
      keyRules: [
        "Standard English Order: Subject + Verb + Object + Place + Time.",
        "Dangling Modifiers: Ensure modifiers clearly touch what they modify."
      ],
      examples: [
        { correct: "Walking into the room, he saw the banner.", incorrect: "Walking into the room, the banner was seen." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-sq1",
        questionText: "Arrange into a correct sentence: [A: the enemy / B: silently / C: approached / D: at dawn]",
        options: ["A - C - B - D", "A - B - C - D", "B - A - C - D", "D - C - B - A"],
        correctAnswerIndex: 1,
        explanation: "Subject (the enemy) + Adverb (silently) + Verb (approached) + Time (at dawn).",
        difficulty: "Medium",
        attackPower: 30
      }
    ]
  },
  {
    id: "descriptia",
    name: "Descriptia",
    alias: "Adjective Realm",
    topic: "Adjectives & Order of Attributes",
    grammarCategory: "Modifiers",
    status: "enemy-controlled",
    enemyControl: 70,
    x: 46,
    y: 86,
    levelRequired: 4,
    xpReward: 350,
    coinsReward: 500,
    description: "Vibrant lands where adjectives paint detailed pictures of armies, shields, and castles.",
    studyGuide: {
      summary: "Adjectives describe or modify nouns.",
      keyRules: [
        "Adjective Order: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose.",
        "Comparative vs Superlative: taller (2 items), tallest (3+ items)."
      ],
      examples: [
        { correct: "A beautiful old wooden shield.", incorrect: "A wooden old beautiful shield." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-d1",
        questionText: "Select the sentence with the correct order of adjectives:",
        options: [
          "He wields a sharp ancient steel sword.",
          "He wields a steel ancient sharp sword.",
          "He wields an ancient steel sharp sword.",
          "He wields a sharp steel ancient sword."
        ],
        correctAnswerIndex: 0,
        explanation: "Opinion (sharp) -> Age (ancient) -> Material (steel).",
        difficulty: "Medium",
        attackPower: 25
      }
    ]
  },
  {
    id: "lexicon-city",
    name: "Lexicon City",
    alias: "Capital of Vocabulary",
    topic: "Synonyms, Antonyms & Word Choice",
    grammarCategory: "Vocabulary",
    status: "enemy-controlled",
    enemyControl: 75,
    x: 60,
    y: 81,
    levelRequired: 8,
    xpReward: 600,
    coinsReward: 800,
    description: "A magnificent metropolis dedicated to expanding your lexical weaponry.",
    studyGuide: {
      summary: "Mastering advanced vocabulary and precise word choices.",
      keyRules: [
        "Connotation vs Denotation.",
        "Recognize roots, prefixes, and suffixes to deduce unfamiliar terms."
      ],
      examples: [
        { correct: "The fortress was impregnable (indestructible).", incorrect: "Confusing with vulnerable." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-l1",
        questionText: "What is the ANTONYM of 'Benevolent'?",
        options: ["Malevolent", "Generous", "Kind", "Luminous"],
        correctAnswerIndex: 0,
        explanation: "'Benevolent' means kind; its opposite is 'Malevolent' (wishing evil).",
        difficulty: "Easy",
        attackPower: 25
      }
    ]
  },
  {
    id: "voicelands",
    name: "Voicelands",
    alias: "Twin Cities of Actus & Passiva",
    topic: "Active & Passive Voice",
    grammarCategory: "Voice Transformations",
    status: "enemy-controlled",
    enemyControl: 90,
    x: 72,
    y: 36,
    levelRequired: 9,
    xpReward: 650,
    coinsReward: 850,
    description: "Twin fortified cities where sentences transform between active agency and passive reception.",
    studyGuide: {
      summary: "Active Voice emphasizes the doer; Passive Voice emphasizes the action or object.",
      keyRules: [
        "Active: Subject + Verb + Object ('The warrior defeated the dragon').",
        "Passive: Object + Be + V3 + by Subject ('The dragon was defeated by the warrior')."
      ],
      examples: [
        { correct: "The battle was won by the knights.", incorrect: "The battle was win by the knights." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-v1",
        questionText: "Convert to Passive Voice: 'The commander gave the signal.'",
        options: [
          "The signal was given by the commander.",
          "The signal is given by the commander.",
          "The signal had given by commander.",
          "The commander was given by signal."
        ],
        correctAnswerIndex: 0,
        explanation: "Past Simple Active 'gave' converts to 'was given' in Passive Voice.",
        difficulty: "Medium",
        attackPower: 35
      }
    ]
  },
  {
    id: "junctionia",
    name: "Junctionia",
    alias: "Conjunction Bridge",
    topic: "Conjunctions & Transitions",
    grammarCategory: "Connectors",
    status: "enemy-controlled",
    enemyControl: 60,
    x: 69,
    y: 56,
    levelRequired: 5,
    xpReward: 400,
    coinsReward: 550,
    description: "A majestic stone bridge connecting independent realms with conjunctions.",
    studyGuide: {
      summary: "Conjunctions link words, phrases, or clauses.",
      keyRules: [
        "Coordinating (FANBOYS): For, And, Nor, But, Or, Yet, So.",
        "Correlative: Not only...but also, Either...or, Neither...nor."
      ],
      examples: [
        { correct: "Not only was he brave, but he was also wise.", incorrect: "Not only he was brave, but wise." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-j1",
        questionText: "Complete: 'She was exhausted, ___ she continued the march.'",
        options: ["yet", "so", "because", "unless"],
        correctAnswerIndex: 0,
        explanation: "'Yet' provides contrast between being exhausted and continuing.",
        difficulty: "Easy",
        attackPower: 20
      }
    ]
  },
  {
    id: "mayhaven",
    name: "Mayhaven",
    alias: "Sanctuary of Modals",
    topic: "Modal Auxiliaries (Can, Could, Must, Should)",
    grammarCategory: "Modal Verbs",
    status: "accessible",
    enemyControl: 80,
    x: 86,
    y: 48,
    levelRequired: 7,
    xpReward: 500,
    coinsReward: 650,
    description: "A serene coastal sanctuary governing possibility, necessity, and obligation.",
    studyGuide: {
      summary: "Modals express ability, permission, obligation, or possibility.",
      keyRules: [
        "Modals are followed by the base form of the verb without 'to' (Must go, Can see).",
        "Must (strong internal obligation) vs Have to (external requirement)."
      ],
      examples: [
        { correct: "You must complete the assault before time expires.", incorrect: "You must to complete." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-my1",
        questionText: "Which modal expresses strong advice?",
        options: ["Should", "Might", "Could", "May"],
        correctAnswerIndex: 0,
        explanation: "'Should' is used to offer strong advice or recommendations.",
        difficulty: "Easy",
        attackPower: 25
      }
    ]
  },
  {
    id: "ifshire",
    name: "Ifshire",
    alias: "Highland of Conditionals",
    topic: "Conditionals (Zero, 1st, 2nd, 3rd)",
    grammarCategory: "Conditional Sentences",
    status: "enemy-controlled",
    enemyControl: 95,
    x: 82,
    y: 68,
    levelRequired: 10,
    xpReward: 700,
    coinsReward: 900,
    description: "Highland cliffs shrouded in 'if' clauses, where outcome depends entirely on condition.",
    studyGuide: {
      summary: "Conditionals describe the result of something that might happen or might have happened.",
      keyRules: [
        "1st Conditional: If + Present, Will + Base (real future).",
        "2nd Conditional: If + Past, Would + Base (unreal present).",
        "3rd Conditional: If + Past Perfect, Would Have + V3 (unreal past)."
      ],
      examples: [
        { correct: "If I were the commander, I would attack Centralia.", incorrect: "If I was commander, I will attack." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-if1",
        questionText: "Complete 3rd Conditional: 'If we ___ earlier, we would have captured the fort.'",
        options: ["had left", "left", "have left", "would leave"],
        correctAnswerIndex: 0,
        explanation: "Third conditional requires 'had' + past participle in the 'if' clause.",
        difficulty: "Hard",
        attackPower: 35
      }
    ]
  },
  {
    id: "quotehaven",
    name: "Quotehaven",
    alias: "Archival Haven",
    topic: "Direct & Indirect (Reported) Speech",
    grammarCategory: "Reported Speech",
    status: "enemy-controlled",
    enemyControl: 85,
    x: 78,
    y: 81,
    levelRequired: 11,
    xpReward: 750,
    coinsReward: 950,
    description: "The grand library where spoken quotes are transcribed and transformed through tense backshifts.",
    studyGuide: {
      summary: "Reported speech shifts tenses back when the reporting verb is in the past.",
      keyRules: [
        "Present Simple -> Past Simple.",
        "Present Continuous -> Past Continuous.",
        "Will -> Would, Can -> Could, May -> Might."
      ],
      examples: [
        { correct: "He said that he was ready.", incorrect: "He said that I am ready." }
      ]
    },
    sampleQuestions: [
      {
        id: "q-qh1",
        questionText: "Report this statement: He said, 'I can conquer the realm.'",
        options: [
          "He said that he could conquer the realm.",
          "He said that he can conquer the realm.",
          "He said that I could conquer the realm.",
          "He says he conquered the realm."
        ],
        correctAnswerIndex: 0,
        explanation: "Modal 'can' backshifts to 'could' in past reported speech.",
        difficulty: "Hard",
        attackPower: 35
      }
    ]
  }
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: "Priya Sharma", avatar: "🛡️", xp: 5820, capturedCount: 9, status: "In Assault" },
  { rank: 2, name: "Arjun Verma (You)", avatar: "⚔️", xp: 4250, capturedCount: 6, status: "In Assault" },
  { rank: 3, name: "Rohan Patel", avatar: "🏹", xp: 4100, capturedCount: 5, status: "Idle" },
  { rank: 4, name: "Ananya Gupta", avatar: "🔮", xp: 3950, capturedCount: 5, status: "In Assault" },
  { rank: 5, name: "Kabir Singh", avatar: "🗡️", xp: 3700, capturedCount: 4, status: "Idle" },
  { rank: 6, name: "Sneha Reddy", avatar: "📜", xp: 3400, capturedCount: 4, status: "Idle" },
];
