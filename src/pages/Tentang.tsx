import React from 'react';
import { motion } from 'framer-motion';

const Tentang = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const textVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-gold-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
            >
              Tentang Roti Surgawi
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Mewartakan keajaiban Ekaristi, menyentuh hati umat
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="glassmorphism rounded-2xl p-8 max-w-4xl mx-auto"
            >
              <blockquote className="font-playfair text-xl sm:text-2xl text-gray-800 italic mb-4">
                "Teknologi harus digunakan untuk kemuliaan Allah dan menyebarkan kabar baik tentang Ekaristi."
              </blockquote>
              <cite className="font-inter text-sm sm:text-base text-gold-600 font-medium">
                — Carlo Acutis, Inspirasi di Balik Roti Surgawi
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                  Misi Kami
                </h2>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
                  Roti Surgawi lahir dari inspirasi Carlo Acutis, seorang remaja yang menggunakan teknologi 
                  untuk menyebarkan kasih kepada Ekaristi. Kami percaya bahwa teknologi modern dapat menjadi 
                  alat yang powerful untuk mewartakan keajaiban Tuhan.
                </p>
                <p className="font-inter text-lg text-gray-600 leading-relaxed">
                  Melalui website ini, kami berkomitmen untuk menyajikan kisah-kisah inspiratif tentang 
                  mukjizat Ekaristi dan kehidupan para santo, dengan desain yang elegan dan kontemplatif 
                  yang membantu umat untuk merenungkan misteri iman.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                      Menyebarkan Mukjizat
                    </h3>
                    <p className="font-inter text-gray-600">
                      Menyajikan kisah-kisah mukjizat Ekaristi yang telah diverifikasi secara ilmiah dari berbagai negara dan zaman.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                      Menginspirasi dengan Teladan
                    </h3>
                    <p className="font-inter text-gray-600">
                      Menampilkan profil dan kisah hidup para santo yang menginspirasi, termasuk Carlo Acutis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                      Teknologi untuk Tuhan
                    </h3>
                    <p className="font-inter text-gray-600">
                      Menggunakan teknologi modern dengan desain yang elegan untuk menciptakan pengalaman kontemplatif.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Carlo Acutis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-playfair text-2xl font-bold mb-2">
                    Carlo Acutis
                  </h3>
                  <p className="font-inter text-sm opacity-90">
                    Inspirasi di Balik Roti Surgawi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Nilai-Nilai Kami
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip yang mendasari setiap konten dan desain yang kami sajikan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Kasih kepada Ekaristi
              </h3>
              <p className="font-inter text-gray-600">
                Setiap konten kami didasarkan pada kasih yang mendalam kepada Sakramen Mahakudus dan keinginan untuk membagikan keajaibannya.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Akurasi dan Kebenaran
              </h3>
              <p className="font-inter text-gray-600">
                Kami berkomitmen untuk menyajikan informasi yang akurat dan dapat dipercaya tentang mukjizat dan kehidupan para santo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Inovasi dalam Iman
              </h3>
              <p className="font-inter text-gray-600">
                Kami menggunakan teknologi modern untuk menciptakan pengalaman yang kontemplatif dan inspiratif dalam mewartakan iman.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-2xl p-12"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Bergabunglah dalam Perjalanan Iman
            </h2>
            <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Mari bersama-sama menjelajahi keajaiban Ekaristi dan menemukan inspirasi dari kisah-kisah para santo yang menguatkan iman kita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mukjizat"
                className="px-8 py-3 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors"
              >
                Jelajahi Mukjizat
              </a>
              <a
                href="/santo"
                className="px-8 py-3 bg-white text-gold-600 font-semibold rounded-full hover:bg-gold-50 transition-colors border border-gold-500"
              >
                Kenali Para Santo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tentang;



