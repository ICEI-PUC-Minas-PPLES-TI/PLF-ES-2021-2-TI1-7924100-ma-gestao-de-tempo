let bellOn = document.getElementsByClassName('toggleBellOff'),
    bellOff = document.getElementsByClassName('toggleBellOn'),
    checkOn = document.getElementsByClassName('toggleCheckOff'),
    checkOff = document.getElementsByClassName('toggleCheckOn'),
    ddTarefasOn = document.getElementsByClassName('toggleDdTarefasOn'),
    ddTarefasOff = document.getElementsByClassName('toggleDdTarefasOff'),
    btnsEditarTarefa = document.getElementsByClassName('btnEditarTarefa'),
    btnsApagarTarefa = document.getElementsByClassName('btnApagarTarefa');

function eventListenerList() {
    loadEventListener(bellOn, toggleBell);
    loadEventListener(bellOff, toggleBell);
    loadEventListener(checkOn, toggleCheck);
    loadEventListener(checkOff, toggleCheck);
    loadEventListener(ddTarefasOn, toggleDdTarefasOn);
    loadEventListener(ddTarefasOff, toggleDdTarefasOff);
    loadEventListener(btnsEditarTarefa, editarTarefa);
    loadEventListener(btnsApagarTarefa, apagarTarefa);
    abrirModalTarefas();
    fecharModalTarefas();
}

function loadEventListener(el, func) {

    if (el.length != undefined) {
        for (let i = 0 ; i < el.length; i++) {
            el[i].addEventListener('click', func);
        }
    } else el.addEventListener('click', func);

}

function toggleDdTarefasOn() {
    let divFuncoes = this.closest('.funcoes');
    let ddTarefa = this.closest('.tarefa');
    let divDesc = ddTarefa.children[1];
    let check = `<i class="bi bi-square toggleCheckOn"></i>`;
    let sino = `<i class="bi bi-bell-slash toggleBellOn"></i>`;

    if (divFuncoes.children[0].classList.contains('toggleCheckOff')) 
        check = `<i class="bi bi-check2-square toggleCheckOff"></i>`;

    if (divFuncoes.children[1].classList.contains('toggleBellOff')) 
        sino = `<i class="bi bi-bell toggleBellOff"></i>`;

    divFuncoes.innerHTML = `<i class="bi bi-chevron-up toggleDdTarefasOff"></i>`+
    `${check + sino}`+`<i class="bi bi-pencil-square btnEditarTarefa"></i>
    <i class="bi bi-trash btnApagarTarefa"></i>`;

    divFuncoes.style.flexDirection = 'column';
    divFuncoes.style.width = '48px';
    divFuncoes.style.margin = '0';

    divDesc.style.width = '75%';

    ddTarefa.style.justifyContent = 'spaceBetween';
    ddTarefa.style.paddingRight = '30px';

    ddTarefa.children[1].style.height = 'auto';
    ddTarefa.children[1].children[0].style.whiteSpace = 'normal';
    ddTarefa.children[1].children[0].style.minHeight = 'fit-content';
    ddTarefa.children[1].children[1].style.whiteSpace = 'normal';
    ddTarefa.children[1].children[1].style.maxHeight = '80%';
    ddTarefa.children[1].children[0].style.marginBottom = '10px';
    ddTarefa.children[1].children[1].style.minHeight = 'fit-content';
    
    ddTarefa.classList.add('tarefa-active');

    eventListenerList();
}

