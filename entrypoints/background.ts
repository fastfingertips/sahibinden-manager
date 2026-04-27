export default defineBackground(() => {
  console.log('Sahibinden Manager Background: Aktif');

  browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'DOWNLOAD_IMAGE' && message.url) {
      browser.downloads.download({
        url: message.url,
        filename: message.filename || `sahibinden_${Date.now()}.jpg`,
        saveAs: false,
      });
    }
  });
});
