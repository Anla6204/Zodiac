import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

const birthDataSchema = z.object({
  name: z.string().min(1, 'required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'invalid_date'),
  timeOfBirth: z.string().regex(/^\d{2}:\d{2}$/, 'invalid_time'),
  location: z.string().min(1, 'required')
});

const postBirthData = async (data) => {
  // Play Mystical Chime sound
  const chime = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  chime.volume = 0.5;
  chime.play().catch(e => console.log('Audio play failed:', e));

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const response = await fetch(`${API_URL}/api/birth-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function BirthForm({ onChartReceived }) {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(birthDataSchema)
  });

  const mutation = useMutation({
    mutationFn: postBirthData,
    onSuccess: (data) => {
      if (onChartReceived) onChartReceived(data.data);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="form-container glassmorphism">
      <h2>{t('form_title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-group floating full-width">
            <input id="name" {...register('name')} placeholder=" " />
            <label htmlFor="name">{t('name')}</label>
            {errors.name && <span className="error">{t(errors.name.message)}</span>}
          </div>
          
          <div className="form-group floating">
            <input id="dateOfBirth" {...register('dateOfBirth')} placeholder=" " />
            <label htmlFor="dateOfBirth">{t('date_of_birth')}</label>
            {errors.dateOfBirth && <span className="error">{t(errors.dateOfBirth.message)}</span>}
          </div>
          
          <div className="form-group floating">
            <input id="timeOfBirth" {...register('timeOfBirth')} placeholder=" " />
            <label htmlFor="timeOfBirth">{t('time_of_birth')}</label>
            {errors.timeOfBirth && <span className="error">{t(errors.timeOfBirth.message)}</span>}
          </div>
          
          <div className="form-group floating full-width">
            <input id="location" {...register('location')} placeholder=" " />
            <label htmlFor="location">{t('location')}</label>
            {errors.location && <span className="error">{t(errors.location.message)}</span>}
          </div>
          
          <button type="submit" disabled={mutation.isPending} className="glow-sweep full-width">
            {mutation.isPending ? '...' : t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
