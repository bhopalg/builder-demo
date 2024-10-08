import {builder, BuilderComponent} from "@builder.io/react";
import "@/builder-registry"
import {BuilderContent} from "@builder.io/sdk";
import React from "react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function getServerSideProps() {
  const page = await builder
      .get("page", {
        userAttributes: {
          urlPath: "/",
        },
        cacheSeconds: 10,
        cachebust: true,
      })
      .toPromise();

  return {
    props: {
      homepage: page || null,
        revalidate: 60,
    },
  };
}

export default function Home({homepage}: {homepage: BuilderContent | null}) {
  console.log(homepage);
  return <BuilderComponent model="page" content={homepage || undefined} />
}
