document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    console.log("fileInput", fileInput.files);
    console.log("file", file);
    
    

    if (!file) {
        document.getElementById('statusMessage').textContent = 'Por favor, selecciona un archivo';
        return;
    }

    const formData = new FormData();
    formData.append('archivo', file);
    try {
        const response = await fetch('https://simat-back-end.onrender.com/archivo/upload', {
            method: 'POST',
            body: formData,
        });
    
        // Verificar si la respuesta fue exitosa (status 200-299)
        if (response.ok) {
            const result = await response.text();
            document.getElementById('statusMessage').textContent = result;
        } else {
            // Si la respuesta no es exitosa, mostrar el código de estado
            console.error('Error en la respuesta:', response.status, response.statusText);
            const result = await response.text();
            document.getElementById('statusMessage').textContent = `Hubo un error al subir el archivo: ${result}`;
        }
    } catch (error) {
        // Capturar errores de la red (por ejemplo, problemas de conexión)
        console.error('Error de red o problemas con fetch:', error);
        document.getElementById('statusMessage').textContent = 'Error al enviar la solicitud. Verifica la consola para más detalles.';
    }
});
