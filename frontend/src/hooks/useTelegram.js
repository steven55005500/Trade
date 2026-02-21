export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  tg.ready();
  tg.expand();

  return {
    tg,
    user: tg.initDataUnsafe?.user
  };
};