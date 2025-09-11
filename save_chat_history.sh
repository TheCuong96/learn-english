#!/bin/bash

# Script để lưu lịch sử chat
# Bạn có thể chạy script này định kỳ để backup lịch sử

HISTORY_DIR="/workspace/chat_history"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$HISTORY_DIR/chat_backup_$TIMESTAMP.txt"

# Tạo thư mục nếu chưa tồn tại
mkdir -p "$HISTORY_DIR"

echo "Script backup lịch sử chat - $TIMESTAMP" > "$BACKUP_FILE"
echo "==========================================" >> "$BACKUP_FILE"
echo "" >> "$BACKUP_FILE"

# Thêm nội dung chat vào đây
# Ví dụ: copy paste lịch sử chat của bạn vào file này

echo "Backup đã được lưu tại: $BACKUP_FILE"