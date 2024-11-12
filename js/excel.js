const ExcelJS = require('exceljs');



async function createExcelFile() {
    if (!infoSedes || infoSedes.length === 0) {
        return res.status(400).json({ error: "No se han proporcionado datos de sedes" });
    }
    // const sedes = global.infoSedes;      
    const workbook = new ExcelJS.Workbook();


    const worksheet = workbook.addWorksheet('Personas');
    const dateFull =  new Date();
    const year = dateFull.getFullYear();

    worksheet.columns = [
        { header: '', key: '', width: 15 },
        { header: '', key: '', width: 15 },
        { header: '', key: '', width: 9 },
        { header: '', key: '', width: 19 }
    ];

    worksheet.mergeCells('A1:D2');
    worksheet.mergeCells('A6:B6');
    worksheet.mergeCells('A10:B10');

    const celdas = ['A3','A4','A5','A6','A10','C3','D3']

    
    // Definir ancho de columnas
    worksheet.getCell('A1').value = 'Institucion'
    worksheet.getCell('A3').value = 'AÑO'

    worksheet.getCell('A4').value = 'SEDE'
    worksheet.getCell('B4').value = 'INGRESAR SEDE'

    worksheet.getCell('A5').value = 'ZONA'
    worksheet.getCell('B5').value = 'RURAL'


    worksheet.getCell('A6').value = 'ESTADO'

    worksheet.getCell('A7').value = 'MATRICULADO'
    worksheet.getCell('B7').value = 'N° MATRICULADOS'


    worksheet.getCell('A8').value = 'REPROBADO'
    worksheet.getCell('B8').value = 'N° REPROBADOS'

    worksheet.getCell('A9').value = 'RETIRADO'
    worksheet.getCell('B9').value = 'N° RETIRADOS'

    worksheet.getCell('A10').value = 'GENERO'

    worksheet.getCell('A11').value = 'MASCULINO'
    worksheet.getCell('B11').value = 'N° FEMENINO'

    worksheet.getCell('A12').value = 'FEMENINO'
    worksheet.getCell('B12').value = 'N° FEMENINO'



    worksheet.getCell('B3').value = year
    worksheet.getCell('C3').value = 'GRADO'
    worksheet.getCell('C4').value = '00°'
    worksheet.getCell('C5').value = '01°'
    worksheet.getCell('C6').value = '02°'
    worksheet.getCell('C7').value = '03°'
    worksheet.getCell('C8').value = '04°'
    worksheet.getCell('C9').value = '05°'
    worksheet.getCell('C10').value = '06°'
    worksheet.getCell('C11').value = '07°'
    worksheet.getCell('C12').value = '08°'
    worksheet.getCell('C13').value = '09°'
    worksheet.getCell('C14').value = '10°'
    worksheet.getCell('C15').value = '11°'


    worksheet.getCell('D3').value = 'TOTAL POR GRADO'
    worksheet.getCell('D4').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D5').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D6').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D7').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D8').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D9').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D10').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D11').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D12').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D13').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D14').value = 'Nº ESTUDIANTES'
    worksheet.getCell('D15').value = 'Nº ESTUDIANTES'

    
    const centrarCeldas = ["A1","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","C3" ,"C4", "C5", "C6","C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15",];


    // Agregar datos en filas específicas
    // worksheet.addRow({ nombre: 'Ana', edad: 25, ciudad: 'Madrid' });
    // worksheet.addRow({ nombre: 'Luis', edad: 30, ciudad: 'Barcelona' });

    // Combinar celdas A1 y B1



    // Cambiar el estilo de letra en la celda A1

    celdas.forEach(cell => {
        worksheet.getCell(cell).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C6E0B4' }  
        };

    })

    centrarCeldas.forEach(cell => {
        worksheet.getCell(cell).alignment={
            vertical: 'middle',
            horizontal: 'center'
        }
    })
    
    // Cambiar el estilo de letra en la celda C1
    worksheet.getCell('C1').font = {
        name: 'Calibri',
        size: 12,
        color: { argb: '0000' },  // Color azul
        italic: true                // Cursiva
    };
    // Aplicar bordes negros a todas las celdas de un rango
    const range = ['A3', 'A4', 'A5', 'A6', 'A7',, 'A8', 'A9', 'A10', 'A11', 'A12', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15'];

    range.forEach(cell => {
        worksheet.getCell(cell).border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        };
    });


    // Guardar el archivo Excel
    await workbook.xlsx.writeFile('archivo.xlsx');
    console.log('Archivo creado exitosamente.');
    console.log('este es info sedes', sedes);

}

createExcelFile();