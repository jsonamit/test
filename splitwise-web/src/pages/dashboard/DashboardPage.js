import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers//user/userAction';
import { useSelector,useDispatch } from 'react-redux';

const DashboardPage = () => {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(()=>{

    })

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigation('/login');
    }

    return (
    <div className='d-flex align-items-center flex-column'>
        Welcome To Dashboard &nbsp;<h4>{user.name}</h4>
        <br />
        <div>
            <h3 className='pointer' style={{color:'blue'}} onClick={logout}>Logout</h3>
        </div>
    </div>
    )
}

export default DashboardPage