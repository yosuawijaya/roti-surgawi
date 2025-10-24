import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Miracle {
  id: string;
  title: string;
  location: string;
  year: number;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Saint {
  id: string;
  name: string;
  feast_day: string;
  description: string;
  image_url: string;
  quotes: string[];
  timeline: Array<{
    year: number;
    event: string;
  }>;
  created_at: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  created_at: string;
}

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Database functions
export const getMiracles = async (): Promise<Miracle[]> => {
  const { data, error } = await supabase
    .from('miracles')
    .select('*')
    .order('year', { ascending: false });
  
  if (error) {
    console.error('Error fetching miracles:', error);
    return [];
  }
  return data || [];
};

export const getSaints = async (): Promise<Saint[]> => {
  const { data, error } = await supabase
    .from('saints')
    .select('*')
    .order('feast_day', { ascending: true });
  
  if (error) {
    console.error('Error fetching saints:', error);
    return [];
  }
  return data || [];
};

export const getQuotes = async (): Promise<Quote[]> => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
  return data || [];
};

// Admin functions
export const createMiracle = async (miracle: Omit<Miracle, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('miracles')
    .insert([miracle])
    .select();
  
  return { data, error };
};

export const createSaint = async (saint: Omit<Saint, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('saints')
    .insert([saint])
    .select();
  
  return { data, error };
};

export const createQuote = async (quote: Omit<Quote, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quote])
    .select();
  
  return { data, error };
};

// Storage functions
export const uploadImage = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  
  return { data, error };
};

export const getImageUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};


