Hãy thực hiện Batch 2: Tạo schema dữ liệu và sitemap cho A1 Grammar.

Dựa trên kết quả Audit ở Batch 1, hãy thêm cấu trúc dữ liệu cho module A1 Grammar.

Yêu cầu:
1. Tạo type/interface hoặc schema phù hợp với codebase hiện tại.
2. Không hardcode lesson trực tiếp trong component page.
3. Tạo danh sách module A1 Grammar theo sitemap dưới đây.
4. Tạo metadata cho toàn bộ 36 bài.
5. Tạo content đầy đủ trước cho 3 bài đầu.
6. Các bài còn lại có thể để metadata/placeholder hợp lệ để listing page hiển thị được.

Sitemap A1 Grammar:

Module: Present tenses
1. Present simple forms of “to be”: am/is/are
2. Present simple: I do, I don’t, Do I?
3. Present continuous: I’m doing, I’m not doing, Are you doing?
4. Present simple or present continuous?
5. Have got

Module: Past tenses
6. Was/were: Past simple of “be”
7. Past simple: Regular/irregular verbs
8. Past simple: Negatives and questions

Module: Future
9. Will and shall: Future
10. Be going to: Plans and predictions

Module: Modals, imperative, requests
11. Can/can’t: ability, possibility, permission
12. The imperative: Sit down! Don’t talk!
13. Would you like…? I’d like…

Module: -ing and infinitive
14. Verbs + to-infinitive and verbs + -ing

Module: Articles, nouns, pronouns, determiners
15. A/an, plurals: Singular and plural forms
16. A/an, the, no article
17. This, that, these, those
18. Possessive adjectives and subject pronouns
19. Object pronouns vs subject pronouns
20. A, some, any: Countable and uncountable nouns
21. Much, many, a lot of, a little, a few
22. Whose, possessive ’s

Module: There and it
23. There is / there are / there was / there were
24. There or it
25. This or it

Module: Adjectives and adverbs
26. Basic adjectives
27. Adverbs of manner or adjectives
28. Comparative adjectives
29. Superlative adjectives

Module: Conjunctions
30. And, but, or, so, because

Module: Prepositions
31. At, in, on: Prepositions of time
32. At, in, on: Prepositions of place
33. Next to, under, between, in front of, behind, over, etc.

Module: Questions
34. Questions: Word order and question words

Module: Word order
35. Adverbs of frequency with present simple
36. Basic word order in English

Schema gợi ý:

type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";

type ExerciseType =
  | "multiple-choice"
  | "fill-blank"
  | "reorder"
  | "error-correction"
  | "translation"
  | "mixed-test";

interface GrammarLesson {
  id: string;
  slug: string;
  level: CEFRLevel;
  moduleId: string;
  moduleTitle: string;
  order: number;
  title: string;
  shortTitle?: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  formulas: GrammarFormula[];
  usages: GrammarUsage[];
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  quickNotes: string[];
  exercises: Exercise[];
  miniTest: Exercise[];
  summary: LessonSummary;
  nextLessonSlug?: string;
  previousLessonSlug?: string;
}

interface GrammarFormula {
  title: string;
  pattern: string;
  explanation: string;
  examples: GrammarExample[];
}

interface GrammarUsage {
  title: string;
  explanation: string;
  examples: GrammarExample[];
}

interface GrammarExample {
  english: string;
  vietnamese: string;
  highlight?: string;
}

interface CommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  vietnameseHint?: string;
  difficulty: "easy" | "medium" | "hard";
  skillFocus?: string[];
}

interface LessonSummary {
  keyPoints: string[];
  rememberSentences: GrammarExample[];
}

Yêu cầu content cho 3 bài đầu:

Lesson 1:
- Title: Present simple forms of “to be”: am/is/are
- Có I am, You are, He/She/It is, We/They are.
- Có negative: am not, isn’t, aren’t.
- Có questions: Am I? Are you? Is he?
- Có short answers: Yes, I am. / No, I’m not.
- Có contractions: I’m, you’re, he’s, she’s, it’s, we’re, they’re.
- Có lỗi người Việt thường gặp:
  - Sai: Is cold.
  - Đúng: It is cold.
  - Sai: I are a student.
  - Đúng: I am a student.
  - Sai: Yes, I’m.
  - Đúng: Yes, I am.

Lesson 2:
- Title: Present simple: I do, I don’t, Do I?
- Có positive, negative, questions, short answers.
- Có he/she/it + s/es.
- Có do/does, don’t/doesn’t.
- Có spelling: work → works, watch → watches, study → studies, have → has.
- Có uses: habits, routines, facts, permanent situations.
- Có common mistakes:
  - He work → He works.
  - She don’t like coffee → She doesn’t like coffee.
  - Do he work here? → Does he work here?

Lesson 3:
- Title: Present continuous: I’m doing, I’m not doing, Are you doing?
- Có form: am/is/are + verb-ing.
- Có positive, negative, questions, short answers.
- Có uses: actions happening now, temporary situations, around now.
- Có time expressions: now, right now, at the moment, today, this week.
- Có common mistakes:
  - I working → I am working.
  - She is work → She is working.
  - Are he studying? → Is he studying?

Output yêu cầu:
1. File/folder đã thêm.
2. Schema đã tạo.
3. Metadata 36 bài đã tạo ở đâu.
4. 3 bài đầu đã có những phần nào.
5. Chạy typecheck/build/lint nếu project có.
6. Không tạo UI phức tạp ở batch này, chỉ chuẩn bị data layer.