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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "solicitudintra")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class SolicitudIntra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSolicitudIntra")
    private Integer idSolicitudIntra;

    @Column(name = "fechaCreacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @NotNull
    @Column(name = "montoAConsolidar")
    private long montoAConsolidar;

    @JoinColumn(name = "idEstadoSolicitudIntra")
    @ManyToOne
    private EstadoSolicitudIntra estadoSolicitudIntra;

    @JoinColumn(name = "idProducto")
    @ManyToOne
    private Producto producto;

}
