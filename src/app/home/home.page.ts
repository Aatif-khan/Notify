import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventResponse } from "../interfaces";
import { Subscription } from "rxjs";
import { EventsService } from "../events.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  events: EventResponse[] = [];
  sub: Subscription;
  constructor(private eventService: EventsService, private nav: NavController) {
    console.log("constructor");
  }
  ngOnInit(): void {
    console.log("ngOnInit");

    this.sub = this.eventService.getAll().subscribe((e) => this.events.push(e));
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy");

    this.sub.unsubscribe();
  }
  getEvents(): EventResponse[] {
    console.log("getEvents");

    return this.events.sort((a, b) =>
      a.event.created > b.event.created ? -1 : 1
    );
  }
  details(response: EventResponse) {
    console.log("details");

    this.nav.navigateForward(`/details/${response.event.id}`);
  }
}
