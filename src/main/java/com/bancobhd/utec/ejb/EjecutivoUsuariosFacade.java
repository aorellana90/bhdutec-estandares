package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.EjecutivoUsuarios;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.apache.commons.codec.digest.DigestUtils;

@PermitAll
@Stateless
public class EjecutivoUsuariosFacade extends AbstractFacade<EjecutivoUsuarios> implements EjecutivoUsuariosFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public EjecutivoUsuariosFacade() {
        super(EjecutivoUsuarios.class);
    }

    @Override
    public EjecutivoUsuarios accederEjecutivos(EjecutivoUsuarios ejeUs) {
        EjecutivoUsuarios ejecutivoUs = null;
        StringBuilder consulta = new StringBuilder();
        String clave = DigestUtils.md5Hex(ejeUs.getClave());

        try {
            consulta.append("SELECT ejus FROM EjecutivoUsuarios ejus WHERE ejus.usuario = :usuario AND ejus.clave = :clave");
            Query query = em.createQuery(consulta.toString());
            query.setParameter("usuario", ejeUs.getUsuario());
            query.setParameter("clave", clave);
            List<EjecutivoUsuarios> lista = query.getResultList();
            if (!lista.isEmpty()) {
                ejecutivoUs = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ejecutivoUs;
    }

}
