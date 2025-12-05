import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if(!movie) {
        return res.status(404).json({
            error: "Movie not found"
        });
    }

    const existingInWatchlist = await prisma.watchlistItem.findFirst({
        where: {
            userId: req.user.id,
            movieId: movieId,
        },
    });

    if(existingInWatchlist) {
        return res.status(400).json({
            error: "Movie already in watchlist"
        });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });
    res.status(201).json({
        status: "Success",
        data: {
            watchlistItem
        }
    })
};

export { addToWatchlist };