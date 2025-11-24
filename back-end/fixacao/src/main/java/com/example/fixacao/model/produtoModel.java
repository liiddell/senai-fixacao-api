@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
@Table(name = "tb_produto")
public class ProdutoModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Double preco;

    @Column(nullable = false)
    private Integer quantidade;
}
