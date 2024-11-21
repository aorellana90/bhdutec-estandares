package com.bancobhd.utec.modelo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "producto")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Integer idProducto;

    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "descripcion", length = 250)
    private String descripcion;

    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "numeroProducto", length = 25)
    private String numeroProducto;

    @NotNull
    @Column(name = "fechaCreacion")
    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;

    @Column(name = "saldo")
    private Long saldo;

    @Column(name = "fechaVencimiento")
    @Temporal(TemporalType.DATE)
    private Date fechaVencimiento;

    @Column(name = "tCActiva")
    private Boolean tCActiva;

    @Column(name = "limiteCreditoTC")
    private Long limiteCreditoTC;

    @Column(name = "tasaInteres")
    private Double tasaInteres;

    @Column(name = "puntosTC")
    private Integer puntosTC;

    @Column(name = "montoOtorgadoCredito")
    private Long montoOtorgadoCredito;

    @JoinColumn(name = "idCliente")
    @ManyToOne
    private Clientes clientes;

    @JoinColumn(name = "idEjecutivo")
    @ManyToOne
    private Ejecutivo ejecutivo;

    @JoinColumn(name = "idTipoCuenta")
    @ManyToOne
    private TipoCuentas tipoCuentas;

    @JoinColumn(name = "idTipoProducto")
    @ManyToOne
    private TipoProducto tipoProducto;

}