function toggleDdTarefasOff() {
    let divFuncoes = this.closest('.funcoes');
    let ddTarefa = this.closest('.tarefa');
    let divDesc = ddTarefa.children[1];
    let check = `<i class="bi bi-square toggleCheckOn"></i>`;
    let sino = `<i class="bi bi-bell-slash toggleBellOn"></i>`;

    if (divFuncoes.children[1].classList.contains('toggleCheckOff')) 
        check = `<i class="bi bi-check2-square toggleCheckOff"></i>`;

    if (divFuncoes.children[2].classList.contains('toggleBellOff')) 
        sino = `<i class="bi bi-bell toggleBellOff"></i>`;

    divFuncoes.innerHTML = `${check + sino} <i class="bi bi-chevron-down toggleDdTarefasOn"></i>`;

    divFuncoes.style.flexDirection = 'row';
    divFuncoes.style.width = '25%';
    divFuncoes.style.margin = '0 18px 0 0';

    divDesc.style.width = '55%';

    ddTarefa.style.justifyContent = '';
    ddTarefa.style.paddingRight = '0';

    ddTarefa.children[1].style.height = '72px';
    ddTarefa.children[1].children[0].style.minHeight = '38px';
    ddTarefa.children[1].children[0].style.whiteSpace = 'nowrap'
    ddTarefa.children[1].children[0].style.marginBottom = '0';
    ddTarefa.children[1].children[1].style.whiteSpace = 'nowrap';
    ddTarefa.children[1].children[1].style.maxHeight = '65%';
    ddTarefa.children[1].children[1].style.minHeight = '30px';

    ddTarefa.classList.remove('tarefa-active');

    eventListenerList();
}

function toggleBell() {
    let classe = this.classList;
    let idTarefa;
    let bool;
    if (classe.contains('toggleBellOn')) {
        classe.remove('toggleBellOn');
        classe.remove('bi-bell-slash');
        classe.toggle('toggleBellOff');
        classe.toggle('bi-bell');
        bool = true;
    } else {
        classe.remove('toggleBellOff');
        classe.remove('bi-bell');
        classe.toggle('toggleBellOn');
        classe.toggle('bi-bell-slash');
        bool = false;
    }
    if (this.id != 'sinoModal') {
        idTarefa = this.closest('.tarefa').id;
        statusUpdate('bell', idTarefa, bool);
    }
    carregaAlarme();
}

function toggleCheck() {
    let classe = this.classList;
    let idTarefa = this.closest('.tarefa').id;
    if (classe.contains('toggleCheckOn')) {
        classe.remove('toggleCheckOn');
        classe.remove('bi-square');
        classe.toggle('toggleCheckOff');
        classe.toggle('bi-check2-square');
        statusUpdate('check', idTarefa, true);
    } else {
        classe.remove('toggleCheckOff');
        classe.remove('bi-check2-square');
        classe.toggle('toggleCheckOn');
        classe.toggle('bi-square');
        statusUpdate('check', idTarefa, false);
    }
    carregaAlarme();
}

function fecharModalTarefas() {
    let modalContainer = document.getElementById('modal-container');
    let modal = document.querySelector('.adc-tarefas');
    let xModal = document.getElementById('xModal');

    let nomeTarefa = document.getElementById('nomeTarefa');
    let dataTarefa = document.getElementById('dataTarefa');
    let descricaoTarefa = document.getElementById('descricaoTarefa');
    let aviso = document.getElementById('aviso');

    xModal.addEventListener('click', () => {
        modalContainer.style.opacity = 0;
        modalContainer.style.pointerEvents = 'none';
        nomeTarefa.value = '';
        dataTarefa.value = '';
        descricaoTarefa.value = '';
        aviso.innerText = '';
    });

    modal.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
    });
}

function abrirModalTarefas() {
    let modalContainer = document.getElementById('modal-container');
    let modalAdd = document.getElementsByClassName('modalAdc');
    for (let i = 0; i < modalAdd.length; i++) {
        modalAdd[i].addEventListener('click', () => {
            modalContainer.style.opacity = 1;
            modalContainer.style.pointerEvents = 'auto';
        });
    }
}

