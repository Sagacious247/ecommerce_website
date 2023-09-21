import React, { useEffect } from 'react';
import { Product, Slider } from '../../components';

function Home() {
    const url = window.location.href;

    const scrollToProducts = () => {
        if(url.includes("#product")) {
            window.scrollTo({
                top: 700,
                behavior: "smooth"
            })
            return
        }
    }

    useEffect(() => {
        scrollToProducts()
    }, [])
    return (
        <div>
           <Slider/>
           <Product/>
        </div>
    );
}

export default Home;