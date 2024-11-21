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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "intrafinanciamiento")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Intrafinanciamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idIntra")
    private Integer idIntra;

    @Column(name = "fechaConsolidacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaConsolidacion;

    @Column(name = "monto")
    private Long monto;

    @JoinColumn(name = "idSolicitudIntra")
    @ManyToOne
    private SolicitudIntra solicitudIntra;

}
