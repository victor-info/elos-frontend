import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Tools } from './../Tools';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core'
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closeModal') myModal:ElementRef;

  validatingForm: FormGroup;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  //Property for the user
  private tools:Tools;
  public apiurl = "http://elos-backend.test/tools";
  public toolslist;

  ngOnInit() {
    this.tools = new Tools({
          title:"",
          description: "", 
          link: ""
        });
    
    this.http.get(this.apiurl + '/view').subscribe(data => {
        console.log(data);
        this.toolslist = data;
        let arr = [];
        for(let key in data){
           arr.push(data[key]);
        }
        console.log(arr);
      });
  }

  addTools(tools){
    console.log(this.tools);

    const req = this.http.post(this.apiurl + '/add', tools)
      .subscribe(
        res => {
          console.log('res');
          console.log(res);
          this.toastr.success('Sucesso!', 'Ferramenta adicionada!');
          this.myModal.nativeElement.click();
          console.log(this.myModal);
          this.http.get(this.apiurl + '/view').subscribe(data => {
            console.log(data);
            this.toolslist = data;
            let arr = [];
            for(let key in data){
               arr.push(data[key]);
            }
            console.log(arr);
          });
        },
        err => {
          console.log('err');
          console.log(err);
        }
      );
      console.log(req);
  }

  deleteTool(tool_id, name){

    if(confirm("Are you sure to delete " +name)) {

      this.tools = new Tools({
        id: tool_id,
      });

      const req = this.http.post(this.apiurl + '/delete', tool_id)
      .subscribe(
        res => {
          console.log('res');
          console.log(res);
          this.toastr.success('Sucesso!', 'Ferramenta deletada!');
        },
        err => {
          console.log('err');
          console.log(err);
        }
      );
      console.log(req);

    }
  }

  onFormSubmit(toolsForm: NgForm) {
    this.tools.title = toolsForm.value.title
    this.tools.description = toolsForm.value.description
    this.tools.link = toolsForm.value.link
    this.addTools(this.tools);
  }
}
