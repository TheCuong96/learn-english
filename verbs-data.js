// Dữ liệu động từ dùng chung cho verbs-audio.html và practice-english.html
// Sử dụng: <script src="verbs-data.js"></script> sau đó truy cập qua window.VerbsData

(function() {
  'use strict';

  // Load dữ liệu từ file JSON
  const loadVerbsData = async () => {
    try {
      const response = await fetch('verbs-data.json');
      return await response.json();
    } catch (error) {
      console.error('Không thể tải dữ liệu động từ:', error);
      return [];
    }
  };

  // Export global
  window.VerbsData = {
    // Hàm load dữ liệu async
    load: loadVerbsData,
    
    // Hàm lọc động từ theo điều kiện
    filter: function(verbs, options = {}) {
      let filtered = verbs;
      
      // Lọc theo từ khóa tìm kiếm
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filtered = filtered.filter(v => 
          v.word.toLowerCase().includes(searchLower) ||
          v.definition.toLowerCase().includes(searchLower) ||
          (v.english_definition && v.english_definition.toLowerCase().includes(searchLower))
        );
      }
      
      // Lọc theo loại động từ (regular/irregular)
      if (options.verbType === 'regular') {
        filtered = filtered.filter(v => v.v1 !== v.v2 && v.v2 === v.v3);
      } else if (options.verbType === 'irregular') {
        filtered = filtered.filter(v => v.v1 !== v.v2 || v.v2 !== v.v3);
      }
      
      // Lọc theo độ dài từ
      if (options.maxLength) {
        filtered = filtered.filter(v => v.word.length <= options.maxLength);
      }
      
      return filtered;
    },
    
    // Hàm lấy ngẫu nhiên n động từ
    random: function(verbs, count = 10) {
      const shuffled = [...verbs].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    },
    
    // Hàm chuyển đổi format cho verbs-audio.html
    toVerbsAudioFormat: function(verbs) {
      return verbs.map(v => [
        v.v1,
        v.v2,
        v.v3,
        v.definition,
        `đã ${v.definition.split('/')[0]}`,
        `được ${v.definition.split('/')[0]}`
      ]);
    },
    
    // Hàm chuyển đổi format cho practice-english.html
    toPracticeEnglishFormat: function(verbs) {
      return verbs; // Đã đúng format rồi
    },
    
    // Hàm loại bỏ duplicate
    deduplicate: function(verbs) {
      const seen = new Set();
      return verbs.filter(v => {
        const key = v.word.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    },
    
    // Hàm thống kê
    stats: function(verbs) {
      const total = verbs.length;
      const regular = verbs.filter(v => v.v1 !== v.v2 && v.v2 === v.v3).length;
      const irregular = verbs.filter(v => v.v1 !== v.v2 || v.v2 !== v.v3).length;
      const unchanging = verbs.filter(v => v.v1 === v.v2 && v.v2 === v.v3).length;
      
      return {
        total,
        regular,
        irregular,
        unchanging,
        avgWordLength: (verbs.reduce((sum, v) => sum + v.word.length, 0) / total).toFixed(2)
      };
    }
  };
  
  console.log('✅ VerbsData module đã được tải!');
  console.log('📖 Sử dụng: const verbs = await VerbsData.load();');
})();

