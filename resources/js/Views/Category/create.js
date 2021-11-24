import { inject, observer } from "mobx-react";
import React, {useState, useEffect} from 'react';
import Layout from "../../Component/Layout/front.layout";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../../Component/Form/CustomInput";
import axios from "axios";
import swal from 'sweetalert';

const Create = (props) => {

    const handleSubmit = (values, {resetForm}) => {
      const data = new FormData();
      
      data.append('name', values.name);

      const config = {
        headers:{
            'Accept':'application/json',
            'content-type':'multipart/form-data',
            'Authorization':'Bearer '+ props.AuthStore.appState.user.access_token
        }
    }
      axios.post('/api/category',data,config)
      .then((res) => {
        if(res.data.success){
          swal("İşlem tamamlandı");
          resetForm({});
        }
        else{
          swal(res.data.message);
        }
      })
      .catch(e => console.log(e));
    };

    return (
        <Layout>
            <div className="mt-5">
             <div className="container">
             <Formik 
            initialValues={{
              name:''
            }}
            onSubmit={handleSubmit}
            validationSchema={
              Yup.object().shape({
                  name:Yup.string().required("Kategori Adı Zorunludur"),
              })
            }
            >
              {({ 
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                setFieldValue,
                errors,
                isValid,
                isSubmitting,
                touched
              }) => ( 
              <div>
               
                <div className="row">
                  <div className="col-md-12">
                    <CustomInput 
                      title="Kategori Adı"
                      value={values.name}
                      handleChange={handleChange('name')}
                    />
                 {(errors.name && touched.name) && <p>{errors.name}</p>}

                  </div>
                
                </div>
        
               
            <button 
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            className="btn btn-lg btn-primary btn-block" 
            type="button">
              Kategori Ekle
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