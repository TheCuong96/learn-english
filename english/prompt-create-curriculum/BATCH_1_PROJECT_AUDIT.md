Bạn là Senior Frontend Engineer kiêm Product Engineer.

Tôi đang có một web học tiếng Anh hiện tại: https://learn-english-verbs.vercel.app/

Sản phẩm hiện tại tập trung vào luyện động từ tiếng Anh, khoảng 804 verbs. Tôi muốn phát triển tiếp thành một English Learning Hub cho người Việt, bắt đầu bằng module A1 Grammar Lessons + Exercises.

Yêu cầu tổng:
- Inspect source code hiện tại trước khi sửa.
- Không phá vỡ module luyện verbs hiện tại.
- Không rewrite toàn bộ app nếu không cần.
- Không copy nguyên văn nội dung từ Test-English hoặc website khác.
- Có thể dùng mục lục A1 của Test-English làm khung tham khảo, nhưng nội dung phải viết lại bằng ngôn ngữ riêng.
- Ưu tiên static-first, SEO-friendly, mobile-friendly.
- Ưu tiên code sạch, data-driven, dễ mở rộng lên A2/B1.
- Nếu dùng TypeScript thì phải type rõ ràng, hạn chế any.
- Nếu project có lint/typecheck/build thì phải chạy sau khi sửa.
- Trước khi sửa code, hãy nói rõ bạn sẽ thêm/sửa file nào.
- Sau khi sửa code, hãy tóm tắt file đã thay đổi và hướng dẫn test.

Mục tiêu sản phẩm:
- Giữ module Verbs hiện tại.
- Thêm module A1 Grammar.
- Mỗi lesson có: giải thích tiếng Việt, công thức, ví dụ Anh-Việt, lỗi người Việt thường gặp, bài tập, đáp án, mini test.
- Chưa cần backend/auth. Dùng static data và localStorage trước.





Hãy thực hiện Batch 1: Audit dự án hiện tại.

Nhiệm vụ:
1. Đọc package.json để xác định framework, scripts, dependencies.
2. Xác định dự án đang dùng Next.js, React/Vite, static HTML, hoặc framework khác.
3. Đọc cấu trúc folder hiện tại.
4. Tìm route/page chính hiện tại.
5. Tìm module luyện verbs hiện tại.
6. Tìm data source của 804 verbs.
7. Xác định app đang lưu state ở đâu: localStorage, React state, file JSON, hoặc nơi khác.
8. Xác định styling đang dùng: CSS module, Tailwind, plain CSS, shadcn, UI library, v.v.
9. Đánh giá rủi ro khi thêm module grammar:
   - Có dễ thêm route mới không?
   - Có ảnh hưởng home page không?
   - Có cần refactor navigation không?
   - Có cần tách data layer không?

Không sửa code ở batch này, trừ khi cần thêm file report markdown.

Output yêu cầu:
1. Tóm tắt công nghệ dự án.
2. Cây thư mục quan trọng.
3. Luồng hoạt động hiện tại của module verbs.
4. Đề xuất vị trí đặt module grammar.
5. Danh sách file/folder nên thêm ở Batch 2.
6. Rủi ro kỹ thuật.
7. Lệnh cần chạy để test project: dev/build/lint/typecheck nếu có.



# Batch 1 — Audit dự án English Learning Hub

Ngày audit: 26/06/2026

Phạm vi: Đọc và kiểm tra dự án hiện tại, không sửa source code ứng dụng.

## 1. Tóm tắt công nghệ dự án

- Framework: **Next.js 15.5.6**, sử dụng App Router.
- React: **19.1.0**.
- TypeScript: bật `strict: true`.
- Styling:
  - Tailwind CSS 4.
  - Global CSS tại `src/app/globals.css`.
  - Các component theo phong cách shadcn/ui.
  - Radix UI primitives.
  - Lucide icons.
- Font: Be Vietnam Pro thông qua `next/font`.
- Hosting phù hợp với Vercel.
- Không có backend, database hoặc authentication.
- Các route hiện tại được prerender thành static pages.

Scripts trong `package.json`:

```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint"
}
```

Dự án đang có cả `package-lock.json` và `yarn.lock`, trong khi trường `packageManager` khai báo Yarn. Nên thống nhất một package manager trong tương lai để tránh dependency drift.

## 2. Cây thư mục quan trọng

```text
learn-english/
├── english/                         # Next.js app đang hoạt động
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── tailwind.config.ts
│   ├── components.json
│   ├── public/
│   │   └── data/
│   │       ├── verbs-data.json      # Data verbs app đang sử dụng
│   │       └── tenses/              # Data câu hỏi 12 thì
│   ├── scripts/                     # Script sinh hoặc chỉnh sửa data
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx             # Route /
│       │   ├── verbs-audio/
│       │   │   └── page.tsx         # Route /verbs-audio
│       │   └── tenses-practice/
│       │       └── page.tsx         # Route /tenses-practice
│       ├── components/
│       │   ├── Navigation.tsx
│       │   ├── SessionScreen.tsx
│       │   ├── ResultsScreen.tsx
│       │   ├── Flashcard.tsx
│       │   ├── MultipleChoice.tsx
│       │   ├── FillInBlank.tsx
│       │   ├── VerbForms.tsx
│       │   ├── VoiceSelector.tsx
│       │   └── ui/
│       ├── types/
│       │   ├── verb.ts
│       │   └── tenses.ts
│       └── utils/
│           ├── verbs-data.ts
│           ├── verb-categories.ts
│           ├── tenses-data.ts
│           └── speech.ts
└── verbs-data.json                  # Bản legacy, app không sử dụng
```

