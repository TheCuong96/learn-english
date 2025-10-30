const fs = require('fs');
const path = require('path');

// Mappings from existing code
const SUBJECT_VN = {
  'I': 'Tôi', 'You': 'Bạn', 'We': 'Chúng tôi', 'They': 'Họ', 'He': 'Anh ấy', 'She': 'Cô ấy', 'It': 'Nó'
};

const TIME_VN_MAP = {
  'every day': 'mỗi ngày',
  'every week': 'mỗi tuần',
  'on Mondays': 'vào thứ Hai',
  'often': 'thường',
  'usually': 'thường',
  'sometimes': 'đôi khi',
  'always': 'luôn luôn',
  'never': 'không bao giờ',
  'now': 'bây giờ',
  'at the moment': 'vào lúc này',
  'right now': 'ngay lúc này',
  'currently': 'hiện tại',
  'these days': 'dạo này',
  'already': 'đã',
  'just': 'vừa mới',
  'yet': 'chưa',
  'ever': 'từng',
  'never ': 'chưa từng',
  'so far': 'cho đến nay',
  'recently': 'gần đây',
  'yesterday': 'hôm qua',
  'last night': 'tối qua',
  'last week': 'tuần trước',
  'in 2010': 'năm 2010',
  'two days ago': 'hai ngày trước',
  'at 8 pm last night': 'lúc 8 giờ tối qua',
  'when you called': 'khi bạn gọi',
  'while he was away': 'trong khi anh ấy vắng',
  'before he arrived': 'trước khi anh ấy tới',
  'by the time she came': 'khi cô ấy đến',
  'when the movie started': 'khi bộ phim bắt đầu',
  'for two hours before he came': 'trong hai giờ trước khi anh ấy đến',
  'since morning before the exam': 'từ sáng trước kỳ thi',
  'for two hours': 'trong hai giờ',
  'since morning': 'từ sáng',
  'for a long time': 'trong một thời gian dài',
  'since 2020': 'từ năm 2020',
  'tomorrow': 'ngày mai',
  'next week': 'tuần tới',
  'soon': 'sớm',
  'later': 'sau này',
  'at this time tomorrow': 'vào giờ này ngày mai',
  'all day tomorrow': 'suốt ngày mai',
  'by next week': 'vào tuần tới',
  'by tomorrow': 'vào ngày mai',
  'by 5 pm': 'trước 5 giờ chiều',
  'by next month': 'vào tháng tới',
  'by the end of the year': 'vào cuối năm',
  'all day tomorrow': 'suốt ngày mai',
  'on mondays': 'vào thứ Hai'
};

function buildCompletedSentence(question, correctAnswer) {
  let s = question;
  s = s.replace(/___\s*\([^)]*\)/, correctAnswer);
  s = s.replace(/\s+\./g, '.');
  return s;
}

function extractBaseVerb(question) {
  const m = question.match(/\(([^)]+)\)/);
  return m ? m[1].toLowerCase() : '';
}

function findTimeVn(text) {
  const lower = text.toLowerCase();
  let found = '';
  Object.keys(TIME_VN_MAP).forEach(k => {
    if (!found && lower.includes(k.toLowerCase())) {
      found = TIME_VN_MAP[k];
    }
  });
  return found;
}

function findSubjectVn(text) {
  // Try leading subject pattern
  const m1 = text.match(/^([A-Za-z]+)\s/);
  if (m1 && SUBJECT_VN[m1[1]]) return SUBJECT_VN[m1[1]];
  // Try after auxiliary in questions: Do/Does/Is/Are/Did/Was/Were/Will/Had/Have/Has + subject
  const m2 = text.match(/^(?:Do|Does|Is|Are|Did|Was|Were|Will|Had|Have|Has)\s+([A-Za-z]+)/i);
  if (m2) {
    const sub = m2[1].charAt(0).toUpperCase() + m2[1].slice(1).toLowerCase();
    if (SUBJECT_VN[sub]) return SUBJECT_VN[sub];
  }
  return '';
}

