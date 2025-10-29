import {Outlet} from 'react-router/internal/react-server-client';
import {Link} from 'react-router';
import './styles/App.scss'

function App() {


    return (
        <div className='users'>
            <nav className='nav'>
                <h1>DASHBOARD</h1>
                <Link className='nav__link' to={'/'}>Главная</Link>
                <Link className='nav__link' to={'people'}>Граждане</Link>
            </nav>
            <div className='detail'>
                <Outlet/>
            </div>

        </div>
    )
}

export default App
