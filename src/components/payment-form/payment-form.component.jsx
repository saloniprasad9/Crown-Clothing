import { CardElement , useStripe , useElements } from "@stripe/react-stripe-js";

import Button , { BUTTON_TYPE_CLASSES } from "../button/button.component";

import './payment-form.styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements ) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method : 'post',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({ amount : 10000 })
        }).then(res => res.json());

        console.log(response);
    }
    return (
        <div className='paymentFormContainer'>
            <div className='form-container' onSubmit={paymentHandler}>
                <h2>Credit Card Payment : </h2>
                <CardElement/>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </Button>
            </div>
        </div>
    )
}


export default PaymentForm;