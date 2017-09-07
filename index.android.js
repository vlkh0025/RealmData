
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './App';
import Route from './Angten';

export default class RealDemo extends Component {
  render() {
    return (
      <Route/>
    );
  }
}
AppRegistry.registerComponent('RealDemo', () => RealDemo);
