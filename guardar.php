<?php
$conexion = mysqli_connect("localhost", "akairos", "Comandoazul28", "RegistrosAkairos");
//if (!$conexion) {
// echo 'Error al conectar a la base de datos';
//}
//else {
//   echo 'conectado a la base datos';
//}


//recibir los datos y almacenarlos en variables
$destino= "a.rivera@akairos.co";
$nombre = $_POST["nombre"];
$telefono = $_POST["telefono"];
$correo = $_POST["correo"];
$mensaje = $_POST["mensaje"];
$contenido = "Nombre: " . $nombre . "\nTelefono: " . $telefono . "\nCorreo: " . $correo . "\nMensaje: " .$mensaje;
mail($destino, "Contacto", $contenido);

//consulta para insertar
$insertar = "INSERT INTO datos(nombre, telefono, email, mensaje) VALUES ('$nombre', '$telefono', '$correo', '$mensaje')";

if ($conexion->query($insertar) === TRUE) {
    header("Location:index.html");
 // echo "informacion insertada";
//} else {
// echo "Error inserccion: " . $conexion->error;
}   
mysqli_close($conexion);    
    
?> 

