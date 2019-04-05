export interface NavbarOpc{
    nombre:string,
    router_link:string
  }

export interface Usuario{
   nombre:string,
   apellido:string,
}

export interface UserAuth{
  uid?:string,
  email:string,
  photoURL?:string,
  displayName?: string,
  rol?:string
}