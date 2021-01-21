import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()  
export class activitiesService {  
    constructor (private httpService: HttpClient) { }  

    public get_request(frmData) {
        console.log("get all acticities");
        let activitiesList = this.httpService.get('http://localhost:8081/backyard/activities', frmData)
        .pipe();

        return activitiesList;  
    } 

    public post_request(frmData) {

        var requestBody = 
        {
            "activityName": frmData.get("Activity_Name")
        }

        let activitiesList = this.httpService.post('http://localhost:8081/backyard/activity', requestBody, httpOptions)
        .pipe();
        return activitiesList;
    } 

    public patch_request(frmData) {

        var requestBody = 
        {
            "activityName": frmData.get("Activity_Name")
        }

        var id = frmData.get("activity_id");
        let activitiesList = this.httpService.patch('http://localhost:8081/backyard/activity/'+id, requestBody, httpOptions)
        .pipe();

        return  activitiesList;  
    } 
    public delete_request(frmData) {

        var id = frmData.get("activity_id");
        let activitiesList = this.httpService.delete('http://localhost:8081/backyard/activity/'+id,)
        .pipe();

        return  activitiesList;  
    } 
}