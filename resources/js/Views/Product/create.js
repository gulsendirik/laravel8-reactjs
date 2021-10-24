import { inject, observer } from "mobx-react";
import React from 'react';
import Layout from "../../Component/Layout/front.layout";
import { Formik } from 'formik';
import * as Yup from 'yup';

const Create = (props) => {

    const handleSubmit = () => {

    };

    return (
        <Layout>
            <div className="mt-5">
             <div className="container">
             <Formik 
            initialValues={{
              email:'',
              password:'',
            }}
            onSubmit={handleSubmit}
            validationSchema={
              Yup.object().shape({
                email:Yup
                      .string()
                      .email('Email Formatı Hatalı')
                      .required('Email Zorunludur'),
                password:Yup.string().required('Şifre Zorunludur'),
            
              })
            }
            >
              {({ 
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                isValid,
                isSubmitting,
                touched
              }) => ( 
              <div>
            

            <div className="form-group">
              <label htmlFor="inputEmail" className="sr-only">Email Adres</label>
              <input 
              autoComplete="off"
              type="email" 
              className="form-control" 
              placeholder="Email address" 
              value={values.email} 
              onChange={handleChange('email')}
               />
                 {(errors.email && touched.email) && <p>{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword" className="sr-only">Şifre</label>
              <input type="password" 
               className="form-control" placeholder="Şifre" 
               value={values.password} 
               onChange={handleChange('password')}
                />
                 {(errors.password && touched.password) && <p>{errors.password}</p>}
            </div>

            <button 
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            className="btn btn-lg btn-primary btn-block" 
            type="button">
              Giriş Yap
              </button>
          </div>
         
              )}
          </Formik>
          </div>
          </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Create));