export default function toBase64(input) {
    if (typeof input === 'string') {
        // Si es una cadena, simplemente devuelve la cadena
        return input;
    } else if (input instanceof Blob) {
        // Si es un Blob, convierte el Blob a base64 y lo devuelve
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
    };
        reader.onerror = reject;
        reader.readAsDataURL(input);
        });
    } else {
        // Maneja otros tipos de entrada según sea necesario
        console.error('Tipo de entrada no válido');
        return null; // Otra opción: throw new Error('Tipo de entrada no válido');
    }
}