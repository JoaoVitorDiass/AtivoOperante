package com.example.ativooperante_back.db.entidades;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table (name="denuncia")
public class Denuncia {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="den_id")
    private Long id;
   
    @Column(name="den_titulo")
    private String titulo;

    @Column(name="den_texto")
    private String texto;

    @Column(name="den_urgencia")
    private int urgencia;

    @Column(name="den_data")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name="org_id", nullable = false)
    private Orgao orgao;

    @ManyToOne
    @JoinColumn(name="tip_id", nullable = false)
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name="usu_id", nullable = false)
    private Usuario usuario;

    @OneToOne(mappedBy = "denuncia", optional = true)
    private Feedback feedback;

    public Denuncia() {
    }

    public Denuncia(Long id, String titulo, String texto, int urgencia, LocalDate data, Orgao orgao, Tipo tipo,
            Usuario usuario) {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.urgencia = urgencia;
        this.data = data;
        this.orgao = orgao;
        this.tipo = tipo;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public int getUrgencia() {
        return urgencia;
    }

    public void setUrgencia(int urgencia) {
        this.urgencia = urgencia;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Orgao getOrgao() {
        return orgao;
    }

    public void setOrgao(Orgao orgao) {
        this.orgao = orgao;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }
    
    
}
