import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Platform, BackHandler, ToastAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://www.kings.credit/#/app',
      copyurl: '',

    }
  }
  componentDidMount() {
    setTimeout(()=>{SplashScreen.hide()}, 3000, )
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      // this.runAndroid()
    } 
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    console.log('刪除')
  }

  onNavigationStateChange = navState => {
    let urlstring = navState.url;
    if (urlstring.indexOf('wm') !== -1 || urlstring.indexOf('og') !== -1) {
      this.setState({ togame: 'ture' })

      setTimeout(() => {
        this.setState({ closebtn: 'flex' })
      }, 3000)


      return
    } else {
      this.setState({
        backButtonEnabled: navState.canGoBack,
        closebtn: 'none'
      });
    }

  };


  onBackAndroid = () => {
    //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      this.setState({
        url: this.state.copyurl + '#12'
      })
      this.WEBVIEW_REF.current.goBack();
      return true;
    } else {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出應用', ToastAndroid.SHORT);
      return true;
    }
  };

  render() {
    return (
      <WebView
        onNavigationStateChange={this.onNavigationStateChange}
        source={{ uri: this.state.url, headers: { 'Cache-Control': 'no-cache' } }}
        ref={this.WEBVIEW_REF} //綁定橋接引用
        bounces={false}
        useWebKit={true}
        textZoom={100}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        allowsFullscreenVideo={true}
      />
    );
  }
}

export default App;