function salvarTarefas() {
    let nomeTarefa = document.getElementById('nomeTarefa');
    let dataTarefa = document.getElementById('dataTarefa');
    let aviso = document.getElementById('aviso');
    let descricaoTarefa = document.getElementById('descricaoTarefa');

    let modalContainer = document.getElementById('modal-container');
    let botaoSalvarNovaTarefa = document.getElementById('salvarNovaTarefa');

    botaoSalvarNovaTarefa.addEventListener('click', () => {
        let objDadosTarefas = lerTarefas(true);
        if (nomeTarefa.value == '' || dataTarefa.value == '' /*|| horaTarefa.value == ''*/) {
            aviso.innerText = '* Preencha os campos obrigatórios';
            return;
        } else {
            for(let i = 0; i < objDadosTarefas.tarefas.length; i++) {
                if (dataTarefa.value == objDadosTarefas.tarefas[i].data) {
                    aviso.innerText = '* A data e hora selecionada já está em uso';
                    return;
                }
            }
        }
        let boolAlarme;

        if (document.getElementById('sinoModal').classList.contains('toggleBellOff'))
            boolAlarme = true;
        else
            boolAlarme = false;

        let novaTarefa = {
            idUsuario: idUsuarioAtual,
            nome: nomeTarefa.value,
            data: dataTarefa.value,
            alarme: boolAlarme,
            check : false,
            descricao: descricaoTarefa.value
        };

        let aux = lerTarefas();
        aux.tarefas.push(novaTarefa);
        // Salvar os dados no localStorage novamente
        salvarDados(aux, 'dbTarefas');

        modalContainer.style.opacity = 0;
        modalContainer.style.pointerEvents = 'none';
        nomeTarefa.value = '';
        dataTarefa.value = '';
        descricaoTarefa.value = '';
        aviso.innerText = '';
        
        imprimirTarefas();
    });
}

function editarTarefa() {
    let idData = this.closest('.tarefa').id;
    let objDadosTarefas = lerTarefas(true);
    let modalContainer = document.getElementById('modal-container');
    let tarefa;
    let index;
    for (let i = 0; i < objDadosTarefas.tarefas.length; i++) {
        if (objDadosTarefas.tarefas[i].data === idData) {
            tarefa = objDadosTarefas.tarefas[i];
            index = i;
            break;
        }
    }
    document.getElementById('tituloModal').innerHTML = 'Editar Tarefa';
    document.getElementById('divBtnModal').innerHTML = `<span id="aviso"></span>
    <button id="editarTarefa">Salvar</button>`;

    let nomeTarefa = document.getElementById('nomeTarefa');
    let dataTarefa = document.getElementById('dataTarefa');
    let sinoModal = document.getElementById('sinoModal');
    let descricaoTarefa = document.getElementById('descricaoTarefa');
    let aviso = document.getElementById('aviso');

    if (tarefa.alarme) {
        sinoModal.classList.remove('bi-bell-slash');
        sinoModal.classList.remove('toggleBellOn');
        sinoModal.classList.add('bi-bell');
        sinoModal.classList.add('toggleBellOff');
    } else {
        sinoModal.classList.add('bi-bell-slash');
        sinoModal.classList.add('toggleBellOn');
        sinoModal.classList.remove('bi-bell');
        sinoModal.classList.remove('toggleBellOff');
    }

    nomeTarefa.value = tarefa.nome;
    dataTarefa.value = tarefa.data;
    descricaoTarefa.value = tarefa.descricao;

    modalContainer.style.opacity = 1;
    modalContainer.style.pointerEvents = 'auto';

    eventListenerList();

    document.getElementById('editarTarefa').addEventListener('click', () => {
        // realize a validação dos valores inseridos 
        if (nomeTarefa.value == '' || dataTarefa.value == '') {
            aviso.innerText = '* Preencha os campos obrigatórios';
            return;
        } else {
            for(let i = 0; i < objDadosTarefas.tarefas.length; i++) {
                if (dataTarefa.value === objDadosTarefas.tarefas[i].data && dataTarefa.value != tarefa.data) {
                    aviso.innerText = '* A data e hora selecionada já está em uso';
                    return;
                }
            }
        }
    
        let boolAlarme;

        if (sinoModal.classList.contains('toggleBellOff'))
            boolAlarme = true;
        else
            boolAlarme = false;

        let tarefaAlterada = {
            idUsuario: idUsuarioAtual,
            nome: nomeTarefa.value,
            data: dataTarefa.value,
            alarme: boolAlarme,
            check: tarefa.check,
            descricao: descricaoTarefa.value
        };

        objDadosTarefas.tarefas[index] = tarefaAlterada;

        // Salvar os dados no localStorage novamente
        salvarDados(objDadosTarefas, 'dbTarefas');

        modalContainer.style.opacity = 0;
        modalContainer.style.pointerEvents = 'none';
        nomeTarefa.value = '';
        dataTarefa.value = '';
        descricaoTarefa.value = '';
        aviso.innerText = '';
        document.getElementById('tituloModal').innerHTML = 'Criar Tarefa';
        document.getElementById('divBtnModal').innerHTML = `<span id="aviso"></span>
        <button id="salvarNovaTarefa">Salvar</button>`;
        imprimirTarefas();
    });
}
    

