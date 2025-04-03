import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    backgroundColor: 'beige',
    // borderWidth: 1,
    padding: 12,
    // borderRadius: spacings.radiusSm,
    // borderColor: Color.WHITE,
    // shadowColor: Color.LINEARGRADIANT,
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  marginRight12: {
    marginRight: 12,
  },
  flex1: {
    flex: 1,
  },
  textStyle: {
    flex: 1,
    flexWrap: 'wrap',
    width: '95%',
    color: 'white',
  },
  title: {
    fontSize: 16,
  },
  linkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
  },
  toastLine: {
    borderLeftWidth: 3,
    marginRight: 12,
    paddingLeft: 10,
  },
});
