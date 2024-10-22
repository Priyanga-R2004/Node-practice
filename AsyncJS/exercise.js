
async function movie(){
 try{
    const customer=await getCustomer(1);
    console.log('Customer: ', customer);
    if(customer.isGold)
    {
        const movies=await getTopMovies();
        console.log('Top movies: ', movies);
        const email=await sendEmail(customer.email,movies);
        console.log('Email sent...')
    }
   }
   catch(err)
   {
    console.log(new Error('error occured'));
   }

}
console.log('before');
movie();
console.log('after');


function getCustomer(id) {

    return new Promise ((resolve,reject)=>{ 
    setTimeout(() => {
       
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000); 
}) 
}

function getTopMovies() {
    return new Promise ((resolve,reject)=>{ 
    setTimeout(() => {
        
      resolve(['movie1', 'movie2']);
    }, 4000);
});
  }
  

  function sendEmail(email, movies) {
    return new Promise ((resolve,reject)=>{ 
    setTimeout(() => {
        
      resolve();
    }, 4000);
});
  }