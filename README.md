# Imperio del Auto 🚗

Una aplicación web moderna para la gestión de automóviles, construida con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Características

- **Interfaz moderna**: Diseño responsive con Tailwind CSS
- **Componentes UI**: Biblioteca de componentes reutilizables con Radix UI
- **Navegación**: Sistema de rutas con React Router
- **Autenticación**: Páginas de login y registro
- **Dashboard**: Panel de control para gestión de vehículos
- **TypeScript**: Tipado estático para mayor seguridad del código

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js) o **yarn**

### Verificar instalación

```bash
node --version
npm --version
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd imperio-del-auto
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno (opcional)

Si el proyecto requiere variables de entorno, crea un archivo `.env` en la raíz:

```bash
cp .env.example .env
```

## 🚀 Ejecutar el Proyecto

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173`

### Otros Comandos Disponibles

```bash
# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📁 Estructura del Proyecto

```
imperio-del-auto/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes y recursos
│   │   └── ui/            # Componentes UI reutilizables
│   ├── lib/               # Utilidades y configuraciones
│   ├── pages/             # Páginas de la aplicación
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── package.json
├── tsconfig.json          # Configuración TypeScript
├── tailwind.config.js     # Configuración Tailwind
└── vite.config.ts         # Configuración Vite
```

## 🎨 Tecnologías Utilizadas

- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de CSS utilitario
- **Radix UI**: Componentes de interfaz accesibles
- **React Router**: Navegación entre páginas
- **Lucide React**: Iconos modernos
- **ESLint**: Linter para mantener calidad del código

## 📱 Páginas Disponibles

- **Home** (`/`): Página principal
- **Login** (`/login`): Página de inicio de sesión
- **Register** (`/register`): Página de registro
- **Dashboard** (`/dashboard`): Panel de control

## 🔧 Scripts de Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter para verificar el código |

## 🐛 Solución de Problemas

### Error de dependencias

Si encuentras errores de dependencias:

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript

Si hay errores de TypeScript:

```bash
# Verificar tipos
npx tsc --noEmit
```

### Puerto ocupado

Si el puerto 5173 está ocupado, Vite automáticamente usará el siguiente puerto disponible.

## 📦 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. El despliegue se realizará automáticamente

### Despliegue en Netlify

1. Sube los archivos de la carpeta `dist/` a Netlify
2. Configura la redirección SPA en `_redirects`:
   ```
   /* /index.html 200
   ```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

---

¡Disfruta desarrollando con Imperio del Auto! 🚗✨
