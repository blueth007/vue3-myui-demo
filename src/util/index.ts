// 获取assets静态资源
export const getAssetsImage = (url: string,file:string="images") => {
  return new URL(`../assets/${file}/${url}`, import.meta.url).href;
};
