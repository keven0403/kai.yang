import styled from 'styled-components'
import { IntlProvider } from 'react-intl'
import { useAppSelector } from '@/state/hooks'
import { Navigate, Route, Routes } from 'react-router-dom'
import ComGlobleLoading from '@/components/Loading/globleLoading'
import ComHeader from '@/components/Header'
import ComMenu from '@/components/Menu'
import Home from '@/pages/home'
import Pricing from '@/pages/pricing'
import PageForce from '@/pages/d3/force'
import PageTree from '@/pages/d3/tree'
import PageWallet from '@/pages/web3/walletConnect'

const AppContent = styled.div`
	background-color: var(--child-05-color);
	min-height: 100vh;
`

const MainContent = styled.div`
	min-height: 100vh;
	padding-top: 60rem;
`

const LayoutContent = styled.div`
	flex: 1;
	overflow-y: auto;
	background-color: var(--child-05-color);
`

const App = () => {
	const locale = useAppSelector((state) => state.locale.localeState)

	return (
		<IntlProvider locale="en" messages={locale} defaultLocale="en">
			<AppContent>
				<ComHeader />

				<MainContent className='flex'>
					<ComMenu />

					<LayoutContent>
						<Routes>
							<Route path="/" element={<Navigate to="/title1" replace />} />
							<Route path='/title1' element={<Home />}/>
							<Route path='/title2-1' element={<Pricing />}/>
							<Route path='/force' element={<PageForce />}/>
							<Route path='/tree' element={<PageTree />}/> 
							<Route path='/wallet' element={<PageWallet />}/>
						</Routes>
					</LayoutContent>

					<ComGlobleLoading />
				</MainContent>
			</AppContent>
		</IntlProvider>
	)
}

export default App