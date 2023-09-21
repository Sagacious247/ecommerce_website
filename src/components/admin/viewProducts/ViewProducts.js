import React, { useEffect, useState } from 'react';
import styles from './ViewProduct.module.scss'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { deleteDoc, doc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCT, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';

function ViewProducts() {
    const {data, isLoading} = useFetchCollection("products")

    const products = useSelector(selectProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCT({
                products: data
            })
        )
    }, [dispatch, data])


    const confirmDelete = (id, imageURL) => {
        Notiflix.Confirm.show(
            'Delete Product',
            'You are about to delete this peroduct',
            'Delete',
            'Cancel',
            function okCb() {
                deleteProduct(id, imageURL);
            },
            function cancelCb() {
                console.log('Delete Canceled');
            },
            {
              width: '320px',
              borderRadius: '3px',
              titleColor: "orangered",
              okButtonBackground: "orangered",
              cssAnimationStyle: "zoom",
            },
          );
    }

    const deleteProduct = async(id, imageURL) => {
      try{
        await deleteDoc(doc(db, "products", id));

        const storagetRef = ref(storage, imageURL);
        await deleteObject(storagetRef)
        toast.success("Product deleted successfully.")
      }catch(error) {
        toast.error(error.message)
      }
    }
    return (
        <>
        {isLoading && <Loader/>}
        <div className={styles.table}>
           <h2>All Products</h2> 

           {products.length === 0 ? (
            <p>No product found.</p>
           ) : (
            <table>
             <thead>
             <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
             </tr>
            </thead>
            <tbody>
             {products.map((product, index) => {
                const {id, name, price, imageURL, category} = product

                console.log(product)
                return (
                   <tr key={id}>
                    <td>
                        {index + 1}
                    </td>
                    <td>
                        <img src={imageURL} alt={name} style={{width: "100px"}} />
                    </td>
                    <td>
                        {name}
                    </td>
                    <td>
                        {category}
                    </td>
                    <td>
                        {`$${price}`}
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                       <FaEdit size={20} color='green'/>
                      </Link>
                      &nbsp;
                      <FaTrash size={18} color='red'
                      onClick={() => confirmDelete(id, imageURL)} />
                    </td>
                   </tr>
                )
            })}
            </tbody>
            </table>
           )}
        </div>
        </>
    );
}

export default ViewProducts;