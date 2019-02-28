/**
 * Created by Kirk liu on 2018/7/3.
 */
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../models/index/store'
import Main from './Main'

const Index = () =>
    <Provider store={store}>
        <Main/>
    </Provider>
;
export default Index;