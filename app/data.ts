export type Tutor = {
  id: string; name: string; initials: string; subject: string; subjects: string[]; classes: string[]; board: string; city: string; mode: string; experience: number; rating: number; reviews: number; price: number; bio: string; accent: string; exams: string[];
};
export const tutors: Tutor[] = [
 {id:'t1',name:'Aarav Mehta',initials:'AM',subject:'Physics',subjects:['Physics','Mathematics'],classes:['Class 11','Class 12'],board:'CBSE',city:'Mumbai',mode:'Online + Offline',experience:9,rating:4.9,reviews:128,price:850,bio:'Demo profile: concept-first Physics mentor specialising in JEE preparation, problem solving and exam strategy.',accent:'violet',exams:['JEE Main','JEE Advanced','MHT-CET']},
 {id:'t2',name:'Priya Nair',initials:'PN',subject:'Mathematics',subjects:['Mathematics'],classes:['Class 8','Class 9','Class 10','Class 11'],board:'CBSE',city:'Bengaluru',mode:'Online',experience:7,rating:4.8,reviews:96,price:650,bio:'Demo profile: patient mathematics educator who turns difficult chapters into simple, repeatable methods.',accent:'cyan',exams:['JEE Main','MHT-CET','IMO']},
 {id:'t3',name:'Rohan Kulkarni',initials:'RK',subject:'Chemistry',subjects:['Chemistry'],classes:['Class 11','Class 12'],board:'CBSE',city:'Pune',mode:'Online',experience:11,rating:4.9,reviews:174,price:900,bio:'Demo profile: Organic and physical chemistry specialist with a strong focus on competitive-exam problem solving.',accent:'amber',exams:['JEE Main','JEE Advanced','NEET','MHT-CET']},
 {id:'t4',name:'Sneha Iyer',initials:'SI',subject:'Biology',subjects:['Biology'],classes:['Class 11','Class 12'],board:'ICSE',city:'Chennai',mode:'Online',experience:8,rating:4.8,reviews:83,price:700,bio:'Demo profile: NEET Biology coach using visual explanations, active recall and structured revision.',accent:'emerald',exams:['NEET']},
 {id:'t5',name:'Kabir Shah',initials:'KS',subject:'Computer Science',subjects:['Computer Science','Mathematics'],classes:['Class 9','Class 10','Class 11','Class 12'],board:'ICSE',city:'Mumbai',mode:'Online',experience:6,rating:4.7,reviews:61,price:600,bio:'Demo profile: Computer Science tutor for school students, Python fundamentals and logical thinking.',accent:'blue',exams:['BITSAT','NDA']},
 {id:'t6',name:'Ananya Rao',initials:'AR',subject:'English',subjects:['English'],classes:['Class 6','Class 7','Class 8','Class 9','Class 10'],board:'CBSE',city:'Hyderabad',mode:'Online + Offline',experience:10,rating:4.9,reviews:112,price:550,bio:'Demo profile: English language and literature teacher focused on confidence, writing and comprehension.',accent:'rose',exams:['NDA','NATA','RMS','AISSEE']},
];
export const subjects = ['Mathematics','Science','Physics','Chemistry','Biology','English','Computer Science'];
export const competitiveExams = ['JEE Main','JEE Advanced','NEET','MHT-CET','BITSAT','NDA','NATA','RMS','AISSEE','IMO','JSO'];
export const classes = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];
export const boards = ['CBSE','ICSE','Maharashtra State Board','IB','IGCSE'];
export const teachingModes = ['Batch tuition','Home tuition','Online tuition'];
