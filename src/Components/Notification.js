import { store } from 'react-notifications-component';

export function Notification(type, title, message) {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 4000,
      onScreen: true,
      timingFunction: 'ease-out',
    },
  });
}
