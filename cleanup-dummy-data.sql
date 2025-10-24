-- Script untuk menghapus data dummy dari database Supabase
-- Jalankan script ini di SQL Editor Supabase untuk membersihkan data dummy

-- Hapus semua data dari tabel miracles
DELETE FROM miracles;

-- Hapus semua data dari tabel saints  
DELETE FROM saints;

-- Hapus semua data dari tabel quotes
DELETE FROM quotes;

-- Reset sequence jika ada (untuk ID auto-increment)
-- Tidak diperlukan karena menggunakan UUID

-- Verifikasi bahwa tabel sudah kosong
SELECT 'miracles' as table_name, COUNT(*) as count FROM miracles
UNION ALL
SELECT 'saints' as table_name, COUNT(*) as count FROM saints  
UNION ALL
SELECT 'quotes' as table_name, COUNT(*) as count FROM quotes;

-- Catatan: Struktur tabel dan policies tetap dipertahankan
-- Hanya data dummy yang dihapus, bukan struktur database

