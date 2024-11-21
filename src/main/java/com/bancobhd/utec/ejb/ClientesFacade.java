package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Clientes;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class ClientesFacade extends AbstractFacade<Clientes> implements ClientesFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ClientesFacade() {
        super(Clientes.class);
    }

    @Override
    public Clientes buscarClientePorDocumento(String documentoIdentidad) {
        Clientes cliente = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from clientes where documentoIdentidad like ?");
            Query query = em.createNativeQuery(consulta.toString(), Clientes.class);
            query.setParameter(1, documentoIdentidad);
            List<Clientes> lista = query.getResultList();
            if (!lista.isEmpty()) {
                cliente = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cliente;
    }

    @Override
    public Clientes buscarClientePorCorreo(String correo) {
        Clientes cliente = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from clientes where correo like ?");
            Query query = em.createNativeQuery(consulta.toString(), Clientes.class);
            query.setParameter(1, correo);
            List<Clientes> lista = query.getResultList();
            if (!lista.isEmpty()) {
                cliente = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cliente;
    }

}
