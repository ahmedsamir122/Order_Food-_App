import classes from './Cart.module.css'
import React, {useState} from 'react'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/Cart-Context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length>0;
    const removeItemHandler =id => {
        cartCtx.removeItem(id)
    }
    const addItemHandler= item => {
        cartCtx.addItem({...item,amount:1})
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = (userData) => {
        fetch('https://react-test-aefc2-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        })
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={removeItemHandler.bind(null, item.id)} onAdd={addItemHandler.bind(null,item)}/>)}
        </ul>
    const modalAction = <div className={classes.actions} > 
    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
    {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>
    return  <Modal onClose={props.onCloseCart}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>                    
                </div>
                { isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart}/>}
                {!isCheckout && modalAction}
            </Modal>
}




export default Cart;