// SchedulePayment.jsx
import React, { useState } from "react";
import { usePhantomWallet } from "./usePhantomWallet";
import { db } from '../firebase'; 
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

const SchedulePayment = () => {
  const { walletAddress, connectWallet } = usePhantomWallet();
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [service, setService] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const handleSchedulePayment = async () => {
    if (!walletAddress) {
      connectWallet();
      return;
    }

    try {
      // Busca en Firebase el solanaAddress de la empresa
      const empresasRef = collection(db, "Empresas");
      const q = query(empresasRef, where("Nombre", "==", company));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("exito");
        const companyData = querySnapshot.docs[0].data();
        setReceiverAddress(companyData.solanaAddress);

        // Guarda el pago programado junto con el solanaAddress en Firebase
        await addDoc(collection(db, "PagosProgramados"), {
          company,
          amount,
          service,
          receiverAddress: companyData.solanaAddress,
          status: "Pendiente",
        });
        
        console.log("Pago programado con éxito");
      } else {
        alert("Empresa no encontrada en la base de datos");
      }
    } catch (error) {
      console.error("Error al programar el pago:", error);
    }
  };

  return (
    <div>
      <h2>Programar Pago</h2>
      <button onClick={connectWallet}>
        {walletAddress ? "Wallet Conectada" : "Conectar Wallet"}
      </button>
      <div>
        <input
          type="text"
          placeholder="Nombre de la Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <br></br>
        <input
          type="number"
          placeholder="Monto a Pagar (USDT)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="Servicio a Realizar"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <br></br>
        <button onClick={handleSchedulePayment}>Programar Pago</button>
      </div>
    </div>
  );
}

export default SchedulePayment;