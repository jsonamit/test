import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user/userAction';
import { useNavigate } from 'react-router-dom';
import { ValidateEmail }  from '../../helpers/ValidationHelper';
import { apiRequest } from '../../services/Axios';
import './SignupPage.css';
import { showToast } from '../../helpers/NotifyHelper';

function SignupPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showForm,setShowForm] = useState(false);
    const [error,setErrors] = useState({});
    const [getFormData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const validateFormData = (formData) => {
        let errors = {};
        if(!formData.email) {
            errors.email = 'Email is required';
        }
        else if(!ValidateEmail(formData.email)) {
            errors.email = 'Email is invaild';
        } 
        else if(!formData.name) {
            errors.name = 'Name is required';
        }
        else if(!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setShowForm(true);
        }
        const { name, value } = e.target;
        setFormData({
            ...getFormData,
            [name]: value,
        });
    };

    const onSubmitSignup = async () => {
        let errors = validateFormData(getFormData);
        setErrors(errors);
        if(errors.length > 0) {
            return false;
        }
        let params = {
            ...getFormData
        }
        const response = await apiRequest('post','/user/signup',params);
        if(response.resp) {
            let user = {
                name: response.data.name,
                mobile: response.data.mobile,
                email: response.data.email,
                token: response.data.token
            }
            dispatch(setUser(user));
            navigate('/');
        } 
        else {
            showToast({
                type: 'error',
                msg: response.msg
            });
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10'>
                        <div className='d-flex justify-content-center mt-5' style={{columnGap:'33px'}}>
                            <div>
                                <img className="inline-block mr-2" height={'200px'} src="/images/logo-square.svg" alt='logo' />
                            </div>
                            <div>
                                <div className="d-flex flex-column">
                                    <div>
                                        <h2 className='intro-txt'>Introduce yourself</h2>
                                    </div>
                                    <div>
                                        <label className='font-size-24 font-weight-500'>Hi there! My name is</label>
                                        <div className="input mb-4">
                                            <input type="text" name="name" onChange={handleChange} className='form-control signup-input' />
                                            {
                                                error.name && <span className='error'>{error.name}</span>
                                            }
                                        </div>
                                    </div>
                                   {
                                    showForm && (
                                        <>
                                             <div>
                                                <label className='font-size-18 font-weight-500'>Here’s my email address:</label>
                                                <div className="input mb-4">
                                                    <input type="text" name="email" onChange={handleChange} className='form-control signup-input' />
                                                    {
                                                        error.email && <span className='error'>{error.email}</span>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className='font-size-18 font-weight-500'>And here’s my password:</label>
                                                <div className="input mb-4">
                                                    <input type="password" name="password" onChange={handleChange} className='form-control signup-input' />
                                                    {
                                                        error.password && <span className='error'>{error.password}</span>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                   }
                                    <div className='d-flex align-items-center' style={{columnGap:'14px'}}>
                                        <button className='btn orange-btn font-size-22' onClick={onSubmitSignup}>Sign me up!</button>
                                        <span style={{color:'#999'}}>or</span>
                                        <button className='btn signup-g-btn'><img className="inline-block mr-2" height={'18px'} src="/images/google.png" alt='google' />Sign up with Google</button>
                                    </div>
                                    <div className='mt-3'>
                                        <span className='terms pointer font-size-14'>By signing up, you accept the Splitwise Terms of Service.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        </>
    )
}

export default SignupPage