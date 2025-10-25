import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/home/Home'
import CustomRotatingText from '../components/customerotatingtext/CustomRotatingText'
import About from '../components/about/About'
import Projects from '../components/projects/Projects'
import Contact from '../components/contact/Contact'

const router = createBrowserRouter([
    {
        path : '/',
        element : <Home/>,
        children : [
            {
                path : '',
                element : <CustomRotatingText/>
            },
            {
                path : 'about',
                element : <About/>
            },
            {
                path : 'projects',
                element : <Projects/>
            },
            {
                path : 'contact',
                element : <Contact/>
            }
        ]
    }
]);

export default router;