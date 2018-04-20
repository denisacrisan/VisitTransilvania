import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';


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

    constructor(private sanitizer: DomSanitizer) { }



    ngOnInit() {
        this.isLoading = true;
        this.svg = this.sanitizer.bypassSecurityTrustHtml("SVG CONTENT");
    }
}
