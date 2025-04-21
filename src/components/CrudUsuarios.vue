<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsuarioStore } from '../stores/usuario'

const usuarioStore = useUsuarioStore()

const nombre = ref('')
const correo = ref('')
const idEditando = ref<number | null>(null)

onMounted(() => {
  usuarioStore.obtenerUsuarios()
})

function guardar() {
  if (idEditando.value) {
    usuarioStore.actualizarUsuario(idEditando.value, { nombre: nombre.value, correo: correo.value })
    idEditando.value = null
  } else {
    usuarioStore.agregarUsuario({ nombre: nombre.value, correo: correo.value })
  }
  nombre.value = ''
  correo.value = ''
}

function editar(id: number) {
  const usuario = usuarioStore.listaUsuarios.find(u => u.id === id)
  if (usuario) {
    nombre.value = usuario.nombre
    correo.value = usuario.correo
    idEditando.value = usuario.id
  }
}
</script>

<template>
  <div>
    <h2>Gestión de Usuarios</h2>
    <form @submit.prevent="guardar">
      <input v-model="nombre" placeholder="Nombre" />
      <input v-model="correo" placeholder="Correo electrónico" />
      <button type="submit">{{ idEditando ? 'Actualizar' : 'Agregar' }}</button>
    </form>

    <ul>
      <li v-for="usuario in usuarioStore.listaUsuarios" :key="usuario.id">
        {{ usuario.nombre }} - {{ usuario.correo }}
        <button @click="editar(usuario.id)">Editar</button>
        <button @click="usuarioStore.eliminarUsuario(usuario.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>