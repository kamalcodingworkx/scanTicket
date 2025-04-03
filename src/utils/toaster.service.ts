import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToasterLink} from '../components/Toast/Toast';

const TOAST_OFFSET = 50;

export const showSuccessToast = (
  message: string,
  title?: string,
  link?: ToasterLink,
) => {
  Toast.show({
    type: 'successToast',
    text1: title,
    text2: message,
    onPress: () => Toast.hide(),
    topOffset: TOAST_OFFSET,
    props: {
      link,
    },
  });
};

export const showErrorToast = (
  message: string,
  title?: string,
  link?: ToasterLink,
) => {
  Toast.show({
    type: 'errorToast',
    text1: title,
    text2: message,
    onPress: () => Toast.hide(),
    topOffset: TOAST_OFFSET,
    props: {
      link,
    },
  });
};

export const showInternetToast = (
  type: string,
  message: string,
  title?: string,
  Hide: boolean,
) => {
  Toast.show({
    type: type,
    text1: message,
    text2: title,
    topOffset: TOAST_OFFSET,
    autoHide: Hide,
  });
};

export const showInfoToast = (
  message: string,
  title?: string,
  link?: ToasterLink,
) => {
  Toast.show({
    type: 'infoToast',
    text1: message,
    text2: title,
    onPress: () => Toast.hide(),
    topOffset: TOAST_OFFSET,
    props: {
      link,
    },
  });
};
