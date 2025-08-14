
import React, { useState, Fragment } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) {
    return null;
  }
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message) {
      alert('Vui lòng chọn người nhận và nhập nội dung tin nhắn.');
      return;
    }
    
    console.log('--- TIN NHẮN ẨN DANH ĐƯỢC GỬI ---');
    console.log('Người nhận:', recipient);
    console.log('Nội dung:', message);
    console.log('Lưu ý: Đây là chức năng giả lập. Trên thực tế, tin nhắn sẽ được gửi qua một dịch vụ backend như Firebase.');

    setIsSent(true);
    setTimeout(() => {
        handleClose();
    }, 3000); // Auto-close after 3 seconds
  };
  
  const handleClose = () => {
    setIsSent(false);
    setRecipient('');
    setMessage('');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={handleClose}>
      <div 
        className="relative bg-white w-full max-w-md m-4 p-8 rounded-2xl shadow-2xl transform transition-all duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors">
            <CloseIcon />
        </button>

        {!isSent ? (
            <Fragment>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Gửi Yêu Cầu Hỗ Trợ Ẩn Danh</h2>
                <p className="text-slate-600 mb-6">Thông tin của bạn sẽ được giữ bí mật. Tin nhắn sẽ được gửi đi mà không kèm theo tên hay IP.</p>
                <form onSubmit={handleSend}>
                    <div className="mb-4">
                        <label className="block text-slate-700 font-medium mb-2">Bạn muốn gửi tin nhắn tới:</label>
                        <select
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>-- Chọn người nhận --</option>
                            <option value="teacher">🧑‍🏫 Giáo viên</option>
                            <option value="psychologist">👨‍⚕️ Chuyên gia tâm lý</option>
                            <option value="relative">👨‍👩‍👧‍👦 Người thân đã đăng ký</option>
                        </select>
                    </div>
                    <div className="mb-6">
                         <label htmlFor="message" className="block text-slate-700 font-medium mb-2">Nội dung tin nhắn:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Hãy chia sẻ vấn đề bạn đang gặp phải..."
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                    >
                        Gửi Tin Nhắn
                    </button>
                </form>
            </Fragment>
        ) : (
            <div className="text-center">
                <SuccessIcon />
                <h2 className="text-2xl font-bold text-slate-900 mt-4">Gửi thành công!</h2>
                <p className="text-slate-600 mt-2">Yêu cầu hỗ trợ của bạn đã được gửi đi. Chúng tôi sẽ liên hệ lại nếu cần thêm thông tin.</p>
            </div>
        )}
      </div>
    </div>
  );
};
