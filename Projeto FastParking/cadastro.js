// ** Instanciando elementos para interação
const $btnPrecos = document.querySelector("#btnPrecos");
const $btnRelatorio = document.querySelector("#relatorio");
const $btAtualizarEdicao = document.querySelector("#atualizar_edicao");
const $adicionar = document.querySelector("#adicionar");
const $salvar_valores = document.querySelector("#salvar_valores");

const $placa = document.querySelector("#placa");
const $nome = document.querySelector("#nome");
const $nome_edicao = document.querySelector("#nome_edicao");
const $placa_edicao = document.querySelector("#placa_edicao");
const $tolerancia = document.querySelector("#tolerancia");
const $valor_primeira_hora = document.querySelector("#valor_primeira_hora");
const $valor_demais_horas = document.querySelector("#valor_demais_horas");

const $fechar_valores = document.querySelector("#fechar_valores");
const $fechar_relatorio = document.querySelector("#fechar_relatorio");
const $fechar_comprovante = document.querySelector("#fechar_comprovante");
const $cancelar_edicao = document.querySelector("#cancelar_edicao");

const $formulario_principal = document.querySelector("#formulario_principal");
const $formulario_precos = document.querySelector("#formulario_precos");
const $campoTabela = document.querySelector("#registros");

const $conteiner_modal_precos = document.querySelector(".conteiner-modal-precos");
const $conteiner_modal_relatorio = document.querySelector(".conteiner-modal-relatorio");
const $conteiner_modal_comprovante = document.querySelector(".conteiner-modal-comprovante");
const $conteiner_modal_edicao = document.querySelector(".conteiner-modal-edicao");

// ** Utilitários

const coletarDataAtual = () => {
    let data = new Date();
    let dia     = data.getDate();           // 1-31
    let mes     = data.getMonth() + 1;          // 0-11 (zero=janeiro, por isso a adição do 1)
    let ano4    = data.getFullYear();       // 4 dígitos

    //Formatando, inserindo o 0 na frente do número do mês caso seja menor que 10
    mes = mes<10 ? "0" + mes : mes;
    
    return dia + '/' + mes + '/' + ano4;
}

const coletarHoraAtual = () => {
    let data = new Date();
    let hora    = data.getHours();          // 0-23
    let min     = data.getMinutes();        // 0-59
    let seg     = data.getSeconds();        // 0-59

    hora = hora<10 ? "0" + hora : hora;
    min = min<10 ? "0" + min : min;
    seg = seg<10 ? "0" + seg:seg;

    return hora + ':' + min + ':' + seg;
}

const coletarMilisegundosAtual = () => Date.now();

//PIPE
const pipe = (...fns) => arg => fns.reduce( (val, fn) => fn(val), arg);

const limitarCaracteres = () => {
    $nome.maxLength = 60;
    $nome_edicao.maxLength = 60;
    $placa.maxLength = 8;
    $placa_edicao.maxLength = 8;
    $valor_primeira_hora.maxLength = 5;
    $valor_demais_horas.maxLength = 5;
}

const abrirModal = (el) => el.classList.add("exibirModal");

// ** Interações com Web Storage

//Métodos no uso de banco de Valores
let bancoValores = [];

const lerBDValores = () => {
    const jsonBanco = JSON.parse(localStorage.getItem("BDValores"));
    bancoValores = jsonBanco ? jsonBanco : [];
}

const gravarBDValores = () => {
    const jsonBanco = JSON.stringify(bancoValores);
    localStorage.setItem("BDValores", jsonBanco);
    return true;
}

//Métodos no uso de banco de Clientes
let banco = [];

const lerBD = () => {
    const jsonBanco = JSON.parse(localStorage.getItem("BD"));
    banco = jsonBanco ? jsonBanco : [];
}

const gravarBD = () => {
    const jsonBanco = JSON.stringify(banco);
    localStorage.setItem("BD", jsonBanco);
    return true;
}

// ** Gerais de uso comum

//Checagem de preenchimento total de campos
const validarCampos = (elemento) => {
    const $campos = Array.from(elemento.querySelectorAll("input"));

    const camposVazios = $campos.filter((campo) => campo.value == false)
                                .map(campos => {
                                    campos.classList.add("erroCampo");
                                    console.log(campos);
                                });

    return camposVazios.length == 0;
}

