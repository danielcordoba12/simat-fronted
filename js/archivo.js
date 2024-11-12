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
        const response = await fetch('http://localhost:4000/archivo/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.text();
            document.getElementById('statusMessage').textContent = result;
        } 
        else {
            document.getElementById('statusMessage').textContent = 'Hubo un error al subir el archivo';
        }
    } catch (error) {   
        console.error('Error:', error);
        document.getElementById('statusMessage').textContent = 'Error al enviar la solicitud';
    }
});
