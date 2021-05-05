import {Link} from "react-router-dom"
const Navigation = ()=>
{
    return(
        <>
        <div  className="navigation sticky">
      
            <ul className="navigation--list">
                <Link style={{textDecoration:"none",color:"white"}} to="sports"><li>Sports Wear</li></Link>
                <Link style={{textDecoration:"none",color:"white"}} to="gym"><li>Gym Essentials</li></Link>
                <Link style={{textDecoration:"none",color:"white"}} to="shoes"><li>Shoes</li></Link>
                <Link style={{textDecoration:"none",color:"white"}} to="supplements"><li>Supplements</li></Link>
                <Link style={{textDecoration:"none",color:"white"}} to="foodanddrink"><li>Food And Drink</li></Link>
            </ul>
        </div>
        </>

    )
}
export default Navigation