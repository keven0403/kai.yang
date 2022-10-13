import styled from 'styled-components'
import ComHeader from '@/components/Header'
import ComMenu from '@/components/Menu'

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
	background-color: var(--child-06-color);
`

const App = () => {
	return (
		<AppContent>
			<ComHeader />

			<MainContent className='flex'>
				<ComMenu />

				<LayoutContent>

				</LayoutContent>
			</MainContent>
		</AppContent>
	)
}

export default App