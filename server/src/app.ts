import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ALLOWED_ORIGINS, NODE_ENV } from "./config/env";

// Import routes
import routes from "./routes";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development)
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
    });
});

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        error: NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

export default app;