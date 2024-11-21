package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.EstadoSolicitudIntra;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class EstadoSolicitudIntraFacade extends AbstractFacade<EstadoSolicitudIntra> implements EstadoSolicitudIntraFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public EstadoSolicitudIntraFacade() {
        super(EstadoSolicitudIntra.class);
    }

}
