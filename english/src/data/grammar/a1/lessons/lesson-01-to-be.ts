import type { GrammarLesson } from '@/types/grammar';

import { A1_GRAMMAR_LESSONS } from '../curriculum';

const metadata = A1_GRAMMAR_LESSONS.find(
  (lesson) => lesson.slug === 'present-simple-to-be-am-is-are',
);

if (!metadata) {
  throw new Error('Missing metadata for lesson: present-simple-to-be-am-is-are');
}

export const presentSimpleToBeLesson: GrammarLesson = {
  ...metadata,
  objectives: [
    'Chọn đúng am, is hoặc are theo chủ ngữ.',
    'Tạo câu khẳng định, phủ định và câu hỏi với động từ be.',
    'Dùng dạng viết tắt và câu trả lời ngắn tự nhiên.',
    'Tránh bỏ chủ ngữ hoặc dùng sai dạng be theo thói quen tiếng Việt.',
  ],
  formulas: [],
  usages: [
    {
      title: 'Nói danh tính hoặc nghề nghiệp',
      explanation:
        'Dùng be trước danh từ để nói một người hoặc vật là ai hoặc là gì.',
      examples: [
        {
          english: 'My name is Lan.',
          vietnamese: 'Tên tôi là Lan.',
          highlight: 'is',
        },
        {
          english: 'We are students.',
          vietnamese: 'Chúng tôi là học sinh.',
          highlight: 'are',
        },
      ],
    },
    {
      title: 'Miêu tả trạng thái hoặc đặc điểm',
      explanation:
        'Dùng be trước tính từ để miêu tả cảm xúc, tình trạng hoặc đặc điểm.',
      examples: [
        {
          english: 'The room is cold.',
          vietnamese: 'Căn phòng lạnh.',
          highlight: 'is cold',
        },
        {
          english: 'You are very kind.',
          vietnamese: 'Bạn rất tốt bụng.',
          highlight: 'are very kind',
        },
      ],
    },
    {
      title: 'Nói vị trí',
      explanation:
        'Dùng be trước cụm từ chỉ nơi chốn để nói người hoặc vật đang ở đâu.',
      examples: [
        {
          english: 'The keys are on the table.',
          vietnamese: 'Chìa khóa ở trên bàn.',
          highlight: 'are on the table',
        },
        {
          english: 'He is in Hanoi.',
          vietnamese: 'Anh ấy ở Hà Nội.',
          highlight: 'is in Hanoi',
        },
      ],
    },
  ],
  examples: [
    {
      english: 'You’re my friend.',
      vietnamese: 'Bạn là bạn của tôi.',
      highlight: 'You’re',
    },
    {
      english: 'He’s twenty years old.',
      vietnamese: 'Anh ấy hai mươi tuổi.',
      highlight: 'He’s',
    },
    {
      english: 'It’s sunny today.',
      vietnamese: 'Hôm nay trời nắng.',
      highlight: 'It’s',
    },
    {
      english: 'The room is cold.',
      vietnamese: 'Căn phòng lạnh.',
      highlight: 'is cold',
    },
    {
      english: 'The keys are on the table.',
      vietnamese: 'Chìa khóa ở trên bàn.',
      highlight: 'are on the table',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Is cold.',
      correct: 'It is cold.',
      explanation:
        'Câu tiếng Anh thông thường cần có chủ ngữ. Khi nói về thời tiết, dùng chủ ngữ giả it.',
    },
    {
      wrong: 'I are a student.',
      correct: 'I am a student.',
      explanation: 'Chủ ngữ I luôn đi với am ở hiện tại đơn.',
    },
    {
      wrong: 'Yes, I’m.',
      correct: 'Yes, I am.',
      explanation:
        'Không dùng dạng viết tắt ở cuối câu trả lời khẳng định ngắn.',
    },
  ],
  quickNotes: [],
  exercises: [
    {
      id: 'a1-01-ex-01',
      type: 'multiple-choice',
      question: 'I ___ from Da Nang.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'am',
      explanation: 'Chủ ngữ I đi với am.',
      vietnameseHint: 'Tôi đến từ Đà Nẵng.',
      difficulty: 'easy',
      skillFocus: ['affirmative', 'subject-verb agreement'],
    },
    {
      id: 'a1-01-ex-02',
      type: 'fill-blank',
      question: 'My parents ___ at home.',
      correctAnswer: 'are',
      explanation: 'My parents là chủ ngữ số nhiều nên dùng are.',
      vietnameseHint: 'Bố mẹ tôi đang ở nhà.',
      difficulty: 'easy',
      skillFocus: ['affirmative'],
    },
    {
      id: 'a1-01-ex-03',
      type: 'multiple-choice',
      question: 'She ___ tired today.',
      options: ['am not', 'isn’t', 'aren’t'],
      correctAnswer: 'isn’t',
      explanation: 'She đi với is; dạng phủ định viết tắt là isn’t.',
      difficulty: 'easy',
      skillFocus: ['negative'],
    },
    {
      id: 'a1-01-ex-04',
      type: 'reorder',
      question: 'Sắp xếp thành câu hỏi: ready / you / Are / ?',
      correctAnswer: 'Are you ready?',
      explanation: 'Trong câu hỏi, đưa are lên trước chủ ngữ you.',
      difficulty: 'medium',
      skillFocus: ['questions', 'word order'],
    },
    {
      id: 'a1-01-ex-05',
      type: 'error-correction',
      question: 'Sửa lỗi: I is not busy.',
      correctAnswer: 'I am not busy.',
      explanation: 'I phải đi với am, không đi với is.',
      difficulty: 'medium',
      skillFocus: ['error correction', 'negative'],
    },
    {
      id: 'a1-01-ex-06',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Họ là giáo viên.',
      correctAnswer: ['They are teachers.', 'They’re teachers.'],
      explanation: 'They đi với are; teacher chuyển sang số nhiều teachers.',
      difficulty: 'medium',
      skillFocus: ['translation', 'affirmative'],
    },
  ],
  miniTest: [
    {
      id: 'a1-01-test-01',
      type: 'multiple-choice',
      question: '___ your sister at school?',
      options: ['Am', 'Is', 'Are'],
      correctAnswer: 'Is',
      explanation: 'Your sister là số ít nên câu hỏi bắt đầu bằng Is.',
      difficulty: 'easy',
      skillFocus: ['questions'],
    },
    {
      id: 'a1-01-test-02',
      type: 'fill-blank',
      question: 'We ___ not late.',
      correctAnswer: 'are',
      explanation: 'We đi với are: We are not late.',
      difficulty: 'easy',
      skillFocus: ['negative'],
    },
    {
      id: 'a1-01-test-03',
      type: 'error-correction',
      question: 'Sửa câu trả lời: Are you hungry? — Yes, I’m.',
      correctAnswer: 'Are you hungry? — Yes, I am.',
      explanation: 'Câu trả lời khẳng định ngắn dùng dạng đầy đủ I am.',
      difficulty: 'medium',
      skillFocus: ['short answers'],
    },
    {
      id: 'a1-01-test-04',
      type: 'translation',
      question: 'Dịch sang tiếng Anh: Hôm nay trời không lạnh.',
      correctAnswer: ['It is not cold today.', 'It isn’t cold today.'],
      explanation: 'Dùng it làm chủ ngữ khi nói về thời tiết.',
      difficulty: 'medium',
      skillFocus: ['translation', 'weather', 'negative'],
    },
  ],
  summary: {
    keyPoints: [
      'I → am · he/she/it → is · you/we/they → are.',
      'Khẳng định và phủ định đều có dạng viết tắt (I’m, isn’t, aren’t…).',
      'Câu hỏi: đảo be lên trước chủ ngữ (Am I? Is she? Are they?).',
      'Trả lời ngắn khẳng định: luôn dạng đầy đủ — Yes, I am (không *Yes, I’m).',
    ],
    rememberSentences: [
      {
        english: 'I’m a student.',
        vietnamese: 'Tôi là học sinh.',
        highlight: 'I’m',
      },
      {
        english: 'She isn’t at home.',
        vietnamese: 'Cô ấy không ở nhà.',
        highlight: 'isn’t',
      },
      {
        english: 'Are they ready? — Yes, they are.',
        vietnamese: 'Họ sẵn sàng chưa? — Rồi.',
        highlight: 'Are they',
      },
    ],
  },
};

