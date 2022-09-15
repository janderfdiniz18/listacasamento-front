import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { usernameValidator } from 'src/app/username.validators';

@Component({
  selector: 'app-cadastro-convidados',
  templateUrl: './cadastro-convidados.component.html',
  styleUrls: ['./cadastro-convidados.component.css']
})
export class CadastroConvidadosComponent implements OnInit {
  public convidadosForm!: FormGroup;
  public convidadosList: any = [];
  public convidadoAdd: any = [];
  
  public produtosList: any = [];
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CadastroConvidadosComponent>) {
    
    this.convidadosForm = this.fb.group({
      nomeConvidado: [null, Validators.compose([
        Validators.required, Validators.minLength(3), usernameValidator])],
        statusConfirmacao: ['', [Validators.required]],
        status: ['', [Validators.required]],
      convidadosDTO: this.fb.array([this.fb.group({convidado:['']})]),
    })
    
  }

  convidadoControl = new FormControl('', Validators.required);
  ngOnInit(): void {
    
  }
  onCancelar(): void {
    this.dialogRef.close();
    this.convidadosForm.reset();
  }
  get getAddInput() {
    return this.convidadosForm.get('convidadosDTO') as FormArray;
  }
  salvarConvidados(){
    
    this.convidadoAdd.push(this.convidadoControl.value)
    this.convidadoAdd.push(this.convidadoControl.value.nomeConvidado)
    console.log(this.convidadosForm.value)
    console.log(this.convidadoAdd.value)
  }

  addProtudo() {
    console.log(this.convidadoControl.value)
    this.convidadoAdd.push(this.convidadoControl.value)
    const control = <FormArray>this.convidadosForm.controls['convidadosDTO'];
    control.push(this.fb.group({ convidado: [this.convidadoControl.value] }))
    console.log(control)
  }
}
