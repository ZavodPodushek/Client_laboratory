import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CompetenceListService } from '../../../services/competence-list.service';

@Component({
  selector: 'app-competence-list-edit',
  templateUrl: './competence-list-dialog-edit.component.html',
  styleUrls: ['./competence-list-dialog-edit.component.css']
})
export class CompetenceListEditComponent implements OnInit {
  title: string;
  subtitle: string;
  userForm: FormGroup;
  competenceGroups$: Observable<Array<string>>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MatDialogRef<CompetenceListEditComponent>,
    private _competenceList: CompetenceListService) {
    this.userForm = fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      group: ['', Validators.required]
    });
    this.competenceGroups$ = this._competenceList.getCompetenceGroup();
  }

  ngOnInit() {
    this.title = this.data.title;
    this.subtitle = this.data.subtitle;
    console.log(this.userForm, this.competenceGroups$);
  }

  checkForm() {
    const { name = {}, description = {}, group = {} } = { ...this.userForm.controls };
    console.log(name, description, group);
  }

  saveCompetence() {
    const form = this.userForm;
    const value = form.value;
    const valid = form.valid;
    return valid ? console.log(value, valid) : this.checkForm();

  }
  cancel() {
    this.dialogRef.close();
  }

}
