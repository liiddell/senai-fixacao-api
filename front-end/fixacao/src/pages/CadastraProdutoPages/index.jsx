import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css";

const esquemaDeCadastro = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  preco: yup
    .string()
    .required("O preço é obrigatório."),
  quantidade: yup
    .string()
    .required("A quantidade é obrigatória.")  
     .min(1, "A quantidade deve ter pelo menos 1 caractere."),
 
});

function PaginaDeCadastro() {
  const {
    register: registrarCampo,
    handleSubmit: lidarComEnvioDoFormulario,
    formState: { errors: errosDoFormulario, isSubmitting: estaEnviando },
    setError: definirErroNoCampo,
    reset: limparCamposDoFormulario,
  } = useForm({
    resolver: yupResolver(esquemaDeCadastro),
    defaultValues: { nome: "", preco: "", quantidade: "" },
  });

  async function enviarDados(dadosDoFormulario) {
    const dadosParaApi = {
      nome: dadosDoFormulario.nome,
      preco: dadosDoFormulario.preco,
      quantidade: dadosDoFormulario.quantidade,
    };

    try {
      const resposta = await api.post("/produtos", dadosParaApi);
      toast.success(resposta.data.mensagem || "Produto cadastrado com sucesso!");
      limparCamposDoFormulario();

    } catch (erro) {
      const codigoDeStatus = erro?.response?.status;
      const mensagemDoServidor =
        erro?.response?.data?.mensagem || "Erro ao cadastrar produto.";

      if (codigoDeStatus === 409) {
        definirErroNoCampo("preco", {
          type: "server",
          message: mensagemDoServidor, 
        });
      }

      toast.error(mensagemDoServidor);
      console.error("Erro no cadastro:", erro);
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastro de Usuário</h1>

      <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
        {/* Nome */}
        <div className="form-group">
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Ex.: Bom Bril"
            {...registrarCampo("nome")}
          />
        </div>
        {errosDoFormulario.nome && (
          <p className="error-message">{errosDoFormulario.nome.message}</p>
        )}

        {/* Preço */}
        <div className="form-group">
          <label htmlFor="campo-preco">Preço</label>
          <input
            id="campo-preco"
            type="text"
            placeholder="Ex.: 19.99"
            {...registrarCampo("preco")}
          />
        </div>
        {errosDoFormulario.preco && (
          <p className="error-message">{errosDoFormulario.preco.message}</p>
        )}

        {/* Quantidade */}
        <div className="form-group">
          <label htmlFor="campo-quantidade">Quantidade</label>
          <input
            id="campo-quantidade"
            type="text"
            placeholder="Ex.: 10"
            {...registrarCampo("quantidade")}
          />
        </div>
        {errosDoFormulario.quantidade && (
          <p className="error-message">{errosDoFormulario.quantidade.message}</p>
        )}
        <button type="submit" disabled={estaEnviando}>
          {estaEnviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeCadastro;