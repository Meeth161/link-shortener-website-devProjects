import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClipboardJS from 'clipboard';
import { BitlyService } from '../services/bitly.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  url: string = '';
  showInvalidInputError: boolean = false;
  invalidInputMessage: string = '';
  showLink: boolean = false;
  link: string = '';
  clipboard = new ClipboardJS('#btn-copy');
  showCopiedMessage: boolean = false;

  constructor(private bitlyService: BitlyService) { }

  ngOnInit(): void {
    this.clipboard.on('success',  (e) => {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      this.showCopiedMessage = true;
      e.clearSelection();
    });

    this.clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }

  shortenURL() {
    console.log(this.url, this.showInvalidInputError)
    if (!this.url) {
      this.showInvalidInputError = true;
      this.invalidInputMessage = 'Please Enter Valid URL to Shorten!';
      console.log(this.url, this.showInvalidInputError)
    } else {
      this.showInvalidInputError = false;
      this.bitlyService.shortenLink(this.url).subscribe((response: any) => {
        this.link = response.link;
        if (this.link) {
          this.showLink = true;
        }
      }, error => {
        this.showLink = false;
        if (error.status === 400) {
          console.log(error);
          this.showInvalidInputError = true;
          this.invalidInputMessage = error.error.description;
          console.log(this.url, this.showInvalidInputError)
        }
      })
    }
  }

}
