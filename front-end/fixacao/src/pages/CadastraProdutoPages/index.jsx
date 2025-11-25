import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import '../CadastraProdutoPages/style.css'

const schema = yup.object({
  codigo: yup
    .string()
    .required("O código é obrigatório.")
    .min(3, "O código deve ter pelo menos 3 caracteres."),
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  preco: yup
    .number()
    .typeError("O preço deve ser um número.")
    .required("O preço é obrigatório."),
  quantidade: yup
    .number()
    .typeError("A quantidade deve ser um número.")
    .min(1, "A quantidade mínima é 1.")
    .required("A quantidade é obrigatória."),
});

function PaginaDeCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { codigo: "", nome: "", preco: "", quantidade: "" },
  });

  const enviarDados = async (formData) => {
    try {
      const resposta = await api.post("/cadastro", formData);

      toast.success(resposta?.data?.mensagem || "Produto cadastrado com sucesso!");
      reset();

    } catch (erro) {
      const status = erro?.response?.status;
      const mensagem = erro?.response?.data?.mensagem || "Erro ao cadastrar produto.";

      if (status === 409) {
        setError("preco", {
          type: "server",
          message: mensagem,
        });
      }

      toast.error(mensagem);
      console.error("Erro no cadastro:", erro);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro de Produto</h1>

      <form noValidate onSubmit={handleSubmit(enviarDados)}>
        
        <div className="form-group">
          <label htmlFor="campo-codigo">Código</label>
          <input
            id="campo-codigo"
            type="text"
            placeholder="Ex.: ALIM12345"
            {...register("codigo")}
          />
          {errors.codigo && <p className="error-message">{errors.codigo.message}</p>}
        </div>

        {/* Nome */}
        <div className="form-group">
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Ex.: Bom Bril"
            {...register("nome")}
          />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}
        </div>

        {/* Preço */}
        <div className="form-group">
          <label htmlFor="campo-preco">Preço</label>
          <input
            id="campo-preco"
            type="number"
            step="0.01"
            placeholder="Ex.: 19.99"
            {...register("preco")}
          />
          {errors.preco && <p className="error-message">{errors.preco.message}</p>}
        </div>

        {/* Quantidade */}
        <div className="form-group">
          <label htmlFor="campo-quantidade">Quantidade</label>
          <input
            id="campo-quantidade"
            type="number"
            placeholder="Ex.: 10"
            {...register("quantidade")}
          />
          {errors.quantidade && (
            <p className="error-message">{errors.quantidade.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeCadastro;
