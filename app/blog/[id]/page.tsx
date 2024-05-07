import { getAllPosts, getPostById } from "@/services/getPosts";
import { Metadata } from "next";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({
    params: { id },
}: Props): Promise<Metadata> {
    const post = await getPostById(id);

    return {
        title: post.title,
    };
}

export async function generateStaticParams() {
    const posts: any[] = await getAllPosts();

    return posts.map((post) => ({
        slug: post.id.toString(),
    }));
}

export default async function Post({ params: { id } }: Props) {
    const post = await getPostById(id);

    return (
        <>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        </>
    );
}