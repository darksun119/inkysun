import ReactDOM from 'react-dom';
import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import 'nprogress/nprogress.css';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import userStore from '@mobx';
import test from '@mobx/tests';
const stores = {
    userStore, test
};

configure({'enforceActions': 'always'});

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
            <router></router>
        </Provider>
    </LocaleProvider>,
    document.getElementById('root')
);
