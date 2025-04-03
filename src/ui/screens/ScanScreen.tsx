import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Alert,
    Platform,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Image

} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { SCREEN_WIDTH, vw } from '../../utils/dimensions';
import { scanVisitor } from './apiCall';
import { showErrorToast, showSuccessToast } from '../../utils/toaster.service';
import { scanIcon } from '../../assets/images';
import Overlay from '../../components/Overlay';


function ScanScreen(props: any) {
    const scannerRef = useRef(null);
    const focused = useIsFocused()
    const [loading, setLoading] = useState(false);
    const [isTorchOn, setIsTorchOn] = useState(false);
    const [selected, setSelected] = useState<"entry" | "exit">("entry");
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [barCodesRead, setBarCodesRead] = useState([]);


    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`, codes, barCodesRead);
            onRead(codes);
        }
    })


    useEffect(() => {
        checkCameraPermission()
    }, [])

    const checkCameraPermission = async () => {
        let cameraAcess =
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.CAMERA
                : PERMISSIONS.IOS.CAMERA;
        check(cameraAcess)
            .then((result: any) => {
                if (result === RESULTS.GRANTED) {
                    setHasCameraPermission(true);
                } else {
                    request(cameraAcess).then(res => {
                        if (res === 'granted') {
                            setHasCameraPermission(true);

                        } else {
                            Alert.alert('To access camera.', 'Please allow access to camera.', [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                    style: 'destructive',
                                },
                                {
                                    text: 'OK',
                                    onPress: () =>
                                        openSettings().catch(() =>
                                            console.warn('cannot open settings'),
                                        ),
                                },
                            ]);
                        }
                    }).catch(error => {
                        console.log('error of react-native-permissions', error);

                    })
                }
            })
            .catch(error => {
                console.log(
                    'error of react-native-image-picker, while opening camera : ',
                    error,
                );
            });
    }




    const onRead = useCallback((codes: Array<any>) => {
        // console.log('WWW', codes[0].value);
        // scanVisitor({ type: selected, barcode: '010412939' })
        scanVisitor({ type: selected, barcode: codes[0].value })
            .then((data) => {
                if (data?.is_valid == false) {
                    showErrorToast(data?.message)
                }
                else {
                    showSuccessToast(data?.message)
                }
            })
            .catch((error) => {
                showErrorToast(error.message)
            });
    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <KeepAwake /> */}
            {focused && <StatusBar
                backgroundColor={'transparent'}
                translucent
            />}
            <Overlay />
            {/* <Image source={scanIcon} style={{ height: 500, width: SCREEN_WIDTH, alignSelf: 'center', marginTop: 100 }} /> */}
            <QRScannerHolder
                hasCameraPermission={hasCameraPermission}
                onRead={onRead}
                isTorchOn={isTorchOn}
                scannerRef={scannerRef}
                codeScanner={codeScanner}

            />
            <View style={styles.btncontainer}>
                <TouchableOpacity
                    style={[styles.button, selected === "entry" ? styles.active : styles.inactive]}
                    onPress={() => setSelected("entry")}
                    // onPress={() => onRead()}
                    disabled={selected === "entry"}
                >
                    <Text style={styles.text}>Scan Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selected === "exit" ? styles.activeExit : styles.inactive]}
                    onPress={() => setSelected("exit")}
                    disabled={selected === "exit"}
                >
                    <Text style={styles.text}>Scan Exit</Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
        </View>
    );
};

const QRScannerHolder = memo((
    { hasCameraPermission,
        onRead,
        isTorchOn,

        scannerRef,
        codeScanner }: any
) => {
    // const device = useCameraDevices()[0];
    const devices = useCameraDevices();
    const device = devices.find(({ position }) => position === "back");
    // console.log("check camera devices ", devices, device);

    return (<>

        {(hasCameraPermission) ?
            <Camera
                torch={isTorchOn ? 'on' : 'off'}
                // format={format}
                device={device}
                style={StyleSheet.absoluteFill}
                isActive={true}
                codeScanner={codeScanner} />
            : <></>
        }
    </>);
});


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: vw(80),
    },

    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    cameraStyl: { height: '100%', width: SCREEN_WIDTH },
    btncontainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
        position: 'absolute',
        bottom: 0,
        height: 200,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2
    },
    button: {
        flex: 1,
        padding: 15,
        margin: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    active: {
        backgroundColor: "#4CAF50", // Green for active
    },
    activeExit: {
        backgroundColor: "red", // Green for active
    },
    inactive: {
        backgroundColor: "#D3D3D3", // Gray for inactive
    },
    text: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    touchText: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,

    }

});

export default React.memo(ScanScreen);



