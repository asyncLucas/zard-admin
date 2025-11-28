# Zard Admin

A modern admin dashboard built with **Angular 19** and **ZardUI** - a custom component library inspired by shadcn/ui principles, featuring a comprehensive set of UI components with full dark mode support.

## 🚀 Features

- **Modern Angular 19** - Built with the latest Angular features including standalone components, signals, and the new application builder
- **ZardUI Component Library** - A complete set of accessible, customizable UI components
- **Tailwind CSS 4** - Utility-first CSS framework with custom design tokens
- **Dark Mode** - Built-in dark theme support with CSS variables
- **Internationalization** - Multi-language support (en-US, es-ES, pt-BR, pt-PT) using ngx-translate
- **Progressive Web App** - Service worker support for offline functionality
- **ECharts** - Powerful data visualization library
- **Responsive Layout** - Mobile-first design with adaptive components

## 📦 Tech Stack

- **Framework**: Angular 19.2.0
- **Styling**: Tailwind CSS 4.1 with custom CSS variables
- **UI Components**: ZardUI (Custom component library)
- **Icons**: Lucide Angular
- **Charts**: ngx-echarts
- **Backend**: Supabase
- **i18n**: ngx-translate
- **Utilities**:
  - class-variance-authority
  - tailwind-merge
  - date-fns
  - ngx-sonner (toast notifications)

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd zard-admin

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

## 📝 Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Build and watch for changes
npm run watch

# Deploy to GitHub Pages
npm run deploy
```

## 🎨 ZardUI Component Library

ZardUI is a custom component library that provides a comprehensive set of pre-built, accessible components. All components are located in `src/app/shared/components/` and follow a consistent design system.

### Available Components

#### Layout & Navigation

- **Layout** - Main application layout with sidebar support
- **Menu** - Navigation menu components
- **Breadcrumb** - Hierarchical navigation
- **Tabs** - Tabbed interfaces
- **Divider** - Visual separators

#### Form Components

- **Form** - Form wrapper with validation
- **Input** - Text input fields
- **Select** - Dropdown select
- **Checkbox** - Checkboxes
- **Radio** - Radio buttons
- **Switch** - Toggle switches
- **Date Picker** - Date selection
- **Calendar** - Full calendar component
- **Dynamic Form** - Programmatic form generation

#### Data Display

- **Table** - Data tables with sorting and pagination
- **Card** - Content containers
- **Badge** - Status indicators
- **Avatar** - User avatars
- **Pagination** - Page navigation
- **Progress Bar** - Loading indicators
- **Skeleton** - Loading placeholders

#### Feedback & Overlays

- **Dialog** - Modal dialogs
- **Popover** - Contextual popovers
- **Tooltip** - Hover tooltips
- **Toast** - Notification messages (via ngx-sonner)

### Utility Functions

ZardUI includes utility functions for common tasks:

- **`cn()`** - Merge Tailwind classes with tailwind-merge
- **`mergeClasses()`** - Combine class names
- **Date utilities** - Date formatting and manipulation
- **Number utilities** - Number formatting helpers

Located in `src/app/shared/utils/`

## 🏗️ Project Structure

```
src/app/
├── modules/                    # Feature modules
│   ├── authentication/         # User authentication
│   ├── dashboard/             # Main dashboard
│   ├── profile/               # User profile
│   ├── settings/              # Application settings
│   ├── transactions/          # Transaction management
│   └── mind-maps/             # Mind mapping features
├── shared/                    # Shared resources
│   ├── components/            # ZardUI component library
│   ├── services/              # Shared services
│   ├── pipes/                 # Custom pipes
│   ├── interceptors/          # HTTP interceptors
│   ├── layouts/               # Layout components
│   └── utils/                 # Utility functions
└── environments/              # Environment configurations
```

## 🎯 Key Features

### Modern Angular Patterns

- **Standalone Components** - No NgModules required
- **Signals** - Reactive state management
- **Application Builder** - New build system for better performance
- **Typed Forms** - Type-safe reactive forms
- **Route-based Code Splitting** - Lazy loading for optimal bundle size

### Internationalization

Multi-language support with lazy-loaded translation files:

```typescript
// Translations in public/assets/i18n/
// en-US.json, es-ES.json, pt-BR.json, pt-PT.json

// Usage in components
this.translate.get('KEY').subscribe((text) => {
  // Use translated text
});
```

### State Management

The project uses Angular services with RxJS for state management:

- `profile.state.ts` - User profile state
- `transactions.state.ts` - Transaction state
- `pagination.state.ts` - Pagination state

## 🎨 Theming

### Color Palette

The design system uses OKLCH color space for perceptually uniform colors:

- **Background/Foreground** - Main text and background colors
- **Primary** - Main brand color
- **Secondary** - Secondary actions
- **Muted** - Subdued elements
- **Accent** - Highlighted elements
- **Destructive** - Error and delete actions
- **Chart Colors** - Data visualization palette

### Border Radius

Consistent border radius throughout the application:

```css
--radius-sm: calc(var(--radius) - 4px); /* 6px */
--radius-md: calc(var(--radius) - 2px); /* 8px */
--radius-lg: var(--radius); /* 10px */
--radius-xl: calc(var(--radius) + 4px); /* 14px */
```

## 🔧 Configuration

### Component Aliases

Import paths are configured in `components.json`:

```json
{
  "aliases": {
    "components": "src/app/shared/components",
    "utils": "src/app/shared/utils"
  }
}
```

Use `@/components/` and `@/utils/` for imports.

### TypeScript Configuration

- ES2022 target
- Strict type checking enabled
- Path aliases configured in `tsconfig.json`

## 📱 PWA Support

Service worker configuration in `ngsw-config.json` enables:

- Offline functionality
- Asset caching
- Background sync
- Install prompts

## 🚀 Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

This builds the application with the correct base href and deploys to GitHub Pages.

## 📄 License

Apache

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

@asyncLucas

---

Built with ❤️ using Angular and ZardUI
