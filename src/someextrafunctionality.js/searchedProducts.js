export const getSearchedProducts=(products,stringv)=>
{
    console.log("sss",stringv)
    if(stringv === "")
    return products
    else
    {
        const searched = products.filter(item=> item.text.toLowerCase().includes(stringv.toLowerCase()));
        return searched
    }

}