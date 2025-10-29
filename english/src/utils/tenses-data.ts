import { TenseFormula, TenseType, TensesQuestion } from '@/types/tenses';

export const tensesData: TenseFormula[] = [
  {
    id: 'present-simple',
    name: 'Present Simple',
    nameVN: 'Hiện tại đơn',
    affirmative: 'S + V(s/es)',
    negative: 'S + do/does + not + V',
    interrogative: 'Do/Does + S + V?',
    examples: {
      affirmative: ['I work every day.', 'She works every day.'],
      negative: ["I don't work on Sundays.", "She doesn't work on Sundays."],
      interrogative: ['Do you work here?', 'Does she work here?']
    },
    timeSignals: ['always', 'usually', 'often', 'never', 'every day', 'sometimes'],
    usage: 'Thói quen, sự thật hiển nhiên'
  },
  {
    id: 'present-continuous',
    name: 'Present Continuous',
    nameVN: 'Hiện tại tiếp diễn',
    affirmative: 'S + am/is/are + V-ing',
    negative: 'S + am/is/are + not + V-ing',
    interrogative: 'Am/Is/Are + S + V-ing?',
    examples: {
      affirmative: ['I am working now.', 'She is working now.'],
      negative: ["I am not working now.", "She is not working now."],
      interrogative: ['Am I working now?', 'Is she working now?']
    },
    timeSignals: ['now', 'at the moment', 'currently', 'look!', 'listen!'],
    usage: 'Hành động đang xảy ra'
  },
  {
    id: 'present-perfect',
    name: 'Present Perfect',
    nameVN: 'Hiện tại hoàn thành',
    affirmative: 'S + have/has + V3',
    negative: 'S + have/has + not + V3',
    interrogative: 'Have/Has + S + V3?',
    examples: {
      affirmative: ['I have worked here.', 'She has worked here.'],
      negative: ["I have not worked here.", "She has not worked here."],
      interrogative: ['Have you worked here?', 'Has she worked here?']
    },
    timeSignals: ['already', 'just', 'yet', 'ever', 'never', 'so far'],
    usage: 'Hành động hoàn thành, kinh nghiệm'
  },
  {
    id: 'present-perfect-continuous',
    name: 'Present Perfect Continuous',
    nameVN: 'Hiện tại hoàn thành tiếp diễn',
    affirmative: 'S + have/has + been + V-ing',
    negative: 'S + have/has + not + been + V-ing',
    interrogative: 'Have/Has + S + been + V-ing?',
    examples: {
      affirmative: ['I have been working for 3 hours.'],
      negative: ['I have not been working for long.'],
      interrogative: ['Have you been working long?']
    },
    timeSignals: ['for', 'since', 'all day', 'recently'],
    usage: 'Hành động kéo dài từ quá khứ'
  },
  {
    id: 'past-simple',
    name: 'Past Simple',
    nameVN: 'Quá khứ đơn',
    affirmative: 'S + V2',
    negative: 'S + did + not + V',
    interrogative: 'Did + S + V?',
    examples: {
      affirmative: ['I worked yesterday.'],
      negative: ["I didn't work yesterday."],
      interrogative: ['Did you work yesterday?']
    },
    timeSignals: ['yesterday', 'last week', 'ago', 'then'],
    usage: 'Hành động đã xảy ra và kết thúc'
  },
  {
    id: 'past-continuous',
    name: 'Past Continuous',
    nameVN: 'Quá khứ tiếp diễn',
    affirmative: 'S + was/were + V-ing',
    negative: 'S + was/were + not + V-ing',
    interrogative: 'Was/Were + S + V-ing?',
    examples: {
      affirmative: ['I was working when you called.'],
      negative: ["I was not working when you called."],
      interrogative: ['Were you working when I called?']
    },
    timeSignals: ['while', 'when', 'at that time'],
    usage: 'Hành động đang xảy ra trong quá khứ'
  },
  {
    id: 'past-perfect',
    name: 'Past Perfect',
    nameVN: 'Quá khứ hoàn thành',
    affirmative: 'S + had + V3',
    negative: 'S + had + not + V3',
    interrogative: 'Had + S + V3?',
    examples: {
      affirmative: ['I had finished before you came.'],
      negative: ['I had not finished before you came.'],
      interrogative: ['Had you finished before I came?']
    },
    timeSignals: ['before', 'after', 'by the time'],
    usage: 'Hành động xảy ra trước một thời điểm'
  },
  {
    id: 'past-perfect-continuous',
    name: 'Past Perfect Continuous',
    nameVN: 'Quá khứ hoàn thành tiếp diễn',
    affirmative: 'S + had + been + V-ing',
    negative: 'S + had + not + been + V-ing',
    interrogative: 'Had + S + been + V-ing?',
    examples: {
      affirmative: ['I had been working for 2 hours.'],
      negative: ['I had not been working for long.'],
      interrogative: ['Had you been working long?']
    },
    timeSignals: ['for', 'since', 'before'],
    usage: 'Hành động kéo dài trước một thời điểm'
  },
  {
    id: 'future-simple',
    name: 'Future Simple',
    nameVN: 'Tương lai đơn',
    affirmative: 'S + will + V',
    negative: 'S + will + not + V',
    interrogative: 'Will + S + V?',
    examples: {
      affirmative: ['I will work tomorrow.'],
      negative: ["I won't work tomorrow."],
      interrogative: ['Will you work tomorrow?']
    },
    timeSignals: ['tomorrow', 'next week', 'soon', 'later'],
    usage: 'Hành động sẽ xảy ra trong tương lai'
  },
  {
    id: 'future-continuous',
    name: 'Future Continuous',
    nameVN: 'Tương lai tiếp diễn',
    affirmative: 'S + will + be + V-ing',
    negative: 'S + will + not + be + V-ing',
    interrogative: 'Will + S + be + V-ing?',
    examples: {
      affirmative: ['I will be working at 8 PM tomorrow.'],
      negative: ['I will not be working at that time.'],
      interrogative: ['Will you be working at 8 PM?']
    },
    timeSignals: ['at this time tomorrow', 'at 8 PM'],
    usage: 'Hành động sẽ đang xảy ra'
  },
  {
    id: 'future-perfect',
    name: 'Future Perfect',
    nameVN: 'Tương lai hoàn thành',
    affirmative: 'S + will + have + V3',
    negative: 'S + will + not + have + V3',
    interrogative: 'Will + S + have + V3?',
    examples: {
      affirmative: ['I will have finished by 5 PM.'],
      negative: ['I will not have finished by then.'],
      interrogative: ['Will you have finished by 5 PM?']
    },
    timeSignals: ['by', 'before', 'by the time'],
    usage: 'Hành động sẽ hoàn thành'
  },
  {
    id: 'future-perfect-continuous',
    name: 'Future Perfect Continuous',
    nameVN: 'Tương lai hoàn thành tiếp diễn',
    affirmative: 'S + will + have + been + V-ing',
    negative: 'S + will + not + have + been + V-ing',
    interrogative: 'Will + S + have + been + V-ing?',
    examples: {
      affirmative: ['I will have been working for 3 hours by 5 PM.'],
      negative: ['I will not have been working that long.'],
      interrogative: ['Will you have been working for 3 hours?']
    },
    timeSignals: ['for', 'by the time'],
    usage: 'Hành động sẽ kéo dài đến một thời điểm'
  }
];

