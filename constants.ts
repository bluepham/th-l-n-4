import type { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  // Phần A: Hành vi sử dụng mạng
  {
    id: 'a1',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên bị thu hút bởi các tin nhắn tuyển dụng và đã nhấn vào link để đăng ký hoặc tìm hiểu thêm không?',
    options: [
      { text: 'Không, tôi luôn bỏ qua chúng.', score: 0 },
      { text: 'Thỉnh thoảng có tò mò nhấn vào xem thử.', score: 1 },
      { text: 'Đã từng đăng ký hoặc cung cấp thông tin cá nhân.', score: 2 },
    ],
  },
  {
    id: 'a2',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có từng kết bạn hoặc trò chuyện với những người lạ trên mạng xã hội không?',
    options: [
      { text: 'Không, tôi chỉ kết bạn với người quen.', score: 0 },
      { text: 'Thỉnh thoảng, nhưng tôi luôn giữ thái độ cảnh giác.', score: 1 },
      { text: 'Thường xuyên, tôi khá cởi mở.', score: 2 },
    ],
  },
  {
    id: 'a3',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên tải và cài đặt ứng dụng từ các nguồn không chính thống (ngoài App Store hoặc Google Play) không?',
    options: [
      { text: 'Không, tôi chỉ tải từ cửa hàng ứng dụng chính thức.', score: 0 },
      { text: 'Thỉnh thoảng, chỉ khi thực sự cần.', score: 1 },
      { text: 'Thường xuyên, tôi không thấy có vấn đề gì.', score: 2 },
    ],
  },
  {
    id: 'a4',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên công khai chia sẻ thông tin vị trí (check-in) hoặc lịch trình cá nhân của mình trên mạng xã hội không?',
    options: [
      { text: 'Không, tôi giữ kín thông tin này.', score: 0 },
      { text: 'Thỉnh thoảng, với bạn bè thân thiết.', score: 1 },
      { text: 'Thường xuyên, tôi thích cập nhật cuộc sống.', score: 2 },
    ],
  },
  {
    id: 'a5',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên sử dụng các mạng Wi-Fi công cộng (quán cà phê, sân bay) để thực hiện các giao dịch nhạy cảm như chuyển khoản ngân hàng không?',
    options: [
      { text: 'Không, tôi chỉ dùng 4G/5G hoặc mạng Wi-Fi tin cậy.', score: 0 },
      { text: 'Thỉnh thoảng, nếu không còn lựa chọn nào khác.', score: 1 },
      { text: 'Thường xuyên, vì nó tiện lợi.', score: 2 },
    ],
  },
   {
    id: 'a6',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên bấm vào các đường link giảm giá sốc, trúng thưởng hoặc quà tặng 0 đồng trên mạng xã hội không?',
    options: [
      { text: 'Không, tôi luôn nghi ngờ các đường link này.', score: 0 },
      { text: 'Thỉnh thoảng, nếu thấy nội dung hấp dẫn.', score: 1 },
      { text: 'Thường xuyên, vì biết đâu là thật.', score: 2 },
    ],
  },
  {
    id: 'a7',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Khi mua hàng online, bạn có thường xuyên chuyển khoản trước cho người bán hàng không?',
    options: [
      { text: 'Không, tôi chỉ thanh toán khi nhận hàng.', score: 0 },
      { text: 'Thỉnh thoảng, nhưng chỉ khi cảm thấy người bán đáng tin.', score: 1 },
      { text: 'Thường xuyên, để được giảm giá hoặc giao nhanh.', score: 2 },
    ],
  },
   {
    id: 'a8',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên sử dụng chung tài khoản hoặc chia sẻ mật khẩu mạng xã hội với bạn bè, người thân không?',
    options: [
      { text: 'Không bao giờ.', score: 0 },
      { text: 'Thỉnh thoảng, chỉ khi cần thiết.', score: 1 },
      { text: 'Thường xuyên, vì tôi thấy tiện và không có gì đáng lo.', score: 2 },
    ],
  },
   {
    id: 'a9',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có sử dụng chung một mật khẩu cho nhiều tài khoản quan trọng (email, ngân hàng, mạng xã hội) không?',
    options: [
      { text: 'Không, mỗi tài khoản một mật khẩu riêng.', score: 0 },
      { text: 'Có, tôi dùng chung cho một vài tài khoản.', score: 1 },
      { text: 'Có, tôi dùng một mật khẩu cho tất cả tài khoản.', score: 2 },
    ],
  },
  // Phần B: Nhận thức & Hiểu biết
  {
    id: 'b10',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có nghĩ rằng việc chia sẻ mã OTP, mật khẩu, hoặc thông tin CCCD cho người khác là an toàn không?',
    options: [
      { text: 'Hoàn toàn không, đó là thông tin tuyệt mật.', score: 0 },
      { text: 'Tôi không chắc chắn lắm.', score: 1 },
      { text: 'An toàn nếu họ là người có thẩm quyền.', score: 2 },
    ],
  },
  {
    id: 'b11',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có cho rằng cơ quan chức năng (Công an, Viện kiểm sát) sẽ làm việc và yêu cầu chuyển tiền qua điện thoại hoặc mạng xã hội không?',
    options: [
      { text: 'Không, họ luôn làm việc trực tiếp và có văn bản chính thức.', score: 0 },
      { text: 'Tôi không chắc, có thể trong trường hợp khẩn cấp.', score: 1 },
      { text: 'Có, tôi nghĩ đó là cách làm việc linh hoạt trong thời đại số.', score: 2 },
    ],
  },
   {
    id: 'b12',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có cho rằng Wi-Fi công cộng là môi trường an toàn để đăng nhập các tài khoản quan trọng không?',
    options: [
      { text: 'Hoàn toàn không an toàn.', score: 0 },
      { text: 'Tùy tình huống.', score: 1 },
      { text: 'An toàn, tôi vẫn thường làm vậy.', score: 2 },
    ],
  },
  {
    id: 'b13',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn đánh giá nguy cơ lừa đảo online ở học sinh hiện nay là?',
    options: [
      { text: 'Rất cao.', score: 0 },
      { text: 'Trung bình.', score: 1 },
      { text: 'Thấp.', score: 2 },
    ],
  },
  {
    id: 'b14',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có biết rằng một số phần mềm diệt virus không chính thống có thể chứa mã độc hoặc đánh cắp thông tin không?',
    options: [
      { text: 'Có, vì vậy tôi chỉ tải từ các nguồn tin cậy.', score: 0 },
      { text: 'Có nghe nhưng không biết rõ nguy hiểm thế nào.', score: 1 },
      { text: 'Không biết.', score: 2 },
    ],
  },
   {
    id: 'b15',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Theo bạn, "Tấn công giả mạo" (Phishing) là gì?',
    options: [
      { text: 'Là hình thức lừa đảo để lấy thông tin nhạy cảm (mật khẩu, thẻ tín dụng) qua các trang web/email giả mạo.', score: 0 },
      { text: 'Là một loại virus máy tính.', score: 1 },
      { text: 'Tôi không rõ về thuật ngữ này.', score: 2 },
    ],
  },
   {
    id: 'b16',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có biết cách kiểm tra tính an toàn của một đường link hoặc trang web trước khi truy cập không?',
    options: [
      { text: 'Có, tôi thường kiểm tra.', score: 0 },
      { text: 'Có, nhưng tôi ít khi áp dụng.', score: 1 },
      { text: 'Không biết cách kiểm tra.', score: 2 },
    ],
  },
  {
    id: 'b17',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có biết rằng Wi-Fi công cộng có thể bị hacker chặn dữ liệu để lấy thông tin cá nhân không?',
    options: [
      { text: 'Có, và tôi luôn cẩn thận.', score: 0 },
      { text: 'Có nghe nhưng không rõ nguy hiểm thế nào.', score: 1 },
      { text: 'Không biết.', score: 2 },
    ],
  },
  {
    id: 'b18',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có biết tính năng Xác thực hai yếu tố (2FA) là gì và công dụng của nó không?',
    options: [
      { text: 'Biết rõ và đã kích hoạt cho các tài khoản quan trọng.', score: 0 },
      { text: 'Có nghe nhưng chưa dùng.', score: 1 },
      { text: 'Không biết.', score: 2 },
    ],
  },
  // Phần C: Phản ứng tình huống
   {
    id: 'c19',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Khi nhận email thông báo "tài khoản gặp sự cố" có chứa link thông báo chi tiết về sự cố, bạn sẽ:',
    options: [
      { text: 'Kiểm tra kỹ nguồn gửi trước khi nhấn vào link.', score: 0 },
      { text: 'Không quan tâm.', score: 1 },
      { text: 'Nhấn vào link để xem chi tiết sự cố.', score: 2 },
    ],
  },
  {
    id: 'c20',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Nếu có người tự xưng là Công an gọi điện, nói bạn liên quan đến một vụ án và yêu cầu bạn "bí mật hợp tác điều tra" bằng cách tự đến một nơi vắng vẻ hoặc khách sạn, bạn sẽ làm gì?',
    options: [
      { text: 'Ngắt máy, báo cho gia đình và gọi đến số điện thoại công khai của cơ quan công an để xác minh.', score: 0 },
      { text: 'Hoang mang, cân nhắc làm theo vì sợ hãi.', score: 1 },
      { text: 'Làm theo yêu cầu vì tin rằng đó là quy trình điều tra.', score: 2 },
    ],
  },
  {
    id: 'c21',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Khi nhận được một thông báo (qua email, tin nhắn) rằng bạn đã vi phạm pháp luật và phải chuyển tiền để "giải quyết nhanh", phản ứng đầu tiên của bạn là gì?',
    options: [
      { text: 'Nhận định đây là lừa đảo, chặn và xóa tin nhắn.', score: 0 },
      { text: 'Lo lắng và tìm cách liên hệ lại với người gửi để hỏi rõ.', score: 1 },
      { text: 'Hoảng sợ và cân nhắc chuyển một khoản tiền nhỏ để "thoát tội".', score: 2 },
    ],
  },
  {
    id: 'c22',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Một người bạn thân bất ngờ nhắn tin vay một khoản tiền với lý do khẩn cấp và cung cấp một số tài khoản ngân hàng lạ. Bạn sẽ làm gì?',
    options: [
      { text: 'Gọi điện thoại trực tiếp cho bạn đó để xác nhận trước khi làm bất cứ điều gì.', score: 0 },
      { text: 'Nhắn tin hỏi lại vài câu để xác minh.', score: 1 },
      { text: 'Chuyển tiền ngay vì tin tưởng bạn bè.', score: 2 },
    ],
  },
  {
    id: 'c23',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Bạn nhận được email/tin nhắn đe dọa, nói rằng họ có hình ảnh/thông tin nhạy cảm của bạn và yêu cầu tiền chuộc. Bạn sẽ?',
    options: [
      { text: 'Bình tĩnh, không trả lời, chặn kẻ đó và báo cho người thân/cơ quan chức năng.', score: 0 },
      { text: 'Hoảng sợ, trả lời tin nhắn để thương lượng.', score: 1 },
      { text: 'Tìm cách xoay tiền để trả cho họ vì quá sợ hãi.', score: 2 },
    ],
  },
  {
    id: 'c24',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Nếu phát hiện mình đã vô tình cung cấp thông tin cá nhân cho một trang web giả mạo, bạn sẽ:',
    options: [
      { text: 'Đổi mật khẩu tài khoản đó ngay lập tức, bật xác thực 2 yếu tố và kiểm tra các hoạt động bất thường.', score: 0 },
      { text: 'Chờ xem có chuyện gì xảy ra không rồi mới tính.', score: 1 },
      { text: 'Không làm gì cả vì nghĩ rằng không có gì nghiêm trọng.', score: 2 },
    ],
  },
  {
    id: 'c25',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Nếu nhận được link trúng thưởng đặc biệt từ người quen gửi, bạn sẽ:',
    options: [
      { text: 'Gọi điện hỏi người quen đó có thực sự gửi không.', score: 0 },
      { text: 'Bỏ qua, không bấm vào.', score: 1 },
      { text: 'Nhấn vào để xem và làm theo hướng dẫn vì tin tưởng họ.', score: 2 },
    ],
  },
  {
    id: 'c26',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Khi đang chơi game online và được gợi ý mua vật phẩm rẻ hơn thị trường qua một website ngoài, bạn sẽ:',
    options: [
      { text: 'Không mua vì nghi ngờ.', score: 0 },
      { text: 'Tìm hiểu và hỏi ý kiến bạn bè.', score: 1 },
      { text: 'Mua thử vì thấy rẻ.', score: 2 },
    ],
  },
  {
    id: 'c27',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Nếu một người bạn của bạn vừa bị lừa đảo online, bạn sẽ nghĩ gì trước tiên?',
    options: [
      { text: '“Mình cần tìm hiểu kỹ xem thủ đoạn lừa đảo này như thế nào để phòng tránh.”', score: 0 },
      { text: '“Mình thấy lo vì mình có thể gặp tình huống tương tự.”', score: 1 },
      { text: '“Bạn ấy thiếu cảnh giác quá, mình thì sẽ không bao giờ mắc phải đâu.”', score: 2 },
    ],
  },
];
