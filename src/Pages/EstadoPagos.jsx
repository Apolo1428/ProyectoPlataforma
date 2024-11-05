import React, { useState, useEffect } from "react";
import { db } from '../firebase'; 
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EstadoPagos = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Pendiente");

  const sendUSDT = async (receiverAddress, amount) => {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const transaction = new Transaction();
  
    const receiverPubkey = new PublicKey(receiverAddress);
    const senderPublicKey = window.solana.publicKey;
  
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: receiverPubkey,
        lamports: amount * 1e6,
      })
    );
  
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPublicKey;
  
    const signed = await window.solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
  
    await connection.confirmTransaction(signature);
    console.log("Transacción realizada", signature);
  };
  useEffect(() => {
    const fetchPaymentData = async () => {
      const docRef = doc(db, "PagosProgramados", "1aTeWCZBO3zPPKav38wP"); //No cambien el número, es el "ID" de la base de datos
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPaymentData(docSnap.data());
      } else {
        console.log("No se encontró el documento de pago programado");
      }
    };

    fetchPaymentData();
  }, []);

  const handleConfirmService = async () => {
    if (paymentData && paymentData.receiverAddress && paymentData.amount) {
      try {
        await sendUSDT(paymentData.receiverAddress, paymentData.amount);
        setPaymentStatus("Realizado");

        await updateDoc(doc(db, "PagosProgramados", "1aTeWCZBO3zPPKav38wP"), { //No cambien el número, es el "ID" de la base de datos
          status: "Realizado",
        });

        console.log("Pago realizado con éxito");
      } catch (error) {
        console.error("Error en la transacción", error);
      }
    } else {
      console.log("Datos de pago incompletos");
    }
  };

  return (
    <div>
      <h2>Estado de Pagos</h2>
      {paymentData ? (
        <div>
          <p>Empresa: {paymentData.company}</p>
          <p>Servicio: {paymentData.service}</p>
          <p>Estado: {paymentStatus}</p>
          <button onClick={handleConfirmService}>Confirmar Servicio</button>
        </div>
      ) : (
        <p>Cargando datos de pago...</p>
      )}
    </div>
  );
}
export default EstadoPagos;