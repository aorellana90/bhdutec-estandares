package com.bancobhd.utec.controlador;

import com.bancobhd.utec.ejb.ClientesFacadeLocal;
import com.bancobhd.utec.modelo.Clientes;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import org.primefaces.PrimeFaces;

@ManagedBean
@SessionScoped
public class ClientesMB implements Serializable {

    @EJB
    private ClientesFacadeLocal clientesFacade;

    private Clientes clientes;
    private List<Clientes> listaClientes;
    String mensaje = "";

    @PostConstruct
    public void init() {
        this.clientes = new Clientes();
    }

    public Clientes getClientes() {
        return clientes;
    }

    public void setClientes(Clientes clientes) {
        this.clientes = clientes;
    }

    public List<Clientes> getListaClientes() {
        this.listaClientes = this.clientesFacade.findAll();
        return listaClientes;
    }

    public void setListaClientes(List<Clientes> listaClientes) {
        this.listaClientes = listaClientes;
    }

    public void limpiarDatos() {
        this.clientes = new Clientes();
    }

    public void registrarCliente() {
        try {
            if (this.clientes.getIdCliente() == null) {
                this.clientesFacade.create(this.clientes);

                this.clientes = new Clientes();
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se registraron los datos del cliente con éxito"));
            } else {
                this.clientesFacade.edit(this.clientes);

                this.clientes = new Clientes();
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se actualizaron los datos del cliente con éxito"));
            }

            PrimeFaces.current().executeScript("PF('clienteDialog').hide()");
            PrimeFaces.current().ajax().update("form:dt-clientes");
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("No se pudo crear el registro"));
            e.printStackTrace();
        }
    }

    public void eliminarCliente() {
        try {
            this.clientesFacade.remove(this.clientes);

            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se eliminó el registro con éxito"));
            PrimeFaces.current().executeScript("PF('eliminarCliDialog').hide()");
            PrimeFaces.current().ajax().update("form:dt-clientes");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
