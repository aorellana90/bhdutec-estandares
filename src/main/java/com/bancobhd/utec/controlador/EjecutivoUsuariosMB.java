package com.bancobhd.utec.controlador;

import com.bancobhd.utec.ejb.EjecutivoUsuariosFacadeLocal;
import com.bancobhd.utec.modelo.Ejecutivo;
import com.bancobhd.utec.modelo.EjecutivoUsuarios;
import com.bancobhd.utec.modelo.Roles;
import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@SessionScoped
public class EjecutivoUsuariosMB implements Serializable {

    @EJB
    private EjecutivoUsuariosFacadeLocal ejecutivoUsuariosFacade;

    private Roles roles;
    private Ejecutivo ejecutivo;
    private EjecutivoUsuarios ejecutivoUsuarios;
    String mensaje = "";

    @PostConstruct
    public void init() {
        this.roles = new Roles();
        this.ejecutivo = new Ejecutivo();
        this.ejecutivoUsuarios = new EjecutivoUsuarios();
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }

    public Ejecutivo getEjecutivo() {
        return ejecutivo;
    }

    public void setEjecutivo(Ejecutivo ejecutivo) {
        this.ejecutivo = ejecutivo;
    }

    public EjecutivoUsuarios getEjecutivoUsuarios() {
        return ejecutivoUsuarios;
    }

    public void setEjecutivoUsuarios(EjecutivoUsuarios ejecutivoUsuarios) {
        this.ejecutivoUsuarios = ejecutivoUsuarios;
    }

    public String validarEjecutivo() {
        String ruta = "";

        try {
            EjecutivoUsuarios datos = this.ejecutivoUsuariosFacade.accederEjecutivos(this.ejecutivoUsuarios);

            if (datos != null) {
                this.ejecutivoUsuarios.setEjecutivo(datos.getEjecutivo());
                this.ejecutivoUsuarios.setRoles(datos.getRoles());

                if (datos.getRoles().getRol().equalsIgnoreCase("Ejecutivo")) {
                    ruta = "vistas/ejecutivo/listaClientes?faces-redirect=true";
                }

                FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("ejeUsSession", datos);
            } else {
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Usuario o contraseña incorrectos", "Admin"));
                this.ejecutivoUsuarios = new EjecutivoUsuarios();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ruta;
    }

}
