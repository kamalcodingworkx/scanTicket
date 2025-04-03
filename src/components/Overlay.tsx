import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const boxWidth = width * 0.8; // 80% of the screen width
const boxHeight = height / 3; // 1/3 of the screen height
const boxTopOffset = -30; // Move the box slightly up

const Overlay = () => {
    return (
        <View style={styles.overlay}>
            {/* Top Mask */}
            <View style={[styles.overlayPart, { height: (height - boxHeight) / 2 + boxTopOffset, width }]} />

            {/* Middle Section with Side Masks */}
            <View style={styles.middleContainer}>
                <View style={[styles.overlayPart, { width: (width - boxWidth) / 2, height: boxHeight }]} />
                <View style={[styles.transparentBox, { width: boxWidth, height: boxHeight }]} />
                <View style={[styles.overlayPart, { width: (width - boxWidth) / 2, height: boxHeight }]} />
            </View>

            {/* Bottom Mask */}
            <View style={[styles.overlayPart, { height: (height - boxHeight) / 2 - boxTopOffset, width }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    overlayPart: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },
    middleContainer: {
        flexDirection: 'row',
    },
    transparentBox: {
        // backgroundColor: 'black', // Trick to apply borderRadius properly
        borderRadius: 20,
    },
});

export default Overlay;
