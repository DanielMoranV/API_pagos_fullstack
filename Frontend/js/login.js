let token = JSON.parse(localStorage.getItem("token.users")) ?? [];
console.log(token)

const email = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const login = document.getElementById("login");
const register = document.getElementById("register");


login.onclick = function(){
    const textEmail = email.value
    const textPassword = password.value
    const user = {
        "email": textEmail,
        "password": textPassword
    }
    Login(user);
}

register.onclick = function(){
    window.location.href="register.html"
}

async function Login(user){
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/users/login/",
            {
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(user),
            })
            const data = await response.json();

            if (token !== []){
                token = [];
                localStorage.removeItem("token.users")
            }
            token.push(data.tokens);
            token.push({username:data.username});
            
            if (token.length === 0 || data.message === "Correo inválido o contraseña incorrecta"){
                Swal.fire({
                    icon:"error",
                    title: 'Oops...',
                    text: "Correo inválido o contraseña incorrecta!"
                })
                
            }else{
                window.location.href="home.html"
            }
            localStorage.setItem("token.users",JSON.stringify(token));
        } catch (error) {
            console.log(error)
        }
}