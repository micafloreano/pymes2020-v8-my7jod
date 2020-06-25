import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  Titulo = "Empresas";
  Items: Empresa [] = [];
  FormReg: FormGroup;
  EstadoForm: string;
  EmpresaAlta:  Empresa;

  constructor(private empresasService: EmpresaService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.getEmpresa();
    this.FormReg = this.formBuilder.group({
         CantidadEmpleados: ['',[Validators.required]],
         FechaFundacion: ['',[Validators.required]],
         IdEmpresa: ['',[Validators.required]],
         RazonSocial: ['',[Validators.required]]
    }
     
    );
  }

  getEmpresa(){
     this.empresasService.get()
    .subscribe((res:Empresa[])=>{
      this.Items = res;

  });
  }

  Modificar(item){
    this.EstadoForm = 'M';
    console.log(item);
    this.FormReg.setValue(item);
  }

  Agregar(){
    this.FormReg.reset();
    this.EstadoForm = 'A';
  }

  Listar(){
    this.EstadoForm = 'L';
    this.getEmpresa();
  }

  Almacenar(){
     if(this.FormReg.invalid){
       console.log(this.FormReg)
       window.alert("Verifique los datos");
       return;
       }
    
    this.EmpresaAlta = new Empresa;
    this.EmpresaAlta.CantidadEmpleados = this.FormReg.value.CantidadEmpleados;
    this.EmpresaAlta.IdEmpresa = this.FormReg.value.IdEmpresa;
    this.EmpresaAlta.RazonSocial = this.FormReg.value.RazonSocial;
    this.EmpresaAlta.FechaFundacion = this.FormReg.value.FechaFundacion;
    this.empresasService.put(this.EmpresaAlta.IdEmpresa,this.EmpresaAlta).subscribe((res:any)=>{
      window.alert("Empresa grabada");
      this.Listar();
    } );
   
   
   
   
    
  }
  Eliminar(IdEmpresa){
    this.empresasService.delete(IdEmpresa).suscribe((res: string) =>{
      this.Volver();
      this.getEmpresa();
      window.alert("registro eliminado");
    })
  }


  Volver(){
    this.EstadoForm = 'L'
  }

}