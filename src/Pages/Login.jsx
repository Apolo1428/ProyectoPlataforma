import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import Image from '../logoAgropagos.png';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Consultar si el usuario y la contraseña existen en la colección
        const q = query(collection(db, "Usuarios"), where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            
            navigate('/dashboard');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        alert('Error al iniciar sesión');
        console.error("Error al iniciar sesión:", error);
    }
};
  const goToRegister = () => {
    navigate('/Register');
    };
  return (
    <div className='login-wrapper'>
        <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Usuario:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Nombre usuario'
            />
            </div>
            <div className="form-group">
            <label>Contraseña:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
            ¿No tienes cuenta? <span onClick={goToRegister} className="link">Regístrate</span>
        </p>
        </div>
        <div className="Mensaje">
            <h2>Agropagos</h2>
            <p>Esta plataforma te ayuda realizar pagos personalizados.</p>
            <img src={Image} width="400"></img>
        </div>
    </div>
  );
};

export default Login;
