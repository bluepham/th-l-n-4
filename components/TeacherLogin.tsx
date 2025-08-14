import React, { useState } from 'react';

interface TeacherLoginProps {
  onLogin: (password: string) => boolean;
  onBack: () => void;
}

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
      setPassword('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-lg max-w-md mx-auto transition-all duration-500">
      <button onClick={onBack} className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6">
        &larr; Quay lại chọn vai trò
      </button>
      <div className="text-center">
        <LockIcon />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Xác thực Giáo viên</h1>
        <p className="mt-2 text-slate-600">Vui lòng nhập mật khẩu để truy cập bảng điều khiển.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="password" className="sr-only">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError('');
            }}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="******"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
          >
            Truy cập
          </button>
        </div>
      </form>
    </div>
  );
};
