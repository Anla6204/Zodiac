import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// OS Emojis removed to conform with premium design guidelines

export default function ChartDisplay({ chartData, onReset }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!chartData || !chartData.chart) {
    return null;
  }

  const { chart } = chartData;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(shareToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="chart-display glassmorphism pulse-glow">
      <div className="zodiac-seal-wrapper stagger-1">
        <svg className="zodiac-seal" viewBox="0 0 200 200">
          <defs>
            <path
              id="seal-path"
              d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
            />
          </defs>
          <g className="seal-spin">
            <text className="seal-text" fill="var(--glow-gold)">
              <textPath href="#seal-path" startOffset="0%">
                ✦ ASTROLOGICAL PROFILE ✦ SUN SIGN ✦
              </textPath>
            </text>
          </g>
          <text x="100" y="105" textAnchor="middle" className="seal-center-text" fill="#fff">
            {chart.sunSign}
          </text>
        </svg>
      </div>
      
      <h3 className="stagger-1">{t('chart_success_title')}</h3>
      <p className="stagger-1">{t('chart_success_desc')}</p>
      
      <div className="advice-container stagger-2">
        <h4>{t('daily_advice')} - {chart.sunSign}</h4>
        
        <div className="editorial-timeline">
          {/* Section 1: Career */}
          <div className="timeline-row stagger-2">
            <div className="timeline-title">
              <h5 className="editorial-heading">{t('category_career')}</h5>
            </div>
            <div className="timeline-content">
              <p className="editorial-text">{t(chart.dailyAdvice.career)}</p>
            </div>
          </div>
          
          {/* Section 2: Love */}
          <div className="timeline-row stagger-2">
            <div className="timeline-title">
              <h5 className="editorial-heading">{t('category_love')}</h5>
            </div>
            <div className="timeline-content">
              <p className="editorial-text">{t(chart.dailyAdvice.love)}</p>
            </div>
          </div>

          {/* Section 3: Family */}
          <div className="timeline-row stagger-3">
            <div className="timeline-title">
              <h5 className="editorial-heading">{t('category_family')}</h5>
            </div>
            <div className="timeline-content">
              <p className="editorial-text">{t(chart.dailyAdvice.family)}</p>
            </div>
          </div>
          
          {/* Section 4: Growth */}
          <div className="timeline-row stagger-3">
            <div className="timeline-title">
              <h5 className="editorial-heading">{t('category_growth')}</h5>
            </div>
            <div className="timeline-content">
              <p className="editorial-text">{t(chart.dailyAdvice.growth)}</p>
            </div>
          </div>
        </div>

        <div className="lucky-elements">
          <div className="lucky-item">
            <span className="label">{t('lucky_color')}</span>
            <span className="value">{t(chart.dailyAdvice.luckyColor.toLowerCase().replace(' ', '_')) || chart.dailyAdvice.luckyColor}</span>
          </div>
          <div className="lucky-item">
            <span className="label">{t('lucky_number')}</span>
            <span className="value pulse-glow">{chart.dailyAdvice.luckyNumber}</span>
          </div>
        </div>

        <div className="dos-donts-grid">
          <div className="action-box do-box">
            <h5>{t('what_to_do')}</h5>
            <p>{t(chart.dailyAdvice.do)}</p>
          </div>
          <div className="action-box dont-box">
            <h5>{t('what_not_to_do')}</h5>
            <p>{t(chart.dailyAdvice.dont)}</p>
          </div>
        </div>

        <button className="primary-action-btn glow-sweep" onClick={onReset}>
          {t('calculate_another')}
        </button>
      </div>
    </div>
  );
}
