
@Repository
public interface produtoRepository extends JpaRepository<produtoModel, Long> {
    List<produtoModel> findByNomeContainingIgnoreCase(String nome);
}