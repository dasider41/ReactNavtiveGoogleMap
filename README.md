# RNGmap

Personal RN project with [react-native-maps](https://github.com/airbnb/react-native-maps) and [New Zealand Education Counts](educationcounts.govt.nz) for Android. The project is on going.

### Installation
See [Inatlation instruction from react-native-maps](https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md)
and please update **google API key** for map, `./android/app/src/main/AndroidManifest.xml`.

### Dev
```sh
$ react-native run-android
```

### Build (Generating the release APK)
```sh
$ cd android && ./gradlew assembleRelease
```
The generated APK can be found under `./android/app/build/outputs/apk/app-release.apk`, and is ready to be distributed.

#### TODO

* ~~Init with react-native-maps~~
* create API
* Add react-router and show details
* UI design and slide menu
* ios version (when I buy a Mac.)
