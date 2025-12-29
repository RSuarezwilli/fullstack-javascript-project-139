import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { useAuth } from '../components/AuthContext';

const Login = () => {
  const [loginError, setLoginError] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: 'admin',
    password: 'admin',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError(null);

    try {
      const success = await auth.logIn(values.username, values.password);

      if (success) {
        navigate('/', { replace: true });
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setLoginError('Nombre de usuario o contraseña incorrectos.');
      } else if (axios.isAxiosError(error) && !error.response) {
        setLoginError('Error de red. Asegúrate de que el servidor esté funcionando.');
      } else {
        setLoginError('Ocurrió un error desconocido durante el inicio de sesión.');
      }

      console.error('Error de login:', error);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>

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
        {({ isSubmitting }) => (
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

      <p>
        ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
