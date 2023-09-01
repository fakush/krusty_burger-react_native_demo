import { LogBox } from "react-native";

if (__DEV__) {
    const ignoreWarns = [
        "ViewPropTypes will be removed",
        "Constants.platform.ios.model has been deprecated"
    ];

    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };

    // const error = console.error;
    // console.error = (...arg) => {
    //     for (const error of ignoreWarns) {
    //         if (arg[0].startsWith(warning)) {
    //             return;
    //         }
    //     }
    //     error(...arg);
    // }

    LogBox.ignoreLogs(ignoreWarns);
}