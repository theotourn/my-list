import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

interface Tarefa {
  nome: string;
  concluida: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listas: { nome: string; itens: Tarefa[] }[] = [];
  listaAtivaIndex: number = 0;
  novaListaNome: string = '';
  novaTarefa: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // Recupera as listas salvas no armazenamento local
    const savedLists = this.storageService.getItem('listas');
    if (savedLists) {
      this.listas = savedLists.listas || [];
    }
  }

  adicionarLista(): void {
    if (this.novaListaNome.trim() !== '') {
      this.listas.push({ nome: this.novaListaNome, itens: [] });
      this.novaListaNome = '';
      this.salvarListas();
    }
  }

  removerLista(index: number): void {
    this.listas.splice(index, 1);
    this.salvarListas();
  }

  selecionarLista(index: number): void {
    this.listaAtivaIndex = index;
  }

  adicionarTarefa(): void {
    if (this.novaTarefa.trim() !== '') {
      const novaTarefa: Tarefa = { nome: this.novaTarefa, concluida: false };
      this.listas[this.listaAtivaIndex].itens.push(novaTarefa);
      this.novaTarefa = '';
      this.salvarListas();
    }
  }

  concluirTarefa(index: number): void {
    this.listas[this.listaAtivaIndex].itens[index].concluida = true;
    this.salvarListas();
  }
  
  removerTarefa(index: number): void {
    this.listas[this.listaAtivaIndex].itens.splice(index, 1);
    this.salvarListas();
  }
  
  private salvarListas(): void {
    // Salva as listas no armazenamento local
    this.storageService.setItem('listas', { listas: this.listas });
  }
}
