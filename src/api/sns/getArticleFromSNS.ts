import { config } from "../../../site.config";
import Parser from "rss-parser";

export const getArticleFromSNS = async () => {
  const [qiitaData, zennData] = await Promise.all([
    fetch(`https://qiita.com/${config.zennId}/feed.atom`),
    fetch(`https://zenn.dev/${config.zennId}/feed`),
  ]);
  const rssParser = new Parser();
  const serializedQiitaData = await rssParser.parseString(
    await qiitaData.text()
  );
  // const processedData = serializedQiitaData.map((element: any) => ({
  //   title: element["title"],
  //   created_at: element["created_at"],
  //   url: element["url"],
  //   body: element["body"].slice(0, 50),
  //   date: element["created_at"],
  // }));

  const serializedZennData = await rssParser.parseString(await zennData.text());
  return {
    qiita: serializedQiitaData,
    zenn: serializedZennData,
  } as const;
};
