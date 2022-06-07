import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { movieId } = req.query;
  var value = parseInt(movieId);

  const deletedMovie = await prisma.movie.delete({
    where: { id: value },
  });

  res.json(deletedMovie);
  // console.log(value);
  // res.json();
};
