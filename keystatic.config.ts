import { config, fields, collection } from '@keystatic/core';

const isGithubMode =
  import.meta.env.PROD ||
  import.meta.env.MODE === 'github' ||
  import.meta.env.PUBLIC_KEYSTATIC_MODE === 'github';

export default config({
  locale: 'es-ES',
  storage: isGithubMode
    ? {
        kind: 'github',
        repo: {
          owner: 'DavidParragaMendoza',
          name: 'SakuraLab',
        },
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'Sakura Lab - Admin',
    },
    navigation: {
      Catálogo: ['productos', 'categorias'],
    },
  },
  collections: {
    productos: collection({
      label: 'Productos / Trabajos',
      slugField: 'titulo',
      path: 'src/content/productos/*',
      format: { contentField: 'contenido' },
      columns: ['titulo', 'categoria', 'precio', 'destacado'],
      schema: {
        titulo: fields.slug({
          name: {
            label: 'Título del Producto',
            description: 'Nombre del trabajo o producto (ej: Lámpara de Litofanía 3D Personalizada)',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Identificador URL (Slug)',
            description: 'Se genera automáticamente a partir del título para el enlace del producto',
          },
        }),
        categoria: fields.relationship({
          label: 'Categoría',
          description: 'Selecciona una categoría existente. Si necesitas una nueva, créala primero en la sección "Categorías" del menú lateral.',
          collection: 'categorias',
          validation: { isRequired: true },
        }),
        precio: fields.number({
          label: 'Precio Base ($ USD)',
          description: 'Precio referencial del producto (ej: 14.99)',
          defaultValue: 14.99,
          step: 0.01,
        }),
        imagen: fields.image({
          label: 'Fotografía Principal',
          description: 'Sube una imagen clara del trabajo. En la galería principal se mostrará en formato cuadrado (1:1).',
          directory: 'src/assets/imgs',
          publicPath: '../../assets/imgs/',
          validation: { isRequired: true },
        }),
        descripcion: fields.text({
          label: 'Descripción del Producto',
          description: 'Describe los detalles, usos recomendados y opciones de personalización.',
          multiline: true,
        }),
        material: fields.text({
          label: 'Materiales y Acabados',
          description: 'Ej: Madera MDF ecológica con corte láser de precisión / Filamento PLA biodegradable.',
          multiline: true,
        }),
        dimensiones: fields.text({
          label: 'Dimensiones / Medidas',
          description: 'Ej: 20 cm de alto x 14 cm de ancho x 10 cm de profundidad.',
        }),
        destacado: fields.checkbox({
          label: 'Mostrar en la galería principal',
          description: 'Si está activo, el trabajo aparecerá visible en la página de inicio.',
          defaultValue: true,
        }),
        contenido: fields.emptyContent({ extension: 'md' }),
      },
    }),
    categorias: collection({
      label: 'Categorías',
      slugField: 'nombre',
      path: 'src/content/categorias/*',
      format: { data: 'json' },
      columns: ['nombre', 'descripcion'],
      schema: {
        nombre: fields.slug({
          name: {
            label: 'Nombre de la Categoría',
            description: 'Ej: Impresión 3D, Corte Láser, Sublimación, Litofanía',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Identificador (Slug)',
            description: 'Se genera automáticamente a partir del nombre',
          },
        }),
        descripcion: fields.text({
          label: 'Descripción corta (Opcional)',
          description: 'Breve descripción de este tipo de servicio o categoría.',
          multiline: true,
        }),
      },
    }),
  },
});
