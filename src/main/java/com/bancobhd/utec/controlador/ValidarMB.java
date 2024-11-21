package com.bancobhd.utec.controlador;

import com.bancobhd.utec.modelo.EjecutivoUsuarios;
import com.bancobhd.utec.modelo.Usuarios;
import java.io.Serializable;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@SessionScoped
public class ValidarMB implements Serializable {

    public void validarSesion() {
        try {
            Usuarios datosUsuario = (Usuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("usSession");

            if (datosUsuario == null) {
                FacesContext.getCurrentInstance().getExternalContext().redirect("./../../login.xhtml");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void cerrarSesion() {
        try {
            FacesContext context = FacesContext.getCurrentInstance();
            context.getExternalContext().invalidateSession();

            FacesContext.getCurrentInstance().getExternalContext().redirect("./../../login.xhtml");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void validarSesionEjecutivo() {
        try {
            EjecutivoUsuarios datosEjeUs = (EjecutivoUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("ejeUsSession");

            if (datosEjeUs == null) {
                FacesContext.getCurrentInstance().getExternalContext().redirect("./../../loginEjecutivo.xhtml");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void cerrarSesionEjecutivo() {
        try {
            FacesContext context = FacesContext.getCurrentInstance();
            context.getExternalContext().invalidateSession();

            FacesContext.getCurrentInstance().getExternalContext().redirect("./../../loginEjecutivo.xhtml");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
