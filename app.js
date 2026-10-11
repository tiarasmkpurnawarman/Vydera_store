console.log("Vydera Store siap digunakan");

// aktivitas 1 DOM SELECTION / Seleksi elemen
// Semua elemen yang nanti dipakai kita "tangkap" dulu di sini,
// lalu disimpan di variabel supaya tidak perlu dicari berulang-ulang

// 1. mengambil elemen pada langkah pilih game & data akun
const pilihGame = document.getElementById("gameSelect");
const inputPlayerId = document.getElementById("playerId");
const labelPlayerId = document.getElementById("playerIdLabel");
const kolomServer = document.getElementById("serverField");
const inputServerId = document.getElementById("serverId");
const labelServerId = document.getElementById("serverIdLabel");
const infoAkun = document.getElementById("accountHelp");
const petunjukAkun = document.getElementById("accountHint");

// 2. mengambil elemen pada langkah pilih paket
const judulPaket = document.getElementById("packageHeading");
const gridPaket = document.getElementById("packageGrid");

// 3. mengambil elemen ringkasan pesanan
const ringkasanGame = document.getElementById("summaryGame");
const ringkasanMataUang = document.getElementById("summaryCurrency");
const ringkasanPaket = document.getElementById("sumPackage");
const ringkasanHarga = document.getElementById("sumPrice");
const ringkasanTotal = document.getElementById("sumTotal");

// 4. mengambil elemen kode promo
const inputPromo = document.getElementById("promoCode");
const btnPromo = document.getElementById("applyPromo");
const feedbackPromo = document.getElementById("promoFeedback");

// 5. mengambil elemen checkout & modal konfirmasi pesanan
const btnCheckout = document.getElementById("checkoutButton");
const detailPesanan = document.getElementById("orderDetails");
const btnKonfirmasiPesanan = document.getElementById("confirmOrder");

// 6. mengambil elemen form kontak & modal pratinjau pesan
const formKontak = document.getElementById("contactForm");
const inputNama = document.getElementById("contactName");
const inputEmail = document.getElementById("contactEmail");
const inputPesan = document.getElementById("contactMessage");
const btnKirimPesan = document.getElementById("contactConfirmButton");
const detailKontak = document.getElementById("contactDetails");
const btnKonfirmasiKontak = document.getElementById("confirmContact");

// 7. mengambil elemen toast, tahun di footer, dan menu navbar
const pesanToast = document.getElementById("toastMessage");
const tahunFooter = document.getElementById("year");
const menuNavbar = document.getElementById("navMenu");

// querySelectorAll = mengambil SEMUA elemen yang cocok dengan selector
const opsiPembayaran = document.querySelectorAll(".payment-option");
const tombolPilihGame = document.querySelectorAll("[data-pick-game]");
const linkNavbar = document.querySelectorAll("#navMenu .nav-link, #navMenu .btn-nav");

// 8. membuat objek komponen Bootstrap (modal & toast)
// new bootstrap.Modal(...) = mengubah elemen HTML modal jadi modal yang bisa dibuka lewat javascript
const modalPesanan = new bootstrap.Modal(document.getElementById("orderModal"));
const modalKontak = new bootstrap.Modal(document.getElementById("contactModal"));
const toastSitus = new bootstrap.Toast(document.getElementById("siteToast"), { delay: 3200 });


