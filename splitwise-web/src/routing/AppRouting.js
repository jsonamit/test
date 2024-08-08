import { BrowserRouter as Router, Route, Routes,Outlet,Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import SignupPage from '../pages/signup/SignupPage';
import HomePage from '../pages/home/HomePage';
import Header from '../components/header/HeaderComponent';
import Footer from '../components/footer/FooterComponent';
import DashboardPage from '../pages/dashboard/DashboardPage';
import { useSelector } from 'react-redux';
import NotFoundPage from '../pages/404/NotFoundPage';
import PublicRoute from './PublicRoute';

const AppRouting = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoute element={<HomePage />} />} />
                <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
                <Route path="*" element={<NotFoundPage />} />
            
                { 
                    isAuthenticated ? (
                        <Route element={<Layout />}>
                            <Route path="/dash" element={<DashboardPage />} />
                        </Route>
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )
                }
            </Routes>
        </Router>
    );
}

const Layout = () => {
    return (
      <div>
        <Header />
            <Outlet />
        <Footer />
      </div>
    );
  };

export default AppRouting;