document.addEventListener("DOMContentLoaded", () => {

    // berfungsi untuk menampilkan pesan
    const tampilPesan = (message, type) => {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
        }
    };

    // berfungsi untuk melakukan validasi pada email
    const validasiEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // bergungsi untuk mengecek apakah user sudah login atau belum menggunakan session storage
    const checkLoginStatus = () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const loggedOutLinks = document.querySelectorAll('.nav-logged-out');
        const loggedInLinks = document.querySelectorAll('.nav-logged-in');

        if (isLoggedIn === 'true') {
            loggedOutLinks.forEach(link => {
                link.style.display = 'none';
            });
            loggedInLinks.forEach(link => {
                link.style.display = 'flex'; 
            });
        } else {
            loggedOutLinks.forEach(link => {
                link.style.display = 'block';
            });
            loggedInLinks.forEach(link => {
                link.style.display = 'none';
            });
        }
    };

    // berfungsi untuk menjalankan seluruh logika dari halaman sign up
    const signupForm = document.getElementById('form-signup');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('nama-lengkap').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('no-telepon').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('konfirmasi-pw').value.trim();

            if (!fullName || !email || !phone || !password || !confirmPassword) {
                tampilPesan('Semua kolom wajib diisi.', 'error');
                return;
            }

            if (fullName.length < 3 || fullName.length > 32) {
                tampilPesan('Nama lengkap harus terdiri dari 3 hingga 32 karakter.', 'error');
                return;
            }
            if (!/^[a-zA-Z\s]+$/.test(fullName)) {
                tampilPesan('Nama lengkap tidak boleh mengandung angka.', 'error');
                return;
            }

            if (!validasiEmail(email)) {
                tampilPesan('Format email tidak valid.', 'error');
                return;
            }

            if (!/^08[0-9]{8,14}$/.test(phone)) {
                tampilPesan('Format nomor handphone salah. Contoh: 081234567890 (10-16 digit).', 'error');
                return;
            }
            
            if (password.length < 8) {
                tampilPesan('Kata sandi minimal harus 8 karakter.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                tampilPesan('Kata sandi dan konfirmasi kata sandi tidak cocok.', 'error');
                return;
            }

            tampilPesan('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // berfungsi untuk menjalankan logika login
    const loginForm = document.getElementById('form-login');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (email === '' || password === '') {
                tampilPesan('Email dan kata sandi harus diisi.', 'error');
                return;
            }
            if (!validasiEmail(email)) {
                tampilPesan('Format email tidak valid.', 'error');
                return;
            }
            if (password === "password123") {
                sessionStorage.setItem('isLoggedIn', 'true');
                tampilPesan('Login berhasil! Anda akan diarahkan ke halaman utama.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                tampilPesan('Email atau kata sandi yang Anda masukkan salah.', 'error');
            }
        });
    }

    // berfungsi untuk menjalankan logout. jika user menekan tombol logout maka status login akan dihapus
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');

            // Langsung diarahkan ke home page
            sessionStorage.setItem('logoutStatus', 'success'); 
            window.location.href = 'index.html';
        });
    }

    checkLoginStatus();

    // berfungsi untuk menjalankan logika dari dropdown untuk navbar
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault(); 
            dropdown.classList.toggle('aktif');
        });

        // berfungsi untuk menutup dropdown jika user klik di luar dari area dropdown
        window.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('aktif');
            }
        });
    }

    // berfungsi untuk membuat hamburger Menu
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('aktif');
            navLinks.classList.toggle('aktif');
        });
    }

    // berfungsi untuk menjalankan popupdan detail yang akan memberikan informasi 
    const detailButtons = document.querySelectorAll('.tombol-detail');
    const loginPopup = document.getElementById('login-popup');

    if (detailButtons.length > 0 && loginPopup) {
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const isLoggedIn = sessionStorage.getItem('isLoggedIn');
                
                if (isLoggedIn !== 'true') {
                    e.preventDefault();
                    loginPopup.style.display = 'flex';
                }
                
            });
        });
        const closeButton = loginPopup.querySelector('.popup-close');
        const popupOverlay = loginPopup;
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                loginPopup.style.display = 'none';
            });
        }
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                loginPopup.style.display = 'none';
            }
        });
    }
    
    // berfungsi unttuk menjalnkan popup logout
    const logoutStatus = sessionStorage.getItem('logoutStatus');
    const logoutPopup = document.getElementById('logout-popup');

    if (logoutStatus === 'success' && logoutPopup) {
        logoutPopup.style.display = 'flex';
        sessionStorage.removeItem('logoutStatus'); 

        const closeLogoutPopup = logoutPopup.querySelector('.popup-close');
        if (closeLogoutPopup) {
            closeLogoutPopup.addEventListener('click', () => {
                logoutPopup.style.display = 'none';
            });
        }

        logoutPopup.addEventListener('click', (e) => {
            if (e.target === logoutPopup) {
                logoutPopup.style.display = 'none';
            }
        });
    }

    // berfungsi untuk mengecek apakah user sudah login atau belum
    if (window.location.pathname.includes('layanan-kesehatan.html') ||
        window.location.pathname.includes('layanan-mobil.html') ||
        window.location.pathname.includes('layanan-jiwa.html')) 
        {
            // Cek status login dari session storage
            const isLoggedIn = sessionStorage.getItem('isLoggedIn');

            // Jika belum login maka akan di bawa ke page login
            if (isLoggedIn !== 'true') {
                window.location.href = 'login.html';
            }
        }

    // logika untuk menjalankan page pembelian produk asuransi kesehatan
    if (window.location.pathname.includes('pembelian-kesehatan.html')) {

        // melakuakn cek apakah pengguna sudah login
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html';
        }

        const formPembelianKesehatan = document.getElementById('form-pembelian-kesehatan');
        const hargaPremiDivKesehatan = document.getElementById('pembelian-harga-kesehatan'); 
        const tombolCheckoutKesehatan = document.getElementById('tombol-checkout-kesehatan');

        const hitungPremiKesehatan = () => {
            const namaLengkap = document.getElementById('nama-ktp').value;
            const tanggalLahir = document.getElementById('tanggal-lahir').value;
            const pekerjaan = document.getElementById('pekerjaan').value;
            const merokok = document.querySelector('input[name="merokok"]:checked');
            const hipertensi = document.querySelector('input[name="hipertensi"]:checked');
            const diabetes = document.querySelector('input[name="diabetes"]:checked');

            if (!namaLengkap || !tanggalLahir || !pekerjaan || !merokok || !hipertensi || !diabetes) {
                hargaPremiDivKesehatan.textContent = 'Rp 0';
                tombolCheckoutKesehatan.classList.add('disabled');
                return;
            }

            const k1 = parseInt(merokok.value);
            const k2 = parseInt(hipertensi.value);
            const k3 = parseInt(diabetes.value);
            const P = 2000000;

            const today = new Date();
            const birthDate = new Date(tanggalLahir);
            let u = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                u--;
            }

            let m = 0;
            if (u <= 20) m = 0.1;
            else if (u > 20 && u <= 35) m = 0.2;
            else if (u > 35 && u <= 50) m = 0.25;
            else if (u > 50) m = 0.4;
            
            const hargaPremiTotal = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);

            hargaPremiDivKesehatan.textContent = `Rp ${hargaPremiTotal.toLocaleString('id-ID')}`;
            tombolCheckoutKesehatan.classList.remove('disabled');
        };
        
        if(formPembelianKesehatan) {
            formPembelianKesehatan.addEventListener('input', hitungPremiKesehatan);
        }

        if (tombolCheckoutKesehatan) {
            tombolCheckoutKesehatan.addEventListener('click', () => {
                const premi = document.getElementById('pembelian-harga-kesehatan').textContent;
                sessionStorage.setItem('checkoutProduct', 'Asuransi Kesehatan');
                sessionStorage.setItem('checkoutPremium', premi);
            });
        }
    }

    // logika untuk menu pembelian mobil
    if (window.location.pathname.includes('pembelian-mobil.html')) {

        // cek user sudah login atau belum
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html';
        }

        const formPembelianMobil = document.getElementById('form-pembelian-mobil');
        const hargaPremiDivMobil = document.getElementById('pembelian-harga-mobil');
        const tombolCheckoutMobil = document.getElementById('tombol-checkout-mobil');

        const hitungPremiMobil = () => {
            const inputs = formPembelianMobil.querySelectorAll('input[required]');
            let semuaTerisi = true;

            inputs.forEach(input => {
                if (!input.value) {
                    semuaTerisi = false;
                }
            });

            if (!semuaTerisi) {
                hargaPremiDivMobil.textContent = 'Rp 0';
                tombolCheckoutMobil.classList.add('disabled');
                return;
            }

            const tahunPembuatan = parseInt(document.getElementById('tahun-pembuatan').value);
            const hargaMobil = parseFloat(document.getElementById('harga-mobil').value);
            const tahunSekarang = new Date().getFullYear();
            const umurMobil = tahunSekarang - tahunPembuatan;
            
            let premi = 0;
            const x = hargaMobil;

            if (umurMobil >= 0 && umurMobil <= 3) {
                premi = 0.025 * x;
            } 
            else if (umurMobil > 3 && umurMobil <= 5) {
                if (x < 200000000) {
                    premi = 0.04 * x;
                } else {
                    premi = 0.03 * x;
                }
            } 
            else if (umurMobil > 5) {
                premi = 0.05 * x;
            }

            hargaPremiDivMobil.textContent = `Rp ${premi.toLocaleString('id-ID')}`;
            tombolCheckoutMobil.classList.remove('disabled');
        };
        
        if (formPembelianMobil) {
            formPembelianMobil.addEventListener('input', hitungPremiMobil); 
        }

        if (tombolCheckoutMobil) {
            tombolCheckoutMobil.addEventListener('click', () => {
                const premi = document.getElementById('pembelian-harga-mobil').textContent;
                sessionStorage.setItem('checkoutProduct', 'Asuransi Mobil');
                sessionStorage.setItem('checkoutPremium', premi);
            });
        }
    }

    // untuk menjalankan logika dari pembelian asuransi jiwa
    if (window.location.pathname.includes('pembelian-jiwa.html')) {

        // Cek apakah usersudah login
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html';
        }

        const formPembelianJiwa = document.getElementById('form-pembelian-jiwa');
        const hargaPremiDivJiwa = document.getElementById('pembelian-harga-jiwa');
        const tombolCheckoutJiwa = document.getElementById('tombol-checkout-jiwa');
        const hitungPremiJiwa = () => {
            const namaLengkap = document.getElementById('nama-ktp-jiwa').value;
            const tanggalLahir = document.getElementById('tanggal-lahir-jiwa').value;
            const pertanggungan = document.getElementById('besaran-pertanggungan').value;

            if (!namaLengkap || !tanggalLahir || !pertanggungan) {
                hargaPremiDivJiwa.textContent = 'Rp 0';
                tombolCheckoutJiwa.classList.add('disabled');
                return;
            }

            const today = new Date();
            const birthDate = new Date(tanggalLahir);
            let u = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                u--;
            }

            let m = 0;
            if (u <= 30) {
                m = 0.002; 
            } else if (u > 30 && u <= 50) {
                m = 0.004; 
            } else if (u > 50) {
                m = 0.01; 
            }

            const t = parseFloat(pertanggungan);
            const hargaPremi = m * t;

            hargaPremiDivJiwa.textContent = `Rp ${hargaPremi.toLocaleString('id-ID')}`;
            tombolCheckoutJiwa.classList.remove('disabled');
        };

        if (formPembelianJiwa) {
            formPembelianJiwa.addEventListener('input', hitungPremiJiwa);
        }

        if (tombolCheckoutJiwa) {
            tombolCheckoutJiwa.addEventListener('click', () => {
                const premi = document.getElementById('pembelian-harga-jiwa').textContent;
                sessionStorage.setItem('checkoutProduct', 'Asuransi Jiwa');
                sessionStorage.setItem('checkoutPremium', premi);
            });
        }
    }

    // logika untuk chechout
    if (window.location.pathname.includes('checkout-pembelian.html')) {
        
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        // melakuakn cek apakah user telah login atau belum
        if (isLoggedIn !== 'true') {
            // Jika belum login, maka langsung arahkan ke login 
            sessionStorage.setItem('loginRedirectMessage', 'Anda harus login untuk mengakses halaman checkout.');
            window.location.href = 'login.html';
        } else {
            
            const productName = sessionStorage.getItem('checkoutProduct');
            const premiumPrice = sessionStorage.getItem('checkoutPremium');
            const productNameDiv = document.getElementById('checkout-nama-produk');
            const premiumDisplayDiv = document.getElementById('checkout-harga-premi');

            // melakukan pengecekan apakah ada data produk
            if (!productName || !premiumPrice) {
                // Jika tidak ada data, maka akan dikembalikAn ke homepage
                alert('Data pesanan tidak ditemukan. Anda akan diarahkan ke halaman utama.');
                window.location.href = 'index.html';
            } else {
                // Jika ada data, tampilkan data nya
                productNameDiv.textContent = productName;
                premiumDisplayDiv.textContent = premiumPrice;
            }
            
            const tombolBayar = document.getElementById('tombol-bayar');
            const paymentError = document.getElementById('payment-error');

            if (tombolBayar) {
                tombolBayar.addEventListener('click', () => {
                    const selectedPayment = document.querySelector('input[name="payment"]:checked');
                    
                    if (!selectedPayment) {
                        paymentError.style.display = 'block';
                        return;
                    }
                    
                    paymentError.style.display = 'none';
                    tombolBayar.textContent = 'Memproses...';
                    tombolBayar.disabled = true;

                    setTimeout(() => {
    
                    const productName = sessionStorage.getItem('checkoutProduct');
                    const premiumPrice = sessionStorage.getItem('checkoutPremium');
                    const newPurchase = {
                        nama: productName,
                        jenis: productName.split(' ')[1], 
                        tanggal: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                        harga: premiumPrice,
                        status: 'Lunas'
                    };

                    const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
                    history.push(newPurchase);
                    localStorage.setItem('purchaseHistory', JSON.stringify(history));
                        sessionStorage.setItem('paymentStatus', 'success');
                        window.location.href = 'histori-pembelian.html';
                    }, 2000);
                });
            }
        }
    }

    // logika untuk halaman histori pembelian
    if (window.location.pathname.includes('histori-pembelian.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html'; 
        }

        const tabelBody = document.getElementById('tabel-histori-body'); 
        const pesanKosong = document.getElementById('histori-kosong');
        const tabelHistori = document.getElementById('tabel-histori');    
        const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

        if (history.length === 0) {
            pesanKosong.style.display = 'block';
            tabelHistori.style.display = 'none';
        } else {

            history.reverse().forEach(pembelian => {
                const baris = document.createElement('tr');

                baris.innerHTML = `
                    <td>${pembelian.nama}</td>
                    <td>${pembelian.jenis}</td>
                    <td>${pembelian.tanggal}</td>
                    <td>${pembelian.harga}</td>
                    <td><span class="status-lunas">${pembelian.status}</span></td>
                `;

                tabelBody.appendChild(baris);
            });
        }
        

        // bergunsi untuk menjalankan pop up pembelian sukses
        if (window.location.pathname.includes('histori-pembelian.html')) {
            const paymentStatus = sessionStorage.getItem('paymentStatus');
            const paymentPopup = document.getElementById('payment-success-popup');

            if (paymentStatus === 'success' && paymentPopup) {
                paymentPopup.style.display = 'flex';
                sessionStorage.removeItem('paymentStatus'); 

                const closeBtn = paymentPopup.querySelector('.popup-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        paymentPopup.style.display = 'none';
                    });
                }

                paymentPopup.addEventListener('click', (e) => {
                    if (e.target === paymentPopup) {
                        paymentPopup.style.display = 'none';
                    }
                });
            }
        }
    }
});