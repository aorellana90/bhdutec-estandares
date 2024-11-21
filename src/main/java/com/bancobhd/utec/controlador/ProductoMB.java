package com.bancobhd.utec.controlador;

import com.bancobhd.utec.ejb.ProductoFacadeLocal;
import com.bancobhd.utec.modelo.Clientes;
import com.bancobhd.utec.modelo.Ejecutivo;
import com.bancobhd.utec.modelo.Producto;
import com.bancobhd.utec.modelo.TipoCuentas;
import com.bancobhd.utec.modelo.TipoProducto;
import com.bancobhd.utec.modelo.Usuarios;
import com.bancobhd.utec.utilidades.Utilidades;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@SessionScoped
public class ProductoMB implements Serializable {

    @EJB
    ProductoFacadeLocal productoFacade;

    private Producto producto;
    private Clientes clientes;
    private Ejecutivo ejecutivo;
    private TipoProducto tipoProducto;
    private TipoCuentas tipoCuentas;
    private List<Producto> listaProducto;
    private List<Producto> listaGestionProducto;
    String mensaje = "";

    @PostConstruct
    public void init() {
        this.producto = new Producto();
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Clientes getClientes() {
        return clientes;
    }

    public void setClientes(Clientes clientes) {
        this.clientes = clientes;
    }

    public Ejecutivo getEjecutivo() {
        return ejecutivo;
    }

    public void setEjecutivo(Ejecutivo ejecutivo) {
        this.ejecutivo = ejecutivo;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

    public TipoCuentas getTipoCuentas() {
        return tipoCuentas;
    }

    public void setTipoCuentas(TipoCuentas tipoCuentas) {
        this.tipoCuentas = tipoCuentas;
    }

    public List<Producto> getListaProducto() {
        Usuarios datosUsuario = (Usuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("usSession");
        this.listaProducto = this.productoFacade.listaProductoPorCliente(datosUsuario.getClientes().getIdCliente());

        if (this.listaProducto != null) {
            for (Producto pro : this.listaProducto) {
                String numeroProducto = pro.getNumeroProducto();

                if (numeroProducto != null && numeroProducto.length() > 4) {
                    pro.setNumeroProducto(Utilidades.maskString(numeroProducto));
                }
            }
        }

        return listaProducto;
    }

    public void setListaProducto(List<Producto> listaProducto) {
        this.listaProducto = listaProducto;
    }

    public List<Producto> getListaGestionProducto() {
        this.listaGestionProducto = this.productoFacade.findAll();
        return listaGestionProducto;
    }

    public void setListaGestionProducto(List<Producto> listaGestionProducto) {
        this.listaGestionProducto = listaGestionProducto;
    }

}
