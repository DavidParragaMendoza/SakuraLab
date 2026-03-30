import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/productos" }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    precio: z.number().optional(),
    descripcion: z.string().optional(),
    material: z.string().optional(),
    dimensiones: z.string().optional(),
    categoria: z.string(),
    imagen: image(),
    claseCSS: z.string().optional(),
    destacado: z.boolean().default(true),
  }),
});

export const collections = { productos };
