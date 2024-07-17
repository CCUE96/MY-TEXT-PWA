// Select the install button element
const butInstall = document.getElementById("buttonInstall");

window.addEventListener('beforeinstallprompt', (event) => {
  
  window.deferredPrompt = event;

  butInstall.classList.remove('hidden');
});


butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }


  promptEvent.prompt();

 
  const userChoice = await promptEvent.userChoice;


  window.deferredPrompt = null;


  butInstall.classList.add('hidden');
});

window.addEventListener('appinstalled', (event) => {

  window.deferredPrompt = null;
});
