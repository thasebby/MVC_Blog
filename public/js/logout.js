import $ from "./utils/jQuery.js"

// connect to the log out button
let logOutBtn = $('#logout')

const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/');
    }
    else{
        alert(response.statusText);
    }
};

// event listener
logOutBtn.on('click', logout);