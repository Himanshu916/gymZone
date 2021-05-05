import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {useEffect} from "react"
import { Carousel } from 'react-responsive-carousel'
const sportswear  = require('../images/sportswear.jpg');
const gymessentialpath = require("../images/img1.jpg")
const shoespath = require('../images/shoes.jpg')
const supplementspath = require("../images/supplements.jpg");
const foodanddrinkpath = require("../images/foodanddrink.jpg");
import {Link} from "react-router-dom"
export default function Home()
{
    
    return (
        <>
       
    <Carousel>
        <div className="carousel-item">
            <img  src={sportswear.default} alt="" />
            <p className="legend">SportsWears</p>
            <div className="content">
                <h3>Latest Sports Wear</h3>
                <p> himanshuhuf3ernme</p>
                <Link to="/sports">
                <button>Discover</button>
                </Link>
               
            </div>

        </div>
        <div className="carousel-item">
            <img src={gymessentialpath.default} alt=""/>
            <p className="legend">GymEssentials</p>
            <div className="content">
                <h3 style={{color:"#666"}}>Latest Sports Wear</h3>
                <p style={{color:"#666"}}>jfhehrhewjhr23juiui23jdnjhru32j </p>
                <Link to="/gym">
                <button>Discover</button>
                </Link>
            </div>
        </div>
        <div className="carousel-item">
            <img src={shoespath.default} alt=""/>
            <p className="legend">Shoes</p>
            <div className="content">
                <h3>Trending Shoes</h3>
                <p>himanshuhuf3ernme</p>
                <Link to="/shoes">
                <button>Discover</button>
                </Link>
            </div>
        </div>
        <div className="carousel-item">
            <img src={supplementspath.default} alt=""/>
            <p className="legend">Supplements</p>
            <div className="content">
                <h3>Get Fuel</h3>
                <p> himanshuhuf3ernme</p>
                <Link to="/supplements">
                <button>Discover</button>
                </Link>
            </div>
        </div>
        <div className="carousel-item">
            <img src={foodanddrinkpath.default} alt=""/>
            <p className="legend">Food And Drink</p>
            <div className="content">
                <h3>Eat Healthy</h3>
                <p> himanshuhuf3ernme</p>
                <Link to="/foodanddrink">
                <button>Discover</button>
                </Link>
            </div>
        </div>
    </Carousel>
    </>

    )
}

