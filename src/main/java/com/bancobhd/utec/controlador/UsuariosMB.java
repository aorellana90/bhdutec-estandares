package com.bancobhd.utec.controlador;

import com.bancobhd.utec.dto.CambioClaveRequestDto;
import com.bancobhd.utec.dto.CambioClaveSesionDto;
import com.bancobhd.utec.dto.CorreoBienvenidaRequestDto;
import com.bancobhd.utec.dto.RegistroUsuarioDto;
import com.bancobhd.utec.ejb.ClientesFacadeLocal;
import com.bancobhd.utec.ejb.ProductoFacadeLocal;
import com.bancobhd.utec.ejb.UsuariosFacadeLocal;
import com.bancobhd.utec.modelo.Clientes;
import com.bancobhd.utec.modelo.Producto;
import com.bancobhd.utec.modelo.Roles;
import com.bancobhd.utec.modelo.TipoCuentas;
import com.bancobhd.utec.modelo.TipoProducto;
import com.bancobhd.utec.modelo.Usuarios;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import org.apache.commons.codec.digest.DigestUtils;
import com.bancobhd.utec.ejb.TipoCuentasFacadeLocal;
import com.bancobhd.utec.ejb.TipoProductoFacadeLocal;
import com.bancobhd.utec.utilidades.EnvioCorreos;
import com.bancobhd.utec.utilidades.Utilidades;
import java.util.Date;
import org.primefaces.PrimeFaces;

@ManagedBean
@SessionScoped
public class UsuariosMB implements Serializable {

    @EJB
    UsuariosFacadeLocal usuariosFacade;

    @EJB
    TipoProductoFacadeLocal tipoProductoFacade;

    @EJB
    TipoCuentasFacadeLocal tipoCuentasFacade;

    @EJB
    ClientesFacadeLocal clientesFacade;

    @EJB
    ProductoFacadeLocal productoFacade;

    private Roles roles;
    private Clientes clientes;
    private Usuarios usuarios;
    private TipoProducto tipoProducto;
    private TipoCuentas tipoCuentas;
    private Producto producto;
    private RegistroUsuarioDto registroUsuarioDto;
    private CambioClaveRequestDto cambioClaveRequestDto;
    private CambioClaveSesionDto cambioClaveSesionDto;
    private CorreoBienvenidaRequestDto correoBienvenidaDto;
    private List<TipoProducto> listaTipoProducto;
    private List<TipoCuentas> listaTipoCuenta;
    private List<Usuarios> listaUsuarios;
    String mensaje = "";

    @PostConstruct
    public void init() {
        this.roles = new Roles();
        this.clientes = new Clientes();
        this.usuarios = new Usuarios();
        this.tipoProducto = new TipoProducto();
        this.tipoCuentas = new TipoCuentas();
        this.producto = new Producto();
        this.registroUsuarioDto = new RegistroUsuarioDto();
        this.cambioClaveRequestDto = new CambioClaveRequestDto();
        this.cambioClaveSesionDto = new CambioClaveSesionDto();
        this.correoBienvenidaDto = new CorreoBienvenidaRequestDto();
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }

    public Clientes getClientes() {
        return clientes;
    }

