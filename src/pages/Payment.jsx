import React, { useState, useEffect } from 'react';
import { useCart } from '../components/Header/CartContext'
import { useNavigate } from 'react-router-dom';
import { ORDER_URL } from '../utility/constants';
import { PAYMENT_URL } from '../utility/constants';

// Access the base API URL from the environment variable
//const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
// const ORDER_URL = `${apiUrl}/api/v1/order`;
// const PAYMENT_URL = `${apiUrl}/api/v1/payment`;


const Payment = () => {
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const { cartItems, calculateSubtotal, calculateTax, calculateTotal } = useCart();
    const { cart ,clearCart} = useCart();
    const navigate=useNavigate();
    useEffect(() => {
        const subTotal = calculateSubtotal();
        const estimatedTax = calculateTax(subTotal);
        const totalAmount = calculateTotal(subTotal, estimatedTax);

        setSubtotal(subTotal);
        setTax(estimatedTax);
        setTotal(totalAmount);
    }, [cartItems, calculateSubtotal, calculateTax, calculateTotal]);
//   function handlePayment(){
//     console.log("payment has  done");
//     setTimeout(()=>{
//     navigate('/MyOrder')
//     },1000)
//   }
  async function handlePayment() {
    try {
        const response = await fetch(`${PAYMENT_URL}/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({current_Status:"success"})
          });
        if (response.ok) {
            const status = await response.json();
            console.log("payment api response",status)
            console.log(status._id)
            if (status.current_Status === 'success' ) {
                // Assuming you have a function to store order details
                const cartdata=await storeOrderDetails(cart, status._id, status.user_id);
                console.log(cartdata)
                console.log("Payment is done and order details are stored.");
                clearCart();
                console.log("Cart has been cleared.");
            } else {
                console.log("Payment failed, order details are not stored.");
            }
        } else {
            console.log("Failed to get payment status.");
        }
    } catch (error) {
        console.log(error);
    }
}

async function storeOrderDetails(cart, paymentId,user_id) {
   // payment_id:paymentId,
    const itemdetails = cart.map(item => ({
        inventoryId:item._id,
        Price: item.price,
        itemname:item.DID,
        Tax: "" // Add tax calculation if needed itemid-,name-DID,tax
    }));
    const orderData = {
        user_id:user_id,
        payment_id: paymentId, 
        itemdetails: itemdetails
    };
    console.log("cart data",orderData)
    try {
        const response = await fetch(`${ORDER_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(orderData)
        });
        if (response.ok) {
            const data= await response.json();
            console.log(data._id)
            const order_id=data._id;
            navigate(`/myOrder/${order_id}`)
            console.log("Order details stored successfully.");
        } else {
            console.log("Failed to store order details.");
        }
    } catch (error) {
        console.log(error);
    }
}


    return (
        <>
            <div className='bg-white p-5 mb-5 rounded-md'>
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    <div class="xl:col-span-2">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="mb-4 text-15">Payment Information</h6>
                                <form action="#!">
                                    <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                        <div class="xl:col-span-12">
                                            <label for="cardNumberInput" class="inline-block mb-2 text-base font-medium">Card Number</label>
                                            <input type="text" pattern="\d*" maxlength="16" id="cardNumberInput" class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="XXXX XXXX XXXX XXXX" />
                                        </div>
                                        <div class="xl:col-span-6">
                                            <label for="expiringInput" class="inline-block mb-2 text-base font-medium">Expiring (MM/YY)</label>
                                            <input type="text" pattern="\d*" maxlength="4" id="expiringInput" class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="MM/YY" />
                                        </div>
                                        <div class="xl:col-span-6">
                                            <label for="cvvInput" class="inline-block mb-2 text-base font-medium">CVV Code</label>
                                            <input type="text" pattern="\d*" maxlength="3" id="cvvInput" class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="000" />
                                        </div>
                                    </div>
                                </form>

                                <div class="mt-3">
                                    <h6 class="mb-1">We accept the following cards</h6>
                                    <div class="flex items-center gap-2">
                                        <img src="./assets/images/img-013.png" alt="" class="h-8" />
                                        <img src="./assets/images/img-022.png" alt="" class="h-8" />
                                        <img src="./assets/images/img-032.png" alt="" class="h-8" />
                                        <img src="./assets/images/img-042.png" alt="" class="h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xl:col-span-1">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="mb-4 text-15">Orders Summary</h6>
                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <tbody>
                                            <tr>
                                                <td class="px-3.5 pt-4 pb-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">
                                                    Sub Total
                                                </td>
                                                <td class="px-3.5 pt-4 pb-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">${subtotal}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-3.5 py-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">
                                                    Estimated Tax (18%)
                                                </td>
                                                <td class="px-3.5 py-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">${tax}</td>
                                            </tr>
                                            <tr class="font-semibold">
                                                <td class="px-3.5 pt-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">
                                                    Total Amount (USD)
                                                </td>
                                                <td class="px-3.5 pt-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">${total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="mt-4">
                                    <button type="button" class="w-full text-white btn bg-custom-600 border-custom-600 hover:text-green-600 hover:bg-custom-600 hover:border-custom-600 focus:text-black focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                        <span class="align-middle" onClick={handlePayment}>Place Order</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="move-right" class="lucide lucide-move-right inline-block align-middle size-4 ltr:ml-1 rtl:mr-1 rtl:rotate-180">
                                            <path d="M18 8L22 12L18 16"></path>
                                            <path d="M2 12H22"></path>
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};
export default Payment;