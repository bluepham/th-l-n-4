
import React, { useState, useCallback, useEffect } from 'react';
import { RoleSelection } from './components/RoleSelection';
import { StudentInfoForm } from './components/StudentInfoForm';
import { TeacherDashboard } from './components/TeacherDashboard';
import { TeacherLogin } from './components/TeacherLogin';
import { QuizForm } from './components/QuizForm';
import { ResultDisplay } from './components/ResultDisplay';
import { QUIZ_QUESTIONS } from './constants';
import { RiskLevel, type StudentInfo, type StudentData } from './types';

// --- LỚP DỊCH VỤ LƯU TRỮ ---
// Giao diện chung cho việc xử lý dữ liệu.
interface IDataStore {
  getAllStudentData(): Promise<StudentData[]>;
  saveStudentData(data: StudentData): Promise<void>;
}

/**
 * Lớp này giao tiếp với backend API thực sự.
 * Đây là giải pháp để dữ liệu được tập trung và chia sẻ giữa các người dùng.
 */
class ApiStore implements IDataStore {
  private baseUrl = '/api'; // Sử dụng API route của Vercel

  async getAllStudentData(): Promise<StudentData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/students`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.statusText}`, errorText);
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu từ API:", error);
      return []; // Trả về mảng rỗng để UI không bị crash
    }
  }

  async saveStudentData(newSubmission: StudentData): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubmission),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.statusText}`, errorText);
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên API:", error);
      throw error; // Ném lỗi để báo hiệu việc lưu thất bại
    }
  }
}

// Sử dụng ApiStore để ứng dụng hoạt động với backend.
const dataStore: IDataStore = new ApiStore();


function App() {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const [studentStep, setStudentStep] = useState<'info' | 'quiz' | 'result'>('info');
  const [teacherAuthenticated, setTeacherAuthenticated] = useState<boolean>(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number, riskLevel: RiskLevel, riskLevelName: string } | null>(null);
  
  const [allStudentData, setAllStudentData] = useState<StudentData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);


  useEffect(() => {
    // Chỉ tải dữ liệu khi giáo viên đã xác thực để xem dashboard
    if (role === 'teacher' && teacherAuthenticated) {
      const fetchData = async () => {
        setIsLoadingData(true);
        const data = await dataStore.getAllStudentData();
        setAllStudentData(data);
        setIsLoadingData(false);
      };
      fetchData();
    }
  }, [role, teacherAuthenticated]);


  const handleSetRole = useCallback((selectedRole: 'student' | 'teacher') => {
    setRole(selectedRole);
    if (selectedRole !== 'teacher') {
        setTeacherAuthenticated(false);
    }
  }, []);
  
  const handleStartQuiz = useCallback((info: StudentInfo) => {
    setStudentInfo(info);
    setStudentStep('quiz');
  }, []);

  const handleQuizSubmit = useCallback(async (scores: Record<string, number>) => {
    if (!studentInfo) return;

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    let riskLevel: RiskLevel;
    let riskLevelName: string;

    if (totalScore <= 15) {
      riskLevel = RiskLevel.SAFE;
      riskLevelName = 'An toàn';
    } else if (totalScore <= 35) {
      riskLevel = RiskLevel.MEDIUM_RISK;
      riskLevelName = 'Rủi ro Trung bình';
    } else {
      riskLevel = RiskLevel.HIGH_RISK;
      riskLevelName = 'Rủi ro Cao';
    }
    
    const result = { score: totalScore, riskLevel, riskLevelName };

    // 1. Cập nhật UI ngay lập tức để hiển thị kết quả cho người dùng.
    setQuizResult(result);
    setStudentStep('result');
    setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // 2. Chuẩn bị dữ liệu và cố gắng lưu vào backend trong nền.
    const newSubmission: StudentData = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      ...studentInfo,
      ...result,
      timestamp: Date.now()
    };
    
    try {
        await dataStore.saveStudentData(newSubmission);
    } catch (error) {
        // Lỗi lưu trữ không còn chặn người dùng xem kết quả.
        // Ghi lại lỗi để gỡ lỗi mà không làm phiền người dùng bằng một cửa sổ bật lên.
        console.error("Không thể lưu bài nộp lên máy chủ. Lỗi:", error);
    }
  }, [studentInfo]);
  
  const handleReset = useCallback(() => {
    setRole(null);
    setStudentStep('info');
    setStudentInfo(null);
    setQuizResult(null);
    setTeacherAuthenticated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTeacherLogin = useCallback((password: string): boolean => {
    if (password === 'admin') {
        setTeacherAuthenticated(true);
        return true;
    }
    return false;
  }, []);

  const renderContent = () => {
    if (role === 'teacher') {
      if (teacherAuthenticated) {
        return <TeacherDashboard allStudentData={allStudentData} onBack={handleReset} isLoading={isLoadingData} />;
      }
      return <TeacherLogin onLogin={handleTeacherLogin} onBack={handleReset} />;
    }
    
    if (role === 'student') {
      switch (studentStep) {
        case 'info':
          return <StudentInfoForm onSubmit={handleStartQuiz} onBack={handleReset} />;
        case 'quiz':
          return <QuizForm questions={QUIZ_QUESTIONS} onSubmit={handleQuizSubmit} isSubmitted={false} />;
        case 'result':
          if (quizResult) {
            return <ResultDisplay result={quizResult} onReset={handleReset} />;
          }
          return null;
        default:
          return <RoleSelection onSelectRole={handleSetRole} />;
      }
    }
    
    return <RoleSelection onSelectRole={handleSetRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 text-slate-800">
      <main className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {renderContent()}
      </main>
       <footer className="text-center py-8 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} An Toàn Mạng. Một dự án cộng đồng vì không gian mạng an toàn hơn.</p>
      </footer>
    </div>
  );
}

export default App;
