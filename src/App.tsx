import styled from 'styled-components'
import { Navigate, Route, Routes } from 'react-router-dom'
import ComGlobleLoading from '@/components/Loading/globleLoading'
import ComHeader from '@/components/Header'
import ComMenu from '@/components/Menu'
import Home from '@/pages/home'
import Pricing from '@/pages/pricing'
import Profile from '@/pages/profile'

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
	background-color: var(--child-06-color);
`

const App = () => {
	return (
		<AppContent>
			<ComHeader />

			<MainContent className='flex'>
				<ComMenu />

				<LayoutContent>
					<Routes>
						<Route path="/" element={<Navigate to="/title1" replace />} />
						<Route path='/title1' element={<Home />}/>
						<Route path='/title2-1' element={<Pricing />}/>
						<Route path='/title3' element={<Profile />}/>
					</Routes>
				</LayoutContent>

				<ComGlobleLoading />
			</MainContent>
		</AppContent>
	)
}

export default App