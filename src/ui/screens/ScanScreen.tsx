// import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
// import {
//     StyleSheet,
//     View,
//     StatusBar,
//     Alert,
//     Platform,
//     TouchableOpacity,
//     Text,
//     ActivityIndicator,
//     Image,

// } from 'react-native';
// import { scanVisitor } from './apiCall';
// import Overlay from '../../components/Overlay';
// import { useIsFocused } from '@react-navigation/native';
// import { SCREEN_WIDTH, vw } from '../../utils/dimensions';
// import { showErrorToast, showSuccessToast } from '../../utils/toaster.service';
// import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
// import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';
// import KeepAwake from 'react-native-keep-awake';
// import Modal from 'react-native-modal';


// function ScanScreen(props: any) {
//     const focused = useIsFocused()
//     const scannerRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [isTorchOn, setIsTorchOn] = useState(false);
//     const [isScanning, setIsScanning] = useState(false);
//     const [selected, setSelected] = useState<"entry" | "exit">("entry");
//     const [hasCameraPermission, setHasCameraPermission] = useState(false);
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [modalTitle, setModalTitle] = useState("");
//     const [modalMessage, setModalMessage] = useState("");
//     const [modalColor, setModalColor] = useState("#000"); // Default color


//     const codeScanner = useCodeScanner({
//         codeTypes: ['qr', 'ean-13', 'code-128'],
//         onCodeScanned: (codes) => {
//             console.log(`Scanned ${codes.length} codes!`, codes);
//             onRead(codes);
//         }
//     })

//     useEffect(() => {
//         if (focused) {
//             checkCameraPermission();
//         }
//     }, [focused]);
//     const checkCameraPermission = async () => {
//         let cameraAcess =
//             Platform.OS === 'android'
//                 ? PERMISSIONS.ANDROID.CAMERA
//                 : PERMISSIONS.IOS.CAMERA;
//         check(cameraAcess)
//             .then((result: any) => {
//                 if (result === RESULTS.GRANTED) {
//                     setHasCameraPermission(true);
//                 } else {
//                     request(cameraAcess).then(res => {
//                         if (res === 'granted') {
//                             setHasCameraPermission(true);

//                         } else {
//                             Alert.alert('To access camera.', 'Please allow access to camera.', [
//                                 {
//                                     text: 'Cancel',
//                                     onPress: () => { },
//                                     style: 'destructive',
//                                 },
//                                 {
//                                     text: 'OK',
//                                     onPress: () =>
//                                         openSettings().catch(() =>
//                                             console.warn('cannot open settings'),
//                                         ),
//                                 },
//                             ]);
//                         }
//                     }).catch(error => {
//                         console.log('error of react-native-permissions', error);

//                     })
//                 }
//             })
//             .catch(error => {
//                 console.log(
//                     'error of react-native-image-picker, while opening camera : ',
//                     error,
//                 );
//             });
//     }


//     const onRead = useCallback((codes: Array<any>) => {
//         if (isScanning) return;
//         setIsScanning(true);

//         scanVisitor({
//             type: selected, barcode: codes[0].value
//         })
//             .then((data) => {
//                 if (data?.is_valid === true) {
//                     setModalTitle("Hurray!");
//                     setModalMessage(data?.message);
//                     setModalColor("#2ECC71"); // Green color for valid
//                 }
//                 else if (data?.is_valid === false && data?.message === "Invalid ticket number") {
//                     setModalTitle("Oops!");
//                     setModalMessage(data?.message);
//                     setModalColor("#E74C3C"); // Red color for invalid
//                 } else if (data?.is_valid === false && data?.message === "Ticket already used") {
//                     setModalTitle("Oops!");
//                     setModalMessage(data?.message);
//                     setModalColor("#F1C40F"); // Yellow color for already used
//                 } else {
//                     setModalTitle("Oh no!");
//                     setModalMessage(data?.message);
//                     setModalColor("#E74C3C"); // Green color for valid
//                 }

//                 setModalVisible(true);
//             })
//             .catch((error) => {
//                 setModalTitle("Error");
//                 setModalMessage(error.message);
//                 setModalColor("#E74C3C"); // Red for errors
//                 setModalVisible(true);
//             });
//     }, [isScanning, selected]);


