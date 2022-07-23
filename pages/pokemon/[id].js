import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Details.module.css";

const Details = () => {
    const {
        query: { id },
    } = useRouter();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const getPokemon = async () => {
            const res = await fetch(
                `https://pokemon-ssr.s3.sa-east-1.amazonaws.com/pokemon-main/pokemon/${id}.json`
            );

            setPokemon(await res.json());
        };
        if (id) {
            getPokemon();
        }
    }, [id]);

    return (
        <div>
            <Head>
                <title>{pokemon?.name}</title>
            </Head>
            <main>
                <Link href="/">
                    <a>Back</a>
                </Link>
                <section className={styles.layout}>
                    <header>
                        <Image
                            classname={styles.picture}
                            src={`https://pokemon-ssr.s3.sa-east-1.amazonaws.com/pokemon-main/${pokemon?.image}`}
                            alt={pokemon?.name}
                        />
                        <div>
                            <p className={styles.name}>{pokemon?.name}</p>
                            <p className={styles.type}>
                                {pokemon?.type.join(", ")}
                            </p>
                        </div>
                    </header>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon?.stats.map(({ name, value }) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Details;
