import type {
  Assessment,
  AssessmentQuestion,
  Assignment,
  Course,
  Enrollment,
  TrainingRequest,
} from "./types"

export const PYTHON_PLAYLIST_ID = "PLZS-MHyEIRo7cgStrKAMhgnOT66z2qKz1"

// ---------------------------------------------------------------------------
// Assessment questions
// ---------------------------------------------------------------------------

const preTestQuestions: AssessmentQuestion[] = [
  {
    id: "PRE-Q1",
    question: "Apa fungsi utama variabel dalam pemrograman?",
    options: [
      { id: "a", text: "Menyimpan dan mewakili nilai atau data" },
      { id: "b", text: "Menghapus file dari komputer" },
      { id: "c", text: "Mempercepat koneksi internet" },
      { id: "d", text: "Mencetak dokumen" },
    ],
    correctOptionId: "a",
    explanation: "Variabel digunakan untuk menyimpan nilai/data yang dapat digunakan dan diubah selama program berjalan.",
    topic: "Variabel",
  },
  {
    id: "PRE-Q2",
    question: "Manakah ekstensi file Python yang benar?",
    options: [
      { id: "a", text: ".java" },
      { id: "b", text: ".py" },
      { id: "c", text: ".txt" },
      { id: "d", text: ".exe" },
    ],
    correctOptionId: "b",
    explanation: "File Python menggunakan ekstensi .py.",
    topic: "Dasar",
  },
  {
    id: "PRE-Q3",
    question: "Fungsi Python untuk menampilkan teks ke layar adalah?",
    options: [
      { id: "a", text: "echo()" },
      { id: "b", text: "printf()" },
      { id: "c", text: "print()" },
      { id: "d", text: "console.log()" },
    ],
    correctOptionId: "c",
    explanation: "print() adalah fungsi bawaan Python untuk menampilkan output.",
    topic: "Output",
  },
  {
    id: "PRE-Q4",
    question: "Tipe data untuk nilai benar atau salah disebut?",
    options: [
      { id: "a", text: "String" },
      { id: "b", text: "Integer" },
      { id: "c", text: "Boolean" },
      { id: "d", text: "Float" },
    ],
    correctOptionId: "c",
    explanation: "Boolean hanya memiliki dua nilai: True atau False.",
    topic: "Boolean",
  },
  {
    id: "PRE-Q5",
    question: "Operator untuk penjumlahan pada Python adalah?",
    options: [
      { id: "a", text: "+" },
      { id: "b", text: "&" },
      { id: "c", text: "%" },
      { id: "d", text: "#" },
    ],
    correctOptionId: "a",
    explanation: "Operator + digunakan untuk penjumlahan angka (dan penggabungan string).",
    topic: "Operator",
  },
  {
    id: "PRE-Q6",
    question: "Struktur yang digunakan untuk pengambilan keputusan adalah?",
    options: [
      { id: "a", text: "for" },
      { id: "b", text: "if" },
      { id: "c", text: "def" },
      { id: "d", text: "import" },
    ],
    correctOptionId: "b",
    explanation: "Pernyataan if digunakan untuk mengambil keputusan berdasarkan kondisi.",
    topic: "Percabangan",
  },
  {
    id: "PRE-Q7",
    question: "Perulangan (loop) digunakan untuk?",
    options: [
      { id: "a", text: "Menyimpan data permanen" },
      { id: "b", text: "Menjalankan kode berulang kali" },
      { id: "c", text: "Menghubungkan ke database" },
      { id: "d", text: "Membuat variabel baru" },
    ],
    correctOptionId: "b",
    explanation: "Loop digunakan untuk menjalankan blok kode secara berulang.",
    topic: "Perulangan",
  },
  {
    id: "PRE-Q8",
    question: "Keyword untuk membuat function pada Python adalah?",
    options: [
      { id: "a", text: "func" },
      { id: "b", text: "function" },
      { id: "c", text: "def" },
      { id: "d", text: "define" },
    ],
    correctOptionId: "c",
    explanation: "Keyword def digunakan untuk mendefinisikan function di Python.",
    topic: "Function",
  },
  {
    id: "PRE-Q9",
    question: "Apa hasil dari 2 + 3 * 2?",
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "8" },
      { id: "c", text: "12" },
      { id: "d", text: "7" },
    ],
    correctOptionId: "b",
    explanation: "Perkalian didahulukan: 3 * 2 = 6, lalu 2 + 6 = 8.",
    topic: "Operator",
  },
  {
    id: "PRE-Q10",
    question: "Fungsi input() digunakan untuk?",
    options: [
      { id: "a", text: "Menampilkan teks" },
      { id: "b", text: "Menerima input dari pengguna" },
      { id: "c", text: "Menghentikan program" },
      { id: "d", text: "Mengimpor modul" },
    ],
    correctOptionId: "b",
    explanation: "input() digunakan untuk menerima masukan dari pengguna melalui keyboard.",
    topic: "Input",
  },
]

