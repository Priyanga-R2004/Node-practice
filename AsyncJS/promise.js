/*const p = new Promise((resolve,reject)=>
{
    setTimeout(()=>{
        //resolve(1);
        reject(new Error('err message'));
    },2000);
}
);

p .then(result=>console.log('Result: ',result))
  . catch(err => console.log('Error: ',err.message));


*/
console.log('Before');
/*
//callback
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
*/

// Promise based approach
/*
const p = getUser(1);
p.then(user => getRepositories(user.gitHubUsername))
.then (repos => getCommits(repos[0]))
.then(commits=>console.log(commits))
.catch(err => console.log('Error:'+ err));
*/

//Async and Await apprach

async function displayCommits(){
    try{
    const user=await getUser(1);
    const repos=await getRepositories(user.gitHubUsername);
    const commits=await getCommits(repos[0]);
    console.log(commits);
    }
    catch(err){
        console.log('Error:'+ err)
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new  Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log('Reading a user from a database...');
    resolve({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
})
}

function getRepositories(username) {
    return new  Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['repo1', 'repo2', 'repo3']);
  }, 2000);})
}

function getCommits(repo) {
    return new  Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['commit']);
  }, 2000);
})
}