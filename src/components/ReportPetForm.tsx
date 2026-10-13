import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, Image as ImageIcon, Camera } from 'lucide-react';
import { PetReport, PetStatus, PetSpecies } from '../types.ts';
import { SANTA_CRUZ_AREAS } from '../data/seedData.ts';
import { compressImage } from '../services/imageCompressor.ts';
import { savePetReport } from '../services/firebase.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface ReportPetFormProps {
  onSuccess: (newReport: PetReport) => void;
  onCancel?: () => void;
}

export const ReportPetForm: React.FC<ReportPetFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<PetStatus>('lost');
  const [petName, setPetName] = useState('');
  const [type, setType] = useState<PetSpecies>('dog');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [distinctiveFeatures, setDistinctiveFeatures] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState(SANTA_CRUZ_AREAS[0]);
  const [lastSeenDate, setLastSeenDate] = useState(new Date().toISOString().slice(0, 10));
  const [reward, setReward] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactWhatsapp, setContactWhatsapp] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [consent, setConsent] = useState(false);

  // Photo state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const { file: compressed, dataUrl } = await compressImage(file, 1200, 0.85);
      setImageFile(compressed);
      setPhotoPreview(dataUrl);
    } catch (err) {
      console.error('Error compressing image:', err);
      // Fallback to direct read
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target?.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const selectSamplePhoto = (url: string) => {
    setPhotoPreview(url);
    setImageFile(null); // URL based
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setFeedback({ type: 'error', message: t.formErrorConsent });
      return;
    }

    if (!photoPreview) {
      setFeedback({ type: 'error', message: t.formErrorPhoto });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const cleanWhatsapp = contactWhatsapp.replace(/\D/g, '') || contactPhone.replace(/\D/g, '');

      // Approximate coordinates based on Santa Cruz area
      let coords = { lat: -17.7833, lng: -63.1821 };
      if (area === 'Equipetrol') coords = { lat: -17.7651, lng: -63.1932 };
      else if (area.includes('Centro')) coords = { lat: -17.7882, lng: -63.1812 };
      else if (area === 'Las Palmas') coords = { lat: -17.8015, lng: -63.2052 };
      else if (area === 'Urbaró') coords = { lat: -17.7792, lng: -63.2124 };
      else if (area === 'Sirari') coords = { lat: -17.7610, lng: -63.1890 };
      else if (area.includes('Villa 1')) coords = { lat: -17.7885, lng: -63.1412 };
      else if (area.includes('Plan 3000')) coords = { lat: -17.8225, lng: -63.1450 };

      const result = await savePetReport(
        {
          petName: petName.trim() || (status === 'lost' ? 'Mascota Perdida' : 'Sin Nombre'),
          status,
          type,
          breed: breed.trim(),
          color: color.trim(),
          distinctiveFeatures: distinctiveFeatures.trim(),
          location: location.trim(),
          area,
          coordinates: coords,
          lastSeenDate,
          photoUrl: photoPreview,
          contactName: contactName.trim(),
          contactPhone: contactPhone.trim(),
          contactWhatsapp: cleanWhatsapp,
          contactNotes: contactNotes.trim(),
          reward: reward.trim(),
          active: true,
          resolved: false
        },
        imageFile || undefined,
        photoPreview
      );

      setFeedback({
        type: 'success',
        message: result.source === 'cloud' ? t.formSuccessCloud : t.formSuccessLocal
      });

      // Notify parent
      onSuccess(result.report);

      // Reset form after short delay
      setTimeout(() => {
        setPetName('');
        setBreed('');
        setColor('');
        setDistinctiveFeatures('');
        setLocation('');
        setPhotoPreview('');
        setImageFile(null);
        setContactName('');
        setContactPhone('');
        setContactWhatsapp('');
        setContactNotes('');
        setReward('');
        setConsent(false);
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      setFeedback({
        type: 'error',
        message: 'Could not submit report. Please review your details and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="report-form" className="py-16 bg-[#f5eee6] border-b border-[#e7dbd0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
            {t.formLabel}
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            {t.formTitle}
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            {t.formSubtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#fffdf9] p-6 sm:p-10 rounded-3xl border border-[#e7dbd0] shadow-md space-y-8"
        >
          {/* Status Choice */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#806a5b] block mb-2.5">
              {t.formStep1}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus('lost')}
                className={`py-3.5 px-4 rounded-xl border text-sm font-bold transition-all text-center ${
                  status === 'lost'
                    ? 'bg-[#b98f73] text-[#fffdf9] border-[#b98f73] shadow-xs'
                    : 'bg-[#faf6f0] text-[#614b3f] border-[#dac8ba] hover:bg-[#f2e5da]'
                }`}
              >
                {t.formLostPet}
              </button>
              <button
                type="button"
                onClick={() => setStatus('found')}
                className={`py-3.5 px-4 rounded-xl border text-sm font-bold transition-all text-center ${
                  status === 'found'
                    ? 'bg-[#81947c] text-[#fffdf9] border-[#81947c] shadow-xs'
                    : 'bg-[#faf6f0] text-[#614b3f] border-[#dac8ba] hover:bg-[#f2e5da]'
                }`}
              >
                {t.formFoundPet}
              </button>
            </div>
          </div>

          {/* Pet Basic Information */}
          <div className="space-y-4 pt-4 border-t border-[#f2e5da]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#806a5b]">
              {t.formStep2}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formPetName} {status === 'found' ? '(opcional)' : '*'}
                </label>
                <input
                  type="text"
                  required={status === 'lost'}
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder={status === 'lost' ? t.formPetNamePlaceholderLost : t.formPetNamePlaceholderFound}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formSpecies}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PetSpecies)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                >
                  <option value="dog">{t.dogs}</option>
                  <option value="cat">{t.cats}</option>
                  <option value="bird">Ave / Bird</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formBreed}
                </label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder={t.formBreedPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formColor}
                </label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder={t.formColorPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                {t.formDistinctiveFeatures}
              </label>
              <textarea
                required
                rows={3}
                value={distinctiveFeatures}
                onChange={(e) => setDistinctiveFeatures(e.target.value)}
                placeholder={t.formDistinctivePlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
              />
            </div>

            {status === 'lost' && (
              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formReward}
                </label>
                <input
                  type="text"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder={t.formRewardPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Location & Neighborhood in Santa Cruz */}
          <div className="space-y-4 pt-4 border-t border-[#f2e5da]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#806a5b]">
              {t.formStep3}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formNeighborhood}
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                >
                  {SANTA_CRUZ_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formDate}
                </label>
                <input
                  type="date"
                  required
                  value={lastSeenDate}
                  onChange={(e) => setLastSeenDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                {t.formLocation}
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.formLocationPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
              />
              <span className="text-[11px] text-[#806a5b] block mt-1">
                {t.formLocationTip}
              </span>
            </div>
          </div>

          {/* Photo Upload Pipeline */}
          <div className="space-y-4 pt-4 border-t border-[#f2e5da]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#806a5b]">
              {t.formStep4}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Upload Dropzone */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#dac8ba] hover:border-[#b98f73] rounded-2xl p-6 text-center bg-[#faf6f0] cursor-pointer transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#f2e5da] group-hover:bg-[#ead8c8] text-[#4d3930] mx-auto flex items-center justify-center mb-3 transition-colors">
                    <Camera className="w-6 h-6 text-[#b98f73]" />
                  </div>
                  <span className="text-xs font-bold text-[#4d3930] block">
                    {t.formUploadFromDevice}
                  </span>
                  <span className="text-[11px] text-[#806a5b] block mt-1">
                    {t.formAutoCompressed}
                  </span>
                  {isCompressing && (
                    <span className="text-xs text-[#b98f73] font-semibold block mt-2">
                      {t.formOptimizingPhoto}
                    </span>
                  )}
                </div>

                {/* Quick sample photo selector for testing */}
                <div className="mt-3">
                  <span className="text-[11px] text-[#806a5b] block mb-1.5">
                    {t.formSampleTestPhoto}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        selectSamplePhoto(
                          'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="text-[10px] px-2 py-1 bg-[#f5eee6] hover:bg-[#ead8c8] border border-[#dac8ba] rounded-md font-medium text-[#614b3f]"
                    >
                      {t.formDogSample}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectSamplePhoto(
                          'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="text-[10px] px-2 py-1 bg-[#f5eee6] hover:bg-[#ead8c8] border border-[#dac8ba] rounded-md font-medium text-[#614b3f]"
                    >
                      {t.formCatSample}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview Frame */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#faf6f0] border border-[#dac8ba] overflow-hidden flex items-center justify-center relative">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-[#9b8778]">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <span className="text-xs">{t.formNoPhotoSelected}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t border-[#f2e5da]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#806a5b]">
              {t.formStep5}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formYourName}
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ej. Mariana Suarez"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formPhone}
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="ej. +591 76012345"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formWhatsapp}
                </label>
                <input
                  type="tel"
                  value={contactWhatsapp}
                  onChange={(e) => setContactWhatsapp(e.target.value)}
                  placeholder={t.formWhatsappPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d3930] mb-1">
                  {t.formMeetingNotes}
                </label>
                <input
                  type="text"
                  value={contactNotes}
                  onChange={(e) => setContactNotes(e.target.value)}
                  placeholder={t.formMeetingNotesPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] focus:ring-2 focus:ring-[#b98f73]/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Consent checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#dac8ba] text-[#4d3930] focus:ring-[#b98f73]"
                />
                <span className="text-xs text-[#614b3f] leading-relaxed">
                  {t.formConsent}
                </span>
              </label>
            </div>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed ${
                feedback.type === 'success'
                  ? 'bg-[#e5ece2] text-[#39734a] border border-[#81947c]/30'
                  : feedback.type === 'warning'
                  ? 'bg-[#fff5eb] text-[#b98f73] border border-[#b98f73]/30'
                  : 'bg-[#fbeeed] text-[#a33a32] border border-[#a33a32]/30'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#614b3f] hover:text-[#4d3930] rounded-xl transition-colors"
              >
                {t.formCancel}
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Upload className="w-4 h-4 animate-bounce" />
                  <span>{t.formSubmitting}</span>
                </>
              ) : (
                <span>{t.formSubmitButton}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