const postTestQuestions: AssessmentQuestion[] = [
  {
    id: "POST-Q1",
    question: "Manakah cara yang benar untuk membuat variabel bernama nama berisi teks 'Budi'?",
    options: [
      { id: "a", text: "nama = 'Budi'" },
      { id: "b", text: "var nama = 'Budi'" },
      { id: "c", text: "string nama = 'Budi'" },
      { id: "d", text: "nama := Budi" },
    ],
    correctOptionId: "a",
    explanation: "Python tidak memerlukan deklarasi tipe; cukup nama = 'Budi'.",
    topic: "Variabel",
  },
  {
    id: "POST-Q2",
    question: "Apa hasil dari len('Python')?",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "7" },
      { id: "d", text: "Error" },
    ],
    correctOptionId: "b",
    explanation: "String 'Python' memiliki 6 karakter.",
    topic: "String",
  },
  {
    id: "POST-Q3",
    question: "Manakah yang merupakan tipe data float?",
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "'10'" },
      { id: "c", text: "10.5" },
      { id: "d", text: "True" },
    ],
    correctOptionId: "c",
    explanation: "Angka dengan titik desimal seperti 10.5 bertipe float.",
    topic: "Number",
  },
  {
    id: "POST-Q4",
    question: "Apa hasil dari bool(0)?",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "0" },
      { id: "d", text: "None" },
    ],
    correctOptionId: "b",
    explanation: "Angka 0 dianggap False dalam konteks boolean.",
    topic: "Boolean",
  },
  {
    id: "POST-Q5",
    question: "Hasil dari 10 % 3 adalah?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "3" },
      { id: "c", text: "0" },
      { id: "d", text: "3.33" },
    ],
    correctOptionId: "a",
    explanation: "Operator % memberikan sisa bagi. 10 dibagi 3 sisa 1.",
    topic: "Operator",
  },
  {
    id: "POST-Q6",
    question: "Fungsi untuk mengubah string '25' menjadi integer adalah?",
    options: [
      { id: "a", text: "str(25)" },
      { id: "b", text: "int('25')" },
      { id: "c", text: "float('25')" },
      { id: "d", text: "bool('25')" },
    ],
    correctOptionId: "b",
    explanation: "int('25') mengonversi string menjadi integer 25.",
    topic: "Konversi",
  },
  {
    id: "POST-Q7",
    question: "Nilai yang dikembalikan input() selalu bertipe?",
    options: [
      { id: "a", text: "Integer" },
      { id: "b", text: "Float" },
      { id: "c", text: "String" },
      { id: "d", text: "Boolean" },
    ],
    correctOptionId: "c",
    explanation: "input() selalu mengembalikan string, perlu dikonversi bila butuh angka.",
    topic: "Input",
  },
  {
    id: "POST-Q8",
    question: "Apa output dari:\nx = 5\nif x > 3:\n    print('Besar')\nelse:\n    print('Kecil')",
    options: [
      { id: "a", text: "Besar" },
      { id: "b", text: "Kecil" },
      { id: "c", text: "Error" },
      { id: "d", text: "5" },
    ],
    correctOptionId: "a",
    explanation: "Karena 5 > 3 bernilai True, maka 'Besar' dicetak.",
    topic: "Percabangan",
  },
  {
    id: "POST-Q9",
    question: "Keyword untuk kondisi tambahan di antara if dan else adalah?",
    options: [
      { id: "a", text: "elseif" },
      { id: "b", text: "elif" },
      { id: "c", text: "else if" },
      { id: "d", text: "when" },
    ],
    correctOptionId: "b",
    explanation: "Python menggunakan elif untuk kondisi tambahan.",
    topic: "Percabangan",
  },
  {
    id: "POST-Q10",
    question: "Apa output dari:\nfor i in range(3):\n    print(i)",
    options: [
      { id: "a", text: "1 2 3" },
      { id: "b", text: "0 1 2" },
      { id: "c", text: "0 1 2 3" },
      { id: "d", text: "3" },
    ],
    correctOptionId: "b",
    explanation: "range(3) menghasilkan 0, 1, 2.",
    topic: "For loop",
  },
  {
    id: "POST-Q11",
    question: "Perulangan yang berjalan selama kondisi bernilai True adalah?",
    options: [
      { id: "a", text: "for" },
      { id: "b", text: "while" },
      { id: "c", text: "repeat" },
      { id: "d", text: "loop" },
    ],
    correctOptionId: "b",
    explanation: "while menjalankan blok kode selama kondisinya True.",
    topic: "While loop",
  },
  {
    id: "POST-Q12",
    question: "Keyword untuk menghentikan perulangan lebih awal adalah?",
    options: [
      { id: "a", text: "stop" },
      { id: "b", text: "exit" },
      { id: "c", text: "break" },
      { id: "d", text: "end" },
    ],
    correctOptionId: "c",
    explanation: "break menghentikan perulangan sepenuhnya.",
    topic: "Perulangan",
  },
  {
    id: "POST-Q13",
    question: "Apa fungsi keyword continue dalam perulangan?",
    options: [
      { id: "a", text: "Menghentikan seluruh perulangan" },
      { id: "b", text: "Melewati iterasi saat ini dan lanjut ke berikutnya" },
      { id: "c", text: "Mengulang program dari awal" },
      { id: "d", text: "Menghapus variabel loop" },
    ],
    correctOptionId: "b",
    explanation: "continue melewati sisa kode iterasi saat ini lalu lanjut ke iterasi berikutnya.",
    topic: "Perulangan",
  },
  {
    id: "POST-Q14",
    question: "Cara mendefinisikan function bernama sapa adalah?",
    options: [
      { id: "a", text: "def sapa():" },
      { id: "b", text: "function sapa():" },
      { id: "c", text: "def sapa{}" },
      { id: "d", text: "func sapa()" },
    ],
    correctOptionId: "a",
    explanation: "Function didefinisikan dengan def nama():.",
    topic: "Function",
  },
  {
    id: "POST-Q15",
    question: "Nilai yang dikirim ke function saat dipanggil disebut?",
    options: [
      { id: "a", text: "Parameter" },
      { id: "b", text: "Argument" },
      { id: "c", text: "Return" },
      { id: "d", text: "Scope" },
    ],
    correctOptionId: "b",
    explanation: "Argument adalah nilai aktual yang dikirim saat function dipanggil.",
    topic: "Function",
  },
  {
    id: "POST-Q16",
    question: "Keyword untuk mengembalikan nilai dari function adalah?",
    options: [
      { id: "a", text: "return" },
      { id: "b", text: "output" },
      { id: "c", text: "give" },
      { id: "d", text: "print" },
    ],
    correctOptionId: "a",
    explanation: "return mengembalikan nilai hasil dari sebuah function.",
    topic: "Return value",
  },
  {
    id: "POST-Q17",
    question: "Apa output dari print(3 * '2')?",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "222" },
      { id: "c", text: "Error" },
      { id: "d", text: "'2''2''2'" },
    ],
    correctOptionId: "b",
    explanation: "String dikali angka menghasilkan pengulangan string: '222'.",
    topic: "String",
  },
  {
    id: "POST-Q18",
    question: "Variabel yang hanya dikenali di dalam function disebut memiliki scope?",
    options: [
      { id: "a", text: "Global" },
      { id: "b", text: "Lokal" },
      { id: "c", text: "Publik" },
      { id: "d", text: "Statis" },
    ],
    correctOptionId: "b",
    explanation: "Variabel lokal hanya dikenali di dalam function tempat ia dibuat.",
    topic: "Scope",
  },
  {
    id: "POST-Q19",
    question: "Manakah penulisan komentar satu baris yang benar di Python?",
    options: [
      { id: "a", text: "// komentar" },
      { id: "b", text: "/* komentar */" },
      { id: "c", text: "# komentar" },
      { id: "d", text: "<!-- komentar -->" },
    ],
    correctOptionId: "c",
    explanation: "Komentar satu baris di Python diawali tanda #.",
    topic: "Basic debugging",
  },
  {
    id: "POST-Q20",
    question: "Apa output dari:\ntotal = 0\nfor i in range(1, 4):\n    total += i\nprint(total)",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "3" },
      { id: "c", text: "10" },
      { id: "d", text: "0" },
    ],
    correctOptionId: "a",
    explanation: "range(1,4) = 1,2,3; total = 1+2+3 = 6.",
    topic: "Output program",
  },
]

