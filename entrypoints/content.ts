export default defineContentScript({
  matches: ['*://www.sahibinden.com/*'],
  main() {
    console.log('Sahibinden Manager loaded.');
  },
});
