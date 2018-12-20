import listElementsData from './list-elements-data';
import ListElement from './list-element';
import { getCutText } from './utils';

const attachList = data => {
  let characterListHTML = '';
  const length = data.length;

  for (let i = 0; i < length; i++) {
    characterListHTML += ListElement(data[i]);
  }

  document.getElementById('characters-list').innerHTML = characterListHTML;
}

attachList(listElementsData);

const characterElements = document.getElementsByClassName('character-element-container');

for (let i = 0; i < characterElements.length; i++) {
  characterElements[i].addEventListener('click', listElementsData[i].openModal)
}

getCutText();

document.getElementById('kitty-picture').addEventListener('click', () => {
  fetch(`${window.location.origin}/kitten.4431d989.jpeg`)
    .then((data) => {
      document.getElementById('kitty-picture-container').innerHTML = `<img src=${data.url} alt="kitty" />`;
    })
    .catch(() => {
      console.log('failed to fetch kitty...')
    })
})

const applicationServerPublicKey = 'BJgRttpCBYWBwJw89Xmaq-6-fLYzdjHGLc-3R7muJYfopOXabBxq2Uxss2bdOT03GTJF9FHjEuHHxbDGwH6z-l8';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendMessageToSw (msg) {
  return new Promise(function(resolve, reject){
    // Create a Message Channel
    const messageChannel = new MessageChannel();

    // Handler for receiving message reply from service worker
    messageChannel.port1.onmessage = event => {
      if (event.data.error){
        reject(event.data.error);
      } else{
        resolve(event.data);
      }
    };

    // Send message to service worker along with port for reply
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg, [messageChannel.port2]);
    }
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();

    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js')
    .then(sw => {
      swRegistration = sw;
      initializeUI();

      sendMessageToSw('test msg').then(data => {
        console.log('back after 1000000000 iterations: ', data)
      })
    })
    .catch(err => {
      console.log('error!', err)
    })
});

navigator.serviceWorker.ready.then(function(swRegistration) {
  return swRegistration.sync.register('someTestSync');
});