function quiz(id: string, prefix: string, items: Omit<AssessmentQuestion, "id">[]): AssessmentQuestion[] {
  return items.map((q, i) => ({ ...q, id: `${prefix}-${i + 1}` }))
}

const quizModul1 = quiz("q1", "Q1M", [
  {
    question: "Python termasuk bahasa pemrograman dengan paradigma?",
    options: [
      { id: "a", text: "Hanya prosedural" },
      { id: "b", text: "Multi-paradigma dan mudah dibaca" },
      { id: "c", text: "Hanya untuk web" },
      { id: "d", text: "Bahasa mesin" },
    ],
    correctOptionId: "b",
    explanation: "Python bersifat multi-paradigma dan dikenal karena sintaksnya yang mudah dibaca.",
  },
  {
    question: "Perintah untuk menjalankan file program.py dari terminal adalah?",
    options: [
      { id: "a", text: "run program.py" },
      { id: "b", text: "python program.py" },
      { id: "c", text: "exec program" },
      { id: "d", text: "start program.py" },
    ],
    correctOptionId: "b",
    explanation: "File dijalankan dengan perintah python program.py.",
  },
  {
    question: "Fungsi bawaan untuk menampilkan teks adalah?",
    options: [
      { id: "a", text: "print()" },
      { id: "b", text: "show()" },
      { id: "c", text: "display()" },
      { id: "d", text: "write()" },
    ],
    correctOptionId: "a",
    explanation: "print() menampilkan teks ke layar.",
  },
  {
    question: "Apa yang dibutuhkan agar bisa menjalankan Python di komputer?",
    options: [
      { id: "a", text: "Interpreter Python terinstal" },
      { id: "b", text: "Koneksi internet permanen" },
      { id: "c", text: "Kartu grafis khusus" },
      { id: "d", text: "Database server" },
    ],
    correctOptionId: "a",
    explanation: "Diperlukan interpreter Python yang terinstal di komputer.",
  },
  {
    question: "Program Python pertama yang umum dibuat menampilkan teks?",
    options: [
      { id: "a", text: "'Goodbye'" },
      { id: "b", text: "'Hello, World!'" },
      { id: "c", text: "'Error'" },
      { id: "d", text: "'Test 123'" },
    ],
    correctOptionId: "b",
    explanation: "'Hello, World!' adalah program pertama yang lazim dibuat.",
  },
])

