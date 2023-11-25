import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);
app.get('/', (req: Request, res: Response) => {

    res.send("route is working")
});

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        "success": false,
        "message": "API not found",
        "error": {
            "code": 404,
            "description": "API not found!"
        }
    });
});

app.use((req: Request, res: Response) => {
    return res.status(400).json({ success: false, error: "Not a valid routes" });
});

export default app;
