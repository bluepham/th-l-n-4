import React, { useMemo, useState } from 'react';
import { type StudentData, RiskLevel } from '../types';

declare var XLSX: any;

interface TeacherDashboardProps {
  allStudentData: StudentData[];
  onBack: () => void;
  isLoading: boolean;
}

// Icons
const StatIconTotal = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const StatIconSafe = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1.05 14.54L6.41 11l1.42-1.41L10.95 12.7l4.24-4.24L16.6 10l-5.65 5.54z"/></svg>;
const StatIconMedium = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v7z"/></svg>;
const StatIconHigh = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm0-4.3c-.72 0-1.3-.58-1.3-1.3V8c0-.72.58-1.3 1.3-1.3s1.3.58 1.3 1.3v3.7c0 .72-.58 1.3-1.3 1.3z"/></svg>;
const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-10">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-slate-600 font-semibold">Đang tải dữ liệu học sinh...</p>
    </div>
);


const getRiskLevelStyles = (level: RiskLevel) => {
  switch (level) {
    case RiskLevel.SAFE:
      return 'bg-green-100 text-green-800';
    case RiskLevel.MEDIUM_RISK:
      return 'bg-yellow-100 text-yellow-800';
    case RiskLevel.HIGH_RISK:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ allStudentData, onBack, isLoading }) => {
  const [isExporting, setIsExporting] = useState(false);

  const stats = useMemo(() => {
    return allStudentData.reduce((acc, student) => {
      if (student.riskLevel === RiskLevel.SAFE) acc.safe++;
      if (student.riskLevel === RiskLevel.MEDIUM_RISK) acc.medium++;
      if (student.riskLevel === RiskLevel.HIGH_RISK) acc.high++;
      acc.total++;
      return acc;
    }, { safe: 0, medium: 0, high: 0, total: 0 });
  }, [allStudentData]);

  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);

    const processExport = () => {
      try {
        const dataToExport = allStudentData.map(d => ({
            'Họ và Tên': d.fullName,
            'Lớp': d.className,
            'Trường': d.school,
            'Tỉnh/Thành phố': d.province,
            'Điểm': d.score,
            'Mức độ rủi ro': d.riskLevelName,
            'Thời gian làm bài': new Date(d.timestamp).toLocaleString('vi-VN'),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dữ liệu khảo sát");
        XLSX.writeFile(workbook, "BaoCaoKhaoSatAnToanMang.xlsx");
      } catch (error) {
        console.error("Failed to export data to Excel:", error);
        alert("Đã xảy ra lỗi khi xuất file Excel.");
      } finally {
        setIsExporting(false);
      }
    };

    if (typeof XLSX !== 'undefined') {
      processExport();
      return;
    }
    
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    script.onload = processExport;
    script.onerror = () => {
        alert('Lỗi: Thư viện xuất file chưa được tải. Vui lòng kiểm tra kết nối mạng và thử lại.');
        setIsExporting(false);
    };
    document.head.appendChild(script);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
                 <button onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-2">
                    &larr; Quay lại Trang chủ
                 </button>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bảng điều khiển của Giáo viên</h1>
                <p className="mt-1 text-slate-600">Thống kê và dữ liệu chi tiết từ các bài khảo sát của học sinh.</p>
            </div>
            <button
                onClick={handleExport}
                disabled={allStudentData.length === 0 || isExporting}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                {isExporting ? 'Đang xử lý...' : 'Xuất File Excel'}
            </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100/60 p-5 rounded-xl flex items-center gap-4">
            <StatIconTotal />
            <div>
                <h3 className="text-sm font-bold text-blue-800">TỔNG SỐ LƯỢT</h3>
                <p className="text-3xl font-extrabold text-blue-900 mt-1">{stats.total}</p>
            </div>
        </div>
        <div className="bg-green-100/60 p-5 rounded-xl flex items-center gap-4">
            <StatIconSafe />
            <div>
                <h3 className="text-sm font-bold text-green-800">AN TOÀN</h3>
                <p className="text-3xl font-extrabold text-green-900 mt-1">{stats.safe}</p>
            </div>
        </div>
        <div className="bg-yellow-100/60 p-5 rounded-xl flex items-center gap-4">
            <StatIconMedium />
            <div>
                <h3 className="text-sm font-bold text-yellow-800">RỦI RO TRUNG BÌNH</h3>
                <p className="text-3xl font-extrabold text-yellow-900 mt-1">{stats.medium}</p>
            </div>
        </div>
        <div className="bg-red-100/60 p-5 rounded-xl flex items-center gap-4">
            <StatIconHigh />
            <div>
                <h3 className="text-sm font-bold text-red-800">RỦI RO CAO</h3>
                <p className="text-3xl font-extrabold text-red-900 mt-1">{stats.high}</p>
            </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white/50 rounded-lg shadow-sm">
        {isLoading ? <LoadingSpinner /> : (
            <table className="min-w-full">
            <thead className="border-b border-slate-200">
                <tr>
                <th className="py-3 px-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Họ và Tên</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Lớp</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Trường</th>
                <th className="py-3 px-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm</th>
                <th className="py-3 px-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Mức Độ</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
                {allStudentData.length > 0 ? (
                    allStudentData.sort((a,b) => b.timestamp - a.timestamp).map(student => (
                    <tr key={student.id} className="hover:bg-slate-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-slate-900">{student.fullName}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-slate-600">{student.className}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-slate-600">{student.school}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-slate-800 font-bold text-center">{student.score}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getRiskLevelStyles(student.riskLevel)}`}>
                        {student.riskLevelName}
                        </span>
                    </td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center py-10 text-slate-500">
                            Chưa có dữ liệu học sinh nào.
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};