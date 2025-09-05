// Constantes de la aplicación
export const APP_CONFIG = {
  name: 'Hotel Imperial',
  description: 'Sistema de comentarios para Hotel Imperial',
  version: '1.0.0',
  author: 'Hotel Imperial Team'
};

export const FIREBASE_CONFIG = {
  collections: {
    COMMENTS: 'Comments',
    USERS: 'Users'
  }
};

export const UI_CONFIG = {
  notifications: {
    defaultDuration: 5000,
    positions: {
      top: 'top-4',
      right: 'right-4'
    }
  },
  comments: {
    defaultRating: 5,
    maxCommentLength: 1000,
    sortOptions: ['newest', 'oldest', 'rating'] as const,
    ratingOptions: [1, 2, 3, 4, 5] as const
  }
};

export const MESSAGES = {
  auth: {
    loginSuccess: '¡Sesión iniciada correctamente!',
    loginError: 'Error al iniciar sesión. Intenta de nuevo.',
    logoutSuccess: 'Sesión cerrada correctamente',
    logoutError: 'Error al cerrar sesión. Intenta de nuevo.'
  },
  comments: {
    loading: 'Cargando comentarios...',
    noComments: 'No hay comentarios aún. ¡Sé el primero en comentar!',
    noFilteredComments: 'No hay comentarios con esta calificación',
    submitSuccess: 'Comentario publicado correctamente',
    submitError: 'Error al publicar comentario',
    submitting: 'Enviando...',
    submitButton: 'Publicar Comentario'
  },
  errors: {
    permissionDenied: 'Error de permisos',
    permissionMessage: 'No se pueden cargar los comentarios debido a restricciones de seguridad.',
    networkError: 'Error de conexión. Verifica tu internet.',
    unknownError: 'Ha ocurrido un error inesperado'
  }
};
