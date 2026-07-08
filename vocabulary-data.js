// Dữ liệu từ vựng theo chủ đề
const vocabularyData = {
    daily: {
        title: "Từ Vựng Hôm Nay",
        description: "10 từ vựng quan trọng cho ngày hôm nay",
        words: [
            {
                word: "hello",
                ipa: "/həˈləʊ/",
                meaning: "xin chào",
                type: "interjection",
                example: {
                    en: "Hello, how are you?",
                    vi: "Xin chào, bạn khỏe không?"
                }
            },
            {
                word: "thank you",
                ipa: "/θæŋk juː/",
                meaning: "cảm ơn",
                type: "phrase",
                example: {
                    en: "Thank you for your help.",
                    vi: "Cảm ơn sự giúp đỡ của bạn."
                }
            },
            {
                word: "please",
                ipa: "/pliːz/",
                meaning: "làm ơn, xin vui lòng",
                type: "adverb",
                example: {
                    en: "Please sit down.",
                    vi: "Xin vui lòng ngồi xuống."
                }
            },
            {
                word: "water",
                ipa: "/ˈwɔːtər/",
                meaning: "nước",
                type: "noun",
                example: {
                    en: "I need a glass of water.",
                    vi: "Tôi cần một ly nước."
                }
            },
            {
                word: "book",
                ipa: "/bʊk/",
                meaning: "sách",
                type: "noun",
                example: {
                    en: "I'm reading a good book.",
                    vi: "Tôi đang đọc một cuốn sách hay."
                }
            },
            {
                word: "study",
                ipa: "/ˈstʌdi/",
                meaning: "học, nghiên cứu",
                type: "verb",
                example: {
                    en: "I study English every day.",
                    vi: "Tôi học tiếng Anh mỗi ngày."
                }
            },
            {
                word: "friend",
                ipa: "/frend/",
                meaning: "bạn bè",
                type: "noun",
                example: {
                    en: "She is my best friend.",
                    vi: "Cô ấy là bạn thân nhất của tôi."
                }
            },
            {
                word: "happy",
                ipa: "/ˈhæpi/",
                meaning: "vui vẻ, hạnh phúc",
                type: "adjective",
                example: {
                    en: "I'm happy to see you.",
                    vi: "Tôi vui khi gặp bạn."
                }
            },
            {
                word: "work",
                ipa: "/wɜːrk/",
                meaning: "làm việc, công việc",
                type: "noun/verb",
                example: {
                    en: "I work in an office.",
                    vi: "Tôi làm việc trong văn phòng."
                }
            },
            {
                word: "time",
                ipa: "/taɪm/",
                meaning: "thời gian",
                type: "noun",
                example: {
                    en: "What time is it?",
                    vi: "Bây giờ là mấy giờ?"
                }
            }
        ]
    },
    greetings: {
        title: "Chào Hỏi & Giao Tiếp",
        description: "Các cụm từ chào hỏi và giao tiếp cơ bản",
        words: [
            {
                word: "good morning",
                ipa: "/ɡʊd ˈmɔːrnɪŋ/",
                meaning: "chào buổi sáng",
                type: "phrase",
                example: {
                    en: "Good morning, everyone!",
                    vi: "Chào buổi sáng mọi người!"
                }
            },
            {
                word: "good afternoon",
                ipa: "/ɡʊd ˌæftərˈnuːn/",
                meaning: "chào buổi chiều",
                type: "phrase",
                example: {
                    en: "Good afternoon, sir.",
                    vi: "Chào buổi chiều, thưa ông."
                }
            },
            {
                word: "good evening",
                ipa: "/ɡʊd ˈiːvnɪŋ/",
                meaning: "chào buổi tối",
                type: "phrase",
                example: {
                    en: "Good evening, ladies and gentlemen.",
                    vi: "Chào buổi tối, quý ông quý bà."
                }
            },
            {
                word: "goodbye",
                ipa: "/ɡʊdˈbaɪ/",
                meaning: "tạm biệt",
                type: "interjection",
                example: {
                    en: "Goodbye, see you tomorrow!",
                    vi: "Tạm biệt, hẹn gặp lại ngày mai!"
                }
            },
            {
                word: "nice to meet you",
                ipa: "/naɪs tə miːt juː/",
                meaning: "rất vui được gặp bạn",
                type: "phrase",
                example: {
                    en: "Nice to meet you, John.",
                    vi: "Rất vui được gặp bạn, John."
                }
            },
            {
                word: "how are you",
                ipa: "/haʊ ɑːr juː/",
                meaning: "bạn khỏe không?",
                type: "phrase",
                example: {
                    en: "Hi, how are you today?",
                    vi: "Chào, hôm nay bạn thế nào?"
                }
            },
            {
                word: "I'm fine",
                ipa: "/aɪm faɪn/",
                meaning: "tôi khỏe",
                type: "phrase",
                example: {
                    en: "I'm fine, thank you.",
                    vi: "Tôi khỏe, cảm ơn bạn."
                }
            },
            {
                word: "excuse me",
                ipa: "/ɪkˈskjuːz miː/",
                meaning: "xin lỗi (để thu hút sự chú ý)",
                type: "phrase",
                example: {
                    en: "Excuse me, where is the bathroom?",
                    vi: "Xin lỗi, nhà vệ sinh ở đâu?"
                }
            },
            {
                word: "sorry",
                ipa: "/ˈsɒri/",
                meaning: "xin lỗi",
                type: "interjection",
                example: {
                    en: "Sorry, I'm late.",
                    vi: "Xin lỗi, tôi đến muộn."
                }
            },
            {
                word: "you're welcome",
                ipa: "/jʊər ˈwelkəm/",
                meaning: "không có gì",
                type: "phrase",
                example: {
                    en: "You're welcome, anytime!",
                    vi: "Không có gì, bất cứ lúc nào!"
                }
            }
        ]
    },
    numbers: {
        title: "Số Đếm",
        description: "Các số cơ bản từ 1-20 và các số quan trọng",
        words: [
            {
                word: "one",
                ipa: "/wʌn/",
                meaning: "một",
                type: "number",
                example: {
                    en: "I have one book.",
                    vi: "Tôi có một cuốn sách."
                }
            },
            {
                word: "two",
                ipa: "/tuː/",
                meaning: "hai",
                type: "number",
                example: {
                    en: "Two plus two equals four.",
                    vi: "Hai cộng hai bằng bốn."
                }
            },
            {
                word: "three",
                ipa: "/θriː/",
                meaning: "ba",
                type: "number",
                example: {
                    en: "I have three sisters.",
                    vi: "Tôi có ba chị em gái."
                }
            },
            {
                word: "four",
                ipa: "/fɔːr/",
                meaning: "bốn",
                type: "number",
                example: {
                    en: "There are four seasons.",
                    vi: "Có bốn mùa trong năm."
                }
            },
            {
                word: "five",
                ipa: "/faɪv/",
                meaning: "năm",
                type: "number",
                example: {
                    en: "I work five days a week.",
                    vi: "Tôi làm việc năm ngày một tuần."
                }
            },
            {
                word: "ten",
                ipa: "/ten/",
                meaning: "mười",
                type: "number",
                example: {
                    en: "I have ten fingers.",
                    vi: "Tôi có mười ngón tay."
                }
            },
            {
                word: "twenty",
                ipa: "/ˈtwenti/",
                meaning: "hai mươi",
                type: "number",
                example: {
                    en: "She is twenty years old.",
                    vi: "Cô ấy hai mươi tuổi."
                }
            },
            {
                word: "hundred",
                ipa: "/ˈhʌndrəd/",
                meaning: "một trăm",
                type: "number",
                example: {
                    en: "One hundred percent sure.",
                    vi: "Chắc chắn một trăm phần trăm."
                }
            },
            {
                word: "thousand",
                ipa: "/ˈθaʊzənd/",
                meaning: "một nghìn",
                type: "number",
                example: {
                    en: "A thousand thanks!",
                    vi: "Cảm ơn vô vàn!"
                }
            },
            {
                word: "first",
                ipa: "/fɜːrst/",
                meaning: "thứ nhất, đầu tiên",
                type: "ordinal",
                example: {
                    en: "This is my first time here.",
                    vi: "Đây là lần đầu tiên tôi đến đây."
                }
            }
        ]
    },
    colors: {
        title: "Màu Sắc",
        description: "Các màu sắc cơ bản",
        words: [
            {
                word: "red",
                ipa: "/red/",
                meaning: "màu đỏ",
                type: "adjective",
                example: {
                    en: "The apple is red.",
                    vi: "Quả táo có màu đỏ."
                }
            },
            {
                word: "blue",
                ipa: "/bluː/",
                meaning: "màu xanh dương",
                type: "adjective",
                example: {
                    en: "The sky is blue.",
                    vi: "Bầu trời có màu xanh."
                }
            },
            {
                word: "green",
                ipa: "/ɡriːn/",
                meaning: "màu xanh lá",
                type: "adjective",
                example: {
                    en: "The grass is green.",
                    vi: "Cỏ có màu xanh lá."
                }
            },
            {
                word: "yellow",
                ipa: "/ˈjeləʊ/",
                meaning: "màu vàng",
                type: "adjective",
                example: {
                    en: "The sun is yellow.",
                    vi: "Mặt trời có màu vàng."
                }
            },
            {
                word: "black",
                ipa: "/blæk/",
                meaning: "màu đen",
                type: "adjective",
                example: {
                    en: "I have a black car.",
                    vi: "Tôi có một chiếc xe màu đen."
                }
            },
            {
                word: "white",
                ipa: "/waɪt/",
                meaning: "màu trắng",
                type: "adjective",
                example: {
                    en: "Snow is white.",
                    vi: "Tuyết có màu trắng."
                }
            },
            {
                word: "purple",
                ipa: "/ˈpɜːrpl/",
                meaning: "màu tím",
                type: "adjective",
                example: {
                    en: "She loves purple flowers.",
                    vi: "Cô ấy thích hoa màu tím."
                }
            },
            {
                word: "orange",
                ipa: "/ˈɒrɪndʒ/",
                meaning: "màu cam",
                type: "adjective",
                example: {
                    en: "The orange is orange.",
                    vi: "Quả cam có màu cam."
                }
            },
            {
                word: "pink",
                ipa: "/pɪŋk/",
                meaning: "màu hồng",
                type: "adjective",
                example: {
                    en: "She wears a pink dress.",
                    vi: "Cô ấy mặc váy màu hồng."
                }
            },
            {
                word: "brown",
                ipa: "/braʊn/",
                meaning: "màu nâu",
                type: "adjective",
                example: {
                    en: "He has brown eyes.",
                    vi: "Anh ấy có mắt màu nâu."
                }
            }
        ]
    },
    family: {
        title: "Gia Đình",
        description: "Từ vựng về các thành viên trong gia đình",
        words: [
            {
                word: "father",
                ipa: "/ˈfɑːðər/",
                meaning: "cha, bố",
                type: "noun",
                example: {
                    en: "My father is a doctor.",
                    vi: "Bố tôi là bác sĩ."
                }
            },
            {
                word: "mother",
                ipa: "/ˈmʌðər/",
                meaning: "mẹ",
                type: "noun",
                example: {
                    en: "My mother cooks well.",
                    vi: "Mẹ tôi nấu ăn ngon."
                }
            },
            {
                word: "brother",
                ipa: "/ˈbrʌðər/",
                meaning: "anh em trai",
                type: "noun",
                example: {
                    en: "I have two brothers.",
                    vi: "Tôi có hai anh em trai."
                }
            },
            {
                word: "sister",
                ipa: "/ˈsɪstər/",
                meaning: "chị em gái",
                type: "noun",
                example: {
                    en: "My sister is younger than me.",
                    vi: "Em gái tôi nhỏ hơn tôi."
                }
            },
            {
                word: "son",
                ipa: "/sʌn/",
                meaning: "con trai",
                type: "noun",
                example: {
                    en: "Their son is in college.",
                    vi: "Con trai họ đang học đại học."
                }
            },
            {
                word: "daughter",
                ipa: "/ˈdɔːtər/",
                meaning: "con gái",
                type: "noun",
                example: {
                    en: "My daughter loves dancing.",
                    vi: "Con gái tôi thích nhảy múa."
                }
            },
            {
                word: "grandfather",
                ipa: "/ˈɡrænfɑːðər/",
                meaning: "ông",
                type: "noun",
                example: {
                    en: "My grandfather is 80 years old.",
                    vi: "Ông tôi 80 tuổi."
                }
            },
            {
                word: "grandmother",
                ipa: "/ˈɡrænmʌðər/",
                meaning: "bà",
                type: "noun",
                example: {
                    en: "My grandmother tells great stories.",
                    vi: "Bà tôi kể chuyện rất hay."
                }
            },
            {
                word: "husband",
                ipa: "/ˈhʌzbənd/",
                meaning: "chồng",
                type: "noun",
                example: {
                    en: "Her husband is very kind.",
                    vi: "Chồng cô ấy rất tốt bụng."
                }
            },
            {
                word: "wife",
                ipa: "/waɪf/",
                meaning: "vợ",
                type: "noun",
                example: {
                    en: "My wife is a teacher.",
                    vi: "Vợ tôi là giáo viên."
                }
            }
        ]
    },
    food: {
        title: "Thức Ăn & Đồ Uống",
        description: "Từ vựng về các món ăn và đồ uống phổ biến",
        words: [
            {
                word: "bread",
                ipa: "/bred/",
                meaning: "bánh mì",
                type: "noun",
                example: {
                    en: "I eat bread for breakfast.",
                    vi: "Tôi ăn bánh mì cho bữa sáng."
                }
            },
            {
                word: "rice",
                ipa: "/raɪs/",
                meaning: "cơm, gạo",
                type: "noun",
                example: {
                    en: "Rice is a staple food in Asia.",
                    vi: "Cơm là thực phẩm chính ở châu Á."
                }
            },
            {
                word: "milk",
                ipa: "/mɪlk/",
                meaning: "sữa",
                type: "noun",
                example: {
                    en: "Children should drink milk.",
                    vi: "Trẻ em nên uống sữa."
                }
            },
            {
                word: "coffee",
                ipa: "/ˈkɒfi/",
                meaning: "cà phê",
                type: "noun",
                example: {
                    en: "I drink coffee every morning.",
                    vi: "Tôi uống cà phê mỗi sáng."
                }
            },
            {
                word: "tea",
                ipa: "/tiː/",
                meaning: "trà",
                type: "noun",
                example: {
                    en: "Would you like some tea?",
                    vi: "Bạn có muốn uống trà không?"
                }
            },
            {
                word: "meat",
                ipa: "/miːt/",
                meaning: "thịt",
                type: "noun",
                example: {
                    en: "I don't eat meat on Fridays.",
                    vi: "Tôi không ăn thịt vào thứ Sáu."
                }
            },
            {
                word: "fish",
                ipa: "/fɪʃ/",
                meaning: "cá",
                type: "noun",
                example: {
                    en: "Fish is healthy food.",
                    vi: "Cá là thức ăn tốt cho sức khỏe."
                }
            },
            {
                word: "vegetable",
                ipa: "/ˈvedʒtəbl/",
                meaning: "rau",
                type: "noun",
                example: {
                    en: "Eat your vegetables!",
                    vi: "Hãy ăn rau đi!"
                }
            },
            {
                word: "fruit",
                ipa: "/fruːt/",
                meaning: "trái cây",
                type: "noun",
                example: {
                    en: "Fresh fruit is delicious.",
                    vi: "Trái cây tươi rất ngon."
                }
            },
            {
                word: "chicken",
                ipa: "/ˈtʃɪkɪn/",
                meaning: "gà",
                type: "noun",
                example: {
                    en: "Fried chicken is popular.",
                    vi: "Gà rán rất phổ biến."
                }
            }
        ]
    },
    time: {
        title: "Thời Gian",
        description: "Từ vựng về thời gian và các mốc thời gian",
        words: [
            {
                word: "today",
                ipa: "/təˈdeɪ/",
                meaning: "hôm nay",
                type: "noun/adverb",
                example: {
                    en: "Today is Monday.",
                    vi: "Hôm nay là thứ Hai."
                }
            },
            {
                word: "tomorrow",
                ipa: "/təˈmɒrəʊ/",
                meaning: "ngày mai",
                type: "noun/adverb",
                example: {
                    en: "See you tomorrow!",
                    vi: "Hẹn gặp lại ngày mai!"
                }
            },
            {
                word: "yesterday",
                ipa: "/ˈjestərdeɪ/",
                meaning: "hôm qua",
                type: "noun/adverb",
                example: {
                    en: "I met him yesterday.",
                    vi: "Tôi gặp anh ấy hôm qua."
                }
            },
            {
                word: "morning",
                ipa: "/ˈmɔːrnɪŋ/",
                meaning: "buổi sáng",
                type: "noun",
                example: {
                    en: "I exercise in the morning.",
                    vi: "Tôi tập thể dục vào buổi sáng."
                }
            },
            {
                word: "afternoon",
                ipa: "/ˌæftərˈnuːn/",
                meaning: "buổi chiều",
                type: "noun",
                example: {
                    en: "Let's meet this afternoon.",
                    vi: "Hãy gặp nhau chiều nay."
                }
            },
            {
                word: "evening",
                ipa: "/ˈiːvnɪŋ/",
                meaning: "buổi tối",
                type: "noun",
                example: {
                    en: "We have dinner in the evening.",
                    vi: "Chúng tôi ăn tối vào buổi tối."
                }
            },
            {
                word: "night",
                ipa: "/naɪt/",
                meaning: "đêm",
                type: "noun",
                example: {
                    en: "Good night, sleep well!",
                    vi: "Chúc ngủ ngon!"
                }
            },
            {
                word: "week",
                ipa: "/wiːk/",
                meaning: "tuần",
                type: "noun",
                example: {
                    en: "There are seven days in a week.",
                    vi: "Một tuần có bảy ngày."
                }
            },
            {
                word: "month",
                ipa: "/mʌnθ/",
                meaning: "tháng",
                type: "noun",
                example: {
                    en: "My birthday is next month.",
                    vi: "Sinh nhật tôi là tháng tới."
                }
            },
            {
                word: "year",
                ipa: "/jɪər/",
                meaning: "năm",
                type: "noun",
                example: {
                    en: "Happy New Year!",
                    vi: "Chúc mừng năm mới!"
                }
            }
        ]
    },
    body: {
        title: "Cơ Thể",
        description: "Từ vựng về các bộ phận cơ thể",
        words: [
            {
                word: "head",
                ipa: "/hed/",
                meaning: "đầu",
                type: "noun",
                example: {
                    en: "My head hurts.",
                    vi: "Đầu tôi đau."
                }
            },
            {
                word: "eye",
                ipa: "/aɪ/",
                meaning: "mắt",
                type: "noun",
                example: {
                    en: "She has beautiful eyes.",
                    vi: "Cô ấy có đôi mắt đẹp."
                }
            },
            {
                word: "ear",
                ipa: "/ɪər/",
                meaning: "tai",
                type: "noun",
                example: {
                    en: "I can't hear with my left ear.",
                    vi: "Tôi không thể nghe bằng tai trái."
                }
            },
            {
                word: "nose",
                ipa: "/nəʊz/",
                meaning: "mũi",
                type: "noun",
                example: {
                    en: "He has a big nose.",
                    vi: "Anh ấy có mũi to."
                }
            },
            {
                word: "mouth",
                ipa: "/maʊθ/",
                meaning: "miệng",
                type: "noun",
                example: {
                    en: "Open your mouth, please.",
                    vi: "Xin hãy mở miệng ra."
                }
            },
            {
                word: "hand",
                ipa: "/hænd/",
                meaning: "tay",
                type: "noun",
                example: {
                    en: "Wash your hands before eating.",
                    vi: "Rửa tay trước khi ăn."
                }
            },
            {
                word: "foot",
                ipa: "/fʊt/",
                meaning: "bàn chân",
                type: "noun",
                example: {
                    en: "My foot is sore.",
                    vi: "Chân tôi bị đau."
                }
            },
            {
                word: "leg",
                ipa: "/leɡ/",
                meaning: "chân",
                type: "noun",
                example: {
                    en: "He broke his leg.",
                    vi: "Anh ấy bị gãy chân."
                }
            },
            {
                word: "arm",
                ipa: "/ɑːrm/",
                meaning: "cánh tay",
                type: "noun",
                example: {
                    en: "She has strong arms.",
                    vi: "Cô ấy có cánh tay khỏe."
                }
            },
            {
                word: "heart",
                ipa: "/hɑːrt/",
                meaning: "tim",
                type: "noun",
                example: {
                    en: "My heart is beating fast.",
                    vi: "Tim tôi đang đập nhanh."
                }
            }
        ]
    }
};