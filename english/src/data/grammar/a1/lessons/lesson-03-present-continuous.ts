import type { GrammarLesson } from '@/types/grammar';

import { A1_GRAMMAR_LESSONS } from '../curriculum';

const metadata = A1_GRAMMAR_LESSONS.find(
  (lesson) => lesson.slug === 'present-continuous-doing',
);

if (!metadata) {
  throw new Error('Missing metadata for lesson: present-continuous-doing');
}

export const presentContinuousLesson: GrammarLesson = {
  ...metadata,
  objectives: [
    'Tạo dạng verb-ing và kết hợp với am, is hoặc are.',
    'Tạo câu khẳng định, phủ định, câu hỏi và câu trả lời ngắn.',
    'Dùng hiện tại tiếp diễn cho hành động đang xảy ra và tình huống tạm thời.',
    'Nhận biết các dấu hiệu như now, right now và at the moment.',
  ],
  formulas: [
    {
      title: 'Câu khẳng định',
      pattern: 'Subject + am/is/are + verb-ing',
      explanation:
        'Chọn am, is hoặc are theo chủ ngữ, sau đó thêm -ing vào động từ chính.',
      examples: [
        {
          english: 'I am reading now.',
          vietnamese: 'Bây giờ tôi đang đọc sách.',
          highlight: 'am reading',
        },
        {
          english: 'She is cooking dinner.',
          vietnamese: 'Cô ấy đang nấu bữa tối.',
          highlight: 'is cooking',
        },
        {
          english: 'They are playing outside.',
          vietnamese: 'Họ đang chơi ở bên ngoài.',
          highlight: 'are playing',
        },
      ],
    },
    {
      title: 'Câu phủ định',
      pattern: 'Subject + am not/is not/are not + verb-ing',
      explanation:
        'Đặt not sau am/is/are. Có thể dùng isn’t, aren’t hoặc I’m not.',
      examples: [
        {
          english: 'I’m not sleeping.',
          vietnamese: 'Tôi không ngủ.',
          highlight: 'I’m not sleeping',
        },
        {
          english: 'He isn’t working today.',
          vietnamese: 'Hôm nay anh ấy không làm việc.',
          highlight: 'isn’t working',
        },
        {
          english: 'We aren’t waiting for the bus.',
          vietnamese: 'Chúng tôi không đang chờ xe buýt.',
          highlight: 'aren’t waiting',
        },
      ],
    },
    {
      title: 'Câu hỏi và câu trả lời ngắn',
      pattern: 'Am/Is/Are + subject + verb-ing?',
      explanation:
        'Đưa am/is/are lên trước chủ ngữ. Câu trả lời ngắn dùng chính dạng be trong câu hỏi.',
      examples: [
        {
          english: 'Are you studying? — Yes, I am.',
          vietnamese: 'Bạn đang học à? — Đúng.',
          highlight: 'Are you studying',
        },
        {
          english: 'Is she driving? — No, she isn’t.',
          vietnamese: 'Cô ấy đang lái xe à? — Không.',
          highlight: 'Is she driving',
        },
      ],
    },
  ],
  usages: [
    {
      title: 'Hành động đang xảy ra ngay lúc nói',
      explanation:
        'Dùng hiện tại tiếp diễn cho hành động đang diễn ra bây giờ hoặc ngay quanh thời điểm nói.',
      examples: [
        {
          english: 'Please be quiet. The baby is sleeping.',
          vietnamese: 'Xin hãy yên lặng. Em bé đang ngủ.',
          highlight: 'is sleeping',
        },
        {
          english: 'I’m talking to you right now.',
          vietnamese: 'Ngay lúc này tôi đang nói chuyện với bạn.',
          highlight: 'am talking',
        },
      ],
    },
    {
      title: 'Tình huống tạm thời',
      explanation:
        'Dùng hiện tại tiếp diễn cho tình huống chỉ kéo dài trong một khoảng thời gian, không phải trạng thái lâu dài.',
      examples: [
        {
          english: 'Lan is staying with her aunt this week.',
          vietnamese: 'Tuần này Lan đang ở với dì.',
          highlight: 'is staying',
        },
        {
          english: 'I’m working from home this month.',
          vietnamese: 'Tháng này tôi đang làm việc tại nhà.',
          highlight: 'am working',
        },
      ],
    },
    {
      title: 'Hoạt động diễn ra quanh thời điểm hiện tại',
      explanation:
        'Hành động không nhất thiết xảy ra đúng giây phút nói nhưng đang trong quá trình thực hiện.',
      examples: [
        {
          english: 'I’m reading a good book at the moment.',
          vietnamese: 'Dạo này tôi đang đọc một cuốn sách hay.',
          highlight: 'am reading',
        },
        {
          english: 'They are learning English this year.',
          vietnamese: 'Năm nay họ đang học tiếng Anh.',
          highlight: 'are learning',
        },
      ],
    },
  ],
  examples: [
    {
      english: 'I’m doing my homework now.',
      vietnamese: 'Bây giờ tôi đang làm bài tập về nhà.',
      highlight: 'I’m doing',
    },
    {
      english: 'You’re listening to music.',
      vietnamese: 'Bạn đang nghe nhạc.',
      highlight: 'You’re listening',
    },
    {
      english: 'He’s talking on the phone.',
      vietnamese: 'Anh ấy đang nói chuyện điện thoại.',
      highlight: 'He’s talking',
    },
    {
      english: 'She isn’t wearing a jacket today.',
      vietnamese: 'Hôm nay cô ấy không mặc áo khoác.',
      highlight: 'isn’t wearing',
    },
    {
      english: 'We’re studying for an exam this week.',
      vietnamese: 'Tuần này chúng tôi đang ôn thi.',
      highlight: 'We’re studying',
    },
    {
      english: 'Are they waiting outside?',
      vietnamese: 'Họ đang chờ bên ngoài à?',
      highlight: 'Are they waiting',
    },
  ],
  commonMistakes: [
    {
      wrong: 'I working.',
      correct: 'I am working.',
      explanation:
        'Hiện tại tiếp diễn luôn cần am, is hoặc are trước động từ thêm -ing.',
    },
    {
      wrong: 'She is work.',
      correct: 'She is working.',
      explanation: 'Sau am/is/are, động từ chính phải ở dạng -ing.',
    },
    {
      wrong: 'Are he studying?',
      correct: 'Is he studying?',
      explanation: 'Chủ ngữ he đi với is, không đi với are.',
    },
  ],
  quickNotes: [
    'Dấu hiệu thường gặp: now, right now, at the moment, today, this week.',
    'Phần lớn động từ chỉ cần thêm -ing: work → working.',
    'Động từ tận cùng bằng -e thường bỏ e: make → making.',
    'Một số động từ ngắn gấp đôi phụ âm cuối: sit → sitting, run → running.',
    'Không bỏ am/is/are: “I working” là sai.',
  ],
  exercises: [
    {
      id: 'a1-03-ex-01',
      type: 'multiple-choice',
      question: 'I ___ dinner right now.',
      options: ['cook', 'am cooking', 'cooking'],
      correctAnswer: 'am cooking',
      explanation: 'Right now là dấu hiệu hiện tại tiếp diễn; I đi với am.',
      difficulty: 'easy',
      skillFocus: ['affirmative', 'actions now'],
    },
    {
      id: 'a1-03-ex-02',
      type: 'fill-blank',
      question: 'She is ___ a book at the moment. (read)',
      correctAnswer: 'reading',
      explanation: 'Sau is, động từ read thêm -ing thành reading.',
      difficulty: 'easy',
      skillFocus: ['verb-ing', 'affirmative'],
    },
    {
      id: 'a1-03-ex-03',
      type: 'multiple-choice',
      question: 'They ___ today.',
      options: ['isn’t working', 'aren’t work', 'aren’t working'],
      correctAnswer: 'aren’t working',
      explanation: 'They đi với are; phủ định là aren’t + verb-ing.',
      difficulty: 'easy',
      skillFocus: ['negative'],
    },
    {
      id: 'a1-03-ex-04',
      type: 'reorder',
      question: 'Sắp xếp thành câu hỏi: watching / Are / TV / you / ?',
      correctAnswer: 'Are you watching TV?',
      explanation: 'Cấu trúc là Are + subject + verb-ing.',
      difficulty: 'medium',
      skillFocus: ['questions', 'word order'],
    },
    {
      id: 'a1-03-ex-05',
      type: 'error-correction',
      question: 'Sửa lỗi: He is run in the park.',
      correctAnswer: 'He is running in the park.',
      explanation: 'Sau is cần dạng -ing; run gấp đôi n thành running.',
      difficulty: 'medium',
      skillFocus: ['error correction', 'spelling'],
    },
    {
      id: 'a1-03-ex-06',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Chúng tôi đang học tiếng Anh tuần này.',
      correctAnswer: [
        'We are studying English this week.',
        'We’re studying English this week.',
      ],
      explanation: 'We đi với are và study đổi thành studying.',
      difficulty: 'medium',
      skillFocus: ['translation', 'temporary situations'],
    },
  ],
  miniTest: [
    {
      id: 'a1-03-test-01',
      type: 'multiple-choice',
      question: 'Listen! Someone ___ at the door.',
      options: ['knocks', 'is knocking', 'knocking'],
      correctAnswer: 'is knocking',
      explanation: 'Listen! cho biết hành động đang xảy ra ngay lúc nói.',
      difficulty: 'easy',
      skillFocus: ['actions now'],
    },
    {
      id: 'a1-03-test-02',
      type: 'fill-blank',
      question: '___ your brother sleeping now?',
      correctAnswer: 'Is',
      explanation: 'Your brother tương đương he nên câu hỏi bắt đầu bằng Is.',
      difficulty: 'easy',
      skillFocus: ['questions'],
    },
    {
      id: 'a1-03-test-03',
      type: 'error-correction',
      question: 'Sửa lỗi: We are study for the test.',
      correctAnswer: 'We are studying for the test.',
      explanation: 'Sau are, study phải chuyển thành studying.',
      difficulty: 'medium',
      skillFocus: ['error correction', 'verb-ing'],
    },
    {
      id: 'a1-03-test-04',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Hôm nay cô ấy không làm việc.',
      correctAnswer: [
        'She is not working today.',
        'She isn’t working today.',
      ],
      explanation: 'Dùng is not/isn’t + working cho tình huống tạm thời hôm nay.',
      difficulty: 'medium',
      skillFocus: ['translation', 'negative'],
    },
  ],
  summary: {
    keyPoints: [
      'Hiện tại tiếp diễn có cấu trúc am/is/are + verb-ing.',
      'Đặt not sau am/is/are để tạo câu phủ định.',
      'Đưa am/is/are lên trước chủ ngữ để tạo câu hỏi.',
      'Dùng thì này cho hành động đang xảy ra và tình huống tạm thời.',
    ],
    rememberSentences: [
      {
        english: 'I’m working now.',
        vietnamese: 'Bây giờ tôi đang làm việc.',
        highlight: 'I’m working',
      },
      {
        english: 'She isn’t sleeping.',
        vietnamese: 'Cô ấy không ngủ.',
        highlight: 'isn’t sleeping',
      },
      {
        english: 'Are they studying? — Yes, they are.',
        vietnamese: 'Họ đang học à? — Đúng.',
        highlight: 'Are they studying',
      },
    ],
  },
};

