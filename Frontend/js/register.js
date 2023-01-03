const user = document.getElementById("userInput");
const email = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const atras = document.getElementById("atras");
const register = document.getElementById("register");

register.onclick = function(){
    const textUser = user.value
    const textEmail = email.value
    const textPassword = password.value
    let data = {
        "username" : textUser,
        "email": textEmail,
        "password": textPassword
    }
    console.log(data)
    SignIn(data);
}

atras.onclick = function(){
    window.location.href="index.html"
}

async function SignIn(user){
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/users/signup/",
            {
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(user),
            })
            const data = await response.json();
            const textError = 'This field may not be blank.'
            const userError = 'This field is required.'
       
            if( textError == data.email || textError == data.password || userError == data.user){
                Swal.fire({
                    icon:"error",
                    title: 'Oops...',
                    text: "Ingrese todos los datos correctamente"
                })
            } else{
                Swal.fire({
                    icon:"success",
                    title: 'Registrado',
                    text: "Usuario registrado correctamente",
                    showConfirmButton: false,
                })
                setTimeout("location.href='index.html'", 3000);
            }
            

            
        } catch (error) {
            console.log(error)
    }
}