// Vocabulary data organized by topics
const vocabularyData = {
    daily: {
        title: "Daily Routine - Thói quen hàng ngày",
        words: [
            {
                word: "wake up",
                phonetic: "/weɪk ʌp/",
                type: "phrasal verb",
                meaning: "thức dậy, tỉnh giấc",
                example: "I usually wake up at 7 o'clock every morning.",
                exampleVi: "Tôi thường thức dậy lúc 7 giờ mỗi sáng."
            },
            {
                word: "breakfast",
                phonetic: "/ˈbrekfəst/",
                type: "noun",
                meaning: "bữa sáng",
                example: "I have breakfast with my family at 7:30 AM.",
                exampleVi: "Tôi ăn sáng với gia đình lúc 7:30 sáng."
            },
            {
                word: "brush",
                phonetic: "/brʌʃ/",
                type: "verb",
                meaning: "đánh răng, chải (tóc)",
                example: "Don't forget to brush your teeth before bed.",
                exampleVi: "Đừng quên đánh răng trước khi đi ngủ."
            },
            {
                word: "shower",
                phonetic: "/ˈʃaʊər/",
                type: "noun/verb",
                meaning: "tắm vòi sen",
                example: "I take a shower every morning to feel fresh.",
                exampleVi: "Tôi tắm vòi sen mỗi sáng để cảm thấy sảng khoái."
            },
            {
                word: "commute",
                phonetic: "/kəˈmjuːt/",
                type: "verb",
                meaning: "đi lại (giữa nhà và nơi làm việc)",
                example: "I commute to work by subway every day.",
                exampleVi: "Tôi đi làm bằng tàu điện ngầm mỗi ngày."
            },
            {
                word: "lunch break",
                phonetic: "/lʌntʃ breɪk/",
                type: "noun",
                meaning: "giờ nghỉ trưa",
                example: "We have a one-hour lunch break at noon.",
                exampleVi: "Chúng tôi có một giờ nghỉ trưa vào buổi trưa."
            },
            {
                word: "exercise",
                phonetic: "/ˈeksərsaɪz/",
                type: "noun/verb",
                meaning: "tập thể dục",
                example: "Regular exercise is important for good health.",
                exampleVi: "Tập thể dục thường xuyên rất quan trọng cho sức khỏe."
            },
            {
                word: "dinner",
                phonetic: "/ˈdɪnər/",
                type: "noun",
                meaning: "bữa tối",
                example: "We usually have dinner together at 7 PM.",
                exampleVi: "Chúng tôi thường ăn tối cùng nhau lúc 7 giờ tối."
            },
            {
                word: "relax",
                phonetic: "/rɪˈlæks/",
                type: "verb",
                meaning: "thư giãn, nghỉ ngơi",
                example: "I like to relax by reading a book before bed.",
                exampleVi: "Tôi thích thư giãn bằng cách đọc sách trước khi ngủ."
            },
            {
                word: "bedtime",
                phonetic: "/ˈbedtaɪm/",
                type: "noun",
                meaning: "giờ đi ngủ",
                example: "My bedtime is usually around 10:30 PM.",
                exampleVi: "Giờ đi ngủ của tôi thường là khoảng 10:30 tối."
            }
        ]
    },
    food: {
        title: "Food & Drinks - Đồ ăn & Thức uống",
        words: [
            {
                word: "appetite",
                phonetic: "/ˈæpɪtaɪt/",
                type: "noun",
                meaning: "sự thèm ăn, khẩu vị",
                example: "The delicious smell gave me a good appetite.",
                exampleVi: "Mùi thơm ngon làm tôi thấy thèm ăn."
            },
            {
                word: "beverage",
                phonetic: "/ˈbevərɪdʒ/",
                type: "noun",
                meaning: "đồ uống",
                example: "What beverage would you like with your meal?",
                exampleVi: "Bạn muốn uống gì với bữa ăn của mình?"
            },
            {
                word: "delicious",
                phonetic: "/dɪˈlɪʃəs/",
                type: "adjective",
                meaning: "ngon, thơm ngon",
                example: "This pasta is absolutely delicious!",
                exampleVi: "Món mì Ý này thực sự rất ngon!"
            },
            {
                word: "flavor",
                phonetic: "/ˈfleɪvər/",
                type: "noun",
                meaning: "hương vị",
                example: "I love the flavor of fresh herbs in this dish.",
                exampleVi: "Tôi thích hương vị của rau thơm tươi trong món ăn này."
            },
            {
                word: "ingredient",
                phonetic: "/ɪnˈɡriːdiənt/",
                type: "noun",
                meaning: "nguyên liệu, thành phần",
                example: "Fresh ingredients make the best meals.",
                exampleVi: "Nguyên liệu tươi làm nên những bữa ăn ngon nhất."
            },
            {
                word: "nutritious",
                phonetic: "/nuˈtrɪʃəs/",
                type: "adjective",
                meaning: "bổ dưỡng, giàu dinh dưỡng",
                example: "Vegetables are very nutritious foods.",
                exampleVi: "Rau củ là những thực phẩm rất bổ dưỡng."
            },
            {
                word: "recipe",
                phonetic: "/ˈresəpi/",
                type: "noun",
                meaning: "công thức nấu ăn",
                example: "Can you share your recipe for this cake?",
                exampleVi: "Bạn có thể chia sẻ công thức làm bánh này không?"
            },
            {
                word: "spicy",
                phonetic: "/ˈspaɪsi/",
                type: "adjective",
                meaning: "cay, có gia vị",
                example: "Thai food is often very spicy.",
                exampleVi: "Món ăn Thái thường rất cay."
            },
            {
                word: "vegetarian",
                phonetic: "/ˌvedʒəˈteriən/",
                type: "noun/adjective",
                meaning: "người ăn chay, thuộc về chay",
                example: "Do you have any vegetarian options on the menu?",
                exampleVi: "Bạn có món chay nào trong thực đơn không?"
            },
            {
                word: "dessert",
                phonetic: "/dɪˈzɜːrt/",
                type: "noun",
                meaning: "món tráng miệng",
                example: "Would you like to order dessert after dinner?",
                exampleVi: "Bạn có muốn gọi món tráng miệng sau bữa tối không?"
            }
        ]
    },
    family: {
        title: "Family & Friends - Gia đình & Bạn bè",
        words: [
            {
                word: "relative",
                phonetic: "/ˈrelətɪv/",
                type: "noun",
                meaning: "họ hàng, người thân",
                example: "We visit our relatives during the holidays.",
                exampleVi: "Chúng tôi thăm họ hàng trong những ngày lễ."
            },
            {
                word: "sibling",
                phonetic: "/ˈsɪblɪŋ/",
                type: "noun",
                meaning: "anh chị em ruột",
                example: "I have two siblings - an older brother and a younger sister.",
                exampleVi: "Tôi có hai anh chị em - một anh trai và một em gái."
            },
            {
                word: "nephew",
                phonetic: "/ˈnefjuː/",
                type: "noun",
                meaning: "cháu trai (con của anh chị em)",
                example: "My nephew just started kindergarten this year.",
                exampleVi: "Cháu trai tôi vừa bắt đầu học mẫu giáo năm nay."
            },
            {
                word: "niece",
                phonetic: "/niːs/",
                type: "noun",
                meaning: "cháu gái (con của anh chị em)",
                example: "My niece loves to draw and paint.",
                exampleVi: "Cháu gái tôi rất thích vẽ tranh."
            },
            {
                word: "companion",
                phonetic: "/kəmˈpænjən/",
                type: "noun",
                meaning: "bạn đồng hành, người bạn",
                example: "A good companion makes any journey more enjoyable.",
                exampleVi: "Một người bạn đồng hành tốt làm cho mọi hành trình thú vị hơn."
            },
            {
                word: "acquaintance",
                phonetic: "/əˈkweɪntəns/",
                type: "noun",
                meaning: "người quen",
                example: "I met an old acquaintance at the conference.",
                exampleVi: "Tôi gặp một người quen cũ tại hội nghị."
            },
            {
                word: "colleague",
                phonetic: "/ˈkɒliːɡ/",
                type: "noun",
                meaning: "đồng nghiệp",
                example: "My colleagues and I often have lunch together.",
                exampleVi: "Các đồng nghiệp và tôi thường ăn trưa cùng nhau."
            },
            {
                word: "generation",
                phonetic: "/ˌdʒenəˈreɪʃn/",
                type: "noun",
                meaning: "thế hệ",
                example: "Three generations of our family live in this house.",
                exampleVi: "Ba thế hệ của gia đình chúng tôi sống trong ngôi nhà này."
            },
            {
                word: "reunion",
                phonetic: "/riːˈjuːniən/",
                type: "noun",
                meaning: "cuộc sum họp, đoàn tụ",
                example: "We have a family reunion every summer.",
                exampleVi: "Chúng tôi có cuộc sum họp gia đình mỗi mùa hè."
            },
            {
                word: "supportive",
                phonetic: "/səˈpɔːrtɪv/",
                type: "adjective",
                meaning: "ủng hộ, hỗ trợ",
                example: "My family has always been very supportive of my dreams.",
                exampleVi: "Gia đình tôi luôn rất ủng hộ những ước mơ của tôi."
            }
        ]
    },
    work: {
        title: "Work & Study - Công việc & Học tập",
        words: [
            {
                word: "deadline",
                phonetic: "/ˈdedlaɪn/",
                type: "noun",
                meaning: "thời hạn, hạn chót",
                example: "The deadline for this project is next Friday.",
                exampleVi: "Thời hạn cho dự án này là thứ Sáu tuần tới."
            },
            {
                word: "assignment",
                phonetic: "/əˈsaɪnmənt/",
                type: "noun",
                meaning: "bài tập, nhiệm vụ được giao",
                example: "I need to finish my assignment before tomorrow.",
                exampleVi: "Tôi cần hoàn thành bài tập trước ngày mai."
            },
            {
                word: "concentrate",
                phonetic: "/ˈkɒnsntreɪt/",
                type: "verb",
                meaning: "tập trung",
                example: "It's hard to concentrate with so much noise.",
                exampleVi: "Thật khó để tập trung khi có quá nhiều tiếng ồn."
            },
            {
                word: "productivity",
                phonetic: "/ˌprɒdʌkˈtɪvəti/",
                type: "noun",
                meaning: "năng suất",
                example: "Working from home has increased my productivity.",
                exampleVi: "Làm việc tại nhà đã tăng năng suất của tôi."
            },
            {
                word: "presentation",
                phonetic: "/ˌprezənˈteɪʃn/",
                type: "noun",
                meaning: "bài thuyết trình",
                example: "I have to give a presentation to the board tomorrow.",
                exampleVi: "Tôi phải thuyết trình trước hội đồng ngày mai."
            },
            {
                word: "research",
                phonetic: "/rɪˈsɜːrtʃ/",
                type: "noun/verb",
                meaning: "nghiên cứu",
                example: "We need more research before making a decision.",
                exampleVi: "Chúng ta cần nghiên cứu thêm trước khi đưa ra quyết định."
            },
            {
                word: "schedule",
                phonetic: "/ˈʃedjuːl/",
                type: "noun/verb",
                meaning: "lịch trình, sắp xếp lịch",
                example: "Let me check my schedule for next week.",
                exampleVi: "Để tôi kiểm tra lịch trình tuần sau."
            },
            {
                word: "collaborate",
                phonetic: "/kəˈlæbəreɪt/",
                type: "verb",
                meaning: "cộng tác, hợp tác",
                example: "We need to collaborate more effectively as a team.",
                exampleVi: "Chúng ta cần hợp tác hiệu quả hơn như một đội."
            },
            {
                word: "achievement",
                phonetic: "/əˈtʃiːvmənt/",
                type: "noun",
                meaning: "thành tựu, thành tích",
                example: "Getting this promotion is a great achievement.",
                exampleVi: "Được thăng chức là một thành tựu tuyệt vời."
            },
            {
                word: "motivated",
                phonetic: "/ˈməʊtɪveɪtɪd/",
                type: "adjective",
                meaning: "có động lực",
                example: "I feel very motivated to learn new skills.",
                exampleVi: "Tôi cảm thấy rất có động lực để học các kỹ năng mới."
            }
        ]
    },
    travel: {
        title: "Travel - Du lịch",
        words: [
            {
                word: "destination",
                phonetic: "/ˌdestɪˈneɪʃn/",
                type: "noun",
                meaning: "điểm đến, đích đến",
                example: "Paris is a popular tourist destination.",
                exampleVi: "Paris là một điểm đến du lịch phổ biến."
            },
            {
                word: "itinerary",
                phonetic: "/aɪˈtɪnərəri/",
                type: "noun",
                meaning: "lịch trình du lịch",
                example: "I've planned a detailed itinerary for our trip.",
                exampleVi: "Tôi đã lập một lịch trình chi tiết cho chuyến đi của chúng ta."
            },
            {
                word: "accommodation",
                phonetic: "/əˌkɒməˈdeɪʃn/",
                type: "noun",
                meaning: "chỗ ở, nơi lưu trú",
                example: "We need to book accommodation in advance.",
                exampleVi: "Chúng ta cần đặt chỗ ở trước."
            },
            {
                word: "luggage",
                phonetic: "/ˈlʌɡɪdʒ/",
                type: "noun",
                meaning: "hành lý",
                example: "Please don't leave your luggage unattended.",
                exampleVi: "Vui lòng không để hành lý không có người trông."
            },
            {
                word: "sightseeing",
                phonetic: "/ˈsaɪtsiːɪŋ/",
                type: "noun",
                meaning: "tham quan, ngắm cảnh",
                example: "We spent the day sightseeing around the city.",
                exampleVi: "Chúng tôi dành cả ngày để tham quan quanh thành phố."
            },
            {
                word: "souvenir",
                phonetic: "/ˌsuːvəˈnɪər/",
                type: "noun",
                meaning: "quà lưu niệm",
                example: "I bought some souvenirs for my family.",
                exampleVi: "Tôi đã mua một số quà lưu niệm cho gia đình."
            },
            {
                word: "adventure",
                phonetic: "/ədˈventʃər/",
                type: "noun",
                meaning: "cuộc phiêu lưu",
                example: "Traveling alone was quite an adventure.",
                exampleVi: "Du lịch một mình thực sự là một cuộc phiêu lưu."
            },
            {
                word: "explore",
                phonetic: "/ɪkˈsplɔːr/",
                type: "verb",
                meaning: "khám phá",
                example: "I love to explore new places and cultures.",
                exampleVi: "Tôi thích khám phá những địa điểm và văn hóa mới."
            },
            {
                word: "journey",
                phonetic: "/ˈdʒɜːrni/",
                type: "noun",
                meaning: "cuộc hành trình",
                example: "The journey takes about three hours by train.",
                exampleVi: "Cuộc hành trình mất khoảng ba giờ bằng tàu hỏa."
            },
            {
                word: "tourist",
                phonetic: "/ˈtʊərɪst/",
                type: "noun",
                meaning: "khách du lịch",
                example: "The city attracts millions of tourists every year.",
                exampleVi: "Thành phố thu hút hàng triệu khách du lịch mỗi năm."
            }
        ]
    }
};