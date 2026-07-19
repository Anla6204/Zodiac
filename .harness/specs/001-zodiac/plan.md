# Plan: Zodiac Web App (MVP)

**Status:** draft

**Baseline:** `npm --version` -> see `.harness/state/specs/001-zodiac/checks/baseline.status`

## Task 1: Thiết lập Kiến trúc & Công cụ (Architecture & Tools)
- Spec: Dựa trên nghiên cứu chuyên sâu, ứng dụng cần kiến trúc phân lớp rõ ràng để dễ mở rộng và test.
- Files: `frontend/package.json`, `backend/package.json`
- Do:
  - Khởi tạo React (Vite) với cấu trúc thư mục Feature-based (`features/`, `components/`, `services/`).
  - Cài đặt **React Query** (TanStack Query) để quản lý server-state và caching dữ liệu chiêm tinh một cách hiệu quả.
  - Khởi tạo Node.js (Express) với cấu trúc MVC/Modular (Routes, Controllers, Services).
  - Cài đặt **Zod** để validate dữ liệu chặt chẽ từ Frontend đến Backend.
- Verify: Các dự án khởi chạy thành công, thư mục đúng cấu trúc chuẩn.

## Task 2: TDD Backend - Data Validation & Astrology Engine Service
- Spec: Phân tách logic tính toán thiên văn thành Service riêng, validate dữ liệu đầu vào nghiêm ngặt.
- Files: `backend/src/validators/birthData.validator.js`, `backend/src/services/astrologyEngine.js`, `backend/src/controllers/dataController.test.js`
- Do:
  - Áp dụng TDD (Red-Green-Refactor): Viết test đảm bảo dữ liệu sai sẽ bị loại bỏ (sử dụng Zod mock).
  - Xây dựng lớp `Astrology Engine Service` riêng biệt. (Trong TDD, ta sẽ Mock/giả lập kết quả của engine này để unit test chạy nhanh và độc lập).
  - Cài đặt mã hóa dữ liệu bảo vệ thông tin cá nhân.
- Verify: `npm run test` trên Backend pass, với độ bao phủ (coverage) tốt ở phần validate và service.

## Task 3: TDD Frontend - Form Nhập liệu (Zod) & Đa ngôn ngữ
- Spec: Giao diện nhập liệu an toàn, quản lý trạng thái tải (loading/error) chuẩn xác.
- Files: `frontend/src/features/birthForm/BirthForm.test.jsx`, `frontend/src/features/birthForm/BirthForm.jsx`
- Do:
  - Viết test bằng **React Testing Library** tập trung vào hành vi người dùng (behavior-driven) thay vì chi tiết code (vd: test việc nút Submit bị disable khi dữ liệu nhập sai).
  - Tích hợp **React Query** để gọi API backend và cache kết quả biểu đồ.
  - Tích hợp hệ thống Đa ngôn ngữ (i18n).
- Verify: Frontend tests pass, form validate và show thông báo lỗi đúng.

## Task 4: TDD Frontend - Bản đồ sao & Giải nghĩa (Empowerment)
- Spec: Hiển thị bản đồ sao, xử lý dữ liệu phức tạp từ Backend một cách mượt mà.
- Files: `frontend/src/features/chart/ChartDisplay.test.jsx`, `frontend/src/features/chart/ChartDisplay.jsx`
- Do:
  - Viết test mô phỏng dữ liệu chiêm tinh trả về từ React Query, đảm bảo UI render đúng thông điệp (empowerment).
  - Xây dựng giao diện CSS Vanilla cao cấp (Vibrant, Micro-animations) để đồ thị đẹp mắt.
- Verify: Render thành công trên test UI, không xảy ra lỗi parse dữ liệu.

## Task 5: End-to-End Tests (3 Test Cases bằng Playwright)
- Spec: Đảm bảo toàn bộ kiến trúc chạy trơn tru từ Client tới Database/Mock Storage.
- Files: `e2e-tests/zodiac.spec.js`
- Do:
  - Tích hợp 3 test cases: (1) Chuyển đổi ngôn ngữ, (2) Validate form & submit lấy bản đồ sao, (3) Luồng nhập hồ sơ người thứ 2 (Synastry).
- Verify: Lệnh `npx playwright test` mô phỏng trình duyệt và pass 3 test cases.

## Task 6: Luồng Dữ liệu Động & Shareable Token (Phase 4)
- Spec: Dựa trên luồng dữ liệu của các web astrology hiện hành, phân tách rõ việc hiển thị trực tiếp và việc bảo mật dữ liệu.
- Files: `backend/src/controllers/dataController.js`, `frontend/src/features/chart/ChartDisplay.jsx`, `frontend/src/features/birthForm/BirthForm.jsx`
- Do:
  - Backend: Trả về đồng thời `chart` (dữ liệu JSON thô: Sun Sign, Daily Advice) để render UI, và `shareToken` (đoạn mã hóa bằng thuật toán `encrypt`) dùng cho mục đích lưu trữ/chia sẻ.
  - Frontend: Loại bỏ dữ liệu mock/hardcode (Aries) ở `ChartDisplay.jsx`. Thay vào đó, map trực tiếp dữ liệu từ `mutation.data.chart` vào các ô tương ứng.
