import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js'; // Importa la biblioteca crypto-js

export default function setCookieUser({tipoUsuario}) {
  const cookies = new Cookies(null, { path: '/' });

  // Valor a encriptar
  const userValue = tipoUsuario;

  // Clave secreta para la encriptación. Mantén esto seguro.
  const secretKey = 'clave';

  // Encripta el valor
  const encryptedUserValue = CryptoJS.AES.encrypt(userValue, secretKey).toString();

  // Guarda el valor en la cookie
  cookies.set('userType', encryptedUserValue);

  // Recupera el valor de la cookie y desencripta
  const storedUserValue = cookies.get('userType');
  if (storedUserValue) {
    const decryptedUserValue = CryptoJS.AES.decrypt(storedUserValue, secretKey).toString(CryptoJS.enc.Utf8);
    console.log(decryptedUserValue);
  }
}
