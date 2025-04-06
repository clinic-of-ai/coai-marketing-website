import { supabase } from './supabase';
import { getYouTubeThumbnailUrl } from './utils';

// Type definitions based on database schema
export type Category = {
  id?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type Video = {
  id?: string;
  title: string;
  description: string;
  youtube_url: string;
  thumbnail_url?: string;
  category_id?: string;
  visible?: boolean;
  isdeleted?: boolean;
  created_at?: string;
  updated_at?: string;
};

// Process video data to add YouTube thumbnails if needed
function processVideoData(videos: any[]): any[] {
  return videos.map(video => {
    // If no thumbnail_url exists, generate one from the YouTube URL
    if (!video.thumbnail_url && video.youtube_url) {
      video.thumbnail_url = getYouTubeThumbnailUrl(video.youtube_url);
    }
    return video;
  });
}

// Categories CRUD

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function getCategoryById(id: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createCategory(category: Category) {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Videos CRUD
export async function getAllVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*, categories(id, name)')
    .eq('isdeleted', false)
    .eq('visible', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return processVideoData(data || []);
}

export async function getVideos(filters?: { 
  category_id?: string, 
  visible?: boolean,
  isdeleted?: boolean 
}) {
  let query = supabase
    .from('videos')
    .select('*, categories(id, name)');
  
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }
  
  if (filters?.visible !== undefined) {
    query = query.eq('visible', filters.visible);
  }
  
  if (filters?.isdeleted !== undefined) {
    query = query.eq('isdeleted', filters.isdeleted);
  } else {
    // By default, don't show deleted videos
    query = query.eq('isdeleted', false);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return processVideoData(data || []);
}

export async function getVideoById(id: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*, categories(id, name)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data ? processVideoData([data])[0] : null;
}

export async function createVideo(video: Video) {
  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateVideo(id: string, video: Partial<Video>) {
  const { data, error } = await supabase
    .from('videos')
    .update(video)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteVideo(id: string, hardDelete: boolean = false) {
  if (hardDelete) {
    // Permanently delete the video
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } else {
    // Soft delete by setting isdeleted to true
    const { error } = await supabase
      .from('videos')
      .update({ isdeleted: true })
      .eq('id', id);
    
    if (error) throw error;
  }
  
  return true;
}

// Thumbnail handling

export async function uploadThumbnail(file: File, filename: string) {
  const { data, error } = await supabase
    .storage
    .from('thumbnails')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('thumbnails')
    .getPublicUrl(data.path);
  
  return publicUrl;
}

export async function deleteThumbnail(path: string) {
  const { error } = await supabase
    .storage
    .from('thumbnails')
    .remove([path]);
  
  if (error) throw error;
  return true;
} 