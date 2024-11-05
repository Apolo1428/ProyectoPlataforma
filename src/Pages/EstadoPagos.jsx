import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import idl from "./idl.json"; 
import { sendTransaction } from "./sendTransaction";

const PROGRAM_ID = new PublicKey("Fo59t3KKoeP89YRhr1JwriFC796RKskdD1GVBPiUUFWN"); 
const network = "https://api.devnet.solana.com";

const EstadoPagos = () => {
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        const connection = new Connection(network, "processed");
        const wallet = window.solana;
        if (wallet) {
            const provider = new anchor.AnchorProvider(connection, wallet, {});
            anchor.setProvider(provider);
            setProvider(provider);
        }
    }, []);

    const handleFulfill = async () => {
        const program = new anchor.Program(idl, PROGRAM_ID, provider);
        const escrowAccount = new PublicKey("EscrowAccountPublicKeyHere");

        await program.rpc.fulfill({
            accounts: {
                escrowAccount,
                sender: provider.wallet.publicKey,
                receiver: new PublicKey("receiverPublicKeyHere"),
            },
        });
    };

    return (
        <div>
            <h2>Estado de Pagos</h2>
            <button onClick={handleFulfill}>Confirmar Servicio</button>
        </div>
    );
};

export default EstadoPagos;
