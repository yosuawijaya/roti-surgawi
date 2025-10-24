import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMiracles } from '../lib/supabase';
import { Miracle } from '../lib/supabase';

const Mukjizat = () => {
  const [miracles, setMiracles] = useState<Miracle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMiracle, setSelectedMiracle] = useState<Miracle | null>(null);

  useEffect(() => {
    const fetchMiracles = async () => {
      try {
        const miraclesData = await getMiracles();
        setMiracles(miraclesData);
      } catch (error) {
        console.error('Error fetching miracles:', error);
        // Fallback data jika database belum siap
        setMiracles([
          {
            id: '1',
            title: 'Mukjizat Ekaristi Lanciano',
            location: 'Lanciano, Italia',
            year: 750,
            description: 'Hostia berubah menjadi daging dan anggur menjadi darah yang masih segar hingga saat ini. Mukjizat ini telah diverifikasi secara ilmiah.',
            image_url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Mukjizat Ekaristi Buenos Aires',
            location: 'Buenos Aires, Argentina',
            year: 1996,
            description: 'Hostia yang rusak menunjukkan jaringan jantung manusia yang masih hidup. Analisis DNA menunjukkan darah tipe AB.',
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Mukjizat Ekaristi Tixtla',
            location: 'Tixtla, Meksiko',
            year: 2006,
            description: 'Hostia yang rusak menunjukkan jaringan jantung manusia dengan tanda-tanda inflamasi dan stres.',
            image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: '4',
            title: 'Mukjizat Ekaristi Sokolka',
            location: 'Sokolka, Polandia',
            year: 2008,
            description: 'Hostia yang jatuh ke tanah menunjukkan jaringan jantung manusia yang masih hidup dengan sel darah merah.',
            image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: '5',
            title: 'Mukjizat Ekaristi Legnica',
            location: 'Legnica, Polandia',
            year: 2013,
            description: 'Hostia yang rusak menunjukkan jaringan jantung manusia dengan tanda-tanda penderitaan.',
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: '6',
            title: 'Mukjizat Ekaristi Chirattakonam',
            location: 'Chirattakonam, India',
            year: 2001,
            description: 'Hostia menunjukkan wajah Yesus yang terlihat jelas dengan mahkota duri.',
            image_url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMiracles();
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
          <p className="text-gray-600">Memuat mukjizat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-gold-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Mukjizat Ekaristi
            </h1>
            <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Kisah-kisah luar biasa tentang mukjizat Ekaristi yang telah diverifikasi secara ilmiah dari berbagai negara dan zaman
            </p>
          </motion.div>
        </div>
      </section>

      {/* Miracles Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {miracles.map((miracle, index) => (
              <motion.div
                key={miracle.id}
                variants={cardVariants}
                className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={miracle.image_url}
                    alt={miracle.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gold-600">{miracle.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                    {miracle.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">{miracle.location}</span>
                  </div>

                  <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4">
                    {miracle.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Mukjizat Ekaristi
                    </span>
                    <button 
                      onClick={() => setSelectedMiracle(miracle)}
                      className="text-gold-600 hover:text-gold-700 font-medium text-sm transition-colors cursor-pointer"
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

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
                Mukjizat yang Menguatkan Iman
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Setiap mukjizat Ekaristi adalah tanda kasih Allah yang tak terbatas dan pengingat akan kehadiran-Nya yang nyata dalam Sakramen Mahakudus.
              </p>
              <blockquote className="font-playfair text-lg italic text-gold-600">
                "Mukjizat adalah tanda yang menguatkan iman kita akan kehadiran Tuhan yang nyata dalam Ekaristi."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Reading Mode */}
      {selectedMiracle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-sky-50 to-gold-50 z-50 overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedMiracle(null)}
            className="fixed top-6 right-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Hero Image */}
          <div className="relative h-[60vh] overflow-hidden">
            <img
              src={selectedMiracle.image_url}
              alt={selectedMiracle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-50 via-sky-50/50 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{selectedMiracle.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{selectedMiracle.year}</span>
                  </div>
                </div>
                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  {selectedMiracle.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Reading Content */}
          <div className="max-w-4xl mx-auto px-8 lg:px-16 py-12">
            <div className="prose prose-lg max-w-none">
              <article className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full mr-4"></div>
                  <h2 className="font-playfair text-3xl font-semibold text-gray-800 m-0">
                    Kisah Mukjizat
                  </h2>
                </div>
                
                <p className="font-inter text-lg text-gray-700 leading-relaxed mb-8">
                  {selectedMiracle.description}
                </p>
                
                <div className="border-t border-gray-200 pt-8">
                  <div className="bg-gradient-to-br from-gold-50 to-sky-50 rounded-xl p-8 mb-8">
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                      Makna Spiritual
                    </h3>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                      Mukjizat Ekaristi ini mengingatkan kita akan kehadiran nyata Tuhan dalam Sakramen Mahakudus. 
                      Setiap mukjizat adalah tanda kasih Allah yang tak terbatas dan bukti bahwa Tuhan hadir di tengah-tengah kita 
                      melalui Ekaristi yang kita rayakan setiap hari.
                    </p>
                  </div>

                  <blockquote className="border-l-4 border-gold-500 pl-6 italic text-xl text-gray-700 font-playfair my-8">
                    "Mukjizat adalah tanda yang menguatkan iman kita akan kehadiran Tuhan yang nyata dalam Ekaristi."
                  </blockquote>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                  <a
                    href="/mukjizat"
                    className="text-gold-600 hover:text-gold-700 font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Kembali ke Mukjizat</span>
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gold-600 hover:text-gold-700 font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>Ke Atas</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7 7v7" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Mukjizat;


