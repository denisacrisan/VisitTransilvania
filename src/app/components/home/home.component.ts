import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    quote: string;
    isLoading: boolean;
    svg: SafeHtml;
    visible = false;
    hoveredCounty: string;
    el: any;

    constructor() { }

    mouseEnter(el) {
        this.hoveredCounty = el.target.getAttribute('name');
    }

    ngOnInit() {
        this.isLoading = true;
    }
}