//Método para limpeza de tabela
const limparTabela = (el) => {
    $registros = document.querySelector(el);
    while($registros.firstChild){
        $registros.removeChild($registros.firstChild);
    }
}

//Limpeza de campos de formulários
const limparCampos = () => {
    const $campos = Array.from(document.querySelectorAll("input"));
    $campos.map(campo => campo.value = "");
}

const fecharModal = (el) => el.classList.remove("exibirModal");

const fechar = (el) =>{
    fecharModal(el);
    limparCampos();
}

// ** Validadores, Máscaras e Filtros
const validarPlaca = (el) => /[A-Z]{3}-[0-9]{4}/g.test(el);

const filtrarAlfanumericos = caracteres => caracteres.replace(/[^A-Za-zÀ-ÿ0-9 ]/g,"");

const addHifenPlaca = caracteres => caracteres.replace(/(.{3})(.)/,"$1-$2");

const toUpper = caracteres => caracteres.toUpperCase();

const filtrarTexto = (txt) =>  txt.replace(/[^A-Za-zÀ-ÿ ]/g,"");

const filtrarNumero = (txt) =>  txt.replace(/[^0-9 ]/g,"");

const addVirgulaDinheiro = (txt) =>  txt.replace(/(.*)(.{2})/,"$1,$2");

const mascaraDinheiro = pipe(filtrarNumero, addVirgulaDinheiro);

const mascaraPlaca = pipe(toUpper, filtrarAlfanumericos, addHifenPlaca);

// ** Cálculos

const calcularValorAPagar = (mil_entrada, mil_saida) => {

    const codigoValorVigente = encontrarValoresVigentes();
    let registro = bancoValores.filter(registro => registro.codigo == codigoValorVigente);

    const tolerancia = registro[0].tolerancia;
    const valorPrimeiraHora = parseFloat(registro[0].valorPrimeiraHora);
    const valorDemaisHoras = parseFloat(registro[0].valorDemaisHoras);
    let valor = 0;
                                        
    let diferencaTempo = mil_saida - mil_entrada;
    let horas = Math.trunc(diferencaTempo / 1000 / 60 / 60);
    let minutos = Math.trunc(diferencaTempo / 1000 / 60);
        
    //Checando se já completou no mínimo 1 hora
    if(horas>0) {
        if(minutos > horas*60) {
            if((minutos - horas*60) > tolerancia ) {
                horas += 1;
            }
        }
    //Caso não tenha completado 1 hora, checar se ultrapassou a tolerância
    } else {
        if(minutos > tolerancia) {
            horas +=1;
        }
    }

    if(horas != 0) {
        valor = horas > 1 ? valorPrimeiraHora + ((horas-1) * valorDemaisHoras) : valorPrimeiraHora;
    }

    return valor;
}

// ** Métodos de Adição (CREATE)

const adicionarRegistro = (registro) => {
    const ultimoIndice = banco.length - 1;
    let novoCodigo;
    if(ultimoIndice == -1){
        novoCodigo = 1;
    } else{
        novoCodigo = parseInt(banco[ultimoIndice].codigo) + 1;
    }

    registro.codigo = novoCodigo.toString();
    banco.push(registro);
    gravarBD();

    if(gravarBD){
        alert("Cliente registrado com sucesso!");
    }
}

const salvarDados = () => {

    const novoRegistro = {
        nome: $nome.value,
        placa: $placa.value,
        data_entrada: coletarDataAtual(),
        hora_entrada: coletarHoraAtual(),
        milisegundos_entrada: coletarMilisegundosAtual(),
        data_saida: "",
        hora_saida: "",
        milisegundos_saida: "",
        valor: 0
    }

    adicionarRegistro(novoRegistro);
}


const salvarValores = () => {

    const ultimoIndice = bancoValores.length - 1;
    let novoCodigo;
    if(ultimoIndice == -1){
        novoCodigo = 1;
    } else{
        novoCodigo = parseInt(bancoValores[ultimoIndice].codigo) + 1;
    }

    const novoRegistro = {
        codigo: novoCodigo.toString(),
        valorPrimeiraHora: $valor_primeira_hora.value.replace(",","."),
        valorDemaisHoras: $valor_demais_horas.value.replace(",","."),
        tolerancia: $tolerancia.value
    }

    bancoValores.push(novoRegistro);
    gravarBDValores();

    if(gravarBDValores()){
        alert("Valores registrados com sucesso!");
    }     
}

