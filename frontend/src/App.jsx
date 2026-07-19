import { useState } from 'react';
import BirthForm from './features/birthForm/BirthForm';
import ChartDisplay from './features/chart/ChartDisplay';
import ZodiacWheel from './features/chart/ZodiacWheel';
import Starfield from './features/animations/Starfield';
import AudioPlayer from './features/animations/AudioPlayer';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const [chartData, setChartData] = useState(null);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app-container">
      <AudioPlayer />
      <div className="aurora-container">
        <div className="aurora-blob cyan"></div>
        <div className="aurora-blob purple"></div>
        <div className="aurora-blob pink"></div>
        <div className="aurora-ribbon ribbon-1"></div>
        <div className="aurora-ribbon ribbon-2"></div>
      </div>
      <Starfield />
      <ZodiacWheel />
      <header className="lang-switcher">
        <button 
          onClick={() => handleLanguageChange('en')}
          className={i18n.language === 'en' ? 'active' : ''}
        >EN</button>
        <button 
          onClick={() => handleLanguageChange('vi')}
          className={i18n.language === 'vi' ? 'active' : ''}
        >VI</button>
      </header>
      <main>
        {!chartData ? (
          <BirthForm onChartReceived={setChartData} />
        ) : (
          <ChartDisplay chartData={chartData} onReset={() => setChartData(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
