

import React, { useState, useEffect } from 'react';
import './Popup.css'

export const Popup: React.FC = () => {
  const [languages, setLanguages] = useState<Record<string, boolean>>({
    python: false,
    php: false,
    java: false,
    csharp: false,
    "c++": false,
    javascript: false,
  });

  useEffect(() => {
    chrome.storage.sync.get(['languages'], (result) => {
      if (result.languages) {
        setLanguages(result.languages);
      }
    });
  }, []);

  const handleCheckboxChange = (language: string) => {
    const updatedLanguages = { ...languages, [language]: !languages[language] };
    setLanguages(updatedLanguages);
    chrome.storage.sync.set({ languages: updatedLanguages });
    sendFilterMessage(updatedLanguages);
  };

  const handleSelectAll = (selectAll: boolean) => {
    const updatedLanguages: Record<string, boolean> = {};
    Object.keys(languages).forEach((key) => {
      updatedLanguages[key] = selectAll;
    });
    setLanguages(updatedLanguages);
    chrome.storage.sync.set({ languages: updatedLanguages });
    sendFilterMessage(updatedLanguages);
  };

  const sendFilterMessage = (selectedLanguages: Record<string, boolean>) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, {
          type: 'FILTER_CARDS',
          selectedLanguages: Object.keys(selectedLanguages).filter((lang) => selectedLanguages[lang]),
        });
      }
    });
  };

  return (
    <div className='content'>
      <h2 className='heading'>litcoder filter 😲🔥</h2>
      {Object.keys(languages).map((language) => (
        <div key={language}>
          <label className='form-control' >
            <input
              id='checkbox'
              type="checkbox"
              name={language}
              checked={languages[language]}
              onChange={() => handleCheckboxChange(language)}
            />
            {language}
          </label>
        </div>
      ))}
      <label className='form-control' >
        <input
          id='checkbox'
          type="checkbox"
          checked={Object.values(languages).every((val) => val)}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        Select All
      </label>
      <a href="https://github.com/Prathyush-KKK/litcoder-filter-extension" target='_blank'>❤️‍🔥RaOG</a>
    </div>
  );
};
export default Popup;


