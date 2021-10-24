import React,{ useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const Register = (props) => {
   
    const handleSubmit = (values) => {
        axios.post(`/api/auth/register`, {...values})
        .then((res) => {
           if(res.data.success) {
            const userData = {
                id:res.data.id,
                name:res.data.name,
                email:res.data.email,
                access_token:res.data.access_token
            };
            const appState = {
                isLoggedIn:true,
                user:userData
            };
            props.AuthStore.saveToken(appState);
            props.history.push('/');
            alert('Kayıt Tamamlandı');
           }
           else{
               alert('Giriş Yapamadınız');
           }
        })
        .catch(error => {
            console.log(error)
        });
    }

    return(
        <div className="login-register-container">
        <form class="form-login">
            <h1 class="h3 mb-3 font-weight-normal">Kayıt Ol</h1>
            <Formik 
                initialValues={{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                }}
                onSubmit={handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        email:Yup
                            .string()
                            .email('Email Formatı Hatalı')
                            .required('Email Zorunludur'),
                        name:Yup.string().required('Ad Soyad Zorunludur'),
                        password:Yup.string().required('Şifre Zorunludur'),
                        password_confirmation:Yup.string().oneOf([Yup.ref('password'),null], 'Şifreler Eşleşmiyor')
                    })
                }
            >
            
            {({
                values,
                handleChange,
                handleSubmit,
                errors,
                isValid,
                isSubmitting,
                touched
            }) => (

            <div>
            <div class="form-group">
                <label for="inputAd" class="sr-only">Ad Soyad</label>
                <input type="input"
                id="inputAd" 
                class="form-control" 
                placeholder="Ad Soyad" 
                value={values.name}
                onChange={handleChange('name')}
                />
                {(errors.name && touched.name) && <p>{errors.name}</p>}

            </div>
            <div class="form-group">
                <label for="inputEmail" class="sr-only">Email</label>
                <input type="email" 
                class="form-control" 
                placeholder="Email address" 
                value={values.email}
                onChange={handleChange('email')}
                />
                {(errors.email && touched.email) && <p>{errors.email}</p>}
            </div>
            <div class="form-group">
                <label for="inputPassword" class="sr-only">Şifre</label>
                <input type="password" 
                class="form-control" 
                placeholder="Password" 
                value={values.password}
                onChange={handleChange('password')}
                />
                {(errors.password && touched.password) && <p>{errors.password}</p>}
            </div>
            <div class="form-group">
                <label for="inputPassword2" class="sr-only">Şifre Tekrarı</label>
                <input type="password" 
                class="form-control" 
                placeholder="Password" 
                value={values.password_confirmation}
                onChange={handleChange('password_confirmation')}
                />
                {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}
            </div>
            <div class="checkbox mb-3">
                <label>
                <input 
                type="checkbox" 
                value="remember-me" 
                /> Remember me
                </label>
            </div>
            <button 
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            class="btn btn-lg btn-primary btn-block" 
            type="button"
            >Kayıt Ol</button>
            </div>
            )}
            </Formik>
            <Link className="mt-3" style={{display:'block'}} to="/login">Giriş</Link>
        </form>
        </div>
    )
};
export default inject("AuthStore")(observer(Register));
