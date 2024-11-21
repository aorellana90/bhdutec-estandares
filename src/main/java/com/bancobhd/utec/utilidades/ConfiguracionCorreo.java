package com.bancobhd.utec.utilidades;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class ConfiguracionCorreo {

    Properties props = System.getProperties();

    public void correoPlantilla(String para, String asunto, String plantilla) {
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");

        final String usuario = "criollitospet@hotmail.com";
        final String password = "uonxpygcmmqlpvet";

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(usuario, password);
            }
        });

        try {
            MimeMessage mensaje = new MimeMessage(session);

            mensaje.setFrom(new InternetAddress(usuario));
            mensaje.addRecipient(Message.RecipientType.TO, new InternetAddress(para));
            mensaje.setSubject(asunto);
            mensaje.setContent(plantilla, "text/html; charset=utf-8");
            mensaje.saveChanges();

            Transport.send(mensaje);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