const quizModul2 = quiz("q2", "Q2M", [
  {
    question: "Manakah yang merupakan string?",
    options: [
      { id: "a", text: "42" },
      { id: "b", text: "True" },
      { id: "c", text: "'Halo'" },
      { id: "d", text: "3.14" },
    ],
    correctOptionId: "c",
    explanation: "Teks di dalam tanda kutip adalah string.",
  },
  {
    question: "Tipe data 3.14 adalah?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "float" },
      { id: "c", text: "str" },
      { id: "d", text: "bool" },
    ],
    correctOptionId: "b",
    explanation: "Angka desimal bertipe float.",
  },
  {
    question: "Fungsi untuk mengetahui tipe data sebuah variabel adalah?",
    options: [
      { id: "a", text: "typeof()" },
      { id: "b", text: "type()" },
      { id: "c", text: "datatype()" },
      { id: "d", text: "kind()" },
    ],
    correctOptionId: "b",
    explanation: "type() mengembalikan tipe data dari sebuah objek.",
  },
  {
    question: "Hasil dari int('7') + 3 adalah?",
    options: [
      { id: "a", text: "'73'" },
      { id: "b", text: "10" },
      { id: "c", text: "Error" },
      { id: "d", text: "73" },
    ],
    correctOptionId: "b",
    explanation: "int('7') = 7, lalu 7 + 3 = 10.",
  },
  {
    question: "Nilai boolean di Python ditulis dengan?",
    options: [
      { id: "a", text: "true / false" },
      { id: "b", text: "True / False" },
      { id: "c", text: "TRUE / FALSE" },
      { id: "d", text: "1 / -1" },
    ],
    correctOptionId: "b",
    explanation: "Boolean Python ditulis True dan False dengan huruf kapital di depan.",
  },
])

const quizModul4 = quiz("q4", "Q4M", [
  {
    question: "Blok kode di dalam if dijalankan ketika kondisi bernilai?",
    options: [
      { id: "a", text: "False" },
      { id: "b", text: "True" },
      { id: "c", text: "None" },
      { id: "d", text: "0" },
    ],
    correctOptionId: "b",
    explanation: "Blok if berjalan hanya ketika kondisinya True.",
  },
  {
    question: "else dijalankan ketika?",
    options: [
      { id: "a", text: "Kondisi if bernilai False" },
      { id: "b", text: "Kondisi if bernilai True" },
      { id: "c", text: "Selalu dijalankan" },
      { id: "d", text: "Tidak pernah dijalankan" },
    ],
    correctOptionId: "a",
    explanation: "else berjalan ketika semua kondisi sebelumnya bernilai False.",
  },
  {
    question: "Untuk menguji lebih dari dua kondisi kita menggunakan?",
    options: [
      { id: "a", text: "elif" },
      { id: "b", text: "switch" },
      { id: "c", text: "case" },
      { id: "d", text: "otherwise" },
    ],
    correctOptionId: "a",
    explanation: "elif digunakan untuk kondisi tambahan.",
  },
  {
    question: "Percabangan di dalam percabangan disebut?",
    options: [
      { id: "a", text: "Nested condition" },
      { id: "b", text: "Loop condition" },
      { id: "c", text: "Global condition" },
      { id: "d", text: "Sub function" },
    ],
    correctOptionId: "a",
    explanation: "if di dalam if disebut nested condition.",
  },
  {
    question: "Apa output dari:\nx = 8\nif x % 2 == 0:\n    print('Genap')\nelse:\n    print('Ganjil')",
    options: [
      { id: "a", text: "Genap" },
      { id: "b", text: "Ganjil" },
      { id: "c", text: "8" },
      { id: "d", text: "Error" },
    ],
    correctOptionId: "a",
    explanation: "8 % 2 == 0 bernilai True sehingga 'Genap' dicetak.",
  },
])

