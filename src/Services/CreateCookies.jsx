import Cookies from 'universal-cookie';

const CreateCookies = async (userData) => {
  const cookies = new Cookies();

  try {
    const response = await fetch('URL_DE_TU_API/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.userData) {
        if (userData.rememberMe) {
          cookies.set('userType', data.userType, { path: '/' });
          cookies.set('userName', data.userName, { path: '/' });
        } else {
          cookies.set('userType', data.userType, { path: '/', expires: new Date(Date.now() + 12 * 60 * 60 * 1000) });
          cookies.set('userName', data.userName, { path: '/', expires: new Date(Date.now() + 12 * 60 * 60 * 1000) });
        }
        // Redirige a la página principal
        window.location.href = '/';
      } else {
        console.log('No se encontraron datos de usuario.');
      }
    } else {
      console.log('Error al enviar los datos de inicio de sesión.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default CreateCookies;
