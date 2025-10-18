# Hướng dẫn sử dụng Verbs Data

## 📦 Các file đã tạo

1. **verbs-data.json** - File JSON chứa 804 động từ với đầy đủ thông tin
2. **verbs-data.js** - Module JavaScript hỗ trợ các hàm tiện ích
3. **extract-verbs.js** - Script để trích xuất dữ liệu (có thể xóa sau khi dùng xong)

## 🎯 Cách sử dụng

### Cách 1: Sử dụng trực tiếp file JSON

#### Trong `verbs-audio.html`:

```html
<script>
  // Thay thế mảng verbs và irregulars hiện tại bằng:
  let verbs = [];
  
  // Load dữ liệu từ JSON
  fetch('verbs-data.json')
    .then(response => response.json())
    .then(data => {
      // Chuyển đổi sang format cũ: [v1, v2, v3, nghĩa1, nghĩa2, nghĩa3]
      verbs = data.map(v => [
        v.v1,
        v.v2,
        v.v3,
        v.definition,
        `đã ${v.definition.split('/')[0]}`,
        `được ${v.definition.split('/')[0]}`
      ]);
      
      // Khởi tạo app sau khi load xong
      render();
    });
</script>
```

#### Trong `practice-english.html`:

```html
<script>
  // Thay thế initialVocabulary bằng:
  let initialVocabulary = [];
  
  // Load động từ từ JSON
  fetch('verbs-data.json')
    .then(response => response.json())
    .then(verbs => {
      // Dữ liệu đã đúng format, chỉ cần gán
      initialVocabulary = verbs;
      
      // Khởi tạo app
      app.vocabulary = JSON.parse(JSON.stringify(initialVocabulary));
    });
</script>
```

### Cách 2: Sử dụng với module VerbsData (Khuyến nghị)

Thêm script vào cả 2 file HTML:

```html
<script src="verbs-data.js"></script>
```

#### Trong `verbs-audio.html`:

```html
<script>
  let verbs = [];
  
  // Sử dụng VerbsData module
  VerbsData.load().then(data => {
    verbs = VerbsData.toVerbsAudioFormat(data);
    
    // Khởi tạo app
    render();
    
    // In thống kê
    console.log('Thống kê:', VerbsData.stats(data));
  });
</script>
```

#### Trong `practice-english.html`:

```html
<script>
  const app = {
    // ... các thuộc tính khác ...
    
    async init() {
      // Load dữ liệu động từ
      const allVerbs = await VerbsData.load();
      
      // Có thể lọc hoặc lấy ngẫu nhiên
      // const selectedVerbs = VerbsData.random(allVerbs, 100);
      
      this.vocabulary = VerbsData.toPracticeEnglishFormat(allVerbs);
      
      // Khởi tạo các event listeners...
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => app.init());
</script>
```

## 🔧 Các hàm tiện ích trong VerbsData

```javascript
// 1. Load dữ liệu
const verbs = await VerbsData.load();

// 2. Lọc động từ
const filtered = VerbsData.filter(verbs, {
  search: 'play',           // Tìm kiếm theo từ khóa
  verbType: 'irregular',    // 'regular' | 'irregular'
  maxLength: 5              // Độ dài tối đa của từ
});

// 3. Lấy ngẫu nhiên
const randomVerbs = VerbsData.random(verbs, 20);

// 4. Chuyển đổi format
const audioFormat = VerbsData.toVerbsAudioFormat(verbs);
const practiceFormat = VerbsData.toPracticeEnglishFormat(verbs);

// 5. Loại bỏ duplicate
const unique = VerbsData.deduplicate(verbs);

// 6. Xem thống kê
const stats = VerbsData.stats(verbs);
console.log(stats);
// {
//   total: 804,
//   regular: 450,
//   irregular: 300,
//   unchanging: 54,
//   avgWordLength: "6.52"
// }
```

## 📊 Cấu trúc dữ liệu JSON

Mỗi động từ có format:

```json
{
  "word": "go",
  "type": "verb",
  "v1": "go",
  "v2": "went",
  "v3": "gone",
  "definition": "đi",
  "english_definition": "to move from one place to another",
  "example": "I go to work every day."
}
```

## ✨ Ưu điểm

1. **Dữ liệu tập trung**: Dễ dàng cập nhật, thêm/xóa động từ ở 1 nơi
2. **Không duplicate**: Mỗi động từ chỉ xuất hiện 1 lần
3. **Đầy đủ thông tin**: Có cả nghĩa tiếng Việt, tiếng Anh và ví dụ
4. **Dễ mở rộng**: Có thể thêm trường mới vào JSON
5. **Performance tốt**: Load 1 lần, cache trên browser

## 🔄 Cập nhật dữ liệu

Nếu muốn thêm động từ mới:

1. Chỉnh sửa file `verbs-audio.html` (thêm vào mảng verbs)
2. Chạy lại: `node extract-verbs.js`
3. File `verbs-data.json` sẽ được cập nhật tự động

## 📝 Lưu ý

- Cả 2 file HTML và file JSON phải cùng thư mục (hoặc điều chỉnh đường dẫn)
- Browser phải hỗ trợ fetch API (tất cả browser hiện đại đều hỗ trợ)
- Nếu mở file HTML trực tiếp (file://), có thể gặp lỗi CORS. Nên dùng local server:
  ```bash
  # Python
  python -m http.server 8000
  
  # Node.js (cần cài http-server: npm i -g http-server)
  http-server
  
  # Hoặc dùng Live Server extension trong VS Code
  ```

## 🎨 Ví dụ nâng cao

### Tạo bài tập động từ bất quy tắc:

```javascript
const verbs = await VerbsData.load();
const irregularVerbs = VerbsData.filter(verbs, { verbType: 'irregular' });
const quiz = VerbsData.random(irregularVerbs, 10);
console.log('10 động từ bất quy tắc ngẫu nhiên:', quiz);
```

### Tìm động từ ngắn để học:

```javascript
const verbs = await VerbsData.load();
const shortVerbs = VerbsData.filter(verbs, { maxLength: 4 });
console.log('Động từ ngắn (<= 4 ký tự):', shortVerbs);
```

---

**Tạo bởi AI** | **Tổng số động từ: 804** | **Cập nhật: 2025**

