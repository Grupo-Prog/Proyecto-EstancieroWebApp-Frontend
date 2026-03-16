import { Component } from '@angular/core';
import { TestWsComponent } from "../../../core/services/test/ws-test";

@Component({
  selector: 'app-test-page',
  imports: [TestWsComponent],
  templateUrl: './test-page.html',
  styleUrl: './test-page.css',
})
export class TestPage {

}