//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             {focused && <StatusBar
//                 backgroundColor={'transparent'}
//                 translucent
//             />}
//             <Overlay />
//             <KeepAwake />
//             <QRScannerHolder
//                 hasCameraPermission={hasCameraPermission}
//                 onRead={onRead}
//                 isTorchOn={isTorchOn}
//                 scannerRef={scannerRef}
//                 codeScanner={codeScanner}

//             />
//             <View style={styles.btncontainer}>
//                 <TouchableOpacity
//                     style={[styles.button, selected === "entry" ? styles.active : styles.inactive]}
//                     onPress={() => {
//                         setSelected("entry")
//                     }}
//                     disabled={selected === "entry"}
//                 >
//                     <Text style={styles.text}>Scan Entry</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.button, selected === "exit" ? styles.activeExit : styles.inactive]}
//                     onPress={() => {
//                         setSelected("exit")
//                     }}
//                     disabled={selected === "exit"}
//                 >
//                     <Text style={styles.text}>Scan Exit</Text>
//                 </TouchableOpacity>
//             </View>
//             <Modal isVisible={isModalVisible}>
//                 <View style={[styles.modalContainer, { backgroundColor: 'beige' }]}>
//                     <Text style={styles.modalTitle}>{modalTitle}</Text>
//                     <Text style={styles.modalMessage}>{modalMessage}</Text>
//                     <TouchableOpacity
//                         style={[styles.okButton, { backgroundColor: modalColor }]}
//                         onPress={() => {
//                             setModalVisible(false);
//                             setIsScanning(false); // Resume scanning after pressing OK
//                         }}
//                     >
//                         <Text style={styles.okText}>OK</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//             {loading && (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size="large" color="#ffffff" />
//                 </View>
//             )}
//         </View>
//     );
// };

// const QRScannerHolder = memo((
//     { hasCameraPermission,
//         onRead,
//         isTorchOn,

//         scannerRef,
//         codeScanner }: any
// ) => {
//     // const device = useCameraDevices()[0];
//     const devices = useCameraDevices();
//     const device = devices.find(({ position }) => position === "back");
//     // const devices = useCameraDevices();
//     // const device = devices?.back;
//     // console.log("check camera devices ", devices, device);

//     return (<>

//         {(device && hasCameraPermission) ?
//             <Camera
//                 torch={isTorchOn ? 'on' : 'off'}
//                 // format={format}
//                 device={device}
//                 style={StyleSheet.absoluteFill}
//                 isActive={true}
//                 codeScanner={codeScanner} />
//             : <></>
//         }
//     </>);
// });


// const styles = StyleSheet.create({
//     contentContainer: {
//         paddingBottom: vw(80),
//     },

//     loadingContainer: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)'
//     },
//     cameraStyl: { height: '100%', width: SCREEN_WIDTH },
//     btncontainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 80,
//         position: 'absolute',
//         bottom: 0,
//         height: 200,
//         width: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         zIndex: 2
//     },
//     button: {
//         flex: 1,
//         padding: 15,
//         margin: 5,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     active: {
//         backgroundColor: "#4CAF50", // Green for active
//     },
//     activeExit: {
//         backgroundColor: "red", // Green for active
//     },
//     inactive: {
//         backgroundColor: "#D3D3D3", // Gray for inactive
//     },
//     text: {
//         color: "#FFF",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     touchText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginVertical: 10,

//     },
//     modalContainer: {
//         backgroundColor: "white",
//         padding: 20,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     modalMessage: {
//         fontSize: 16,
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     okButton: {
//         backgroundColor: "#4CAF50",
//         padding: 10,
//         borderRadius: 5,
//         width: "80%",
//         alignItems: "center",
//     },
//     okText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold",
//     },

// });

// export default React.memo(ScanScreen);



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
    Image,
    AppState,
    AppStateStatus,

} from 'react-native';
import { scanVisitor } from './apiCall';
import Overlay from '../../components/Overlay';
import { useIsFocused } from '@react-navigation/native';
import { SCREEN_WIDTH, vw } from '../../utils/dimensions';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';
import KeepAwake from 'react-native-keep-awake';
import Modal from 'react-native-modal';


