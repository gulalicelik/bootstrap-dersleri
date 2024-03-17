const myLoginForm = document.getElementById('myLoginForm');

myLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const rememberMe = document.getElementById('exampleCheck1').checked;
    if (validateLoginForm(username, password)) {
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
        fetch('https://dummyjson.com/auth/login', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                username : username,
                password : password,
                // expiresInMins: 60, // optional
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('Invalid username or password');
                }
            })
            .then(data => {alert(`Giriş başarılı. Name: ${data.firstName}`)})
            .catch(error => alert(error))
    } else {
        alert('Username or password is too short');
    }
});

const validateLoginForm = (username, password) => {
    if (username.length < 3 || password.length < 3) {
        return false;
    }
    return true;
}

window.onload = function () {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
        document.getElementById('username').value = localStorage.getItem('username');
        document.getElementById('exampleInputPassword1').value = localStorage.getItem('password');
    }
}


