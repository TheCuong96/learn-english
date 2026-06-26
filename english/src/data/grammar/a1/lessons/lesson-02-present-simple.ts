import type { GrammarLesson } from '@/types/grammar';

import { A1_GRAMMAR_LESSONS } from '../curriculum';

const metadata = A1_GRAMMAR_LESSONS.find(
  (lesson) => lesson.slug === 'present-simple-do-dont-questions',
);

if (!metadata) {
  throw new Error('Missing metadata for lesson: present-simple-do-dont-questions');
}

export const presentSimpleLesson: GrammarLesson = {
  ...metadata,
  objectives: [
    'Tạo câu hiện tại đơn khẳng định, phủ định và nghi vấn.',
    'Thêm đúng -s hoặc -es với chủ ngữ he, she và it.',
    'Dùng do, does, don’t và doesn’t đúng vị trí.',
    'Dùng hiện tại đơn cho thói quen, lịch trình, sự thật và tình huống ổn định.',
  ],
  formulas: [
    {
      title: 'Câu khẳng định',
      pattern: 'Subject + base verb(s/es) + object/complement',
      explanation:
        'Dùng động từ nguyên mẫu với I/you/we/they. Với he/she/it, thường thêm -s hoặc -es vào động từ.',
      examples: [
        {
          english: 'I work in an office.',
          vietnamese: 'Tôi làm việc trong một văn phòng.',
          highlight: 'work',
        },
        {
          english: 'He works in an office.',
          vietnamese: 'Anh ấy làm việc trong một văn phòng.',
          highlight: 'works',
        },
        {
          english: 'Mai studies English every day.',
          vietnamese: 'Mai học tiếng Anh mỗi ngày.',
          highlight: 'studies',
        },
      ],
    },
    {
      title: 'Câu phủ định',
      pattern: 'Subject + do not/does not + base verb',
      explanation:
        'Dùng don’t với I/you/we/they và doesn’t với he/she/it. Sau don’t hoặc doesn’t, động từ trở về dạng nguyên mẫu.',
      examples: [
        {
          english: 'We don’t eat meat.',
          vietnamese: 'Chúng tôi không ăn thịt.',
          highlight: 'don’t eat',
        },
        {
          english: 'She doesn’t like coffee.',
          vietnamese: 'Cô ấy không thích cà phê.',
          highlight: 'doesn’t like',
        },
      ],
    },
    {
      title: 'Câu hỏi và câu trả lời ngắn',
      pattern: 'Do/Does + subject + base verb?',
      explanation:
        'Dùng Do với I/you/we/they và Does với he/she/it. Động từ chính luôn ở dạng nguyên mẫu sau Do/Does.',
      examples: [
        {
          english: 'Do you live here? — Yes, I do.',
          vietnamese: 'Bạn sống ở đây à? — Đúng.',
          highlight: 'Do you live',
        },
        {
          english: 'Does he drive to work? — No, he doesn’t.',
          vietnamese: 'Anh ấy lái xe đi làm à? — Không.',
          highlight: 'Does he drive',
        },
      ],
    },
  ],
  usages: [
    {
      title: 'Thói quen và hoạt động lặp lại',
      explanation:
        'Dùng hiện tại đơn cho việc xảy ra thường xuyên. Các từ thường gặp gồm always, usually, often, sometimes, every day và on Mondays.',
      examples: [
        {
          english: 'I usually get up at six.',
          vietnamese: 'Tôi thường thức dậy lúc sáu giờ.',
          highlight: 'usually get up',
        },
        {
          english: 'She calls her mother every Sunday.',
          vietnamese: 'Cô ấy gọi cho mẹ mỗi Chủ nhật.',
          highlight: 'calls',
        },
      ],
    },
    {
      title: 'Sự thật và điều luôn đúng',
      explanation:
        'Dùng hiện tại đơn cho sự thật chung, quy luật tự nhiên hoặc thông tin được xem là đúng.',
      examples: [
        {
          english: 'Water boils at 100°C.',
          vietnamese: 'Nước sôi ở 100°C.',
          highlight: 'boils',
        },
        {
          english: 'The Earth goes around the Sun.',
          vietnamese: 'Trái Đất quay quanh Mặt Trời.',
          highlight: 'goes',
        },
      ],
    },
    {
      title: 'Tình huống ổn định hoặc lâu dài',
      explanation:
        'Dùng hiện tại đơn cho nơi ở, công việc, sở thích hoặc trạng thái tương đối ổn định.',
      examples: [
        {
          english: 'They live in Ho Chi Minh City.',
          vietnamese: 'Họ sống ở Thành phố Hồ Chí Minh.',
          highlight: 'live',
        },
        {
          english: 'My brother works at a bank.',
          vietnamese: 'Anh trai tôi làm việc tại ngân hàng.',
          highlight: 'works',
        },
      ],
    },
  ],
  examples: [
    {
      english: 'I play badminton after work.',
      vietnamese: 'Tôi chơi cầu lông sau giờ làm.',
      highlight: 'play',
    },
    {
      english: 'He watches TV in the evening.',
      vietnamese: 'Anh ấy xem TV vào buổi tối.',
      highlight: 'watches',
    },
    {
      english: 'She studies at university.',
      vietnamese: 'Cô ấy học đại học.',
      highlight: 'studies',
    },
    {
      english: 'Nam has a new bicycle.',
      vietnamese: 'Nam có một chiếc xe đạp mới.',
      highlight: 'has',
    },
    {
      english: 'We don’t work on Sundays.',
      vietnamese: 'Chúng tôi không làm việc vào Chủ nhật.',
      highlight: 'don’t work',
    },
    {
      english: 'Does your sister speak English?',
      vietnamese: 'Chị/em gái bạn có nói tiếng Anh không?',
      highlight: 'Does your sister speak',
    },
  ],
  commonMistakes: [
    {
      wrong: 'He work in a shop.',
      correct: 'He works in a shop.',
      explanation:
        'Trong câu khẳng định hiện tại đơn, thêm -s hoặc -es vào động từ khi chủ ngữ là he, she hoặc it.',
    },
    {
      wrong: 'She don’t like coffee.',
      correct: 'She doesn’t like coffee.',
      explanation: 'Dùng doesn’t với chủ ngữ she.',
    },
    {
      wrong: 'Do he work here?',
      correct: 'Does he work here?',
      explanation:
        'Dùng Does với he. Sau Does, động từ chính giữ dạng nguyên mẫu work.',
    },
  ],
  quickNotes: [
    'work → works: phần lớn động từ chỉ cần thêm -s.',
    'watch → watches: thêm -es sau -ch, -sh, -ss, -x, -o.',
    'study → studies: đổi phụ âm + y thành -ies.',
    'have → has là dạng đặc biệt với he/she/it.',
    'Sau does hoặc doesn’t, dùng động từ nguyên mẫu: Does she work? Không dùng works.',
  ],
  exercises: [
    {
      id: 'a1-02-ex-01',
      type: 'multiple-choice',
      question: 'My father ___ in a hospital.',
      options: ['work', 'works', 'working'],
      correctAnswer: 'works',
      explanation: 'My father tương đương he nên động từ thêm -s.',
      difficulty: 'easy',
      skillFocus: ['affirmative', 'third-person singular'],
    },
    {
      id: 'a1-02-ex-02',
      type: 'fill-blank',
      question: 'Lan ___ English every evening. (study)',
      correctAnswer: 'studies',
      explanation: 'Study đổi thành studies với chủ ngữ Lan/she.',
      difficulty: 'easy',
      skillFocus: ['spelling', 'third-person singular'],
    },
    {
      id: 'a1-02-ex-03',
      type: 'multiple-choice',
      question: 'They ___ breakfast at home.',
      options: ['doesn’t have', 'don’t have', 'don’t has'],
      correctAnswer: 'don’t have',
      explanation: 'They đi với don’t; sau don’t dùng động từ nguyên mẫu have.',
      difficulty: 'easy',
      skillFocus: ['negative'],
    },
    {
      id: 'a1-02-ex-04',
      type: 'reorder',
      question: 'Sắp xếp thành câu hỏi: your brother / Does / drive / ?',
      correctAnswer: 'Does your brother drive?',
      explanation: 'Cấu trúc là Does + chủ ngữ + động từ nguyên mẫu.',
      difficulty: 'medium',
      skillFocus: ['questions', 'word order'],
    },
    {
      id: 'a1-02-ex-05',
      type: 'error-correction',
      question: 'Sửa lỗi: She doesn’t likes tea.',
      correctAnswer: 'She doesn’t like tea.',
      explanation: 'Sau doesn’t, động từ phải trở về dạng nguyên mẫu like.',
      difficulty: 'medium',
      skillFocus: ['error correction', 'negative'],
    },
    {
      id: 'a1-02-ex-06',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Bạn có đi làm bằng xe buýt không?',
      correctAnswer: 'Do you go to work by bus?',
      explanation: 'Với you, dùng Do + you + động từ nguyên mẫu go.',
      difficulty: 'medium',
      skillFocus: ['translation', 'questions'],
    },
  ],
  miniTest: [
    {
      id: 'a1-02-test-01',
      type: 'multiple-choice',
      question: 'Tom ___ football on Saturdays.',
      options: ['play', 'plays', 'plaies'],
      correctAnswer: 'plays',
      explanation: 'Tom là ngôi thứ ba số ít nên play thêm -s.',
      difficulty: 'easy',
      skillFocus: ['affirmative', 'spelling'],
    },
    {
      id: 'a1-02-test-02',
      type: 'fill-blank',
      question: '___ your parents live near here?',
      correctAnswer: 'Do',
      explanation: 'Your parents là số nhiều nên câu hỏi dùng Do.',
      difficulty: 'easy',
      skillFocus: ['questions'],
    },
    {
      id: 'a1-02-test-03',
      type: 'error-correction',
      question: 'Sửa lỗi: Does Mai studies English?',
      correctAnswer: 'Does Mai study English?',
      explanation: 'Sau Does, dùng dạng nguyên mẫu study.',
      difficulty: 'medium',
      skillFocus: ['questions', 'error correction'],
    },
    {
      id: 'a1-02-test-04',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Anh ấy không có ô tô.',
      correctAnswer: 'He doesn’t have a car.',
      explanation: 'He đi với doesn’t; have giữ dạng nguyên mẫu.',
      difficulty: 'medium',
      skillFocus: ['translation', 'negative'],
    },
  ],
  summary: {
    keyPoints: [
      'I/you/we/they dùng động từ nguyên mẫu; he/she/it dùng động từ thêm -s/-es.',
      'Dùng don’t hoặc doesn’t để tạo câu phủ định.',
      'Dùng Do hoặc Does ở đầu câu hỏi.',
      'Sau do, does, don’t và doesn’t, động từ luôn ở dạng nguyên mẫu.',
    ],
    rememberSentences: [
      {
        english: 'I work from Monday to Friday.',
        vietnamese: 'Tôi làm việc từ thứ Hai đến thứ Sáu.',
        highlight: 'work',
      },
      {
        english: 'She doesn’t drink coffee.',
        vietnamese: 'Cô ấy không uống cà phê.',
        highlight: 'doesn’t drink',
      },
      {
        english: 'Does he live here? — Yes, he does.',
        vietnamese: 'Anh ấy sống ở đây à? — Đúng.',
        highlight: 'Does he live',
      },
    ],
  },
};