Ngoài thư mục `english/`, workspace còn chứa các HTML prototype, PDF và tài liệu cũ. Những file này không nằm trong bundle Next.js hiện tại.

## 3. Route và page hiện tại

Các route chính:

| Route | File | Chức năng |
| --- | --- | --- |
| `/` | `english/src/app/page.tsx` | Module luyện động từ |
| `/verbs-audio` | `english/src/app/verbs-audio/page.tsx` | Danh sách và phát âm động từ |
| `/tenses-practice` | `english/src/app/tenses-practice/page.tsx` | Luyện tập 12 thì |

Navigation hiện được khai báo trực tiếp trong:

```text
english/src/components/Navigation.tsx
```

## 4. Luồng hoạt động hiện tại của module verbs

Route chính `/` được triển khai tại:

```text
english/src/app/page.tsx
```

Luồng hoạt động:

1. Trang được mount dưới dạng Client Component.
2. `VerbsData.load()` fetch dữ liệu từ:

   ```text
   /data/verbs-data.json
   ```

3. Dữ liệu được lưu trong React `useState`.
4. Người dùng chọn:
   - Số câu hỏi.
   - Danh mục động từ.
   - Một trong bốn chế độ luyện tập:
     - Flashcards.
     - Multiple choice.
     - Fill in blank.
     - Verb forms.
5. `VerbsData.random()` chọn ngẫu nhiên các động từ cho session.
6. `SessionScreen` điều phối component bài tập tương ứng.
7. Điểm số và các câu trả lời sai được giữ trong React state.
8. Khi kết thúc, người dùng có thể tải báo cáo `.txt` từ browser.

Ba màn hình `home → session → results` là state nội bộ của route `/`, không phải ba route riêng.

Route `/verbs-audio` dùng chung data loader và Web Speech API để tìm kiếm, hiển thị và phát âm động từ.

## 5. Data source của verbs

File mà ứng dụng thực tế đang sử dụng:

```text
english/public/data/verbs-data.json
```

Data loader:

```text
english/src/utils/verbs-data.ts
```

Type:

```ts
interface Verb {
  word: string;
  type: string;
  v1: string;
  v2: string;
  v3: string;
  definition: string;
  english_definition: string;
  example: string;
  icon?: string;
}
```

### Phát hiện quan trọng

- UI và metadata đang ghi **804 verbs**.
- File mà app đang fetch thực tế có **810 records**.
- File `verbs-data.json` ở workspace root có đúng 804 records nhưng có hash và schema khác.
- App không sử dụng file 804 records ở workspace root.
- Không có record nào trong file đang dùng bị thiếu `definition`.

Đây là vấn đề về single source of truth. Không nên tiếp tục hard-code số `804` trong UI và logic validation.

## 6. State và persistence

React state hiện giữ:

- Danh sách verbs.
- Cấu hình session.
- Loại bài tập.
- Danh sách từ trong session.
- Câu hiện tại.
- Điểm số.
- Các câu trả lời sai.
- Feedback.
- Category selection.
- Trạng thái menu mobile.

`localStorage` hiện chỉ được dùng cho thiết lập phát âm:

```text
speechRate
speechMuted
```

Voice được chọn hiện chỉ giữ trong biến runtime/module, chưa được persist đầy đủ.

Chưa có persistence cho:

- Tiến độ học.
- Lesson đã hoàn thành.
- Điểm mini test.
- Lịch sử làm bài.
- Các câu cần ôn lại.

## 7. Styling hiện tại

Dự án sử dụng kết hợp:

- Tailwind utility classes.
- CSS variables theo cấu trúc shadcn/ui.
- Plain global CSS cho animation, scrollbar và một số class tùy chỉnh.
- Radix UI cho các component như tabs, select, progress và label.
- Lucide React cho icon.

Các file chính:

```text
english/src/app/globals.css
english/tailwind.config.ts
english/components.json
english/src/components/ui/
```

Không sử dụng CSS Modules.

## 8. Vị trí đề xuất cho module A1 Grammar

Nên thêm Grammar bằng các route độc lập:

```text
/grammar/a1
/grammar/a1/[slug]
```

Ví dụ:

```text
/grammar/a1/present-simple
/grammar/a1/subject-pronouns
/grammar/a1/articles-a-an
```

Kiến trúc đề xuất:

