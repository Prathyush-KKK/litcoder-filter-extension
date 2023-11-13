console.info('contentScript is running')



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FILTER_CARDS') {
      const selectedLanguages = message.selectedLanguages;
      let cardSpans;
  
      if (location.href.includes('/candidate/home')) {
        cardSpans = document.querySelectorAll<HTMLElement>("#kt_app_content_container > div.row.mt-8 > div.owl-carousel.owl-theme.mt-4.owl-loaded.owl-drag > div.owl-stage-outer > div > div > div > div > div > div.d-flex.flex-column.my-2.w-100 > span");
      } else if (location.href.includes('/candidate/contests')) {
        cardSpans = document.querySelectorAll<HTMLElement>("#kt_app_content_container > div > div > div.owl-stage-outer > div > div > div > div > div > div > div > span");
      } else if (location.href.includes('/candidate/labs')) {
        cardSpans = document.querySelectorAll<HTMLElement>("#kt_app_content_container > div > div > div.owl-carousel.owl-theme.mt-4.owl-loaded.owl-drag > div.owl-stage-outer > div > div > div > div > div > div.d-flex.flex-column.my-2.w-100 > span");
      } else {
        cardSpans = document.querySelectorAll<HTMLElement>("#default_selector_for_other_pages");
      }
  
      if (cardSpans) {
        cardSpans.forEach((span) => {
          const cardText = span.textContent?.trim().toLowerCase();
          const lastWord = cardText?.split(' ').pop();
  
          if (lastWord && selectedLanguages.includes(lastWord)) {
            const closestOwlItem = span.closest<HTMLElement>('div.owl-item');
            if (closestOwlItem) {
              closestOwlItem.style.display = 'block';
            }
          } else {
            const closestOwlItem = span.closest<HTMLElement>('div.owl-item');
            if (closestOwlItem) {
              closestOwlItem.style.display = 'none'; 
            }
          }
        });
      }
    }
  });
  