- Verify: Nhập 2 ngày sinh khác nhau sẽ ra được 2 cung hoàng đạo và lời khuyên khác biệt trực tiếp trên màn hình, giải quyết triệt để lỗi logic lặp lại.

## Task 7: Hyper-Personalization & Zodiac Animations (Phase 5)
- Spec: Lời khuyên cần được cá nhân hóa đến từng cá nhân (theo ngày giờ sinh) thay vì chỉ dùng chung cho 1 cung hoàng đạo. Giao diện cần được thiết kế mang đậm phong cách chiêm tinh, lung linh và có hiệu ứng chuyển động.
- Files: `backend/src/services/astrologyEngine.js`, `frontend/src/features/chart/ChartDisplay.jsx`, `frontend/src/App.css`
- Do:
  - Backend: Thay đổi thuật toán Seeded Hash từ `[Ngày hôm nay] + [Tên Cung]` thành `[Ngày hôm nay] + [Ngày sinh] + [Giờ sinh]`. Điều này giúp những người cùng cung hoàng đạo nhận được lời khuyên khác nhau.
  - Frontend: Bổ sung các icon hoàng đạo tương ứng. Nâng cấp CSS với `@keyframes` tạo hiệu ứng vòng quay chậm (spin) và hiệu ứng ánh sáng nhịp nhàng (pulse-glow) cho các thẻ bài lời khuyên.
- Verify: Nhập `06-02-2004` và `28-01-2004` sẽ ra 2 kết quả hiển thị (lời khuyên, số, màu) hoàn toàn khác nhau, giao diện hiển thị các hiệu ứng động mượt mà.

## Task 8: Redesign & UI Polish (Phase 6)
- Spec: Nâng cấp toàn diện UI/UX theo tiêu chuẩn cao cấp (True Glassmorphism, Micro-interactions, Staggered Animations).
- Files: `frontend/src/index.css`, `frontend/src/App.css`, `frontend/src/features/chart/ChartDisplay.jsx`
- Do:
  - Nâng cấp `glassmorphism` với viền `1px` sáng ở góc trên/trái và `inner shadow` tạo độ sâu quang học thật.
  - Bổ sung hiệu ứng nhiễu hạt (Noise/Grain overlay) cho không gian nền vũ trụ.
  - Cải thiện phản hồi vật lý khi click nút (nhún mượt mà) và hiệu ứng `staggered fade-in` cho từng thông điệp.
- Verify: Giao diện trở nên huyền bí, cao cấp, mượt mà khi tương tác. Hạn chế tối đa các chi tiết "phẳng" nhàm chán.

## Task 9: Categorized Astrology & Bento Grid (Phase 7)
- Spec: Chia nhỏ lời khuyên chiêm tinh thành 4 khía cạnh cụ thể (Tài chính/Sự nghiệp, Tình cảm, Gia đình, Bản thân). Lời khuyên phải mang tính tích cực (Empowerment), không dọa dẫm. Giao diện thay đổi sang dạng lưới bất đối xứng (Bento Grid) chuẩn cao cấp.
- Files: `backend/src/services/astrologyEngine.js`, `frontend/src/features/chart/ChartDisplay.jsx`, `frontend/src/App.css`
- Do:
  - Backend: Viết mới bộ dữ liệu khuyên răn tích cực. Băm (Hash) từng danh mục bằng Seed độc lập `(Ngày_sinh + Ngày_hôm_nay + Loại_danh_mục)` để kết quả xáo trộn tự nhiên.
  - Frontend: Ứng dụng cấu trúc lưới Bento (Ví dụ 60/40 và 40/60) để hiển thị 4 danh mục. Các thẻ bài sử dụng True Glassmorphism hiện có và có hover state nhẹ nhàng.
- Verify: Kết quả trả về chia làm 4 thẻ nội dung rõ ràng, hiển thị layout grid bất đối xứng đẹp mắt, thông điệp tích cực.

## Task 10: Deep Zodiac Overhaul & Form Polish (Phase 8)
- Spec: Thiết kế giao diện thực sự "lung linh" và đậm chất Zodiac thông qua việc áp dụng kỹ thuật Visual Flair cao cấp. Nâng cấp form nhập liệu.
- Files: `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/src/features/birthForm/BirthForm.jsx`, `frontend/src/App.css`
- Do:
  - Bổ sung `Zodiac Wheel` nền mờ ảo, xoay vô tận vào Background.
  - Nâng cấp `BirthForm`: Chuyển Input sang phong cách Underline với hiệu ứng "Floating Label" (Nhãn chữ bay lên khi focus).
  - Nâng cấp Nút Submit với hiệu ứng vệt sáng lấp lánh (Glow Sweep).
- Verify: Trang chủ hiện ra với bánh xe chiêm tinh xoay mượt mà phía sau. Form nhập liệu tương tác sinh động, đúng chất ứng dụng thiết kế cao cấp.