const quizModul5 = quiz("q5", "Q5M", [
  {
    question: "range(2, 5) menghasilkan nilai?",
    options: [
      { id: "a", text: "2 3 4 5" },
      { id: "b", text: "2 3 4" },
      { id: "c", text: "2 5" },
      { id: "d", text: "0 1 2 3 4" },
    ],
    correctOptionId: "b",
    explanation: "range(2,5) menghasilkan 2, 3, 4 (tidak termasuk 5).",
  },
  {
    question: "while akan berhenti ketika kondisinya bernilai?",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "1" },
      { id: "d", text: "Tidak pernah berhenti" },
    ],
    correctOptionId: "b",
    explanation: "while berhenti saat kondisinya menjadi False.",
  },
  {
    question: "break berfungsi untuk?",
    options: [
      { id: "a", text: "Melewati satu iterasi" },
      { id: "b", text: "Menghentikan perulangan" },
      { id: "c", text: "Mengulang dari awal" },
      { id: "d", text: "Menambah iterasi" },
    ],
    correctOptionId: "b",
    explanation: "break menghentikan perulangan sepenuhnya.",
  },
  {
    question: "continue berfungsi untuk?",
    options: [
      { id: "a", text: "Menghentikan perulangan" },
      { id: "b", text: "Melewati iterasi saat ini" },
      { id: "c", text: "Keluar dari program" },
      { id: "d", text: "Menghapus list" },
    ],
    correctOptionId: "b",
    explanation: "continue melewati iterasi saat ini dan lanjut ke berikutnya.",
  },
  {
    question: "Apa output dari:\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i, end=' ')",
    options: [
      { id: "a", text: "1 2 4 5" },
      { id: "b", text: "1 2 3 4 5" },
      { id: "c", text: "3" },
      { id: "d", text: "1 2" },
    ],
    correctOptionId: "a",
    explanation: "Saat i == 3, continue melewati print sehingga 3 tidak ditampilkan.",
  },
])

const quizModul6 = quiz("q6", "Q6M", [
  {
    question: "Keyword untuk mendefinisikan function adalah?",
    options: [
      { id: "a", text: "def" },
      { id: "b", text: "function" },
      { id: "c", text: "fun" },
      { id: "d", text: "define" },
    ],
    correctOptionId: "a",
    explanation: "def digunakan untuk mendefinisikan function.",
  },
  {
    question: "Variabel yang didefinisikan pada parameter function disebut?",
    options: [
      { id: "a", text: "Argument" },
      { id: "b", text: "Parameter" },
      { id: "c", text: "Return value" },
      { id: "d", text: "Global" },
    ],
    correctOptionId: "b",
    explanation: "Parameter adalah variabel yang dideklarasikan pada definisi function.",
  },
  {
    question: "Function tanpa return akan mengembalikan?",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "None" },
      { id: "c", text: "Error" },
      { id: "d", text: "False" },
    ],
    correctOptionId: "b",
    explanation: "Function tanpa return secara default mengembalikan None.",
  },
  {
    question: "Apa output dari:\ndef tambah(a, b):\n    return a + b\nprint(tambah(2, 3))",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "23" },
      { id: "c", text: "None" },
      { id: "d", text: "Error" },
    ],
    correctOptionId: "a",
    explanation: "tambah(2, 3) mengembalikan 5.",
  },
  {
    question: "Variabel lokal dapat diakses dari?",
    options: [
      { id: "a", text: "Seluruh program" },
      { id: "b", text: "Hanya di dalam function tempat ia dibuat" },
      { id: "c", text: "File lain" },
      { id: "d", text: "Function mana pun" },
    ],
    correctOptionId: "b",
    explanation: "Variabel lokal hanya dikenali di dalam function tempat ia dibuat (scope lokal).",
  },
])

// ---------------------------------------------------------------------------
// Assignment
// ---------------------------------------------------------------------------

export const pythonAssignment: Assignment = {
  id: "ASG-MINIPROJECT",
  courseId: "python-basic-001",
  title: "Mini Project: Kalkulator Biaya Perjalanan Dinas",
  brief:
    "Buat program Python sederhana untuk menghitung total biaya perjalanan dinas berdasarkan biaya transportasi, biaya penginapan, uang makan, dan jumlah hari.",
  expectedOutput:
    "Program menerima input biaya transportasi, penginapan per hari, uang makan per hari, dan jumlah hari, lalu menampilkan total biaya perjalanan dinas.",
  submissionRules:
    "Kirimkan file .py, file .zip, atau tautan repository. Sertakan catatan singkat mengenai cara menjalankan program.",
  required: true,
}

// ---------------------------------------------------------------------------
// Assessments
// ---------------------------------------------------------------------------

