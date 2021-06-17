const users = [
    {
        userName:"himanshu",
        password:"rana"

    },
    {
        userName:"aditi",
        password:"jaiswal"
    },
    {
        userName:"pratham",
        password:"sharma"

    }
]

const findByUserName=(userName)=>
{
    return users.find(user=>user.userName ===userName)
}


export const fakeauthapi = (userName,password)=>
{
    console.log(userName,"himanh")
    const user = findByUserName(userName);
    console.log(user)
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>
        {
            const user = findByUserName(userName);
            console.log(user)
            if(user?.password === password)
            {
                resolve({success:true,status:200,token:"himanshu"})
            }
            reject({sucess:false,status:400})
        },3000)
    })

}