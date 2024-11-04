import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const USDT_CONTRACT_ADDRESS = "0x58efE15C0404aB22F87E4495D71f6f2077e862bE"; 
const USDT_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
];

function EstadoCuenta() {
    const [balance, setBalance] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Solicita conexión a Metamask
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner();
                
                const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
                
                const address = await signer.getAddress();
                const balanceInWei = await usdtContract.balanceOf(address);
                const balanceInUSDT = ethers.utils.formatUnits(balanceInWei, 6); // Formato USDT (6 decimales)
                
                setBalance(balanceInUSDT);
            } catch (error) {
                alert("Error al conectar con Metamask o al obtener saldo")
                console.error("Error al conectar con Metamask o al obtener saldo:", error);
            }
        } else {
            alert("Por favor, instala Metamask");
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    return (
        <div>
            <h2>Estado de Cuenta</h2>
            {balance !== null ? (
                <p>Saldo de USDT: {balance}</p>
            ) : (
                <p>Conectando a Metamask...</p>
            )}
        </div>
    );
}

export default EstadoCuenta;