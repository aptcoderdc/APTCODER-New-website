/**
 * Hindi translations for the website, used only when the visitor picks हिं in the language toggle.
 * The English website is never changed: these entries map the exact English text shown on the
 * page (whitespace collapsed) to its Hindi version, and HindiTranslator swaps it on screen.
 *
 * Kept in English on purpose: brand and product names (APTCODER, Vernatics, C-NAT, Codely, KCC,
 * Python, JavaScript), people's names, school names, course titles, publication names and the
 * legal pages (Privacy Policy, Terms & Conditions), whose wording was provided as-is.
 *
 * To translate new English text, add it here exactly as it appears on the page.
 */

export const categoryHi: Record<string, string> = {
  "AI & Data Science": "AI और डेटा साइंस",
  Vernatics: "Vernatics",
  "Coding Foundations": "कोडिंग की बुनियाद",
  Python: "Python",
  "Web Development": "वेब डेवलपमेंट",
  JavaScript: "JavaScript",
  "App Development": "ऐप डेवलपमेंट",
  "Games & Creative Coding": "गेम्स और क्रिएटिव कोडिंग",
  "Blockchain & Cryptography": "ब्लॉकचेन और क्रिप्टोग्राफ़ी",
  "Cloud Computing": "क्लाउड कंप्यूटिंग",
  Other: "अन्य",
};

