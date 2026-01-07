# Aadrila - Modern Landing Page

A responsive and modern landing page built with React, TypeScript, and Vite. This project showcases a clean and professional design with smooth animations, responsive layouts, and modern web development practices.

## Features

- Built with React 18 and TypeScript for type safety
- Lightning fast development and builds with Vite
- Styled with Tailwind CSS v4 for modern utility-first styling
- Fully responsive design optimized for all devices
- Smooth animations with Framer Motion and GSAP
- Client-side routing with React Router DOM v7
- SEO optimization with React Helmet Async
- Lazy loading for images with react-lazy-load-image-component
- Modern development tools with ESLint and Prettier
- Performance monitoring with Web Vitals
- Build analysis with source-map-explorer and rollup-plugin-visualizer

## Tech Stack

### Core Framework
- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0

### Styling & UI
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide React 0.562.0
- **Animation**: Framer Motion 12.23.26, GSAP 3.14.2
- **CSS Utilities**: clsx 2.1.1, tailwind-merge 3.4.0

### Performance & Optimization
- **Image Optimization**: vite-plugin-image-optimizer 2.0.3
- **Lazy Loading**: react-lazy-load-image-component 1.6.3
- **Compression**: vite-plugin-compression 0.5.1
- **Bundle Analysis**: rollup-plugin-visualizer 6.0.5

### Development Tools
- **Linting**: ESLint 9.39.1 with TypeScript support
- **Git Hooks**: Husky 9.1.7

### SEO & Meta
- **Head Management**: react-helmet-async 2.0.5
- **Performance Metrics**: web-vitals 5.1.0

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aadrila-landing-page.git
   cd aadrila-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally
- `npm run analyze` - Analyze bundle size with source-map-explorer

### Building for Production

To create a production build:

```bash
npm run build
```

This will create a `dist` directory with the production-ready files. The build process includes:
- TypeScript compilation and type checking
- Asset optimization and compression
- Bundle analysis and optimization
- Image optimization and lazy loading setup

## Project Structure

```
src/
├── assets/           # Static assets (images, icons, etc.)
│   ├── Doc.png       # Documentation preview image
│   ├── Invoice.png   # Invoice preview image
│   ├── License.png   # License preview image
│   └── [7 more assets]
├── components/       # Reusable UI components
│   ├── common/       # Common components (5 items)
│   ├── layout/       # Layout components (3 items)
│   └── sections/     # Page sections (12 items)
├── hooks/            # Custom React hooks
│   ├── useMobile.ts  # Mobile detection hook
│   └── useTheme.ts   # Theme management hook
├── pages/            # Page components
│   ├── About.tsx     # About page component
│   ├── Home.tsx      # Home page component
│   └── NotFound.tsx  # 404 page component
├── App.css           # Global styles
├── App.tsx           # Main application component
├── index.css         # Base styles
└── main.tsx          # Application entry point
```

## Development Guidelines

### Code Quality
- All components are written in TypeScript for type safety
- ESLint configuration enforces consistent code style
- Husky git hooks ensure code quality before commits

### Performance Considerations
- Images are lazy-loaded to improve initial page load
- Bundle analysis tools help identify optimization opportunities
- Web Vitals integration for performance monitoring
- Asset optimization and compression in production builds

### Accessibility
- Semantic HTML5 elements used throughout
- ARIA labels and roles properly implemented
- Keyboard navigation support

## Browser Support

This project supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool and development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [GSAP](https://greensock.com/gsap/) for advanced animation capabilities
- [Lucide React](https://lucide.dev/) for beautiful icon sets
- [React](https://reactjs.org/) for the powerful UI library
