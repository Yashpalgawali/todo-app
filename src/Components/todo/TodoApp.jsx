 import { BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'; 
import './TodoApp.css';
import LogoutComponent from './LogoutComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import ListTodosComponent from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
// import FooterComponent from './FooterComponent';
import AuthProvider, { useAuth } from './Security/AuthContext';
import TodoComponent from './TodoComponent';


function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    }
    return <Navigate to="/" />
}

 export default function TodoApp() {
    return(
        <div className="TodoApp">
            
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={ <LoginComponent/> }></Route>
                    <Route path='/login' element={ <LoginComponent />}></Route>
                    <Route path='/welcome/:username' element={ 
                        <AuthenticatedRoute>
                            <WelcomeComponent />
                        </AuthenticatedRoute>}>
                    
                    </Route>
                    <Route path='/todos' element={
                        <AuthenticatedRoute> 
                            <ListTodosComponent />
                        </AuthenticatedRoute>
                    }></Route>
                    
                    <Route path='/todo/:id' element={
                        <AuthenticatedRoute> 
                            <TodoComponent />
                        </AuthenticatedRoute>
                    }></Route>
                    <Route path='/logout' element={
                        <AuthenticatedRoute>
                            <LogoutComponent />
                         </AuthenticatedRoute>
                        }>
                        
                    </Route>

                    <Route path='*' element={ <ErrorComponent /> }></Route>
                </Routes>
                {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
















