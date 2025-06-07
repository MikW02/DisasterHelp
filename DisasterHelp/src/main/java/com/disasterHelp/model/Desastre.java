package com.disasterHelp.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "desastres")
public class Desastre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Column(nullable = false)
    @NotEmpty(message = "O tipo do desastre é obrigatório.")
    private String tipo; // Ex: "Enchente", "Terremoto", "Tempestade"

    @Column(nullable = false)
    @NotEmpty(message = "A descrição é obrigatória.")
    private String descricao;

    @Column(nullable = false)
    @NotEmpty(message = "A região afetada é obrigatória.")
    private String regiao;

    @Column(nullable = false)
    @NotEmpty(message = "A data prevista é obrigatória.")
    private String dataPrevista; // Ou use LocalDate se quiser como data mesmo
}