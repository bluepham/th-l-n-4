import React from 'react';

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'teacher') => void;
}

const StudentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

const TeacherIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/>
    </svg>
);


export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tighter">
                Hệ thống Cảnh báo sớm
                <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                    Lừa đảo Online
                </span>
            </h1>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Phân tích hành vi & nhận thức để cảnh báo sớm các hình thức lừa đảo, dụ dỗ, và "bắt cóc online" trong bối cảnh chuyển đổi số.
            </p>
            <h2 className="mt-12 text-2xl font-bold text-slate-800">Bạn là...</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <button
                    onClick={() => onSelectRole('student')}
                    className="group p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
                >
                    <div className="p-4 rounded-full bg-blue-100/50 mb-4 transition-all duration-300 group-hover:scale-110">
                        <StudentIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Học sinh</h3>
                    <p className="mt-2 text-slate-600">Thực hiện bài khảo sát để đánh giá nguy cơ và nhận lời khuyên từ chuyên gia AI.</p>
                </button>
                <button
                    onClick={() => onSelectRole('teacher')}
                    className="group p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-teal-300 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
                >
                    <div className="p-4 rounded-full bg-teal-100/50 mb-4 transition-all duration-300 group-hover:scale-110">
                        <TeacherIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Giáo viên</h3>
                    <p className="mt-2 text-slate-600">Xem thống kê, quản lý dữ liệu khảo sát và xuất báo cáo.</p>
                </button>
            </div>
        </div>
    );
};
