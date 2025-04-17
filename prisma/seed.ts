import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear categorías
  const categories = [
    {
      name: 'Electrónicos',
      description: 'Productos electrónicos y gadgets'
    },
    {
      name: 'Ropa',
      description: 'Ropa para hombres, mujeres y niños'
    },
    {
      name: 'Hogar',
      description: 'Artículos para el hogar y decoración'
    },
    {
      name: 'Deportes',
      description: 'Artículos deportivos y fitness'
    },
    {
      name: 'Juguetes',
      description: 'Juguetes y juegos para todas las edades'
    },
    {
      name: 'Zapatillas',
      description: 'Zapatillas para todas las edades'
    }
  ];

  // Crear categorías
  for (const category of categories) {
    await prisma.category.create({
      data: category
    });
  }

  // Obtener todas las categorías creadas
  const createdCategories = await prisma.category.findMany();

  // Crear productos
  const products = [
    {
      name: 'Smartphone X',
      description: 'Último modelo de smartphone con cámara de alta resolución',
      price: 999.99,
      stock: 50,
      category_id: createdCategories[0].id, // Electrónicos
      rating: 4.5
    },
    {
      name: 'Camiseta Básica',
      description: 'Camiseta de algodón 100% para uso diario',
      price: 29.99,
      stock: 100,
      category_id: createdCategories[1].id, // Ropa
      rating: 4.0
    },
    {
      name: 'Sofá Moderno',
      description: 'Sofá de diseño moderno con tejido resistente',
      price: 799.99,
      stock: 10,
      category_id: createdCategories[2].id, // Hogar
      rating: 4.8
    },
    {
      name: 'Balón de Fútbol',
      description: 'Balón oficial de fútbol profesional',
      price: 49.99,
      stock: 30,
      category_id: createdCategories[3].id, // Deportes
      rating: 4.2
    },
    {
      name: 'Set de Lego',
      description: 'Set de construcción para todas las edades',
      price: 89.99,
      stock: 20,
      category_id: createdCategories[4].id, // Juguetes
      rating: 4.7
    },
    {
      name: 'Zapatillas Running',
      description: 'Zapatillas deportivas para running',
      price: 129.99,
      stock: 40,
      category_id: createdCategories[5].id, // Zapatillas
      rating: 4.6
    }
  ];

  // Crear productos
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Categorías y productos creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 