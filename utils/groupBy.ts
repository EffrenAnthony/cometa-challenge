export const groupBy = (array:any, key:string) => {
  return array.reduce((prev:any, curr:any) => {
    (prev[curr[key]] = prev[curr[key]] || []).push(curr);
    return prev;
  }, {});
};