import Alert from 'react-s-alert';

export function infoAlert(message, config = {}) {
  Alert.info(message, config);
}

export function errorAlert(message, config = {}) {
  Alert.error(message, config);
}