// Creation can be done here: https://web-push-codelab.glitch.me/
const SERVER_KEY = "BFGfZLytZmhECcWaxRK3ExQL9f0utOO_num3iaRo8Ht60hfX-YNilgKhVcEV6tNAAGQv0oYNdyeagXZB1tYR_60";

// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => { 
      Notification.requestPermission((status) => {
        console.log('Notifcation permission status:', status);
      }).then(() => {
        const options = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(SERVER_KEY)
        }
        return registration.pushManager.subscribe(options);
      }).then((pushSubscription) => { })
      console.log('Service Worker Registered'); 
    });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA prompt');
      } else {
        console.log('User dismissed the PWA prompt');
      }
      deferredPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', (e) => {
  // Log install to analytics
  console.log('INSTALL: Success');
});
