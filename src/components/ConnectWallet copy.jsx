import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

function ConnectWallet() {
    const [ethAccount, setEthAccount] = useState(null);
    const [solanaAccount, setSolanaAccount] = useState(null);

    // Conectar a Metamask (Ethereum)
    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setEthAccount(accounts[0]);
            } catch (error) {
                console.error("Error connecting to Metamask", error);
            }
        } else {
            alert("Metamask not installed!");
        }
    };

    // Conectar a Phantom (Solana)
    const connectPhantom = async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                setSolanaAccount(response.publicKey.toString());
            } catch (error) {
                console.error("Error connecting to Phantom wallet", error);
            }
        } else {
            alert("Phantom wallet not installed!");
        }
    };

    return (
        <div>
            <h2>Connect Wallets</h2>
            <button onClick={connectMetamask}>
                {ethAccount ? `Metamask: ${ethAccount}` : 'Connect Metamask'}
            </button>
            <button onClick={connectPhantom}>
                {solanaAccount ? `Phantom: ${solanaAccount}` : 'Connect Phantom'}
            </button>
        </div>
    );
}

export default ConnectWallet;
