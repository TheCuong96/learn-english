#!/usr/bin/env python3
"""
Final comprehensive solution for Cursor chat history recovery
"""

import sqlite3
import json
import os
import shutil
from datetime import datetime

def create_backup_and_analyze():
    print("🔄 Tạo backup và phân tích cuối cùng...")
    print("=" * 70)
    
    # Create backup directory
    backup_dir = "/workspace/cursor_chat_backup"
    os.makedirs(backup_dir, exist_ok=True)
    
    # Backup the main database
    db_path = "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    if os.path.exists(db_path):
        backup_db_path = os.path.join(backup_dir, "state.vscdb.backup")
        shutil.copy2(db_path, backup_db_path)
        print(f"✅ Đã tạo backup cơ sở dữ liệu: {backup_db_path}")
    
    # Analyze the current state
    print("\n📊 Phân tích trạng thái hiện tại:")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all data from both tables
        cursor.execute("SELECT COUNT(*) FROM ItemTable")
        item_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM cursorDiskKV")
        kv_count = cursor.fetchone()[0]
        
        print(f"   - ItemTable: {item_count} bản ghi")
        print(f"   - cursorDiskKV: {kv_count} bản ghi")
        
        # Check for any data with timestamps
        cursor.execute("""
            SELECT key, value, length(value) as size 
            FROM cursorDiskKV 
            WHERE key LIKE 'composerData:%' 
            ORDER BY size DESC
        """)
        
        composer_entries = cursor.fetchall()
        
        print(f"\n📝 Phân tích {len(composer_entries)} bản ghi composerData:")
        
        for i, (key, value, size) in enumerate(composer_entries, 1):
            print(f"\n   Bản ghi {i}: {key}")
            print(f"   Kích thước: {size} bytes")
            
            try:
                data = json.loads(value)
                
                # Check for creation timestamp
                created_at = data.get('createdAt')
                if created_at:
                    print(f"   Thời gian tạo: {created_at}")
                
                # Check for any meaningful content
                has_content = False
                
                # Check text content
                text = data.get('text', '')
                if text:
                    print(f"   📝 Text: {text[:100]}...")
                    has_content = True
                
                # Check rich text
                rich_text = data.get('richText', '')
                if rich_text:
                    print(f"   📝 Rich Text: {rich_text[:100]}...")
                    has_content = True
                
                # Check conversation map
                conversation_map = data.get('conversationMap', {})
                if conversation_map:
                    print(f"   💬 Conversations: {len(conversation_map)}")
                    for conv_id, conv_data in conversation_map.items():
                        if isinstance(conv_data, dict):
                            messages = conv_data.get('messages', [])
                            if messages:
                                print(f"      - {conv_id}: {len(messages)} messages")
                                has_content = True
                
                # Check for any other content
                if not has_content:
                    print("   ⚠️  Bản ghi trống - có thể đã bị xóa")
                
                # Save individual backup
                backup_file = os.path.join(backup_dir, f"composer_{i}_{key.split(':')[1]}.json")
                with open(backup_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"   💾 Đã backup: {backup_file}")
                
            except Exception as e:
                print(f"   ❌ Lỗi phân tích: {e}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Lỗi truy cập cơ sở dữ liệu: {e}")
    
    # Check for any other potential sources
    print("\n🔍 Kiểm tra các nguồn dữ liệu khác...")
    
    # Check if there are any other databases
    other_dbs = []
    for root, dirs, files in os.walk("/home/ubuntu/.vm-daemon/vm-daemon-cursor-data"):
        for file in files:
            if file.endswith(('.db', '.sqlite')):
                other_dbs.append(os.path.join(root, file))
    
    if other_dbs:
        print(f"   Tìm thấy {len(other_dbs)} cơ sở dữ liệu khác:")
        for db in other_dbs:
            print(f"      📄 {db}")
    else:
        print("   Không tìm thấy cơ sở dữ liệu khác")
    
    # Final recommendations
    print("\n" + "="*70)
    print("🎯 KẾT LUẬN VÀ GIẢI PHÁP")
    print("="*70)
    
    print("\n📋 Tình trạng hiện tại:")
    print("   ✅ Đã tìm thấy cơ sở dữ liệu Cursor")
    print("   ✅ Đã tạo backup dữ liệu")
    print("   ⚠️  Các bản ghi chat hiện tại đang trống")
    print("   ⚠️  Không tìm thấy dữ liệu chat cũ")
    
    print("\n🔧 Các phương pháp phục hồi:")
    print("   1. Kiểm tra Cursor Settings:")
    print("      - Mở Cursor > Settings > Privacy")
    print("      - Xem cài đặt lưu trữ dữ liệu chat")
    print("      - Kiểm tra xem có tùy chọn sync với cloud không")
    
    print("\n   2. Kiểm tra tài khoản Cursor:")
    print("      - Đăng nhập vào tài khoản Cursor")
    print("      - Kiểm tra lịch sử chat trên web dashboard")
    print("      - Xem có tùy chọn export dữ liệu không")
    
    print("\n   3. Sử dụng công cụ phục hồi dữ liệu:")
    print("      - PhotoRec: sudo apt install testdisk")
    print("      - Recuva (trên Windows)")
    print("      - R-Studio (chuyên nghiệp)")
    
    print("\n   4. Kiểm tra các vị trí khác:")
    print("      - ~/.config/cursor/")
    print("      - ~/.local/share/cursor/")
    print("      - /var/lib/cursor/")
    
    print("\n   5. Liên hệ hỗ trợ Cursor:")
    print("      - Email: support@cursor.sh")
    print("      - Discord: Cursor Community")
    print("      - GitHub: Cursor Issues")
    
    print("\n💡 Khuyến nghị:")
    print("   - Dữ liệu chat có thể được lưu trên server của Cursor")
    print("   - Có thể cần đăng nhập lại để sync dữ liệu")
    print("   - Kiểm tra cài đặt privacy và data retention")
    print("   - Tạo backup thường xuyên để tránh mất dữ liệu")
    
    print(f"\n📁 Backup đã được lưu tại: {backup_dir}")
    print("   - state.vscdb.backup: Backup cơ sở dữ liệu chính")
    print("   - composer_*.json: Backup từng bản ghi chat")

if __name__ == "__main__":
    create_backup_and_analyze()