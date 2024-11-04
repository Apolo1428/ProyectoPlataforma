import React, { useState } from 'react';
import EstadoPagos from './EstadoPagos';
import ProgramarPago from './ProgramarPago';
import EstadoCuenta from './EstadoCuenta';
import Inicio from './Inicio';
import '../App.css'
import { FaHome } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa';
import { FaListUl} from 'react-icons/fa';
import { FaWallet} from 'react-icons/fa';
import Navbar from '../components/Navbar';


const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState('Estado de pagos');

    const renderContent = () => {
        switch (selectedOption) {
            case 'Inicio':
                return <Inicio/>
            case 'Estado de pagos':
                return <EstadoPagos />;
            case 'Programar pago':
                return <ProgramarPago />;
            case 'Estado de cuenta':
                return <EstadoCuenta />;
            default:
                return <Inicio />;
        }
    };
    return (
            <div><Navbar></Navbar>
            <div className="flex">
                <div className="sidebar">
                    <ul>
                        <li onClick={() => setSelectedOption('Inicio')}>
                            <FaHome className = 'iconoSB'></FaHome>
                            <a>Inicio</a>
                        </li>
                        <li onClick={() => setSelectedOption('Estado de pagos')}>
                            <FaListUl className = 'iconoSB'></FaListUl>
                            <a>Estado de pagos
                            </a>
                        </li>
                        <li onClick={() => setSelectedOption('Programar pago')}>
                            <FaCreditCard className = 'iconoSB'></FaCreditCard>
                            <a>Programar pago
                            </a>
                        </li>
                        <li onClick={() => setSelectedOption('Estado de cuenta')}>
                            <FaWallet className = 'iconoSB'></FaWallet>
                            <a>Estado de cuenta
                            </a>
                        </li>
                    </ul>
                </div>
                <div className = "content" id = "contenedor">
                    {renderContent()}
                </div>
            </div>
            </div>
    )
};

export default Dashboard;
