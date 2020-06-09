<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo">
          <a href="#" class="brand-logo center">Consoles Lançados!</a>
      </div>
    </nav>

    <div class="row">

      <form class="col s12" >

        <h2>Cadastre um Console</h2>

        <div class="col s12">
          <input type="text" id="name" placeholder="Digite o Nome do Console" v-model="console.name">
        </div>
        <div class="col s12">
          <input type="text" id="owner" placeholder="Digite o Nome da Empresa Fabricante" v-model="console.owner">
        </div>
        <div class="col s4">
          <input type="number" id="units_sold" min="0" placeholder="Digite a Quantidade Aproximada de Vendas" v-model="console.units_sold">
        </div>
        <div class="col s4">
          <input type="number" id="release_year" min="1900" placeholder="Digite o Ano de Lançamento" v-model="console.release_year">
        </div>
        <div class="col s4">
          <input type="number" step="0.01" id="initial_price" min="0" placeholder="Digite o Preço Inicial de Venda (US$)" v-model="console.initial_price">
        </div>
        <div class="col s12">
          <input type="text" id="cpu" placeholder="Digite as Características do Processador" v-model="console.cpu">
        </div>
        <div class="col s4">
          <input type="text" id="memory" placeholder="Digite as Características da Memória" v-model="console.memory">
        </div>
        <div class="col s4">
          <input type="text" id="storage" placeholder="Digite as Características do Armazenamento" v-model="console.storage">
        </div>
        <div class="col s4">
          <input type="number" id="generation" min="0" placeholder="Digite a Geração" v-model="console.generation">
        </div>

          <button class="wafes-effect indigo btn-small" @click.prevent="clearData" v-show="console.name != '' || console.owner != '' || console.units_sold != '' || console.release_year != '' || console.initial_price != '' || console.cpu != '' || console.memory != '' || console.storage != '' || console.generation != ''">Limpar</button>
          <button class="wafes-effect indigo btn-small" @click.prevent="storeAndUpdateConsole" v-show="console.name != '' && console.owner != '' && console.units_sold >= 0 && console.release_year >= 1900 && console.initial_price >= 0 && console.cpu != '' && console.memory != '' && console.storage != '' && console.generation > 0">Enviar</button>

      </form>
    </div>

    <div>
      <h2>Quantidade de Consoles: {{consoles.length}}</h2>
      <h3 v-show="consoles.length==0">Não há Consoles Registrados!</h3>
    </div>

    <div v-show="consoles.length > 1" id="idSearchDiv">
      <input type="number" id="idSearchInput" min="1" placeholder="Buscar pelo Código" v-model="idSearch">
      <button class="wafes-effect indigo btn-small" type="button" name="button" @click="findConsoleById(idSearch)">Buscar</button>

      <table v-show="consoleById.id_console != 0" class = "striped bordered">
          <caption>Console buscado pelo ID</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Fabricante</th>
            <th>Nº Vendas</th>
            <th>Ano Lanç.</th>
            <th>Preço Inicial</th>
            <th>Processador</th>
            <th>Memória</th>
            <th>Armazenamento</th>
            <th>Geração</th>
            <th>Excluir</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{consoleById.id}}</td>
            <td>{{consoleById.name}}</td>
            <td>{{consoleById.owner}}</td>
            <td>{{consoleById.units_sold}}</td>
            <td>{{consoleById.release_year}}</td>
            <td>{{consoleById.initial_price}}</td>
            <td>{{consoleById.cpu}}</td>
            <td>{{consoleById.memory}}</td>
            <td>{{consoleById.storage}}</td>
            <td>{{consoleById.generation}}</td>
            <td><button @click="deleteConsole(consoleById)" class="wafes-effect indigo btn-small">Excluir</button></td>
            <td><button @click="updateConsole(consoleById)" class="wafes-effect indigo btn-small">Alterar</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <table v-show="consoles.length > 0" class = "striped bordered">
      <caption>Todos os Consoles Registrados</caption>
      <thead id="theadSticky">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Fabricante</th>
          <th>Nº Vendas</th>
          <th>Ano Lanç.</th>
          <th>Preço Inicial</th>
          <th>Processador</th>
          <th>Memória</th>
          <th>Armazenamento</th>
          <th>Geração</th>
          <th>Excluir</th>
          <th>Alterar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="console in consoles" :key="console.id">
          <td>{{console.id}}</td>
          <td>{{console.name}}</td>
          <td>{{console.owner}}</td>
          <td>{{console.units_sold}}</td>
          <td>{{console.release_year}}</td>
          <td>{{console.initial_price}}</td>
          <td>{{console.cpu}}</td>
          <td>{{console.memory}}</td>
          <td>{{console.storage}}</td>
          <td>{{console.generation}}</td>
          <td><button @click="deleteConsole(console)" class="wafes-effect indigo btn-small">Excluir</button></td>
          <td><button @click="updateConsole(console)" class="wafes-effect indigo btn-small">Alterar</button></td>
        </tr>
      </tbody>
    </table>

    <div class="game" v-show="consoles.length > 4">
      <a href="https://helpchris.herokuapp.com/" target="blank">Easter Egg</a>
    </div>

  </div>