export const hi: Record<string, string> = {
  ...categoryHi,

  // ── Header, footer and shared ────────────────────────────────────────────────────────────
  Courses: "कोर्स",
  School: "स्कूल",
  About: "हमारे बारे में",
  "Contact Us": "संपर्क करें",
  Careers: "करियर",
  "Website language": "वेबसाइट की भाषा",
  Language: "भाषा",
  "Search courses": "कोर्स खोजें",
  "Sign In": "साइन इन",
  "Join for Free": "मुफ़्त जुड़ें",
  "Close menu": "मेन्यू बंद करें",
  "Open menu": "मेन्यू खोलें",
  "APTCODER home": "APTCODER होम",
  "Our Courses": "हमारे कोर्स",
  "Vernatics (Robotics)": "Vernatics (रोबोटिक्स)",
  "C-NAT Olympiad": "C-NAT ओलंपियाड",
  "Kids Coding Community": "किड्स कोडिंग कम्युनिटी",
  "School Partnership": "स्कूल साझेदारी",
  "Codely Platform": "Codely प्लेटफ़ॉर्म",
  "About Us": "हमारे बारे में",
  "Our Team": "हमारी टीम",
  "Partner With Us": "हमारे साथ साझेदारी करें",
  "Privacy Policy": "गोपनीयता नीति",
  "Terms & Conditions": "नियम और शर्तें",
  "Helping children across India explore AI, robotics and coding in a language they understand best.":
    "पूरे भारत के बच्चों को उनकी सबसे अच्छी समझ वाली भाषा में AI, रोबोटिक्स और कोडिंग सीखने में मदद।",
  "Our Offerings": "हमारी पेशकश",
  Company: "कंपनी",
  "Get In Touch": "संपर्क करें",
  "Book a Free Class →": "मुफ़्त क्लास बुक करें →",
  "Book a Free Class": "मुफ़्त क्लास बुक करें",
  "© 2024 APTCODER. All rights reserved.": "© 2024 APTCODER. सर्वाधिकार सुरक्षित।",
  "OUR ECOSYSTEM PARTNERS": "हमारे इकोसिस्टम पार्टनर",
  "Chat with us on WhatsApp": "WhatsApp पर हमसे बात करें",
  Close: "बंद करें",
  Done: "हो गया",
  "(optional)": "(वैकल्पिक)",
  "Sending…": "भेजा जा रहा है…",
  "Page not found": "पेज नहीं मिला",
  "The page you're looking for doesn't exist or has been moved.":
    "आप जो पेज ढूँढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",
  "Go home": "होम पर जाएँ",
  "This page didn't load": "यह पेज लोड नहीं हुआ",
  "Something went wrong on our end. You can try refreshing or head back home.":
    "हमारी ओर से कुछ गड़बड़ हो गई। आप पेज रिफ़्रेश कर सकते हैं या होम पर लौट सकते हैं।",
  "Try again": "फिर से कोशिश करें",

  // Tab titles
  "APTCODER | Home": "APTCODER | होम",
  "APTCODER | About Us": "APTCODER | हमारे बारे में",
  "APTCODER | Courses": "APTCODER | कोर्स",
  "APTCODER | For Schools": "APTCODER | स्कूलों के लिए",
  "APTCODER | Contact Us": "APTCODER | संपर्क करें",
  "APTCODER | Careers": "APTCODER | करियर",
  "APTCODER | Vernatics Robotics": "APTCODER | Vernatics रोबोटिक्स",
  "APTCODER | C-NAT Coding Olympiad": "APTCODER | C-NAT कोडिंग ओलंपियाड",

  // ── Homepage ──────────────────────────────────────────────────────────────────────────────
  "CHILDREN · TECHNOLOGY · BRIGHTER TOMORROWS": "बच्चे · तकनीक · उज्ज्वल भविष्य",
  "From Curious Minds": "जिज्ञासु मन से",
  "to Confident Creators.": "आत्मविश्वासी रचनाकारों तक।",
  "AI, Robotics & Coding — Made Understandable for Every Child.":
    "AI, रोबोटिक्स और कोडिंग — हर बच्चे के लिए आसान और समझने योग्य।",
  "Children explore AI, robotics and coding through a language they understand best — so they can focus on understanding ideas, solving problems and creating with technology.":
    "बच्चे AI, रोबोटिक्स और कोडिंग उस भाषा में सीखते हैं जिसे वे सबसे अच्छी तरह समझते हैं — ताकि वे विचारों को समझने, समस्याएँ हल करने और तकनीक से कुछ नया बनाने पर ध्यान दे सकें।",
  "ENROLLING NOW": "नामांकन जारी है",
  "Explore Programs": "प्रोग्राम देखें",
  "AI & Robotics Programs": "AI और रोबोटिक्स प्रोग्राम",
  "Explore AI, robotics and technology through engaging, hands-on learning experiences.":
    "दिलचस्प, हैंड्स-ऑन अनुभवों के ज़रिए AI, रोबोटिक्स और तकनीक को जानें।",
  "REAL PROJECTS. REAL SKILLS.": "असली प्रोजेक्ट। असली कौशल।",
  "What Can Your Child Build?": "आपका बच्चा क्या बना सकता है?",
  "From games and websites to AI, robotics and smart devices, children learn by turning ideas into things that actually work.":
    "गेम्स और वेबसाइट से लेकर AI, रोबोटिक्स और स्मार्ट डिवाइस तक — बच्चे अपने विचारों को सचमुच काम करने वाली चीज़ों में बदलकर सीखते हैं।",
  "Project categories": "प्रोजेक्ट श्रेणियाँ",
  "SHOW LESS −": "कम दिखाएँ −",
  "MORE POSSIBILITIES +": "और संभावनाएँ +",
  "See example projects & courses +": "उदाहरण प्रोजेक्ट और कोर्स देखें +",
  "Show less −": "कम दिखाएँ −",
  "Open the screenshot full size ↗": "स्क्रीनशॉट पूरे आकार में खोलें ↗",
  "SKILLS THEY PRACTISE": "वे कौन-से कौशल अभ्यास करते हैं",
  "EXAMPLE PROJECTS": "उदाहरण प्रोजेक्ट",
  "RELEVANT APTCODER LEARNING": "संबंधित APTCODER लर्निंग",
  "Explore Courses →": "कोर्स देखें →",
  "IDEAS BEYOND THE SCREEN": "स्क्रीन से आगे के विचार",
  "Technology is not just something to learn. It is something to use, question and create with.":
    "तकनीक सिर्फ़ सीखने की चीज़ नहीं है। यह इस्तेमाल करने, सवाल पूछने और कुछ नया रचने का ज़रिया है।",
  "The next idea could be theirs.": "अगला बड़ा विचार उनका हो सकता है।",
  Games: "गेम्स",
  "Build platforms, puzzles and arcade games with real logic.":
    "असली लॉजिक के साथ प्लेटफ़ॉर्म, पज़ल और आर्केड गेम्स बनाएँ।",
  Logic: "लॉजिक",
  Loops: "लूप्स",
  Events: "इवेंट्स",
  "Maze Game": "भूलभुलैया गेम",
  Platformer: "प्लेटफ़ॉर्मर",
  "Quiz Game": "क्विज़ गेम",
  "Block Coding": "ब्लॉक कोडिंग",
  "Build a strong foundation with visual code.": "विज़ुअल कोड के साथ मज़बूत नींव बनाएँ।",
  "Bring game ideas to life with text-based code.":
    "टेक्स्ट-आधारित कोड से गेम के विचारों को साकार करें।",
  Websites: "वेबसाइट",
  "Design and build interactive pages that share an idea.":
    "ऐसे इंटरैक्टिव पेज डिज़ाइन करें और बनाएँ जो कोई विचार साझा करें।",
  HTML: "HTML",
  CSS: "CSS",
  Interaction: "इंटरैक्शन",
  "Personal website": "निजी वेबसाइट",
  "Story page": "कहानी पेज",
  "Mini portfolio": "मिनी पोर्टफ़ोलियो",
  "Design and build your own websites using HTML, CSS and modern tools.":
    "HTML, CSS और आधुनिक टूल्स से अपनी वेबसाइट डिज़ाइन करें और बनाएँ।",
  Apps: "ऐप्स",
  "Create useful experiences that solve everyday problems.":
    "रोज़मर्रा की समस्याएँ हल करने वाले उपयोगी अनुभव बनाएँ।",
  "Problem solving": "समस्या समाधान",
  "UI thinking": "UI सोच",
  Calculator: "कैलकुलेटर",
  "Habit tracker": "आदत ट्रैकर",
  "Simple app": "सरल ऐप",
  "Build your own mobile apps and turn your ideas into real applications.":
    "अपने मोबाइल ऐप्स बनाएँ और अपने विचारों को असली एप्लिकेशन में बदलें।",
  Robotics: "रोबोटिक्स",
  "Program physical robots that sense and respond.":
    "ऐसे असली रोबोट प्रोग्राम करें जो महसूस करें और प्रतिक्रिया दें।",
  Sensors: "सेंसर",
  Testing: "टेस्टिंग",
  Automation: "ऑटोमेशन",
  "Robot mission": "रोबोट मिशन",
  "Sensor response": "सेंसर प्रतिक्रिया",
  "Movement sequence": "मूवमेंट क्रम",
  "Robotics with Vernatics": "Vernatics के साथ रोबोटिक्स",
  "Program physical robots and bring code to life in the real world.":
    "असली रोबोट प्रोग्राम करें और कोड को असली दुनिया में जीवंत करें।",
  "Animation & Interactive Stories": "एनिमेशन और इंटरैक्टिव कहानियाँ",
  "Bring characters and stories to life through choices and motion.":
    "विकल्पों और गति के ज़रिए किरदारों और कहानियों को जीवंत करें।",
  Sequencing: "क्रम बनाना",
  Storytelling: "कहानी कहना",
  "Interactive story": "इंटरैक्टिव कहानी",
  "Character scene": "किरदार दृश्य",
  Animation: "एनिमेशन",
  "Learn coding with blocks and build stories, animations and interactive projects.":
    "ब्लॉक्स से कोडिंग सीखें और कहानियाँ, एनिमेशन व इंटरैक्टिव प्रोजेक्ट बनाएँ।",
  "AI Projects": "AI प्रोजेक्ट",
  "Explore patterns, data and machine learning through experiments.":
    "प्रयोगों के ज़रिए पैटर्न, डेटा और मशीन लर्निंग को जानें।",
  Patterns: "पैटर्न",
  Data: "डेटा",
  "AI concepts": "AI की अवधारणाएँ",
  Classifier: "क्लासिफ़ायर",
  "Prediction experiment": "भविष्यवाणी प्रयोग",
  "Simple chatbot": "सरल चैटबॉट",
  "AI & Machine Learning": "AI और मशीन लर्निंग",
  "Explore AI concepts and build chatbots, image projects and smart applications.":
    "AI की अवधारणाएँ जानें और चैटबॉट, इमेज प्रोजेक्ट व स्मार्ट एप्लिकेशन बनाएँ।",
  "Make Everyday Tasks Smarter": "रोज़मर्रा के काम स्मार्ट बनाएँ",
  "Notice a problem. Design a better way.": "समस्या पहचानें। बेहतर तरीका बनाएँ।",
  "Build Something That Reacts": "कुछ ऐसा बनाएँ जो प्रतिक्रिया दे",
  "Connect an input to a visible response.": "किसी इनपुट को दिखने वाली प्रतिक्रिया से जोड़ें।",
  "Turn an Idea into a Working Prototype": "विचार को काम करने वाले प्रोटोटाइप में बदलें",
  "Make, test and improve a first version.": "पहला संस्करण बनाएँ, परखें और बेहतर करें।",
  "Create for Other People": "दूसरों के लिए बनाएँ",
  "Think about who will use what you make.": "सोचें कि आपकी बनाई चीज़ कौन इस्तेमाल करेगा।",
  "Solve a Challenge in a New Way": "चुनौती को नए तरीके से हल करें",
  "Question the obvious answer and try again.": "सीधे-सादे जवाब पर सवाल उठाएँ और फिर कोशिश करें।",
  "Bring the Physical and Digital Together": "भौतिक और डिजिटल को साथ लाएँ",
  "Use code, controls and sensors as one system.":
    "कोड, कंट्रोल और सेंसर को एक सिस्टम की तरह इस्तेमाल करें।",
  "OUR OFFERINGS": "हमारी पेशकश",
  "Explore the APTCODER Ecosystem.": "APTCODER इकोसिस्टम को जानें।",
  "Learn, build, take on challenges and keep creating with APTCODER.":
    "APTCODER के साथ सीखें, बनाएँ, चुनौतियाँ लें और रचते रहें।",
  "MEET VERNATICS": "Vernatics से मिलिए",
  "Code a Robot. Watch It Respond.": "रोबोट को कोड करें। उसकी प्रतिक्रिया देखें।",
  "Program a real robot, control it wirelessly from anywhere, work with sensors and experiment in the language you understand best.":
    "असली रोबोट प्रोग्राम करें, उसे कहीं से भी वायरलेस तरीके से चलाएँ, सेंसर के साथ काम करें और अपनी सबसे अच्छी समझ वाली भाषा में प्रयोग करें।",
  CODE: "कोड",
  CONTROL: "कंट्रोल",
  SENSE: "सेंस",
  CREATE: "क्रिएट",
  "Give it instructions.": "उसे निर्देश दें।",
  "Operate it from anywhere.": "कहीं से भी चलाएँ।",
  "Use sensors to detect and respond.": "सेंसर से पहचानें और प्रतिक्रिया दें।",
  "Test. Change. Try again.": "परखें। बदलें। फिर कोशिश करें।",
  "Learn Robotics in Your Language": "अपनी भाषा में रोबोटिक्स सीखें",
  "Explore Vernatics →": "Vernatics देखें →",
  "EXPLORE OUR COURSES": "हमारे कोर्स देखें",
  "Courses & Learning Paths": "कोर्स और लर्निंग पाथ",
  "Find a learning approach that works for your child. Explore coding, AI and other technology learning opportunities through live instruction, guided support or self-paced learning.":
    "अपने बच्चे के लिए सही सीखने का तरीका चुनें। लाइव क्लास, मार्गदर्शन सहित सहायता या अपनी गति से सीखने के ज़रिए कोडिंग, AI और अन्य तकनीकी अवसर जानें।",
  "Browse Courses →": "कोर्स देखें →",
  "Learning models": "सीखने के मॉडल",
  LIVE: "लाइव",
  "Learn with an instructor in real time.": "इंस्ट्रक्टर के साथ रियल टाइम में सीखें।",
  "ASSISTED LEARNING": "असिस्टेड लर्निंग",
  "Learn independently with support when needed.":
    "स्वतंत्र रूप से सीखें, ज़रूरत पड़ने पर मदद के साथ।",
  "SELF-LEARNING": "सेल्फ़-लर्निंग",
  "Learn at your own pace with recorded lessons and practice.":
    "रिकॉर्डेड पाठों और अभ्यास के साथ अपनी गति से सीखें।",
  "A national coding challenge where young learners test their skills, compete in coding tracks and earn recognition for what they can do.":
    "एक राष्ट्रीय कोडिंग चुनौती, जहाँ युवा विद्यार्थी अपने कौशल परखते हैं, कोडिंग ट्रैक में प्रतिस्पर्धा करते हैं और अपनी क्षमता के लिए पहचान पाते हैं।",
  "CHOOSE YOUR TRACK": "अपना ट्रैक चुनें",
  "TAKE THE CHALLENGE": "चुनौती लें",
  "EARN RECOGNITION": "पहचान पाएँ",
  "Explore C-NAT →": "C-NAT देखें →",
  "The Kids Coding Community": "किड्स कोडिंग कम्युनिटी",
  "Keep learning long after the class ends, in a free community for continued learning, building, sharing and problem-solving.":
    "क्लास खत्म होने के बाद भी सीखते रहें — लगातार सीखने, बनाने, साझा करने और समस्याएँ हल करने के लिए एक मुफ़्त कम्युनिटी में।",
  "Lifetime Free Community": "आजीवन मुफ़्त कम्युनिटी",
  LEARN: "सीखें",
  BUILD: "बनाएँ",
  SHARE: "साझा करें",
  SOLVE: "हल करें",
  GROW: "आगे बढ़ें",
  "Join KCC →": "KCC से जुड़ें →",
  "Questions? We’ve Got Answers.": "सवाल हैं? हमारे पास जवाब हैं।",
  "Clear answers about learning with APTCODER.": "APTCODER के साथ सीखने के बारे में साफ़ जवाब।",
  "READY TO BEGIN?": "शुरू करने के लिए तैयार?",
  "Turn Curiosity Into Something Your Child Can Build.":
    "जिज्ञासा को ऐसी चीज़ में बदलें जिसे आपका बच्चा बना सके।",
  "Start with a conversation and find a learning path that fits your child.":
    "बातचीत से शुरुआत करें और अपने बच्चे के लिए सही लर्निंग पाथ चुनें।",

  // FAQs
  "What age groups can join APTCODER?": "APTCODER से किस उम्र के बच्चे जुड़ सकते हैं?",
  "APTCODER offers grade-appropriate learning paths for children across Grades 1–12.":
    "APTCODER कक्षा 1–12 के बच्चों के लिए कक्षा के अनुसार लर्निंग पाथ देता है।",
  "Does my child need prior coding experience?": "क्या मेरे बच्चे को पहले से कोडिंग आनी चाहिए?",
  "No. Children can begin with foundational lessons and progress from there.":
    "नहीं। बच्चे बुनियादी पाठों से शुरुआत करके आगे बढ़ सकते हैं।",
  "What will my child actually learn?": "मेरा बच्चा असल में क्या सीखेगा?",
  "Children learn to think through problems, build working outcomes, test ideas and improve what they create.":
    "बच्चे समस्याओं पर सोचना, काम करने वाले नतीजे बनाना, विचारों को परखना और अपनी रचना को बेहतर बनाना सीखते हैं।",
  "How do Live, Assisted and Self-Learning work?":
    "लाइव, असिस्टेड और सेल्फ़-लर्निंग कैसे काम करते हैं?",
  "Live includes real-time instruction, Assisted combines independent learning with support, and Self-Learning uses recorded lessons and practice.":
    "लाइव में रियल-टाइम पढ़ाई होती है, असिस्टेड में स्वतंत्र पढ़ाई के साथ मदद मिलती है, और सेल्फ़-लर्निंग में रिकॉर्डेड पाठ और अभ्यास होते हैं।",
  "What is Vernatics?": "Vernatics क्या है?",
  "Vernatics is APTCODER’s hands-on robotics experience where children program and control a real robot, work with sensors and test their ideas.":
    "Vernatics, APTCODER का हैंड्स-ऑन रोबोटिक्स अनुभव है, जहाँ बच्चे असली रोबोट को प्रोग्राम और कंट्रोल करते हैं, सेंसर के साथ काम करते हैं और अपने विचार परखते हैं।",
  "Can children learn robotics in a regional language?":
    "क्या बच्चे क्षेत्रीय भाषा में रोबोटिक्स सीख सकते हैं?",
  "APTCODER supports robotics learning through its regional-language approach. Ask the team which language options are currently available.":
    "APTCODER अपनी क्षेत्रीय-भाषा पद्धति से रोबोटिक्स सीखने में मदद करता है। अभी कौन-सी भाषाएँ उपलब्ध हैं, यह टीम से पूछें।",
  "What is C-NAT?": "C-NAT क्या है?",
  "C-NAT is India’s Coding Olympiad, where learners choose a track, take a coding challenge and earn recognition.":
    "C-NAT भारत का कोडिंग ओलंपियाड है, जहाँ विद्यार्थी एक ट्रैक चुनते हैं, कोडिंग चुनौती लेते हैं और पहचान पाते हैं।",
  "What is KCC?": "KCC क्या है?",
  "KCC is the Kids Coding Community, a free community for continued learning, building, sharing and problem-solving.":
    "KCC यानी किड्स कोडिंग कम्युनिटी — लगातार सीखने, बनाने, साझा करने और समस्याएँ हल करने के लिए एक मुफ़्त कम्युनिटी।",
  "How do you track my child’s progress?": "आप मेरे बच्चे की प्रगति कैसे देखते हैं?",
  "Progress is followed through lesson completion, practice, projects and instructor feedback where applicable.":
    "प्रगति पाठ पूरे करने, अभ्यास, प्रोजेक्ट और जहाँ लागू हो वहाँ इंस्ट्रक्टर के फ़ीडबैक से देखी जाती है।",
  "Can schools work with APTCODER?": "क्या स्कूल APTCODER के साथ काम कर सकते हैं?",
  "Yes. Schools can contact APTCODER to discuss current programs and suitable learning formats.":
    "हाँ। स्कूल मौजूदा प्रोग्राम और उपयुक्त सीखने के तरीकों पर बात करने के लिए APTCODER से संपर्क कर सकते हैं।",

  // Spotlight and testimonials
  "APTCODER IN THE SPOTLIGHT": "सुर्ख़ियों में APTCODER",
  "From India to the World": "भारत से दुनिया तक",
  "Discover APTCODER’s media features, institutional milestones and growing impact in technology education.":
    "मीडिया में APTCODER, संस्थागत उपलब्धियाँ और तकनीकी शिक्षा में बढ़ता असर जानें।",
  "Previous article": "पिछला लेख",
  "Next article": "अगला लेख",
  "APTCODER news and coverage": "APTCODER समाचार और कवरेज",
  "Read Article": "लेख पढ़ें",
  "View Coverage": "कवरेज देखें",
  "Hindi newspaper": "हिंदी समाचार पत्र",
  Print: "प्रिंट",
  "Press release": "प्रेस विज्ञप्ति",
  Announcement: "घोषणा",
  "Case study": "केस स्टडी",
  Blog: "ब्लॉग",
  "Initiative at Government Model Sanskriti School": "गवर्नमेंट मॉडल संस्कृति स्कूल में पहल",
  "APTCODER in Middle East": "मिडिल ईस्ट में APTCODER",
  "MoU with the Varanasi Administration": "वाराणसी प्रशासन के साथ MoU",
  "This initiative, launched at Government Model Sanskriti Primary School, Budhanpur, Panchkula, marks a significant and proud milestone for our organization. It represents a meaningful step toward bridging the digital divide by introducing coding literacy to children from Below Poverty Line (BPL) families, who often have limited access to quality technological education. With the valuable support of the Government of India’s Department of Science and Technology, this program is designed to make coding education inclusive, accessible, and impactful. A key strength of the initiative is the delivery of coding concepts in students’ native languages, ensuring better understanding, engagement, and long-term learning outcomes. By removing language and economic barriers, we are not only teaching coding but also nurturing curiosity, problem-solving abilities, and future-ready skills among young learners. This initiative reflects our commitment to creating equal learning opportunities and enabling every child, regardless of background, to aspire, learn, and succeed in the digital age.":
    "गवर्नमेंट मॉडल संस्कृति प्राइमरी स्कूल, बुढ़नपुर, पंचकूला में शुरू की गई यह पहल हमारे संगठन के लिए एक अहम और गर्व का पड़ाव है। यह गरीबी रेखा से नीचे (BPL) के परिवारों के बच्चों तक कोडिंग साक्षरता पहुँचाकर डिजिटल अंतर को कम करने की दिशा में एक सार्थक कदम है, जिन्हें अक्सर अच्छी तकनीकी शिक्षा कम मिल पाती है। भारत सरकार के विज्ञान और प्रौद्योगिकी विभाग के सहयोग से यह प्रोग्राम कोडिंग शिक्षा को समावेशी, सुलभ और प्रभावी बनाने के लिए तैयार किया गया है। इस पहल की एक बड़ी ख़ूबी है कोडिंग की अवधारणाओं को विद्यार्थियों की अपनी भाषा में पढ़ाना, जिससे बेहतर समझ, भागीदारी और लंबे समय तक सीखने के नतीजे मिलते हैं। भाषा और आर्थिक बाधाएँ हटाकर हम सिर्फ़ कोडिंग नहीं सिखा रहे, बल्कि युवा विद्यार्थियों में जिज्ञासा, समस्या-समाधान क्षमता और भविष्य के लिए ज़रूरी कौशल भी विकसित कर रहे हैं। यह पहल समान सीखने के अवसर बनाने और हर बच्चे को, चाहे उसकी पृष्ठभूमि कुछ भी हो, डिजिटल युग में सपने देखने, सीखने और सफल होने में सक्षम बनाने की हमारी प्रतिबद्धता दिखाती है।",
  "AptCoder (SNN Eduworld Pvt Ltd) is one of the 10 startups selected for the UNNATI AI Accelerator cohort, listed under Education as a vernacular EdTech platform for coding, robotics, AI and STEM education.":
    "AptCoder (SNN Eduworld Pvt Ltd) UNNATI AI Accelerator समूह के लिए चुने गए 10 स्टार्टअप में से एक है, जिसे शिक्षा श्रेणी में कोडिंग, रोबोटिक्स, AI और STEM शिक्षा के लिए स्थानीय भाषा के EdTech प्लेटफ़ॉर्म के रूप में शामिल किया गया है।",
  "Crossing the sea, for coding literacy: APTCODER is delighted to join hands with Al-Imtehaan, stretching out coding literacy among the Middle East, also introducing coding in Arabic.":
    "कोडिंग साक्षरता के लिए समंदर पार: APTCODER को Al-Imtehaan के साथ हाथ मिलाकर ख़ुशी है, ताकि मिडिल ईस्ट में कोडिंग साक्षरता फैले और अरबी भाषा में भी कोडिंग शुरू हो।",
  "How Ailoitte built AptCoder, an online coding school for kids: course website, free trial booking, a student and parent portal and tools for live classes.":
    "Ailoitte ने बच्चों के ऑनलाइन कोडिंग स्कूल AptCoder को कैसे बनाया: कोर्स वेबसाइट, मुफ़्त ट्रायल बुकिंग, विद्यार्थी और अभिभावक पोर्टल और लाइव क्लास के टूल्स।",
  "Signed an MoU with the Varanasi Administration for APTCODER CSR initiative, under the Chairpersonship of Hon. Governor of Uttar Pradesh, Smt. Anandiben Patel.":
    "उत्तर प्रदेश की माननीय राज्यपाल श्रीमती आनंदीबेन पटेल की अध्यक्षता में APTCODER की CSR पहल के लिए वाराणसी प्रशासन के साथ MoU पर हस्ताक्षर किए।",
  "Miracle Foundation India describes bringing coding to children in its care, including a demo session with AptCoder attended by 16 children from 8 Child Care Institutions, with positive feedback from children and social workers.":
    "Miracle Foundation India बताता है कि उसने अपनी देखरेख वाले बच्चों तक कोडिंग कैसे पहुँचाई, जिसमें AptCoder के साथ एक डेमो सेशन भी शामिल था। इसमें 8 चाइल्ड केयर संस्थानों के 16 बच्चों ने भाग लिया और बच्चों व सामाजिक कार्यकर्ताओं से अच्छा फ़ीडबैक मिला।",
  "VOICES FROM THE APTCODER ECOSYSTEM": "APTCODER इकोसिस्टम की आवाज़ें",
  "Different Perspectives. One Shared Journey.": "अलग-अलग नज़रिए। एक साझा सफ़र।",
  "Hear from the learners, families, educators, schools and partners who experience APTCODER in different ways.":
    "उन विद्यार्थियों, परिवारों, शिक्षकों, स्कूलों और पार्टनर्स की बात सुनें जो APTCODER को अलग-अलग तरह से अनुभव करते हैं।",
  "STUDENT VOICE": "विद्यार्थी की आवाज़",
  "PARENT EXPERIENCE": "अभिभावक का अनुभव",
  "TEACHER PERSPECTIVE": "शिक्षक का नज़रिया",
  "SCHOOL PERSPECTIVE": "स्कूल का नज़रिया",
  "APTCODER student": "APTCODER विद्यार्थी",
  "Class 8": "कक्षा 8",
  "Computer Teacher": "कंप्यूटर शिक्षक",
  "A parent shares their child’s APTCODER journey":
    "एक अभिभावक अपने बच्चे का APTCODER सफ़र साझा करते हैं",
  "A parent speaking about APTCODER": "APTCODER के बारे में बात करते एक अभिभावक",
  "The principal of Atal Awasiya Vidyalaya speaking about APTCODER":
    "APTCODER के बारे में बात करते अटल आवासीय विद्यालय के प्रधानाचार्य",
  "Principal, Atal Awasiya Vidyalaya, Varanasi": "प्रधानाचार्य, अटल आवासीय विद्यालय, वाराणसी",
  "Before joining APTCODER, I didn’t know much about coding. Now I have learned how to create programs and understand how coding works. The classes are fun, and I really enjoy learning new things and trying them myself. I want to learn more and make my own projects!":
    "APTCODER से जुड़ने से पहले मुझे कोडिंग के बारे में ज़्यादा नहीं पता था। अब मैंने प्रोग्राम बनाना और कोडिंग कैसे काम करती है, यह समझना सीख लिया है। क्लासें मज़ेदार हैं, और मुझे नई चीज़ें सीखना और ख़ुद आज़माना बहुत अच्छा लगता है। मैं और सीखना और अपने प्रोजेक्ट बनाना चाहता हूँ!",
  "Students thoroughly enjoyed the APTCODER classes and gained a lot of new knowledge through the sessions. Coding was a completely new concept for many of them, but they understood the lessons very well and participated enthusiastically. It is wonderful to see children learning new concepts, exploring technology and developing their skills through APTCODER.":
    "विद्यार्थियों ने APTCODER की क्लासों का भरपूर आनंद लिया और इन सत्रों से बहुत कुछ नया सीखा। कई बच्चों के लिए कोडिंग बिल्कुल नई चीज़ थी, फिर भी उन्होंने पाठ बहुत अच्छे से समझे और उत्साह से भाग लिया। बच्चों को APTCODER के ज़रिए नई अवधारणाएँ सीखते, तकनीक को जानते और अपने कौशल निखारते देखना बहुत अच्छा लगता है।",
  "Close video": "वीडियो बंद करें",
  Zoom: "ज़ूम",
  "Zoom out": "ज़ूम आउट",
  "Zoom in": "ज़ूम इन",
  "Reset zoom": "ज़ूम रीसेट करें",
  "Close viewer": "व्यूअर बंद करें",

  // Codely demo
  "TRY CODELY": "Codely आज़माएँ",
  "Code it. Run it.": "कोड करें। चलाएँ।",
  "Fix it.": "ठीक करें।",
  "Build a program from simple instructions, run it, and watch the robot follow your code. If it goes wrong, change the instructions and try again. That's real programming!":
    "आसान निर्देशों से एक प्रोग्राम बनाएँ, उसे चलाएँ और रोबोट को अपने कोड पर चलते देखें। गड़बड़ हो तो निर्देश बदलें और फिर कोशिश करें। यही असली प्रोग्रामिंग है!",
  Challenge: "चुनौती",
  of: "/",
  "Choose a challenge": "चुनौती चुनें",
  Escape: "Esc",
  "Close and look at the playground": "बंद करें और प्लेग्राउंड देखें",
  "AMAZING! YOU DID IT!": "शानदार! आपने कर दिखाया!",
  "You successfully programmed the robot!": "आपने रोबोट को सफलतापूर्वक प्रोग्राम कर दिया!",
  Instructions: "निर्देश",
  "Steps run": "चले कदम",
  "Squares moved": "तय किए खाने",
  "That's the shortest possible program. Brilliant!":
    "यह सबसे छोटा संभव प्रोग्राम है। बहुत बढ़िया!",
  "Play Again": "फिर से खेलें",
  "Try Another Challenge": "दूसरी चुनौती आज़माएँ",
  "Back to Challenge 1": "चुनौती 1 पर लौटें",
  "Robot = you": "रोबोट = आप",
  "Star = goal": "तारा = लक्ष्य",
  "Block = can't pass": "ब्लॉक = पार नहीं कर सकते",
  "Paused. Press Resume to continue.": "रुका हुआ। जारी रखने के लिए Resume दबाएँ।",
  Step: "चरण",
  "1. Add instructions": "1. निर्देश जोड़ें",
  "2. Your program": "2. आपका प्रोग्राम",
  "Clear all": "सब हटाएँ",
  "Your program": "आपका प्रोग्राम",
  "Your program is empty. Add an instruction above to begin.":
    "आपका प्रोग्राम खाली है। शुरू करने के लिए ऊपर से कोई निर्देश जोड़ें।",
  done: "पूरा",
  "3. Run it": "3. चलाएँ",
  "Run Again": "फिर से चलाएँ",
  "Run Program": "प्रोग्राम चलाएँ",
  Resume: "जारी रखें",
  Pause: "रोकें",
  "Stopped. The robot is back at the start.": "रुक गया। रोबोट शुरुआत पर लौट आया है।",
  Stop: "बंद करें",
  Reset: "रीसेट",
  Think: "सोचें",
  Code: "कोड",
  Run: "चलाएँ",
  Fix: "ठीक करें",
  "Move Forward": "आगे बढ़ें",
  "Turn Left": "बाएँ मुड़ें",
  "Turn Right": "दाएँ मुड़ें",
  "Press Run Program to see what your code does.":
    "आपका कोड क्या करता है, देखने के लिए प्रोग्राम चलाएँ दबाएँ।",
  "Program changed. Run it to see what happens!":
    "प्रोग्राम बदल गया। क्या होता है, देखने के लिए चलाएँ!",
  "Add some instructions first!": "पहले कुछ निर्देश जोड़ें!",
  "Getting ready…": "तैयारी हो रही है…",
  "Turning right…": "दाएँ मुड़ रहा है…",
  "Turning left…": "बाएँ मुड़ रहा है…",
  "Moving forward… almost there!": "आगे बढ़ रहा है… बस पहुँचने वाला है!",
  "Moving forward…": "आगे बढ़ रहा है…",
  "Obstacle ahead!": "आगे रुकावट है!",
  "Wall ahead!": "आगे दीवार है!",
  "You did it! The robot reached the star!": "आपने कर दिखाया! रोबोट तारे तक पहुँच गया!",
  "Not quite! Let's fix the program.": "अभी नहीं! चलिए प्रोग्राम ठीक करते हैं।",
  "First steps": "पहले कदम",
  "Move the robot forward until it reaches the star.":
    "रोबोट को तब तक आगे बढ़ाएँ जब तक वह तारे तक न पहुँच जाए।",
  "Turn the corner": "कोना मोड़ें",
  "The star is around a corner. Use a turn to reach it.":
    "तारा कोने के पार है। वहाँ पहुँचने के लिए मुड़ें।",
  "Around the block": "ब्लॉक के चारों ओर",
  "Blocks are in the way! Find a route around them to the star.":
    "रास्ते में ब्लॉक हैं! उनके चारों ओर से तारे तक का रास्ता ढूँढें।",
  "The star is behind the robot. It needs to turn around first.":
    "तारा रोबोट के पीछे है। पहले उसे पीछे मुड़ना होगा।",
  "The star is on the robot's right side. Try a Turn Right.":
    "तारा रोबोट के दाईं ओर है। दाएँ मुड़ें आज़माएँ।",
  "The star is on the robot's left side. Try a Turn Left.":
    "तारा रोबोट के बाईं ओर है। बाएँ मुड़ें आज़माएँ।",
  "Your program is empty": "आपका प्रोग्राम खाली है",
  "The robot is waiting for instructions.": "रोबोट निर्देशों का इंतज़ार कर रहा है।",
  "Click Move Forward, Turn Left or Turn Right to add your first instruction.":
    "पहला निर्देश जोड़ने के लिए आगे बढ़ें, बाएँ मुड़ें या दाएँ मुड़ें पर क्लिक करें।",
  "Oops! A block is in the way": "अरे! रास्ते में ब्लॉक है",
  "Robots can't pass through blocks. Can you turn and find a way around it?":
    "रोबोट ब्लॉक के आर-पार नहीं जा सकते। क्या आप मुड़कर उसके चारों ओर रास्ता ढूँढ सकते हैं?",
  "The robot reached a wall": "रोबोट दीवार तक पहुँच गया",
  "Can you find another route? Check which way the robot is facing.":
    "क्या आप दूसरा रास्ता ढूँढ सकते हैं? देखें रोबोट किस दिशा में है।",
  "The robot turned left, but it needed to turn right. Try swapping that turn.":
    "रोबोट बाएँ मुड़ा, पर उसे दाएँ मुड़ना था। वह मोड़ बदलकर देखें।",
  "The robot turned right, but it needed to turn left. Try swapping that turn.":
    "रोबोट दाएँ मुड़ा, पर उसे बाएँ मुड़ना था। वह मोड़ बदलकर देखें।",
  "So close! Keep going": "बस थोड़ा और! जारी रखें",
  "You ran out of instructions before reaching the star.":
    "तारे तक पहुँचने से पहले आपके निर्देश ख़त्म हो गए।",

  // Free recorded class box (homepage)
  "FREE RECORDED CLASS": "मुफ़्त रिकॉर्डेड क्लास",
  "Find the Right Class for Your Child": "अपने बच्चे के लिए सही क्लास चुनें",
  "Tell us a little about your child and we’ll recommend a recorded class to try right away.":
    "अपने बच्चे के बारे में थोड़ा बताएँ, हम तुरंत आज़माने के लिए एक रिकॉर्डेड क्लास सुझाएँगे।",
  "Get a Free Recorded Class →": "मुफ़्त रिकॉर्डेड क्लास पाएँ →",
  "Under 1 minute": "1 मिनट से कम",
  "QUICK CHECK · STEP": "झटपट जाँच · चरण",
  "OF 2": "/ 2",
  "Answer 3 short questions so we can suggest a suitable starting class.":
    "3 छोटे सवालों के जवाब दें, ताकि हम सही शुरुआती क्लास सुझा सकें।",
  "Parent / Guardian Name": "अभिभावक / संरक्षक का नाम",
  "Continue →": "आगे बढ़ें →",
  "Child’s Grade": "बच्चे की कक्षा",
  "Previous experience": "पहले का अनुभव",
  Interests: "रुचियाँ",
  "Coding & Games": "कोडिंग और गेम्स",
  "Websites & Apps": "वेबसाइट और ऐप्स",
  "Not sure yet": "अभी तय नहीं",
  "New to technology learning": "तकनीक सीखने में नए",
  "Tried coding before": "पहले कोडिंग आज़माई है",
  "Already builds projects": "पहले से प्रोजेक्ट बनाते हैं",
  "Show My Free Class →": "मेरी मुफ़्त क्लास दिखाएँ →",
  "YOUR FREE CLASS IS READY": "आपकी मुफ़्त क्लास तैयार है",
  "A suitable starting class is ready to try.": "आज़माने के लिए एक उपयुक्त शुरुआती क्लास तैयार है।",
  "The approved recorded class can be connected here when the media is supplied.":
    "स्वीकृत रिकॉर्डेड क्लास वीडियो मिलने पर यहाँ जोड़ी जा सकती है।",
  "Recorded class placeholder": "रिकॉर्डेड क्लास की जगह",
  "Approved class video has not been supplied yet.": "स्वीकृत क्लास वीडियो अभी नहीं मिला है।",
  "Watch Class Now →": "अभी क्लास देखें →",

  // Image descriptions and screen-reader labels
  "Newspaper cutting with photos of children learning coding on computers at a government school in Panchkula":
    "अख़बार की कटिंग, जिसमें पंचकूला के एक सरकारी स्कूल में कंप्यूटर पर कोडिंग सीखते बच्चों की तस्वीरें हैं",
  "APTCODER founder at the UNNATI AI Accelerator launch by Microsoft and FITT, IIT Delhi":
    "Microsoft और FITT, IIT दिल्ली के UNNATI AI Accelerator लॉन्च में APTCODER के संस्थापक",
  "APTCODER and Al-Imtehaan representatives holding a signed agreement":
    "हस्ताक्षरित समझौते के साथ APTCODER और Al-Imtehaan के प्रतिनिधि",
  "Screens of the APTCODER website shown in the Ailoitte case study":
    "Ailoitte केस स्टडी में दिखाई गई APTCODER वेबसाइट की स्क्रीन",
  "APTCODER and Varanasi Administration representatives exchanging signed MoU documents on stage":
    "मंच पर हस्ताक्षरित MoU दस्तावेज़ों का आदान-प्रदान करते APTCODER और वाराणसी प्रशासन के प्रतिनिधि",
  "Children gathered around a computer for a coding session":
    "कोडिंग सत्र के लिए कंप्यूटर के पास इकट्ठा बच्चे",
  "APTCODER on LinkedIn": "LinkedIn पर APTCODER",
  "APTCODER on Facebook": "Facebook पर APTCODER",
  "APTCODER on Instagram": "Instagram पर APTCODER",
  "Get the APTCODER app on Google Play": "Google Play पर APTCODER ऐप पाएँ",

  // ── KCC popup ─────────────────────────────────────────────────────────────────────────────
  "Lifetime-free community membership.": "आजीवन मुफ़्त कम्युनिटी सदस्यता।",
  "Continue learning beyond regular classes.": "नियमित क्लास के बाद भी सीखते रहें।",
  "Explore new ideas and technology.": "नए विचार और तकनीक जानें।",
  "Build and share creative projects.": "रचनात्मक प्रोजेक्ट बनाएँ और साझा करें।",
  "Learn through collaboration and problem-solving.":
    "मिलकर काम करते हुए और समस्याएँ हल करते हुए सीखें।",
  "Stay connected with a community of young creators.":
    "युवा रचनाकारों की कम्युनिटी से जुड़े रहें।",
  KCC: "KCC",
  "A Community Where Young Creators Keep Growing.":
    "एक कम्युनिटी जहाँ युवा रचनाकार आगे बढ़ते रहते हैं।",
  "The Kids Coding Community (KCC) is APTCODER’s lifetime-free learning community where children can continue exploring technology beyond their regular classes.":
    "किड्स कोडिंग कम्युनिटी (KCC), APTCODER की आजीवन मुफ़्त लर्निंग कम्युनिटी है, जहाँ बच्चे अपनी नियमित क्लास के बाद भी तकनीक को जानते रह सकते हैं।",
  "It’s a place to keep learning, building projects, sharing ideas, solving problems and growing alongside other young learners.":
    "यह दूसरे युवा विद्यार्थियों के साथ सीखते रहने, प्रोजेक्ट बनाने, विचार साझा करने, समस्याएँ हल करने और आगे बढ़ने की जगह है।",
  "The KCC journey": "KCC का सफ़र",
  "Welcome to the Kids Coding Community!": "किड्स कोडिंग कम्युनिटी में आपका स्वागत है!",
  "Your interest in joining KCC has been received. Our team will get in touch with you shortly.":
    "KCC से जुड़ने में आपकी रुचि हमें मिल गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
  "Become a KCC Member": "KCC सदस्य बनें",
  "Tell us a little about yourself to get started.":
    "शुरू करने के लिए हमें अपने बारे में थोड़ा बताएँ।",
  "Student’s Full Name": "विद्यार्थी का पूरा नाम",
  "Parent’s/Guardian’s Name": "अभिभावक/संरक्षक का नाम",
  "Student’s Class/Grade": "विद्यार्थी की कक्षा",
  City: "शहर",
  "School Name": "स्कूल का नाम",
  "Parent’s/Guardian’s Mobile": "अभिभावक/संरक्षक का मोबाइल",
  "Email Address": "ईमेल पता",
  "10-digit mobile number": "10 अंकों का मोबाइल नंबर",
  "Select class": "कक्षा चुनें",
  "I agree to be contacted by APTCODER regarding my KCC membership.":
    "मैं अपनी KCC सदस्यता के बारे में APTCODER द्वारा संपर्क किए जाने के लिए सहमत हूँ।",
  "Join the KCC Community →": "KCC कम्युनिटी से जुड़ें →",
  "We couldn’t send your registration just now. Please check your connection and try again.":
    "हम अभी आपका पंजीकरण नहीं भेज सके। कृपया अपना इंटरनेट कनेक्शन जाँचें और फिर कोशिश करें।",
  "Some details look incomplete. Please check the highlighted fields and try again.":
    "कुछ जानकारी अधूरी लगती है। कृपया हाइलाइट किए गए फ़ील्ड जाँचें और फिर कोशिश करें।",

  // Form validation (shared by the KCC and free class forms)
  "Please enter the student’s full name.": "कृपया विद्यार्थी का पूरा नाम लिखें।",
  "Please enter the student’s name.": "कृपया विद्यार्थी का नाम लिखें।",
  "Please enter the parent’s or guardian’s name.": "कृपया अभिभावक या संरक्षक का नाम लिखें।",
  "Please enter the school name.": "कृपया स्कूल का नाम लिखें।",
  "Please enter your city.": "कृपया अपना शहर लिखें।",
  "Please choose the student’s class.": "कृपया विद्यार्थी की कक्षा चुनें।",
  "Please enter a mobile number.": "कृपया मोबाइल नंबर लिखें।",
  "Please enter a valid 10-digit Indian mobile number.":
    "कृपया 10 अंकों का सही भारतीय मोबाइल नंबर लिखें।",
  "Please enter an email address.": "कृपया ईमेल पता लिखें।",
  "Please enter a valid email address.": "कृपया सही ईमेल पता लिखें।",
  "Please enter a valid email address, or leave it empty.":
    "कृपया सही ईमेल पता लिखें, या इसे खाली छोड़ दें।",
  "Please agree to be contacted so we can set up your membership.":
    "आपकी सदस्यता शुरू करने के लिए कृपया संपर्क किए जाने की सहमति दें।",
  "Please choose what your child would like to learn.":
    "कृपया चुनें कि आपका बच्चा क्या सीखना चाहता है।",
  "Please choose a class language.": "कृपया क्लास की भाषा चुनें।",
  "Please choose a preferred time.": "कृपया पसंदीदा समय चुनें।",
  "Please agree to be contacted so we can schedule the free class.":
    "मुफ़्त क्लास तय करने के लिए कृपया संपर्क किए जाने की सहमति दें।",
  "Please shorten this.": "कृपया इसे छोटा करें।",
  "Class 1": "कक्षा 1",
  "Class 2": "कक्षा 2",
  "Class 3": "कक्षा 3",
  "Class 4": "कक्षा 4",
  "Class 5": "कक्षा 5",
  "Class 6": "कक्षा 6",
  "Class 7": "कक्षा 7",
  "Class 9": "कक्षा 9",
  "Class 10": "कक्षा 10",
  "Class 11": "कक्षा 11",
  "Class 12": "कक्षा 12",

  // ── Book a Free Class popup ───────────────────────────────────────────────────────────────
  "BOOK A FREE CLASS": "मुफ़्त क्लास बुक करें",
  "Let’s Find the Right Start for Your Child.": "आइए आपके बच्चे के लिए सही शुरुआत ढूँढें।",
  "Share a few details and our team will get in touch to schedule the free class.":
    "कुछ जानकारी दें, हमारी टीम मुफ़्त क्लास तय करने के लिए आपसे संपर्क करेगी।",
  "About the student": "विद्यार्थी के बारे में",
  "ABOUT THE STUDENT": "विद्यार्थी के बारे में",
  "Student’s Name": "विद्यार्थी का नाम",
  "Class/Grade": "कक्षा",
  "Parent or guardian contact": "अभिभावक या संरक्षक से संपर्क",
  "PARENT / GUARDIAN CONTACT": "अभिभावक / संरक्षक से संपर्क",
  "Mobile Number": "मोबाइल नंबर",
  Email: "ईमेल",
  "Class preferences": "क्लास की पसंद",
  "CLASS PREFERENCES": "क्लास की पसंद",
  "Interested In": "किसमें रुचि है",
  "Class Language": "क्लास की भाषा",
  "Preferred Time": "पसंदीदा समय",
  "Anything We Should Know?": "कुछ और जो हमें जानना चाहिए?",
  "e.g. prior coding experience, questions": "जैसे पहले का कोडिंग अनुभव, सवाल",
  "Not sure yet – help us choose": "अभी तय नहीं – चुनने में मदद करें",
  "Any time": "कभी भी",
  "Weekday mornings": "कार्यदिवस, सुबह",
  "Weekday afternoons": "कार्यदिवस, दोपहर",
  "Weekday evenings": "कार्यदिवस, शाम",
  Weekends: "सप्ताहांत",
  "I agree to be contacted by APTCODER by phone, WhatsApp or email to schedule the free class.":
    "मैं मुफ़्त क्लास तय करने के लिए APTCODER द्वारा फ़ोन, WhatsApp या ईमेल पर संपर्क किए जाने के लिए सहमत हूँ।",
  "Online booking isn’t switched on yet, so your request was not sent. You can send the same details to us on WhatsApp instead, or call":
    "ऑनलाइन बुकिंग अभी शुरू नहीं हुई है, इसलिए आपका अनुरोध नहीं भेजा गया। आप यही जानकारी WhatsApp पर भेज सकते हैं, या कॉल करें",
  "We couldn’t send your request just now. Please try again, or send it on WhatsApp or call":
    "हम अभी आपका अनुरोध नहीं भेज सके। कृपया फिर कोशिश करें, या इसे WhatsApp पर भेजें या कॉल करें",
  "Send these details on WhatsApp": "यह जानकारी WhatsApp पर भेजें",
  "Request My Free Class →": "मेरी मुफ़्त क्लास का अनुरोध करें →",
  "Your Free Class Request Is In!": "आपका मुफ़्त क्लास अनुरोध मिल गया!",
  "Thank you. Our team will contact you on": "धन्यवाद। हमारी टीम आपसे",
  "to schedule the free class.": "पर मुफ़्त क्लास तय करने के लिए संपर्क करेगी।",

  // ── Courses page, cards and filters ───────────────────────────────────────────────────────
  "OUR COURSES": "हमारे कोर्स",
  "Explore Our Courses": "हमारे कोर्स देखें",
  "Explore technology courses for your interests and learning needs.":
    "अपनी रुचि और सीखने की ज़रूरतों के अनुसार तकनीकी कोर्स देखें।",
  "Search courses...": "कोर्स खोजें...",
  "Enter at least 2 characters to search.": "खोजने के लिए कम से कम 2 अक्षर लिखें।",
  "Course categories": "कोर्स श्रेणियाँ",
  "Course subjects": "कोर्स के विषय",
  "All Courses": "सभी कोर्स",
  "(selected)": "(चुना गया)",
  Showing: "कुल",
  courses: "कोर्स",
  Filters: "फ़िल्टर",
  FILTERS: "फ़िल्टर",
  "Filter courses": "कोर्स फ़िल्टर करें",
  "Select options, then apply to the catalogue.": "विकल्प चुनें, फिर कैटलॉग पर लागू करें।",
  "Apply filters": "फ़िल्टर लागू करें",
  "Sort:": "क्रम:",
  Recommended: "सुझाए गए",
  "Grade low to high": "कक्षा: कम से ज़्यादा",
  "Level easy to hard": "स्तर: आसान से कठिन",
  "A–Z": "A–Z",
  "Active filters": "लागू फ़िल्टर",
  "Load more": "और दिखाएँ",
  "No courses match these filters": "इन फ़िल्टर से कोई कोर्स मेल नहीं खाता",
  "Try changing your search or filters, or contact APTCODER about a free class.":
    "अपनी खोज या फ़िल्टर बदलकर देखें, या मुफ़्त क्लास के लिए APTCODER से संपर्क करें।",
  "Clear all filters": "सभी फ़िल्टर हटाएँ",
  "Not sure which course fits your child?": "पक्का नहीं कि कौन-सा कोर्स आपके बच्चे के लिए सही है?",
  "Talk with APTCODER and find a suitable starting point.":
    "APTCODER से बात करें और सही शुरुआत चुनें।",
  All: "सभी",
  "Learning Model": "सीखने का मॉडल",
  Level: "स्तर",
  "Program Type": "प्रोग्राम का प्रकार",
  Grade: "कक्षा",
  Lessons: "पाठ",
  Duration: "अवधि",
  "View Course": "कोर्स देखें",
  "View Course →": "कोर्स देखें →",
  Live: "लाइव",
  "Assisted Learning (AL)": "असिस्टेड लर्निंग (AL)",
  "Self Learning (SL)": "सेल्फ़ लर्निंग (SL)",
  "Assisted Learning": "असिस्टेड लर्निंग",
  "Self Learning": "सेल्फ़ लर्निंग",
  "Very Easy": "बहुत आसान",
  Easy: "आसान",
  Moderate: "मध्यम",
  Hard: "कठिन",
  "All Levels": "सभी स्तर",
  English: "अंग्रेज़ी",
  Hindi: "हिंदी",
  Course: "कोर्स",
  Camp: "कैंप",
  Capstone: "कैपस्टोन",
  "Level 1": "स्तर 1",
  "Level 2": "स्तर 2",
  "Level 3": "स्तर 3",
  "Simple Level": "सरल स्तर",
  "Moderate Level": "मध्यम स्तर",
  "Tough Level": "कठिन स्तर",
  Subject: "विषय",
  "Age group": "आयु वर्ग",
  "Age Group": "आयु वर्ग",
  // Subjects (Course Master (2) › Subject); brand and product names stay in English.
  "Creative Coding (p5.js)": "क्रिएटिव कोडिंग (p5.js)",
  "Game Development": "गेम डेवलपमेंट",
  "AI & ML": "AI और ML",
  "Data Science": "डेटा साइंस",
  Blockchain: "ब्लॉकचेन",
  Cryptography: "क्रिप्टोग्राफ़ी",
  "Programming Fundamentals (Codely)": "प्रोग्रामिंग की बुनियाद (Codely)",
  "Art & Music with Coding": "कोडिंग के साथ कला और संगीत",

  // Course detail page
  Breadcrumb: "ब्रेडक्रंब",
  "Course at a glance": "कोर्स एक नज़र में",
  CATEGORY: "श्रेणी",
  Category: "श्रेणी",
  Certificate: "प्रमाणपत्र",
  Overview: "परिचय",
  "What You'll Learn": "आप क्या सीखेंगे",
  "Topics Covered": "शामिल विषय",
  lessons: "पाठ",
  Module: "मॉड्यूल",
  "Projects You'll Build": "आप कौन-से प्रोजेक्ट बनाएँगे",
  "Who It's For": "यह किसके लिए है",
  "How Learning Works": "सीखना कैसे होता है",
  "Instructor / Mentor": "इंस्ट्रक्टर / मेंटर",
  "Assessment and Certificate": "मूल्यांकन और प्रमाणपत्र",
  "A certificate is available for this course.": "इस कोर्स के लिए प्रमाणपत्र उपलब्ध है।",
  Reviews: "समीक्षाएँ",
  "Rating:": "रेटिंग:",
  FAQs: "अक्सर पूछे जाने वाले सवाल",
  "More questions": "और सवाल",
  "Next step": "अगला कदम",
  "Enrol Now": "अभी नामांकन करें",
  "Contact Us →": "संपर्क करें →",

  // ── About page ────────────────────────────────────────────────────────────────────────────
  "ABOUT APTCODER": "APTCODER के बारे में",
  "Opening a Brighter Future": "उज्ज्वल भविष्य के द्वार खोलना",
  "Through Technology": "तकनीक के ज़रिए",
  "We help children across India and beyond learn coding and emerging technologies through hands-on, project-based learning — in the language they understand best.":
    "हम भारत और दुनिया भर के बच्चों को हैंड्स-ऑन, प्रोजेक्ट-आधारित पढ़ाई से कोडिंग और नई तकनीकें सीखने में मदद करते हैं — उस भाषा में जिसे वे सबसे अच्छी तरह समझते हैं।",
  "Practical Learning": "व्यावहारिक पढ़ाई",
  "Regional Language Support": "क्षेत्रीय भाषा में सहायता",
  "Expert Mentors": "विशेषज्ञ मेंटर",
  "Real-World Skills": "असल दुनिया के कौशल",
  "Children collaborating and learning technology together": "साथ मिलकर तकनीक सीखते बच्चे",
  "Learn · Create": "सीखें · रचें",
  "Grow in Your Language": "अपनी भाषा में आगे बढ़ें",
  "OUR PARTNERS & SUPPORTERS": "हमारे पार्टनर और सहयोगी",
  "Backed & Supported By": "इनका साथ और सहयोग",
  "We are supported and associated with leading institutions and organizations.":
    "हमें प्रमुख संस्थानों और संगठनों का सहयोग और साथ मिला है।",
  "OUR PURPOSE": "हमारा उद्देश्य",
  "Our Mission, Vision and Belief": "हमारा मिशन, विज़न और विश्वास",
  "Our Mission": "हमारा मिशन",
  "To make coding and technology education accessible, engaging and meaningful for every child — in the language they understand best.":
    "कोडिंग और तकनीकी शिक्षा को हर बच्चे के लिए सुलभ, दिलचस्प और सार्थक बनाना — उस भाषा में जिसे वे सबसे अच्छी तरह समझते हैं।",
  "Our Vision": "हमारा विज़न",
  "A future where every child, regardless of background or location, can confidently use technology to create, solve and contribute to a better world.":
    "एक ऐसा भविष्य जहाँ हर बच्चा, चाहे उसकी पृष्ठभूमि या जगह कुछ भी हो, आत्मविश्वास से तकनीक का इस्तेमाल करके कुछ नया रच सके, समस्याएँ हल कर सके और बेहतर दुनिया में योगदान दे सके।",
  "What We Believe": "हम क्या मानते हैं",
  "Every child has the potential to create.": "हर बच्चे में कुछ नया रचने की क्षमता है।",
  "Technology education should be practical, not just theoretical.":
    "तकनीकी शिक्षा व्यावहारिक होनी चाहिए, सिर्फ़ सैद्धांतिक नहीं।",
  "Learning is more effective in a familiar language.":
    "परिचित भाषा में सीखना ज़्यादा असरदार होता है।",
  "Hands-on projects build confidence and real skills.":
    "हैंड्स-ऑन प्रोजेक्ट आत्मविश्वास और असली कौशल बनाते हैं।",
  "Our Impact So Far": "अब तक हमारा असर",
  "A growing community of learners, teachers and partner institutions.":
    "विद्यार्थियों, शिक्षकों और साझेदार संस्थानों का बढ़ता समुदाय।",
  "Students Empowered": "सशक्त विद्यार्थी",
  "Teachers Trained": "प्रशिक्षित शिक्षक",
  "Countries Reached": "देशों तक पहुँच",
  "Government Schools": "सरकारी स्कूल",
  "Competitions & Camps": "प्रतियोगिताएँ और कैंप",
  "Our Journey": "हमारा सफ़र",
  "From a vision to a growing global community.": "एक विज़न से बढ़ते वैश्विक समुदाय तक।",
  "The Beginning": "शुरुआत",
  "Started with a mission to make coding accessible for children across India.":
    "पूरे भारत के बच्चों के लिए कोडिंग को सुलभ बनाने के मिशन से शुरुआत की।",
  "Building the Foundation": "नींव रखना",
  "Developed structured learning programs and began working with schools and students.":
    "व्यवस्थित लर्निंग प्रोग्राम बनाए और स्कूलों व विद्यार्थियों के साथ काम शुरू किया।",
  "Expanding Reach": "पहुँच का विस्तार",
  "Trained 310+ teachers and reached 5K+ students across India.":
    "310+ शिक्षकों को प्रशिक्षित किया और पूरे भारत में 5K+ विद्यार्थियों तक पहुँचे।",
  "Global Presence": "वैश्विक उपस्थिति",
  "Extended to 15+ countries and strengthened our community of learners.":
    "15+ देशों तक विस्तार किया और विद्यार्थियों के समुदाय को मज़बूत किया।",
  "New Possibilities": "नई संभावनाएँ",
  "Launched innovative programs like Vernatics, C-NAT and global collaborations.":
    "Vernatics, C-NAT और वैश्विक साझेदारियों जैसे नए प्रोग्राम शुरू किए।",
  "A Bigger Impact": "बड़ा असर",
  "Continuing to scale, reach more schools and enable more children to create with technology.":
    "आगे बढ़ते रहना, और ज़्यादा स्कूलों तक पहुँचना और और ज़्यादा बच्चों को तकनीक से रचने में सक्षम बनाना।",
  "Meet Our Team": "हमारी टीम से मिलिए",
  "A passionate team working to make technology education easy, practical and impactful for every child.":
    "हर बच्चे के लिए तकनीकी शिक्षा को आसान, व्यावहारिक और असरदार बनाने में जुटी एक समर्पित टीम।",
  "Founder & CEO": "संस्थापक और CEO",
  "Founding Member & CTO": "संस्थापक सदस्य और CTO",
  "An alumnus of IIT Bombay and a former EdTech industry professional, Mr. Gaurav Agrawal founded APTCODER with a vision to make coding and technology education accessible to every child.":
    "IIT बॉम्बे के पूर्व छात्र और EdTech उद्योग के अनुभवी पेशेवर, श्री गौरव अग्रवाल ने कोडिंग और तकनीकी शिक्षा को हर बच्चे तक पहुँचाने के विज़न के साथ APTCODER की स्थापना की।",
  "An alumnus of IIT Bombay, Ashish Bhatt leads the technical vision and development at APTCODER, helping build engaging and scalable technology-driven learning solutions.":
    "IIT बॉम्बे के पूर्व छात्र आशीष भट्ट APTCODER में तकनीकी विज़न और डेवलपमेंट का नेतृत्व करते हैं, और दिलचस्प व बड़े स्तर पर चलने वाले तकनीक-आधारित लर्निंग समाधान बनाने में मदद करते हैं।",
  "JOIN OUR MISSION": "हमारे मिशन से जुड़ें",
  "Let's Create Brighter": "आइए मिलकर उज्ज्वल",
  "Futures Together.": "भविष्य बनाएँ।",
  "Be a part of a movement to make technology education accessible, practical and meaningful for every child.":
    "तकनीकी शिक्षा को हर बच्चे के लिए सुलभ, व्यावहारिक और सार्थक बनाने के अभियान का हिस्सा बनें।",
  "Follow our journey": "हमारे सफ़र से जुड़े रहें",
  "Partner With Us →": "हमारे साथ साझेदारी करें →",

  // ── School page ───────────────────────────────────────────────────────────────────────────
  "APTCODER FOR SCHOOLS": "स्कूलों के लिए APTCODER",
  Bringing: "हर कक्षा में",
  "Coding, AI & Robotics": "कोडिंग, AI और रोबोटिक्स",
  "into Every Classroom.": "लाना।",
  "Empowering schools with practical coding, AI and robotics education that builds creativity, problem-solving skills and technological confidence in every student.":
    "स्कूलों को व्यावहारिक कोडिंग, AI और रोबोटिक्स शिक्षा से सशक्त बनाना, जो हर छात्र में रचनात्मकता, समस्या-समाधान कौशल और तकनीकी आत्मविश्वास विकसित करती है।",
  "Partner with Us →": "हमारे साथ साझेदारी करें →",
  "Get School Sales Kit": "स्कूल सेल्स किट पाएँ",
  "Structured Curriculum": "व्यवस्थित पाठ्यक्रम",
  "Teacher Enablement": "शिक्षकों को सक्षम बनाना",
  "Hands-on Learning": "हैंड्स-ऑन पढ़ाई",
  "Students using technology in classroom": "कक्षा में तकनीक का इस्तेमाल करते विद्यार्थी",
  "Create · Explore": "रचें · जानें",
  "Innovate Together": "मिलकर नवाचार करें",
  "SCHOOLS WE WORK WITH": "जिन स्कूलों के साथ हम काम करते हैं",
  "Trusted by Schools": "स्कूलों का भरोसा",
  "Supporting technology learning with schools and educators.":
    "स्कूलों और शिक्षकों के साथ तकनीकी पढ़ाई में सहयोग।",
  "WHY APTCODER FOR SCHOOLS": "स्कूलों के लिए APTCODER क्यों",
  "More Than Just Coding Classes": "सिर्फ़ कोडिंग क्लास से कहीं ज़्यादा",
  "We partner with schools to bring a comprehensive technology education program that goes beyond theory — helping students apply, create and solve real-world problems.":
    "हम स्कूलों के साथ मिलकर एक संपूर्ण तकनीकी शिक्षा प्रोग्राम लाते हैं जो सिद्धांत से आगे जाता है — ताकि विद्यार्थी असल दुनिया की समस्याओं पर ज्ञान लागू कर सकें, कुछ बना सकें और उन्हें हल कर सकें।",
  Coding: "कोडिंग",
  "Robotics (Vernatics)": "रोबोटिक्स (Vernatics)",
  "AI & Emerging Tech": "AI और नई तकनीकें",
  "Assessments (C-NAT)": "मूल्यांकन (C-NAT)",
  "Curriculum Integration": "पाठ्यक्रम में शामिल करना",
  "Teacher Training & Support": "शिक्षक प्रशिक्षण और सहायता",
  "Assessment & Recognition": "मूल्यांकन और पहचान",
  "OUR IMPACT IN SCHOOLS": "स्कूलों में हमारा असर",
  "Building a Stronger, Smarter Generation": "एक मज़बूत, समझदार पीढ़ी का निर्माण",
  "Partner Schools": "साझेदार स्कूल",
  "Students Impacted": "लाभान्वित विद्यार्थी",
  Countries: "देश",
  "Simple and Seamless Implementation": "आसान और सहज क्रियान्वयन",
  "Understand Your Needs": "आपकी ज़रूरतें समझना",
  "We work with your team to understand your goals and craft the right approach.":
    "हम आपकी टीम के साथ मिलकर आपके लक्ष्य समझते हैं और सही तरीका तैयार करते हैं।",
  "Design a Custom Plan": "आपके लिए ख़ास योजना",
  "Get a tailored program for your school, aligned to your curriculum.":
    "अपने पाठ्यक्रम के अनुरूप अपने स्कूल के लिए ख़ास प्रोग्राम पाएँ।",
  "Train & Launch": "प्रशिक्षण और शुरुआत",
  "We enable your teachers and help you launch smoothly.":
    "हम आपके शिक्षकों को सक्षम बनाते हैं और सहज शुरुआत में मदद करते हैं।",
  "Track & Grow": "प्रगति देखें और बढ़ें",
  "Monitor progress and expand grades and programs over time.":
    "प्रगति पर नज़र रखें और समय के साथ कक्षाएँ और प्रोग्राम बढ़ाएँ।",
  "WHAT SCHOOLS SAY": "स्कूल क्या कहते हैं",
  "Trusted by Educators and School Leaders": "शिक्षकों और स्कूल प्रमुखों का भरोसा",
  "Let's Bring Future-Ready Learning to Your School":
    "आइए आपके स्कूल में भविष्य के लिए तैयार पढ़ाई लाएँ",
  "Partner with AptCoder and empower your students with real skills for tomorrow.":
    "AptCoder के साथ साझेदारी करें और अपने विद्यार्थियों को कल के असली कौशल दें।",
  "FOR SCHOOL LEADERS": "स्कूल प्रमुखों के लिए",
  "Get the School Sales Kit": "स्कूल सेल्स किट पाएँ",
  "Your request is in.": "आपका अनुरोध मिल गया।",
  // Form sending (Google Sheet): success and failure messages
  "Message sent. Thank you!": "संदेश भेज दिया गया। धन्यवाद!",
  "We have received your message and our team will get back to you soon.":
    "हमें आपका संदेश मिल गया है, हमारी टीम जल्द ही आपसे संपर्क करेगी।",
  "Send another message": "एक और संदेश भेजें",
  "We couldn’t send your message just now. Please try again, or email":
    "अभी आपका संदेश नहीं भेजा जा सका। कृपया फिर से कोशिश करें, या ईमेल करें",
  "We couldn’t send your request just now. Please try again, or email":
    "अभी आपका अनुरोध नहीं भेजा जा सका। कृपया फिर से कोशिश करें, या ईमेल करें",
  "We couldn’t send your answers just now. Please try again, or email":
    "अभी आपके जवाब नहीं भेजे जा सके। कृपया फिर से कोशिश करें, या ईमेल करें",
  "or call": "या कॉल करें",
  "We’ll email the current school sales kit when it is available. No brochure file has been attached to this website yet.":
    "स्कूल सेल्स किट उपलब्ध होने पर हम उसे ईमेल कर देंगे। इस वेबसाइट पर अभी कोई ब्रोशर फ़ाइल नहीं जोड़ी गई है।",
  "Tell us where to send the latest program overview, curriculum summary and partnership information.":
    "बताएँ कि नवीनतम प्रोग्राम परिचय, पाठ्यक्रम सारांश और साझेदारी की जानकारी कहाँ भेजें।",
  "Full name": "पूरा नाम",
  "Work email": "कार्यालय ईमेल",
  "School or institution": "स्कूल या संस्थान",
  "Your role": "आपकी भूमिका",
  "Select role": "भूमिका चुनें",
  "School leader": "स्कूल प्रमुख",
  "Academic coordinator": "शैक्षणिक समन्वयक",
  Teacher: "शिक्षक",
  "Other decision maker": "अन्य निर्णयकर्ता",
  "Email me the sales kit →": "मुझे सेल्स किट ईमेल करें →",
  "Your details will only be used to respond to this request.":
    "आपकी जानकारी का इस्तेमाल सिर्फ़ इस अनुरोध का जवाब देने के लिए होगा।",
  Principal: "प्रधानाचार्य",
  "Academic Head": "शैक्षणिक प्रमुख",
  Director: "निदेशक",
  '"AptCoder has brought a new level of excitement to our classrooms. Our students are more confident, curious and engaged with technology."':
    '"AptCoder ने हमारी कक्षाओं में एक नया उत्साह भर दिया है। हमारे विद्यार्थी तकनीक को लेकर ज़्यादा आत्मविश्वासी, जिज्ञासु और सक्रिय हैं।"',
  '"The teacher training and support from AptCoder has been exceptional. The curriculum is well-structured and easy to integrate into school programs."':
    '"AptCoder का शिक्षक प्रशिक्षण और सहयोग बेहतरीन रहा है। पाठ्यक्रम अच्छी तरह व्यवस्थित है और स्कूल प्रोग्राम में आसानी से शामिल हो जाता है।"',
  '"Our students have created amazing projects and participated in C-NAT with great enthusiasm. AptCoder is a valuable partner in our digital learning journey."':
    '"हमारे विद्यार्थियों ने शानदार प्रोजेक्ट बनाए और बड़े उत्साह से C-NAT में भाग लिया। AptCoder हमारे डिजिटल लर्निंग सफ़र का एक अहम साथी है।"',

  // ── Contact page ──────────────────────────────────────────────────────────────────────────
  "CONTACT US": "संपर्क करें",
  "Let’s Build What’s Next,": "आइए मिलकर बनाएँ",
  "Together.": "आगे का रास्ता।",
  "Have questions about our courses, school programs, partnerships or events? We're here to help. Get in touch and our team will be happy to assist you.":
    "हमारे कोर्स, स्कूल प्रोग्राम, साझेदारी या कार्यक्रमों के बारे में सवाल हैं? हम मदद के लिए यहाँ हैं। संपर्क करें, हमारी टीम ख़ुशी से आपकी मदद करेगी।",
  "Friendly student waving, ready to connect":
    "हाथ हिलाता एक मिलनसार विद्यार्थी, जुड़ने के लिए तैयार",
  "Ask Questions": "सवाल पूछें",
  "Get Guidance": "मार्गदर्शन पाएँ",
  "Start a Conversation": "बातचीत शुरू करें",
  "Send Us a Message": "हमें संदेश भेजें",
  "Fill in your details and we'll get back to you soon.":
    "अपनी जानकारी भरें, हम जल्द आपसे संपर्क करेंगे।",
  "Full Name *": "पूरा नाम *",
  "Your full name": "आपका पूरा नाम",
  "Email Address *": "ईमेल पता *",
  "Phone Number *": "फ़ोन नंबर *",
  "I am a *": "मैं हूँ *",
  "Select an option": "एक विकल्प चुनें",
  Parent: "अभिभावक",
  Student: "विद्यार्थी",
  "School Administrator": "स्कूल प्रशासक",
  "Partner / Investor": "पार्टनर / निवेशक",
  "What is this regarding? *": "यह किस बारे में है? *",
  "Course Information": "कोर्स की जानकारी",
  "School Program Inquiry": "स्कूल प्रोग्राम संबंधी पूछताछ",
  "Partnership Opportunity": "साझेदारी का अवसर",
  "General Inquiry": "सामान्य पूछताछ",
  "Your Message *": "आपका संदेश *",
  "Tell us how we can help...": "बताएँ हम कैसे मदद कर सकते हैं...",
  "Send Message →": "संदेश भेजें →",
  "By clicking send, you agree to our": "भेजें पर क्लिक करके आप हमारी",
  and: "और",
  "Other Ways to Reach Us": "हमसे संपर्क के अन्य तरीके",
  "Email Us": "हमें ईमेल करें",
  "We typically respond within 1–2 business days.":
    "हम आमतौर पर 1–2 कार्यदिवसों में जवाब देते हैं।",
  "Call Us": "हमें कॉल करें",
  "Mon – Sat, 9:00 AM – 6:00 PM (IST)": "सोम – शनि, सुबह 9:00 – शाम 6:00 (IST)",
  "Our Office": "हमारा कार्यालय",
  "View on Google Maps ↗": "Google Maps पर देखें ↗",
  "Follow Us": "हमें फ़ॉलो करें",
  "Stay updated on our latest programs, events and student projects.":
    "हमारे नए प्रोग्राम, कार्यक्रमों और विद्यार्थियों के प्रोजेक्ट से अपडेट रहें।",

  // ── Careers page ──────────────────────────────────────────────────────────────────────────
  CAREERS: "करियर",
  "Build the Future of Learning with": "सीखने का भविष्य बनाइए",
  "APTCODER.": "APTCODER के साथ।",
  "APTCODER is on a mission to make AI, robotics and coding education accessible to every child. Explore current openings or send us your resume to join the team.":
    "APTCODER का मिशन है AI, रोबोटिक्स और कोडिंग शिक्षा को हर बच्चे तक पहुँचाना। मौजूदा अवसर देखें या टीम से जुड़ने के लिए अपना रिज़्यूमे भेजें।",
  "View Open Positions": "खुले पद देखें",
  "Send Your Resume": "अपना रिज़्यूमे भेजें",
  "OUR VALUES & CULTURE": "हमारे मूल्य और संस्कृति",
  "The Principles Behind Our Work": "हमारे काम के पीछे के सिद्धांत",
  "Purpose-Driven Work": "उद्देश्यपूर्ण काम",
  "Contribute to making coding and technology education accessible to children.":
    "कोडिंग और तकनीकी शिक्षा को बच्चों तक पहुँचाने में योगदान दें।",
  "Innovation & Curiosity": "नवाचार और जिज्ञासा",
  "Explore new ideas and practical ways to make learning more engaging.":
    "सीखने को और दिलचस्प बनाने के नए विचार और व्यावहारिक तरीके खोजें।",
  Collaboration: "सहयोग",
  "Work together, share perspectives and build meaningful solutions.":
    "साथ मिलकर काम करें, विचार साझा करें और सार्थक समाधान बनाएँ।",
  "Continuous Learning": "लगातार सीखना",
  "Stay curious, develop skills and grow through new challenges.":
    "जिज्ञासु बने रहें, कौशल बढ़ाएँ और नई चुनौतियों के साथ आगे बढ़ें।",
  BENEFITS: "लाभ",
  "Why Join APTCODER": "APTCODER से क्यों जुड़ें",
  "Meaningful Work": "सार्थक काम",
  "Create learning experiences that reach children and their classrooms.":
    "ऐसे सीखने के अनुभव बनाएँ जो बच्चों और उनकी कक्षाओं तक पहुँचें।",
  "Room to Learn": "सीखने की गुंजाइश",
  "Work across education and technology, and pick up new skills as you go.":
    "शिक्षा और तकनीक दोनों में काम करें, और काम करते-करते नए कौशल सीखें।",
  "Professional Growth": "पेशेवर विकास",
  "Take on new challenges that build your experience and confidence.":
    "ऐसी नई चुनौतियाँ लें जो आपका अनुभव और आत्मविश्वास बढ़ाएँ।",
  "Build solutions together with people who care about learning.":
    "सीखने की परवाह करने वाले लोगों के साथ मिलकर समाधान बनाएँ।",
  "A Larger Mission": "एक बड़ा मिशन",
  "Be part of the effort to make technology education accessible to every child.":
    "तकनीकी शिक्षा को हर बच्चे तक पहुँचाने की कोशिश का हिस्सा बनें।",
  "Ready to join us?": "हमसे जुड़ने के लिए तैयार?",
  "View open positions": "खुले पद देखें",
  "Open Positions": "खुले पद",
  "There are no open positions at the moment.": "इस समय कोई पद खाली नहीं है।",
  "New roles will be listed here when they open. You are welcome to send us your resume in the meantime.":
    "नए पद खुलने पर यहाँ दिखाए जाएँगे। तब तक आप अपना रिज़्यूमे भेज सकते हैं।",
  "How to Apply": "आवेदन कैसे करें",
  "Use the Apply button on a role, or email us about other roles. Please include:":
    "किसी पद पर आवेदन करें बटन का इस्तेमाल करें, या दूसरे पदों के लिए हमें ईमेल करें। कृपया शामिल करें:",
  "Interested in joining APTCODER? Email us and include:":
    "APTCODER से जुड़ना चाहते हैं? हमें ईमेल करें और शामिल करें:",
  "Your name and phone number": "आपका नाम और फ़ोन नंबर",
  "The role or area you are interested in": "जिस पद या क्षेत्र में आपकी रुचि है",
  "Your resume, and LinkedIn or portfolio if you have one":
    "आपका रिज़्यूमे, और LinkedIn या पोर्टफ़ोलियो (अगर हो)",
  "Email Your Resume": "अपना रिज़्यूमे ईमेल करें",
  Apply: "आवेदन करें",

  // ── C-NAT page ────────────────────────────────────────────────────────────────────────────
  "APTCODER PRESENTS": "APTCODER प्रस्तुत करता है",
  "India’s Coding Olympiad": "भारत का कोडिंग ओलंपियाड",
  "Think. Code. Compete. Get Recognised.": "सोचें। कोड करें। मुक़ाबला करें। पहचान पाएँ।",
  "Give your coding skills a national stage. Challenge yourself, explore coding problems and showcase what you can create through C-NAT.":
    "अपने कोडिंग कौशल को राष्ट्रीय मंच दें। ख़ुद को चुनौती दें, कोडिंग की समस्याएँ हल करें और C-NAT के ज़रिए दिखाएँ कि आप क्या बना सकते हैं।",
  "Register for C-NAT →": "C-NAT के लिए पंजीकरण करें →",
  "Discover the Olympiad": "ओलंपियाड के बारे में जानें",
  "Registration opens a WhatsApp chat with the APTCODER team, who will share the next steps.":
    "पंजीकरण पर APTCODER टीम के साथ WhatsApp चैट खुलेगी, जो आगे के कदम बताएगी।",
  "Challenge solved": "चुनौती हल हो गई",
  "THE CHALLENGE": "चुनौती",
  "More Than a Coding Competition": "सिर्फ़ कोडिंग प्रतियोगिता से कहीं ज़्यादा",
  "C-NAT gives students the opportunity to apply their coding knowledge, develop logical thinking and demonstrate their problem-solving abilities.":
    "C-NAT विद्यार्थियों को अपना कोडिंग ज्ञान लागू करने, तार्किक सोच विकसित करने और समस्या-समाधान क्षमता दिखाने का मौका देता है।",
  "HOW IT WORKS": "यह कैसे काम करता है",
  "Three Steps to Recognition": "पहचान तक तीन कदम",
  "Choose Your Track": "अपना ट्रैक चुनें",
  "Strengthen logical thinking and computational skills.":
    "तार्किक सोच और कम्प्यूटेशनल कौशल मज़बूत करें।",
  "Take the Challenge": "चुनौती लें",
  "Apply coding concepts to solve challenges.":
    "चुनौतियाँ हल करने के लिए कोडिंग की अवधारणाएँ लागू करें।",
  "Earn Recognition": "पहचान पाएँ",
  "Put your skills to the test and earn recognition.": "अपने कौशल को परखें और पहचान पाएँ।",
  THINK: "सोचें",
  COMPETE: "मुक़ाबला करें",
  "WHY PARTICIPATE?": "भाग क्यों लें?",
  "Show What You Can Do.": "दिखाएँ कि आप क्या कर सकते हैं।",
  "Develop computational thinking.": "कम्प्यूटेशनल सोच विकसित करें।",
  "Improve logical reasoning.": "तार्किक क्षमता बेहतर करें।",
  "Build confidence in coding.": "कोडिंग में आत्मविश्वास बढ़ाएँ।",
  "Challenge yourself through practical problems.": "व्यावहारिक समस्याओं से ख़ुद को चुनौती दें।",
  "Showcase your skills and achievements.": "अपने कौशल और उपलब्धियाँ दिखाएँ।",
  "Ready to Take the Challenge?": "चुनौती लेने के लिए तैयार?",
  "Put your coding skills to the test and discover what you can achieve.":
    "अपने कोडिंग कौशल को परखें और जानें कि आप क्या हासिल कर सकते हैं।",

  // ── Vernatics page ────────────────────────────────────────────────────────────────────────
  "Meet Your First": "मिलिए अपने पहले",
  "Coding Robot.": "कोडिंग रोबोट से।",
  "Go beyond the screen and bring code to life. With Vernatics, children learn programming by controlling a real robot, experimenting with sensors and watching their ideas turn into action.":
    "स्क्रीन से आगे बढ़ें और कोड को जीवंत करें। Vernatics के साथ बच्चे असली रोबोट को कंट्रोल करके, सेंसर के साथ प्रयोग करके और अपने विचारों को हक़ीक़त बनते देखकर प्रोग्रामिंग सीखते हैं।",
  "Start Learning →": "सीखना शुरू करें →",
  "Explore Its Features": "इसकी ख़ूबियाँ देखें",
  "Vernatics robot driving on a table with its LED display lit up":
    "मेज़ पर चलता Vernatics रोबोट, जिसका LED डिस्प्ले जल रहा है",
  "THE VERNATICS EXPERIENCE": "Vernatics का अनुभव",
  "Not Just a Robot. A Hands-On Learning Experience.":
    "सिर्फ़ एक रोबोट नहीं। सीखने का हैंड्स-ऑन अनुभव।",
  "Children don’t just learn what code does. They discover it by making things happen.":
    "बच्चे सिर्फ़ यह नहीं सीखते कि कोड क्या करता है। वे चीज़ों को होते हुए देखकर उसे खोजते हैं।",
  "Give the robot instructions and learn how programming works.":
    "रोबोट को निर्देश दें और सीखें कि प्रोग्रामिंग कैसे काम करती है।",
  "Control the robot wirelessly and see your commands come to life.":
    "रोबोट को वायरलेस तरीके से कंट्रोल करें और अपने आदेशों को साकार होते देखें।",
  "Experiment, solve challenges and build new ways for the robot to respond.":
    "प्रयोग करें, चुनौतियाँ हल करें और रोबोट की प्रतिक्रिया के नए तरीके बनाएँ।",
  "EXPLORE VERNATICS": "Vernatics को जानें",
  "What Can Children Explore?": "बच्चे क्या-क्या जान सकते हैं?",
  "The Vernatics robot on a table with its LED matrix lit up":
    "मेज़ पर Vernatics रोबोट, जिसका LED मैट्रिक्स जल रहा है",
  "Make It Move": "इसे चलाएँ",
  "Control the robot’s two wheels and experiment with movement and directions.":
    "रोबोट के दोनों पहियों को कंट्रोल करें और गति व दिशाओं के साथ प्रयोग करें।",
  "See It Sense": "इसे महसूस करते देखें",
  "Explore how ultrasonic and IR sensors help the robot detect obstacles and respond to its surroundings.":
    "जानें कि अल्ट्रासोनिक और IR सेंसर रोबोट को रुकावटें पहचानने और आसपास के माहौल पर प्रतिक्रिया देने में कैसे मदद करते हैं।",
  "Bring It to Life": "इसे जीवंत करें",
  "Use the colourful LED matrix to create patterns, expressions and visual responses.":
    "रंग-बिरंगे LED मैट्रिक्स से पैटर्न, भाव और दृश्य प्रतिक्रियाएँ बनाएँ।",
  "Experiment & Discover": "प्रयोग करें और खोजें",
  "Explore light detection, buttons and other interactive components through hands-on activities.":
    "हैंड्स-ऑन गतिविधियों से प्रकाश पहचान, बटन और दूसरे इंटरैक्टिव हिस्सों को जानें।",
  "VERNATICS PORTAL": "Vernatics पोर्टल",
  "Key Features at a Glance": "मुख्य ख़ूबियाँ एक नज़र में",
  "The Vernatics portal: a toolbar with Instructions, Blocks, Download, Run and more, the block categories Robo Star, Robo Orbit and Robo Galaxy, the coding area and the device log":
    "Vernatics पोर्टल: निर्देश, ब्लॉक्स, डाउनलोड, रन जैसे विकल्पों वाला टूलबार, Robo Star, Robo Orbit और Robo Galaxy ब्लॉक श्रेणियाँ, कोडिंग क्षेत्र और डिवाइस लॉग",
  "Portal features": "पोर्टल की ख़ूबियाँ",
  "Guides you step-by-step to complete the activity.":
    "गतिविधि पूरी करने के लिए आपको क़दम-दर-क़दम राह दिखाता है।",
  "Run the program and see the output.": "प्रोग्राम चलाएँ और नतीजा देखें।",
  Blocks: "ब्लॉक्स",
  "Choose coding in Blocks, Code (syntax) or both.":
    "ब्लॉक्स, कोड (सिंटैक्स) या दोनों में कोडिंग चुनें।",
  Link: "लिंक",
  "Get the activity link to share with others.":
    "दूसरों के साथ साझा करने के लिए गतिविधि का लिंक पाएँ।",
  "Share Access": "एक्सेस साझा करें",
  "Share remote access and control devices with others and vice versa.":
    "दूसरों के साथ रिमोट एक्सेस साझा करें और डिवाइस कंट्रोल करें, और दूसरे भी आपके साथ।",
  Download: "डाउनलोड",
  "Download the activity to your device.": "गतिविधि को अपने डिवाइस पर डाउनलोड करें।",
  "Reset WiFi": "WiFi रीसेट करें",
  "Connect the device via Bluetooth or WiFi and use other WiFi when needed.":
    "डिवाइस को Bluetooth या WiFi से जोड़ें और ज़रूरत हो तो दूसरा WiFi इस्तेमाल करें।",
  "Three Coding Levels": "कोडिंग के तीन स्तर",
  "Coding with single blocks.": "एक-एक ब्लॉक से कोडिंग।",
  "More blocks, more logic.": "ज़्यादा ब्लॉक, ज़्यादा लॉजिक।",
  "Advanced logic and complex coding.": "एडवांस लॉजिक और जटिल कोडिंग।",
  "HOW CHILDREN LEARN": "बच्चे कैसे सीखते हैं",
  "Learn by Doing. Grow by Creating.": "करके सीखें। रचकर आगे बढ़ें।",
  Discover: "खोजें",
  "Get introduced to the robot and understand what its different parts can do.":
    "रोबोट से परिचय करें और समझें कि उसके अलग-अलग हिस्से क्या कर सकते हैं।",
  Program: "प्रोग्राम करें",
  "Learn to give instructions and control the robot through coding.":
    "कोडिंग के ज़रिए निर्देश देना और रोबोट को कंट्रोल करना सीखें।",
  Experiment: "प्रयोग करें",
  "Try challenges, observe results, solve problems and create new possibilities.":
    "चुनौतियाँ आज़माएँ, नतीजे देखें, समस्याएँ हल करें और नई संभावनाएँ बनाएँ।",
  "Ready to Bring Coding to Life?": "कोडिंग को जीवंत करने के लिए तैयार?",
  "Give your child the opportunity to explore robotics, discover programming and turn imagination into action.":
    "अपने बच्चे को रोबोटिक्स जानने, प्रोग्रामिंग खोजने और कल्पना को हक़ीक़त में बदलने का मौका दें।",
  "Explore APTCODER Classes →": "APTCODER क्लास देखें →",
};

