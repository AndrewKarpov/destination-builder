# Destination Builder

A React + TypeScript application for configuring data destination providers using Vite.

## Project Structure

```
src/
├── components/        # React components (forms, wizards, storage)
├── providers/         # Provider configuration, schema, and URL utilities
├── ui/               # Reusable UI components (button, input, select, field)
├── custom/           # Custom components (secret input)
├── styles/           # Global styles (reset, design tokens)
├── api/              # Backend integration (mock backend)
└── main.tsx          # Application entry point
```

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build: `npm run build`

## Key Features

- Provider wizard for guided setup
- Form-based provider configuration
- Secret input handling
- Storage container management
- Responsive UI with design tokens

 ## Providers Module
 * This module manages data providers for the destination builder application.
 * It handles configuration, schema definitions, and URL generation for various data sources.

 # Files
  - `config.ts` - Provider configuration settings and initialization
  - `schema.ts` - Data schema definitions for provider validation
  - `url.ts` - URL generation and manipulation utilities for providers
 # Adding a New Provider
 To add a new provider, follow these steps:
 
 1. **Update `schema.ts`**
    - Define the schema/interface for your new provider's configuration
    - Include all required and optional fields for the provider
 2. **Update `config.ts`**
    - Add the provider configuration object with default values
    - Register the new provider in the provider factory
 3. **Update `url.ts`**
    - Add URL generation/formatting logic for the new provider
    - Handle provider-specific URL construction patterns
 # Usage
 * Providers are loaded through the configuration module and can be accessed
 * throughout the application via their registered identifiers.
