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

const Edit = (props) => {
  const { params } = props.match;
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState([]);
  const [product, setProduct] = useState({});
  const [newImages,setNewImages] = useState([]);
  const [defaultImages,setDefaultImages] = useState([]);

  useEffect(() => {
        
    axios.get(`/api/product/${params.id}/edit`,{
        headers:{
            Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
        }
    }).then((res) => {
        if(res.data.success){
          setCategories(res.data.categories);
          setProduct(res.data.product);
          setImages(res.data.product.images);
          setProperty(res.data.product.property);
          res.data.product.images.filter(x => !x.isRemove ).map((item) => {
            defaultImages.push(item.path)
          });
          setLoading(false);
        }
        else {
          swal(res.data.message);
        }
    })
    .catch(e => console.log(e)); 
},[]);

    const handleSubmit = (values, {resetForm}) => {
      const data = new FormData();

      newImages.forEach((image_file) => {
        data.append('newfile[]', image_file);
      });
      data.append('file', JSON.stringify(images));
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
      data.append('_method','put');

      const config = {
        headers:{
            'Accept':'application/json',
            'content-type':'multipart/form-data',
            'Authorization':'Bearer '+ props.AuthStore.appState.user.access_token
        }
    }
      axios.post(`/api/product/${product.id}`,data,config)
      .then((res) => {
        if(res.data.success){
    
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

  const onChange = (picturesImage,pictures) => {
    if(picturesImage.length > 0){ 
        setNewImages(newImages.concat(picturesImage))
    }
    const diffrence = defaultImages.filter(x => !pictures.includes(x));
    diffrence.map((item) => {
        const findIndex = defaultImages.findIndex((picture) => picture == item)
        if(findIndex != -1)
        {
            const findIndexImage = images.findIndex((image) => image.path == item);
            console.log(findIndexImage);
            images[findIndexImage]['isRemove'] = true;
            setImages([...images]);

        }
    });
  };
    

  if(loading) return <div>Y??kleniyor</div>

    return (
        <Layout>
            <div className="mt-5">
             <div className="container">
             <Formik 
            initialValues={{
              categoryId:product.categoryId,
              name:product.name,
              modelCode:product.modelCode,
              brand:product.brand,
              barcode:product.barcode,
              stock:product.stock,
              tax:product.tax,
              buyingPrice:product.buyingPrice,
              sellingPrice:product.sellingPrice,
              text:product.text
            }}
            onSubmit={handleSubmit}
            validationSchema={
              Yup.object().shape({
                  name:Yup.string().required("??r??n Ad?? Zorunludur"),
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
                           defaultImages={defaultImages}
                           buttonText='Choose images'
                           onChange={(picturesFiles,pictures) => onChange(picturesFiles,pictures)}
                           imgExtension={['.jpg', '.gif', '.png', '.gif']}
                           maxFileSize={5242880}
                           withPreview={true}
                           />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Select 
                    value={categories.find(item => item.id == values.categoryId)}
                    placeholder={"??r??n kategorisi se??iniz"}
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
                      title="??r??n Ad??"
                      value={values.name}
                      handleChange={handleChange('name')}
                    />
                 {(errors.name && touched.name) && <p>{errors.name}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="??r??n Model Kodu"
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
                      title="Al???? Fiyat??"
                      type="number"
                      value={values.buyingPrice}
                      handleChange={handleChange('buyingPrice')}
                    />
                 {(errors.buyingPrice && touched.buyingPrice) && <p>{errors.buyingPrice}</p>}

                  </div>
                  <div className="col-md-6">
                    <CustomInput 
                      title="Sat???? Fiyat??"
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
                      title="A????klama"
                      type="text"
                      value={values.text}
                      handleChange={handleChange('text')}
                    />
                    {(errors.text && touched.text) && <p>{errors.text}</p>} */}

                  </div>
                </div>
                <div className="row mb-3 mt-3">
                    <div className="col-md-12">
                      <button type="button" onClick={addProperty} className="btn btn-primary">Yeni ??zellik</button>
                    </div>
                </div>
                
                {property.map((item, index) => (
                      <div className="row mb-1">
                        <div className="col-md-5">
                          <label>??zellik</label>
                          <input type="text" className="form-control" name="property" onChange={(event) => changeTextInput(event,index)} value={item.property}/>
                        </div>
                        <div className="col-md-5">
                          <label>??zellik De??eri</label>
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
              ??r??n?? Ekle
              </button>
          </div>
         
              )}
          </Formik>
          </div>
          </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Edit));