const novoCadastroPrecos = () => {
    abrirModal($conteiner_modal_precos);
}

// ** Métodos de Exibição e Leitura (READ)

const exibirTabela = () => {
    lerBD();
    $registros = document.querySelector("#registros");
    limparTabela("#registros");
    banco.filter(registro => registro.data_saida == "")
    .map(registro => {
        $tr = document.createElement("tr");
        $tr.innerHTML = `
            <td class="formatacao_texto">${registro.nome}</td>
            <td class="formatacao_texto">${registro.placa}</td>
            <td class="formatacao_texto">${registro.data_entrada}</td>
            <td class="formatacao_texto">${registro.hora_entrada}</td>
            <td class="acoes">
                <button class="botao_tabela formatacao_texto" id="comprovante_${registro.codigo}"> Comprovante </button>
                <button class="botao_tabela formatacao_texto" id="editar_${registro.codigo}"> Editar </button>
                <button class="botao_tabela formatacao_texto" id="saida_${registro.codigo}"> Saída </button>
            </td>
        `;
        $registros.insertBefore($tr, null);
    });
}

const exibirRelatorio = () => {
    abrirModal($conteiner_modal_relatorio);
    lerBD();
    $registros_relatorio = document.querySelector("#registros_relatorio");
    limparTabela("#registros_relatorio");
    banco.filter(registro => registro.data_saida != "")
         .map(registro => {
        $tr = document.createElement("tr");
        $tr.innerHTML = `
            <td class="formatacao_texto">${registro.nome}</td>
            <td class="formatacao_texto">${registro.placa}</td>
            <td class="formatacao_texto">${registro.data_entrada} ${registro.hora_entrada}</td>
            <td class="formatacao_texto">${registro.data_saida} ${registro.hora_saida}</td>
            <td class="formatacao_texto">R$${registro.valor}</td>
        `;
        $registros_relatorio.insertBefore($tr, null);
    });

    const totalRendimento = banco.filter(registro => registro.data_saida != "")
                                 .reduce(( soma, registro ) => soma + parseFloat(registro.valor), 0);

    $trTotal = document.createElement("tr");
    $trTotal.innerHTML = `
        <td class="formatacao_texto" colspan="4">Total Diário</td>
        <td class="formatacao_texto">R$ ${totalRendimento}</td>  
    `;
    $registros_relatorio.insertBefore($trTotal, null);
}

const encontrarValoresVigentes = () => {
    lerBDValores();
    let maior = 0;
    bancoValores.map(registro => maior = registro.codigo > maior ? registro.codigo : maior);
    return maior;
 }

 const exibirComprovante = (codigo) => {
    const indice = banco.findIndex(rs => rs.codigo == codigo);
    document.querySelector("#nome_comprovante").innerHTML = banco[indice].nome;
    document.querySelector("#placa_comprovante").innerHTML = banco[indice].placa;
    document.querySelector("#data_entrada_comprovante").innerHTML = banco[indice].data_entrada;
    document.querySelector("#hora_entrada_comprovante").innerHTML = banco[indice].hora_entrada;
    abrirModal($conteiner_modal_comprovante);
}

const exibirRegistro = (codigo) => {
    const indice = banco.findIndex(rs => rs.codigo == codigo);
    document.querySelector("#codigo_edicao").innerHTML= banco[indice].codigo;
    document.querySelector("#nome_edicao").value = banco[indice].nome;
    document.querySelector("#placa_edicao").value = banco[indice].placa;
    abrirModal($conteiner_modal_edicao);
}

// ** Métodos de Remoção (DELETE)

const removerRegistro = (codigo) => {
    const indice = banco.findIndex(registro => registro.codigo == codigo);
    banco.splice(indice, 1);
    gravarBD();
}

const removerVeiculo = (codigo) => {
    const indice = banco.findIndex(rs => rs.codigo == codigo);
    codigoAtual = codigo; 

    const registro = {
        codigo: codigoAtual,
        nome: banco[indice].nome,
        placa: banco[indice].placa,
        data_entrada: banco[indice].data_entrada,
        hora_entrada: banco[indice].hora_entrada,
        milisegundos_entrada: banco[indice].milisegundos_entrada,
        data_saida: coletarDataAtual(),
        hora_saida: coletarHoraAtual(),
        milisegundos_saida: coletarMilisegundosAtual(),
        valor: calcularValorAPagar(banco[indice].milisegundos_entrada, coletarMilisegundosAtual())
    }

    banco.splice(indice, 1, registro);
    gravarBD();
    exibirTabela();
}

