import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com'); // Usar devnet para pruebas

async function connectSolanaWallet() {
    try {
        const response = await window.solana.connect();
        console.log("Connected to Solana wallet:", response.publicKey.toString());
    } catch (error) {
        console.error("Error connecting to Solana", error);
    }
}