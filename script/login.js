const btn = document.querySelector('[button]');
btn.addEventListener('click', async function(e){
    e.preventDefault();
    const user = document.querySelector('[username]');
    const pass = document.querySelector('[password]');

    const jss = {
        "username": user.value,
        "email": "email@gm.com",
        "password": pass.value
    };
    
    fetch('http://127.0.0.1:8000/api/Login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jss)
    }).then(async function(response) {
        if (!response.ok) {
            return false;
        }
        return response.json();
    }).then(async function(data) {

        if(data.res == true){
            localStorage.setItem('token', JSON.stringify(data.token));
            window.location.href = "../html/indexSession.html";
        }

    }).catch(function(err) {
        console.error(err);
    });
    
});
