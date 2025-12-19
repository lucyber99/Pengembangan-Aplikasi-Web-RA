# Estatery

## 1. Identitas Proyek
**Nama Proyek:** Estatery  
**Studi Kasus:** #9 - Platform Pemesanan Paket Wisata  
**Deskripsi:** Sebuah platform berbasis web yang dirancang untuk pengelolaan dan pemesanan akomodasi perjalanan serta paket wisata. Proyek ini mendemonstrasikan aplikasi *full-stack* dengan fitur *user authentication*, manajemen properti/paket, dan sistem *inquiry*.

**Anggota Tim:**
* Nashrullah Fathul Qoriib (122140162) - Backend Developer
* Habbi Widagdo (123140204) - Frontend Developer
* Revolusi Al Ghifari (123140199) - Backend Developer
* Andryano Shevchenko Limbong (123140205) - Frontend Developer
* Bayu Brigas Novaldi (123140072) - Database Specialist

## 2. Tech Stack
Proyek ini menggunakan *stack* web modern, menggabungkan *framework* web Python berkinerja tinggi dengan *frontend* yang reaktif.

* **Frontend:**
    *   **Framework:** ReactJS (Vite)
    *   **Styling:** Tailwind CSS
    *   **API Client:** Native Fetch API
    *   **Routing:** React Router DOM

* **Backend:**
    *   **Framework:** Pyramid (Python) - Sebuah web *framework* yang ringan dan fleksibel.
    *   **ORM:** SQLAlchemy - Untuk interaksi database.
    *   **Database Adapter:** Psycopg 3 (PostgreSQL adapter).
    *   **Migrations:** Alembic.
    *   **Authentication:** PyJWT (JSON Web Tokens) & Bcrypt.

* **Database:**
    *   PostgreSQL

## 3. Fitur Utama
Berikut adalah fitur-fitur yang diimplementasikan dalam kode:

*   **User Authentication & Security**
    *   Registrasi dan Login untuk **Wisatawan (Buyers)** dan **Agen Perjalanan (Agents)**.
    *   *Role-based access control (RBAC)* yang memastikan agen dapat mengelola properti sementara wisatawan hanya dapat melihat-lihat.
    *   Manajemen sesi berbasis JWT dan *hashing* password menggunakan Bcrypt.

*   **Property & Package Management (Sisi Agen)**
    *   **Operasi CRUD:** Agen dapat melakukan *Create, Read, Update,* dan *Delete* pada listing properti.
    *   **Detail Properti:** Pengelolaan judul, deskripsi, harga, lokasi, dan spesifikasi (kamar tidur, kamar mandi, luas area).
    *   **Manajemen Foto:** Kemampuan untuk menambahkan dan menghapus foto untuk listing.

*   **Katalog Destinasi (Sisi Wisatawan)**
    *   **Browsing:** Wisatawan dapat melihat daftar lengkap properti/paket yang tersedia.
    *   **Filtering:** Memfilter listing berdasarkan tipe (Rumah/Apartemen).
    *   **Tampilan Detail:** Melihat detail lengkap, termasuk fasilitas dan kontak agen.

*   **Sistem Inquiry & Booking**
    *   **Mengirim Inquiry:** Wisatawan yang sudah *login* dapat mengirim *inquiry* langsung ke agen mengenai properti tertentu.
    *   **Manajemen Inquiry:** Agen dapat melihat dan mengelola *inquiry* yang diterima dari wisatawan.

*   **Favorites / Wishlist**
    *   Wisatawan dapat menyimpan properti ke dalam daftar "Favorit" untuk referensi di masa mendatang.

## 4. Panduan Instalasi & Menjalankan Aplikasi (Local Development)

### Prasyarat
*   **Python:** 3.8+
*   **Node.js:** 16+
*   **PostgreSQL:** Harus sudah terinstal dan berjalan.

### Setup Backend
1.  **Clone repository** dan masuk ke folder *backend*:
    ```bash
    cd backend
    ```

