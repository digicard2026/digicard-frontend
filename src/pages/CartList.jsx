import React from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { useCart } from '../components/Header/CartContext'
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';

function CartList() {
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const { cart, removeItem } = useCart();
    const { cartItems, calculateSubtotal, calculateTax, calculateTotal } = useCart();

    const handleContinueShopping = () => {
        navigate('/auth/inventory');
    };
    const handleCheckout = () => {
        navigate('/payment');
    };


    useEffect(() => {
        const subTotal = calculateSubtotal();
        const estimatedTax = calculateTax(subTotal);
        const totalAmount = calculateTotal(subTotal, estimatedTax);
    
        setSubtotal(subTotal);
        setTax(estimatedTax);
        setTotal(totalAmount);
      }, [cartItems, calculateSubtotal, calculateTax, calculateTotal,cart]);
    


    return (
        <div className='container-fluid group-data-[content=boxed]:max-w-boxed mx-auto' >
           
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-x-5' >
                <div className="xl:col-span-9 products-list ">
                    <div className="flex items-center gap-3 mb-5">
                        <h5 className='underline text-16 grow' >Shopping Cart ({cart.length})</h5>
                        <div>
                            <button className='text-red-500 transition-all duration-300 ease-linear hover:text-red-600' >
                                Delete
                            </button>
                        </div>
                    </div>
                    {cart.length === 0 ? (
                        <div>Your Cart is empty.</div>
                    ) : (
                        cart.map((item) => (<div className='card products mb-5 rounded-md bg-white ' >
                            <div className='card-body p-5 rounded-md shadow-card ' >
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                                
                                    <div className="flex flex-col lg:col-span-4">
                                        <div>
                                            <h5 className="mb-1 text-16">
                                                <a href="apps-ecommerce-product-overview.html">DID No:{item.DID}</a>
                                            </h5>
                                            <p class="mb-2 text-slate-500 dark:text-zink-200">
                                                <a href="#!">Provider:{item.provider}</a>
                                            </p>
                                            <p class="mb-1 text-slate-500 dark:text-zink-200">Region:<span class="text-slate-800 dark:text-zink-50">{item.region}</span></p>

                                        </div>

                                        <div className="flex items-center mt-auto">

                                            <button className=' p-0  size-[37.5px]  rounded-lg flex items-center justify-center border-white border-[.5px] text-center  text-red-500 bg-red-100  hover:text-white hover:bg-red-600 focus:text-white focus:bg-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:ring active:ring-red-100 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:bg-red-500 dark:focus:text-white dark:active:bg-red-500 dark:active:text-white dark:ring-red-400/20 remove-button'
                                             onClick={() => removeItem(item._id)}>
                                                <LuTrash2></LuTrash2>
                                            </button>

                                        </div>


                                    </div>
                                    <div className="flex justify-between w-full lg:flex-col lg:col-end-13 lg:col-span-2">
                                    
                                        <h6 class="mt-auto text-16 ltr:lg:text-right rtl:lg:text-left">$<span class="products-line-price">{item.price}</span></h6>
                                    </div>

                                </div>
                            </div>

                        </div>))
                    )}

                </div>
                <div className="xl:col-span-3">
                    <div className="sticky top-[calc(theme('spacing.header')_*_1.3)] mb-5">
                        <div className="card bg-white rounded-md p-5 border-transparent shadow-card mb-5">
                            <div className="p-5">
                                <h6 class="mb-4 text-15">Order Summary</h6>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody class="table-total">
                                            <tr>
                                                <td class="py-2 text-slate-500 dark:text-zink-200">
                                                    Sub Total
                                                </td>
                                                <td class="py-2 text-slate-500 dark:text-zink-200 cart-subtotal">
                                                    ${subtotal}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="py-2 text-slate-500 dark:text-zink-200">
                                                    Estimated Tax (18%)
                                                </td>
                                                <td class="py-2 text-slate-500 dark:text-zink-200 cart-tax">
                                                    ${tax}
                                                </td>
                                            </tr>
                                           
                                            <tr class="font-semibold">
                                                <td class="pt-2">
                                                    Total Amount
                                                </td>
                                                <td class="pt-2 cart-total">
                                                    ${total}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-5 shrink-0">


                            <button className='"w-full text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-red-400/20' onClick={handleContinueShopping}>Continue to Shopping</button>
                            <button className="w-full text-white btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-custom-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20" onClick={handleCheckout}>Checkout</button>

                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartList