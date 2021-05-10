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


const fakeauthapi = (userName,password)=>
{
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>
        {
            const user = findByUserName(userName);
            if(user.password === password)
            {
                resolve({success:true,status:200})
            }
            reject({sucess:false,status:400})
        },3000)
    })

}