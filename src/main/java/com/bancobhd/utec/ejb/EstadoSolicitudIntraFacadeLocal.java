package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.EstadoSolicitudIntra;
import java.util.List;
import javax.ejb.Local;

@Local
public interface EstadoSolicitudIntraFacadeLocal {

    void create(EstadoSolicitudIntra estadosolicitudintra);

    void edit(EstadoSolicitudIntra estadosolicitudintra);

    void remove(EstadoSolicitudIntra estadosolicitudintra);

    EstadoSolicitudIntra find(Object id);

    List<EstadoSolicitudIntra> findAll();

    List<EstadoSolicitudIntra> findRange(int[] range);

    int count();

}
