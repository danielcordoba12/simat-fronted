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
    
        if (response.ok) {
            const result = await response.text();
            document.getElementById('statusMessage').textContent = result;
        } else {
            console.error('Error en la respuesta:', response.status, response.statusText);
    
            const errorResult = await response.text();
            console.error('Respuesta de error del servidor:', errorResult);
    
            document.getElementById('statusMessage').textContent = `Hubo un error al subir el archivo: ${errorResult}`;
        }
    } catch (error) {
        console.error('Error de red o problemas con fetch:', error);
        document.getElementById('statusMessage').textContent = 'Error al enviar la solicitud. Verifica la consola para más detalles.';
    }
    
});
