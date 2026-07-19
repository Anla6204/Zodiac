# Spec: Zodiac Web App (MVP)

**Status:** draft

## Goal
Tạo một ứng dụng web về cung hoàng đạo (Zodiac) mang tính cá nhân hóa cao cho người dùng, cung cấp bản đồ sao và thông tin chiêm tinh tập trung vào sự tự phản tỉnh (self-reflection). Ứng dụng cần hỗ trợ đa ngôn ngữ (Anh/Việt) và đặc biệt tránh các rủi ro về quyền riêng tư dữ liệu cũng như thông tin dự đoán tiêu cực.

## Requirements
- KHI người dùng nhập thông tin ngày, giờ và địa điểm sinh THÌ hệ thống tạo ra bản đồ sao cá nhân (natal chart) cơ bản.
- KHI người dùng xem thông tin chiêm tinh hàng ngày THÌ hệ thống cung cấp các lời khuyên mang tính tích cực và định hướng (empowerment), thay vì dọa dẫm (fear-based).
- KHI hệ thống lưu trữ thông tin ngày giờ sinh của người dùng THÌ dữ liệu phải được mã hóa an toàn, áp dụng nguyên tắc tối thiểu hóa dữ liệu (chỉ thu thập những gì thật sự cần thiết).
- KHI người dùng muốn so sánh bản đồ sao với người khác THÌ hệ thống cho phép hiển thị đánh giá mức độ tương hợp (synastry) một cách dễ hiểu.
- KHI người dùng truy cập ứng dụng THÌ họ có thể linh hoạt chuyển đổi ngôn ngữ giữa tiếng Anh và tiếng Việt.

## Out of scope
- Tích hợp tính năng gọi điện trực tiếp/tư vấn (live consultation) với chuyên gia chiêm tinh (để giảm thiểu chi phí và độ phức tạp cho phiên bản MVP).
- Các dự đoán cực đoan hoặc mang tính rủi ro, đe dọa (fear-based marketing) nhằm mục đích giữ chân người dùng.
- Việc chia sẻ hoặc bán dữ liệu cá nhân của người dùng cho bên thứ ba (tuyệt đối không thực hiện để bảo đảm quyền riêng tư).
- Tính năng mạng xã hội, diễn đàn cộng đồng phức tạp.

## Acceptance criteria
- [ ] Ứng dụng web hoạt động ổn định và hỗ trợ chuyển đổi giữa Tiếng Anh và Tiếng Việt.
- [ ] Người dùng có thể nhập thông tin ngày, giờ, nơi sinh và nhận được hiển thị bản đồ sao cá nhân hóa.
- [ ] Dữ liệu nhạy cảm (ngày, giờ, nơi sinh) được mã hóa (encrypted) trước khi lưu vào cơ sở dữ liệu.
- [ ] Các tính năng cốt lõi (xem bản đồ sao, đánh giá tương hợp) mang lại trải nghiệm mượt mà, thiết kế hiện đại (UI/UX chất lượng cao, responsive).
- [ ] Nội dung chiêm tinh hiển thị trên ứng dụng mang tính xây dựng, định hướng phát triển bản thân.

## Các rủi ro cần đặc biệt chú ý và phòng tránh (Risks to mitigate)
- **Quyền riêng tư dữ liệu (Privacy Data Risk):** Dữ liệu chiêm tinh rất nhạy cảm (có thể dùng để nhận diện hoặc lập hồ sơ tâm lý). Cần thiết kế chính sách bảo mật minh bạch, áp dụng mã hóa dữ liệu nghiêm ngặt.
- **Rủi ro đạo đức (Ethical Risk):** Tránh lạm dụng sự mê tín hoặc lo lắng của người dùng thông qua các thông báo đáng sợ (ví dụ: "Sao Thủy nghịch hành, bạn sẽ gặp thảm họa").
- **Tính chính xác và Mở rộng (Scalability & Accuracy):** Không nên dựa hoàn toàn vào các nội dung tạo tự động hời hợt; nên có cơ sở dữ liệu chiêm tinh đáng tin cậy. Đảm bảo backend có khả năng mở rộng khi lượng truy cập tăng.