export const tensesQuizData: TensesQuestion[] = [
  // Present Simple
  {
    id: 'q1',
    question: 'I ___ (work) every day.',
    options: ['work', 'works', 'working', 'worked'],
    correctAnswer: 'work',
    explanation: 'Present Simple - thói quen hằng ngày',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'She ___ (study) English every morning.',
    options: ['study', 'studies', 'studying', 'studied'],
    correctAnswer: 'studies',
    explanation: 'Chủ ngữ số ít (She) nên động từ thêm -s/es',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Present Continuous
  {
    id: 'q3',
    question: 'I ___ (work) now.',
    options: ['work', 'am working', 'worked', 'will work'],
    correctAnswer: 'am working',
    explanation: 'Present Continuous - hành động đang xảy ra',
    tenseType: 'present-continuous',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: 'They ___ (watch) TV at the moment.',
    options: ['watch', 'watches', 'are watching', 'watched'],
    correctAnswer: 'are watching',
    explanation: 'Present Continuous - "at the moment" là dấu hiệu',
    tenseType: 'present-continuous',
    difficulty: 'easy'
  },
  // Past Simple
  {
    id: 'q5',
    question: 'I ___ (work) yesterday.',
    options: ['work', 'am working', 'worked', 'was working'],
    correctAnswer: 'worked',
    explanation: 'Past Simple - hành động đã xảy ra và kết thúc',
    tenseType: 'past-simple',
    difficulty: 'easy'
  },
  {
    id: 'q6',
    question: 'She ___ (go) to school last week.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 'went',
    explanation: 'Past Simple - động từ bất quy tắc (go → went)',
    tenseType: 'past-simple',
    difficulty: 'medium'
  },
  // Past Continuous
  {
    id: 'q7',
    question: 'I ___ (work) when you called.',
    options: ['worked', 'was working', 'work', 'am working'],
    correctAnswer: 'was working',
    explanation: 'Past Continuous - hành động đang xảy ra trong quá khứ',
    tenseType: 'past-continuous',
    difficulty: 'medium'
  },
  // Future Simple
  {
    id: 'q8',
    question: 'I ___ (work) tomorrow.',
    options: ['work', 'am working', 'will work', 'worked'],
    correctAnswer: 'will work',
    explanation: 'Future Simple - "tomorrow" là dấu hiệu của tương lai',
    tenseType: 'future-simple',
    difficulty: 'easy'
  },
  // Present Perfect
  {
    id: 'q9',
    question: 'I ___ (work) here since 2020.',
    options: ['work', 'worked', 'have worked', 'working'],
    correctAnswer: 'have worked',
    explanation: 'Present Perfect - "since" là dấu hiệu',
    tenseType: 'present-perfect',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    question: 'She ___ (finish) her homework already.',
    options: ['finish', 'finished', 'has finished', 'finishes'],
    correctAnswer: 'has finished',
    explanation: 'Present Perfect - "already" là dấu hiệu',
    tenseType: 'present-perfect',
    difficulty: 'medium'
  },
  // More questions
  {
    id: 'q11',
    question: 'He ___ (live) in London for 5 years.',
    options: ['lives', 'lived', 'has lived', 'has been living'],
    correctAnswer: 'has lived',
    explanation: 'Present Perfect - "for + khoảng thời gian"',
    tenseType: 'present-perfect',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    question: 'We ___ (wait) for 2 hours.',
    options: ['wait', 'waited', 'have waited', 'are waiting'],
    correctAnswer: 'have waited',
    explanation: 'Present Perfect - "for + khoảng thời gian"',
    tenseType: 'present-perfect',
    difficulty: 'medium'
  },
  // Past Continuous
  {
    id: 'q13',
    question: 'I ___ (study) when she called.',
    options: ['studied', 'was studying', 'study', 'am studying'],
    correctAnswer: 'was studying',
    explanation: 'Past Continuous - hành động đang xảy ra khi có hành động khác cắt ngang',
    tenseType: 'past-continuous',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    question: 'They ___ (watch) TV while I was cooking.',
    options: ['watched', 'were watching', 'watch', 'are watching'],
    correctAnswer: 'were watching',
    explanation: 'Past Continuous - hai hành động đang xảy ra đồng thời',
    tenseType: 'past-continuous',
    difficulty: 'medium'
  },
  // Past Perfect
  {
    id: 'q15',
    question: 'I ___ (finish) my homework before you came.',
    options: ['finished', 'had finished', 'finish', 'have finished'],
    correctAnswer: 'had finished',
    explanation: 'Past Perfect - hành động xảy ra trước một thời điểm trong quá khứ',
    tenseType: 'past-perfect',
    difficulty: 'hard'
  },
  // Future Continuous
  {
    id: 'q16',
    question: 'At 8 PM tomorrow, I ___ (work).',
    options: ['work', 'will work', 'am working', 'will be working'],
    correctAnswer: 'will be working',
    explanation: 'Future Continuous - "at this time tomorrow" là dấu hiệu',
    tenseType: 'future-continuous',
    difficulty: 'medium'
  },
  // Future Perfect
  {
    id: 'q17',
    question: 'By next year, I ___ (complete) my degree.',
    options: ['complete', 'will complete', 'have completed', 'will have completed'],
    correctAnswer: 'will have completed',
    explanation: 'Future Perfect - "by + thời gian tương lai" là dấu hiệu',
    tenseType: 'future-perfect',
    difficulty: 'hard'
  },
  // Mixed
  {
    id: 'q18',
    question: 'She ___ (not work) for that company anymore.',
    options: ["don't work", "doesn't work", "didn't work", "won't work"],
    correctAnswer: "doesn't work",
    explanation: 'Present Simple - thói quen hiện tại',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q19',
    question: 'I ___ (not see) him since last month.',
    options: ["don't see", "didn't see", "haven't seen", "won't see"],
    correctAnswer: "haven't seen",
    explanation: 'Present Perfect - "since" là dấu hiệu',
    tenseType: 'present-perfect',
    difficulty: 'medium'
  },
  {
    id: 'q20',
    question: 'They ___ (play) football next weekend.',
    options: ['play', 'played', 'will play', 'are playing'],
    correctAnswer: 'will play',
    explanation: 'Future Simple - "next weekend" là dấu hiệu',
    tenseType: 'future-simple',
    difficulty: 'easy'
  },
  // ==================== 100 CÂU BÀI TẬP VỀ THÌ HIỆN TẠI ĐƠN ====================
  // Affirmative - Easy
  {
    id: 'q101',
    question: 'I ___ (like) coffee in the morning.',
    options: ['like', 'likes', 'liking', 'liked'],
    correctAnswer: 'like',
    explanation: 'Present Simple - I/You/We/They không thêm s/es',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q102',
    question: 'We ___ (play) tennis every Sunday.',
    options: ['play', 'plays', 'playing', 'played'],
    correctAnswer: 'play',
    explanation: 'Present Simple - thói quen hằng tuần với "every Sunday"',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q103',
    question: 'They ___ (live) in Hanoi.',
    options: ['live', 'lives', 'living', 'lived'],
    correctAnswer: 'live',
    explanation: 'Present Simple - sự thật hiện tại',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q104',
    question: 'You ___ (speak) English very well.',
    options: ['speak', 'speaks', 'speaking', 'spoke'],
    correctAnswer: 'speak',
    explanation: 'Present Simple - kỹ năng hiện tại',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q105',
    question: 'Students ___ (study) hard every day.',
    options: ['study', 'studies', 'studying', 'studied'],
    correctAnswer: 'study',
    explanation: 'Present Simple - thói quen với "every day"',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // He/She/It - thêm s/es
  {
    id: 'q106',
    question: 'He ___ (go) to school by bike.',
    options: ['go', 'goes', 'going', 'went'],
    correctAnswer: 'goes',
    explanation: 'He/She/It + V(s/es) - động từ thêm -es sau go',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q107',
    question: 'She ___ (watch) TV in the evening.',
    options: ['watch', 'watches', 'watching', 'watched'],
    correctAnswer: 'watches',
    explanation: 'She + V(s/es) - động từ kết thúc bằng ch nên thêm -es',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q108',
    question: 'Tom ___ (do) his homework at 8 PM.',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 'does',
    explanation: 'Tom (He) + does (động từ đặc biệt)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q109',
    question: 'The teacher ___ (teach) us English.',
    options: ['teach', 'teaches', 'teaching', 'taught'],
    correctAnswer: 'teaches',
    explanation: 'Chủ ngữ số ít (The teacher) + V(s/es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q110',
    question: 'My brother ___ (play) football every afternoon.',
    options: ['play', 'plays', 'playing', 'played'],
    correctAnswer: 'plays',
    explanation: 'My brother (He) + V(s/es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Động từ kết thúc bằng s, ss, sh, ch, x, o - thêm es
  {
    id: 'q111',
    question: 'She ___ (wash) her hands before meals.',
    options: ['wash', 'washes', 'washing', 'washed'],
    correctAnswer: 'washes',
    explanation: 'She + washes (wash kết thúc bằng sh nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q112',
    question: 'He ___ (fix) computers for a living.',
    options: ['fix', 'fixs', 'fixes', 'fixing'],
    correctAnswer: 'fixes',
    explanation: 'He + fixes (fix kết thúc bằng x nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q113',
    question: 'My sister ___ (catch) the bus to work.',
    options: ['catch', 'catches', 'catching', 'caught'],
    correctAnswer: 'catches',
    explanation: 'My sister (She) + catches (catch kết thúc bằng ch nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q114',
    question: 'The dog ___ (watch) TV with us.',
    options: ['watch', 'watchs', 'watches', 'watching'],
    correctAnswer: 'watches',
    explanation: 'The dog (It) + watches (watch kết thúc bằng ch nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q115',
    question: 'He ___ (pass) all his exams easily.',
    options: ['pass', 'passs', 'passes', 'passing'],
    correctAnswer: 'passes',
    explanation: 'He + passes (pass kết thúc bằng ss nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Động từ kết thúc bằng y
  {
    id: 'q116',
    question: 'She ___ (study) at the library every day.',
    options: ['study', 'studys', 'studies', 'studied'],
    correctAnswer: 'studies',
    explanation: 'She + studies (study → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q117',
    question: 'He ___ (cry) when he watches sad movies.',
    options: ['cry', 'crys', 'cries', 'crying'],
    correctAnswer: 'cries',
    explanation: 'He + cries (cry → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q118',
    question: 'The baby ___ (try) to walk.',
    options: ['try', 'trys', 'tries', 'trying'],
    correctAnswer: 'tries',
    explanation: 'The baby (It) + tries (try → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Negative form
  {
    id: 'q119',
    question: 'I ___ (not eat) meat on Fridays.',
    options: ['don\'t eat', 'doesn\'t eat', 'am not eating', 'didn\'t eat'],
    correctAnswer: 'don\'t eat',
    explanation: 'Present Simple negative - I/You/We/They + don\'t + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q120',
    question: 'She ___ (not like) vegetables.',
    options: ['don\'t like', 'doesn\'t like', 'isn\'t liking', 'didn\'t like'],
    correctAnswer: 'doesn\'t like',
    explanation: 'Present Simple negative - He/She/It + doesn\'t + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q121',
    question: 'They ___ (not watch) horror movies.',
    options: ['don\'t watch', 'doesn\'t watch', 'aren\'t watching', 'didn\'t watch'],
    correctAnswer: 'don\'t watch',
    explanation: 'They + don\'t + watch',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q122',
    question: 'He ___ (not drink) coffee in the evening.',
    options: ['don\'t drink', 'doesn\'t drink', 'isn\'t drinking', 'didn\'t drink'],
    correctAnswer: 'doesn\'t drink',
    explanation: 'He + doesn\'t + drink',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q123',
    question: 'We ___ (not work) on weekends.',
    options: ['don\'t work', 'doesn\'t work', 'aren\'t working', 'didn\'t work'],
    correctAnswer: 'don\'t work',
    explanation: 'We + don\'t + work',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Question form
  {
    id: 'q124',
    question: '___ you ___ (like) chocolate?',
    options: ['Do, like', 'Does, like', 'Are, liking', 'Did, like'],
    correctAnswer: 'Do, like',
    explanation: 'Present Simple question - Do + S + V?',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q125',
    question: '___ she ___ (speak) French?',
    options: ['Do, speak', 'Does, speak', 'Is, speaking', 'Did, speak'],
    correctAnswer: 'Does, speak',
    explanation: 'Present Simple question - Does + she + V?',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q126',
    question: '___ they ___ (play) basketball?',
    options: ['Do, play', 'Does, play', 'Are, playing', 'Did, play'],
    correctAnswer: 'Do, play',
    explanation: 'Do they play? - Present Simple question',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q127',
    question: '___ Tom ___ (help) his mother?',
    options: ['Do, help', 'Does, helps', 'Does, help', 'Is, helping'],
    correctAnswer: 'Does, help',
    explanation: 'Does Tom help? - động từ không thêm s trong câu hỏi',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Time signals
  {
    id: 'q128',
    question: 'I ___ (always wake) up at 6 AM.',
    options: ['always wake', 'wakes always', 'always wakes', 'waking always'],
    correctAnswer: 'always wake',
    explanation: 'Present Simple với "always" - I + always + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q129',
    question: 'She ___ (usually have) breakfast at 7 AM.',
    options: ['usually have', 'usually has', 'has usually', 'having usually'],
    correctAnswer: 'usually has',
    explanation: 'She + usually + V(s)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q130',
    question: 'They ___ (never smoke).',
    options: ['never smoke', 'smokes never', 'never smokes', 'smoking never'],
    correctAnswer: 'never smoke',
    explanation: 'They + never + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q131',
    question: 'He ___ (often play) video games.',
    options: ['often play', 'plays often', 'often plays', 'often playing'],
    correctAnswer: 'often plays',
    explanation: 'He + often + V(s)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q132',
    question: 'We ___ (sometimes visit) our grandparents.',
    options: ['sometimes visit', 'visit sometimes', 'sometimes visits', 'sometimes visiting'],
    correctAnswer: 'sometimes visit',
    explanation: 'We + sometimes + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Medium difficulty
  {
    id: 'q133',
    question: 'How often ___ you ___ (exercise)?',
    options: ['do, exercise', 'does, exercise', 'are, exercising', 'did, exercise'],
    correctAnswer: 'do, exercise',
    explanation: 'How often do you exercise? - câu hỏi về tần suất',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q134',
    question: 'What time ___ she ___ (get up) every morning?',
    options: ['do, get up', 'does, gets up', 'does, get up', 'is, getting up'],
    correctAnswer: 'does, get up',
    explanation: 'Does she get up? - động từ không thêm s trong câu hỏi',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q135',
    question: 'Where ___ they ___ (work)?',
    options: ['do, work', 'does, work', 'are, working', 'did, work'],
    correctAnswer: 'do, work',
    explanation: 'Where do they work?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q136',
    question: 'Who ___ (know) the answer?',
    options: ['know', 'knows', 'knowing', 'knew'],
    correctAnswer: 'knows',
    explanation: 'Who knows? - câu hỏi với who (chủ ngữ) dùng V(s)',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q137',
    question: 'How many languages ___ you ___ (speak)?',
    options: ['do, speak', 'does, speak', 'are, speaking', 'did, speak'],
    correctAnswer: 'do, speak',
    explanation: 'How many languages do you speak?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Harder examples
  {
    id: 'q138',
    question: 'The sun ___ (rise) in the east.',
    options: ['rise', 'rises', 'rising', 'rose'],
    correctAnswer: 'rises',
    explanation: 'Present Simple - sự thật khoa học, chủ ngữ "the sun" là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q139',
    question: 'Water ___ (boil) at 100 degrees Celsius.',
    options: ['boil', 'boils', 'boiling', 'boiled'],
    correctAnswer: 'boils',
    explanation: 'Present Simple - sự thật khoa học (water là số ít)',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q140',
    question: 'The Earth ___ (orbit) the Sun.',
    options: ['orbit', 'orbits', 'orbiting', 'orbited'],
    correctAnswer: 'orbits',
    explanation: 'Present Simple - sự thật khoa học',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q141',
    question: 'Students ___ (usually take) notes during class.',
    options: ['usually take', 'usually takes', 'takes usually', 'taking usually'],
    correctAnswer: 'usually take',
    explanation: 'Students (số nhiều) + usually + V',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q142',
    question: 'My boss ___ (always arrive) on time.',
    options: ['always arrive', 'always arrives', 'arrives always', 'arriving always'],
    correctAnswer: 'always arrives',
    explanation: 'My boss (He) + always + V(s)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Do vs Does
  {
    id: 'q143',
    question: 'Why ___ you ___ (not come) to the meeting?',
    options: ['do, come', 'don\'t, come', 'doesn\'t, come', 'are not, coming'],
    correctAnswer: 'don\'t, come',
    explanation: 'Why don\'t you come? - câu hỏi phủ định',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q144',
    question: 'Why ___ she ___ (refuse) to help?',
    options: ['do, refuse', 'does, refuses', 'does, refuse', 'is, refusing'],
    correctAnswer: 'does, refuse',
    explanation: 'Why does she refuse?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q145',
    question: 'When ___ you ___ (usually arrive) home?',
    options: ['do, arrive', 'does, arrive', 'are, arriving', 'did, arrive'],
    correctAnswer: 'do, arrive',
    explanation: 'When do you usually arrive?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q146',
    question: 'When ___ he ___ (usually leave) for work?',
    options: ['do, leave', 'does, leaves', 'does, leave', 'is, leaving'],
    correctAnswer: 'does, leave',
    explanation: 'When does he usually leave?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Daily routines
  {
    id: 'q147',
    question: 'I ___ (brush) my teeth twice a day.',
    options: ['brush', 'brushes', 'brushing', 'brushed'],
    correctAnswer: 'brush',
    explanation: 'I + brush - thói quen hằng ngày',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q148',
    question: 'She ___ (make) breakfast for her family every morning.',
    options: ['make', 'makes', 'making', 'made'],
    correctAnswer: 'makes',
    explanation: 'She + makes - thói quen hằng ngày',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q149',
    question: 'He ___ (read) the newspaper every morning.',
    options: ['read', 'reads', 'reading', 'readed'],
    correctAnswer: 'reads',
    explanation: 'He + reads - thói quen hằng ngày',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q150',
    question: 'We ___ (walk) our dog in the park every evening.',
    options: ['walk', 'walks', 'walking', 'walked'],
    correctAnswer: 'walk',
    explanation: 'We + walk - thói quen hằng ngày',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // More verbs ending in -es
  {
    id: 'q151',
    question: 'She ___ (guess) the answer correctly.',
    options: ['guess', 'guesss', 'guesses', 'guessing'],
    correctAnswer: 'guesses',
    explanation: 'She + guesses (guess kết thúc bằng ss nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q152',
    question: 'He ___ (push) the door to open it.',
    options: ['push', 'pushs', 'pushes', 'pushing'],
    correctAnswer: 'pushes',
    explanation: 'He + pushes (push kết thúc bằng sh nên thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q153',
    question: 'The baby ___ (cry) when he is hungry.',
    options: ['cry', 'crys', 'cries', 'crying'],
    correctAnswer: 'cries',
    explanation: 'The baby + cries (cry → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q154',
    question: 'My sister ___ (fly) to London once a month.',
    options: ['fly', 'flys', 'flies', 'flying'],
    correctAnswer: 'flies',
    explanation: 'My sister + flies (fly → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // More complex sentences
  {
    id: 'q155',
    question: 'I ___ (believe) that practice makes perfect.',
    options: ['believe', 'believes', 'believing', 'believed'],
    correctAnswer: 'believe',
    explanation: 'I + believe - suy nghĩ hiện tại',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q156',
    question: 'She ___ (think) that English is important.',
    options: ['think', 'thinks', 'thinking', 'thought'],
    correctAnswer: 'thinks',
    explanation: 'She + thinks (think là động từ đặc biệt)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q157',
    question: 'They ___ (understand) the problem very well.',
    options: ['understand', 'understands', 'understanding', 'understood'],
    correctAnswer: 'understand',
    explanation: 'They + understand',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q158',
    question: 'He ___ (seem) happy today.',
    options: ['seem', 'seems', 'seeming', 'seemed'],
    correctAnswer: 'seems',
    explanation: 'He + seems - động từ linking verb',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Adverbs of frequency position
  {
    id: 'q159',
    question: 'I am ___ late for appointments.',
    options: ['never', 'never am', 'am never', 'never being'],
    correctAnswer: 'never',
    explanation: 'I am never late - never sau am/is/are',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q160',
    question: 'Are you ___ tired?',
    options: ['ever', 'never', 'always', 'usually'],
    correctAnswer: 'ever',
    explanation: 'Are you ever tired? - ever trong câu hỏi',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Short answers
  {
    id: 'q161',
    question: 'Do you like pizza? Yes, I ___.',
    options: ['like', 'do', 'does', 'am'],
    correctAnswer: 'do',
    explanation: 'Yes, I do - câu trả lời ngắn gọn',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q162',
    question: 'Does she play piano? No, she ___.',
    options: ['doesn\'t', 'don\'t', 'does not play', 'doesn\'t play'],
    correctAnswer: 'doesn\'t',
    explanation: 'No, she doesn\'t - câu trả lời ngắn gọn',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Mixed exercises - harder
  {
    id: 'q163',
    question: 'Neither of my parents ___ (smoke).',
    options: ['smoke', 'smokes', 'smoking', 'smoked'],
    correctAnswer: 'smokes',
    explanation: 'Neither of + plural noun → singular verb',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q164',
    question: 'Everyone ___ (want) to be successful.',
    options: ['want', 'wants', 'wanting', 'wanted'],
    correctAnswer: 'wants',
    explanation: 'Everyone + V(s) - everyone là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q165',
    question: 'Somebody ___ (wait) for you outside.',
    options: ['wait', 'waits', 'waiting', 'waited'],
    correctAnswer: 'waits',
    explanation: 'Somebody + V(s) - somebody là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q166',
    question: 'The price ___ (depend) on quality.',
    options: ['depend', 'depends', 'depending', 'depended'],
    correctAnswer: 'depends',
    explanation: 'The price + depends',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Expressing opinions
  {
    id: 'q167',
    question: 'In my opinion, she ___ (be) the best candidate.',
    options: ['be', 'is', 'being', 'was'],
    correctAnswer: 'is',
    explanation: 'to be trong Present Simple: she is',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q168',
    question: 'I ___ (not agree) with you on this matter.',
    options: ['am not agree', 'don\'t agree', 'doesn\'t agree', 'not agreeing'],
    correctAnswer: 'don\'t agree',
    explanation: 'I don\'t agree - Present Simple negative',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q169',
    question: 'What ___ you ___ (prefer), tea or coffee?',
    options: ['do, prefer', 'does, prefer', 'are, preferring', 'did, prefer'],
    correctAnswer: 'do, prefer',
    explanation: 'What do you prefer?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q170',
    question: 'Who ___ (own) this car?',
    options: ['own', 'owns', 'owning', 'owned'],
    correctAnswer: 'owns',
    explanation: 'Who owns? - who là chủ ngữ nên dùng V(s)',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // More examples
  {
    id: 'q171',
    question: 'Each student ___ (have) a book.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 'has',
    explanation: 'Each + noun → singular verb (has)',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q172',
    question: 'All students ___ (have) books.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 'have',
    explanation: 'All students (plural) + have',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q173',
    question: 'The number of students ___ (increase) every year.',
    options: ['increase', 'increases', 'increasing', 'increased'],
    correctAnswer: 'increases',
    explanation: 'The number of + plural noun → singular verb',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q174',
    question: 'A number of students ___ (study) abroad.',
    options: ['study', 'studies', 'studying', 'studied'],
    correctAnswer: 'study',
    explanation: 'A number of + plural noun → plural verb',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q175',
    question: 'Two plus two ___ (equal) four.',
    options: ['equal', 'equals', 'equaling', 'equaled'],
    correctAnswer: 'equals',
    explanation: 'Present Simple - sự thật toán học (subject là singular)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // More verb variations
  {
    id: 'q176',
    question: 'I ___ (hope) you can come to my party.',
    options: ['hope', 'hopes', 'hoping', 'hoped'],
    correctAnswer: 'hope',
    explanation: 'I + hope',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q177',
    question: 'She ___ (worry) about her exams.',
    options: ['worry', 'worries', 'worrying', 'worried'],
    correctAnswer: 'worries',
    explanation: 'She + worries (worry → đổi y thành i rồi thêm -es)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q178',
    question: 'The train ___ (leave) at 9 AM every morning.',
    options: ['leave', 'leaves', 'leaving', 'left'],
    correctAnswer: 'leaves',
    explanation: 'The train + leaves - lịch trình',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q179',
    question: 'Football matches ___ (last) 90 minutes.',
    options: ['last', 'lasts', 'lasting', 'lasted'],
    correctAnswer: 'last',
    explanation: 'Football matches (plural) + last',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q180',
    question: 'That shirt ___ (cost) too much money.',
    options: ['cost', 'costs', 'costing', 'costed'],
    correctAnswer: 'costs',
    explanation: 'That shirt + costs',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Third person singular - irregular
  {
    id: 'q181',
    question: 'She ___ (say) "hello" to everyone.',
    options: ['say', 'says', 'saying', 'said'],
    correctAnswer: 'says',
    explanation: 'She + says (said khác với says)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q182',
    question: 'He ___ (pay) the bill every month.',
    options: ['pay', 'pays', 'paying', 'paid'],
    correctAnswer: 'pays',
    explanation: 'He + pays',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q183',
    question: 'The book ___ (belong) to my friend.',
    options: ['belong', 'belongs', 'belonging', 'belonged'],
    correctAnswer: 'belongs',
    explanation: 'The book + belongs - belong kết thúc bằng ng nên thêm -s',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q184',
    question: 'She ___ (enjoy) reading novels.',
    options: ['enjoy', 'enjoys', 'enjoying', 'enjoyed'],
    correctAnswer: 'enjoys',
    explanation: 'She + enjoys',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Expressing schedules and timetables
  {
    id: 'q185',
    question: 'The store ___ (open) at 9 AM.',
    options: ['open', 'opens', 'opening', 'opened'],
    correctAnswer: 'opens',
    explanation: 'The store + opens - lịch trình',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q186',
    question: 'The museum ___ (close) at 6 PM.',
    options: ['close', 'closes', 'closing', 'closed'],
    correctAnswer: 'closes',
    explanation: 'The museum + closes (close kết thúc bằng se nên thêm -s)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q187',
    question: 'Our class ___ (start) at 8 AM.',
    options: ['start', 'starts', 'starting', 'started'],
    correctAnswer: 'starts',
    explanation: 'Our class + starts',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q188',
    question: 'The bus ___ (arrive) at 7:30 PM.',
    options: ['arrive', 'arrives', 'arriving', 'arrived'],
    correctAnswer: 'arrives',
    explanation: 'The bus + arrives (arrive kết thúc bằng e nên chỉ thêm -s)',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Everyone, no one, etc.
  {
    id: 'q189',
    question: 'No one ___ (know) the answer.',
    options: ['know', 'knows', 'knowing', 'knew'],
    correctAnswer: 'knows',
    explanation: 'No one + knows - no one là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q190',
    question: 'Anyone ___ (can) do this exercise.',
    options: ['can', 'cans', 'canning', 'could'],
    correctAnswer: 'can',
    explanation: 'Anyone + can - can là modal verb không thay đổi',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q191',
    question: 'Something ___ (smell) good in the kitchen.',
    options: ['smell', 'smells', 'smelling', 'smelled'],
    correctAnswer: 'smells',
    explanation: 'Something + smells - something là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q192',
    question: 'Nothing ___ (ever happen) here.',
    options: ['happen', 'happens', 'happening', 'happened'],
    correctAnswer: 'happens',
    explanation: 'Nothing + happens - nothing là số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  // Complex sentences
  {
    id: 'q193',
    question: 'What ___ you ___ (do) for a living?',
    options: ['do, do', 'does, do', 'are, doing', 'did, do'],
    correctAnswer: 'do, do',
    explanation: 'What do you do for a living? - nghề nghiệp',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q194',
    question: 'How ___ she ___ (spend) her free time?',
    options: ['do, spend', 'does, spends', 'does, spend', 'is, spending'],
    correctAnswer: 'does, spend',
    explanation: 'How does she spend?',
    tenseType: 'present-simple',
    difficulty: 'medium'
  },
  {
    id: 'q195',
    question: 'I ___ (not remember) his name.',
    options: ['am not remember', 'don\'t remember', 'doesn\'t remember', 'not remembering'],
    correctAnswer: 'don\'t remember',
    explanation: 'I don\'t remember - Present Simple negative',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  {
    id: 'q196',
    question: 'He ___ (not understand) Japanese.',
    options: ['am not understand', 'don\'t understand', 'doesn\'t understand', 'not understanding'],
    correctAnswer: 'doesn\'t understand',
    explanation: 'He doesn\'t understand - Present Simple negative',
    tenseType: 'present-simple',
    difficulty: 'easy'
  },
  // Final examples
  {
    id: 'q197',
    question: 'The news ___ (be) very interesting today.',
    options: ['is', 'are', 'be', 'being'],
    correctAnswer: 'is',
    explanation: 'The news is - news là danh từ số ít (tuy có s)',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q198',
    question: 'Politics ___ (be) a complicated subject.',
    options: ['is', 'are', 'be', 'being'],
    correctAnswer: 'is',
    explanation: 'Politics is - politics là danh từ số ít (tuy có s)',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q199',
    question: 'The people in my neighborhood ___ (be) very friendly.',
    options: ['is', 'are', 'be', 'being'],
    correctAnswer: 'are',
    explanation: 'The people are - people luôn là plural',
    tenseType: 'present-simple',
    difficulty: 'hard'
  },
  {
    id: 'q200',
    question: 'My family ___ (live) in a big house.',
    options: ['live', 'lives', 'living', 'lived'],
    correctAnswer: 'lives',
    explanation: 'My family lives - family là danh từ tập thể có thể dùng số ít',
    tenseType: 'present-simple',
    difficulty: 'medium'
  }
];

// Cache cho các câu hỏi đã load từ JSON
const jsonQuestionsCache: Map<TenseType, TensesQuestion[]> = new Map();

export const TensesData = {
  // Lấy công thức của một thì
  getTense(id: TenseType): TenseFormula | undefined {
    return tensesData.find(t => t.id === id);
  },

  // Lấy tất cả các thì
  getAllTenses(): TenseFormula[] {
    return tensesData;
  },

  // Lấy các thì theo nhóm
  getTensesByGroup(): {
    present: TenseFormula[];
    past: TenseFormula[];
    future: TenseFormula[];
  } {
    return {
      present: tensesData.filter(t => t.id.includes('present')),
      past: tensesData.filter(t => t.id.includes('past')),
      future: tensesData.filter(t => t.id.includes('future'))
    };
  },

  // Load câu hỏi từ file JSON
  async loadQuestionsFromJSON(tenseType: TenseType): Promise<TensesQuestion[]> {
    // Kiểm tra cache trước
    if (jsonQuestionsCache.has(tenseType)) {
      return jsonQuestionsCache.get(tenseType)!;
    }

    try {
      // Map tenseType sang tên file
      const tenseFileNameMap: Record<TenseType, string> = {
        'present-simple': 'present-simple',
        'present-continuous': 'present-continuous',
        'present-perfect': 'present-perfect',
        'present-perfect-continuous': 'present-perfect-continuous',
        'past-simple': 'past-simple',
        'past-continuous': 'past-continuous',
        'past-perfect': 'past-perfect',
        'past-perfect-continuous': 'past-perfect-continuous',
        'future-simple': 'future-simple',
        'future-continuous': 'future-continuous',
        'future-perfect': 'future-perfect',
        'future-perfect-continuous': 'future-perfect-continuous'
      };

      const fileName = tenseFileNameMap[tenseType];
      if (!fileName) {
        return [];
      }

      const response = await fetch(`/data/tenses/${fileName}.json`);
      if (!response.ok) {
        return [];
      }

      const data: TensesQuestion[] = await response.json();
      
      // Lưu vào cache
      jsonQuestionsCache.set(tenseType, data);
      
      return data;
    } catch (error) {
      console.error(`Không thể tải câu hỏi cho ${tenseType}:`, error);
      return [];
    }
  },

  // Lấy câu hỏi ngẫu nhiên
  getRandomQuestions(count: number = 10, difficulty?: 'easy' | 'medium' | 'hard'): TensesQuestion[] {
    let questions = [...tensesQuizData];
    
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  },

  // Lấy câu hỏi theo thì (kết hợp từ mảng cứng và JSON)
  async getQuestionsByTense(tenseType: TenseType): Promise<TensesQuestion[]> {
    // Lấy từ mảng cứng
    const hardcodedQuestions = tensesQuizData.filter(q => q.tenseType === tenseType);
    
    // Load từ JSON và kết hợp
    const jsonQuestions = await this.loadQuestionsFromJSON(tenseType);
    
    // Kết hợp cả hai nguồn
    return [...hardcodedQuestions, ...jsonQuestions];
  },

  // Lấy câu hỏi theo thì (sync version - chỉ lấy từ mảng cứng)
  getQuestionsByTenseSync(tenseType: TenseType): TensesQuestion[] {
    return tensesQuizData.filter(q => q.tenseType === tenseType);
  },

  // Xáo trộn mảng
  shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};