// Data game & paket top up
// Tiap game punya: nama, mata uang (currency), ikon, label input ID, petunjuk, dan daftar paket
// "adaServer" = true kalau game butuh isi Zone ID / Server selain User ID
const dataGame = {
    mlbb: {
        nama: "Mobile Legends: Bang Bang",
        mataUang: "Diamonds",
        ikon: "bi-gem",
        labelId: "User ID",
        labelServer: "Zone ID",
        adaServer: true,
        petunjuk: "Buka profil Mobile Legends untuk menemukan User ID dan Zone ID.",
        paket: [
            { jumlah: "86", harga: 20000, label: "STARTER" },
            { jumlah: "172", harga: 39000, label: "POPULAR" },
            { jumlah: "257", harga: 58000, label: "VALUE" },
            { jumlah: "344", harga: 77000, label: "SQUAD" },
            { jumlah: "514", harga: 115000, label: "BOOST" },
            { jumlah: "878", harga: 195000, label: "LEGEND" }
        ]
    },
    ff: {
        nama: "Free Fire",
        mataUang: "Diamonds",
        ikon: "bi-fire",
        labelId: "Player ID",
        labelServer: "Server",
        adaServer: false,
        petunjuk: "Masukkan Player ID Free Fire yang tertera pada profil akunmu.",
        paket: [
            { jumlah: "70", harga: 10000, label: "STARTER" },
            { jumlah: "140", harga: 20000, label: "POPULAR" },
            { jumlah: "355", harga: 50000, label: "VALUE" },
            { jumlah: "720", harga: 100000, label: "BOOST" },
            { jumlah: "1450", harga: 200000, label: "ELITE" },
            { jumlah: "2180", harga: 300000, label: "LEGEND" }
        ]
    },
    hok: {
        nama: "Honor of Kings",
        mataUang: "Tokens",
        ikon: "bi-trophy",
        labelId: "Player ID",
        labelServer: "Server",
        adaServer: false,
        petunjuk: "Masukkan Player ID yang terhubung ke akun Honor of Kings.",
        paket: [
            { jumlah: "80", harga: 15000, label: "STARTER" },
            { jumlah: "240", harga: 45000, label: "POPULAR" },
            { jumlah: "400", harga: 75000, label: "VALUE" },
            { jumlah: "800", harga: 150000, label: "BOOST" },
            { jumlah: "1200", harga: 225000, label: "ELITE" },
            { jumlah: "2400", harga: 450000, label: "LEGEND" }
        ]
    },
    pubgm: {
        nama: "PUBG Mobile",
        mataUang: "UC",
        ikon: "bi-crosshair",
        labelId: "Character ID",
        labelServer: "Server",
        adaServer: false,
        petunjuk: "Masukkan Character ID PUBG Mobile dengan benar.",
        paket: [
            { jumlah: "60 UC", harga: 15000, label: "STARTER" },
            { jumlah: "325 UC", harga: 75000, label: "POPULAR" },
            { jumlah: "660 UC", harga: 150000, label: "VALUE" },
            { jumlah: "1800 UC", harga: 375000, label: "BOOST" },
            { jumlah: "3850 UC", harga: 750000, label: "ELITE" },
            { jumlah: "8100 UC", harga: 1500000, label: "LEGEND" }
        ]
    },
    valorant: {
        nama: "Valorant",
        mataUang: "Valorant Points",
        ikon: "bi-crosshair2",
        labelId: "Riot ID",
        labelServer: "Tagline",
        adaServer: true,
        petunjuk: "Isi Riot ID dan tagline akun, misalnya Nama#1234.",
        paket: [
            { jumlah: "125 VP", harga: 15000, label: "STARTER" },
            { jumlah: "420 VP", harga: 50000, label: "POPULAR" },
            { jumlah: "700 VP", harga: 80000, label: "VALUE" },
            { jumlah: "1375 VP", harga: 150000, label: "BOOST" },
            { jumlah: "2400 VP", harga: 250000, label: "ELITE" },
            { jumlah: "4000 VP", harga: 400000, label: "LEGEND" }
        ]
    },
    genshin: {
        nama: "Genshin Impact",
        mataUang: "Genesis Crystals",
        ikon: "bi-stars",
        labelId: "UID",
        labelServer: "Server",
        adaServer: true,
        petunjuk: "Masukkan UID dan pilih server sesuai akun Genshin Impact.",
        paket: [
            { jumlah: "60 Crystals", harga: 16000, label: "STARTER" },
            { jumlah: "300 + 30", harga: 79000, label: "POPULAR" },
            { jumlah: "980 + 110", harga: 239000, label: "VALUE" },
            { jumlah: "1980 + 260", harga: 479000, label: "BOOST" },
            { jumlah: "3280 + 600", harga: 799000, label: "ELITE" },
            { jumlah: "6480 + 1600", harga: 1599000, label: "LEGEND" }
        ]
    }
};

// Variabel penampung kondisi saat ini
// "let" dipakai karena nilainya akan berubah-ubah sesuai pilihan user
let gameAktif = "mlbb";
let paketDipilih = { nama: "172 Diamonds", harga: 39000 };
let promoAktif = false;

// Potongan harga dari kode promo VYDERA5
const POTONGAN_PROMO = 5000;


// Langkah 1: Fungsi-fungsi bantu

