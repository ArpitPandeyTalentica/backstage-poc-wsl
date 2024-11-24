import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// Sample weather data
const weatherForecasts = [
  {
    date: {
      year: 2024,
      month: 10,
      day: 9,
      dayOfWeek: 2,
      dayOfYear: 282,
      dayNumber: 282,
    },
    temperatureC: 20,
    temperatureF: 68,
    summary: 'Sunny',
  },
  {
    date: {
      year: 2024,
      month: 10,
      day: 10,
      dayOfWeek: 3,
      dayOfYear: 283,
      dayNumber: 283,
    },
    temperatureC: 22,
    temperatureF: 72,
    summary: 'Partly cloudy',
  },
];

// Middleware to check for authentication token
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader;

  if (!token) {
    res.sendStatus(401); // Unauthorized if no token is provided
    return;
  }

  if (token === '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') {
    next(); // If valid token, proceed to the route
  } else {
    res.sendStatus(403); // Forbidden if token is invalid
  }
};

// Define the GET endpoint for WeatherForecast with authentication
router.get('/WeatherForecast', authenticateToken, (_req: Request, res: Response) => {
  res.status(200).json(weatherForecasts);
});

export default router;