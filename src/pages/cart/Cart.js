import React, { useEffect } from 'react';
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { 
  ADD_TO_CART, 
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { Card } from '../../components';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

function Cart() {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const navigate = useNavigate()

    const increaseCard = (cart) => {
        dispatch(ADD_TO_CART(cart))
    }

    const decreaseCard = (cart) => {
      dispatch(DECREASE_CART(cart))
    }

    const removeFromCart = (cart) => {
       dispatch(REMOVE_FROM_CART(cart))
    }

    useEffect(() => {
       dispatch(CALCULATE_SUBTOTAL())
       dispatch(CALCULATE_TOTAL_QUANTITY())
       dispatch(SAVE_URL(""))
    }, [dispatch, cartItems])

    const url = window.location.href;

    const checkout = () => {
      if(isLoggedIn) {
        navigate("/checkout-details")
      } else {
        dispatch(SAVE_URL(url))
        navigate("/login")
      }
    }
    return (
        <section>
           <div className={`container ${styles.table}`}>
            <h2>Shopping cart</h2>
            {cartItems.length === 0 ? (
                <>
                 <p>Your cart is currently empty</p>
                 <br/>
                 <div>
                    <Link to="/#products">&larr; Continue Shopping</Link>
                 </div>
                </>
            ) : (
                <>
                 <table>
                    <thead>
                        <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cart, index) => {
                        const {imageURL, id, price, name, cartQuantity} = cart
                        return (
                            <tr key={id}>
                              <td>{index + 1}</td>
                              <td>
                                <p>
                                    <b>{name}</b>
                                </p>
                                <img
                                 src={imageURL} 
                                 alt={name} 
                                 style={{width: "100px"}}
                                 />
                              </td>
                              <td>{price}</td>
                              <td>
                                <div className={styles.count}>
                                 <button 
                                 onClick={() => decreaseCard(cart)}
                                 className='--btn'
                                 >-</button>
                                 <p>
                                    <b>{cartQuantity}</b>
                                 </p>
                                 <button
                                  className='--btn'
                                  onClick={() => increaseCard(cart)}
                                  >+</button>
                                </div>
                              </td>
                              <td>
                                {(price * cartQuantity).toFixed(2)}
                              </td>
                              <td className={styles.icons}>
                                <FaTrashAlt 
                                onClick={() => removeFromCart(cart)}
                                size={18} color='red'/>
                              </td>
                            </tr>
                        )
                      })}
                    </tbody>
                 </table>

                 <div className={styles.summary}>
                    <button className='--btn --btn-danger'>Clear Cart</button>
                 <div className={styles.checkout}>
                  <div>
                    <Link to="/#products"> &larr; Continue Shopping</Link>
                  </div>
                 </div>
                 <br/>
                 <Card cardClass={styles.card}>
                    <p> <b>{`Cart item(s): ${cartTotalQuantity}`}</b></p>
                    
                    <div className={styles.text}>
                        <h4>Subtotal:</h4>
                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    <p>Tax and shipping calculated at checkout</p>
                    <button className='--btn --btn-primary --btn-block' onClick={checkout}>Checkout</button>
                 </Card>
                 </div>
                </>
            )}
            </div> 
        </section>
    );
}

export default Cart;