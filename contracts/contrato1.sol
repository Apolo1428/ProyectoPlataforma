// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract ServiceCompletion {
    event ServiceCompleted(string message);

    function completeService(string memory service, string memory company, string memory amount) public returns (string memory) {
        // Construir el mensaje completo con los parámetros ingresados
        string memory message = string(
            abi.encodePacked(
                "El servicio '", service, 
                "' ha sido completado. Se ha pagado ", amount, 
                " USDT a la empresa '", 
                company, "'."
            )
        );

        emit ServiceCompleted(message);
        return message;
    }
}