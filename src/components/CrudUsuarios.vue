<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center">Gestión de Usuarios</h1>

    <form @submit.prevent="guardar" class="card p-4 mb-4">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="nombre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Correo</label>
        <input type="email" v-model="correo" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ idEditando !== null ? 'Actualizar' : 'Agregar' }} Usuario
      </button>
    </form>

    <div class="mb-4 d-flex align-items-center gap-2">
      <input 
         type="number"
         v-model="filtro" 
         @input="buscarPorId" 
         placeholder="Buscar por ID" 
         class="form-control w-25" 
      />
      <button @click="cargarUsuarios" class="btn btn-outline-secondary btn-sm">Mostrar Todos</button>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
       <td>{{ usuario.id }}</td>
       <td>{{ usuario.nombre }}</td>
       <td>{{ usuario.correo }}</td>
       <td>
       <button @click="editar(usuario)" class="btn btn-warning btn-sm me-2">Editar</button>
       <button @click="eliminar(usuario.id)" class="btn btn-danger btn-sm">Eliminar</button>
    </td>
  </tr>
</tbody>
    </table>
  </div>

   <div class="modal fade" id="mostrarTodosModal" tabindex="-1" aria-labelledby="mostrarTodosModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mostrarTodosModalLabel">Lista de Usuarios</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered table-striped">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
                  <td>{{ usuario.id }}</td>
                  <td>{{ usuario.nombre }}</td>
                  <td>{{ usuario.correo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useUsuarios } from '@/logica/useUsuarios';

const {
  nombre,
  correo,
  filtro,
  idEditando,
  usuariosFiltrados,
  guardar,
  editar,
  eliminar,
  buscarPorId,
  cargarUsuarios
} = useUsuarios();

</script>
