import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut, createMiracle, createSaint, createQuote, uploadImage, getImageUrl, getMiracles, getSaints, getQuotes } from '../../lib/supabase';
import ConfirmationModal from '../../components/ConfirmationModal';
import ToastNotification from '../../components/ToastNotification';

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Statistics
  const [stats, setStats] = useState({
    miracles: 0,
    saints: 0,
    quotes: 0,
    totalViews: 0
  });

  // Content data
  const [miracles, setMiracles] = useState<any[]>([]);
  const [saints, setSaints] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Modal states
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  
  // Notification states
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger' as 'danger' | 'warning' | 'info'
  });
  const [toastNotification, setToastNotification] = useState({
    isVisible: false,
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: ''
  });

  // Form states
  const [miracleForm, setMiracleForm] = useState({
    title: '',
    location: '',
    year: new Date().getFullYear(),
    description: '',
    spiritual_meaning: '',
    quote: '',
    image: null as File | null
  });

  const [saintForm, setSaintForm] = useState({
    name: '',
    feast_day: '',
    description: '',
    quotes: [''],
    timeline: [{ year: new Date().getFullYear(), event: '' }],
    image: null as File | null
  });

  const [quoteForm, setQuoteForm] = useState({
    text: '',
    author: '',
    category: 'ekaristi'
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          navigate('/admin/login');
        } else {
          setUser(currentUser);
          loadStats();
        }
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const [miraclesData, saintsData, quotesData] = await Promise.all([
        getMiracles(),
        getSaints(),
        getQuotes()
      ]);
      
      setMiracles(miraclesData);
      setSaints(saintsData);
      setQuotes(quotesData);
      
      setStats({
        miracles: miraclesData.length,
        saints: saintsData.length,
        quotes: quotesData.length,
        totalViews: 0 // Ini bisa diupdate jika ada tracking analytics
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Preview functions
  const handlePreview = (item: any, type: string) => {
    setPreviewItem({ ...item, type });
  };

  const handleEdit = (item: any, type: string) => {
    setEditItem({ ...item, type });
    setEditForm({ ...item });
  };

  const showConfirmation = (title: string, message: string, onConfirm: () => void, type: 'danger' | 'warning' | 'info' = 'danger') => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  };

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setToastNotification({
      isVisible: true,
      type,
      title,
      message
    });
  };

  const handleDelete = async (item: any, type: string) => {
    const itemName = type === 'miracle' ? 'mukjizat' : type === 'saint' ? 'santo/santa' : 'kutipan';
    const itemTitle = item.title || item.name || item.text?.substring(0, 50) + '...';
    
    showConfirmation(
      `Hapus ${itemName}?`,
      `Apakah Anda yakin ingin menghapus "${itemTitle}"? Tindakan ini tidak dapat dibatalkan.`,
      async () => {
        try {
          // TODO: Implement delete function in supabase.ts
          console.log('Delete:', type, item.id);
          // Reload data after deletion
          await loadStats();
          showToast('success', 'Berhasil!', `${itemName} berhasil dihapus.`);
        } catch (error) {
          console.error('Error deleting item:', error);
          showToast('error', 'Gagal!', `Gagal menghapus ${itemName}. Silakan coba lagi.`);
        }
      },
      'danger'
    );
  };

  const handleSaveEdit = async () => {
    try {
      // TODO: Implement update function in supabase.ts
      console.log('Save edit:', editItem.type, editForm);
      setEditItem(null);
      setEditForm({});
      // Reload data after update
      await loadStats();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleMiracleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      
      if (miracleForm.image) {
        const { data, error } = await uploadImage(miracleForm.image, 'images', `miracles/${Date.now()}-${miracleForm.image.name}`);
        if (error) throw error;
        if (data) {
          imageUrl = getImageUrl('images', data.path);
        }
      }

      const { error } = await createMiracle({
        title: miracleForm.title,
        location: miracleForm.location,
        year: miracleForm.year,
        description: miracleForm.description,
        image_url: imageUrl
      });

      if (error) throw error;

      setMiracleForm({
        title: '',
        location: '',
        year: new Date().getFullYear(),
        description: '',
        spiritual_meaning: '',
        quote: '',
        image: null
      });

      showToast('success', 'Berhasil!', 'Mukjizat berhasil ditambahkan!');
      loadStats();
    } catch (error) {
      console.error('Error creating miracle:', error);
      showToast('error', 'Gagal!', 'Gagal menambahkan mukjizat. Silakan coba lagi.');
    }
  };

  const handleSaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      
      if (saintForm.image) {
        const { data, error } = await uploadImage(saintForm.image, 'images', `saints/${Date.now()}-${saintForm.image.name}`);
        if (error) throw error;
        if (data) {
          imageUrl = getImageUrl('images', data.path);
        }
      }

      const { error } = await createSaint({
        name: saintForm.name,
        feast_day: saintForm.feast_day,
        description: saintForm.description,
        quotes: saintForm.quotes.filter(q => q.trim() !== ''),
        timeline: saintForm.timeline.filter(t => t.event.trim() !== ''),
        image_url: imageUrl
      });

      if (error) throw error;

      setSaintForm({
        name: '',
        feast_day: '',
        description: '',
        quotes: [''],
        timeline: [{ year: new Date().getFullYear(), event: '' }],
        image: null
      });

      showToast('success', 'Berhasil!', 'Santo/Santa berhasil ditambahkan!');
      loadStats();
    } catch (error) {
      console.error('Error creating saint:', error);
      showToast('error', 'Gagal!', 'Gagal menambahkan santo/santa. Silakan coba lagi.');
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await createQuote(quoteForm);
      if (error) throw error;

      setQuoteForm({
        text: '',
        author: '',
        category: 'ekaristi'
      });

      showToast('success', 'Berhasil!', 'Kutipan berhasil ditambahkan!');
      loadStats();
    } catch (error) {
      console.error('Error creating quote:', error);
      showToast('error', 'Gagal!', 'Gagal menambahkan kutipan. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-gold-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'miracles', 
      label: 'Mukjizat', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      id: 'saints', 
      label: 'Santo & Santa', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'quotes', 
      label: 'Kutipan', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gold-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:static h-screen w-64 bg-white shadow-lg z-50"
      >
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-playfair text-xl font-semibold text-gray-800">
              Roti Surgawi
            </span>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
              <span className="text-gold-600 font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gold-500 text-white'
                  : 'text-gray-700 hover:bg-gold-50 hover:text-gold-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="font-playfair text-2xl font-bold text-gray-800">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
            </div>
            
            <a
              href="/beranda"
              target="_blank"
              className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors text-sm font-medium"
            >
              Lihat Website
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{stats.miracles}</span>
                  </div>
                  <h3 className="font-medium text-gray-600">Total Mukjizat</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{stats.saints}</span>
                  </div>
                  <h3 className="font-medium text-gray-600">Total Santo</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{stats.quotes}</span>
                  </div>
                  <h3 className="font-medium text-gray-600">Total Kutipan</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{stats.totalViews}</span>
                  </div>
                  <h3 className="font-medium text-gray-600">Total Views</h3>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-playfair text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('miracles')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
                  >
                    <span className="text-3xl mb-2 block">✨</span>
                    <span className="font-medium text-gray-700">Tambah Mukjizat</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('saints')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
                  >
                    <span className="text-3xl mb-2 block">👼</span>
                    <span className="font-medium text-gray-700">Tambah Santo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
                  >
                    <span className="text-3xl mb-2 block">💬</span>
                    <span className="font-medium text-gray-700">Tambah Kutipan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Miracles Tab */}
          {activeTab === 'miracles' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-playfair text-2xl font-bold text-gray-800">
                    Mukjizat Ekaristi
                  </h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Tambah Baru</span>
                  </button>
                </div>
                <p className="text-gray-600">Kelola mukjizat Ekaristi yang telah ditambahkan</p>
              </div>

              {/* Add Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-6">
                    Tambah Mukjizat Baru
                  </h3>
                  <form onSubmit={handleMiracleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Judul Mukjizat
                        </label>
                        <input
                          type="text"
                          required
                          value={miracleForm.title}
                          onChange={(e) => setMiracleForm({ ...miracleForm, title: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: Mukjizat Ekaristi Lanciano"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lokasi
                        </label>
                        <input
                          type="text"
                          required
                          value={miracleForm.location}
                          onChange={(e) => setMiracleForm({ ...miracleForm, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: Lanciano, Italia"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tahun
                      </label>
                      <input
                        type="number"
                        required
                        value={miracleForm.year}
                        onChange={(e) => setMiracleForm({ ...miracleForm, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kisah Mukjizat
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={miracleForm.description}
                        onChange={(e) => setMiracleForm({ ...miracleForm, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Kisah singkat tentang mukjizat..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Makna Spiritual
                      </label>
                      <textarea
                        rows={3}
                        value={miracleForm.spiritual_meaning || ''}
                        onChange={(e) => setMiracleForm({ ...miracleForm, spiritual_meaning: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Makna spiritual dari mukjizat ini..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kutipan Rohani
                      </label>
                      <textarea
                        rows={2}
                        value={miracleForm.quote || ''}
                        onChange={(e) => setMiracleForm({ ...miracleForm, quote: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Kutipan rohani yang terkait dengan mukjizat ini..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gambar
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMiracleForm({ ...miracleForm, image: e.target.files?.[0] || null })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gold-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gold-600 transition-colors"
                      >
                        Simpan Mukjizat
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Content List */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                  Daftar Mukjizat ({miracles.length})
                </h3>
                <div className="space-y-4">
                  {miracles.map((miracle) => (
                    <div key={miracle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{miracle.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{miracle.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{miracle.year}</span>
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{miracle.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handlePreview(miracle, 'miracle')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="Preview"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleEdit(miracle, 'miracle')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(miracle, 'miracle')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Hapus"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {miracles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p>Belum ada mukjizat yang ditambahkan</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Saints Tab */}
          {activeTab === 'saints' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-playfair text-2xl font-bold text-gray-800">
                    Santo/Santa
                  </h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Tambah Baru</span>
                  </button>
                </div>
                <p className="text-gray-600">Kelola profil santo/santa yang telah ditambahkan</p>
              </div>

              {/* Add Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-6">
                    Tambah Santo/Santa Baru
                  </h3>
                  <form onSubmit={handleSaintSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Santo/Santa
                        </label>
                        <input
                          type="text"
                          required
                          value={saintForm.name}
                          onChange={(e) => setSaintForm({ ...saintForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: Carlo Acutis"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hari Pesta
                        </label>
                        <input
                          type="text"
                          required
                          value={saintForm.feast_day}
                          onChange={(e) => setSaintForm({ ...saintForm, feast_day: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: 12 Oktober"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={saintForm.description}
                        onChange={(e) => setSaintForm({ ...saintForm, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Deskripsi singkat tentang santo/santa..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kutipan (pisahkan dengan baris baru)
                      </label>
                      <textarea
                        rows={3}
                        value={saintForm.quotes.join('\n')}
                        onChange={(e) => setSaintForm({ ...saintForm, quotes: e.target.value.split('\n') })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Satu kutipan per baris..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline Kehidupan</label>
                      <div className="space-y-3">
                        {saintForm.timeline.map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="number"
                              value={item.year}
                              onChange={(e) => {
                                const newTimeline = [...saintForm.timeline];
                                newTimeline[index] = { ...item, year: parseInt(e.target.value) };
                                setSaintForm({ ...saintForm, timeline: newTimeline });
                              }}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                              placeholder="Tahun"
                            />
                            <input
                              type="text"
                              value={item.event}
                              onChange={(e) => {
                                const newTimeline = [...saintForm.timeline];
                                newTimeline[index] = { ...item, event: e.target.value };
                                setSaintForm({ ...saintForm, timeline: newTimeline });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                              placeholder="Peristiwa penting..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newTimeline = saintForm.timeline.filter((_: any, i: number) => i !== index);
                                setSaintForm({ ...saintForm, timeline: newTimeline });
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newTimeline = [...saintForm.timeline, { year: new Date().getFullYear(), event: '' }];
                            setSaintForm({ ...saintForm, timeline: newTimeline });
                          }}
                          className="flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Tambah Timeline</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gambar
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSaintForm({ ...saintForm, image: e.target.files?.[0] || null })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gold-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gold-600 transition-colors"
                      >
                        Simpan Santo/Santa
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Content List */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                  Daftar Santo/Santa ({saints.length})
                </h3>
                <div className="space-y-4">
                  {saints.map((saint) => (
                    <div key={saint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{saint.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{saint.feast_day}</span>
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{saint.description}</p>
                          {saint.quotes && saint.quotes.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 italic">"{saint.quotes[0]}"</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handlePreview(saint, 'saint')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="Preview"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleEdit(saint, 'saint')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(saint, 'saint')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Hapus"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {saints.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p>Belum ada santo/santa yang ditambahkan</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-playfair text-2xl font-bold text-gray-800">
                    Kutipan Rohani
                  </h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Tambah Baru</span>
                  </button>
                </div>
                <p className="text-gray-600">Kelola kutipan rohani yang telah ditambahkan</p>
              </div>

              {/* Add Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-6">
                    Tambah Kutipan Baru
                  </h3>
                  <form onSubmit={handleQuoteSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kutipan
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={quoteForm.text}
                        onChange={(e) => setQuoteForm({ ...quoteForm, text: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Masukkan kutipan rohani..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Penulis
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteForm.author}
                          onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: St. Pius X"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategori
                        </label>
                        <select
                          value={quoteForm.category}
                          onChange={(e) => setQuoteForm({ ...quoteForm, category: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        >
                          <option value="ekaristi">Ekaristi</option>
                          <option value="iman">Iman</option>
                          <option value="kasih">Kasih</option>
                          <option value="doa">Doa</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gold-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gold-600 transition-colors"
                      >
                        Simpan Kutipan
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Content List */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                  Daftar Kutipan ({quotes.length})
                </h3>
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <blockquote className="text-gray-800 italic mb-2">
                            "{quote.text}"
                          </blockquote>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-medium">— {quote.author}</span>
                            <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full text-xs">
                              {quote.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handlePreview(quote, 'quote')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="Preview"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleEdit(quote, 'quote')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(quote, 'quote')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Hapus"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {quotes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <p>Belum ada kutipan yang ditambahkan</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair text-2xl font-bold text-gray-800">
                  Preview {previewItem.type === 'miracle' ? 'Mukjizat' : previewItem.type === 'saint' ? 'Santo/Santa' : 'Kutipan'}
                </h3>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {previewItem.type === 'miracle' && (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{previewItem.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>📍 {previewItem.location}</span>
                        <span>📅 {previewItem.year}</span>
                      </div>
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2">Kisah Mukjizat:</h5>
                        <p className="text-gray-700">{previewItem.description}</p>
                      </div>
                      
                      {previewItem.spiritual_meaning && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Makna Spiritual:</h5>
                          <div className="bg-gradient-to-br from-gold-50 to-sky-50 rounded-xl p-4">
                            <p className="text-gray-700 italic">{previewItem.spiritual_meaning}</p>
                          </div>
                        </div>
                      )}

                      {previewItem.quote && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Kutipan Rohani:</h5>
                          <blockquote className="border-l-4 border-gold-500 pl-4 italic text-gray-700 text-lg">
                            "{previewItem.quote}"
                          </blockquote>
                        </div>
                      )}

                      {previewItem.image_url && (
                        <div className="mt-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Gambar:</h5>
                          <img 
                            src={previewItem.image_url} 
                            alt={previewItem.title}
                            className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {previewItem.type === 'saint' && (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{previewItem.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>📅 {previewItem.feast_day}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{previewItem.description}</p>
                      
                      {previewItem.quotes && previewItem.quotes.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Kutipan:</h5>
                          {previewItem.quotes.map((quote: string, index: number) => (
                            <blockquote key={index} className="text-gray-700 italic border-l-4 border-gold-500 pl-4 mb-2">
                              "{quote}"
                            </blockquote>
                          ))}
                        </div>
                      )}

                      {previewItem.timeline && previewItem.timeline.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">Timeline Kehidupan:</h5>
                          <div className="space-y-3">
                            {previewItem.timeline.map((item: any, index: number) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-16 text-sm font-medium text-gold-600">
                                  {item.year}
                                </div>
                                <div className="flex-1 text-gray-700">
                                  {item.event}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {previewItem.image_url && (
                        <div className="mt-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Gambar:</h5>
                          <img 
                            src={previewItem.image_url} 
                            alt={previewItem.name}
                            className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {previewItem.type === 'quote' && (
                  <>
                    <div>
                      <blockquote className="text-gray-800 italic text-lg mb-4">
                        "{previewItem.text}"
                      </blockquote>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium">— {previewItem.author}</span>
                        <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full text-xs">
                          {previewItem.category}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair text-2xl font-bold text-gray-800">
                  Edit {editItem.type === 'miracle' ? 'Mukjizat' : editItem.type === 'saint' ? 'Santo/Santa' : 'Kutipan'}
                </h3>
                <button
                  onClick={() => setEditItem(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {editItem.type === 'miracle' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Judul Mukjizat</label>
                      <input
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Contoh: Mukjizat Ekaristi Lanciano"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                        <input
                          type="text"
                          value={editForm.location || ''}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          placeholder="Contoh: Lanciano, Italia"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                        <input
                          type="number"
                          value={editForm.year || ''}
                          onChange={(e) => setEditForm({ ...editForm, year: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kisah Mukjizat</label>
                      <textarea
                        rows={4}
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Kisah singkat tentang mukjizat..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Makna Spiritual</label>
                      <textarea
                        rows={3}
                        value={editForm.spiritual_meaning || ''}
                        onChange={(e) => setEditForm({ ...editForm, spiritual_meaning: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Makna spiritual dari mukjizat ini..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kutipan Rohani</label>
                      <textarea
                        rows={2}
                        value={editForm.quote || ''}
                        onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Kutipan rohani yang terkait dengan mukjizat ini..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.files?.[0] || null })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                      {editForm.image_url && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                          <img 
                            src={editForm.image_url} 
                            alt="Current" 
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {editItem.type === 'saint' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hari Pesta</label>
                        <input
                          type="text"
                          value={editForm.feast_day || ''}
                          onChange={(e) => setEditForm({ ...editForm, feast_day: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                      <textarea
                        rows={4}
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kutipan (pisahkan dengan baris baru)</label>
                      <textarea
                        rows={3}
                        value={editForm.quotes ? editForm.quotes.join('\n') : ''}
                        onChange={(e) => setEditForm({ ...editForm, quotes: e.target.value.split('\n') })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Satu kutipan per baris..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline Kehidupan</label>
                      <div className="space-y-3">
                        {editForm.timeline && editForm.timeline.map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="number"
                              value={item.year || ''}
                              onChange={(e) => {
                                const newTimeline = [...editForm.timeline];
                                newTimeline[index] = { ...item, year: parseInt(e.target.value) };
                                setEditForm({ ...editForm, timeline: newTimeline });
                              }}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                              placeholder="Tahun"
                            />
                            <input
                              type="text"
                              value={item.event || ''}
                              onChange={(e) => {
                                const newTimeline = [...editForm.timeline];
                                newTimeline[index] = { ...item, event: e.target.value };
                                setEditForm({ ...editForm, timeline: newTimeline });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                              placeholder="Peristiwa penting..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newTimeline = editForm.timeline.filter((_: any, i: number) => i !== index);
                                setEditForm({ ...editForm, timeline: newTimeline });
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newTimeline = [...(editForm.timeline || []), { year: new Date().getFullYear(), event: '' }];
                            setEditForm({ ...editForm, timeline: newTimeline });
                          }}
                          className="flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Tambah Timeline</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.files?.[0] || null })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                      {editForm.image_url && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                          <img 
                            src={editForm.image_url} 
                            alt="Current" 
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {editItem.type === 'quote' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kutipan</label>
                      <textarea
                        rows={3}
                        value={editForm.text || ''}
                        onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                        <input
                          type="text"
                          value={editForm.author || ''}
                          onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                        <select
                          value={editForm.category || 'ekaristi'}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        >
                          <option value="ekaristi">Ekaristi</option>
                          <option value="iman">Iman</option>
                          <option value="kasih">Kasih</option>
                          <option value="doa">Doa</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-gold-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gold-600 transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    onClick={() => setEditItem(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
      />

      {/* Toast Notification */}
      <ToastNotification
        isVisible={toastNotification.isVisible}
        onClose={() => setToastNotification({ ...toastNotification, isVisible: false })}
        type={toastNotification.type}
        title={toastNotification.title}
        message={toastNotification.message}
      />
    </div>
  );
};

export default AdminDashboard;