// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0lPpdvFpyGf1_vlCxm2w50rAtpCxIc_g",
  authDomain: "proyekver1.firebaseapp.com",
  databaseURL: "https://proyekver1-default-rtdb.firebaseio.com",
  projectId: "proyekver1",
  storageBucket: "proyekver1.appspot.com",
  messagingSenderId: "797231325267",
  appId: "1:797231325267:web:6ee3b60f08dd865c2e66a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referensi ke data "users" di Firebase Realtime Database
const usersRef = ref(database, "users/");

// Ambil data dari Realtime Database
onValue(
  usersRef,
  (snapshot) => {
    const data = snapshot.val();
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Kosongkan daftar sebelum menampilkan data baru

    // Loop melalui data pengguna dan tampilkan di UI
    for (const userId in data) {
      if (data.hasOwnProperty(userId)) {
        const userData = data[userId];

        // Buat elemen div untuk menampilkan informasi pengguna
        const userSec = document.createElement("section");
        userSec.innerHTML = `
          <li>
        <input type="checkbox" name="collapsible" id="${userData.name}" />
        <label for="${userData.name}">${userData.name}</label>
        <section class="content">
          <div class="box1">

         
            <img src="${userData.photoURL}" alt="pict-profile" width="90" />
          </div>
          <div class="box2">
            <h2>${userData.univ}</h2>
            <table>
              <tr>
                <tr>
                  <td class="tdhead">Matkul</td>
                  <td>:</td>
                  <td  class="tdtext">${userData.matkul}</td>
                </tr>
                <td class="tdhead">Prestasi <br> /Pengalaman</td>
                <td>:</td>
                <td  class="tdtext">${userData.prestasi}</td>
              </tr>
              <tr>
                <td class="tdhead">Jadwal</td>
                <td>:</td>
                <td  class="tdtext">
                ${userData.jadwal}
                </td>
              </tr>
              <tr>
                <td class="tdhead">Posibility</td>
                <td>:</td>
                <td  class="tdtext">${userData.posibility}</td>
              </tr>
            </table>
          </div>
          
        </section>
        
      </li>
`;
        // Tambahkan elemen ke dalam userList
        userList.appendChild(userSec);
      }
    }
  },
  {
    onlyOnce: false, // Untuk mengambil data secara real-time
  }
);
// ORDER Code
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyoqwY7caGH5sow1KsZ_CmKdcfjW7H7MbpFv4PaMmz4gaTPuBk38aVlXKESjYbCxA0i/exec";

const button = document.querySelector("nav div button");

button.addEventListener("click", function () {
  // Meminta input Nama Pengajar
  const namaPengajar = prompt("Nama pengajar");

  // Jika Nama Pengajar dibatalkan
  if (namaPengajar === null) {
    alert("Order dibatalkan.");
    return; // Keluar dari fungsi jika user membatalkan
  }

  // Jika Nama Pengajar tidak diisi
  if (!namaPengajar) {
    alert("Gagal: Nama pengajar wajib diisi.");
    return; // Keluar dari fungsi jika nama pengajar kosong
  }

  // Meminta input Waktu Pesanan
  const jadwalPesanan = prompt(
    "Masukkan jadwal yang di inginkan (contoh: Senin 11:00)"
  );

  // Meminta input Email
  let email = prompt("Masukan email anda");

  // Jika Email dibatalkan
  if (email === null) {
    alert("Order dibatalkan.");
    return; // Keluar dari fungsi jika user membatalkan
  }

  // Validasi format email menggunakan RegEx
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  while (email && !emailPattern.test(email)) {
    email = prompt("Email tidak valid. Masukkan email yang benar:");
    if (email === null) {
      alert("Order dibatalkan.");
      return; // Keluar dari fungsi jika user membatalkan
    }
  }

  // Jika email tidak diisi
  if (!email) {
    alert("Gagal: Email wajib diisi.");
    return; // Keluar dari fungsi jika email kosong
  }

  // Mendapatkan waktu saat ini
  const now = new Date();
  const tanggal = now.toLocaleDateString(); // Format tanggal sekarang
  const waktu = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hari = now.toLocaleDateString("id-ID", { weekday: "long" }); // Hari dalam bahasa Indonesia

  // Membuat data untuk dikirim ke Google Sheet
  const formData = new FormData();
  formData.append("namaPengajar", namaPengajar);
  formData.append("email", email);
  formData.append("tanggal", tanggal);
  formData.append("waktu", waktu);
  formData.append("hari", hari);
  formData.append("jadwalPesanan", jadwalPesanan);

  // Mengirim data ke Google Sheets
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => alert("Order berhasil!"))
    .catch((error) => alert("Gagal mengirim data: " + error.message));
});

// extras
const back = document.querySelector("footer button");
back.addEventListener("click", function () {
  location.href = "https://xfry-1270.github.io/PrivatUnmei/";
});
