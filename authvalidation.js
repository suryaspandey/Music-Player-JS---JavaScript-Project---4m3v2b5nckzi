


// (function(){
//     const hash = window.location.hash;
//     const queryParams = {};

//     hash.split('&').forEach((pair) => {
//     const [key, value] = pair.split('=');
//     queryParams[key] = value;
//     });

//     const accessToken = queryParams["#access_token"];
//     const tokenType = queryParams.token_type;
//     const expiresIn = queryParams.expires_in;

//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('tokenType', tokenType);
//     localStorage.setItem('expiresIn', expiresIn);

//     // localStorage.getItem('accessToken', accessToken);
//     // localStorage.getItem('tokenType', tokenType);
//     // localStorage.getItem('expiresIn', expiresIn);


// })();


// localStorage.getItem('accessToken', accessToken);
// localStorage.getItem('tokenType', tokenType);
// localStorage.getItem('expiresIn', expiresIn);



const isTokenValid = ()=> {
    const expiresIn = localStorage.getItem('expiresIn');
    const expirationTime = new Date(parseInt(expiresIn, 10) * 1000); // Convert expiresIn to milliseconds
    
    // Get the current time
    const currentTime = new Date();

    return currentTime < expirationTime;
}

const isTokenExists = ()=>{
    const expiresIn = localStorage.getItem('expiresIn');
    const accessToken = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType');

    if(tokenType != undefined && accessToken != undefined  && expiresIn != undefined){
        // return true;
        window.location.href = `http://127.0.0.1:5500/index.html?#access_token=${accessToken}&token_type=${tokenType}&expires_in=${expiresIn}`;
    }

    else{
        // return false;

        window.location.href = "./login_page.html";
    }
}


console.log("token exists"+isTokenExists());
// console.log("token valid"+isTokenValid());

isTokenExists();


  

