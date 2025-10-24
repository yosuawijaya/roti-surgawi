import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSaints } from '../lib/supabase';
import { Saint } from '../lib/supabase';

const Santo = () => {
  const [saints, setSaints] = useState<Saint[]>([]);
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaints = async () => {
      try {
        const saintsData = await getSaints();
        setSaints(saintsData);
        if (saintsData.length > 0) {
          setSelectedSaint(saintsData[0]);
        }
      } catch (error) {
        console.error('Error fetching saints:', error);
        // Fallback data jika database belum siap
        const fallbackSaints = [
          {
            id: '1',
            name: 'Carlo Acutis',
            feast_day: '12 Oktober',
            description: 'Santo pelindung internet dan teknologi, dikenal sebagai "Santo Instagram" karena kecintaannya pada Ekaristi dan teknologi.',
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            quotes: [
              'Ekaristi adalah jalan raya menuju Surga.',
              'Teknologi harus digunakan untuk kemuliaan Allah.',
              'Hidup adalah anugerah yang harus kita syukuri setiap hari.'
            ],
            timeline: [
              { year: 1991, event: 'Lahir di London, Inggris' },
              { year: 2006, event: 'Meninggal karena leukemia di usia 15 tahun' },
              { year: 2020, event: 'Dibeatifikasi oleh Paus Fransiskus' }
            ],
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'St. Teresa dari Avila',
            feast_day: '15 Oktober',
            description: 'Mistikus dan reformator Karmel, dikenal karena pengalaman mistiknya yang mendalam dengan Tuhan.',
            image_url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            quotes: [
              'Dalam setiap hosti tersembunyi misteri kasih Allah yang tak terbatas.',
              'Biarlah tidak ada yang mengganggumu, tidak ada yang menakutkanmu.',
              'Tuhan sendirilah yang cukup.'
            ],
            timeline: [
              { year: 1515, event: 'Lahir di Avila, Spanyol' },
              { year: 1535, event: 'Masuk biara Karmel' },
              { year: 1582, event: 'Meninggal di Alba de Tormes' },
              { year: 1970, event: 'Dinyatakan sebagai Doktor Gereja' }
            ],
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            name: 'St. Pius X',
            feast_day: '21 Agustus',
            description: 'Paus yang dikenal sebagai "Paus Ekaristi" karena reformasinya dalam liturgi dan promosi Komuni Kudus.',
            image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            quotes: [
              'Ekaristi adalah jalan raya menuju Surga.',
              'Restore all things in Christ.',
              'Komuni Kudus adalah obat untuk segala penyakit jiwa.'
            ],
            timeline: [
              { year: 1835, event: 'Lahir di Riese, Italia' },
              { year: 1903, event: 'Terpilih sebagai Paus Pius X' },
              { year: 1914, event: 'Meninggal di Roma' },
              { year: 1954, event: 'Dikanonisasi oleh Paus Pius XII' }
            ],
            created_at: new Date().toISOString()
          }
        ];
        setSaints(fallbackSaints);
        setSelectedSaint(fallbackSaints[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchSaints();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil santo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold-50 to-sky-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Santo & Santa
            </h1>
            <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Profil dan kisah hidup para santo yang menginspirasi, dengan kutipan dan timeline kehidupan mereka
            </p>
          </motion.div>
        </div>
      </section>

      {/* Saints Selection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {saints.map((saint) => (
              <motion.button
                key={saint.id}
                variants={cardVariants}
                onClick={() => setSelectedSaint(saint)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedSaint?.id === saint.id
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gold-50 hover:text-gold-600 shadow-md'
                }`}
              >
                {saint.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Saint Profile */}
          {selectedSaint && (
            <motion.div
              key={selectedSaint.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 lg:h-full">
                  <img
                    src={selectedSaint.image_url}
                    alt={selectedSaint.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="font-playfair text-3xl font-bold mb-2">
                      {selectedSaint.name}
                    </h2>
                    <p className="font-inter text-lg opacity-90">
                      Pesta: {selectedSaint.feast_day}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                        Tentang {selectedSaint.name}
                      </h3>
                      <p className="font-inter text-gray-600 leading-relaxed">
                        {selectedSaint.description}
                      </p>
                    </div>

                    {/* Quotes */}
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                        Kutipan Inspiratif
                      </h3>
                      <div className="space-y-4">
                        {selectedSaint.quotes.map((quote, index) => (
                          <motion.blockquote
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glassmorphism rounded-lg p-4"
                          >
                            <p className="font-playfair text-lg italic text-gray-700">
                              "{quote}"
                            </p>
                            <cite className="font-inter text-sm text-gold-600 font-medium">
                              — {selectedSaint.name}
                            </cite>
                          </motion.blockquote>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                        Timeline Kehidupan
                      </h3>
                      <div className="space-y-4">
                        {selectedSaint.timeline.map((event, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-4"
                          >
                            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-gold-600 font-semibold text-sm">
                                {event.year}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="font-inter text-gray-700">
                                {event.event}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                Inspirasi dari Para Santo
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Para santo dan santa adalah teladan hidup yang menunjukkan kepada kita jalan menuju kekudusan melalui kasih kepada Tuhan dan sesama.
              </p>
              <blockquote className="font-playfair text-lg italic text-gold-600">
                "Setiap orang dipanggil untuk menjadi kudus, bukan hanya beberapa orang terpilih."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Santo;