function ScanScreen(props: any) {
    const focused = useIsFocused()
    const scannerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isTorchOn, setIsTorchOn] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [selected, setSelected] = useState<"entry" | "exit">("entry");
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalColor, setModalColor] = useState("#000"); // Default color
    const appState = useRef(AppState.currentState);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`, codes);
            onRead(codes);
        }
    })
    const [isCameraActive, setIsCameraActive] = useState(true);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/active/) &&
            nextAppState.match(/inactive|background/)
        ) {
            // App is going to background
            setIsCameraActive(false);
            console.log("App went to background, camera disabled.");
        }

        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // App is returning to foreground
            console.log("App is back active, resetting camera...");
            setTimeout(() => {
                setIsCameraActive(true);
            }, 500); // delay to allow system restore
        }

        appState.current = nextAppState;
    };


    useEffect(() => {
        if (focused) {
            setIsCameraActive(false);
            setTimeout(() => setIsCameraActive(true), 500); // Restart after a short delay
        }
    }, [focused]);


    useEffect(() => {
        if (focused) {
            checkCameraPermission();
        } else {
            setHasCameraPermission(false); // Reset permission to force reinitialization
        }
    }, [focused]);
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
        if (isScanning || !isCameraActive) return;
        setIsScanning(true);
        setLoading(true);

        scanVisitor({
            type: selected, barcode: codes[0].value
        })
            .then((data) => {
                if (data?.is_valid === true) {
                    setModalTitle("Hurray!");
                    setModalMessage(data?.message);
                    setModalColor("#2ECC71"); // Green color for valid
                }
                else if (data?.is_valid === false && data?.message.toLowerCase().indexOf("invalid") > -1) {
                    setModalTitle("Oops!");
                    setModalMessage(data?.message);
                    setModalColor("#E74C3C"); // Red color for invalid
                }
                else if (data?.is_valid === false && data?.message.toLowerCase().indexOf("already") > -1) {
                    setModalTitle("Oops!");
                    setModalMessage(data?.message);
                    setModalColor("#F1C40F"); // Yellow color for already used
                } else {
                    setModalTitle("Oh no!");
                    setModalMessage(data?.message);
                    setModalColor("#E74C3C"); // Green color for valid
                }

                setModalVisible(true);
            })
            .catch((error) => {
                setModalTitle("Error");
                setModalMessage(error.message);
                setModalColor("#E74C3C"); // Red for errors
                setModalVisible(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [isScanning, selected]);


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {focused && <StatusBar
                backgroundColor={'transparent'}
                translucent
            />}
            <KeepAwake />

            <Overlay />
            <QRScannerHolder
                hasCameraPermission={hasCameraPermission}
                onRead={onRead}
                isTorchOn={isTorchOn}
                scannerRef={scannerRef}
                codeScanner={codeScanner}
                isCameraActive={isCameraActive}

            />
            <View style={styles.btncontainer}>
                <TouchableOpacity
                    style={[styles.button, selected === "entry" ? styles.active : styles.inactive]}
                    onPress={() => {
                        setSelected("entry")
                    }}
                    disabled={selected === "entry"}
                >
                    <Text style={styles.text}>Scan Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selected === "exit" ? styles.activeExit : styles.inactive]}
                    onPress={() => {
                        setSelected("exit")
                        // onRead()
                    }}
                    disabled={selected === "exit"}
                >
                    <Text style={styles.text}>Scan Exit</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={[styles.modalContainer, { backgroundColor: 'beige' }]}>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                    <TouchableOpacity
                        style={[styles.okButton, { backgroundColor: modalColor }]}
                        onPress={() => {
                            setModalVisible(false);
                            // setLoading(false);
                            setIsScanning(false); // Resume scanning after pressing OK
                        }}
                    >
                        <Text style={styles.okText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
        </View>
    );
};



const QRScannerHolder = memo((
    {
        hasCameraPermission,
        onRead,
        isTorchOn,
        scannerRef,
        codeScanner,
        isCameraActive
    }: any
) => {
    const devices = useCameraDevices();
    // const device = devices.find(({ position }) => position['back']);
    // const { back: device } = useCameraDevices();
    const device = devices.find(({ position }) => position === 'back');


    return (
        <>
            {isCameraActive && device && hasCameraPermission ? (
                <Camera
                    torch={isTorchOn ? 'on' : 'off'}
                    device={device}
                    style={StyleSheet.absoluteFill}
                    isActive={true}
                    codeScanner={codeScanner}
                />
            ) : null}
        </>
    );
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

    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    okButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    okText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

});

export default React.memo(ScanScreen);




