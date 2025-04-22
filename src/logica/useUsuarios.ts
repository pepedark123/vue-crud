import { ref, onMounted } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'

export function useUsuarios() {
  const usuarioStore = useUsuarioStore()

  const nombre = ref('')
  const correo = ref('')
  const idEditando = ref<number | null>(null)
  const filtro = ref('')
  const usuariosFiltrados = ref<Usuario[]>([])

  async function cargarUsuarios() {
    const lista = await usuarioStore.listarUsuarios()
    console.log('Usuarios cargados:', JSON.stringify(lista, null, 2))
    usuariosFiltrados.value = [...lista]
  }

  

  onMounted(() => {
    cargarUsuarios()
  })

  async function guardar() {
    if (idEditando.value !== null) {
      await usuarioStore.actualizarUsuario(idEditando.value, {
        nombre: nombre.value,
        correo: correo.value
      })
      idEditando.value = null
    } else {
      await usuarioStore.agregarUsuario({
        nombre: nombre.value,
        correo: correo.value
      })
    }
    nombre.value = ''
    correo.value = ''
    cargarUsuarios()
  }

  async function editar(usuario: any) {
    nombre.value = usuario.nombre
    correo.value = usuario.correo
    idEditando.value = usuario.id
  }

  async function eliminar(id: number) {
    await usuarioStore.eliminarUsuario(id)
    cargarUsuarios()
  }

  async function buscarPorId() {
    
    const filtroString = String(filtro.value).trim();
    
    if (filtroString === '') {
      
      await cargarUsuarios();
    } else {
      
      const id = Number(filtroString);
      if (!isNaN(id)) {
        
        const usuario = await usuarioStore.getUsuarioPorId(id);
        usuariosFiltrados.value = usuario ? [usuario] : []; 
      }
    }
  }

  return {
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
  }
}