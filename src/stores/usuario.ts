import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Usuario {
  id: number
  nombre: string
  correo: string
}

export const useUsuarioStore = defineStore('usuario', () => {
  const listaUsuarios = ref<Usuario[]>([])
  const siguienteId = ref(1)

  function obtenerUsuarios() {
    listaUsuarios.value = [
      { id: 1, nombre: 'Jose', correo: 'jose@ejemplo.com' }
    ]
    siguienteId.value = 2
  }

  function agregarUsuario(usuario: Omit<Usuario, 'id'>) {
    listaUsuarios.value.push({ id: siguienteId.value++, ...usuario })
  }

  function actualizarUsuario(id: number, datos: Partial<Usuario>) {
    const i = listaUsuarios.value.findIndex(u => u.id === id)
    if (i !== -1) {
      listaUsuarios.value[i] = { ...listaUsuarios.value[i], ...datos }
    }
  }

  function eliminarUsuario(id: number) {
    listaUsuarios.value = listaUsuarios.value.filter(u => u.id !== id)
  }

  return {
    listaUsuarios,
    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario
  }
})