import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Movie({ movie }) {
  const router = useRouter();

  const deleteMovie = async (movieId) => {
    const response = await fetch(`/api/${movieId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    // return await response.json();
    router.reload(window.location.pathname);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{movie.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>{movie.title}</h2>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
        <Link href="/">
          <button class="me-2 btn btn-primary">Back</button>
        </Link>
        <Link href="/">
          <button class="btn btn-danger" onClick={() => deleteMovie(movie.id)}>
            Delete
          </button>
        </Link>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { movieId } = context.query;
  var value = Number(movieId);

  const movie = await prisma.movie.findFirst({
    where: {
      id: value,
    },
  });

  console.log(value);

  return {
    props: {
      movie,
    },
  };
}
