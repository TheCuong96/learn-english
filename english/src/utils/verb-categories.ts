export interface VerbCategory {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  keywords: string[]; // Từ khóa để tự động phân loại
}

export const VERB_CATEGORIES: VerbCategory[] = [
  {
    id: 'daily',
    name: 'Daily Activities',
    nameVi: 'Hoạt động hàng ngày',
    icon: '🏠',
    keywords: ['wake', 'sleep', 'eat', 'drink', 'brush', 'wash', 'clean', 'cook', 'have', 'get up', 'go', 'come', 'leave', 'arrive', 'dress', 'shower', 'breakfast', 'lunch', 'dinner']
  },
  {
    id: 'work',
    name: 'Work & Study',
    nameVi: 'Công việc & Học tập',
    icon: '💼',
    keywords: ['work', 'study', 'learn', 'teach', 'read', 'write', 'do', 'finish', 'complete', 'start', 'meet', 'attend', 'schedule', 'plan', 'manage', 'coordinate', 'organize']
  },
  {
    id: 'communication',
    name: 'Communication',
    nameVi: 'Giao tiếp',
    icon: '💬',
    keywords: ['call', 'talk', 'speak', 'say', 'tell', 'ask', 'answer', 'reply', 'explain', 'discuss', 'chat', 'email', 'message', 'contact', 'communicate', 'greet', 'thank', 'apologize']
  },
  {
    id: 'movement',
    name: 'Movement & Travel',
    nameVi: 'Di chuyển & Du lịch',
    icon: '🚶',
    keywords: ['go', 'come', 'walk', 'run', 'move', 'travel', 'visit', 'drive', 'ride', 'fly', 'leave', 'arrive', 'depart', 'return', 'jump', 'climb', 'dance', 'step', 'stand', 'sit']
  },
  {
    id: 'leisure',
    name: 'Leisure & Entertainment',
    nameVi: 'Giải trí & Thư giãn',
    icon: '🎮',
    keywords: ['play', 'watch', 'listen', 'enjoy', 'relax', 'rest', 'celebrate', 'party', 'dance', 'sing', 'film', 'tour', 'shop', 'game', 'hobby']
  },
  {
    id: 'tech',
    name: 'Technology & IT',
    nameVi: 'Công nghệ & IT',
    icon: '💻',
    keywords: ['code', 'program', 'debug', 'test', 'deploy', 'build', 'compile', 'run', 'execute', 'install', 'update', 'configure', 'optimize', 'refactor', 'commit', 'push', 'pull', 'merge', 'clone']
  },
  {
    id: 'business',
    name: 'Business & Finance',
    nameVi: 'Kinh doanh & Tài chính',
    icon: '💰',
    keywords: ['buy', 'sell', 'pay', 'cost', 'spend', 'save', 'invest', 'trade', 'purchase', 'order', 'deliver', 'ship', 'negotiate', 'approve', 'sign', 'contract']
  },
  {
    id: 'emotions',
    name: 'Emotions & Feelings',
    nameVi: 'Cảm xúc',
    icon: '😊',
    keywords: ['love', 'like', 'hate', 'feel', 'hope', 'wish', 'want', 'need', 'prefer', 'enjoy', 'miss', 'worry', 'fear', 'care', 'appreciate', 'admire']
  },
  {
    id: 'thinking',
    name: 'Thinking & Understanding',
    nameVi: 'Suy nghĩ & Hiểu biết',
    icon: '🧠',
    keywords: ['think', 'know', 'understand', 'believe', 'remember', 'forget', 'imagine', 'guess', 'wonder', 'decide', 'choose', 'consider', 'realize']
  },
  {
    id: 'creating',
    name: 'Creating & Making',
    nameVi: 'Sáng tạo & Chế tạo',
    icon: '🎨',
    keywords: ['make', 'create', 'build', 'design', 'develop', 'write', 'draw', 'paint', 'cook', 'bake', 'compose', 'invent', 'manufacture', 'construct', 'produce']
  },
  {
    id: 'health',
    name: 'Health & Body',
    nameVi: 'Sức khỏe & Cơ thể',
    icon: '🏥',
    keywords: ['eat', 'drink', 'sleep', 'exercise', 'heal', 'hurt', 'bleed', 'breathe', 'cough', 'sneeze', 'diagnose', 'treat', 'cure', 'recover']
  },
  {
    id: 'nature',
    name: 'Nature & Weather',
    nameVi: 'Thiên nhiên & Thời tiết',
    icon: '🌳',
    keywords: ['rain', 'snow', 'blow', 'shine', 'grow', 'plant', 'water', 'harvest', 'bloom', 'fall', 'rise', 'set']
  },
  {
    id: 'social',
    name: 'Social & Relationships',
    nameVi: 'Xã hội & Quan hệ',
    icon: '👥',
    keywords: ['meet', 'help', 'share', 'give', 'take', 'borrow', 'lend', 'marry', 'divorce', 'befriend', 'introduce', 'invite', 'visit', 'welcome']
  },
  {
    id: 'irregular',
    name: 'Irregular Verbs',
    nameVi: 'Động từ bất quy tắc',
    icon: '⚡',
    keywords: [] // Sẽ được xác định bằng logic: V2 hoặc V3 khác V1
  },
  {
    id: 'regular',
    name: 'Regular Verbs',
    nameVi: 'Động từ có quy tắc',
    icon: '📏',
    keywords: [] // Sẽ được xác định bằng logic: V2 = V1 + ed
  }
];

// Hàm phân loại động từ vào category
export function categorizeVerb(verb: { word: string; v1: string; v2: string; v3: string; definition?: string }): string[] {
  const categories: string[] = [];
  const searchText = `${verb.word} ${verb.definition || ''}`.toLowerCase();
  
  // Check irregular vs regular
  const isRegular = verb.v2.endsWith('ed') && (verb.v2 === verb.v1 + 'ed' || verb.v2 === verb.v1 + 'd' || verb.v2 === verb.v1.slice(0, -1) + 'ied');
  
  if (isRegular) {
    categories.push('regular');
  } else {
    categories.push('irregular');
  }
  
  // Check against keyword categories
  for (const category of VERB_CATEGORIES) {
    if (category.keywords.length === 0) continue; // Skip irregular/regular
    
    for (const keyword of category.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        categories.push(category.id);
        break;
      }
    }
  }
  
  // Nếu không thuộc category nào, cho vào 'other'
  if (categories.length === 1 && (categories[0] === 'regular' || categories[0] === 'irregular')) {
    categories.push('other');
  }
  
  return categories;
}

// Lấy tên category
export function getCategoryName(categoryId: string, locale: 'en' | 'vi' = 'vi'): string {
  const category = VERB_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return categoryId;
  return locale === 'vi' ? category.nameVi : category.name;
}

