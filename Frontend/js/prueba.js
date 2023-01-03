function prueba(){
    Swal.fire({
        icon:"success",
        title: 'Registrado',
        text: "Usuario registrado correctamente",
        showConfirmButton: false,
    })

    setTimeout("location.href='index.html'", 3000);
}
prueba()