</template>

<script>
import ConsoleService from './services/consoleservices'

export default {
  data() {
    return {
      idSearch: {},

      console: {
        id_console: '',
        name: '',
        owner: '',
        units_sold: '',
        release_year: '',
        initial_price: '',
        cpu: '',
        memory: '',
        storage: '',
        generation: ''
      },
      consoleById: {
        id_console: '',
        name: '',
        owner: '',
        units_sold: '',
        release_year: '',
        initial_price: '',
        cpu: '',
        memory: '',
        storage: '',
        generation: ''
      },
      consoles: []
    }
  },

  mounted() {
    this.listConsoles();
  },

  methods: {
    listConsoles() {
      this.clearData();
      ConsoleService.findAll().then(response => {
        this.consoles = response.data
      }).catch(error => {
        console.log("Error: " + error);
      })
    },

    findConsoleById(id) {
      this.consoleById = {
        id_console: '',
        name: '',
        owner: '',
        units_sold: '',
        release_year: '',
        initial_price: '',
        cpu: '',
        memory: '',
        storage: '',
        generation: ''
      }
      ConsoleService.findById(id).then(response => {
        this.consoleById = response.data
      }).catch(error => {
        alert("Código não encontrado ou inexistente!")
        console.log("Error: " + error);
      })
    },

    storeAndUpdateConsole() {
      this.consoleById.id_console = 0;
      if(!this.console.id) {
        ConsoleService.store(this.console).then(response => {
          alert("Console registrado!");
          this.console = {};
          this.listConsoles();
          if(this.consoles.length == 4) {
            alert("A Wild 'Easter Egg' Appeared. Find It!");
          }
          return response;
        })} else {
          ConsoleService.update(this.console).then(response => {
            alert("Console alterado!");
            this.console = {};
            this.listConsoles();
            return response;
        })
      }
    },

    deleteConsole(console) {
      this.consoleById.id_console = 0;
      if (confirm("Deseja mesmo excluir o console?")) {
        ConsoleService.delete(console).then(response => {
        alert("Excluido com sucesso!");
        this.listConsoles();
        return response;
        })
      }
    },

    updateConsole(console) {
      this.console = console;
    },

    clearData() {
        this.console.id_console = '';
        this.console.name = '';
        this.console.owner = '';
        this.console.units_sold = '';
        this.console.release_year = '';
        this.console.initial_price = '';
        this.console.cpu = '';
        this.console.memory = '';
        this.console.storage = '';
        this.console.generation = '';
    }
  }
}

</script>

<style>
  @import './assets/css/style.css';
</style>
