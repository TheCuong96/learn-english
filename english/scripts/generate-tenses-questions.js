const fs = require('fs');
const path = require('path');

// Utility helpers
function pad3(n) {
  return String(n).padStart(3, '0');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isConsonant(ch) {
  return !'aeiou'.includes(ch.toLowerCase());
}

function toThirdPersonSingular(v1) {
  if (!v1) return v1;
  if (v1 === 'have') return 'has';
  if (v1 === 'do') return 'does';
  if (v1 === 'go') return 'goes';
  if (v1.endsWith('y') && v1.length > 1 && isConsonant(v1[v1.length - 2])) {
    return v1.slice(0, -1) + 'ies';
  }
  if (/(s|x|ch|sh|o)$/.test(v1)) {
    return v1 + 'es';
  }
  return v1 + 's';
}

function toIngForm(v1) {
  if (!v1) return v1;
  if (v1 === 'be') return 'being';
  if (v1 === 'die') return 'dying';
  if (v1 === 'lie') return 'lying';
  if (v1 === 'tie') return 'tying';
  if (v1.endsWith('ie')) return v1.slice(0, -2) + 'ying';
  if (v1.endsWith('e') && !v1.endsWith('ee')) return v1.slice(0, -1) + 'ing';
  // very simple CVC doubling heuristic for short verbs (run -> running)
  if (
    v1.length >= 3 &&
    isConsonant(v1[v1.length - 1]) &&
    !isConsonant(v1[v1.length - 2]) &&
    isConsonant(v1[v1.length - 3])
  ) {
    return v1 + v1[v1.length - 1] + 'ing';
  }
  return v1 + 'ing';
}

// Subjects and auxiliaries
const SUBJECTS = ['I', 'You', 'We', 'They', 'He', 'She', 'It'];
const THIRD_PERSON = new Set(['He', 'She', 'It']);

const BE_PRESENT = {
  I: 'am',
  You: 'are',
  We: 'are',
  They: 'are',
  He: 'is',
  She: 'is',
  It: 'is',
};

const BE_PAST = {
  I: 'was',
  You: 'were',
  We: 'were',
  They: 'were',
  He: 'was',
  She: 'was',
  It: 'was',
};

const HAVE_PRESENT = {
  I: 'have',
  You: 'have',
  We: 'have',
  They: 'have',
  He: 'has',
  She: 'has',
  It: 'has',
};

// Time signals
const TIME = {
  'present-simple': ['every day', 'often', 'usually', 'sometimes', 'always', 'never', 'every week', 'on Mondays'],
  'present-continuous': ['now', 'at the moment', 'right now', 'currently', 'these days'],
  'present-perfect': ['already', 'just', 'yet', 'ever', 'never', 'so far', 'recently'],
  'present-perfect-continuous': ['for two hours', 'since morning', 'for a long time', 'since 2020'],
  'past-simple': ['yesterday', 'last night', 'last week', 'in 2010', 'two days ago'],
  'past-continuous': ['at 8 pm last night', 'when you called', 'while he was away'],
  'past-perfect': ['before he arrived', 'by the time she came', 'when the movie started'],
  'past-perfect-continuous': ['for two hours before he came', 'since morning before the exam'],
  'future-simple': ['tomorrow', 'next week', 'soon', 'later'],
  'future-continuous': ['at this time tomorrow', 'all day tomorrow'],
  'future-perfect': ['by next week', 'by tomorrow', 'by 5 pm'],
  'future-perfect-continuous': ['by 5 pm', 'by next month', 'by the end of the year'],
};

const NON_CONTINUOUS = new Set([
  'know', 'like', 'love', 'hate', 'believe', 'need', 'prefer', 'understand', 'want', 'own', 'belong', 'contain', 'seem', 'be', 'have'
]);

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniqPush(target, itemKey, item, maxLen) {
  if (target.find(q => q[itemKey] === item[itemKey])) return false;
  target.push(item);
  return target.length < maxLen;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadVerbs() {
  const jsonPath = path.resolve(__dirname, '../public/data/verbs-data.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const verbs = JSON.parse(raw);
  // Normalize keys we expect: v1, v2, v3
  return verbs
    .map(v => ({ v1: (v.v1 || v.base || v.verb || '').toLowerCase(), v2: (v.v2 || v.past || '').toLowerCase(), v3: (v.v3 || v.pp || v.pastParticiple || '').toLowerCase() }))
    .filter(v => v.v1 && v.v2 && v.v3 && !/\s/.test(v.v1));
}

// Distractor generators per tense/pattern
function optionsPresentSimple(subject, v1) {
  const correct = THIRD_PERSON.has(subject) ? toThirdPersonSingular(v1) : v1;
  const distractors = THIRD_PERSON.has(subject)
    ? [v1, 'is ' + toIngForm(v1), v2Of(v1) || v1 + 'ed']
    : [toThirdPersonSingular(v1), 'are ' + toIngForm(v1), v2Of(v1) || v1 + 'ed'];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentSimpleNeg(subject, v1) {
  const correct = (THIRD_PERSON.has(subject) ? "doesn't " + v1 : "don't " + v1);
  const distractors = THIRD_PERSON.has(subject)
    ? ["don't " + v1, "isn't " + toIngForm(v1), "didn't " + v1]
    : ["doesn't " + v1, "aren't " + toIngForm(v1), "didn't " + v1];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentSimpleQ(subject) {
  const correct = THIRD_PERSON.has(subject) ? 'Does' : 'Do';
  const distractors = THIRD_PERSON.has(subject) ? ['Do', 'Is', 'Did'] : ['Does', 'Are', 'Did'];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentContinuous(subject, v1) {
  const be = BE_PRESENT[subject];
  const correct = be + ' ' + toIngForm(v1);
  const distractors = [
    (THIRD_PERSON.has(subject) ? 'does ' : 'do ') + v1,
    (BE_PRESENT[subject === 'I' ? 'You' : 'I']) + ' ' + toIngForm(v1),
    v2Of(v1) || v1 + 'ed',
  ];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentContinuousNeg(subject, v1) {
  const be = BE_PRESENT[subject];
  const correct = (be === 'am' ? "am not" : (be === 'is' ? "isn't" : "aren't")) + ' ' + toIngForm(v1);
  const distractors = [
    (THIRD_PERSON.has(subject) ? "doesn't " : "don't ") + v1,
    be + ' ' + v1,
    (BE_PRESENT[subject === 'I' ? 'You' : 'I']) + ' ' + toIngForm(v1),
  ];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentContinuousQ(subject) {
  const correct = BE_PRESENT[subject] === 'am' ? 'Am' : (BE_PRESENT[subject] === 'is' ? 'Is' : 'Are');
  const distractors = ['Do', 'Does', 'Did'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsPresentPerfect(subject, v3) {
  const have = HAVE_PRESENT[subject];
  const correct = have + ' ' + v3;
  const distractors = [
    (have === 'has' ? 'have ' : 'has ') + v3,
    (BE_PRESENT[subject]) + ' ' + toIngForm(fromV3ToV1(v3) || 'work'),
    v2Of(fromV3ToV1(v3) || 'work') || 'worked',
  ];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentPerfectNeg(subject, v3) {
  const have = HAVE_PRESENT[subject];
  const correct = (have === 'has' ? "hasn't " : "haven't ") + v3;
  const distractors = [
    (have === 'has' ? "haven't " : "hasn't ") + v3,
    (BE_PRESENT[subject]) + ' ' + toIngForm(fromV3ToV1(v3) || 'work'),
    'did not ' + (fromV3ToV1(v3) || 'work'),
  ];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPresentPerfectQ(subject) {
  const correct = HAVE_PRESENT[subject] === 'has' ? 'Has' : 'Have';
  const distractors = ['Do', 'Did', 'Is'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsPastSimple(v1, v2) {
  const correct = v2;
  const distractors = [v1, toIngForm(v1), 'had ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPastSimpleNeg(v1) {
  const correct = "didn't " + v1;
  const distractors = ["doesn't " + v1, "wasn't " + toIngForm(v1), 'won\'t ' + v1];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsPastSimpleQ() {
  const correct = 'Did';
  const distractors = ['Do', 'Does', 'Was'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsPastContinuous(subject, v1) {
  const be = BE_PAST[subject];
  const correct = be + ' ' + toIngForm(v1);
  const distractors = [v2Of(v1), (BE_PAST[subject === 'I' ? 'You' : 'I']) + ' ' + toIngForm(v1), 'had ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPastContinuousNeg(subject, v1) {
  const be = BE_PAST[subject];
  const neg = (be === 'was' ? "wasn't" : "weren't");
  const correct = neg + ' ' + toIngForm(v1);
  const distractors = ["didn't " + v1, be + ' ' + v1, 'had ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPastContinuousQ(subject) {
  const be = BE_PAST[subject];
  const correct = be === 'was' ? 'Was' : 'Were';
  const distractors = ['Did', 'Do', 'Has'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsPastPerfect(v3) {
  const correct = 'had ' + v3;
  const distractors = ['has ' + v3, 'was ' + toIngForm(fromV3ToV1(v3) || 'work'), v2Of(fromV3ToV1(v3) || 'work') || 'worked'];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPastPerfectNeg(v3) {
  const correct = "hadn't " + v3;
  const distractors = ["didn't " + (fromV3ToV1(v3) || 'work'), "hasn't " + v3, 'was not ' + toIngForm(fromV3ToV1(v3) || 'work')];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsPastPerfectQ() {
  const correct = 'Had';
  const distractors = ['Did', 'Has', 'Was'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsFutureSimple(v1) {
  const correct = 'will ' + v1;
  const distractors = ['am ' + toIngForm(v1), v2Of(v1), 'have ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsFutureSimpleNeg(v1) {
  const correct = "will not " + v1;
  const distractors = ["won't " + v1, "does not " + v1, 'am not ' + toIngForm(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsFutureSimpleQ() {
  const correct = 'Will';
  const distractors = ['Do', 'Does', 'Are'];
  return shuffle([correct, ...distractors]).slice(0, 4);
}

function optionsFutureContinuous(v1) {
  const correct = 'will be ' + toIngForm(v1);
  const distractors = ['will ' + v1, 'is ' + toIngForm(v1), 'have ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsFuturePerfect(v3) {
  const correct = 'will have ' + v3;
  const distractors = ['will ' + (fromV3ToV1(v3) || 'work'), 'has ' + v3, 'will be ' + toIngForm(fromV3ToV1(v3) || 'work')];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

function optionsFuturePerfectContinuous(v1) {
  const correct = 'will have been ' + toIngForm(v1);
  const distractors = ['will be ' + toIngForm(v1), 'have been ' + toIngForm(v1), 'will have ' + v3Of(v1)];
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]).slice(0, 4);
}

// Verb forms lookup helpers built from verbs data at runtime
let V2_MAP = new Map();
let V3_MAP = new Map();
let V1_FROM_V3 = new Map();

function v2Of(v1) {
  return V2_MAP.get(v1);
}

function v3Of(v1) {
  return V3_MAP.get(v1);
}

function fromV3ToV1(v3) {
  return V1_FROM_V3.get(v3);
}

// Generators for each tense
function genPresentSimple(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['present-simple'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const verb = verbs[idx % verbs.length].v1;
    const signal = pickRandom(signals);

    // Affirmative
    const q1 = {
      id: `present-simple-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${verb}) ${signal}.`,
      options: optionsPresentSimple(subject, verb),
      correctAnswer: THIRD_PERSON.has(subject) ? toThirdPersonSingular(verb) : verb,
      explanation: 'Present Simple – thói quen/sự thật; he/she/it + V-s/es.',
      tenseType: 'present-simple',
      difficulty: THIRD_PERSON.has(subject) ? 'medium' : 'easy',
    };
    uniqPush(list, 'id', q1, 200);

    // Negative
    if (list.length < 200) {
      const q2 = {
        id: `present-simple-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${verb}) ${signal}.`,
        options: optionsPresentSimpleNeg(subject, verb),
        correctAnswer: THIRD_PERSON.has(subject) ? `doesn't ${verb}` : `don't ${verb}`,
        explanation: "Present Simple (phủ định): don't/doesn't + V (bare)",
        tenseType: 'present-simple',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    // Interrogative (aux only)
    if (list.length < 200) {
      const q3 = {
        id: `present-simple-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${verb}) ${signal}?`,
        options: optionsPresentSimpleQ(subject),
        correctAnswer: THIRD_PERSON.has(subject) ? 'Does' : 'Do',
        explanation: 'Present Simple (nghi vấn): Do/Does + S + V?',
        tenseType: 'present-simple',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPresentContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['present-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const verb = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);

    // Affirmative
    const q1 = {
      id: `present-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${verb}) ${signal}.`,
      options: optionsPresentContinuous(subject, verb),
      correctAnswer: BE_PRESENT[subject] + ' ' + toIngForm(verb),
      explanation: 'Present Continuous: am/is/are + V-ing.',
      tenseType: 'present-continuous',
      difficulty: 'easy',
    };
    uniqPush(list, 'id', q1, 200);

    // Negative
    if (list.length < 200) {
      const neg = (BE_PRESENT[subject] === 'am' ? 'am not' : (BE_PRESENT[subject] === 'is' ? "isn't" : "aren't"));
      const q2 = {
        id: `present-continuous-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${verb}) ${signal}.`,
        options: optionsPresentContinuousNeg(subject, verb),
        correctAnswer: `${neg} ${toIngForm(verb)}`,
        explanation: 'Present Continuous (phủ định): am/is/are + not + V-ing.',
        tenseType: 'present-continuous',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    // Interrogative (aux only)
    if (list.length < 200) {
      const correctAux = BE_PRESENT[subject] === 'am' ? 'Am' : (BE_PRESENT[subject] === 'is' ? 'Is' : 'Are');
      const q3 = {
        id: `present-continuous-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${verb}) ${signal}?`,
        options: optionsPresentContinuousQ(subject),
        correctAnswer: correctAux,
        explanation: 'Present Continuous (nghi vấn): Am/Is/Are + S + V-ing?',
        tenseType: 'present-continuous',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPresentPerfect(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['present-perfect'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const { v1, v3 } = verbs[idx % verbs.length];
    const signal = pickRandom(signals);

    // Affirmative
    const q1 = {
      id: `present-perfect-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsPresentPerfect(subject, v3),
      correctAnswer: HAVE_PRESENT[subject] + ' ' + v3,
      explanation: 'Present Perfect: have/has + V3.',
      tenseType: 'present-perfect',
      difficulty: 'medium',
    };
    uniqPush(list, 'id', q1, 200);

    // Negative
    if (list.length < 200) {
      const correct = (HAVE_PRESENT[subject] === 'has' ? "hasn't " : "haven't ") + v3;
      const q2 = {
        id: `present-perfect-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${v1}) ${signal}.`,
        options: optionsPresentPerfectNeg(subject, v3),
        correctAnswer: correct,
        explanation: 'Present Perfect (phủ định): have/has not + V3.',
        tenseType: 'present-perfect',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    // Interrogative (aux only)
    if (list.length < 200) {
      const q3 = {
        id: `present-perfect-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${v1}) ${signal}?`,
        options: optionsPresentPerfectQ(subject),
        correctAnswer: HAVE_PRESENT[subject] === 'has' ? 'Has' : 'Have',
        explanation: 'Present Perfect (nghi vấn): Have/Has + S + V3?',
        tenseType: 'present-perfect',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPresentPerfectContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['present-perfect-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);
    const have = HAVE_PRESENT[subject];
    const correct = `${have} been ${toIngForm(v1)}`;
    const options = optionsFuturePerfectContinuous(v1); // reuse structure then patch correct
    options[options.indexOf(options.find(o => o.startsWith('will have been')) || options[0])] = correct;
    const q1 = {
      id: `present-perfect-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: shuffle([correct, `is ${toIngForm(v1)}`, `${have} ${v3Of(v1)}`, `${have} been ${v1}`]).slice(0,4),
      correctAnswer: correct,
      explanation: 'Present Perfect Continuous: have/has been + V-ing.',
      tenseType: 'present-perfect-continuous',
      difficulty: 'hard',
    };
    uniqPush(list, 'id', q1, 200);
    idx++;
  }
  return list;
}

function genPastSimple(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['past-simple'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const { v1, v2 } = verbs[idx % verbs.length];
    const signal = pickRandom(signals);
    const q1 = {
      id: `past-simple-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsPastSimple(v1, v2),
      correctAnswer: v2,
      explanation: 'Past Simple: V2 (động từ quá khứ).',
      tenseType: 'past-simple',
      difficulty: /ed$/.test(v2) ? 'easy' : 'medium',
    };
    uniqPush(list, 'id', q1, 200);

    if (list.length < 200) {
      const q2 = {
        id: `past-simple-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${v1}) ${signal}.`,
        options: optionsPastSimpleNeg(v1),
        correctAnswer: `didn't ${v1}`,
        explanation: "Past Simple (phủ định): didn't + V (bare).",
        tenseType: 'past-simple',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    if (list.length < 200) {
      const q3 = {
        id: `past-simple-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${v1}) ${signal}?`,
        options: optionsPastSimpleQ(),
        correctAnswer: 'Did',
        explanation: 'Past Simple (nghi vấn): Did + S + V?',
        tenseType: 'past-simple',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPastContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['past-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);

    const q1 = {
      id: `past-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsPastContinuous(subject, v1),
      correctAnswer: BE_PAST[subject] + ' ' + toIngForm(v1),
      explanation: 'Past Continuous: was/were + V-ing.',
      tenseType: 'past-continuous',
      difficulty: 'medium',
    };
    uniqPush(list, 'id', q1, 200);

    if (list.length < 200) {
      const q2 = {
        id: `past-continuous-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${v1}) ${signal}.`,
        options: optionsPastContinuousNeg(subject, v1),
        correctAnswer: (BE_PAST[subject] === 'was' ? "wasn't" : "weren't") + ' ' + toIngForm(v1),
        explanation: 'Past Continuous (phủ định): was/were + not + V-ing.',
        tenseType: 'past-continuous',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    if (list.length < 200) {
      const q3 = {
        id: `past-continuous-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${v1}) ${signal}?`,
        options: optionsPastContinuousQ(subject),
        correctAnswer: BE_PAST[subject] === 'was' ? 'Was' : 'Were',
        explanation: 'Past Continuous (nghi vấn): Was/Were + S + V-ing?',
        tenseType: 'past-continuous',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPastPerfect(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['past-perfect'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const { v1, v3 } = verbs[idx % verbs.length];
    const signal = pickRandom(signals);
    const q1 = {
      id: `past-perfect-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsPastPerfect(v3),
      correctAnswer: 'had ' + v3,
      explanation: 'Past Perfect: had + V3.',
      tenseType: 'past-perfect',
      difficulty: 'medium',
    };
    uniqPush(list, 'id', q1, 200);

    if (list.length < 200) {
      const q2 = {
        id: `past-perfect-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${v1}) ${signal}.`,
        options: optionsPastPerfectNeg(v3),
        correctAnswer: "hadn't " + v3,
        explanation: 'Past Perfect (phủ định): had not + V3.',
        tenseType: 'past-perfect',
        difficulty: 'medium',
      };
      uniqPush(list, 'id', q2, 200);
    }

    if (list.length < 200) {
      const q3 = {
        id: `past-perfect-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${v1}) ${signal}?`,
        options: optionsPastPerfectQ(),
        correctAnswer: 'Had',
        explanation: 'Past Perfect (nghi vấn): Had + S + V3?',
        tenseType: 'past-perfect',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }

    idx++;
  }
  return list;
}

function genPastPerfectContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['past-perfect-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);
    const correct = `had been ${toIngForm(v1)}`;
    const options = shuffle([correct, 'was ' + toIngForm(v1), 'had ' + v3Of(v1), 'have been ' + toIngForm(v1)]).slice(0,4);
    const q1 = {
      id: `past-perfect-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options,
      correctAnswer: correct,
      explanation: 'Past Perfect Continuous: had been + V-ing.',
      tenseType: 'past-perfect-continuous',
      difficulty: 'hard',
    };
    uniqPush(list, 'id', q1, 200);
    idx++;
  }
  return list;
}

function genFutureSimple(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['future-simple'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = verbs[idx % verbs.length].v1;
    const signal = pickRandom(signals);
    const q1 = {
      id: `future-simple-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsFutureSimple(v1),
      correctAnswer: 'will ' + v1,
      explanation: 'Future Simple: will + V.',
      tenseType: 'future-simple',
      difficulty: 'easy',
    };
    uniqPush(list, 'id', q1, 200);
    if (list.length < 200) {
      const q2 = {
        id: `future-simple-${pad3(list.length + 1)}`,
        question: `${subject} ___ (${v1}) ${signal}.`,
        options: optionsFutureSimpleNeg(v1),
        correctAnswer: 'will not ' + v1,
        explanation: 'Future Simple (phủ định): will not + V.',
        tenseType: 'future-simple',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q2, 200);
    }
    if (list.length < 200) {
      const q3 = {
        id: `future-simple-${pad3(list.length + 1)}`,
        question: `___ ${subject.toLowerCase()} (${v1}) ${signal}?`,
        options: optionsFutureSimpleQ(),
        correctAnswer: 'Will',
        explanation: 'Future Simple (nghi vấn): Will + S + V?',
        tenseType: 'future-simple',
        difficulty: 'easy',
      };
      uniqPush(list, 'id', q3, 200);
    }
    idx++;
  }
  return list;
}

function genFutureContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['future-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);
    const q1 = {
      id: `future-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsFutureContinuous(v1),
      correctAnswer: 'will be ' + toIngForm(v1),
      explanation: 'Future Continuous: will be + V-ing.',
      tenseType: 'future-continuous',
      difficulty: 'medium',
    };
    uniqPush(list, 'id', q1, 200);
    idx++;
  }
  return list;
}

function genFuturePerfect(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['future-perfect'];
  const subjects = shuffle(SUBJECTS);
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const { v1, v3 } = verbs[idx % verbs.length];
    const signal = pickRandom(signals);
    const q1 = {
      id: `future-perfect-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsFuturePerfect(v3),
      correctAnswer: 'will have ' + v3,
      explanation: 'Future Perfect: will have + V3.',
      tenseType: 'future-perfect',
      difficulty: 'medium',
    };
    uniqPush(list, 'id', q1, 200);
    idx++;
  }
  return list;
}

function genFuturePerfectContinuous(verbs) {
  const list = [];
  let idx = 0;
  const signals = TIME['future-perfect-continuous'];
  const subjects = shuffle(SUBJECTS);
  const contVerbs = verbs.filter(v => !NON_CONTINUOUS.has(v.v1));
  while (list.length < 200) {
    const subject = subjects[idx % subjects.length];
    const v1 = contVerbs[idx % contVerbs.length].v1;
    const signal = pickRandom(signals);
    const q1 = {
      id: `future-perfect-continuous-${pad3(list.length + 1)}`,
      question: `${subject} ___ (${v1}) ${signal}.`,
      options: optionsFuturePerfectContinuous(v1),
      correctAnswer: 'will have been ' + toIngForm(v1),
      explanation: 'Future Perfect Continuous: will have been + V-ing.',
      tenseType: 'future-perfect-continuous',
      difficulty: 'hard',
    };
    uniqPush(list, 'id', q1, 200);
    idx++;
  }
  return list;
}

const GENERATORS = {
  'present-simple': genPresentSimple,
  'present-continuous': genPresentContinuous,
  'present-perfect': genPresentPerfect,
  'present-perfect-continuous': genPresentPerfectContinuous,
  'past-simple': genPastSimple,
  'past-continuous': genPastContinuous,
  'past-perfect': genPastPerfect,
  'past-perfect-continuous': genPastPerfectContinuous,
  'future-simple': genFutureSimple,
  'future-continuous': genFutureContinuous,
  'future-perfect': genFuturePerfect,
  'future-perfect-continuous': genFuturePerfectContinuous,
};

const TENSES = Object.keys(GENERATORS);

function buildVerbMaps(verbs) {
  V2_MAP = new Map();
  V3_MAP = new Map();
  V1_FROM_V3 = new Map();
  for (const v of verbs) {
    V2_MAP.set(v.v1, v.v2);
    V3_MAP.set(v.v1, v.v3);
    V1_FROM_V3.set(v.v3, v.v1);
  }
}

function main() {
  const outDir = path.resolve(__dirname, '../public/data/tenses');
  ensureDir(outDir);

  const verbs = loadVerbs();
  if (!verbs || verbs.length === 0) {
    console.error('Không tải được dữ liệu động từ.');
    process.exit(1);
  }
  buildVerbMaps(verbs);

  for (const tense of TENSES) {
    const gen = GENERATORS[tense];
    const questions = gen(verbs);
    // stamp tenseType properly and ensure options length
    for (const q of questions) {
      q.tenseType = tense;
      if (!Array.isArray(q.options) || q.options.length < 4) {
        q.options = shuffle([q.correctAnswer, q.correctAnswer + 's', q.correctAnswer + 'ed', q.correctAnswer + 'ing']).slice(0,4);
      }
    }
    const file = path.join(outDir, `${tense}.json`);
    fs.writeFileSync(file, JSON.stringify(questions, null, 2), 'utf-8');
    console.log(`Generated ${path.basename(file)}: ${questions.length} questions`);
  }
}

main();


