import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import routes from '../routes';

const Signup = () => {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Debe tener al menos 3 caracteres')
      .max(20, 'Debe tener máximo 20 caracteres')
      .required('El nombre de usuario es obligatorio'),

    password: Yup.string()
      .min(6, 'Debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('Debes confirmar la contraseña'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError(null);

    try {
      const { username, password } = values;

      // 👉 Llamada al backend para registrar usuario
      const response = await axios.post(routes.signupPath(), { username, password });

      // 👉 Iniciar sesión automáticamente después de registrarse
      auth.logIn(username, password);

      // 👉 Redirigir al chat
      navigate('/', { replace: true });

    } catch (error) {
      if (error.response?.status === 409) {
        setServerError('Este nombre de usuario ya está en uso.');
      } else {
        setServerError('Error al registrar. Intenta nuevamente.');
      }
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Registro</h1>

      {serverError && (
        <div style={{ color: 'white', backgroundColor: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          {serverError}
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

            <div>
              <label>Confirmar contraseña:</label>
              <Field type="password" name="confirmPassword" disabled={isSubmitting} />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Signup;