// Mengubah angka jadi format rupiah, contoh: 39000 -> Rp39.000
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// Mengamankan teks dari user sebelum dimasukkan lewat innerHTML
// supaya kalau user ngetik tag HTML (misal <b>) tidak dijalankan sebagai kode
function amankanTeks(teks) {
    return String(teks)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Menampilkan toast notifikasi di pojok kanan bawah
function tampilkanToast(pesan) {
    pesanToast.textContent = pesan;
    toastSitus.show();
}

// Menghitung total bayar = harga paket dikurangi potongan promo (kalau aktif)
function hitungTotal() {
    let potongan = 0;

    if (promoAktif) {
        potongan = POTONGAN_PROMO;
    }

    // Math.max supaya total tidak pernah minus
    return Math.max(0, paketDipilih.harga - potongan);
}


// Langkah 2: Fungsi update ringkasan pesanan di kolom kanan
function perbaruiRingkasan() {
    ringkasanPaket.textContent = paketDipilih.nama;
    ringkasanHarga.textContent = formatRupiah(paketDipilih.harga);
    ringkasanTotal.textContent = formatRupiah(hitungTotal());
    ringkasanGame.textContent = dataGame[gameAktif].nama;
    ringkasanMataUang.textContent = dataGame[gameAktif].mataUang + " package";
}


// Langkah 3: Fungsi Utama menampilkan form & kartu paket sesuai game yang dipilih
function tampilkanPaket() {
    const game = dataGame[gameAktif];

    // 3.1 ubah judul, label, dan petunjuk sesuai game
    judulPaket.textContent = `Pilih paket ${game.mataUang.toLowerCase()}`;
    labelPlayerId.textContent = game.labelId;
    labelServerId.textContent = game.labelServer;
    infoAkun.textContent = "Pastikan data akun yang kamu masukkan sesuai dengan game pilihan.";
    petunjukAkun.textContent = game.petunjuk;

    // 3.2 placeholder input ID (khusus Valorant formatnya beda)
    if (gameAktif === "valorant") {
        inputPlayerId.placeholder = "Contoh: PlayerName#1234";
    } else {
        inputPlayerId.placeholder = "Masukkan " + game.labelId;
    }

    // 3.3 placeholder input server (MLBB & Valorant punya contoh sendiri)
    if (gameAktif === "mlbb") {
        inputServerId.placeholder = "Contoh: 1234";
    } else if (gameAktif === "valorant") {
        inputServerId.placeholder = "Contoh: #1234";
    } else {
        inputServerId.placeholder = "Pilih / isi " + game.labelServer;
    }

    // 3.4 kolom server disembunyikan (class "d-none" milik Bootstrap) kalau game tidak butuh server
    // toggle("d-none", true) = class ditambahkan, toggle("d-none", false) = class dihapus
    kolomServer.classList.toggle("d-none", !game.adaServer);
    inputServerId.required = game.adaServer;

    // 3.5 buat kartu paket satu per satu, lalu gabungkan jadi satu string HTML
    // paket urutan ke-2 (index 1) otomatis jadi yang terpilih
    let kartuPaket = "";

    game.paket.forEach(function(paket, index) {
        const namaPaket = `${paket.jumlah} ${game.mataUang}`;

        let kelasTerpilih = "";
        if (index === 1) {
            kelasTerpilih = "selected";
        }

        kartuPaket += `
            <div class="col-6 col-sm-4">
                <button class="package w-100 ${kelasTerpilih}" type="button" data-name="${amankanTeks(namaPaket)}" data-price="${paket.harga}">
                    <small>${paket.label}</small>
                    <i class="bi ${game.ikon}"></i>
                    <b>${amankanTeks(paket.jumlah)} <em>${amankanTeks(game.mataUang)}</em></b>
                    <span>${formatRupiah(paket.harga)}</span>
                </button>
            </div>`;
    });

    gridPaket.innerHTML = kartuPaket;

    // 3.6 simpan paket default (index 1) sebagai paket yang terpilih
    paketDipilih = {
        nama: `${game.paket[1].jumlah} ${game.mataUang}`,
        harga: game.paket[1].harga
    };

    // 3.7 pasang event listener klik di setiap kartu paket
    // (harus dipasang di sini karena kartunya baru dibuat lewat innerHTML)
    const semuaPaket = document.querySelectorAll(".package");

    semuaPaket.forEach(function(tombol) {
        tombol.addEventListener("click", function() {
            // hapus class "selected" dari semua kartu, lalu pasang ke kartu yang diklik
            semuaPaket.forEach(function(item) {
                item.classList.remove("selected");
            });
            tombol.classList.add("selected");

            // dataset.name & dataset.price = isi atribut data-name & data-price di HTML
            paketDipilih = {
                nama: tombol.dataset.name,
                harga: Number(tombol.dataset.price)
            };
            perbaruiRingkasan();
        });
    });

    perbaruiRingkasan();
}


// Langkah 4: Event Listener ganti game lewat dropdown
// "change" = event yang jalan setiap kali pilihan dropdown berubah
pilihGame.addEventListener("change", function(event) {
    gameAktif = event.target.value;

    // 4.1 kosongkan input ID & hapus tanda valid / invalid
    inputPlayerId.value = "";
    inputServerId.value = "";
    inputPlayerId.classList.remove("is-invalid", "is-valid");
    inputServerId.classList.remove("is-invalid", "is-valid");

    // 4.2 reset kode promo
    promoAktif = false;
    inputPromo.value = "";
    inputPromo.classList.remove("is-valid", "is-invalid");
    feedbackPromo.textContent = "Gunakan kode VYDERA5 untuk potongan simulasi Rp5.000.";

    // 4.3 tampilkan ulang paket sesuai game yang baru
    tampilkanPaket();
});

// Langkah 5: Event Listener tombol "Pilih diamond / Top up Free Fire / Pilih token" di kartu layanan
// data-pick-game di HTML berisi kode game (mlbb, ff, hok)
tombolPilihGame.forEach(function(link) {
    link.addEventListener("click", function() {
        const kodeGame = link.dataset.pickGame;

        // cek dulu apakah kode game-nya ada di dataGame
        if (dataGame[kodeGame]) {
            gameAktif = kodeGame;
            pilihGame.value = kodeGame;
            tampilkanPaket();
        }
    });
});

// Langkah 6: Event Listener pilihan metode pembayaran
opsiPembayaran.forEach(function(opsi) {
    function aktifkanOpsi() {
        // class "active" hanya dipasang ke opsi yang dipilih
        opsiPembayaran.forEach(function(item) {
            item.classList.toggle("active", item === opsi);
        });
        opsi.querySelector("input").checked = true;
    }

    opsi.addEventListener("click", aktifkanOpsi);
    opsi.querySelector("input").addEventListener("change", aktifkanOpsi);
});


// Langkah 7: Kode promo
// 7.1 klik tombol "Pakai"
btnPromo.addEventListener("click", function() {
    // trim() = hapus spasi di awal & akhir, toUpperCase() = jadi huruf besar semua
    const kode = inputPromo.value.trim().toUpperCase();

    if (kode === "VYDERA5") {
        // kode benar
        promoAktif = true;
        inputPromo.classList.remove("is-invalid");
        inputPromo.classList.add("is-valid");
        feedbackPromo.textContent = "Kode diterapkan. Potongan simulasi Rp5.000 sudah dihitung.";
        feedbackPromo.style.color = "#63e6b4";
        perbaruiRingkasan();
        tampilkanToast("Kode VYDERA5 berhasil digunakan.");
    } else {
        // kode salah atau kosong
        promoAktif = false;
        inputPromo.classList.remove("is-valid");
        inputPromo.classList.add("is-invalid");

        if (kode === "") {
            feedbackPromo.textContent = "Masukkan kode promo terlebih dahulu.";
        } else {
            feedbackPromo.textContent = "Kode tidak ditemukan. Periksa kembali kode promo.";
        }

        feedbackPromo.style.color = "#ff9baf";
        perbaruiRingkasan();
    }
});

// 7.2 kalau user mengetik ulang di kolom promo, status promo di-reset
inputPromo.addEventListener("input", function() {
    promoAktif = false;
    inputPromo.classList.remove("is-valid", "is-invalid");
    feedbackPromo.textContent = "Gunakan kode VYDERA5 untuk potongan simulasi Rp5.000.";
    feedbackPromo.style.color = "";
    perbaruiRingkasan();
});


// Langkah 8: Checkout
// 8.1 klik tombol "Lanjutkan Pesanan"
btnCheckout.addEventListener("click", function() {
    // cek apakah User ID terisi, dan Server ID terisi (kalau game-nya butuh server)
    const userIdValid = inputPlayerId.value.trim() !== "";
    const serverValid = !dataGame[gameAktif].adaServer || inputServerId.value.trim() !== "";

    // class "is-invalid" milik Bootstrap = border merah pada input
    inputPlayerId.classList.toggle("is-invalid", !userIdValid);

    if (dataGame[gameAktif].adaServer) {
        inputServerId.classList.toggle("is-invalid", !serverValid);
    }

    // kalau ada yang belum diisi: tampilkan toast, fokus ke input yang kosong, lalu berhenti
    if (!userIdValid || !serverValid) {
        tampilkanToast("Lengkapi data akun game terlebih dahulu.");

        if (!userIdValid) {
            inputPlayerId.focus();
        } else {
            inputServerId.focus();
        }
        return;
    }

    // ambil metode pembayaran yang sedang dipilih (radio button yang checked)
    const radioTerpilih = document.querySelector('input[name="payment"]:checked');
    let metodeBayar = "QRIS";
    if (radioTerpilih) {
        metodeBayar = radioTerpilih.value;
    }

    // gabungkan User ID & Server ID kalau game-nya butuh server
    let akun = inputPlayerId.value.trim();
    if (dataGame[gameAktif].adaServer) {
        akun = `${inputPlayerId.value.trim()} / ${inputServerId.value.trim()}`;
    }

    // isi detail pesanan ke dalam modal, lalu tampilkan modalnya
    detailPesanan.innerHTML = `
        <div>Game <b>${amankanTeks(dataGame[gameAktif].nama)}</b></div>
        <div>ID akun <b>${amankanTeks(akun)}</b></div>
        <div>Paket <b>${amankanTeks(paketDipilih.nama)}</b></div>
        <div>Pembayaran <b>${amankanTeks(metodeBayar)}</b></div>
        <div>Total <b>${formatRupiah(hitungTotal())}</b></div>`;
    modalPesanan.show();
});

// 8.2 klik tombol "Ya, Lanjutkan" di dalam modal
btnKonfirmasiPesanan.addEventListener("click", function() {
    modalPesanan.hide();
    tampilkanToast("Pesanan ditampilkan sebagai simulasi. Transaksi belum diproses.");
});


// Langkah 9: Form Kontak
// 9.1 klik tombol "Kirim Pesan" -> validasi dulu sebelum modal pratinjau muncul
btnKirimPesan.addEventListener("click", function() {
    const semuaInput = [inputNama, inputEmail, inputPesan];
    let formValid = true;

    semuaInput.forEach(function(input) {
        // checkValidity() = cek aturan bawaan HTML (required, type="email")
        // dan isinya tidak boleh cuma spasi
        const inputValid = input.checkValidity() && input.value.trim().length > 0;

        input.classList.toggle("is-invalid", !inputValid);
        input.classList.toggle("is-valid", inputValid);

        if (!inputValid) {
            formValid = false;
        }
    });

    // kalau ada yang belum valid, tampilkan pesan error bawaan browser lalu berhenti
    if (!formValid) {
        formKontak.classList.add("was-validated");
        formKontak.reportValidity();
        return;
    }

    detailKontak.innerHTML = `
        <div>Nama <b>${amankanTeks(inputNama.value.trim())}</b></div>
        <div>Email <b>${amankanTeks(inputEmail.value.trim())}</b></div>
        <div>Pesan <b>${amankanTeks(inputPesan.value.trim())}</b></div>`;
    modalKontak.show();
});

// 9.2 klik tombol "Ya, Kirim" di dalam modal
btnKonfirmasiKontak.addEventListener("click", function() {
    modalKontak.hide();

    // reset() = mengosongkan semua isi form, lalu tanda valid / invalid ikut dihapus
    formKontak.reset();

    const inputBertanda = document.querySelectorAll("#contactForm .is-valid, #contactForm .is-invalid");
    inputBertanda.forEach(function(input) {
        input.classList.remove("is-valid", "is-invalid");
    });

    tampilkanToast("Pratinjau pesan selesai.");
});


// Langkah 10: Navbar versi HP
// kalau menu sedang terbuka lalu salah satu link diklik, menunya ditutup otomatis
linkNavbar.forEach(function(link) {
    link.addEventListener("click", function() {
        if (menuNavbar.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(menuNavbar).hide();
        }
    });
});


// Langkah 11: Jalankan fungsi awal saat halaman pertama kali dibuka
// getFullYear() = mengambil tahun sekarang untuk teks copyright di footer
tahunFooter.textContent = new Date().getFullYear();
tampilkanPaket();
