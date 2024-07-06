// src/components/auth/Login.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../api calls/ConnectApiData';
import './Login.scss';
import { toast } from "react-toastify";
import { LinearProgress } from "@mui/material";
import Loadingboard from './../../assets/loadingboard.svg';
import GrowshootLogo from './../../assets/growshoot_logo-icon.svg';
import userLogo from './../../assets/username.svg';
import passwordLogo from './../../assets/password.svg';
import { AppContext } from '../AppContext';

const Login = (props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { sharedState, setSharedState } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: null, password: null });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setIsAdmin(props.isAdmin === true);
  }, [props.isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.status === '0') {
        toast.success("Login successful");
        setSharedState(response.folders.folder[0].loginUserRights);
        if (isAdmin) {
          navigate('/setting');
        } else {
          navigate('/user');
        }
      } else {
        toast.error('Login failed');
      }
    } catch (err) {
      toast.error(`Error occurred while logging in: ${err}`);
      setLoading(false);
    }
  };

  return (
    <div className={`main ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="side-board">
        <img src={Loadingboard} alt="Logo" />
      </div>
      <div className="test2">
        <div className="login-form">
          <div className="login-form-logo">
            <img className="logo-icon" src={GrowshootLogo} alt="Logo" />
            <span className="textLogo">{isAdmin ? t('gsDocsAdminLabel') : t('gsDocsUser')}</span>
          </div>
          <div className="login-details">
            <form onSubmit={handleSubmit}>
              <div className="input-flow">
                <img src={userLogo} alt="Logo" className='icon-user-password' />
                <div className="input-group inputForm">
                  <input
                    type="text"
                    className={`${errors.username ? "error " : ""} OpenSans-Regular`}
                    id="username"
                    value={username}
                    placeholder={t('usernameLabel')}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, username: null }));
                    }}
                  />
                </div>
              </div>
              <div className="errorOuterDiv">
                {errors.username && (
                  <span className="error-message-login OpenSans-Regular">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="input-flow">
                <img src={passwordLogo} alt="Logo" className='icon-user-password' />
                <div className="input-group inputForm">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder={t('passwordLabel')}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
                    }}
                    className={`${errors.password ? "error " : ""} OpenSans-Regular`}
                  />
                </div>
              </div>
              <div className="errorOuterDiv">
                {errors.password && (
                  <span className="error-message-login OpenSans-Regular">
                    {errors.password}
                  </span>
                )}
              </div>
              <button type="submit" disabled={loading} className={loading ? 'OpenSans-Regular disable-color' : 'OpenSans-Regular enable-color'}>
                {t('loginButtonLabel')}
              </button>
              {loading && <LinearProgress thickness={1} />}
            </form>
            <div className='margin-top-16px'>
              <input
                type="checkbox"
                checked={rememberMe}
                className='check-box'
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className='remember-me'>{t('rememberMeLabel')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
