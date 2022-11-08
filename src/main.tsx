import '@/utils/setFontSize'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css'
import '@/assets/css/index.less'
import App from './App'
import {HashRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/state'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"

const getLibrary = (provider: any) => {
	const library: any = new Web3Provider(provider)
	library.pollingInterval = 12000
	console.log({
		library
	})
	return library
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Web3ReactProvider>
  
)
