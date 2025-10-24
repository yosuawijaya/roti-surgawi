import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getQuotes } from '../lib/supabase';
import { Quote } from '../lib/supabase';

const Beranda = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotesData = await getQuotes();
        setQuotes(quotesData);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        // Fallback quotes jika database belum siap
        setQuotes([
          {
            id: '1',
            text: 'Ekaristi adalah jalan raya menuju Surga.',
            author: 'St. Pius X',
            category: 'ekaristi',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            text: 'Dalam setiap hosti tersembunyi misteri kasih Allah yang tak terbatas.',
            author: 'St. Teresa dari Avila',
            category: 'ekaristi',
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            text: 'Ekaristi adalah sumber dan puncak seluruh hidup Kristiani.',
            author: 'Katekismus Gereja Katolik',
            category: 'ekaristi',
            created_at: new Date().toISOString()
          }
        ]);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 1) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [quotes.length]);

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

  const quoteVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />
        
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-20"
        >
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
          >
            Roti Surgawi
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="font-inter text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Mewartakan keajaiban Ekaristi, menyentuh hati umat
          </motion.p>

          {/* Quote Card */}
          {quotes.length > 0 && (
            <motion.div
              key={currentQuoteIndex}
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glassmorphism rounded-2xl p-8 max-w-3xl mx-auto"
            >
              <blockquote className="font-playfair text-xl sm:text-2xl lg:text-3xl text-gray-800 italic mb-4">
                "{quotes[currentQuoteIndex]?.text}"
              </blockquote>
              <cite className="font-inter text-sm sm:text-base text-gold-600 font-medium">
                — {quotes[currentQuoteIndex]?.author}
              </cite>
            </motion.div>
          )}

          {/* Navigation Dots */}
          {quotes.length > 1 && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-2 mt-6"
            >
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuoteIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentQuoteIndex ? 'bg-gold-500' : 'bg-gray-400'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Jelajahi Keajaiban Iman
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan kisah-kisah inspiratif tentang mukjizat Ekaristi dan kehidupan para santo yang menginspirasi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mukjizat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-hover bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Mukjizat Ekaristi
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Kisah-kisah luar biasa tentang mukjizat Ekaristi dari berbagai negara dan zaman
              </p>
              <a
                href="/mukjizat"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium transition-colors"
              >
                Jelajahi Mukjizat
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* Santo Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-hover bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Santo & Santa
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Profil dan kisah hidup para santo yang menginspirasi, termasuk Carlo Acutis
              </p>
              <a
                href="/santo"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium transition-colors"
              >
                Kenali Para Santo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* Tentang Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="card-hover bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                Tentang Kami
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Misi dan inspirasi di balik Roti Surgawi, terinspirasi dari Carlo Acutis
              </p>
              <a
                href="/tentang"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium transition-colors"
              >
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;


