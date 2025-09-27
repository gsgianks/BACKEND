import { Body, ConsoleLogger, Controller, Get, Headers, Post } from '@nestjs/common';
import { FirebaseService } from '../services';
import { Claims, Data,  Privilegios, Usuario } from 'src/interfaces';

@Controller('user')
export class UserController {

  constructor(private readonly firebase: FirebaseService) {}

  @Get()
  async getUser() {
    let usuario =  await this.firebase.getUser('rNkWyVoCvmMcHSofR7grufbIVaj2');
    return usuario;
  }

  @Get('privilegios')
  async getPrivilegios(@Body() data:Data) {
    let privilegios:any = await this.firebase.getUserClaims(data.token);
    return privilegios;
  }

  @Post('privilegios')
  async setPrivilegios(@Body() data:Data) {
    let resultado:boolean = false;
    let privilegios:Privilegios = await this.firebase.getUserClaims(data.token);
    if(privilegios.superAdmin){
      let usuario =  await this.firebase.getUser(data.uid);
      if(usuario){
        const claims:Claims = { privilegios : data.privilegios};
        resultado = await this.firebase.setUserClaims(data.uid, claims);
      }
    }
    return resultado;
  }

  @Post('crearUsuario')
  async createUser(@Headers() headers: any, @Body() data:Usuario) {
    let resultado:boolean = false;     
    let privilegios:Privilegios = await this.firebase.getUserClaims(headers.token);
    if(privilegios.superAdmin){
      resultado = await this.firebase.createUser(data.uid, data.email);    
      if(resultado){        
        const claims:Claims = { privilegios : data.privilegios};       
        resultado = await this.firebase.setUserClaims(data.uid, claims);
      }
    return resultado;
  }
}

@Post('eliminarUsuario')
  async deleteUser(@Headers() headers: any, @Body() data:Data) {
    let resultado:boolean = false;         
    let privilegios:Privilegios = await this.firebase.getUserClaims(headers.token);
    if(privilegios.superAdmin){
      resultado = await this.firebase.deleteUser(data.uid);          
      }
    return resultado;
  }
}