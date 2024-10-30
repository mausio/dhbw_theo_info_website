export const wait = async (wait) => {
  await new Promise((resolve) => setTimeout(resolve, wait));
};
