'use client';

import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import VoiceSelector from '@/components/VoiceSelector';
import { Verb } from '@/types/verb';
import { speak } from '@/utils/speech';
import { VerbsData } from '@/utils/verbs-data';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VerbsAudioPage() {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [filteredVerbs, setFilteredVerbs] = useState<Verb[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterVerbs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, verbs]);

  const loadData = async () => {
    try {
      const data = await VerbsData.load();
      setVerbs(data);
      setFilteredVerbs(data);
      console.log(`✅ Đã tải ${data.length} động từ`);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVerbs = () => {
    if (!searchQuery.trim()) {
      setFilteredVerbs(verbs);
      return;
    }

    const query = normalizeText(searchQuery);
    const filtered = verbs.filter(verb => {
      const fields = [
        verb.v1,
        verb.v2,
        verb.v3,
        verb.definition,
        verb.english_definition
      ].filter(Boolean).map(normalizeText);
      
      return fields.some(f => f.includes(query));
    });

    setFilteredVerbs(filtered);
  };

  const normalizeText = (str: string): string => {
    return (str || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const isSameForm = (a: string, b: string): boolean => {
    return (a || '').toLowerCase() === (b || '').toLowerCase();
  };

  // Helper function to get clean Vietnamese meaning
  const getCleanMeaning = (definition: string): string => {
    if (!definition) return '';
    
    // Remove anything after semicolon (extra notes)
    let clean = definition.split(';')[0];
    
    // Remove anything after slash but take first part
    clean = clean.split('/')[0];
    
    // Remove anything in parentheses (including spaces before them)
    clean = clean.replace(/\s*\([^)]*\)/g, '');
    
    // Trim whitespace
    clean = clean.trim();
    
    return clean;
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const computeStats = () => {
    let sameV2V3 = 0;
    let sameAll = 0;
    
    filteredVerbs.forEach(verb => {
      const v1 = verb.v1.toLowerCase();
      const v2 = verb.v2.toLowerCase();
      const v3 = verb.v3.toLowerCase();
      
      if (v2 === v3) sameV2V3++;
      if (v1 === v2 && v1 === v3) sameAll++;
    });

    return { sameV2V3, sameAll, total: filteredVerbs.length, fullTotal: verbs.length };
  };

  const stats = computeStats();

  if (loading) {
    return (
      <>
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🔊 Phát âm động từ
              </h1>
              <div className="flex items-center gap-3">
                <VoiceSelector />
                <Link href="/">
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <Navigation />
          </div>
        </header>

        {/* Loading Content */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold">Đang tải dữ liệu...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🔊 Phát âm động từ {verbs.length > 0 ? `(${verbs.length} verbs)` : ''}
            </h1>
            <div className="flex items-center gap-3">
              <VoiceSelector />
              <Link href="/">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <Navigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-0 sm:px-4 md:px-5 py-4 sm:py-5">
          <div className="px-3 sm:px-0">

          {/* Controls */}
          <div className="mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center bg-white/10 p-3 sm:p-4 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
            <input
              type="search"
              placeholder="Tìm động từ (ví dụ: prefer)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 text-base sm:text-lg border border-white/30 rounded w-full sm:min-w-[200px] bg-white/10 text-white placeholder-white/70 backdrop-blur-sm"
            />

            <span className="text-xs sm:text-sm font-medium opacity-90 text-center sm:text-left sm:ml-auto">
              <span className="block sm:inline">Kết quả: {stats.total} / {stats.fullTotal}</span>
              <span className="hidden sm:inline"> | </span>
              <span className="block sm:inline">V2=V3: {stats.sameV2V3}</span>
              <span className="hidden sm:inline"> | </span>
              <span className="block sm:inline">V1=V2=V3: {stats.sameAll}</span>
            </span>
          </div>

          {/* Verbs List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {filteredVerbs.map((verb, index) => {
              const sameV2V3 = isSameForm(verb.v2, verb.v3);
              const sameAll = isSameForm(verb.v1, verb.v2) && isSameForm(verb.v1, verb.v3);

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl shadow-lg border border-white/20 backdrop-blur-md hover:translate-y-[-4px] hover:shadow-xl hover:bg-white/15 transition-all"
                >
                  <div className="flex-1">
                    {/* Verb Forms */}
                    <div className="flex gap-4 mb-2 flex-wrap justify-center">
                      {/* V1 */}
                      <div
                        onClick={() => handleSpeak(verb.v1)}
                        className={`flex flex-col items-center px-3 py-2 rounded-md min-w-[80px] cursor-pointer border border-white/20 hover:translate-y-[-2px] hover:shadow-md transition-all ${
                          sameAll ? 'bg-green-500/20 border-green-400' : 'bg-green-500/20 border-green-400'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase mb-1 opacity-80 text-green-300">
                          V1 (Hiện tại)
                        </div>
                        <div className="font-bold text-xl mb-1 text-yellow-400 tracking-wide">
                          {verb.v1}
                        </div>
                        <div className="text-xs text-white/50 italic text-center max-w-[120px]">
                          {getCleanMeaning(verb.definition)}
                        </div>
                      </div>

                      {/* V2 */}
                      <div
                        onClick={() => handleSpeak(verb.v2)}
                        className={`flex flex-col items-center px-3 py-2 rounded-md min-w-[80px] cursor-pointer border border-white/20 hover:translate-y-[-2px] hover:shadow-md transition-all ${
                          sameAll ? 'bg-green-500/20 border-green-400' : sameV2V3 ? 'bg-yellow-500/20 border-yellow-400' : 'bg-yellow-500/20 border-yellow-400'
                        }`}
                      >
                        <div className={`text-xs font-bold uppercase mb-1 opacity-80 ${
                          sameAll ? 'text-green-300' : 'text-yellow-300'
                        }`}>
                          V2 (Quá khứ)
                        </div>
                        <div className="font-bold text-xl mb-1 text-yellow-400 tracking-wide">
                          {verb.v2}
                        </div>
                        <div className="text-xs text-white/50 italic text-center max-w-[120px]">
                          đã {getCleanMeaning(verb.definition)}
                        </div>
                      </div>

                      {/* V3 */}
                      <div
                        onClick={() => handleSpeak(verb.v3)}
                        className={`flex flex-col items-center px-3 py-2 rounded-md min-w-[80px] cursor-pointer border border-white/20 hover:translate-y-[-2px] hover:shadow-md transition-all ${
                          sameAll ? 'bg-green-500/20 border-green-400' : sameV2V3 ? 'bg-yellow-500/20 border-yellow-400' : 'bg-blue-500/20 border-blue-400'
                        }`}
                      >
                        <div className={`text-xs font-bold uppercase mb-1 opacity-80 ${
                          sameAll ? 'text-green-300' : sameV2V3 ? 'text-yellow-300' : 'text-blue-300'
                        }`}>
                          V3 (Phân từ)
                        </div>
                        <div className="font-bold text-xl mb-1 text-yellow-400 tracking-wide">
                          {verb.v3}
                        </div>
                        <div className="text-xs text-white/50 italic text-center max-w-[120px]">
                          được {getCleanMeaning(verb.definition)}
                        </div>
                      </div>
                    </div>

                    {/* Extra Info */}
                    <div className="flex items-center gap-4 mt-3 justify-center flex-wrap">
                      {/* Icon Box */}
                      <div 
                        className="w-40 h-28 rounded-lg border border-white/20 shadow-lg flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
                      >
                        {verb.icon && (
                          <div className="text-6xl mb-2">
                            {verb.icon}
                          </div>
                        )}
                        <div className="font-bold text-white/95 tracking-wide text-xs">
                          {verb.word}
                        </div>
                      </div>

                      {/* Example */}
                      <div className="flex flex-col gap-1 max-w-[520px]">
                        <div 
                          onClick={() => handleSpeak(verb.example)}
                          className="text-white text-base font-medium cursor-pointer hover:text-yellow-300 transition-colors"
                        >
                          {verb.example}
                        </div>
                        <div className="text-white/80 text-sm italic">
                          {getVietnameseExample(verb)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </main>
    </>
  );
}

// Helper functions
function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

function getVietnameseExample(verb: Verb): string {
  const exampleMap: { [key: string]: string } = {
    'be': 'Hôm nay tôi vui.',
    'have': 'Tôi có cuộc họp lúc chín giờ.',
    'do': 'Tôi làm việc đó mỗi ngày.',
    'go': 'Tôi đi làm mỗi ngày.',
    'get': 'Tôi dậy lúc sáu giờ.',
    'make': 'Tôi làm bữa sáng mỗi sáng.',
    'take': 'Tôi đi làm bằng xe buýt.',
    'see': 'Tôi gặp bạn vào cuối tuần.',
    'come': 'Tôi về nhà muộn.',
    'think': 'Tôi thường nghĩ về điều đó.',
    'eat': 'Tôi ăn sáng lúc bảy giờ.',
    'drink': 'Tôi uống nước cả ngày.',
    'cook': 'Tôi nấu bữa tối.',
    'sleep': 'Tôi ngủ tám tiếng.',
    'work': 'Tôi làm việc tại nhà.',
    'study': 'Tôi học tiếng Anh mỗi ngày.',
    'play': 'Tôi chơi bóng đá vào Chủ nhật.',
    'run': 'Tôi chạy mỗi sáng.',
  };

  return exampleMap[verb.v1] || `Tôi thường ${verb.definition}.`;
}
