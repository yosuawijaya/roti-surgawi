// Utility functions untuk Roti Surgawi

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatYear = (year: number): string => {
  return year.toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getImageAlt = (title: string): string => {
  return `${title} - Roti Surgawi`;
};

export const getPageTitle = (page: string): string => {
  const titles: { [key: string]: string } = {
    'beranda': 'Beranda - Roti Surgawi',
    'mukjizat': 'Mukjizat Ekaristi - Roti Surgawi',
    'santo': 'Santo & Santa - Roti Surgawi',
    'tentang': 'Tentang - Roti Surgawi',
    'admin': 'Admin Dashboard - Roti Surgawi'
  };
  
  return titles[page] || 'Roti Surgawi';
};

export const getMetaDescription = (page: string): string => {
  const descriptions: { [key: string]: string } = {
    'beranda': 'Website rohani Roti Surgawi yang mewartakan mukjizat Ekaristi dan kisah para santo/santa dengan desain elegan dan kontemplatif.',
    'mukjizat': 'Jelajahi kisah-kisah mukjizat Ekaristi yang telah diverifikasi secara ilmiah dari berbagai negara dan zaman.',
    'santo': 'Temukan profil dan kisah hidup para santo yang menginspirasi, termasuk Carlo Acutis dan santo/santa lainnya.',
    'tentang': 'Pelajari misi dan inspirasi di balik Roti Surgawi, terinspirasi dari Carlo Acutis yang menggunakan teknologi untuk kemuliaan Allah.',
    'admin': 'Panel admin untuk mengelola konten website Roti Surgawi.'
  };
  
  return descriptions[page] || 'Mewartakan keajaiban Ekaristi, menyentuh hati umat.';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};