/** Turns an English category name into Hindi, or leaves it as it is. */
const cat = (name: string) => categoryHi[name] ?? hi[name] ?? name;

/** Text that contains numbers or names, matched by pattern. Checked after the exact entries. */
const MONTHS: Record<string, string> = {
  January: "जनवरी",
  February: "फ़रवरी",
  March: "मार्च",
  April: "अप्रैल",
  May: "मई",
  June: "जून",
  July: "जुलाई",
  August: "अगस्त",
  September: "सितंबर",
  October: "अक्टूबर",
  November: "नवंबर",
  December: "दिसंबर",
};

export const hiPatterns: [RegExp, (...groups: string[]) => string][] = [
  [
    /^(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/,
    (d, m, y) => `${d} ${MONTHS[m]} ${y}`,
  ],
  [
    /^Playground, (\d+) by \d+ squares\. Robot at row (\d+), column (\d+)\. Star at row (\d+), column (\d+)\. (\d+) blocks\.$/,
    (n, rr, rc, sr, sc, b) =>
      `प्लेग्राउंड, ${n} × ${n} खाने। रोबोट पंक्ति ${rr}, कॉलम ${rc} पर। तारा पंक्ति ${sr}, कॉलम ${sc} पर। ${b} ब्लॉक।`,
  ],
  [/^View coverage: (.+), (.+)$/, (h, p) => `कवरेज देखें: ${hi[h] ?? h}, ${hi[p] ?? p}`],
  [
    /^Play video: (.+), (.+) \((\d+:\d+)\)$/,
    (l, sp, d) => `वीडियो चलाएँ: ${hi[l.toUpperCase()] ?? l}, ${hi[sp] ?? sp} (${d})`,
  ],
  [/^(\d+) lessons$/, (n) => `${n} पाठ`],
  [/^Grade (\d+)$/, (n) => `कक्षा ${n}`],
  [/^Grades? (\d+)[-–](\d+)$/, (a, b) => `कक्षा ${a}–${b}`],
  [/^Grades$/, () => "कक्षाएँ"],
  [/^Grades (\d+(?:, \d+)+)$/, (list) => `कक्षा ${list}`],
  [/^1 Month$/, () => "1 महीना"],
  [/^(\d+) Months$/, (n) => `${n} महीने`],
  [/^(\d+) Weeks?$/, (n) => `${n} सप्ताह`],
  [/^(\d+)-(\d+) years$/, (a, b) => `${a}-${b} वर्ष`],
  [/^Show all (\d+) features \+$/, (n) => `सभी ${n} सुविधाएँ देखें +`],
  [/^Show all (\d+) questions \+$/, (n) => `सभी ${n} प्रश्न देखें +`],
  [/^Show (\d+) courses?$/, (n) => `${n} कोर्स दिखाएँ`],
  [/^(.+) Courses$/, (c) => `${cat(c)} कोर्स`],
  [/^(.+) Courses — APTCODER$/, (c) => `${cat(c)} कोर्स — APTCODER`],
  [/^Search: (.*)$/, (q) => `खोज: ${q}`],
  [
    /^(Subject|Learning Model|Grade|Level|Language|Program Type): (.+)$/,
    (k, v) => `${hi[k] ?? k}: ${hi[v] ?? v.replace(/^Grade (\d+)$/, "कक्षा $1")}`,
  ],
  [/^Challenge (\d+): (.+)$/, (n, t) => `चुनौती ${n}: ${hi[t] ?? t}`],
  [
    /^Bonus challenge: can you do it in just (\d+) instructions\?$/,
    (n) => `बोनस चुनौती: क्या आप इसे सिर्फ़ ${n} निर्देशों में कर सकते हैं?`,
  ],
  [
    /^The robot reached the star early, so (\d+) instructions? (?:wasn't|weren't) needed\.$/,
    (n) => `रोबोट तारे तक जल्दी पहुँच गया, इसलिए ${n} निर्देशों की ज़रूरत नहीं पड़ी।`,
  ],
  [
    /^The star is (\d+) squares? straight ahead\. Add (?:a Move Forward|(\d+) Move Forwards)!$/,
    (n, m) => `तारा ${n} खाने सीधे आगे है। ${m ? `${m} बार` : "एक बार"} "आगे बढ़ें" जोड़ें!`,
  ],
  [
    /^Instruction (\d+): the robot cannot move forward because there is a block in the way!$/,
    (n) => `निर्देश ${n}: रोबोट आगे नहीं बढ़ सकता क्योंकि रास्ते में ब्लॉक है!`,
  ],
  [
    /^Instruction (\d+): the robot is at the edge of the playground and can't go any further that way\.$/,
    (n) => `निर्देश ${n}: रोबोट प्लेग्राउंड के किनारे पर है और उस ओर आगे नहीं जा सकता।`,
  ],
  [/^Move instruction (\d+) \((.+)\) up$/, (n, l) => `निर्देश ${n} (${hi[l] ?? l}) ऊपर ले जाएँ`],
  [/^Move instruction (\d+) \((.+)\) down$/, (n, l) => `निर्देश ${n} (${hi[l] ?? l}) नीचे ले जाएँ`],
  [/^Delete instruction (\d+) \((.+)\)$/, (n, l) => `निर्देश ${n} (${hi[l] ?? l}) हटाएँ`],
  [
    /^Online registration isn’t switched on yet, so your details were not sent\. Please message us on WhatsApp or call (.+) and we’ll add you to KCC\.$/,
    (p) =>
      `ऑनलाइन पंजीकरण अभी शुरू नहीं हुआ है, इसलिए आपकी जानकारी नहीं भेजी गई। कृपया हमें WhatsApp पर संदेश भेजें या ${p} पर कॉल करें, हम आपको KCC में जोड़ देंगे।`,
  ],
  [/^Portrait of (.+)$/, (n) => `${n} का चित्र`],
  [/^(.+) logo$/, (n) => `${n} लोगो`],
  [/^View course: (.+)$/, (t) => `कोर्स देखें: ${t}`],
  [/^Apply for (.+)$/, (t) => `${t} के लिए आवेदन करें`],
  [/^Level (\d+) of (\d+)$/, (a, b) => `स्तर ${a} / ${b}`],
  [/^(.+) \(opens in a new tab\)$/, (t) => `${hi[t] ?? t} (नए टैब में खुलता है)`],
  [/^(.+) \(opens Google Maps in a new tab\)$/, (t) => `${t} (Google Maps नए टैब में खुलता है)`],
];
