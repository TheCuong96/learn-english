# Hướng dẫn lưu và phục hồi lịch sử chat

## Nguyên nhân lịch sử bị mất:
1. **Cache bị xóa**: Trình duyệt hoặc ứng dụng xóa cache
2. **Phiên làm việc hết hạn**: Session timeout
3. **Cập nhật phần mềm**: Cursor update có thể reset data
4. **Lỗi đồng bộ**: Sync giữa các thiết bị bị lỗi

## Cách phục hồi:
1. **Kiểm tra Cursor Settings**:
   - Mở Settings → Account → Check sync status
   - Xem có option "Restore from backup" không

2. **Kiểm tra local storage**:
   - Trong Cursor, nhấn Ctrl+Shift+P (hoặc Cmd+Shift+P trên Mac)
   - Tìm "Developer: Toggle Developer Tools"
   - Vào tab Application → Local Storage

3. **Liên hệ support**:
   - Email: support@cursor.sh
   - Discord: https://discord.gg/cursor

## Cách backup thủ công:
1. Copy toàn bộ conversation
2. Lưu vào file .txt hoặc .md
3. Đặt trong thư mục `/workspace/chat_history/`

## Script tự động backup:
Chạy lệnh: `./save_chat_history.sh`

## Tips phòng tránh:
- Định kỳ export important conversations
- Bật auto-sync trong settings
- Sử dụng Cursor với tài khoản đăng nhập
- Không clear cache/data thường xuyên