function getVerbVn(base, verbsData) {
  if (!base) return '';
  const v = verbsData.find((x) => (x.v1 || x.word || '').toLowerCase() === base);
  if (!v) return '';
  return (v.definition || '').toString();
}

function buildVietnameseMeaning(fullEn, originalQuestion, tenseType, correctAnswer, verbsData) {
  const subjectVn = findSubjectVn(fullEn);
  const baseVerb = extractBaseVerb(originalQuestion); // Extract from original question, not completed sentence
  const verbVn = getVerbVn(baseVerb, verbsData) || baseVerb;
  const timeVn = findTimeVn(fullEn);
  const isNegative = /\bnot\b|n't/.test(correctAnswer);

  const parts = [];
  if (subjectVn) parts.push(subjectVn);

  const verbPhrase = () => {
    if (!verbVn) return '';
    switch (tenseType) {
      case 'present-simple':
        return isNegative ? `không ${verbVn}` : verbVn;
      case 'present-continuous':
        return (isNegative ? 'không ' : '') + `đang ${verbVn}`;
      case 'present-perfect':
        return (isNegative ? 'chưa ' : 'đã ') + verbVn;
      case 'present-perfect-continuous':
        return (isNegative ? 'chưa ' : 'đã ') + `đang ${verbVn}`;
      case 'past-simple':
        return (isNegative ? 'đã không ' : 'đã ') + verbVn;
      case 'past-continuous':
        return (isNegative ? 'đã không ' : 'đang ') + verbVn;
      case 'past-perfect':
        return (isNegative ? 'đã không ' : 'đã ') + verbVn;
      case 'past-perfect-continuous':
        return (isNegative ? 'đã không ' : 'đã ') + `đang ${verbVn}`;
      case 'future-simple':
        return (isNegative ? 'sẽ không ' : 'sẽ ') + verbVn;
      case 'future-continuous':
        return (isNegative ? 'sẽ không ' : 'sẽ ') + `đang ${verbVn}`;
      case 'future-perfect':
        return (isNegative ? 'sẽ chưa ' : 'sẽ đã ') + verbVn;
      case 'future-perfect-continuous':
        return (isNegative ? 'sẽ chưa ' : 'sẽ đã ') + `đang ${verbVn}`;
    }
  };

  const vp = verbPhrase();
  if (vp) parts.push(vp);
  if (timeVn) parts.push(timeVn);
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function processTenseFile(filePath, verbsData) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const questions = JSON.parse(raw);
  
  const updated = questions.map(q => {
    const completedSentence = buildCompletedSentence(q.question, q.correctAnswer);
    const vietnameseMeaning = buildVietnameseMeaning(completedSentence, q.question, q.tenseType, q.correctAnswer, verbsData);
    
    return {
      ...q,
      completedSentence,
      vietnameseMeaning
    };
  });
  
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
  console.log(`✓ Updated ${path.basename(filePath)}: ${updated.length} questions`);
}

function main() {
  const tensesDir = path.resolve(__dirname, '../public/data/tenses');
  const verbsPath = path.resolve(__dirname, '../public/data/verbs-data.json');
  
  // Load verbs data
  const verbsRaw = fs.readFileSync(verbsPath, 'utf-8');
  const verbsData = JSON.parse(verbsRaw);
  
  // Process all tense files
  const tenseFiles = [
    'present-simple.json',
    'present-continuous.json',
    'present-perfect.json',
    'present-perfect-continuous.json',
    'past-simple.json',
    'past-continuous.json',
    'past-perfect.json',
    'past-perfect-continuous.json',
    'future-simple.json',
    'future-continuous.json',
    'future-perfect.json',
    'future-perfect-continuous.json'
  ];
  
  tenseFiles.forEach(file => {
    const filePath = path.join(tensesDir, file);
    if (fs.existsSync(filePath)) {
      processTenseFile(filePath, verbsData);
    } else {
      console.log(`✗ File not found: ${file}`);
    }
  });
  
  console.log('\n🎉 All tense files updated successfully!');
}

main();

