import classes from './Cart.module.css'
import React, {useRef, useState} from 'react'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/Cart-Context'
import CartItem from './CartItem'

const Cart = props => {
    const [validForm, setValidForm] = useState(false)
    const [click, setClick]= useState(false)
    const [validFirstName, setValidFirstName] = useState(false)
    const [validLastName, setValidLastName] = useState(false)
    const [validPostNum, setValidPostNum] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const firstNameRef= useRef()
    const lastNameRef= useRef()
    const postNumRef= useRef()
    const emailRef= useRef()
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length>0;
    const removeItemHandler =id => {
        cartCtx.removeItem(id)
    }
    const addItemHandler= item => {
        cartCtx.addItem({...item,amount:1})
    }
    const fetchSubmitData= async(order) =>{
        try{
            const response = await fetch('https://react-test-aefc2-default-rtdb.firebaseio.com/orders.json',{
                method:'POST',
                body:JSON.stringify(order),
                headers:{
                    'content-type':'application/json'
                }
            })
            if(!response.ok) throw new Error('something wnt wrong')
            const data =await response.json()
            console.log(data)
        }catch(err){
            console.log(err.message)
        }
    }
    
    const formValidityHandler =(event) => {
        event.preventDefault();
        setClick(true)
        console.log(firstNameRef, lastNameRef, postNumRef, emailRef)
        if(firstNameRef.current.value.length>6)
        setValidFirstName(true)
        if(lastNameRef.current.value.length>6)
        setValidLastName(true)
        if(postNumRef.current.value.length>5)
        setValidPostNum(true)
        if(emailRef.current.value.includes('@') && emailRef.current.value.trim().length>5)
        setValidEmail(true)
        if(validFirstName && validLastName && validPostNum && validEmail)
        setValidForm(true)
        if(!validForm) return;
        const address ={
            enteredFirstName:firstNameRef.current.value,
            enteredLastName:lastNameRef.current.value.length,
            enteredPostNum:postNumRef.current.value.length,
            enteredEmail:emailRef.current.value,
        }
        fetchSubmitData(address)
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={removeItemHandler.bind(null, item.id)} onAdd={addItemHandler.bind(null,item)}/>)}
        </ul>

    return  <Modal onClose={props.onCloseCart}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions} > 
                    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                    {hasItem && <button className={classes.button}>Order</button>}
                </div>
                <form onSubmit={formValidityHandler}>
                    <div>
                        <label>First Name</label>
                        <input type='text' ref={firstNameRef}/>
                        {!validFirstName && click && <p>please enter a valid name</p>}
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type='text' ref={lastNameRef}/>
                        {!validLastName && click && <p>please enter a valid name</p>}
                    </div>
                    <div>
                        <label>Post Number</label>
                        <input type='number' ref={postNumRef} />
                        {!validPostNum && click && <p>please enter the right number</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='email' ref={emailRef}/>
                        {!validEmail && click && <p>please enter the right email</p>}
                    </div>
                    <button className={validForm?classes.active : ""} >Confirm</button>
                </form>
            </Modal>
}




export default Cart;