const fs = require('fs');
const path = require('path');

// Read the verbs-data.json
const dataPath = path.join(__dirname, '..', 'public', 'data', 'verbs-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Missing verbs with their conjugations
const missingVerbs = [
  {
    "word": "tear",
    "type": "verb",
    "v1": "tear",
    "v2": "tore",
    "v3": "torn",
    "definition": "xé",
    "english_definition": "to pull something apart or to pieces",
    "example": "I tear the paper.",
    "icon": "⚡"
  },
  {
    "word": "feel",
    "type": "verb",
    "v1": "feel",
    "v2": "felt",
    "v3": "felt",
    "definition": "cảm thấy",
    "english_definition": "to experience an emotion or sensation",
    "example": "I feel happy today.",
    "icon": "❤️"
  },
  {
    "word": "hold",
    "type": "verb",
    "v1": "hold",
    "v2": "held",
    "v3": "held",
    "definition": "cầm/giữ",
    "english_definition": "to grasp, carry, or support with your hands or arms",
    "example": "I hold the bag.",
    "icon": "🤲"
  },
  {
    "word": "ring",
    "type": "verb",
    "v1": "ring",
    "v2": "rang",
    "v3": "rung",
    "definition": "rung/reng",
    "english_definition": "to make a bell sound",
    "example": "I ring the bell.",
    "icon": "🔔"
  },
  {
    "word": "split",
    "type": "verb",
    "v1": "split",
    "v2": "split",
    "v3": "split",
    "definition": "chia tách",
    "english_definition": "to divide into parts",
    "example": "I split the wood.",
    "icon": "⚡"
  },
  {
    "word": "throw",
    "type": "verb",
    "v1": "throw",
    "v2": "threw",
    "v3": "thrown",
    "definition": "ném",
    "english_definition": "to propel something through the air",
    "example": "I throw the ball.",
    "icon": "⚽"
  }
];

// Add missing verbs to the data
let addedCount = 0;
missingVerbs.forEach(verb => {
  // Check if verb already exists
  const existingIndex = data.findIndex(v => v.word === verb.word);
  if (existingIndex === -1) {
    // Add to the beginning of the array (or wherever appropriate)
    data.push(verb);
    addedCount++;
    console.log(`✅ Added: ${verb.word} (${verb.v1}, ${verb.v2}, ${verb.v3})`);
  } else {
    console.log(`⚠️  Already exists: ${verb.word}`);
  }
});

// Check for "lie" meaning "to recline/lie down" vs "to tell a lie"
const lieVerb = data.find(v => v.word === 'lie');
if (lieVerb && lieVerb.v2 === 'lied' && lieVerb.v3 === 'lied') {
  console.log(`ℹ️  Current "lie" means "to tell a lie" (said something untrue)`);
  console.log(`ℹ️  Note: "lie" can also mean "to recline" with conjugations: lie/lay/lain`);
}

// Save the updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`\n✅ Updated ${addedCount} missing verbs`);
console.log(`📊 Total verbs: ${data.length}`);

