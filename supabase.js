// config.js - API Configuration Loader
// This file safely exposes API keys to your application
// IMPORTANT: In production, use environment variables and a backend proxy

const KAZI_CONFIG = {
    // Supabase Configuration
    supabase: {
        projectUrl: 'https://bzbneptssprgnsrjqfsm.supabase.co',
        publishableKey: 'sb_publishable_SYsRbYQOnrYW6cAtIAHpDg_uLV2G_k2',
        // Note: Direct connection string is for backend only!
        // Never expose database passwords in frontend code
        anonKey: 'sb_publishable_SYsRbYQOnrYW6cAtIAHpDg_uLV2G_k2'
    },
    
    // ImgBB API for image uploads
    imgbb: {
        apiKey: 'ba8023ca74166460c442e8e703d2a1b0',
        uploadUrl: 'https://api.imgbb.com/1/upload'
    },
    
    // App Settings
    app: {
        name: 'Kazi ni Kazi',
        version: '1.0.0',
        description: 'Freelance Marketplace for African Talents'
    }
};

// Initialize Supabase client if Supabase library is loaded
let supabaseClient = null;

// Function to initialize Supabase (call this after loading Supabase CDN)
async function initSupabase() {
    if (typeof supabase !== 'undefined' && !supabaseClient) {
        supabaseClient = supabase.createClient(
            KAZI_CONFIG.supabase.projectUrl,
            KAZI_CONFIG.supabase.publishableKey
        );
        console.log('✅ Supabase initialized successfully');
        return supabaseClient;
    } else if (supabaseClient) {
        return supabaseClient;
    } else {
        console.warn('⚠️ Supabase library not loaded yet');
        return null;
    }
}

// Image upload helper using ImgBB
async function uploadImageToImgBB(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('key', KAZI_CONFIG.imgbb.apiKey);
    
    try {
        const response = await fetch(KAZI_CONFIG.imgbb.uploadUrl, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        if (data.success) {
            return {
                success: true,
                url: data.data.url,
                display_url: data.data.display_url,
                delete_url: data.data.delete_url
            };
        } else {
            throw new Error(data.error?.message || 'Upload failed');
        }
    } catch (error) {
        console.error('ImgBB upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Export for use in other scripts (works in browser)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KAZI_CONFIG, initSupabase, uploadImageToImgBB };
}