function apagarTarefa() {
    let idData = this.closest('.tarefa').id;
    let objDadosTarefas = lerTarefas(true);
    for (let i = 0; i < objDadosTarefas.tarefas.length; i++) {
        if (objDadosTarefas.tarefas[i].data === idData) {
            objDadosTarefas.tarefas.splice(i, 1);
        }
    }
    salvarDados(objDadosTarefas, 'dbTarefas');

    imprimirTarefas();
}

function converteDatas() {
    let objDadosTarefas = lerTarefas(true); // coleta os dados das tarefas
    let nomeDia = [];
    let mesNome = [];
    let ano = [];
    let mes = [];
    let dia = [];
    for (let i = 0; i < objDadosTarefas.tarefas.length; i++) { // loop para coletar as informacoes da data e guardar em arrays do seu tipo
        if(!dia.includes(parseInt(objDadosTarefas.tarefas[i].data.substr(8, 2)))) { // verifica se o dia informado ainda nao foi coletado
            ano[i] = parseInt(objDadosTarefas.tarefas[i].data.substr(0, 4));
            mes[i] = parseInt(objDadosTarefas.tarefas[i].data.substr(5, 2));
            dia[i] = parseInt(objDadosTarefas.tarefas[i].data.substr(8, 2));
        } else continue;
        //let hora = obj.tarefa[index].data.substr(0, 4);
        mesNome[i] = numMesParaNome(mes[i]);
        nomeDia.push(dia[i] + ' de ' + mesNome[i] + ', ' + ano[i]);
    }
    return nomeDia;
}

function imprimirTarefas() {
    let objDadosTarefas = lerTarefas(true); // coleta os dados das tarefas do usuario
    let qtdTarefas = objDadosTarefas.tarefas.length;
    let containerTarefas = document.getElementById('containerTarefas');
    if (qtdTarefas === 0) { // detecta se nao ha alguma tarefa no local storage sendo assim imprimindo um aviso
        containerTarefas.innerHTML = `  <div id="semTarefas">
                                            <i id="btnAdcTarefa" class="bi bi-plus-circle modalAdc"></i>
                                            <h2> Você ainda não possui nenhuma tarefa,<br>
                                            clique no botão para adicionar uma.</h2>
                                        </div>`;
        eventListenerList();
        return;
    }
    let idData = [], idTarefa = [], horario = [], nome = [], desc = [], alarme = [], check = [], subLinha = [];
    for (let i = 0; i < qtdTarefas; i++) { // loop para colocar cada informacao da tarefa em um array do seu tipo
        idTarefa.push(objDadosTarefas.tarefas[i].data);
        horario.push(objDadosTarefas.tarefas[i].data.substr(11, 15));
        nome.push(objDadosTarefas.tarefas[i].nome);
        desc.push(objDadosTarefas.tarefas[i].descricao);
        alarme.push(objDadosTarefas.tarefas[i].alarme);
        check.push(objDadosTarefas.tarefas[i].check);
        if (!idData.includes(objDadosTarefas.tarefas[i].data.substr(0, 10))) { // verifica se o dia informado ainda nao foi coletado
            idData.push(objDadosTarefas.tarefas[i].data.substr(0, 10));
        }
    }
    let nomeDia = converteDatas(); // funcao que interpreta a data e a transforma em texto
    // popula o array das linhas que dividem as tarefas de um mesmo dia
    for (let i = 0; i < idTarefa.length - 1; i++) {
        subLinha[i] = `<span class="sub-linha"></span>`;
        // pega apenas a parte da string que determina o dia da tarefa e a compara com a proxima 
        // se a proxima tarefa for em outro dia a linha que divide tarefas nao sera aplicada
        if (idTarefa[i+1].substr(0,10) != idTarefa[i].substr(0,10)) {
            subLinha[i] = ``;
        }
    }
    subLinha[idTarefa.length - 1] = ``; // popula o ultimo item do array que deve ter tamanho igual a quantidade de tarefas
    containerTarefas.innerHTML = ''; // limpa o innerHTML pois para a impressao ele deve estar vazio
    for (let i = 0; i < nomeDia.length; i++) {
        containerTarefas.innerHTML += criaDia(idData[i], nomeDia[i]); // acrescenta o HTML dos dias  
    }
    let diaCorpo = document.getElementsByClassName('dia_corpo');
    for (let j = 0; j < qtdTarefas; j++) { // loop para interpretar os valores booleanos das tarefas
        check[j] = converteValorParaIcone('check', check[j]);
        alarme[j] = converteValorParaIcone('alarme', alarme[j]);
    }
    for (let i = 0; i < nomeDia.length; i++) { // loops para colocar cada tarefa no seu respectivo dia
            diaCorpo[i].innerHTML = '';
        for (let j = 0; j < qtdTarefas; j++) {
            if (objDadosTarefas.tarefas[j].data.substr(0, 10) === idData[i]) { // verifica se as data das tarefas sao iguais aos dos dias
                diaCorpo[i].innerHTML += criaTarefa(idTarefa[j], horario[j], nome[j], desc[j], check[j], alarme[j], subLinha[j]);
            }
        }
    }
    // recarrega os event listeners
    eventListenerList();
    carregaAlarme();
}

