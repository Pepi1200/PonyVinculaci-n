import Cookies from 'universal-cookie';

export default function LogOut() {
  const cookies = new Cookies(null, { path: '/' });

  // Elimina la cookie 'userType'
  cookies.remove('userType');

  // recargar la página
  window.location.reload();

  // Redirige a la página principal
  window.location.href = '/';
}
