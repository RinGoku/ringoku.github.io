import { config } from "../../../site.config";
import Parser from "rss-parser";

export const getArticleFromSNS = async () => {
  const [qiitaData, zennData] = await Promise.all([
    fetch(`https://qiita.com/api/v2/users/${config.qiitaId}/items`),
    fetch(`https://zenn.dev/${config.zennId}/feed`),
  ]);
  const serializedQiitaData = await qiitaData.json();
  const processedData = serializedQiitaData.map((element: any) => ({
    title: element["title"],
    created_at: element["created_at"],
    url: element["url"],
    body: element["body"].slice(0, 50),
  }));

  const rssParser = new Parser();
  const serializedZennData = await rssParser.parseString(await zennData.text());
  return {
    qiita: processedData,
    zenn: serializedZennData,
  } as const;
};