function converteValorParaIcone(tipo, bool) {
    let htmlIcone;
    switch (tipo) {
        case 'check':
            if (bool === true) {
                htmlIcone = `bi bi-check2-square toggleCheckOff`;
            } else {
                htmlIcone = `bi bi-square toggleCheckOn`;
            }
            break;
        case 'alarme':
            if (bool === true) {
                htmlIcone = `bi bi-bell toggleBellOff`;
            } else {
                htmlIcone = `bi bi-bell-slash toggleBellOn`;
            }
            break;
    }
    return htmlIcone;
}

function criaDia(data, nomeDia) {
    let novoDia = ` <div id="${data}" class="dia">
                        <div class="dia_cabecalho">
                            <h2>${nomeDia}</h2>
                            <div class="adc">
                                <a href="#">
                                    <i class="bi bi-plus-circle modalAdc"></i>
                                </a>
                            </div>
                        </div>
                        <span class="linha"></span>
                        <div class="dia_corpo">
                        </div>
                        <span class="linha"></span>
                    </div>
    `;
    return novoDia;
}

function criaTarefa(dataId, horario, nome, desc, checkbox, sino, subLinha) {
    let novaTarefa = `  <div id="${dataId}" class="tarefa">
                            <div class="horario">
                                <h3>${horario}</h3>
                            </div>
                            <div class="descricao">
                                <h2>${nome}</h2>
                                <h4>${desc}</h4>
                            </div>
                            <div class="funcoes">
                                <i class="${checkbox}"></i>
                                <i class="${sino}"></i>
                                <i class="bi bi-chevron-down toggleDdTarefasOn"></i>
                            </div>
                        </div>
                        ${subLinha}
    `;
    return novaTarefa;
}

// BARRA HABITOS

let barra_habitos = {
    
    habitos : [

        {
            "id" : idUsuarioAtual,
            "desc" : "Ler",
            "check" : "false"
        },

        {
            "id" : idUsuarioAtual,
            "desc" : "Água",
            "check" : "false" 
        },

        {
            "id" : idUsuarioAtual,
            "desc" : "Estudar",
            "check" : "false"
        },

        {
            "id" : idUsuarioAtual,
            "desc" : "Exercitar",
            "check" : "false"
        },

        {
            "id" : idUsuarioAtual,
            "desc" : "Meditar",
            "check" : "false"
        },

        {
            "id" : idUsuarioAtual,
            "desc" : "Jogar",
            "check" : "false"
        },

    ]
    
};

