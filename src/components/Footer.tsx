import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-playfair text-xl font-semibold">Roti Surgawi</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Mewartakan keajaiban Ekaristi, menyentuh hati umat. 
              Menyebarkan kisah-kisah inspiratif para santo dan mukjizat Tuhan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-gold-400">Navigasi</h3>
            <ul className="space-y-2">
              <li><a href="/beranda" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Beranda</a></li>
              <li><a href="/mukjizat" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Mukjizat Ekaristi</a></li>
              <li><a href="/santo" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Santo & Santa</a></li>
              <li><a href="/tentang" className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Tentang</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-gold-400">Inspirasi</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm italic">
                "Ekaristi adalah jalan raya menuju Surga."
              </p>
              <p className="text-gray-300 text-sm italic">
                "Dalam setiap hosti tersembunyi misteri kasih Allah."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Roti Surgawi. Dibuat dengan kasih untuk kemuliaan Tuhan.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by</span>
              <span className="text-gold-400 font-semibold text-sm">React & Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;


