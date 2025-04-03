import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

import { styles } from './Toast.styles';

type ToastType = 'success' | 'error' | 'info' | 'no_internet';
const enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  NO_INTERNET = 'no_internet',
}

export type ToasterLink = {
  label: string;
  route: string;
  onLinkPress: () => void;
};

type ToasterComponentProps = {
  // theme: Theme;
  type: ToastType;
  onPress: () => void;
  text?: string;
  title?: string;
  hasAutoLoggedOut: boolean;
  props?: any;
};

const getToastComponent: React.FC<ToasterComponentProps> = ({
  // theme,
  type,
  onPress,
  text,
  title,
  hasAutoLoggedOut,
  props,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case ToastTypes.SUCCESS:
        return ('green');
      case ToastTypes.ERROR:
      case ToastTypes.NO_INTERNET:
        return ('red');
      default:
        return ('#F5F5F5');
    }
  };

  // const getCloseIcon = () => {
  //   switch (type) {
  //     case ToastTypes.ERROR:
  //       return <CloseGrayIcon />;
  //     default:
  //       return null;
  //   }
  // };

  const handleLinkPress = () => {
    props.link?.onLinkPress();
    onPress();
  };

  // const getTosterIcon = () => {
  //   switch (type) {
  //     case ToastTypes.ERROR:
  //       case ToastTypes.NO_INTERNET:
  //       return <RedFilledCrossIcon />;
  //     case ToastTypes.SUCCESS:
  //       return <CheckCircleGreenIcon />;
  //     default:
  //       return null;
  //   }
  // };
  if (hasAutoLoggedOut) {
    return <></>;
  }
  return (
    <View style={styles.toastContainer}>
      <View
        style={[
          styles.messageContainer,
          styles.toastLine,
          { borderLeftColor: getBackgroundColor() },
        ]}>
        <View style={styles.messageContainer}>
          {/* <View style={styles.marginRight12}>{getTosterIcon()}</View> */}
          <View style={styles.flex1}>
            {title && <Text style={styles.title}>{title}</Text>}
            {/* <Text isSecondary style={styles.textStyle}>
              {text}
            </Text> */}
          </View>
        </View>
        {props.link && (
          <TouchableOpacity
            onPress={handleLinkPress}
            style={styles.linkContainer}>
            <Text style={styles.link}>{props.link.label}</Text>
          </TouchableOpacity>
        )}
        {/* {!props.link && (
          <Pressable onPress={onPress}>{getCloseIcon()}</Pressable>
        )} */}
      </View>
    </View>
  );
};

export const getToastConfig = (hasAutoLoggedOut: boolean) => {
  const toastConfig: ToastConfig = {
    errorToast: props =>
      getToastComponent({
        ...props,

        type: ToastTypes.ERROR,
        text: props.text1,
        title: props.text2,
        hasAutoLoggedOut,
      }),
    successToast: props =>
      getToastComponent({
        ...props,

        type: ToastTypes.SUCCESS,
        text: props.text1,
        title: props.text2,
        hasAutoLoggedOut,
      }),
    infoToast: props =>
      getToastComponent({
        ...props,

        type: ToastTypes.ERROR,
        text: props.text1,
        title: props.text2,
        hasAutoLoggedOut,
      }),
    internetToast: props =>
      getToastComponent({
        ...props,

        type: ToastTypes.NO_INTERNET,
        text: props.text1,
        title: props.text2,
        hasAutoLoggedOut,
      }),
    success: () => null,
  };
  return toastConfig;
};
