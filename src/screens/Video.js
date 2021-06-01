/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import {WebView} from 'react-native-webview';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export default class Video extends Component {
  static navigationOptions = ({navigation}) => ({
    header: navigation.state.params
      ? navigation.state.params.header
      : undefined,
  });

  constructor(props) {
    super(props);
    this.state = {
      header: null,
    };
  }

  componentDidMount() {
    this.setState(
      {header: this.props.navigation.state.params.header},
      this.updateHeader,
    );
    this.listner = Dimensions.addEventListener('change', () => {
      this.updateHeader();
    });
  }

  updateHeader = () => {
    if (isPortrait()) {
      this.props.navigation.setParams({
        header: this.state.header,
      });
    } else {
      this.props.navigation.setParams({
        header: null,
      });
    }
  };

  componentWillUnmount() {
    this.listner;
  }

  render() {
    const html = this.props.navigation.state?.params?.item?.url ?? '';

    const htmlText = `
    <html>
    <body>
      <div style="width: 100%; height: 100%; overflow: hidden;">
        ${html}
      </div>
      </div>
    </body>
    </html>`;

    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={!isPortrait()} />
        <WebView
          style={{flex: 1, backgroundColor: 'black'}}
          originWhitelist={['*']}
          source={{html: htmlText}}
          scalesPageToFit={true}
          bounces={false}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}
