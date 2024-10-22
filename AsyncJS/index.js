
/*
console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}

*/


console.log('Before');
getUser(1, handleUser);  // Start by getting the user

function handleUser(user) {          // Renamed from getRepo to avoid recursion issues
    getRepo(user.Username, handleRepos);  // Fetch repositories and handle them
}

function handleRepos(repos) {         // Handle the repos fetched from getRepo
    getCommits(repos, displayCommits);  // Fetch commits and then display them
}

function displayCommits(commits) {     // Function to display the commits
    console.log('Commits:', commits);
}

console.log('After');

// Simulating asynchronous user retrieval
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from db...');
        callback({ id: id, Username: 'priyanga' });
    }, 2000);
}

// Simulating asynchronous repository retrieval
function getRepo(username, callback) {
    setTimeout(() => {
        console.log(`Getting repositories for ${username}...`);
        callback(['repo1', 'repo2']);  // Simulate repositories
    }, 2000);
}

// Simulating asynchronous commit retrieval
function getCommits(repos, callback) {
    setTimeout(() => {
        console.log(`Getting commits for ${repos}...`);
        callback(['commit1', 'commit2']);  // Simulate commits
    }, 2000);
}
