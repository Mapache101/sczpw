import React, { useState } from 'react';
import { X, Check, Copy, Shield, Database, Download, RefreshCw, Key, Cloud, AlertCircle } from 'lucide-react';
import { FirebaseCustomConfig } from '../types.ts';
import { DEFAULT_FIREBASE_CONFIG, getActiveFirebaseConfig, initFirebase } from '../services/firebase.ts';
import { saveStoredFirebaseConfig, exportReportsAsJSON } from '../services/storage.ts';
import { getStoredCloudinaryConfig, saveStoredCloudinaryConfig, CloudinaryConfig } from '../services/cloudinary.ts';

interface FirebaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncSource: 'cloud' | 'local';
  onConfigUpdated: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({
  isOpen,
  onClose,
  syncSource,
  onConfigUpdated
}) => {
  const [config, setConfig] = useState<FirebaseCustomConfig>(getActiveFirebaseConfig());
  const [cloudinaryConfig, setCloudinaryConfig] = useState<CloudinaryConfig>(getStoredCloudinaryConfig());
  const [copiedFirestore, setCopiedFirestore] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const firestoreRulesCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /petReports/{reportId} {
      // Allows anyone in the Santa Cruz community to read and submit lost pet reports
      allow read, write: if true;
    }
  }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFirestore(true);
    setTimeout(() => setCopiedFirestore(false), 2000);
  };

  const handleSave = () => {
    saveStoredFirebaseConfig(config as unknown as Record<string, string>);
    saveStoredCloudinaryConfig(cloudinaryConfig);
    initFirebase(config);
    setSaveSuccess(true);
    onConfigUpdated();
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    setConfig(DEFAULT_FIREBASE_CONFIG);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="firebase-config-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19231e]/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar configuración"
          className="absolute top-4 right-4 p-2 text-[#806a5b] hover:text-[#4d3930] rounded-full hover:bg-[#f5eee6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#f5eee6] flex items-center justify-center text-[#b98f73] border border-[#dac8ba]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 id="firebase-config-title" className="font-editorial text-2xl font-bold text-[#4d3930]">
              Cloudinary &amp; Firestore Setup
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs">
              <span className="text-[#806a5b]">Status:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  cloudinaryConfig.cloudName
                    ? 'bg-[#e5ece2] text-[#39734a]'
                    : 'bg-[#fff5eb] text-[#b98f73]'
                }`}
              >
                {cloudinaryConfig.cloudName ? 'Cloudinary Ready' : 'Cloudinary: Enter Cloud Name below'}
              </span>
            </div>
          </div>
        </div>

        {/* Cloudinary Section (No card required) */}
        <div className="bg-[#f0f6fa] p-5 rounded-2xl border border-[#cce1ee] space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-[#2b72a4]" />
              <h3 className="text-sm font-bold text-[#1f4a6b]">
                Cloudinary Free Photo Storage (No Credit Card Required)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#dbeaf5] text-[#1f4a6b] rounded">
              Active Photo Provider
            </span>
          </div>

          <p className="text-xs text-[#2b5a7e] leading-relaxed">
            Your pet photos will be stored directly in Cloudinary. Your API Key and Secret are configured. Enter your <strong>Cloud Name</strong> from your Cloudinary dashboard to finish:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="sm:col-span-1">
              <label className="block text-[#1f4a6b] font-bold mb-1">
                Cloud Name *
              </label>
              <input
                type="text"
                value={cloudinaryConfig.cloudName}
                onChange={(e) =>
                  setCloudinaryConfig({ ...cloudinaryConfig, cloudName: e.target.value.trim() })
                }
                placeholder="e.g. dxyz123"
                className="w-full px-3 py-2 bg-white border border-[#a8ccdf] rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#2b72a4] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#1f4a6b] font-bold mb-1">
                API Key
              </label>
              <input
                type="text"
                value={cloudinaryConfig.apiKey}
                onChange={(e) =>
                  setCloudinaryConfig({ ...cloudinaryConfig, apiKey: e.target.value.trim() })
                }
                className="w-full px-3 py-2 bg-white border border-[#a8ccdf] rounded-lg font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-[#1f4a6b] font-bold mb-1">
                API Secret
              </label>
              <input
                type="password"
                value={cloudinaryConfig.apiSecret}
                onChange={(e) =>
                  setCloudinaryConfig({ ...cloudinaryConfig, apiSecret: e.target.value.trim() })
                }
                className="w-full px-3 py-2 bg-white border border-[#a8ccdf] rounded-lg font-mono text-[11px]"
              />
            </div>
          </div>

          {!cloudinaryConfig.cloudName && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#b98f73] font-semibold mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Where to find Cloud Name: Look at the top of your Cloudinary Dashboard under "Cloud name".</span>
            </div>
          )}
        </div>

        {/* Firestore Database Rules (For Report Text & Details) */}
        <div className="bg-[#faf6f0] p-4 rounded-2xl border border-[#e7dbd0] text-xs text-[#614b3f] space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-[#4d3930]">
              <Shield className="w-4 h-4 text-[#81947c]" />
              <span>Firestore Rules (Free Tier Database - No Card Needed)</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(firestoreRulesCode)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#b98f73] hover:text-[#4d3930]"
            >
              {copiedFirestore ? <Check className="w-3.5 h-3.5 text-[#39734a]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFirestore ? 'Copied!' : 'Copy Rule'}</span>
            </button>
          </div>
          <p className="leading-relaxed text-[11px]">
            In Firebase Console &gt; <strong>Firestore Database &gt; Rules</strong>, paste this simple rule so anyone in Santa Cruz can submit reports:
          </p>
          <pre className="p-3 bg-[#2d2420] text-[#f2e5da] text-[11px] rounded-xl font-mono overflow-x-auto">
            {firestoreRulesCode}
          </pre>
        </div>

        {/* Custom Firebase Config Inputs */}
        <div className="border-t border-[#f2e5da] pt-4 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4d3930] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#b98f73]" />
              <span>Firebase Database Credentials</span>
            </h3>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-[#806a5b] hover:text-[#4d3930] underline"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#614b3f] font-semibold mb-1">API Key</label>
              <input
                type="text"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf6f0] border border-[#dac8ba] rounded-lg font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-[#614b3f] font-semibold mb-1">Project ID</label>
              <input
                type="text"
                value={config.projectId}
                onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf6f0] border border-[#dac8ba] rounded-lg font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Data Backup Option */}
        <div className="bg-[#f5eee6] p-4 rounded-2xl border border-[#e7dbd0] flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-[#4d3930] block">
              Backup &amp; Export Pet Reports
            </span>
            <span className="text-[11px] text-[#806a5b]">
              Export all community pet reports as a JSON backup file anytime.
            </span>
          </div>
          <button
            onClick={exportReportsAsJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#4d3930] bg-[#fffdf9] hover:bg-[#faf6f0] border border-[#dac8ba] rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#b98f73]" />
            <span>Export JSON</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f2e5da]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#614b3f] hover:text-[#4d3930]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl shadow-sm transition-all"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#81947c]" />
                <span>Configuration Saved!</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Save &amp; Connect</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
