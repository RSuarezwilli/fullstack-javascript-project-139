import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// *** Importaciones necesarias para la autorización ***
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Importar el hook de autenticación

const Login = () => {
  // Estado local para manejar el error de la solicitud de login (del servidor)
  const [loginError, setLoginError] = useState(null);
  
  // Obtener funciones del contexto de autenticación y navegación
  const auth = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: 'admin', // Puedes dejar el valor predeterminado para facilitar las pruebas
    password: 'admin', // Puedes dejar el valor predeterminado para facilitar las pruebas
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

 
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError(null); // Limpiar errores previos
    
    try {
      // 1. Llamar a la función logIn del contexto (que hace la petición a la API,
      //    guarda el token y actualiza el estado `loggedIn`).
      const success = await auth.logIn(values.username, values.password);
      
      if (success) {
        // 2. Redirigir al chat (/) después del éxito
        navigate('/', { replace: true });
      }
      
    } catch (error) {
      // 3. Manejar el error de autorización
      if (error.response?.status === 401) {
        // Este es el error específico de credenciales incorrectas
        setLoginError('Nombre de usuario o contraseña incorrectos.');
      } else if (axios.isAxiosError(error) && !error.response) {
        // Error de red
        setLoginError('Error de red. Asegúrate de que el servidor esté funcionando.');
      } else {
        // Otro tipo de error
        setLoginError('Ocurrió un error desconocido durante el inicio de sesión.');
      }
      console.error('Error de login:', error);

    } finally {
      // 4. Detener el estado de envío del formulario
      setSubmitting(false);
    }
  };
  // *** FIN FUNCIÓN HANDLE SUBMIT MODIFICADA ***

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {/* Mostrar error si existe */}
      {loginError && (
        <div style={{ color: 'white', backgroundColor: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          {loginError}
        </div>
      )}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => ( // Recibe el estado de envío de Formik
          <Form>
            <div>
              <label>Nombre de usuario:</label>
              <Field type="text" name="username" disabled={isSubmitting} />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Contraseña:</label>
              <Field type="password" name="password" disabled={isSubmitting} />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;