// ** Métodos de Edição (UPDATE)

const salvarEdicao = () => {
    const codigo = document.querySelector("#codigo_edicao").innerHTML;
    const indice = banco.findIndex(rs => rs.codigo == codigo);
    
    if(validarPlaca($placa_edicao.value)){

        const registroAtualizado = {
            codigo: codigo,
            nome: document.querySelector("#nome_edicao").value,
            placa: $placa_edicao.value,
            data_entrada: banco[indice].data_entrada,
            hora_entrada: banco[indice].hora_entrada,
            milisegundos_entrada: banco[indice].milisegundos_entrada,
            data_saida: "",
            hora_saida: "",
            milisegundos_saida: "",
            valor: 0
        }

        banco.splice(indice, 1, registroAtualizado);

        if(gravarBD()){
            alert("Cliente atualizado com sucesso!");
            fecharModal($conteiner_modal_edicao);
            exibirTabela();
        }

    } else{
        alert("Digite a placa conforme o modelo XXX-0000")
    }
}

// ** Métodos Principais

const novoCliente = () => {
    if(validarCampos($formulario_principal)){
        if(validarPlaca($placa.value)){
            salvarDados();
            exibirTabela();
            limparCampos();    
        } else{
            alert("Digite a placa de acordo com o modelo: XXX-0000");
        }
    } else{
        alert("Verifique os campos vazios!");
    }
}

const novosValores = () => {
    if(validarCampos($formulario_precos)){
        salvarValores();
        limparCampos();
        fechar($conteiner_modal_precos);
    } else{
        alert("Verifique os campos vazios!");
    }
}

const acaoCliente = e => {

    const[operacao, codigo] = e.target.id.split("_");

    if(operacao == "editar"){
        exibirRegistro(codigo);
    } else if(operacao == "saida"){
        lerBDValores();
        if(bancoValores.length != 0){
            removerVeiculo(codigo);    
        } else{
            alert("Por gentileza, cadastre valores de cobrança e tolerância pelo botão \"Preços\"")
        }
    } else if(operacao == "comprovante"){
        exibirComprovante(codigo);
    }
    
    exibirTabela();
}

// ** Chamada de Funções Base
limitarCaracteres();

exibirTabela();


// ** Eventos
$nome.addEventListener("keyup", () => $nome.value = filtrarTexto($nome.value));
$placa.addEventListener("keyup", () => $placa.value = mascaraPlaca($placa.value));
$placa_edicao.addEventListener("keyup", () => $placa_edicao.value = mascaraPlaca($placa_edicao.value));
$nome_edicao.addEventListener("keyup", () => $nome_edicao.value = filtrarTexto($nome_edicao.value));

$btnPrecos.addEventListener("click", novoCadastroPrecos);
$btnRelatorio.addEventListener("click", exibirRelatorio);
$btAtualizarEdicao.addEventListener("click", salvarEdicao);
$adicionar.addEventListener("click", novoCliente);
$salvar_valores.addEventListener("click", novosValores);
$campoTabela.addEventListener("click", acaoCliente);

$fechar_valores.addEventListener("click", () => fechar($conteiner_modal_precos));
$fechar_relatorio.addEventListener("click", () => fechar($conteiner_modal_relatorio));
$fechar_comprovante.addEventListener("click", () => fechar($conteiner_modal_comprovante));
$cancelar_edicao.addEventListener("click", () => fechar($conteiner_modal_edicao));

$tolerancia.addEventListener("keyup", () => $tolerancia.value = filtrarNumero($tolerancia.value));
$valor_primeira_hora.addEventListener("keyup", () => $valor_primeira_hora.value = mascaraDinheiro($valor_primeira_hora.value));
$valor_demais_horas.addEventListener("keyup", () => $valor_demais_horas.value = mascaraDinheiro($valor_demais_horas.value));
/**********************************************************************************/
// ** Remoção de marcação vermelha do erro pela class erroCampo
const removerErro = (campo) => campo.classList.remove("erroCampo");


