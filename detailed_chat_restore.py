#!/usr/bin/env python3
"""
Detailed script to restore and analyze Cursor chat history
"""

import sqlite3
import json
import sys
import os
from datetime import datetime

def analyze_chat_data():
    db_path = "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🔍 Phân tích chi tiết dữ liệu chat trong Cursor...")
        print("=" * 70)
        
        # Get all composerData entries with detailed analysis
        cursor.execute("""
            SELECT key, value, length(value) as size 
            FROM cursorDiskKV 
            WHERE key LIKE 'composerData:%' 
            ORDER BY size DESC
        """)
        
        composer_entries = cursor.fetchall()
        
        if not composer_entries:
            print("❌ Không tìm thấy dữ liệu chat nào.")
            return
        
        print(f"✅ Tìm thấy {len(composer_entries)} bản ghi composerData:")
        print()
        
        for i, (key, value, size) in enumerate(composer_entries, 1):
            print(f"📝 Bản ghi {i}: {key}")
            print(f"   Kích thước: {size} bytes")
            print(f"   Thời gian: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            try:
                data = json.loads(value)
                
                # Detailed analysis
                print(f"   📊 Phân tích chi tiết:")
                print(f"      - Version: {data.get('_v', 'N/A')}")
                print(f"      - Composer ID: {data.get('composerId', 'N/A')}")
                print(f"      - Has Loaded: {data.get('hasLoaded', False)}")
                print(f"      - Status: {data.get('status', 'N/A')}")
                
                # Check text content
                text = data.get('text', '')
                rich_text = data.get('richText', '')
                print(f"      - Text length: {len(text)} chars")
                print(f"      - Rich text length: {len(rich_text)} chars")
                
                if text:
                    print(f"      - Text preview: {text[:150]}...")
                
                # Check conversation data
                conversation_map = data.get('conversationMap', {})
                print(f"      - Conversation map entries: {len(conversation_map)}")
                
                if conversation_map:
                    for conv_id, conv_data in conversation_map.items():
                        print(f"         📞 Conversation {conv_id}:")
                        if isinstance(conv_data, dict):
                            messages = conv_data.get('messages', [])
                            print(f"            Messages: {len(messages)}")
                            
                            for j, msg in enumerate(messages):
                                role = msg.get('role', 'unknown')
                                content = msg.get('content', '')
                                timestamp = msg.get('timestamp', 'N/A')
                                print(f"            {j+1}. [{role}] ({timestamp}): {content[:100]}...")
                        else:
                            print(f"            Raw data: {str(conv_data)[:100]}...")
                
                # Check context data
                context = data.get('context', {})
                if context:
                    print(f"      - Context data:")
                    for ctx_key, ctx_value in context.items():
                        if isinstance(ctx_value, list):
                            print(f"         {ctx_key}: {len(ctx_value)} items")
                        else:
                            print(f"         {ctx_key}: {str(ctx_value)[:50]}...")
                
                # Check for any other interesting fields
                other_fields = {k: v for k, v in data.items() 
                              if k not in ['_v', 'composerId', 'hasLoaded', 'status', 
                                         'text', 'richText', 'conversationMap', 'context']}
                if other_fields:
                    print(f"      - Other fields: {list(other_fields.keys())}")
                
            except json.JSONDecodeError as e:
                print(f"   ❌ Lỗi parse JSON: {e}")
            except Exception as e:
                print(f"   ❌ Lỗi xử lý: {e}")
            
            print("-" * 50)
        
        # Check for other potential chat data
        print("\n🔍 Tìm kiếm dữ liệu chat khác...")
        
        # Check ItemTable for chat-related data
        cursor.execute("""
            SELECT key, value, length(value) as size
            FROM ItemTable 
            WHERE key LIKE '%chat%' OR key LIKE '%composer%' OR key LIKE '%message%'
            ORDER BY size DESC
        """)
        
        item_chat_data = cursor.fetchall()
        
        if item_chat_data:
            print(f"📋 Tìm thấy {len(item_chat_data)} bản ghi trong ItemTable:")
            for key, value, size in item_chat_data:
                print(f"   {key}: {size} bytes")
                if size < 1000:  # Show small values
                    try:
                        if value.startswith(b'{'):
                            data = json.loads(value)
                            print(f"      JSON: {json.dumps(data, indent=2, ensure_ascii=False)[:200]}...")
                        else:
                            print(f"      Text: {value.decode('utf-8', errors='ignore')[:200]}...")
                    except:
                        print(f"      Binary data")
        else:
            print("   Không tìm thấy dữ liệu chat trong ItemTable")
        
        # Check for backup files
        print("\n🔍 Kiểm tra file backup...")
        backup_dir = "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/Backups"
        if os.path.exists(backup_dir):
            backup_files = os.listdir(backup_dir)
            if backup_files:
                print(f"   Tìm thấy {len(backup_files)} file backup:")
                for file in backup_files:
                    file_path = os.path.join(backup_dir, file)
                    size = os.path.getsize(file_path)
                    print(f"      {file}: {size} bytes")
            else:
                print("   Thư mục backup trống")
        else:
            print("   Không tìm thấy thư mục backup")
        
        conn.close()
        
        print("\n✅ Hoàn thành phân tích!")
        print("\n💡 Kết luận:")
        print("   - Dữ liệu chat được lưu trong bảng 'cursorDiskKV'")
        print("   - Các bản ghi hiện tại có vẻ trống hoặc đã bị xóa")
        print("   - Có thể cần kiểm tra backup hoặc các file khác")
        
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        return False

if __name__ == "__main__":
    analyze_chat_data()