import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './styles/null.css'
import './styles/global.css'
import {createBrowserRouter} from 'react-router';
import {RouterProvider} from 'react-router/dom';
import {StrictMode} from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Card from './pages/Card/Card';
import People from './pages/People/People';
import people from './data/people';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                index:true,
                element:<Dashboard people={people}/>,
            },
            {
                path:'card/:id',
                element:<Card/>,
            },
            {
                path:'people',
                element:<People/>,
            },
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>

)
