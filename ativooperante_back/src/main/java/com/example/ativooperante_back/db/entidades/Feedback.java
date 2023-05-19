package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="feedback")
public class Feedback {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="fee_id")
    private Long id;
    
    @Column(name="fee_texto")
    private String texto;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="den_id")
    private Denuncia denuncia;

    public Feedback() {
    }
    public Feedback(Long id, String texto) {
        this.id = id;
        this.texto = texto;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }
    
        
}