- Lesson pages sử dụng Server Components và static generation để tối ưu SEO.
- Lesson content lưu dưới dạng TypeScript data tĩnh, được import trong quá trình build.
- Exercise và mini test là các Client Components nhỏ được nhúng trong lesson.
- Progress lưu trong `localStorage` với key có namespace và version.

Không nên fetch toàn bộ lesson content từ JSON phía client giống module verbs. Nội dung giải thích cần có ngay trong HTML prerender để phục vụ SEO.

Trong Batch 2, nên giữ route `/` là module verbs hiện tại và chỉ thêm Grammar vào navigation. Việc đổi `/` thành Hub landing page và chuyển verbs sang `/verbs` nên được thực hiện trong batch riêng để giảm nguy cơ phá link và hành vi hiện tại.

## 9. File/folder nên thêm ở Batch 2

### File và folder mới

```text
english/src/app/grammar/a1/page.tsx
english/src/app/grammar/a1/[slug]/page.tsx

english/src/features/grammar/
├── components/
│   ├── LessonCard.tsx
│   ├── LessonContent.tsx
│   ├── GrammarExercise.tsx
│   ├── MiniTest.tsx
│   └── LessonProgress.tsx
└── lib/
    └── progress-storage.ts

english/src/data/grammar/
├── a1/
│   ├── index.ts
│   ├── subject-pronouns.ts
│   ├── verb-to-be.ts
│   └── present-simple.ts
└── curriculum.ts

english/src/types/grammar.ts
```

Có thể thêm sau:

```text
english/src/app/sitemap.ts
english/src/app/grammar/a1/[slug]/loading.tsx
english/src/app/grammar/a1/[slug]/not-found.tsx
```

### File cần sửa

```text
english/src/components/Navigation.tsx
```

Mục đích là thêm link đến module “A1 Grammar”.

Metadata riêng cho các route Grammar có thể được thêm mà không cần thay đổi metadata của module verbs.

## 10. Đánh giá rủi ro kỹ thuật

### Rủi ro mức trung bình

- `english/src/app/page.tsx` khá monolithic: state, navigation, business logic và UI nằm chung một file.
- Home page hiện chính là verbs app, chưa phải Hub landing page.
- Header và navigation bị lặp lại giữa các route.
- Có hai bản data verbs khác nhau: 804 và 810 records.
- Số `804` đang được hard-code trong title, metadata, validation và placeholder.
- Nội dung verbs được fetch phía client nên SEO nội dung từ vựng chưa tối ưu.
- Chưa có data abstraction chung cho lesson và progress.

### Rủi ro mức thấp

- Next.js App Router giúp thêm route Grammar tương đối dễ.
- Route Grammar độc lập sẽ không ảnh hưởng trực tiếp đến luồng verbs.
- TypeScript đang bật strict mode.
- Production build hiện hoạt động.
- Các UI component hiện tại có thể tái sử dụng.

### Navigation

Về dài hạn nên refactor thành shared site header. Trong Batch 2 chỉ nên thêm link vào `Navigation.tsx`, chưa cần thay đổi sâu header của module verbs.

## 11. Kết quả kiểm tra baseline

### Typecheck

Kết quả: **Pass**

```powershell
npx.cmd tsc --noEmit
```

### Production build

Kết quả: **Pass**

```powershell
npm.cmd run build
```

Các route `/`, `/verbs-audio` và `/tenses-practice` đều được static prerender.

### Lint

Kết quả: **Fail với 11 errors và 4 warnings**

Phần lớn lint errors đến từ CommonJS `require()` trong:

```text
english/scripts/*.js
english/tailwind.config.ts
```

Các warning trong source app:

- `useEffect` tại `src/app/page.tsx` thiếu dependencies.
- Một ESLint disable tại `src/app/verbs-audio/page.tsx` không còn cần thiết.
- Hàm `getColorFromString` không được sử dụng.

Đây là baseline có sẵn trước khi thêm module Grammar.

## 12. Lệnh chạy và test project

Chạy các lệnh trong thư mục:

```powershell
cd C:\Users\user\Desktop\learn-english\english
```

Development:

```powershell
npm.cmd run dev
```

Lint:

```powershell
npm.cmd run lint
```

Typecheck:

```powershell
npx.cmd tsc --noEmit
```

Production build:

```powershell
npm.cmd run build
```

Chạy production server:

```powershell
npm.cmd run start
```

Sử dụng `.cmd` vì PowerShell trên máy hiện chặn `npm.ps1` và `npx.ps1` theo Execution Policy.

## 13. Kết luận

Dự án hiện tại có nền tảng phù hợp để mở rộng thành English Learning Hub mà không cần rewrite toàn bộ app.

Hướng triển khai an toàn cho Batch 2:

1. Giữ nguyên module verbs tại `/`.
2. Thêm route `/grammar/a1`.
3. Thêm dynamic static lesson route `/grammar/a1/[slug]`.
4. Tách Grammar thành feature và data layer riêng.
5. Chỉ thêm link Grammar vào navigation.
6. Chưa thay đổi data hoặc luồng hoạt động của module verbs.
7. Dùng localStorage cho progress với schema có version.

