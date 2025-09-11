#!/usr/bin/env python3
"""
Comprehensive script to recover Cursor chat history from multiple sources
"""

import sqlite3
import json
import os
import glob
import subprocess
from datetime import datetime

def search_chat_data():
    print("🔍 Tìm kiếm toàn diện lịch sử chat Cursor...")
    print("=" * 70)
    
    # 1. Check main database
    print("1️⃣ Kiểm tra cơ sở dữ liệu chính...")
    db_path = "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    
    if os.path.exists(db_path):
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            # Check for any data with timestamps
            cursor.execute("""
                SELECT key, value, length(value) as size 
                FROM cursorDiskKV 
                WHERE key LIKE 'composerData:%' 
                ORDER BY size DESC
            """)
            
            entries = cursor.fetchall()
            print(f"   ✅ Tìm thấy {len(entries)} bản ghi trong cơ sở dữ liệu chính")
            
            # Look for any data with actual content
            for key, value, size in entries:
                try:
                    data = json.loads(value)
                    # Check for any meaningful content
                    has_content = False
                    content_info = []
                    
                    if data.get('text'):
                        content_info.append(f"text: {len(data['text'])} chars")
                        has_content = True
                    
                    if data.get('richText'):
                        content_info.append(f"richText: {len(data['richText'])} chars")
                        has_content = True
                    
                    conversation_map = data.get('conversationMap', {})
                    if conversation_map:
                        content_info.append(f"conversations: {len(conversation_map)}")
                        has_content = True
                    
                    if has_content:
                        print(f"   📝 {key}: {', '.join(content_info)}")
                    else:
                        print(f"   📝 {key}: Trống ({size} bytes)")
                        
                except:
                    print(f"   📝 {key}: Dữ liệu không hợp lệ ({size} bytes)")
            
            conn.close()
            
        except Exception as e:
            print(f"   ❌ Lỗi truy cập cơ sở dữ liệu: {e}")
    else:
        print("   ❌ Không tìm thấy cơ sở dữ liệu chính")
    
    # 2. Check for backup files
    print("\n2️⃣ Kiểm tra file backup...")
    backup_dirs = [
        "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/Backups",
        "/home/ubuntu/.cursor-server",
        "/home/ubuntu/.cursor-nightly"
    ]
    
    for backup_dir in backup_dirs:
        if os.path.exists(backup_dir):
            print(f"   📁 Kiểm tra {backup_dir}...")
            try:
                for root, dirs, files in os.walk(backup_dir):
                    for file in files:
                        if file.endswith(('.db', '.sqlite', '.json')):
                            file_path = os.path.join(root, file)
                            size = os.path.getsize(file_path)
                            print(f"      📄 {file}: {size} bytes")
                            
                            # Try to check if it's a database with chat data
                            if file.endswith(('.db', '.sqlite')):
                                try:
                                    conn = sqlite3.connect(file_path)
                                    cursor = conn.cursor()
                                    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
                                    tables = cursor.fetchall()
                                    if any('chat' in str(table).lower() or 'composer' in str(table).lower() for table in tables):
                                        print(f"         ✅ Có thể chứa dữ liệu chat!")
                                    conn.close()
                                except:
                                    pass
            except Exception as e:
                print(f"      ❌ Lỗi: {e}")
        else:
            print(f"   ❌ Không tìm thấy {backup_dir}")
    
    # 3. Check for log files
    print("\n3️⃣ Kiểm tra file log...")
    log_dirs = [
        "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/logs",
        "/var/log",
        "/tmp"
    ]
    
    for log_dir in log_dirs:
        if os.path.exists(log_dir):
            print(f"   📁 Kiểm tra {log_dir}...")
            try:
                for root, dirs, files in os.walk(log_dir):
                    for file in files:
                        if 'cursor' in file.lower() and (file.endswith('.log') or file.endswith('.txt')):
                            file_path = os.path.join(root, file)
                            size = os.path.getsize(file_path)
                            print(f"      📄 {file}: {size} bytes")
                            
                            # Check if file contains chat-related content
                            try:
                                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                    content = f.read(1000)  # Read first 1000 chars
                                    if any(keyword in content.lower() for keyword in ['chat', 'message', 'conversation', 'composer']):
                                        print(f"         ✅ Có thể chứa dữ liệu chat!")
                            except:
                                pass
            except Exception as e:
                print(f"      ❌ Lỗi: {e}")
        else:
            print(f"   ❌ Không tìm thấy {log_dir}")
    
    # 4. Check for temporary files
    print("\n4️⃣ Kiểm tra file tạm...")
    temp_dirs = [
        "/tmp",
        "/var/tmp",
        os.path.expanduser("~/.cache")
    ]
    
    for temp_dir in temp_dirs:
        if os.path.exists(temp_dir):
            print(f"   📁 Kiểm tra {temp_dir}...")
            try:
                for root, dirs, files in os.walk(temp_dir):
                    for file in files:
                        if 'cursor' in file.lower():
                            file_path = os.path.join(root, file)
                            size = os.path.getsize(file_path)
                            print(f"      📄 {file}: {size} bytes")
            except Exception as e:
                print(f"      ❌ Lỗi: {e}")
        else:
            print(f"   ❌ Không tìm thấy {temp_dir}")
    
    # 5. Check for any JSON files that might contain chat data
    print("\n5️⃣ Tìm kiếm file JSON có thể chứa dữ liệu chat...")
    json_search_paths = [
        "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data",
        "/home/ubuntu/.cursor-server",
        "/home/ubuntu/.cursor-nightly"
    ]
    
    for search_path in json_search_paths:
        if os.path.exists(search_path):
            print(f"   📁 Tìm kiếm trong {search_path}...")
            try:
                for root, dirs, files in os.walk(search_path):
                    for file in files:
                        if file.endswith('.json'):
                            file_path = os.path.join(root, file)
                            size = os.path.getsize(file_path)
                            
                            # Check if file might contain chat data
                            try:
                                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                    content = f.read(500)
                                    if any(keyword in content.lower() for keyword in ['chat', 'message', 'conversation', 'composer', 'ai']):
                                        print(f"      📄 {file}: {size} bytes - Có thể chứa dữ liệu chat!")
                                        
                                        # Try to parse and show preview
                                        try:
                                            with open(file_path, 'r', encoding='utf-8') as f:
                                                data = json.load(f)
                                                print(f"         Preview: {json.dumps(data, indent=2, ensure_ascii=False)[:200]}...")
                                        except:
                                            pass
                            except:
                                pass
            except Exception as e:
                print(f"      ❌ Lỗi: {e}")
        else:
            print(f"   ❌ Không tìm thấy {search_path}")
    
    print("\n✅ Hoàn thành tìm kiếm toàn diện!")
    print("\n💡 Kết luận:")
    print("   - Dữ liệu chat có thể đã bị xóa hoặc chưa được lưu")
    print("   - Cursor có thể lưu dữ liệu chat ở server thay vì local")
    print("   - Có thể cần kiểm tra cài đặt Cursor để xem nơi lưu trữ dữ liệu")

if __name__ == "__main__":
    search_chat_data()