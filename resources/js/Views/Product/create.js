import { inject, observer } from "mobx-react";
import React, {useState, useEffect} from 'react';
import Layout from "../../Component/Layout/front.layout";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../../Component/Form/CustomInput";
import Select from "react-select";
import ImageUploader from 'react-images-upload';
import { CKEditor } from 'ckeditor4-react';
import axios from "axios";
import swal from 'sweetalert';

const Create = (props) => {

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState([]);

  useEffect(() => {
        
    axios.get(`/api/product/create`,{
        headers:{
            Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
        }
    }).then((res) => {
        setCategories(res.data.categories);
    })
    .catch(e => console.log(e)); 
},[images]);

    const handleSubmit = (values, {resetForm}) => {
      const data = new FormData();

      images.forEach((image_file) => {
        data.append('file[]', image_file);
      });
      data.append('categoryId', values.categoryId);
      data.append('name', values.name);
      data.append('modelCode', values.modelCode);
      data.append('barcode', values.barcode);
      data.append('brand', values.brand);
      data.append('tax', values.tax);
      data.append('stock', values.stock);
      data.append('sellingPrice', values.sellingPrice);
      data.append('buyingPrice', values.buyingPrice);
      data.append('text', values.text);
      data.append('property', JSON.stringify(property));

      const config = {
        headers:{
            'Accept':'application/json',
            'content-type':'multipart/form-data',
            'Authorization':'Bearer '+ props.AuthStore.appState.user.access_token
        }
    }
      axios.post('/api/product',data,config)
      .then((res) => {
        if(res.data.success){
          resetForm({});
          setImages({});
          setProperty({});
        }
        else{
          swal(res.data.message);
        }
      })
      .catch(e => console.log(e));
    };

    const addProperty = () => {
      setProperty([...property, {property:'', value:''}]);
    }

    const removeProperty = (index) => {
      const oldProperty = property;
      oldProperty.splice(index, 1);
      setProperty([...oldProperty]);
    }

    const changeTextInput = (event,index) => {
      console.log(property);
      console.log(event.target.value,index);
      property[index][event.target.name] = event.target.value;
      setProperty([...property]);
  };

    return (
        <Layout>
            <div className="mt-5">
             <div className="container">
             <Formik 
            initialValues={{
              categoryId:'',
              name:'',
              modelCode:'',
              brand:'',
              barcode:'',
              stock:'',
              tax:'',
              buyingPrice:'',
              sellingPrice:'',
              text:''
            }}
            onSubmit={handleSubmit}
            validationSchema={
              Yup.object().shape({
                  name:Yup.string().required("Ürün Adı Zorunludur"),
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
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose images'
                      onChange={(picturesFiles) => {
                        setImages(images.concat(picturesFiles))
                      }}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                      withPreview={true}
                />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Select 
                    placeholder={"Ürün kategorisi seçiniz"}
                    onChange={(e) => setFieldValue('categoryId', e.id)}
                    options={categories} 
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <CustomInput 
                      title="Ürün Adı"
                      value={values.name}
                      handleChange={handleChange('name')}
                    />
                 {(errors.name && touched.name) && <p>{errors.name}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="Ürün Model Kodu"
                      value={values.modelCode}
                      handleChange={handleChange('modelCode')}
                    />
                 {(errors.modelCode && touched.modelCode) && <p>{errors.modelCode}</p>}

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <CustomInput 
                      title="Barkod"
                      value={values.barcode}
                      handleChange={handleChange('barcode')}
                    />
                 {(errors.barcode && touched.barcode) && <p>{errors.barcode}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="Marka"
                      value={values.brand}
                      handleChange={handleChange('brand')}
                    />
                 {(errors.brand && touched.brand) && <p>{errors.brand}</p>}

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <CustomInput 
                      title="Stok"
                      type="number"
                      value={values.stock}
                      handleChange={handleChange('stock')}
                    />
                 {(errors.stock && touched.stock) && <p>{errors.stock}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="Kdv"
                      value={values.tax}
                      handleChange={handleChange('tax')}
                    />
                 {(errors.tax && touched.tax) && <p>{errors.tax}</p>}

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <CustomInput 
                      title="Alış Fiyatı"
                      type="number"
                      value={values.buyingPrice}
                      handleChange={handleChange('buyingPrice')}
                    />
                 {(errors.buyingPrice && touched.buyingPrice) && <p>{errors.buyingPrice}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="Satış Fiyatı"
                      type="number"
                      value={values.sellingPrice}
                      handleChange={handleChange('sellingPrice')}
                    />
                 {(errors.sellingPrice && touched.sellingPrice) && <p>{errors.sellingPrice}</p>}

                  </div>
                </div>
             
                <div className="row">
                  <div className="col-md-12">
                  <CKEditor data={values.text} 
                    onChange={(event) => {
                      const data = event.editor.getData();
                      setFieldValue('text', data);
                    }}
                  />
                    {/* <CustomInput 
                      title="Açıklama"
                      type="text"
                      value={values.text}
                      handleChange={handleChange('text')}
                    />
                    {(errors.text && touched.text) && <p>{errors.text}</p>} */}

                  </div>
                </div>
                <div className="row mb-3 mt-3">
                    <div className="col-md-12">
                      <button type="button" onClick={addProperty} className="btn btn-primary">Yeni Özellik</button>
                    </div>
                </div>
                
                {property.map((item, index) => (
                      <div className="row mb-1">
                        <div className="col-md-5">
                          <label>Özellik</label>
                          <input type="text" className="form-control" name="property" onChange={(event) => changeTextInput(event,index)} value={item.property}/>
                        </div>
                        <div className="col-md-5">
                          <label>Özellik Değeri</label>
                          <input type="text" className="form-control" name="value" onChange={(event) => changeTextInput(event,index)} value={item.value}/>

                        </div>
                        <div className="col-md-1" style={{ display:'flex', justifyContent:'center', alignItems:'flex-end'}}>
                          <button type="button" className="btn btn-danger" onClick={() => removeProperty(index)}>X</button>
                        </div>
                      </div>
                    ))}
               
            <button 
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            className="btn btn-lg btn-primary btn-block" 
            type="button">
              Ürünü Ekle
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