package com.bancobhd.utec.utilidades;

import com.bancobhd.utec.dto.CambioClaveRequestDto;
import com.bancobhd.utec.dto.CorreoBienvenidaRequestDto;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class EnvioCorreos {

    public void cambioClave(CambioClaveRequestDto request) {
        try {
            ConfiguracionCorreo confCorreo = new ConfiguracionCorreo();

            String textoHtml = obtenerRecursoString("./../../correo/cambioClave.html");

            String textoAgregado = textoHtml.replace("<#NOMBRE#>", request.getNombre());
            textoAgregado = textoAgregado.replace("<#CLAVE#>", request.getClave());

            confCorreo.correoPlantilla(request.getPara(), "Cambio Clave Banco BHD UTEC", textoAgregado);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void correoBienvenida(CorreoBienvenidaRequestDto request) {
        try {
            ConfiguracionCorreo confCorreo = new ConfiguracionCorreo();

            String textoHtml = obtenerRecursoString("./../../correo/bienvenida.html");

            String textoAgregado = textoHtml.replace("<#USUARIO#>", request.getNombreUsuario());

            confCorreo.correoPlantilla(request.getPara(), "Bienvenida Banco BHD UTEC", textoAgregado);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String obtenerRecursoString(String nombreArchivo) {
        InputStream is = null;
        is = obtenerRecursoInputStream(nombreArchivo);

        if (is != null) {
            BufferedReader reader = null;
            reader = new BufferedReader(new InputStreamReader(is));

            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } else {
            System.out.println("No se encontro el archivo");
        }

        return nombreArchivo;
    }

    private InputStream obtenerRecursoInputStream(String nombreArchivo) {
        ClassLoader classLoader = null;
        classLoader = EnvioCorreos.class.getClassLoader();

        return classLoader.getResourceAsStream(nombreArchivo);
    }

}
