// import axios from "axios";
// axios = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
// const institucionSeleccionada = document.getElementById("select-instituciones");


    // let selectedValue = "";

    // document.addEventListener('DOMContentLoaded', () => {
    //     const institucionSeleccionada = document.getElementById("select-instituciones");
        
    //     institucionSeleccionada.addEventListener('change', () => {
    //         selectedValue = institucionSeleccionada.value;
    //         listarSedes(selectedValue);

    //     });
    // });
    let selectedValue = null; // Inicia selectedValue como null

    document.addEventListener('DOMContentLoaded', () => {

        let institucionSeleccionada = document.getElementById("select-instituciones");
    
        institucionSeleccionada.addEventListener('change', () => {
            // Borra el valor anterior
            selectedValue = null;
    
            // Asigna el nuevo valor seleccionado
            selectedValue = institucionSeleccionada.value;
    
            // Llama a la función para listar las sedes con el nuevo valor
            console.log("selec value",selectedValue);
            
            listarSedes(selectedValue);
        });
    });

    const listarSedes = async (institucionSeleccionada) => {
        
        if (!institucionSeleccionada) {
            console.log("No se seleccionó una institución, inicializando con valor vacío.");
            return; // Detiene la ejecución si `institucionSeleccionada` es vacío o undefined
        }

        try {
            const response = await axios.get(`https://simat-back-end.onrender.com//sedes/listar/${institucionSeleccionada}`);
            // console.log("esta es la respuesta xd", response.data);
            
            const sedes = response.data;
            // console.log("sedes", sedes);
            
            // console.log( "este es la info que se va a enviar a la funcion desde frontend a backend ",sedes, "y es de tipo", typeof(sedes)), "y este es el tipo", typeof(sedes); // Aquí puedes manejar los datos obtenidos
            return listarInfoSedes(sedes);
        } catch (error) {
            console.error("Error fetching sedes", error);
        }

    }
    let infoSedes = []


    const listarInfoSedes = async (sedes) => {
    
        infoSedes = []
    
        for (let i = 0; i < sedes.length; i++) {
            try {
                const response = await axios.get(`https://simat-back-end.onrender.com//sedes/sedes/${sedes[i].SEDE}`);
                infoSedes.push(response.data);  // Guardar los datos en infoSedes
                console.log(`Información de la sede ${sedes[i].SEDE} añadida a infoSedes.`);
                console.log("infosedes",infoSedes);
                // console.log("Estas son las sedes", sedes);
                
            } catch (error) {
                console.error(`Error al listar la información de la sede ${sedes[i].SEDE}:`, error);
            }
            
        }
        // console.log("Estas son las sedes",infoSedes);
        // console.log("");
        // console.log("Este es el valor final  de infosedes",infoSedes[0][1].femenino);


    
        // Una vez que todas las sedes han sido listadas, llama a createExcelFile()
        // createExcelFile(infoSedes);
        
    };
    const createExcelFile = async (infoSedes) => {
        console.log("Listando información de sedes desde crear archivo:", infoSedes);
    
        if (infoSedes.length > 0) {
            try {
                // Realizar la solicitud y obtener la respuesta como un blob (archivo)
                const response = await axios.post('https://simat-back-end.onrender.com/excel/crear', { infoSedes, selectedValue }, {
                    responseType: 'blob',  // Indica que la respuesta será un archivo (blob)
                });
    
                // Crear un enlace temporal para descargar el archivo
                const blob = response.data;  // El archivo en formato blob
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);  // Crea una URL para el blob
                link.download = `${selectedValue}.xlsx`;  // Nombre del archivo que se descargará
                link.click();  // Inicia la descarga
    
                console.log("Archivo Excel creado y descargado.");
    
            } catch (error) {
                console.error("Error al enviar los datos al servidor", error);
            }
        } else {
            console.error("No se ha podido obtener la información de ninguna sede.");
        }
    }
    
    // Evento para disparar la descarga
    document.getElementById('dowloan-btn').addEventListener('click', () => {
        createExcelFile(infoSedes);
    });
    

    



    