    public void setClientes(Clientes clientes) {
        this.clientes = clientes;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

    public List<TipoProducto> getListaTipoProducto() {
        this.listaTipoProducto = this.tipoProductoFacade.findAll();
        return this.listaTipoProducto;
    }

    public void setListaTipoProducto(List<TipoProducto> listaTipoProducto) {
        this.listaTipoProducto = listaTipoProducto;
    }

    public TipoCuentas getTipoCuentas() {
        return tipoCuentas;
    }

    public void setTipoCuentas(TipoCuentas tipoCuentas) {
        this.tipoCuentas = tipoCuentas;
    }

    public List<TipoCuentas> getListaTipoCuenta() {
        return this.listaTipoCuenta;
    }

    public void setListaTipoCuenta(List<TipoCuentas> listaTipoCuenta) {
        this.listaTipoCuenta = listaTipoCuenta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public RegistroUsuarioDto getRegistroUsuarioDto() {
        return registroUsuarioDto;
    }

    public void setRegistroUsuarioDto(RegistroUsuarioDto registroUsuarioDto) {
        this.registroUsuarioDto = registroUsuarioDto;
    }

    public CambioClaveRequestDto getCambioClaveRequestDto() {
        return cambioClaveRequestDto;
    }

    public void setCambioClaveRequestDto(CambioClaveRequestDto cambioClaveRequestDto) {
        this.cambioClaveRequestDto = cambioClaveRequestDto;
    }

    public CambioClaveSesionDto getCambioClaveSesionDto() {
        return cambioClaveSesionDto;
    }

    public void setCambioClaveSesionDto(CambioClaveSesionDto cambioClaveSesionDto) {
        this.cambioClaveSesionDto = cambioClaveSesionDto;
    }

    public CorreoBienvenidaRequestDto getCorreoBienvenidaDto() {
        return correoBienvenidaDto;
    }

    public void setCorreoBienvenidaDto(CorreoBienvenidaRequestDto correoBienvenidaDto) {
        this.correoBienvenidaDto = correoBienvenidaDto;
    }

    public List<Usuarios> getListaUsuarios() {
        this.listaUsuarios = this.usuariosFacade.findAll();
        return listaUsuarios;
    }

    public void setListaUsuarios(List<Usuarios> listaUsuarios) {
        this.listaUsuarios = listaUsuarios;
    }

    public String validar() {
        String ruta = "";

        try {
            Usuarios datos = this.usuariosFacade.acceder(this.usuarios);

            if (datos != null) {
                if (datos.getEstado()) {
                    this.usuarios.setClientes(datos.getClientes());

                    if (datos.getRoles().getRol().equalsIgnoreCase("Cliente")) {
                        ruta = "vistas/cliente/productos?faces-redirect=true";
                    }

                    FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("usSession", datos);
                } else {
                    FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "El usuario se encuentra inactivo o bloqueado", "Admin"));
                    this.usuarios = new Usuarios();
                }
            } else {
                Usuarios datosUsuario = this.usuariosFacade.buscarPorUsuario(this.usuarios.getUsuario());

                if (datosUsuario != null) {
                    if (datosUsuario.getCodigoValidacion() == 3) {
                        datosUsuario.setCambioClave(true);
                        datosUsuario.setEstado(false);
                    }

                    if (datosUsuario.getEstado()) {
                        datosUsuario.setCodigoValidacion(datosUsuario.getCodigoValidacion() + 1);
                    }

                    this.usuariosFacade.edit(datosUsuario);
                }

                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Usuario o contraseña incorrectos", "Admin"));
                this.usuarios = new Usuarios();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ruta;
    }

    public void cargarTipoCuenta() {
        try {
            if (this.registroUsuarioDto.getIdTipoProducto() == 1) {
                this.listaTipoCuenta = this.tipoCuentasFacade.findAll();
                setListaTipoCuenta(listaTipoCuenta);
            } else {
                this.listaTipoCuenta = null;
                setListaTipoCuenta(listaTipoCuenta);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void crearCuentaUsuario() {
        try {
            Date actualFechaHora = new Date();
            //this.registroUsuarioDto = new RegistroUsuarioDto();
            //this.usuarios = new Usuarios();

            Clientes datosCliente = this.clientesFacade.buscarClientePorDocumento(this.registroUsuarioDto.getDocumentoIdentidad());

            if (datosCliente != null) {
                Producto datosProducto = this.productoFacade.buscarProductoPorTipoNumero(this.registroUsuarioDto.getIdTipoProducto(), this.registroUsuarioDto.getNumeroProducto());

                if (datosProducto != null) {
                    EnvioCorreos envioCorreos = new EnvioCorreos();
                    String claveEncriptada = DigestUtils.md5Hex(this.registroUsuarioDto.getClave());

                    this.roles.setIdRol(3);
                    this.roles.setRol("Cliente");
                    this.clientes.setIdCliente(datosCliente.getIdCliente());
                    this.clientes.setNombres(datosCliente.getNombres());
                    this.clientes.setApellidos(datosCliente.getApellidos());
                    this.clientes.setDocumentoIdentidad(datosCliente.getDocumentoIdentidad());
                    this.clientes.setTelefono(datosCliente.getTelefono());
                    this.clientes.setCorreo(datosCliente.getCorreo());
                    this.clientes.setDireccion(datosCliente.getDireccion());
                    this.usuarios.setUsuario(registroUsuarioDto.getUsuario());
                    this.usuarios.setClave(claveEncriptada);
                    this.usuarios.setCodigoValidacion(0);
                    this.usuarios.setCambioClave(false);
                    this.usuarios.setEstado(true);
                    this.usuarios.setRoles(roles);
                    this.usuarios.setClientes(clientes);
                    this.usuarios.setFechaCreacion(actualFechaHora);
                    this.usuariosFacade.create(usuarios);

                    this.correoBienvenidaDto.setPara(datosCliente.getCorreo());
                    this.correoBienvenidaDto.setNombreUsuario(registroUsuarioDto.getUsuario());

                    envioCorreos.correoBienvenida(correoBienvenidaDto);

                    this.mensaje = "Cuenta creada exitosamente";
                    this.registroUsuarioDto = new RegistroUsuarioDto();
                    this.usuarios = new Usuarios();
                    this.correoBienvenidaDto = new CorreoBienvenidaRequestDto();

                    FacesContext.getCurrentInstance().getExternalContext().redirect("./../../login.xhtml");
                    FacesMessage msj = new FacesMessage(this.mensaje);
                    FacesContext.getCurrentInstance().addMessage(null, msj);
                } else {
                    FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "El tipo de producto o número de producto no coinciden", "Admin"));
                }
            } else {
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "El número de documento no ha sido encontrado", "Admin"));
            }
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Ocurrio un error al intentar crear la cuenta", "Admin"));
            e.printStackTrace();
        }
    }

    public void modificarUsuario() {
        try {
            this.usuarios.setCodigoValidacion(0);
            this.usuarios.setCambioClave(false);
            this.usuariosFacade.edit(this.usuarios);

            this.usuarios = new Usuarios();
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se actualizaron los datos del usuario con éxito"));
            PrimeFaces.current().executeScript("PF('usuarioBaDialog').hide()");
            PrimeFaces.current().ajax().update("form:dt-usuariosBanca");
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("No se pudo actualizar el registro"));
            e.printStackTrace();
        }
    }

