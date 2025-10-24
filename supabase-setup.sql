-- Database setup untuk Roti Surgawi
-- Jalankan script ini di SQL Editor Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel untuk mukjizat Ekaristi
CREATE TABLE IF NOT EXISTS miracles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk santo/santa
CREATE TABLE IF NOT EXISTS saints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  feast_day TEXT NOT NULL,
  description TEXT NOT NULL,
  quotes TEXT[] DEFAULT '{}',
  timeline JSONB DEFAULT '[]',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk kutipan rohani
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'ekaristi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data untuk mukjizat
INSERT INTO miracles (title, location, year, description, image_url) VALUES
('Mukjizat Ekaristi Lanciano', 'Lanciano, Italia', 750, 'Hostia berubah menjadi daging dan anggur menjadi darah yang masih segar hingga saat ini. Mukjizat ini telah diverifikasi secara ilmiah.', 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Mukjizat Ekaristi Buenos Aires', 'Buenos Aires, Argentina', 1996, 'Hostia yang rusak menunjukkan jaringan jantung manusia yang masih hidup. Analisis DNA menunjukkan darah tipe AB.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Mukjizat Ekaristi Tixtla', 'Tixtla, Meksiko', 2006, 'Hostia yang rusak menunjukkan jaringan jantung manusia dengan tanda-tanda inflamasi dan stres.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- Insert sample data untuk santo/santa
INSERT INTO saints (name, feast_day, description, quotes, timeline, image_url) VALUES
('Carlo Acutis', '12 Oktober', 'Santo pelindung internet dan teknologi, dikenal sebagai "Santo Instagram" karena kecintaannya pada Ekaristi dan teknologi.', 
 ARRAY['Ekaristi adalah jalan raya menuju Surga.', 'Teknologi harus digunakan untuk kemuliaan Allah.', 'Hidup adalah anugerah yang harus kita syukuri setiap hari.'],
 '[{"year": 1991, "event": "Lahir di London, Inggris"}, {"year": 2006, "event": "Meninggal karena leukemia di usia 15 tahun"}, {"year": 2020, "event": "Dibeatifikasi oleh Paus Fransiskus"}]',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('St. Teresa dari Avila', '15 Oktober', 'Mistikus dan reformator Karmel, dikenal karena pengalaman mistiknya yang mendalam dengan Tuhan.',
 ARRAY['Dalam setiap hosti tersembunyi misteri kasih Allah yang tak terbatas.', 'Biarlah tidak ada yang mengganggumu, tidak ada yang menakutkanmu.', 'Tuhan sendirilah yang cukup.'],
 '[{"year": 1515, "event": "Lahir di Avila, Spanyol"}, {"year": 1535, "event": "Masuk biara Karmel"}, {"year": 1582, "event": "Meninggal di Alba de Tormes"}, {"year": 1970, "event": "Dinyatakan sebagai Doktor Gereja"}]',
 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- Insert sample data untuk kutipan
INSERT INTO quotes (text, author, category) VALUES
('Ekaristi adalah jalan raya menuju Surga.', 'St. Pius X', 'ekaristi'),
('Dalam setiap hosti tersembunyi misteri kasih Allah yang tak terbatas.', 'St. Teresa dari Avila', 'ekaristi'),
('Ekaristi adalah sumber dan puncak seluruh hidup Kristiani.', 'Katekismus Gereja Katolik', 'ekaristi'),
('Teknologi harus digunakan untuk kemuliaan Allah dan menyebarkan kabar baik tentang Ekaristi.', 'Carlo Acutis', 'ekaristi'),
('Mukjizat adalah tanda yang menguatkan iman kita akan kehadiran Tuhan yang nyata dalam Ekaristi.', 'Paus Yohanes Paulus II', 'ekaristi');

-- Enable Row Level Security (RLS)
ALTER TABLE miracles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saints ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policies untuk public read access
CREATE POLICY "Public read access for miracles" ON miracles FOR SELECT USING (true);
CREATE POLICY "Public read access for saints" ON saints FOR SELECT USING (true);
CREATE POLICY "Public read access for quotes" ON quotes FOR SELECT USING (true);

-- Create policies untuk authenticated users (admin)
CREATE POLICY "Admin full access for miracles" ON miracles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for saints" ON saints FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for quotes" ON quotes FOR ALL USING (auth.role() = 'authenticated');

-- Create function untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers untuk update updated_at
CREATE TRIGGER update_miracles_updated_at BEFORE UPDATE ON miracles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saints_updated_at BEFORE UPDATE ON saints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();



