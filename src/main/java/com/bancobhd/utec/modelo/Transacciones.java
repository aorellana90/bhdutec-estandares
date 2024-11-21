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
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "transacciones")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Transacciones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTransaccion")
    private Integer idTransaccion;

    @Column(name = "fechaTransaccion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaTransaccion;

    @Column(name = "monto")
    private Long monto;

    @Size(max = 250)
    @Column(name = "descripcion", length = 250)
    private String descripcion;

    @JoinColumn(name = "idProducto")
    @ManyToOne
    private Producto producto;

    @JoinColumn(name = "idTipoTransaccion")
    @ManyToOne
    private TipoTransacciones tipoTransaccion;

}
