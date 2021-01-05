import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesServices: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesServices.getHeroe()
      .subscribe(resp => {
        this.heroes = resp;
        this.cargando = false;
      });
  }

  borrarHeroes( heroe: HeroeModel, i: number ) {
    Swal.fire({
      title: 'Va a Eliminar?',
      text: `Esta seguro que desea Eliminar ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value ) {
        this.heroesServices.borrarHeroe( heroe.id ).subscribe();
        this.heroes.splice(i, 1);
      }
    });

  }

}
