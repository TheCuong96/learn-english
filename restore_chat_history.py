#!/usr/bin/env python3
"""
Script to restore and display Cursor chat history from the SQLite database
"""

import sqlite3
import json
import sys
from datetime import datetime

def restore_chat_history():
    db_path = "/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🔍 Đang tìm kiếm lịch sử chat trong Cursor...")
        print("=" * 60)
        
        # Get all composerData entries
        cursor.execute("""
            SELECT key, value, length(value) as size 
            FROM cursorDiskKV 
            WHERE key LIKE 'composerData:%' 
            ORDER BY size DESC
        """)
        
        composer_entries = cursor.fetchall()
        
        if not composer_entries:
            print("❌ Không tìm thấy dữ liệu chat nào trong cơ sở dữ liệu.")
            return
        
        print(f"✅ Tìm thấy {len(composer_entries)} bản ghi chat:")
        print()
        
        for i, (key, value, size) in enumerate(composer_entries, 1):
            print(f"📝 Bản ghi {i}: {key}")
            print(f"   Kích thước: {size} bytes")
            
            try:
                # Parse JSON data
                data = json.loads(value)
                
                # Extract conversation information
                composer_id = data.get('composerId', 'Unknown')
                text = data.get('text', '')
                rich_text = data.get('richText', '')
                status = data.get('status', 'Unknown')
                
                print(f"   ID: {composer_id}")
                print(f"   Trạng thái: {status}")
                
                # Check for conversation data
                conversation_map = data.get('conversationMap', {})
                if conversation_map:
                    print(f"   Số cuộc trò chuyện: {len(conversation_map)}")
                    
                    # Display conversation details
                    for conv_id, conv_data in conversation_map.items():
                        print(f"   📞 Cuộc trò chuyện: {conv_id}")
                        if isinstance(conv_data, dict):
                            messages = conv_data.get('messages', [])
                            if messages:
                                print(f"      Số tin nhắn: {len(messages)}")
                                for j, msg in enumerate(messages[:3]):  # Show first 3 messages
                                    role = msg.get('role', 'unknown')
                                    content = msg.get('content', '')
                                    if content:
                                        preview = content[:100] + "..." if len(content) > 100 else content
                                        print(f"      {j+1}. [{role}]: {preview}")
                            else:
                                print("      Không có tin nhắn")
                        else:
                            print(f"      Dữ liệu: {str(conv_data)[:100]}...")
                
                # Check for text content
                if text:
                    print(f"   Nội dung text: {text[:200]}...")
                
                if rich_text:
                    print(f"   Nội dung rich text: {rich_text[:200]}...")
                
                # Check context
                context = data.get('context', {})
                if context:
                    file_selections = context.get('fileSelections', [])
                    if file_selections:
                        print(f"   Files được chọn: {len(file_selections)}")
                    
                    selections = context.get('selections', [])
                    if selections:
                        print(f"   Vùng text được chọn: {len(selections)}")
                
            except json.JSONDecodeError as e:
                print(f"   ❌ Lỗi parse JSON: {e}")
            except Exception as e:
                print(f"   ❌ Lỗi xử lý dữ liệu: {e}")
            
            print("-" * 40)
        
        # Also check for other chat-related data
        print("\n🔍 Kiểm tra các dữ liệu chat khác...")
        
        cursor.execute("""
            SELECT key, value 
            FROM ItemTable 
            WHERE key LIKE '%chat%' OR key LIKE '%composer%'
        """)
        
        other_chat_data = cursor.fetchall()
        
        for key, value in other_chat_data:
            print(f"📋 {key}: {len(value)} bytes")
            if len(value) < 500:  # Only show small values
                try:
                    if value.startswith(b'{'):
                        data = json.loads(value)
                        print(f"   JSON: {json.dumps(data, indent=2, ensure_ascii=False)[:200]}...")
                    else:
                        print(f"   Text: {value.decode('utf-8', errors='ignore')[:200]}...")
                except:
                    print(f"   Binary data")
        
        conn.close()
        
        print("\n✅ Hoàn thành việc khôi phục lịch sử chat!")
        print("\n💡 Gợi ý:")
        print("   - Dữ liệu chat được lưu trong bảng 'cursorDiskKV' với key 'composerData:*'")
        print("   - Mỗi composerId đại diện cho một phiên chat riêng biệt")
        print("   - Dữ liệu được lưu dưới dạng JSON trong cột 'value'")
        
    except Exception as e:
        print(f"❌ Lỗi khi truy cập cơ sở dữ liệu: {e}")
        return False

if __name__ == "__main__":
    restore_chat_history()