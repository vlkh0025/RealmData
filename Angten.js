import React,{Component} from 'react';
import { StackNavigator } from 'react-navigation';
import App from './App';
import Detail from './Detail';

const Route = StackNavigator({
    App: {
      screen: App,
    },
    Detail: {
      screen: Detail,
    },
   
  });
export default Route;