2.  **Buat dan aktifkan virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -e .
    pip install -r requirements.txt
    ```

4.  **Konfigurasi Database:**
    *   Pastikan PostgreSQL berjalan pada port `5433` (atau perbarui `development.ini`).
    *   Buat database dengan nama `listingdb`.
    *   Perbarui *connection string* pada `development.ini` jika diperlukan:
        ```ini
        sqlalchemy.url = postgresql+psycopg://postgres:postgres@localhost:5433/listingdb
        ```

5.  **Jalankan Migrations:**
    ```bash
    cd ..  # Kembali ke root di mana alembic.ini berada
    alembic upgrade head
    ```

6.  **Seed Database (Opsional):**
    ```bash
    cd backend
    python seed.py
    ```

7.  **Jalankan Server:**
    ```bash
    pserve development.ini
    ```
    *Backend* akan berjalan di `http://localhost:6543`.

### Setup Frontend
1.  **Masuk ke folder frontend:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan development server:**
    ```bash
    npm run dev
    ```
    *Frontend* akan berjalan di `http://localhost:5173`.

### Environment Variables
Konfigurasi utamanya ditangani melalui `backend/development.ini`. Pastikan `sqlalchemy.url` sesuai dengan kredensial PostgreSQL lokal Anda.

## 5. Dokumentasi API
*Backend* (Pyramid) menyediakan *endpoints* RESTful berikut:

### Authentication
*   `POST /api/auth/register` - Mendaftarkan user baru (Buyer/Agent)
*   `POST /api/auth/login` - Login dan menerima JWT
*   `GET /api/auth/me` - Mendapatkan profil user saat ini
*   `PUT /api/auth/profile` - Memperbarui profil user

### Properties (Paket)
*   `GET /api/properties` - Menampilkan daftar semua properti
*   `GET /api/properties/detail/{id}` - Mendapatkan detail properti
*   `POST /api/properties/create` - Membuat properti baru (Hanya Agen)
*   `PUT /api/properties/update/{id}` - Memperbarui properti
*   `DELETE /api/properties/delete/{id}` - Menghapus properti
*   `POST /api/properties/photos-add/{id}` - Menambahkan foto ke properti
*   `DELETE /api/properties/photos-delete/{photo_id}` - Menghapus foto

### Inquiries (Pemesanan)
*   `GET /api/inquiries` - Menampilkan daftar *inquiry* (Agen melihat yang diterima, Buyer melihat yang dikirim)
*   `POST /api/inquiries/create` - Mengirim *inquiry* baru
*   `GET /api/inquiries/detail/{id}` - Melihat detail *inquiry*
*   `DELETE /api/inquiries/delete/{id}` - Menghapus *inquiry*

### Favorites
*   `GET /api/favorites` - Mendapatkan properti favorit user
*   `POST /api/favorites/add` - Menambahkan properti ke favorit
*   `DELETE /api/favorites/remove/{property_id}` - Menghapus properti dari favorit

## 6. Link Deployment
*   **Frontend (Vercel):** https://pengembangan-aplikasi-web-ra.vercel.app/
*   **Backend (Domain):** https://pengembangan-aplikasi-web-ra.onrender.com/
*   **Video Demo:** https://youtu.be/k33ZKPeuCSA

## 7. Skema Database
Database menggunakan PostgreSQL dengan model relasional inti sebagai berikut:

*   **Users:** Menyimpan informasi akun, *roles* (`buyer`, `agent`), dan detail kontak profil.
*   **Properties:** Merepresentasikan listing perjalanan/rumah dengan *field* untuk `title`, `description`, `price`, `location`, `type` (rumah/apartemen), dan spesifikasi (`bedrooms`, `bathrooms`).
*   **PropertyPhotos:** Terhubung ke Properties, menyimpan URL dari gambar yang diunggah.
*   **Inquiries:** Menghubungkan `Buyer` ke `Property`, berisi pesan *inquiry* dan *timestamp*.
*   **Favorites:** Tabel *join* untuk melacak properti yang disukai oleh user.
