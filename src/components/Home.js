import "react-responsive-carousel/lib/styles/carousel.min.css"; 
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
                <p> The clothing you choose influences your performance on the sports field and in the gym </p>
                <Link to="/sports">
                <button>Discover</button>
                </Link>
               
            </div>

        </div>
        <div className="carousel-item">
            <img src={gymessentialpath.default} alt=""/>
            <p className="legend">GymEssentials</p>
            <div className="content">
                <h3>Latest Sports Wear</h3>
                <p style={{color:"#D1D5DB"}} >“ <span style={{color:"black"}}> There are no <span style={{color:"#D1D5DB"}}>shortcuts </span>   </span>—everything is reps, reps, reps.” – Arnold Schwarzenegger 
                 </p>
                 <p style={{color:"black"}}>What are you waiting for go and checkout your gym essentials.</p>
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
                <p>When life throws you lemons, grab your running shoes.</p>
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
                <p> The best feeling in the world is a hard workout a shower and a protein shake.</p>
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
                <p> “Let go of toxic control, in order to regain healthy control.”
― Kayla Rose Kotecki</p>
<p>Lets Eat Clean</p>
                <Link to="/foodanddrink">
                <button>Discover</button>
                </Link>
            </div>
        </div>
    </Carousel>
    </>
 
    )
}