    public void cambiarClaveUsuario() {
        try {
            EnvioCorreos envioCorreos = new EnvioCorreos();
            Clientes datosCliente = this.clientesFacade.buscarClientePorCorreo(this.cambioClaveRequestDto.getPara());

            if (datosCliente != null) {
                this.cambioClaveRequestDto.setNombre(datosCliente.getNombres() + " " + datosCliente.getApellidos());
                this.cambioClaveRequestDto.setClave(Utilidades.generarClave(10));

                Usuarios datosUsuario = this.usuariosFacade.buscarPorIdCliente(datosCliente.getIdCliente());
                datosUsuario.setClave(DigestUtils.md5Hex(this.cambioClaveRequestDto.getClave()));
                datosUsuario.setCodigoValidacion(0);
                datosUsuario.setCambioClave(true);

                this.usuariosFacade.edit(datosUsuario);

                envioCorreos.cambioClave(cambioClaveRequestDto);
                this.cambioClaveRequestDto = new CambioClaveRequestDto();
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se ha enviado un correo con la nueva contraseña"));
                PrimeFaces.current().executeScript("PF('claveDialog').hide()");
            } else {
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "No se encontró información registrada", "Admin"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void cambiarClaveUsuarioSesion() {
        try {
            Usuarios datosUsuario = (Usuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("usSession");

            if (datosUsuario != null) {
                datosUsuario.setClave(DigestUtils.md5Hex(this.cambioClaveSesionDto.getClave()));
                datosUsuario.setCodigoValidacion(0);
                datosUsuario.setCambioClave(false);

                this.usuariosFacade.edit(datosUsuario);

                this.cambioClaveSesionDto = new CambioClaveSesionDto();
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Se ha establecido la nueva contraseña"));
                PrimeFaces.current().executeScript("PF('claveSesionDialog').hide()");
            } else {
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "No se encontró información del usuario", "Admin"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
