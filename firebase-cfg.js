// firebase-cfg.js
const firebaseConfig = {
  apiKey: "AIzaSyAtHa9wAryji3EdWwhxT7tUwZquRD-LJvI",
  authDomain: "project-k-dbaef.firebaseapp.com",
  projectId: "project-k-dbaef",
  storageBucket: "project-k-dbaef.firebasestorage.app",
  messagingSenderId: "356936578912",
  appId: "1:356936578912:web:056bdbf8625b33d79e1005",
  measurementId: "G-PXB6QYYV3Z"
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ImgBB Configuration
export const IMGBB_API_KEY = 'ba8023ca74166460c442e8e703d2a1b0';
export const IMGBB_URL = 'https://api.imgbb.com/1/upload';

// Device ID for tracking
export const deviceId = localStorage.getItem('deviceId') || 
  'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
localStorage.setItem('deviceId', deviceId);

// Session ID for tracking
export const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();

// Toast function
export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#FF385C' : '#222222'};
    color: white;
    padding: 16px 24px;
    border-radius: 40px;
    box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    z-index: 3000;
    font-weight: 500;
    animation: slideUp 0.3s ease;
    max-width: 90%;
    text-align: center;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
