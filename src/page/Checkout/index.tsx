import { useState } from 'react';
import { NavLink } from 'react-router';
import GreenShop from '../../components/GreenShop';
import Like from '../../components/Like';
import './Checkout.css';
import Button from '../../assets/icon/button.svg';
import Visa from '../../assets/image/visa.png';
import { useCart } from '../../context/CartContext';

const Checkout = () => {
    const { cartItems } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        streetAddress: '',
        apartment: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
        orderNotes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        handleChange(e);

        // Construct the order data with correct product IDs
        const orderData = {
            ...formData,
            items: cartItems.map(item => ({
                productId: item._id, // Ensure you pass the correct productId here
                quantity: item.quantity,
            })),
            totalAmount: calculateTotal() + 16, // Assuming shipping is $16
        };

        try {
            const response = await fetch('https://www.e-commerce-api-v3.nt.azimumarov.uz/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Order placed successfully!');
            } else {
                setError(data.message || 'An error occurred. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while placing the order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='checkout'>
            <div className='container checkout__container'>
                <div className='checkout__content'>
                    <NavLink className='checkout__link' to='/'>Home</NavLink>
                    <p>/</p>
                    <NavLink className='checkout__link' to='/shop'>Shop</NavLink>
                    <p>/</p>
                    <NavLink className='checkout__link' to='/checkout'>Checkout</NavLink>
                </div>

                <form className='checkout__content2' onSubmit={handleSubmit}>
                    <div className="checkout__form" >
                        <h2 className="checkout__title">Billing Address</h2>
                        <div className='checkout__groups'>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="first-name">First Name</label>
                                <input className='checkout__input' type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="last-name">Last Name</label>
                                <input className='checkout__input' type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='checkout__groups'>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="country">Country / Region</label>
                                <input className='checkout__input' type="text" id="country" name="country" value={formData.country} onChange={handleChange} required placeholder="Select a country / region" />
                            </div>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="town-city">Town / City</label>
                                <input className='checkout__input' type="text" id="town-city" name="city" value={formData.city} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='checkout__groups'>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="street-address">Street Address</label>
                                <input className='checkout__input' type="text" id="street-address" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required placeholder="House number and street name" />
                            </div>
                            <div className="checkout__group">
                                <input className='checkout__input' type="text" id="apartment" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, unit, etc. (optional)" />
                            </div>
                        </div>
                        <div className='checkout__groups'>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="state">State</label>
                                <input className='checkout__input' type="text" id="state" name="state" value={formData.state} onChange={handleChange} required placeholder="Select a state" />
                            </div>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="zip">Zip</label>
                                <input className='checkout__input' type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required placeholder="Your zip code" />
                            </div>
                        </div>
                        <div className='checkout__groups'>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="email">Email Address</label>
                                <input className='checkout__input' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your email address" />
                            </div>
                            <div className="checkout__group">
                                <label className='checkout__label' htmlFor="phone">Phone Number</label>
                                <input className='checkout__input' type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your phone number" />
                            </div>
                        </div>
                        <div className="checkout__group2">
                            <button className='checkout__btn' type="submit" disabled={loading}>
                                <img src={Button} alt="Submit Button" />
                            </button>
                            {loading && <span>Processing...</span>}
                            {error && <div className="error-message">{error}</div>}
                            <label htmlFor="ship-different-address">Ship to a different address?</label>
                        </div>
                        <div className="checkout__group">
                            <label className='checkout__label' htmlFor="order-notes">Order Notes (optional)</label>
                            <input className='checkout__input2' type='' id="order-notes" name="orderNotes" value={formData.orderNotes} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='checkout__order'>
                        <h2 className="checkout__title">Your Order</h2>
                        <div className='checkout__content3'>
                            <h3 className='checkout__sub-title'>Products</h3>
                            <h3 className='checkout__sub-title'>Subtotal</h3>
                        </div>
                        <span className='checkout__span'></span>

                        {cartItems.length > 0 && cartItems.map((item) => (
                            <div key={item.id} className='checkout__card'>
                                <img className='checkout__iamge' src={item.picture} alt={item.name} />
                                <div className='checkout__block'>
                                    <h3 className='checkout__name'>{item.name}</h3>
                                    <h3 className='checkout__sub2-title'>SKU: 19957518757065</h3>
                                </div>
                                <p className='checkout__quantity'>(x{item.quantity})</p>
                                <p className='checkout__price'>${item.price * item.quantity}</p>
                            </div>
                        ))}
                        <a className='checkout__link2' href="">Have a coupon code? <span className='checkout__span2'>Click here</span></a>
                        <div className='checkout__content4'>
                            <h4 className='checkout__sub3-title'>Subtotal</h4>
                            <p className='checkout__price'>${calculateTotal()}</p>
                        </div>
                        <div className='checkout__content4'>
                            <h4 className='checkout__sub3-title'>Coupon Discount</h4>
                            <p className='checkout__price2'>(-) 00.00</p>
                        </div>
                        <div className='checkout__content4'>
                            <h4 className='checkout__sub3-title'>Shipping</h4>
                            <p className='checkout__price2'>$16.00</p>
                        </div>
                        <a className='checkout__link3' href="">View shipping charge</a>
                        <span className='checkout__span'></span>
                        <div className='checkout__content5'>
                            <h2 className='checkout__title'>Total</h2>
                            <p className='checkout__price'>${calculateTotal() + 16}</p>
                        </div>
                        <h2 className='checkout__title'>Payment Method</h2>
                        <div className='checkout__button'>
                            <button className='checkout__btn'><img src={Button} alt="" /></button>
                            <img className='checkout__image2' src={Visa} alt="" />
                        </div>
                        <div className='checkout__button'>
                            <button className='checkout__btn'><img src={Button} alt="" /></button>
                            <h4 className='checkout__sub3-title'>Direct bank transfer</h4>
                        </div>
                        <div className='checkout__button'>
                            <button className='checkout__btn'><img src={Button} alt="" /></button>
                            <h4 className='checkout__sub3-title'>Cash on Delivery</h4>
                        </div>
                        <button className='checkout__btn2' type="submit" disabled={loading}>Place Order</button>
                    </div>
                </form>

                <Like />
                <GreenShop />
            </div>
        </div>
    );
};

export default Checkout;
