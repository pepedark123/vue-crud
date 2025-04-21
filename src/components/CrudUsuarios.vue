<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsuarioStore } from '../stores/usuario'

const usuarioStore = useUsuarioStore()

const nombre = ref('')
const correo = ref('')
const idEditando = ref<number | null>(null)

const modoEdicion = computed(() => idEditando.value !== null)
const usuarios = computed(() => usuarioStore.listaUsuarios)

onMounted(() => {
  usuarioStore.obtenerUsuarios()
})

function guardarUsuario() {
  console.log('Guardando usuario...')

  if (idEditando.value !== null) {
    usuarioStore.actualizarUsuario(idEditando.value, {
      nombre: nombre.value,
      correo: correo.value
    })
    idEditando.value = null
  } else {
    usuarioStore.agregarUsuario({
      nombre: nombre.value,
      correo: correo.value
    })
  }

  nombre.value = ''
  correo.value = ''
}

function editarUsuario(usuario: { id: number, nombre: string, correo: string }) {
  nombre.value = usuario.nombre
  correo.value = usuario.correo
  idEditando.value = usuario.id
}

function eliminarUsuario(id: number) {
  usuarioStore.eliminarUsuario(id)
}
</script>

<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Gestión de Usuarios</h1>

    <!-- Formulario -->
    <form @submit.prevent="guardarUsuario" class="card p-4 mb-4">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input v-model="nombre" type="text" id="nombre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input v-model="correo" type="email" id="correo" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ modoEdicion ? "Actualizar" : "Agregar" }} Usuario
      </button>
    </form>

    <!-- Tabla -->
    <table class="table table-bordered table-striped text-dark bg-white">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.correo }}</td>
          <td>
            <button @click="editarUsuario(usuario)" class="btn btn-warning btn-sm me-2">Editar</button>
            <button @click="eliminarUsuario(usuario.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>