export const pythonAssessments: Assessment[] = [
  {
    id: "AS-PRETEST",
    courseId: "python-basic-001",
    type: "pretest",
    title: "Pre-Test: Python Dasar",
    durationMinutes: 15,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: true,
    randomizeOptions: true,
    questions: preTestQuestions,
  },
  {
    id: "AS-POSTTEST",
    courseId: "python-basic-001",
    type: "posttest",
    title: "Post-Test: Python Dasar",
    durationMinutes: 30,
    passingGrade: 70,
    maxAttempts: 3,
    randomizeQuestions: true,
    randomizeOptions: true,
    questions: postTestQuestions,
  },
  {
    id: "AS-QUIZ-1",
    courseId: "python-basic-001",
    type: "quiz",
    title: "Quiz Modul 1: Pengenalan Python",
    durationMinutes: 10,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    questions: quizModul1,
  },
  {
    id: "AS-QUIZ-2",
    courseId: "python-basic-001",
    type: "quiz",
    title: "Quiz Modul 2: Variabel dan Tipe Data",
    durationMinutes: 10,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    questions: quizModul2,
  },
  {
    id: "AS-QUIZ-4",
    courseId: "python-basic-001",
    type: "quiz",
    title: "Quiz Modul 4: Percabangan",
    durationMinutes: 10,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    questions: quizModul4,
  },
  {
    id: "AS-QUIZ-5",
    courseId: "python-basic-001",
    type: "quiz",
    title: "Quiz Modul 5: Perulangan",
    durationMinutes: 10,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    questions: quizModul5,
  },
  {
    id: "AS-QUIZ-6",
    courseId: "python-basic-001",
    type: "quiz",
    title: "Quiz Modul 6: Function",
    durationMinutes: 10,
    passingGrade: 70,
    maxAttempts: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    questions: quizModul6,
  },
]

// ---------------------------------------------------------------------------
// Course
// ---------------------------------------------------------------------------

