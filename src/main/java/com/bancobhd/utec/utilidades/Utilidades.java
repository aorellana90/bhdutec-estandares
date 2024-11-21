package com.bancobhd.utec.utilidades;

import java.security.SecureRandom;

public class Utilidades {

    private Utilidades() {
        throw new IllegalStateException("Utilidades class component util");
    }

    public static String generarClave(int longitud) {
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder cadenaGenerada = new StringBuilder();

        SecureRandom random = new SecureRandom();

        for (int i = 0; i < longitud; i++) {
            int indice = random.nextInt(caracteres.length());
            char caracter = caracteres.charAt(indice);
            cadenaGenerada.append(caracter);
        }

        return cadenaGenerada.toString();
    }

    public static String maskString(String input) {
        if (input == null || input.length() <= 4) {
            throw new IllegalArgumentException("No se puede enmascarar la cadena");
        }

        int lengthToMask = input.length() - 4;

        StringBuilder maskedPart = new StringBuilder();

        for (int i = 0; i < lengthToMask; i++) {
            maskedPart.append("*");
        }

        String visiblePart = input.substring(lengthToMask);

        return maskedPart.toString() + visiblePart;
    }

}
