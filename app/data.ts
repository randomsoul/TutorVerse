export type Tutor = {
  id: string; name: string; initials: string; subject: string; subjects: string[]; classes: string[]; board: string; city: string; mode: string; experience: number; rating: number; reviews: number; price: number; bio: string; accent: string;
};

export const tutors: Tutor[] = [
 {id:'t1',name:'Aarav Mehta',initials:'AM',subject:'Physics',subjects:['Physics','Mathematics'],classes:['Class 11','Class 12','JEE'],board:'CBSE',city:'Mumbai',mode:'Online + Offline',experience:9,rating:4.9,reviews:128,price:850,bio:'Concept-first Physics mentor specialising in JEE preparation, problem solving and exam strategy.',accent:'violet'},
 {id:'t2',name:'Priya Nair',initials:'PN',subject:'Mathematics',subjects:['Mathematics'],classes:['Class 8','Class 9','Class 10','Class 11'],board:'CBSE',city:'Bengaluru',mode:'Online',experience:7,rating:4.8,reviews:96,price:650,bio:'Patient mathematics educator who turns difficult chapters into simple, repeatable methods.',accent:'cyan'},
 {id:'t3',name:'Rohan Kulkarni',initials:'RK',subject:'Chemistry',subjects:['Chemistry','JEE'],classes:['Class 11','Class 12','JEE'],board:'CBSE',city:'Pune',mode:'Online',experience:11,rating:4.9,reviews:174,price:900,bio:'Organic and physical chemistry specialist with a strong focus on competitive-exam problem solving.',accent:'amber'},
 {id:'t4',name:'Sneha Iyer',initials:'SI',subject:'Biology',subjects:['Biology','NEET'],classes:['Class 11','Class 12','NEET'],board:'ICSE',city:'Chennai',mode:'Online',experience:8,rating:4.8,reviews:83,price:700,bio:'NEET Biology coach using visual explanations, active recall and structured revision.',accent:'emerald'},
 {id:'t5',name:'Kabir Shah',initials:'KS',subject:'Computer Science',subjects:['Computer Science','Mathematics'],classes:['Class 9','Class 10','Class 11','Class 12'],board:'ICSE',city:'Mumbai',mode:'Online',experience:6,rating:4.7,reviews:61,price:600,bio:'Computer Science tutor for school students, Python fundamentals and logical thinking.',accent:'blue'},
 {id:'t6',name:'Ananya Rao',initials:'AR',subject:'English',subjects:['English'],classes:['Class 6','Class 7','Class 8','Class 9','Class 10'],board:'CBSE',city:'Hyderabad',mode:'Online + Offline',experience:10,rating:4.9,reviews:112,price:550,bio:'English language and literature teacher focused on confidence, writing and comprehension.',accent:'rose'},
];

export const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Computer Science','JEE','NEET'];
export const classes = ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','JEE','NEET'];
export const boards = ['CBSE','ICSE','State Board','IB'];
