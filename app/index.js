/**
 * Created by zhangmz on 2017/9/16.
 */
import React from "react"
import {render} from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Root from './root'

render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById("root")
)