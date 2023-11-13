import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listas: { nome: string; itens: string[] }[] = [];
  listaAtivaIndex: number = 0;
  novaListaNome: string = '';
  novaTarefa: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // Recupera as listas salvas no armazenamento local
    const savedLists = this.storageService.getItem('listas');
    if (savedLists) {
      this.listas = savedLists;
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
      this.listas[this.listaAtivaIndex].itens.push(this.novaTarefa);
      this.novaTarefa = '';
      this.salvarListas();
    }
  }

  removerTarefa(index: number): void {
    this.listas[this.listaAtivaIndex].itens.splice(index, 1);
    this.salvarListas();
  }

  private salvarListas(): void {
    // Salva as listas no armazenamento local
    this.storageService.setItem('listas', this.listas);
  }
}