function adiciona_info_barra_habito(){

  let db_json = JSON.parse(localStorage.getItem("DB_Habitos"));

  let db_usuario_atual = db_json.habitos.filter(obj => obj.id === idUsuarioAtual);

  if(db_usuario_atual.length == 0 ||localStorage.getItem("DB_Habitos") == null ){

    let novo_db = JSON.stringify(barra_habitos);

    localStorage.setItem("DB_Habitos", novo_db);
  }



  for(let i = 0; i < barra_habitos.habitos.length ; i++){

        let id_inicial = "barra_habito_";
        let texto = (i+1).toString();
        let id_passar = id_inicial + texto;

        define_barra_habito(id_passar, i);

    }  

}

function define_barra_habito(id,indice){

    let barra_habito_definir = document.getElementById(id);

    let bd_habitos = localStorage.getItem("DB_Habitos");

    let json_bd = JSON.parse(bd_habitos);

    let desc_add = json_bd.habitos[indice].desc;

    barra_habito_definir.innerHTML = desc_add;

}

function atualiza_circulo_barra_habito(id, indice){

    let circulo_barra_habito = document.getElementById(id);
    
    let bd_habitos = localStorage.getItem("DB_Habitos");
    let json_bd = JSON.parse(bd_habitos);
    
    if(circulo_barra_habito.style.display == 'none'){
        circulo_barra_habito.style.display = 'block';
        
        json_bd.habitos[indice].check = "true";

    }else{
        circulo_barra_habito.style.display = 'none';
        json_bd.habitos[indice].check = "false";
    }

    localStorage.setItem("DB_Habitos", JSON.stringify(json_bd));

}

function inicia_barra_habito_circulos(){

  let bd_habitos = localStorage.getItem("DB_Habitos");
  let json_bd = JSON.parse(bd_habitos);

    for(let i = 0; barra_habitos.habitos.length; i++){

        let id_inicial = "icon_check_";
        let texto = (i+1).toString();
        let id_passar = id_inicial + texto;

        document.getElementById(id_passar).style.display = "none";

        

    }


}

function editar_habito(id, indice){

    let novo_valor = window.prompt("Informe um novo hábito:");

    if(novo_valor != "" && novo_valor.length < 10){
        let habito_editar = document.getElementById(id);

        let bd_habitos = localStorage.getItem("DB_Habitos");
        let json_bd = JSON.parse(bd_habitos);
    
        json_bd.habitos[indice].desc = novo_valor;
        
        localStorage.setItem("DB_Habitos", JSON.stringify(json_bd));
    
        habito_editar.innerHTML = novo_valor;
    }

}
function armazena_clique_temp(id, indice){

    let temp_habito = {

        "id" : id,
        "indice" : indice
    };

    localStorage.setItem('DB_temp', JSON.stringify(temp_habito));


    
}

function get_clique_temp(){

    return JSON.parse(localStorage.getItem('DB_temp'));
    
}

function adicionar_habito(novo_valor){

    let bd_habitos = localStorage.getItem("DB_Habitos");
    let json_bd = JSON.parse(bd_habitos);

    let tamanho_bd = json_bd.habitos.length;

    let nova_div = "barra_habito_" + (tamanho_bd+1).toString();
    let indice_nova_div = tamanho_bd;
    let icon_nova_div = "icon_check_" + tamanho_bd.toString();
    let circulo_nova_barra = "circulo_" + nova_div;

    /*
        <div class="habito r2 habito_novo">
            <div id= circulo_nova_barra>
                <div class="circulo_barra" onclick="atualiza_circulo_barra_habito(icon_nova_div, indice_nova_div)">
                    <img src="resources/icon_check.svg" alt="icon_check" id=icon_nova_div>
                </div>
            </div>
                <h5>
                    <label id= nova_div class="barra_habito_elementos"
                    data-toggle="modal" data-target="#meuModal"
                    onclick="armazena_clique_temp(nova_div,indice_nova_div)">
                </h5>
        </div>
   
    */ 

    let novo_habito = {
        "id" : "1",
        "desc" : novo_valor,
        "check" : "false"
    };

    json_bd.habitos.push(novo_habito);

    localStorage.setItem("DB_Habitos", JSON.stringify(json_bd));
    
}