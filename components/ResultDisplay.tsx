import React, { useState, useEffect } from 'react';
import { RiskLevel } from '../types';
import { GoogleGenAI } from '@google/genai';

interface ResultDisplayProps {
  result: {
    score: number;
    riskLevel: RiskLevel;
    riskLevelName: string;
  };
  onReset: () => void;
}

const SafeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
);

const MediumRiskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v7z"/>
    </svg>
);

const HighRiskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm-1 14h2v2h-2zm0-6h2v4h-2z"/>
    </svg>
);

const AILoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center p-4">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3 text-slate-600 font-semibold">Trợ lý AI đang phân tích kết quả của bạn...</p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const { score, riskLevel, riskLevelName } = result;
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAdvice = async () => {
      setIsLoading(true);
      setError('');
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Bạn là một chuyên gia về an toàn không gian mạng và tâm lý thanh thiếu niên tại Việt Nam. Một học sinh vừa hoàn thành bài khảo sát về hành vi và nhận thức an toàn mạng với kết quả: ${score} điểm, thuộc nhóm "${riskLevelName}".
Dựa vào mức độ rủi ro này, hãy đưa ra những lời khuyên được cá nhân hóa, mang tính xây dựng và dễ làm theo.
Yêu cầu:
1.  Viết bằng tiếng Việt, giọng văn gần gũi, quan tâm, và động viên, không phán xét hay la mắng.
2.  Bắt đầu bằng một nhận định chung về tình hình của học sinh dựa trên mức độ rủi ro.
3.  Cung cấp 3-5 gạch đầu dòng là những mẹo/hành động cụ thể, rõ ràng mà học sinh có thể áp dụng ngay để cải thiện.
4.  Kết thúc bằng một lời nhắn tích cực, khuyến khích.
5.  Không lặp lại số điểm hay tên nhóm rủi ro trong câu trả lời.
6.  Định dạng câu trả lời bằng Markdown để dễ đọc (sử dụng **chữ đậm** cho các ý chính và - cho gạch đầu dòng).`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setAdvice(response.text);
      } catch (err) {
        console.error("Gemini API error:", err);
        setError('Đã xảy ra lỗi khi nhận lời khuyên từ AI. Vui lòng thử lại.');
        setAdvice('Không thể tải lời khuyên vào lúc này. Tuy nhiên, dựa vào kết quả của bạn, hãy luôn cẩn trọng khi online, không chia sẻ thông tin cá nhân và xác minh kỹ các yêu cầu lạ.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvice();
  }, [score, riskLevelName]);

  const content = {
    [RiskLevel.SAFE]: {
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-500',
      icon: <SafeIcon />,
      title: 'Mức độ An toàn: TỐT 🟢',
    },
    [RiskLevel.MEDIUM_RISK]: {
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-500',
      icon: <MediumRiskIcon />,
      title: 'Mức độ Rủi ro: TRUNG BÌNH 🟡',
    },
    [RiskLevel.HIGH_RISK]: {
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-500',
      icon: <HighRiskIcon />,
      title: 'CẢNH BÁO NGUY CƠ CAO 🔴',
    },
    [RiskLevel.NONE]: null
  }[riskLevel];


  if (!content) return null;

  return (
    <div id="result-section" className={`p-6 sm:p-8 rounded-2xl border-2 shadow-xl transition-all duration-500 backdrop-blur-md ${content.bgColor} ${content.borderColor}`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">{content.icon}</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{content.title}</h2>
        <p className="mt-2 text-xl font-bold text-slate-700">Điểm số của bạn: {score}</p>
      </div>

      <div className="mt-6 bg-white/70 p-5 rounded-lg border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.75 1.75a.75.75 0 11-1.06-1.06l1.75-1.75a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 01-1.06 0l-1.75-1.75a.75.75 0 011.06-1.06l1.75 1.75a.75.75 0 010 1.06zM12 17.25a.75.75 0 01-.75.75v2.5a.75.75 0 011.5 0v-2.5a.75.75 0 01-.75-.75zM6.106 17.894a.75.75 0 010-1.06l1.75-1.75a.75.75 0 111.06 1.06l-1.75 1.75a.75.75 0 01-1.06 0zM4.25 12a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zM6.106 6.106a.75.75 0 011.06 0l1.75 1.75a.75.75 0 11-1.06 1.06L6.106 7.166a.75.75 0 010-1.06z"/></svg>
            Lời khuyên từ Trợ lý AI
        </h3>
        <div className="mt-3 text-slate-700 space-y-2 prose prose-slate max-w-none">
            {isLoading && <AILoadingSpinner />}
            {error && <p className="text-red-600">{error}</p>}
            {!isLoading && advice.split('\n').map((line, index) => {
                line = line.trim();
                if (line.startsWith('- ')) {
                    return <p key={index} className="flex items-start"><span className="mr-2 mt-1">🔹</span><span>{line.substring(2)}</span></p>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold">{line.substring(2, line.length - 2)}</p>
                }
                return <p key={index}>{line}</p>;
            })}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button
            onClick={onReset}
            className="px-8 py-3 font-semibold text-slate-700 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors shadow-sm"
        >
            Quay về Trang chủ
        </button>
      </div>
    </div>
  );
};
