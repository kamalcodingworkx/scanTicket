import React from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { vh, vw } from '../../utils/dimensions';
import { Logo } from '../../assets/images';


const Splash = () => {
    // navigation state
    const navigation = useNavigation();

    // animation related variables
    const imageScale = new Animated.Value(0.5); // for transforming the image from small to large
    const imagePosition = new Animated.Value(270); // for moving the image vertically up or down depending upon the value

    Animated.parallel([
        Animated.timing(imageScale, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }),
    ]).start(() => {
        navigation.dispatch(
            CommonActions.reset({ index: 1, routes: [{ name: 'ScanScreen' }] })
        );
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>

            <Animated.Image
                source={Logo}
                style={[
                    styles.image,
                    {
                        transform: [{ scale: imageScale }, { translateY: imagePosition }],
                    },
                ]}
                resizeMethod="auto"
                resizeMode="contain"
            />

        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    // main splash container view
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: vw(32),
        backgroundColor: 'white',
    },

    // splash text image style
    image: {
        width: '100%',

        height: vh(186),
    },
});
