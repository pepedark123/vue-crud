import { defineStore } from 'pinia'


 interface Usuario {
  id: number
  nombre: string
  correo: string
}

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    listaUsuarios: [
      { id: 1, nombre: 'Juan Pérez', correo: 'juanperez@ejemplo.com' },
      { id: 2, nombre: 'Ana García', correo: 'anagarcia@ejemplo.com' },
      { id: 3, nombre: 'Carlos Rodríguez', correo: 'carlosrodriguez@ejemplo.com' }
    ]as Usuario[],
    contadorId: 4
  }),
  actions: {
    async listarUsuarios() {
      return this.listaUsuarios
    },
    async getUsuarioPorId(id: number) {
      return this.listaUsuarios.find(usuario => usuario.id === id) || null
    },
    async agregarUsuario(usuario: { nombre: string, correo: string }) {
      const nuevoUsuario = { id: this.contadorId++, ...usuario }
      this.listaUsuarios = [...this.listaUsuarios, nuevoUsuario]
    },
    async actualizarUsuario(id: number, datos: { nombre: string, correo: string }) {
      this.listaUsuarios = this.listaUsuarios.map(usuario =>
        usuario.id === id ? { ...usuario, ...datos } : usuario
      )
    },
    async eliminarUsuario(id: number) {
      this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.id !== id)
    }
  }
})