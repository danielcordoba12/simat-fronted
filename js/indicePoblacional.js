

const listarGenerosIntituciones = async () => {

    try{
        const response = await axios.get('https://simat-back-end.onrender.com/indice_poblacional/listar')
        const dataResponse = response.data;


        const response2 = await axios.get('https://simat-back-end.onrender.com/indice_poblacional/listar_estudiantes_formacion');

        const dataResponse2 = response2.data;

        editarInfoIndicePoblacion(dataResponse, dataResponse2);
        listarEstudiantesMatriculados();
        
    }catch (error) {
        console.error('Error al listar la informacion de los generos en las instituciones',error);
        
    }

}

const editarInfoIndicePoblacion = async (response, response2) => {

    
    // if (response.legth < 0 || !response2.legth < 0) {
        try {
            await axios.post('https://simat-back-end.onrender.com/excel/editar', { response, response2 });
            console.log("Datos enviados al servidor para editar el archivo Excel.");
        } catch (error) {
            console.error("Error al enviar los datos al servidor", error);
        }
    // } else {
        console.error("No se ha podido modificar la informacion del excel.");
    // }

}


document.getElementById('indice-btn').addEventListener('click', () => {
    listarGenerosIntituciones();
})


const listarEstudiantesMatriculados = async () => {
    try {
        const response = await axios.get('https://simat-back-end.onrender.com/indice_poblacional/listar_matriculados');
        const dataResponse = response.data;

        try {
            // Realizar la solicitud de edición y recibir el archivo como blob
            const fileResponse = await axios.post('https://simat-back-end.onrender.com/excel/editar_matriculados', { dataResponse }, {
                responseType: 'blob',  // Indica que la respuesta será un archivo (blob)
            });

            // Crear un enlace temporal para descargar el archivo
            const blob = fileResponse.data;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'indice_poblacion_modificado.xlsx';
            link.click();

            console.log("Archivo Excel creado y descargado.");

        } catch (error) {
            console.error("Error al enviar los datos al servidor", error);
        }

    } catch (error) {
        console.error('Error al listar la informacion de los generos en las instituciones', error);
    }
};
