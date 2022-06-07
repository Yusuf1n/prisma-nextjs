import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home({ data }) {
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState(data);

  const router = useRouter();

  async function saveMovie(e) {
    e.preventDefault();
    // console.log(formData);
    setMovies([...movies, formData]);

    const response = await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    router.reload(window.location.pathname);

    return await response.json();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className={styles.movielist}>
          {movies.map((item) => (
            <li key="item.id">
              <Link href={`/movies/${item.id}`}>
                <span>
                  <strong role="button">{item.title}</strong>
                </span>
              </Link>
              <span>{item.year}</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>

        <form className={styles.movieform} onSubmit={saveMovie}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={(e) =>
              setFormData({ ...formData, year: +e.target.value })
            }
          />
          <textarea
            name="description"
            id=""
            col="30"
            row="10"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <button type="submit">Add movie</button>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany();

  return {
    props: {
      data: movies,
    },
  };
}
