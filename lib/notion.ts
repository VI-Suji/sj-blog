import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_SECRET,
});

if (!process.env.NOTION_SECRET) {
    console.error("NOTION_SECRET is missing!");
}

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    tags: string[];
    category?: string;
    description: string;
    published: boolean;
    cover: string;
    readTime?: string;
    content?: string;
}

export const getPublishedPosts = async (): Promise<BlogPost[]> => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const secret = process.env.NOTION_SECRET;

    if (!databaseId || !secret) {
        console.error("NOTION_DATABASE_ID or NOTION_SECRET is missing");
        return [];
    }

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${secret}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filter: {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                sorts: [
                    {
                        property: "Date",
                        direction: "descending",
                    },
                ],
            }),
        });

        if (!response.ok) {
            console.error("Notion API Error:", response.status, response.statusText);
            return [];
        }

        const data = await response.json();

        const posts = await Promise.all(data.results.map(async (page: any) => {
            const props = page.properties;

            // Handle Cover Image
            let cover = "/latest1.png"; // Default fallback
            if (page.cover) {
                if (page.cover.type === "file") {
                    cover = page.cover.file.url;
                } else if (page.cover.type === "external") {
                    cover = page.cover.external.url;
                }
            }

            // Calculate Read Time
            let readTime = "1 min read";
            try {
                const mdblocks = await n2m.pageToMarkdown(page.id);
                const mdString = n2m.toMarkdownString(mdblocks);
                const content = mdString.parent || "";
                const wordCount = content.split(/\s+/).length;
                const minutes = Math.ceil(wordCount / 100);
                readTime = `${minutes} min read`;
            } catch (e) {
                console.error(`Error calculating read time for page ${page.id}:`, e);
            }

            return {
                id: page.id,
                title: props.Name?.title?.[0]?.plain_text || "Untitled",
                slug: props.Slug?.rich_text?.[0]?.plain_text || page.id,
                date: props.Date?.date?.start || new Date().toISOString(),
                tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                category: props.Category?.select?.name || "",
                description: props.Description?.rich_text?.[0]?.plain_text || "",
                published: props.Published?.checkbox || false,
                cover: cover,
                readTime: readTime,
            };
        }));

        return posts;
    } catch (error) {
        console.error("Error fetching posts from Notion:", error);
        return [];
    }
};

export const getPostBySlug = async (slug: string) => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const secret = process.env.NOTION_SECRET;

    if (!databaseId || !secret) return null;

    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${secret}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug,
                },
            },
        }),
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (data.results.length === 0) return null;

    const page = data.results[0];
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        page,
        markdown: mdString.parent,
    };
};
