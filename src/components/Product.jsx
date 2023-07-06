import React from 'react'
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const Product = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProduct();
    }, []);
    const Loading = () => {
        return (
            <>
               <div className="col-md-3">
                <Skeleton height={350}/> 
               </div>
               <div className="col-md-3">
                <Skeleton height={350}/> 
               </div>
               <div className="col-md-3">
                <Skeleton height={350}/> 
               </div>
               <div className="col-md-3">
                <Skeleton height={350}/> 
               </div>
            </>
        )
    }
const filterProductes = (cat)=>{
    const updatedList = data.filter((x)=>x.category === cat);
    setFilter(updatedList);
}
    const ShowProduct = () => {
        return (
            <>
                <div className="button d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark"onClick={()=>filterProductes("electronics")}>Electronics</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div class="card h-100 text-center p-4" key ={product.id}>
                                    <img class="card-img-top" src={product.image} alt={product.title} height ="250px" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-0 ">{product.title.substring(0,12) }</h5>
                                        <p class="card-text">${product.price}</p>
                                        <Link to={`/products/${id}`} class="btn btn-outline-dark">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (

        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Product</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
export default Product;