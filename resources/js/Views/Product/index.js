import { inject, observer } from "mobx-react";
import React, {useEffect, useState} from 'react';
import DataTable from "react-data-table-component";
import SubHeaderComponent from "../../Component/Form/SubHeaderComponent";
import Layout from "../../Component/Layout/front.layout";

const Index = (props) => {
    const [data,setData] = useState([]);
  
    useEffect(() => {
        
        axios.get(`/api/product`,{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setData(res.data.data);
        })
        .catch(e => console.log(e)); 
    },[]);
    
    return (
        <Layout>
             <div className="container">
             <div className="row">
                 <div className="col-md-12">
                    <DataTable
                    columns={
                        [
                            {
                                name:'Model Code',
                                selector:'modelCode',
                                sortable:true
                            },
                            {
                                name:'Barkod',
                                selector:'barcode',
                                sortable:true
                            },
                            {
                                name:'Ürün Adı',
                                selector:'name',
                                sortable:true
                            },
                            {
                                name:'Düzenle',
                                cell:(item)=> <button onClick={()=> props.history.push(({
                                    pathname: `/urunler/duzenle/${item.id}`
                                }))} className={"btn btn-primary"}>Düzenle</button>
                            },
                            {
                                name:'Sil',
                                cell:(item)=> <button className={"btn btn-danger"}>Sil</button>,
                                button:true
                            },

                        ]
                    } 
                    subHeader={true}
                    responsive={true}
                    hover={true}
                    fixedHeader
                    pagination
                    data={data}
                    subHeaderComponent={<SubHeaderComponent action ={{ class:'btn btn-success',uri:() => props.history.push('/urunekle'), title:'Ürün Ekle'}}/>}
                    />
                </div>
             </div>
             </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Index));