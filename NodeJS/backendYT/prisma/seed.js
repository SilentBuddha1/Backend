import { config } from 'dotenv';
config(); // Load environment variables before using them

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const userId = "76959d79-f660-4c1c-aa7a-c6b17e8cd734";

const movies = [
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/darkknight.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview: "A thief uses dream-sharing technology to steal corporate secrets.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview: "A former pilot travels through a wormhole seeking a new home for humanity.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview: "An office worker forms an underground fight club that spirals out of control.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://example.com/fightclub.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview: "A hacker discovers the true nature of reality and fights against AI control.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Gladiator",
    overview: "A Roman general becomes a gladiator to seek revenge against an emperor.",
    releaseYear: 2000,
    genres: ["Action", "Drama"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond while finding hope through acts of common decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview: "Crime stories unfold in a nonlinear narrative full of violence and dark humor.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://example.com/pulpfiction.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A young hobbit begins a journey to destroy a powerful ring.",
    releaseYear: 2001,
    genres: ["Fantasy", "Adventure"],
    runtime: 178,
    posterUrl: "https://example.com/lotr1.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Two Towers",
    overview: "The Fellowship continues their quest while war approaches Middle-earth.",
    releaseYear: 2002,
    genres: ["Fantasy", "Adventure"],
    runtime: 179,
    posterUrl: "https://example.com/lotr2.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    overview: "The final battle for Middle-earth decides the fate of all.",
    releaseYear: 2003,
    genres: ["Fantasy", "Adventure"],
    runtime: 201,
    posterUrl: "https://example.com/lotr3.jpg",
    createdBy: userId,
  },
  {
    title: "The Prestige",
    overview: "Two magicians compete to create the perfect illusion.",
    releaseYear: 2006,
    genres: ["Mystery", "Drama"],
    runtime: 130,
    posterUrl: "https://example.com/prestige.jpg",
    createdBy: userId,
  },
  {
    title: "Se7en",
    overview: "Two detectives hunt a serial killer whose crimes mirror the seven deadly sins.",
    releaseYear: 1995,
    genres: ["Crime", "Thriller"],
    runtime: 127,
    posterUrl: "https://example.com/se7en.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview: "The aging patriarch of a crime family transfers control to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "https://example.com/godfather.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather Part II",
    overview: "The Corleone family's history unfolds while Michael expands his criminal empire.",
    releaseYear: 1974,
    genres: ["Crime", "Drama"],
    runtime: 202,
    posterUrl: "https://example.com/godfather2.jpg",
    createdBy: userId,
  },
  {
    title: "The Social Network",
    overview: "A college student creates Facebook and faces legal and personal consequences.",
    releaseYear: 2010,
    genres: ["Drama", "Biography"],
    runtime: 120,
    posterUrl: "https://example.com/socialnetwork.jpg",
    createdBy: userId,
  },
  {
    title: "Whiplash",
    overview: "A drummer faces extreme pressure from a demanding music instructor.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runtime: 107,
    posterUrl: "https://example.com/whiplash.jpg",
    createdBy: userId,
  },
  {
    title: "Joker",
    overview: "A failed comedian in Gotham descends into madness and violence.",
    releaseYear: 2019,
    genres: ["Drama", "Crime"],
    runtime: 122,
    posterUrl: "https://example.com/joker.jpg",
    createdBy: userId,
  },
  {
    title: "Mad Max: Fury Road",
    overview: "A woman rebels against a tyrant in a post-apocalyptic desert.",
    releaseYear: 2015,
    genres: ["Action", "Adventure"],
    runtime: 120,
    posterUrl: "https://example.com/madmax.jpg",
    createdBy: userId,
  },
  {
    title: "Blade Runner 2049",
    overview: "A young blade runner uncovers a secret that could plunge society into chaos.",
    releaseYear: 2017,
    genres: ["Sci-Fi", "Mystery"],
    runtime: 164,
    posterUrl: "https://example.com/bladerunner.jpg",
    createdBy: userId,
  }
]

const main = async () => {
    console.log("Seeding Movies...");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Created movie: ${movie.title}`);
    }
    console.log("Seeding Completed!");
};

main().catch((err) => {
    console.error(err)
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})