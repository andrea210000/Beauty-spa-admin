export interface ClientesResponseDto { //de esta forma podremos importar este "DTO" a archivos externos
//Creamos un dto interno para que pueda el frontend puedo identificar como son y de que tipo son los datos que vienen de la API
    idCliente: number;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    idTipoIdentificacion: number;
    numeroIdentificacion: string;
    idUsuario: number;
    fechaRegistro: string;
    estado: number;
    idRol: number;
}