import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bodypage',
  templateUrl: './bodypage.component.html',
  styleUrls: ['./bodypage.component.scss']
})
export class BodypageComponent implements OnInit {
  constructor() { }
  @Input() headingPageShow: boolean = true;
  @Input() headingPage: string = "";

  ngOnInit(): void {
  }

}