export const pythonCourse: Course = {
  id: "python-basic-001",
  slug: "python-dasar-untuk-pemula",
  title: "Python Dasar untuk Pemula",
  category: "Technical Skill",
  kind: "pilihan",
  level: "pemula",
  method: "E-Learning",
  format: "Online Mandiri",
  language: "Bahasa Indonesia",
  provider: "Internal LMS PID",
  instructor: "Trainer Teknologi Informasi",
  shortDescription:
    "Pelajari dasar-dasar pemrograman Python mulai dari sintaks, variabel, percabangan, perulangan, fungsi, hingga mini project sederhana.",
  about:
    "Pelatihan ini membantu peserta memahami dasar-dasar pemrograman Python, mulai dari instalasi, sintaks dasar, variabel, tipe data, percabangan, perulangan, fungsi, sampai mini project sederhana. Cocok untuk peserta yang belum memiliki pengalaman coding sebelumnya.",
  targetAudience: [
    "Karyawan yang belum memiliki pengalaman pemrograman",
    "Staf bidang teknologi informasi",
    "Staf operasional yang membutuhkan kemampuan otomasi sederhana",
    "Peserta yang ingin memahami dasar logika pemrograman",
  ],
  learningOutcomes: [
    "Menjelaskan konsep dasar pemrograman Python",
    "Menulis dan menjalankan program Python sederhana",
    "Menggunakan variabel dan tipe data",
    "Menggunakan percabangan dan perulangan",
    "Membuat dan menggunakan fungsi",
    "Menyelesaikan mini project sederhana",
    "Menerapkan logika pemrograman untuk kebutuhan kerja sederhana",
  ],
  prerequisites: [
    "Memiliki komputer atau laptop",
    "Mampu menggunakan browser",
    "Tidak membutuhkan pengalaman coding sebelumnya",
  ],
  competencies: [
    "Logika pemrograman dasar",
    "Sintaks Python",
    "Struktur kontrol program",
    "Pemecahan masalah dengan kode",
  ],
  faq: [
    {
      question: "Apakah pelatihan ini membutuhkan pengalaman coding?",
      answer: "Tidak. Pelatihan ini dirancang untuk pemula yang belum pernah menulis kode sama sekali.",
    },
    {
      question: "Berapa lama akses pelatihan?",
      answer: "Akses tersedia selama 30 hari setelah enrollment.",
    },
    {
      question: "Apakah saya mendapatkan sertifikat?",
      answer: "Ya, sertifikat diterbitkan otomatis setelah seluruh syarat kelulusan terpenuhi.",
    },
    {
      question: "Berapa nilai minimum kelulusan?",
      answer: "Nilai post-test minimal 70 dengan maksimal 3 kali percobaan.",
    },
  ],
  estimatedHours: 12,
  accessDays: 30,
  passingGrade: 70,
  maxPostTestAttempts: 3,
  coolingOffMinutes: 10,
  certificateEnabled: true,
  feedbackRequired: true,
  requiresSuratTugas: false,
  cost: 0,
  thumbnail: "/python-course-cover.jpg",
  youtubePlaylistId: PYTHON_PLAYLIST_ID,
  createdAt: "2024-01-01",
  status: "published",
  rating: 4.7,
  ratingCount: 128,
  modules: [
    {
      id: "MOD-0",
      slug: "modul-0-orientasi",
      title: "Modul 0: Orientasi Pelatihan",
      estimatedMinutes: 20,
      materials: [
        {
          id: "M0-1",
          slug: "selamat-datang",
          title: "Selamat Datang di Pelatihan",
          type: "artikel",
          duration: 5,
          countsTowardProgress: true,
          required: true,
          body: "Selamat datang di pelatihan Python Dasar untuk Pemula. Pada pelatihan ini Anda akan belajar langkah demi langkah dari nol hingga mampu membuat program sederhana.",
        },
        {
          id: "M0-2",
          slug: "cara-mengikuti-pelatihan",
          title: "Cara Mengikuti Pelatihan",
          type: "artikel",
          duration: 5,
          countsTowardProgress: true,
          required: true,
          body: "Ikuti materi secara berurutan. Tandai setiap materi selesai setelah dipelajari. Kerjakan quiz pada setiap modul, kumpulkan assignment, lalu selesaikan post-test untuk memperoleh sertifikat.",
        },
        {
          id: "M0-3",
          slug: "aturan-kelulusan",
          title: "Aturan Kelulusan",
          type: "artikel",
          duration: 5,
          countsTowardProgress: true,
          required: true,
          body: "Syarat lulus: seluruh materi wajib selesai, progress 100%, assignment berstatus Lulus, nilai post-test minimal 70, dan feedback pelatihan telah dikirim.",
        },
        {
          id: "M0-4",
          slug: "pre-test",
          title: "Pre-Test",
          type: "pretest",
          duration: 15,
          countsTowardProgress: false,
          required: false,
          assessmentId: "AS-PRETEST",
        },
      ],
    },
    {
      id: "MOD-1",
      slug: "modul-1-pengenalan-python",
      title: "Modul 1: Pengenalan Python",
      estimatedMinutes: 90,
      materials: [
        { id: "M1-1", slug: "apa-itu-python", title: "Apa itu Python", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M1-2", slug: "instalasi-python", title: "Instalasi Python", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M1-3", slug: "menjalankan-program-pertama", title: "Menjalankan Program Pertama", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M1-4", slug: "quiz-modul-1", title: "Quiz Modul 1", type: "quiz", duration: 10, countsTowardProgress: true, required: false, assessmentId: "AS-QUIZ-1" },
      ],
    },
    {
      id: "MOD-2",
      slug: "modul-2-variabel-tipe-data",
      title: "Modul 2: Variabel dan Tipe Data",
      estimatedMinutes: 120,
      materials: [
        { id: "M2-1", slug: "variabel", title: "Variabel", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M2-2", slug: "string", title: "String", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M2-3", slug: "number", title: "Number", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M2-4", slug: "boolean", title: "Boolean", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M2-5", slug: "konversi-tipe-data", title: "Konversi Tipe Data", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M2-6", slug: "quiz-modul-2", title: "Quiz Modul 2", type: "quiz", duration: 10, countsTowardProgress: true, required: false, assessmentId: "AS-QUIZ-2" },
      ],
    },
    {
      id: "MOD-3",
      slug: "modul-3-operator-input",
      title: "Modul 3: Operator dan Input Pengguna",
      estimatedMinutes: 90,
      materials: [
        { id: "M3-1", slug: "operator-aritmatika", title: "Operator Aritmatika", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M3-2", slug: "operator-perbandingan", title: "Operator Perbandingan", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M3-3", slug: "input-pengguna", title: "Input Pengguna", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M3-4", slug: "latihan-praktik", title: "Latihan Praktik", type: "artikel", duration: 25, countsTowardProgress: true, required: true, body: "Latihan: buat program yang meminta dua angka dari pengguna lalu menampilkan hasil penjumlahan, pengurangan, perkalian, dan pembagiannya." },
      ],
    },
    {
      id: "MOD-4",
      slug: "modul-4-percabangan",
      title: "Modul 4: Percabangan",
      estimatedMinutes: 120,
      materials: [
        { id: "M4-1", slug: "if", title: "If", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M4-2", slug: "else", title: "Else", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M4-3", slug: "elif", title: "Elif", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M4-4", slug: "nested-condition", title: "Nested Condition", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M4-5", slug: "quiz-modul-4", title: "Quiz Modul 4", type: "quiz", duration: 10, countsTowardProgress: true, required: false, assessmentId: "AS-QUIZ-4" },
      ],
    },
    {
      id: "MOD-5",
      slug: "modul-5-perulangan",
      title: "Modul 5: Perulangan",
      estimatedMinutes: 120,
      materials: [
        { id: "M5-1", slug: "for-loop", title: "For Loop", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M5-2", slug: "while-loop", title: "While Loop", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M5-3", slug: "break-continue", title: "Break dan Continue", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M5-4", slug: "latihan-perulangan", title: "Latihan Perulangan", type: "artikel", duration: 20, countsTowardProgress: true, required: true, body: "Latihan: gunakan perulangan untuk menampilkan angka 1 sampai 10 dan hitung totalnya." },
        { id: "M5-5", slug: "quiz-modul-5", title: "Quiz Modul 5", type: "quiz", duration: 10, countsTowardProgress: true, required: false, assessmentId: "AS-QUIZ-5" },
      ],
    },
    {
      id: "MOD-6",
      slug: "modul-6-function",
      title: "Modul 6: Function",
      estimatedMinutes: 120,
      materials: [
        { id: "M6-1", slug: "membuat-function", title: "Membuat Function", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M6-2", slug: "parameter-argument", title: "Parameter dan Argument", type: "video", duration: 25, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M6-3", slug: "return-value", title: "Return Value", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M6-4", slug: "scope", title: "Scope", type: "video", duration: 20, countsTowardProgress: true, required: true, minWatchSeconds: 5 },
        { id: "M6-5", slug: "quiz-modul-6", title: "Quiz Modul 6", type: "quiz", duration: 10, countsTowardProgress: true, required: false, assessmentId: "AS-QUIZ-6" },
      ],
    },
    {
      id: "MOD-7",
      slug: "modul-7-mini-project",
      title: "Modul 7: Mini Project",
      estimatedMinutes: 180,
      materials: [
        { id: "M7-1", slug: "brief-mini-project", title: "Brief Mini Project", type: "artikel", duration: 15, countsTowardProgress: true, required: true, body: "Buat program Python untuk menghitung total biaya perjalanan dinas berdasarkan biaya transportasi, biaya penginapan, uang makan, dan jumlah hari." },
        { id: "M7-2", slug: "contoh-output", title: "Contoh Output", type: "artikel", duration: 15, countsTowardProgress: true, required: true, body: "Contoh: Total biaya perjalanan dinas selama 3 hari = Rp1.500.000 (transportasi + penginapan + uang makan)." },
        { id: "M7-3", slug: "ketentuan-pengumpulan", title: "Ketentuan Pengumpulan", type: "artikel", duration: 10, countsTowardProgress: true, required: true, body: "Kumpulkan file .py, .zip, atau tautan repository. Sertakan catatan singkat cara menjalankan program." },
        { id: "M7-4", slug: "assignment-submission", title: "Assignment Submission", type: "assignment", duration: 140, countsTowardProgress: true, required: true, assignmentId: "ASG-MINIPROJECT" },
      ],
    },
    {
      id: "MOD-8",
      slug: "modul-8-post-test-penyelesaian",
      title: "Modul 8: Post-Test dan Penyelesaian",
      estimatedMinutes: 60,
      materials: [
        { id: "M8-1", slug: "ringkasan-pelatihan", title: "Ringkasan Pelatihan", type: "artikel", duration: 10, countsTowardProgress: true, required: true, body: "Ringkasan: Anda telah mempelajari sintaks dasar, variabel, tipe data, operator, percabangan, perulangan, function, dan menyelesaikan mini project." },
        { id: "M8-2", slug: "post-test", title: "Post-Test", type: "posttest", duration: 30, countsTowardProgress: true, required: true, assessmentId: "AS-POSTTEST" },
        { id: "M8-3", slug: "feedback-pelatihan", title: "Feedback Pelatihan", type: "feedback", duration: 10, countsTowardProgress: false, required: false },
        { id: "M8-4", slug: "sertifikat", title: "Sertifikat", type: "artikel", duration: 10, countsTowardProgress: false, required: false, body: "Selamat! Setelah seluruh syarat kelulusan terpenuhi, sertifikat Anda akan otomatis diterbitkan dan dapat diunduh." },
      ],
    },
  ],
}

// Demo training request for the approval flow (Budi Santoso -> Python course).
export const pythonTrainingRequestSeed: TrainingRequest = {
  id: "REQ-PY-001",
  courseId: "python-basic-001",
  userId: "USR001",
  userName: "Budi Santoso",
  division: "Teknologi Informasi",
  reason: "Meningkatkan kemampuan otomasi pekerjaan dan pengolahan data sederhana.",
  cost: 0,
  status: "pending_l1",
  createdAt: "2024-01-16T08:00:00.000Z",
  updatedAt: "2024-01-16T08:00:00.000Z",
  approvals: [],
}

// No enrollment initially — enrollment is created after L3 approval in the demo flow.
export const pythonEnrollmentSeed: Enrollment[] = []

export const allCourses: Course[] = [pythonCourse]
