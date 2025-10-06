import React, { useEffect, useRef, useState } from 'react';
import { LuX } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

import { useCart } from '../Header/CartContext';
import Cart from '../Header/CartProduct';
import { Link } from 'react-router-dom';


function CartSideBar({ cartOpen, setCartOpen }) {

  const { cart, removeItem } = useCart();
  

  const trigge = useRef(null);
  const Cartbar = useRef(null);

  const storedCartbarExpanded = localStorage.getItem('Cartbar-expanded');
  const [CartbarExpanded, setCartbarExpanded] = useState(
    storedCartbarExpanded === null ? false : CartbarExpanded === 'true'
  );

  //Click outside to close 

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!Cartbar.current || !trigge.current) return;
      if (
        !cartOpen ||
        Cartbar.current.contains(target) ||
        trigge.current.contains(target)
      )
        return;
      setCartOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [cartOpen, setCartOpen]);


  return (

    <aside
      ref={Cartbar}
      // className={`absolute right-0 top-0 z-9999 border-r border-slate-200 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark ${
      //   cartOpen ? 'translate-x-0 ' : 'translate-x-full'
      className={`fixed inset-y-0 flex flex-col w-full transition-transform duration-300 ease-in-out transform bg-white shadow dark:bg-zinc-800 right-0 md:w-96 z-999999 ${cartOpen ? 'z-drawer' : 'z-drawer show hidden'}  `}


    >
      {/* <!-- SIDEBAR HEADER  lg:static lg:translate-x-0 --> */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-black">
        <div className='grow' >
          <h5 className="mb-0 text-16 font-tourney text-black font-bold " >
            Shopping Cart
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-[11px] font-medium border rounded-full text-white bg-blue-500 border-blue-500" >{cart.length}</span>
          </h5>
        </div>

        <div className='shrink-0' >
          <button
            ref={trigge}
            onClick={() => setCartOpen(!cartOpen)}
            aria-controls="Cartbar"
            aria-expanded={cartOpen} className='transition-all duration-150 ease-linear text-slate-500 hover:text-slate-800' >
            <LuX className="size-4" />
          </button>

        </div>


      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      {/* <div className="px-4 py-3 text-sm text-green-500 border border-transparent bg-green-50 dark:bg-green-400/20">
        <span className="font-bold underline">UConnect50</span> Coupon code applied successfully.

      </div> */}

      <div >
        <div className="h-[calc(100vh_-_250px)] p-4 overflow-y-auto product-list">
          <div className="flex flex-col gap-4">
            {
              cart.length === 0 ? (
                <p className="p-2 text-zinc-900  font-bold font-tourney" >Your cart is empty.</p>
              ) : (

                cart.map((item, index) => (
                  <div key={index} className="flex gap-2 product " >
                    {/* <div className="flex items-center justify-center size-12 rounded-md bg-slate-100 shrink-0 dark:bg-zink-500">
                      <img src={item.img} alt="" className="h-8" />
                    </div> */}
                    <div className="overflow-hidden grow">
                      <div className="float-right">
                        <button onClick={()=>removeItem(item)} className='transition-all duration-150 ease-linear text-slate-500 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-500'  >
                          <LuX className="size-4" />
                        </button>
                      </div>
                      <a href="#!" className="transition-all duration-200 ease-linear  hover:text-blue-500">
                        <h6 className="mb-1 text-[15px] text-black font-bold font-tourney">{item.provider}</h6>  
                        
                      </a>
                      <div className="flex items-center mb-3">
                        <h5 className="text-base product-price text-black font-medium font-tourney "> <span>{(item.DID)}</span></h5>
                        <div className={`font-normal rtl:mr-1 ltr:ml-1 dark:text-zink-200 font-tourney ${index === Cart.length - 3 ? "text-slate-500" : "text-slate-400"}`}>({item.region})</div>
                      </div>
                      {/* <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex text-center input-step">
                          <button type="button" className="border size-9 leading-[15px] minus bg-white dark:bg-black dark:border-slate-800 rounded-l transition-all duration-200 ease-linear border-slate-200 text-slate-500 dark:text-slate-400 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-whiter dark:hover:text-whiter hover:border-blue-500 dark:hover:border-blue-500 focus:bg-blue-500 dark:focus:bg-blue-500 focus:border-blue-500 dark:focus:border-blue-500 focus:text-whiter dark:focus:text-whiter">
                            <LuMinus className="inline-block size-4" />
                          </button>
                          <input type="number" className="w-12 text-center  h-9 border-slate-200 border product-quantity dark:bg-black focus: shadow-none dark:border-zinc-800" value={ 1} min="0" max="100" readOnly />
                          <button type="button" className="border size-9 leading-[15px] minus bg-white dark:bg-black dark:border-slate-800 rounded-r transition-all duration-200 ease-linear border-slate-200 text-slate-500 dark:text-slate-400 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-whiter dark:hover:text-whiter hover:border-blue-500 dark:hover:border-blue-500 focus:bg-blue-500 dark:focus:bg-blue-500 focus:border-blue-500 dark:focus:border-blue-500 focus:text-whiter dark:focus:text-whiter">
                            <LuPlus className="inline-block size-4" />
                          </button>
                        </div>
                        <h6 className="product-line-price">{item.price}</h6>
                      </div> */}
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>

      <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
      <table className="w-full mb-3 ">
          <tbody className="table-total">
            <tr>
              <td className="py-2 font-tourney ">Sub Total :</td>
              <td className="text-right cart-subtotal font-tourney">subTotal.toFixed</td>
            </tr>
            {/* <tr>
              <td className="py-2">Discount <span className="text-muted">(TAILWICK50)</span>:</td>
              <td className="text-right cart-discount">-dis.toFixed</td>
            </tr> */}
            {/* <tr>
              <td className="py-2">Shipping Charge :</td>
              <td className="text-right cart-shipping">charge</td>
            </tr> */}
            <tr>
              <td className="py-2 font-tourney ">Estimated Tax (12.5%) : </td>
              <td className="text-right cart-tax font-tourney">tax</td>
            </tr>
            <tr className="font-semibold font-tourney">
              <td className="py-2 font-tourney text-slate-700 ">Total : </td>
              <td className="text-right font-tourney cart-total">subTotal + charge + tax - dis</td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between gap-3">
          <Link to="/apps-ecommerce-product-grid" className="w-full text-white btn bg-slate-500 border-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:border-slate-600 active:ring active:ring-slate-100 dark:ring-slate-400/10">Continue Shopping</Link>
          <Link to="/apps-ecommerce-checkout" className="w-full text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20">Checkout</Link>
        </div>
      </div> 
      </div>
    </aside>

  )

}

export default CartSideBar