# NOTE-APP

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <>
cd Note_Taking_app
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

4. Start the application:

```bash
npm start
```

### Development

To run in development mode with hot reload:

```bash
npm run dev
```

### Build

To create a production build:

```bash
npm run build
```

### Testing

Run tests with:

```bash
npm test
```

### Troubleshooting

If you encounter issues:

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that Node.js version matches requirements
- Ensure all environment variables are properly configured
