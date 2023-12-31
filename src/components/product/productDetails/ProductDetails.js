import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.scss'
import spinnerImg from '../../../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { 
    ADD_TO_CART, 
    CALCULATE_TOTAL_QUANTITY, 
    DECREASE_CART, 
    selectCartItems
} from '../../../redux/slice/cartSlice';

function ProductDetails() {
    const {id} = useParams()
    const [product, setProduct] = useState(null)

    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)

    const cart = cartItems.find((cart) => cart.id === id)

    const isCartAdded = cartItems.findIndex((cart) => {
        return cart.id === id
    })

    const getProduct = async() => {
        const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const obj = {
            id: id,
            ...docSnap.data()
        }
        setProduct(obj)
    } else {
        toast.error("Product not found")
    }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const addToCart = (product) => {
      dispatch(ADD_TO_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    const decreaseCard = (product) => {
        dispatch(DECREASE_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    return (
        <section>
            <div className={`container ${styles.product}`}>
            <h2>Product Details</h2>
            <div>
                <Link to="/#products">&larr; Back to Products</Link>
            </div>
            {product === null ? (
                <img src={spinnerImg} alt="Loading..." style={{width: "50px"}}/>
            ) : (
                <>
                 <div className={styles.details}>
                    <div className={styles.img}>
                        <img src={product.imageURL} alt={product.name} />
                    </div>
                    <div className={styles.content}>
                        <h3>{product.name}</h3>
                        <p className={styles.price}>{`$${product.price}`}</p>
                        <p>{product.desc}</p>

                        <p>
                            <b>SKU</b> {product.id}
                        </p>
                        <p>
                            <b>Brand</b> {product.brand}
                        </p>
                        <div className={styles.count}>
                            {isCartAdded < 0 ? null : (
                              <>
                                <button 
                            onClick={() => decreaseCard(product)}
                            className='--btn'
                            >-</button>
                            <p>
                                <b>{cart.cartQuantity}</b>
                            </p>
                            <button
                            onClick={() => addToCart(product)}
                             className='--btn'
                             >+</button>
                              </>
                            )}
                          
                        </div>

                        <button
                        onClick={() => addToCart(product)}
                         className='--btn --btn-danger'
                         >ADD TO CART
                         </button>
                    </div>
                 </div>
                </>
            )}
            </div>
        </section>
    );
}

export default ProductDetails;