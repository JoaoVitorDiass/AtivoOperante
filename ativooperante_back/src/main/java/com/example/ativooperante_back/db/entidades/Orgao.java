package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orgaos")
public class Orgao {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="org_id")
    private long id;

    @Column(name="org_nome")
    private String nome;
    
    public Orgao() {
    }
    
    public Orgao(long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    
}
