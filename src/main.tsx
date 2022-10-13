import '@/utils/setFontSize'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css'
import '@/assets/css/index.less'
import App from './App'
import {HashRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/state'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
