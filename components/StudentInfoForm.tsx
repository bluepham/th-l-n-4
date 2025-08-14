import React, { useState } from 'react';
import type { StudentInfo } from '../types';

interface StudentInfoFormProps {
  onSubmit: (info: StudentInfo) => void;
  onBack: () => void;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({ onSubmit, onBack }) => {
  const [info, setInfo] = useState<StudentInfo>({
    fullName: '',
    className: '',
    school: '',
    province: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(info).some(field => field.trim() === '')) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    onSubmit(info);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-lg transition-all duration-500">
       <button onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6">
          &larr; Quay lại chọn vai trò
        </button>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Thông tin Học sinh</h1>
        <p className="mt-4 text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Vui lòng cung cấp thông tin của bạn để bắt đầu bài khảo sát.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-bold text-slate-700 mb-1">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={info.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>
        <div>
          <label htmlFor="className" className="block text-sm font-bold text-slate-700 mb-1">Lớp</label>
          <input
            type="text"
            id="className"
            name="className"
            value={info.className}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="11A1"
            required
          />
        </div>
        <div>
          <label htmlFor="school" className="block text-sm font-bold text-slate-700 mb-1">Trường</label>
          <input
            type="text"
            id="school"
            name="school"
            value={info.school}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="THPT Chuyên..."
            required
          />
        </div>
        <div>
          <label htmlFor="province" className="block text-sm font-bold text-slate-700 mb-1">Tỉnh/Thành phố</label>
          <input
            type="text"
            id="province"
            name="province"
            value={info.province}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="TP. Hồ Chí Minh"
            required
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-md hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            Bắt đầu Khảo sát
          </button>
        </div>
      </form>
    </div>
  );
};
