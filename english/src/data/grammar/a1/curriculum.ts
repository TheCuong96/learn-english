import type {
  GrammarLessonMetadata,
  GrammarModule,
} from '@/types/grammar';

type LessonSeed = Omit<
  GrammarLessonMetadata,
  | 'id'
  | 'level'
  | 'moduleTitle'
  | 'status'
  | 'previousLessonSlug'
  | 'nextLessonSlug'
>;

interface ModuleSeed {
  id: string;
  title: string;
  description: string;
  lessons: LessonSeed[];
}

const moduleSeeds: ModuleSeed[] = [
  {
    id: 'present-tenses',
    title: 'Present tenses',
    description: 'Nền tảng về động từ be, hiện tại đơn và hiện tại tiếp diễn.',
    lessons: [
      {
        slug: 'present-simple-to-be-am-is-are',
        moduleId: 'present-tenses',
        order: 1,
        title: 'Present simple forms of “to be”: am/is/are',
        shortTitle: 'Am, is, are',
        description: 'Dùng am, is và are trong câu khẳng định, phủ định, câu hỏi và câu trả lời ngắn.',
        estimatedMinutes: 25,
      },
      {
        slug: 'present-simple-do-dont-questions',
        moduleId: 'present-tenses',
        order: 2,
        title: 'Present simple: I do, I don’t, Do I?',
        shortTitle: 'Present simple',
        description: 'Diễn tả thói quen, sự thật và tình huống ổn định bằng thì hiện tại đơn.',
        estimatedMinutes: 30,
      },
      {
        slug: 'present-continuous-doing',
        moduleId: 'present-tenses',
        order: 3,
        title: 'Present continuous: I’m doing, I’m not doing, Are you doing?',
        shortTitle: 'Present continuous',
        description: 'Nói về hành động đang diễn ra và các tình huống tạm thời.',
        estimatedMinutes: 30,
      },
      {
        slug: 'present-simple-or-present-continuous',
        moduleId: 'present-tenses',
        order: 4,
        title: 'Present simple or present continuous?',
        shortTitle: 'Present simple vs continuous',
        description: 'Phân biệt thói quen với hành động đang diễn ra hoặc tình huống tạm thời.',
        estimatedMinutes: 25,
      },
      {
        slug: 'have-got',
        moduleId: 'present-tenses',
        order: 5,
        title: 'Have got',
        description: 'Diễn tả sự sở hữu và các mối quan hệ bằng have got và has got.',
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: 'past-tenses',
    title: 'Past tenses',
    description: 'Nói về trạng thái và hành động đã xảy ra trong quá khứ.',
    lessons: [
      {
        slug: 'was-were-past-simple-be',
        moduleId: 'past-tenses',
        order: 6,
        title: 'Was/were: Past simple of “be”',
        shortTitle: 'Was and were',
        description: 'Dùng was và were để mô tả người, vật và tình huống trong quá khứ.',
        estimatedMinutes: 20,
      },
      {
        slug: 'past-simple-regular-irregular-verbs',
        moduleId: 'past-tenses',
        order: 7,
        title: 'Past simple: Regular/irregular verbs',
        shortTitle: 'Past simple verbs',
        description: 'Tạo và sử dụng dạng quá khứ của động từ có quy tắc và bất quy tắc.',
        estimatedMinutes: 30,
      },
      {
        slug: 'past-simple-negatives-questions',
        moduleId: 'past-tenses',
        order: 8,
        title: 'Past simple: Negatives and questions',
        shortTitle: 'Past simple questions',
        description: 'Tạo câu phủ định và câu hỏi quá khứ đơn với did và didn’t.',
        estimatedMinutes: 25,
      },
    ],
  },
  {
    id: 'future',
    title: 'Future',
    description: 'Các cấu trúc cơ bản để nói về tương lai, dự định và dự đoán.',
    lessons: [
      {
        slug: 'will-and-shall-future',
        moduleId: 'future',
        order: 9,
        title: 'Will and shall: Future',
        shortTitle: 'Will and shall',
        description: 'Dùng will và shall cho quyết định, lời hứa, đề nghị và dự đoán.',
        estimatedMinutes: 25,
      },
      {
        slug: 'be-going-to-plans-predictions',
        moduleId: 'future',
        order: 10,
        title: 'Be going to: Plans and predictions',
        shortTitle: 'Be going to',
        description: 'Nói về kế hoạch đã có và dự đoán dựa trên dấu hiệu hiện tại.',
        estimatedMinutes: 25,
      },
    ],
  },
  {
    id: 'modals-imperative-requests',
    title: 'Modals, imperative, requests',
    description: 'Diễn tả khả năng, xin phép, mệnh lệnh và lời đề nghị lịch sự.',
    lessons: [
      {
        slug: 'can-cant-ability-possibility-permission',
        moduleId: 'modals-imperative-requests',
        order: 11,
        title: 'Can/can’t: Ability, possibility, permission',
        shortTitle: 'Can and can’t',
        description: 'Dùng can và can’t để nói về khả năng, khả năng xảy ra và sự cho phép.',
        estimatedMinutes: 25,
      },
      {
        slug: 'imperative-sit-down-dont-talk',
        moduleId: 'modals-imperative-requests',
        order: 12,
        title: 'The imperative: Sit down! Don’t talk!',
        shortTitle: 'The imperative',
        description: 'Dùng câu mệnh lệnh để hướng dẫn, yêu cầu và cảnh báo.',
        estimatedMinutes: 20,
      },
      {
        slug: 'would-you-like-id-like',
        moduleId: 'modals-imperative-requests',
        order: 13,
        title: 'Would you like…? I’d like…',
        shortTitle: 'Would like',
        description: 'Đưa ra lời mời, đề nghị và nói mong muốn một cách lịch sự.',
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: 'ing-and-infinitive',
    title: '-ing and infinitive',
    description: 'Các mẫu động từ theo sau bởi to-infinitive hoặc động từ thêm -ing.',
    lessons: [
      {
        slug: 'verbs-to-infinitive-and-ing',
        moduleId: 'ing-and-infinitive',
        order: 14,
        title: 'Verbs + to-infinitive and verbs + -ing',
        shortTitle: 'To-infinitive and -ing',
        description: 'Nhận biết các động từ phổ biến đi với to-infinitive hoặc dạng -ing.',
        estimatedMinutes: 30,
      },
    ],
  },
  {
    id: 'articles-nouns-pronouns-determiners',
    title: 'Articles, nouns, pronouns, determiners',
    description: 'Danh từ, mạo từ, đại từ và từ hạn định thường dùng ở trình độ A1.',
    lessons: [
      {
        slug: 'a-an-singular-plural-forms',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 15,
        title: 'A/an, plurals: Singular and plural forms',
        shortTitle: 'A, an and plurals',
        description: 'Dùng a/an với danh từ số ít và tạo danh từ số nhiều cơ bản.',
        estimatedMinutes: 25,
      },
      {
        slug: 'a-an-the-no-article',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 16,
        title: 'A/an, the, no article',
        shortTitle: 'Articles',
        description: 'Chọn a, an, the hoặc không dùng mạo từ trong các tình huống cơ bản.',
        estimatedMinutes: 30,
      },
      {
        slug: 'this-that-these-those',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 17,
        title: 'This, that, these, those',
        description: 'Chỉ người và vật ở gần hoặc xa, số ít hoặc số nhiều.',
        estimatedMinutes: 20,
      },
      {
        slug: 'possessive-adjectives-subject-pronouns',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 18,
        title: 'Possessive adjectives and subject pronouns',
        shortTitle: 'My, your, his, her',
        description: 'Phân biệt đại từ chủ ngữ với tính từ sở hữu.',
        estimatedMinutes: 25,
      },
      {
        slug: 'object-pronouns-vs-subject-pronouns',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 19,
        title: 'Object pronouns vs subject pronouns',
        shortTitle: 'Subject vs object pronouns',
        description: 'Phân biệt I/me, he/him, she/her và các cặp đại từ tương ứng.',
        estimatedMinutes: 25,
      },
      {
        slug: 'a-some-any-countable-uncountable',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 20,
        title: 'A, some, any: Countable and uncountable nouns',
        shortTitle: 'A, some and any',
        description: 'Dùng a, some và any với danh từ đếm được và không đếm được.',
        estimatedMinutes: 30,
      },
      {
        slug: 'much-many-a-lot-a-little-a-few',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 21,
        title: 'Much, many, a lot of, a little, a few',
        shortTitle: 'Quantity words',
        description: 'Diễn tả số lượng với danh từ đếm được và không đếm được.',
        estimatedMinutes: 30,
      },
      {
        slug: 'whose-possessive-s',
        moduleId: 'articles-nouns-pronouns-determiners',
        order: 22,
        title: 'Whose, possessive ’s',
        shortTitle: 'Whose and possessive ’s',
        description: 'Hỏi và nói một đồ vật thuộc về ai.',
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: 'there-and-it',
    title: 'There and it',
    description: 'Dùng there, it và this để giới thiệu hoặc nhắc đến người, vật và tình huống.',
    lessons: [
      {
        slug: 'there-is-are-was-were',
        moduleId: 'there-and-it',
        order: 23,
        title: 'There is / there are / there was / there were',
        shortTitle: 'There is and there are',
        description: 'Nói về sự tồn tại của người hoặc vật ở hiện tại và quá khứ.',
        estimatedMinutes: 25,
      },
      {
        slug: 'there-or-it',
        moduleId: 'there-and-it',
        order: 24,
        title: 'There or it',
        description: 'Phân biệt there để giới thiệu sự tồn tại và it để nhắc lại một đối tượng.',
        estimatedMinutes: 20,
      },
      {
        slug: 'this-or-it',
        moduleId: 'there-and-it',
        order: 25,
        title: 'This or it',
        description: 'Phân biệt this khi giới thiệu với it khi tiếp tục nói về một đối tượng.',
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: 'adjectives-and-adverbs',
    title: 'Adjectives and adverbs',
    description: 'Miêu tả người, vật và cách một hành động diễn ra.',
    lessons: [
      {
        slug: 'basic-adjectives',
        moduleId: 'adjectives-and-adverbs',
        order: 26,
        title: 'Basic adjectives',
        description: 'Vị trí và cách dùng các tính từ cơ bản trong câu.',
        estimatedMinutes: 20,
      },
      {
        slug: 'adverbs-of-manner-or-adjectives',
        moduleId: 'adjectives-and-adverbs',
        order: 27,
        title: 'Adverbs of manner or adjectives',
        shortTitle: 'Adjectives vs adverbs',
        description: 'Phân biệt tính từ với trạng từ chỉ cách thức.',
        estimatedMinutes: 25,
      },
      {
        slug: 'comparative-adjectives',
        moduleId: 'adjectives-and-adverbs',
        order: 28,
        title: 'Comparative adjectives',
        shortTitle: 'Comparatives',
        description: 'So sánh hai người hoặc vật bằng tính từ so sánh hơn.',
        estimatedMinutes: 30,
      },
      {
        slug: 'superlative-adjectives',
        moduleId: 'adjectives-and-adverbs',
        order: 29,
        title: 'Superlative adjectives',
        shortTitle: 'Superlatives',
        description: 'Nói người hoặc vật nổi bật nhất trong một nhóm.',
        estimatedMinutes: 30,
      },
    ],
  },
  {
    id: 'conjunctions',
    title: 'Conjunctions',
    description: 'Nối từ và mệnh đề để tạo câu rõ nghĩa hơn.',
    lessons: [
      {
        slug: 'and-but-or-so-because',
        moduleId: 'conjunctions',
        order: 30,
        title: 'And, but, or, so, because',
        shortTitle: 'Basic conjunctions',
        description: 'Nối ý bổ sung, đối lập, lựa chọn, kết quả và nguyên nhân.',
        estimatedMinutes: 25,
      },
    ],
  },
  {
    id: 'prepositions',
    title: 'Prepositions',
    description: 'Giới từ cơ bản để nói về thời gian và vị trí.',
    lessons: [
      {
        slug: 'at-in-on-prepositions-time',
        moduleId: 'prepositions',
        order: 31,
        title: 'At, in, on: Prepositions of time',
        shortTitle: 'Prepositions of time',
        description: 'Dùng at, in và on với giờ, ngày, tháng, năm và các khoảng thời gian.',
        estimatedMinutes: 25,
      },
      {
        slug: 'at-in-on-prepositions-place',
        moduleId: 'prepositions',
        order: 32,
        title: 'At, in, on: Prepositions of place',
        shortTitle: 'Prepositions of place',
        description: 'Dùng at, in và on để mô tả vị trí.',
        estimatedMinutes: 25,
      },
      {
        slug: 'prepositions-position-next-under-between',
        moduleId: 'prepositions',
        order: 33,
        title: 'Next to, under, between, in front of, behind, over, etc.',
        shortTitle: 'Prepositions of position',
        description: 'Mô tả vị trí tương đối giữa người và vật.',
        estimatedMinutes: 25,
      },
    ],
  },
  {
    id: 'questions',
    title: 'Questions',
    description: 'Cấu trúc câu hỏi và các từ để hỏi thường gặp.',
    lessons: [
      {
        slug: 'questions-word-order-question-words',
        moduleId: 'questions',
        order: 34,
        title: 'Questions: Word order and question words',
        shortTitle: 'Questions and question words',
        description: 'Sắp xếp trợ động từ, chủ ngữ và từ để hỏi trong câu hỏi.',
        estimatedMinutes: 30,
      },
    ],
  },
  {
    id: 'word-order',
    title: 'Word order',
    description: 'Sắp xếp các thành phần câu tiếng Anh theo trật tự tự nhiên.',
    lessons: [
      {
        slug: 'adverbs-frequency-present-simple',
        moduleId: 'word-order',
        order: 35,
        title: 'Adverbs of frequency with present simple',
        shortTitle: 'Adverbs of frequency',
        description: 'Đặt always, usually, often, sometimes và never đúng vị trí.',
        estimatedMinutes: 25,
      },
      {
        slug: 'basic-word-order-english',
        moduleId: 'word-order',
        order: 36,
        title: 'Basic word order in English',
        shortTitle: 'Basic word order',
        description: 'Xây dựng câu cơ bản theo trật tự chủ ngữ, động từ, tân ngữ, nơi chốn và thời gian.',
        estimatedMinutes: 30,
      },
    ],
  },
];

const flatLessonSeeds = moduleSeeds
  .flatMap((grammarModule) =>
    grammarModule.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: grammarModule.title,
    })),
  )
  .sort((a, b) => a.order - b.order);

export const A1_GRAMMAR_LESSONS: GrammarLessonMetadata[] =
  flatLessonSeeds.map((lesson, index, lessons) => ({
    ...lesson,
    id: `a1-grammar-${String(lesson.order).padStart(2, '0')}`,
    level: 'A1',
    status: lesson.order <= 3 ? 'published' : 'coming-soon',
    previousLessonSlug: lessons[index - 1]?.slug,
    nextLessonSlug: lessons[index + 1]?.slug,
  }));

export const A1_GRAMMAR_MODULES: GrammarModule[] = moduleSeeds.map(
  (grammarModule, index) => ({
    id: grammarModule.id,
    level: 'A1',
    title: grammarModule.title,
    description: grammarModule.description,
    order: index + 1,
    lessonSlugs: grammarModule.lessons.map((lesson) => lesson.slug),
  }),
);

export const A1_GRAMMAR_LESSON_COUNT = A1_GRAMMAR_LESSONS.length;

