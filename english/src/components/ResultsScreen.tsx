'use client';

import { ReviewWord } from '@/types/verb';

interface ResultsScreenProps {
  score: number;
  totalWords: number;
  reviewWords: ReviewWord[];
  onRetry: () => void;
  onDownloadReport: () => void;
}

export default function ResultsScreen({
  score,
  totalWords,
  reviewWords,
  onRetry,
  onDownloadReport
}: ResultsScreenProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-500">🎉 Hoàn thành!</h2>
      <p className="text-xl mb-6">
        Điểm của bạn: <span className="font-bold">{score} / {totalWords}</span>
      </p>
      
      <div className="mb-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Những từ cần xem lại:</h3>
        {reviewWords.length > 0 ? (
          <ul className="space-y-3">
            {reviewWords.map((item, index) => (
              <li 
                key={index} 
                className="p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <span className="font-bold text-red-700">{item.word}</span>: {item.definition}
                <br />
                <span className="text-sm text-gray-600">
                  {item.v1} - {item.v2} - {item.v3}
                </span>
                {item.userAnswer && (
                  <>
                    <br />
                    <span className="text-sm text-red-600">
                      Bạn đã trả lời: {item.userAnswer}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">🎉 Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi.</p>
        )}
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Làm lại
        </button>
        <button
          onClick={onDownloadReport}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Tải báo cáo (.txt)
        </button>
      </div>
    </div>
  );
}

