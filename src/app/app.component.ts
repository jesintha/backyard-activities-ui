import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { activitiesService } from './services/backyard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [activitiesService]
})
export class AppComponent {
  title = 'backyard';
  constructor(private service: activitiesService) { }

  arrActivities = <any>[];
  arrColumns = ["id", "Activity_Name"];
  // Creat an instance of HttpParams() class, to add URL parameters (or Query String).
  public myFrmData = new HttpParams();

  ngOnInit() {
    this.read();
  }

  // ***** Read data from the database.
  read() {

    // Assign parameters to the HttpParams() class.
    this.myFrmData = this.myFrmData
      .set('Activity_ID', '')
      .set('Activity_Name', '');

    // Call our service to POST our request for the data.
    this.service.get_request(this.myFrmData).subscribe(
      data => {
        this.arrActivities = data;
        console.log(this.arrActivities);
      }
    );


  }
  createNew(e) {
    const activeRow = e.target.parentNode.parentNode.rowIndex;
    const tab = e.target.parentNode.parentNode.parentNode.rows[activeRow];

    let bOk: boolean = false;

    for (let i = 1; i < this.arrColumns.length; i++) {
      const td = tab.getElementsByTagName("td")[i];

      // Check if its a textbox or a SELECT element.
      if (td.childNodes[0].getAttribute('type') == 'text') {
        let val = td.childNodes[0].value;
        console.log(val);
        if (val != '') {
          this.myFrmData = this.myFrmData.set(this.arrColumns[i], val)
          bOk = true;

          // Clear all input and dropdown values.
          td.childNodes[0].value = '';
        }
        else {
          alert('All fields are compulsory!');
          bOk = false;
          break;
        }
      }
    }
    if (bOk) {
      this.myFrmData = this.myFrmData.set('Operation', 'SAVE');     // Set Operation type.
      this.perform_CRUD();
    }
  }



  // Finally, post your request.
  perform_CRUD() {
    // Call "books" service and save all the data.
    console.log(this.myFrmData.get('Operation'))
    if (this.myFrmData.get('Operation') == "SAVE") {
      this.service.post_request(this.myFrmData).subscribe(
        data => {
          this.arrActivities = data;        // Fill the array with new values.
        }
      );
    }

    if (this.myFrmData.get('Operation') == "UPDATE") {
      this.service.patch_request(this.myFrmData).subscribe(
        data => {
          this.arrActivities = data;        // Fill the array with new values.
        }
      );
    }
    if (this.myFrmData.get('Operation') == "DELETE") {
      this.service.delete_request(this.myFrmData).subscribe(
        data => {
          this.arrActivities = data;        // Fill the array with new values.
        }
      );
    }
    var millisecondsToWait = 10000;
    setTimeout(function() {
        // Whatever you want to do after the wait
    }, millisecondsToWait);
    this.service.get_request(this.myFrmData).subscribe(
      data => {
        this.arrActivities = data;        // Fill the array with new values.
      }
    );
  }


  delete(e) {

    let activeRow = e.target.parentNode.parentNode.rowIndex;   // Get the active table row.
    let tab = e.target.parentNode.parentNode.parentNode.rows[activeRow]; // THIS IS OUR TABLE.
    let bOk: boolean = false;

    for (let i = 1; i < this.arrColumns.length; i++) {
      const td = tab.getElementsByTagName("td")[i];
      let val = td.childNodes[0].value
      if (td.childNodes[0].getAttribute('type') == 'text') {
        if (val != '') {
         this.myFrmData = this.myFrmData.set("activity_id", td.childNodes[0].id);
          bOk = true;
        }

      }
    }
    if (bOk) {
      this.myFrmData = this.myFrmData.set('Operation', 'DELETE');     // Set Operation type.
      this.perform_CRUD();
    }

  }
  update(e) {

    let activeRow = e.target.parentNode.parentNode.rowIndex;   // Get the active table row.
    let tab = e.target.parentNode.parentNode.parentNode.rows[activeRow]; // THIS IS OUR TABLE.
    let bOk: boolean = false;

    for (let i = 1; i < this.arrColumns.length; i++) {
      const td = tab.getElementsByTagName("td")[i];
      let val = td.childNodes[0].value
      if (td.childNodes[0].getAttribute('type') == 'text') {
        if (val != '') {
          this.myFrmData = this.myFrmData.set(this.arrColumns[i], td.childNodes[0].value);
          this.myFrmData = this.myFrmData.set("activity_id", td.childNodes[0].id);
          bOk = true;
        }
        else {
          alert('All fields are compulsory!');
          bOk = false;
          break;
        }
      }
    }
    if (bOk) {
      this.myFrmData = this.myFrmData.set('Operation', 'UPDATE');     // Set Operation type.
      this.perform_CRUD();
    }


  }
}