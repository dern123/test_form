import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.getlanguageChoice()
    // let day = document.querySelector('.day')
    // let night = document.querySelector('.night')
    // day?.classList.remove("day")
    // night?.classList.remove("night")

    // this.languageRu = this.authService.getLanguage()
  }
  // getlanguageChoice(){
	// 	this.authService.langChoices.subscribe((lang)=> {
	// 		this.language=lang
  //   })
	// }
}
