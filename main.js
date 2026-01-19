// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyBMSsNz6Dgss5vr8vlPbDdKgwOIn3dMBik",
  authDomain: "insancemerlang2025.firebaseapp.com",
  projectId: "insancemerlang2025",
  storageBucket: "insancemerlang2025.firebasestorage.app",
  messagingSenderId: "900746896855",
  appId: "1:900746896855:web:20cfd37822398ef034d792"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const filmCollection = collection(db, "film")



// fungsi untuk menampilkan daftar film dan drama

export async function daftarFilm () {
  
  // ambil snapshot data dari koleksi film
  const snapshot = await getDocs(filmCollection)

  // ambil elemen tabel data
  const tabel = document.getElementById('tabelData')

  // kosongkan isi tabel nya
  tabel.innerHTML = ""

  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id

    // buat elemen baris baru
    const baris = document.createElement("tr")

    // buat elemen kolom untuk judul
    const kolomJudul = document.createElement("td")
    kolomJudul.textContent = data.judul

    // buat elemen untuk kolom sinopsis 
    const kolomSinopsis = document.createElement("td")
    kolomSinopsis.textContent = data.sinopsis

    // buat elemen kolom untuk aktor
    const kolomAktor = document.createElement('td')
    kolomAktor.textContent = data.aktor

    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement('td')

    // tombol edit
    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'

    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapusfilm(id)
    }

    // tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)

    // tambahkan kolom ke dalam baris
    baris.appendChild(kolomJudul)
    baris.appendChild(kolomSinopsis)
    baris.appendChild(kolomAktor)
    baris.appendChild(kolomAksi)

    // tambahkan baris ke aalam tabel
    tabel.appendChild(baris)

  })
}

// fungsi untuk menambah film atau drama baru 
export async function tambahFilm(data) {
  // ambil nilai dari form
  const judul = document.getElementById('judul').value
  const sinopsis = document.getElementById('sinopsis').value
  const aktor = document.getElementById('aktor').value

  

  
  

  // tambahkan data ke firestore
  await addDoc(filmCollection, {
    judul: judul,
    sinopsis: sinopsis,
    aktor: aktor
  })

  // alihkan ke halaman daftar film
  window.location.href = 'daftar.html'
}
