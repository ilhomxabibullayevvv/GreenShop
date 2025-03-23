import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axios from 'axios';
import './Categories.css';
import { useCart } from '../../context/CartContext';
import Flower from '../../assets/image/flower8.png';
import Down from '../../assets/icon/down.svg';
import Cart from '../../assets/icon/cart.svg'
import Like from '../../assets/icon/like.svg'
import Search from '../../assets/icon/search.svg'
import Right from '../../assets/icon/right.svg'
import Left from '../../assets/icon/left.svg'

interface Product {
    id: number;
    name: string;
    price: number;
    pictures: string;
    description: string;
}

interface ApiResponse {
    products: Product[];
    count: number;
}

const Categories = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 9;

    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 39, max: 1230 });
    const [minPrice, setMinPrice] = useState<number>(39);
    const [maxPrice, setMaxPrice] = useState<number>(1230);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<ApiResponse>(`https://www.e-commerce-api-v3.nt.azimumarov.uz/api/v1/products?page=${currentPage}&limit=${productsPerPage}`);
                const { products, count } = response.data;
                setProducts(products);
                setCount(count);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProducts();
    }, [currentPage, priceRange]);

    const filteredProducts = products.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );

    const totalPages = Math.ceil(count / productsPerPage);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            picture: product.pictures,
            quantity: 1,
        });
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < 3) {
            startPage = Math.max(1, endPage - 3);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="categories">
                <div className="container categories__container">
                    <div className="categories__content">
                        <ul className="categories__list">
                            <h3 className="categories__title">Categories</h3>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">House Plants</h4>
                                <p className='categories__number'>(33)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Potter Plants</h4>
                                <p className='categories__number'>(12)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Seeds</h4>
                                <p className='categories__number'>(65)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Small Plants</h4>
                                <p className='categories__number'>(39)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Big Plants</h4>
                                <p className='categories__number'>(23)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Succulents</h4>
                                <p className='categories__number'>(17)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Terrariums</h4>
                                <p className='categories__number'>(19)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Gardening</h4>
                                <p className='categories__number'>(13)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Accessories</h4>
                                <p className='categories__number'>(18)</p>
                            </li>
                            <h3 className='categories__title2'>Price Range</h3>
                            <li className='categories__item'>
                                <p className='categories__price'>
                                    Price: <span className='categories__span'>${minPrice} - ${maxPrice}</span>
                                </p>
                            </li>
                            <li className='categories__item'>
                                { }
                                <div className="price-range">
                                    <input
                                        type="range"
                                        min="39"
                                        max="1230"
                                        value={minPrice}
                                        onChange={(e) => {
                                            setMinPrice(Number(e.target.value));
                                            setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }));
                                        }}
                                        className="price-range__slider"
                                    />
                                    <span>${minPrice}</span>
                                </div>
                            </li>
                            <li className='categories__item'>
                                <button className='categories__btn'>Filter</button>
                            </li>
                            <h3 className="categories__title2">Size</h3>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Small</h4>
                                <p className='categories__number'>(119)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Medium</h4>
                                <p className='categories__number'>(86)</p>
                            </li>
                            <li className="categories__item">
                                <h4 className="categories__sub-title">Large</h4>
                                <p className='categories__number'>(78)</p>
                            </li>
                        </ul>
                        <div className='categories__card'>
                            <h2 className='categories__name'>Super Sale</h2>
                            <p className='categories__percentage'>UP TO 75% OFF</p>
                            <img className='categories__image' src={Flower} alt="Super Sale" />
                        </div>
                    </div>
                    <div className='categories__content'>

                        <ul className='categories__list2'>
                            <li className='categories__itme2'>
                                <NavLink className='categories__link' to=''>All Plants</NavLink>
                                <NavLink className='categories__link' to=''>New Arrivals</NavLink>
                                <NavLink className='categories__link' to=''>Sale</NavLink>
                            </li>
                            <div className='categories__block'>
                                <h4 className='categories__sub2-title'>Short by:</h4>
                                <h4 className='categories__sub2-title'>Default sorting</h4>
                                <button className='categories__btn2'><img src={Down} alt="Sort" /></button>
                            </div>
                        </ul>
                        <ul className="categories__products">
                            {filteredProducts.length > 0 && filteredProducts.map((product) => (
                                <li key={product._id} className="categories__card2">
                                    <NavLink
                                        className="categories__link"
                                        to={`/productDetails/${product._id}`}
                                    >
                                        <img className="categories__image2" src={product.pictures} alt={product.name} />
                                    </NavLink>
                                    <div className='categories__icon'>
                                        <button className='categories__btn-icon'>
                                            <img src={Cart} alt="Cart" onClick={() => handleAddToCart(product)} />
                                        </button>
                                        <button className='categories__btn-icon'>
                                            <img src={Search} alt="Search" />
                                        </button>
                                        <button className='categories__btn-icon'>
                                            <img src={Like} alt="" />
                                        </button>
                                    </div>
                                    <h4 className="categories__sub-title">{product.name}</h4>
                                    <p className="categories__price">${product.price}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="categories__button">
                            <button
                                className="categories__btn3"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                <img src={Left} alt="Previous" />
                            </button>
                            {getPageNumbers().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`categories__btn3 ${currentPage === pageNumber ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                className="categories__btn3"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                <img src={Right} alt="Next" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
