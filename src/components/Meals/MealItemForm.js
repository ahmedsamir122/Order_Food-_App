import classes from './MealItemForm.module.css'
import { useRef, useState } from 'react';
import Input from '../UI/Input';
const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNum = +enteredAmount;
        if(enteredAmount.trim()===0 || enteredAmountNum<1 || enteredAmountNum>5){
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNum)
    }
    return <form className={classes.form} onSubmit= {submitHandler}>
        <Input ref ={amountInputRef} label = "amount" input={{
            id:"amount_" + props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue : '1'
        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter avlid number (1-5)</p>}
    </form>
}

export default MealItemForm;