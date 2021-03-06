import { Component, OnInit } from '@angular/core';
import { Position } from './data/position';
import {PositionService } from './data/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[] = [];
  private getPositionsSub: any;
  loadingError: boolean = false;

  constructor(private ps: PositionService,private route : Router) { }

  ngOnInit() {
    this.getPositionsSub = this.ps.getPositions().subscribe( data => {
      this.positions = data;
    }, error => {
      this.loadingError = true;
    });
  }

  routePosition(id: string){
    this.route.navigate(["/position", id]);
  }

  ngOnDestroy(){
    if(this.getPositionsSub){this.getPositionsSub.unsubscribe();}
  }
}
