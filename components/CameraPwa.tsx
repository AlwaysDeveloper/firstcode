import React, { useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";
import WebView from "react-native-webview";
import { WebViewEvent } from "react-native-webview/lib/WebViewTypes";

export const CameraPwaApp = ({uri}: {uri: any}) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    const androidFlow = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Camera PWA Permission',
                message: 'Testing camera permission for PWA',
                buttonNegative: 'Nahi',
                buttonPositive: 'Haan',
            });
            return granted === PermissionsAndroid.RESULTS.GRANTED ? true : false;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    const requestCameraPermission = async (): Promise<boolean> => {
        try {
            const paltform = Platform.OS;
            switch (paltform) {
                case 'android': 
                    return androidFlow();
                default:
                    return false;
            } 
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    const handelWebViewMessage = (event: any) => {
        if(event.nativeEvent.data === 'startCamera'){
            requestCameraPermission()
            .then((result: boolean) => setHasPermission(result))
            .catch((error) => console.warn(error));
        }
    }

    return (
        <WebView
            source={{uri}}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserGesture={false}
            allowsInlineMediaPlayback={true}
            originWhitelist={['*']}
            onMessage={handelWebViewMessage}
        />
    )
}