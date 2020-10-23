'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const HEADER_X = 130;
const HEADER_Y = 40;
const HEADER_GAP = 15;
const NAME_X = 150;
const NAME_Y = 260;
const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;
const GAP = 20;
const BAR_GAP = 50;

/* Функция отрисовки облака */
let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/* Функция определения максимального времени в массиве times  */
let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/* Функция для отображения статистики игроков*/
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);

  /* отрисрвка приветственного заголовка статистики  */
  ctx.fillStyle = `#000000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, HEADER_X, HEADER_Y);
  ctx.fillText(`Список результатов:`, HEADER_X, HEADER_Y + HEADER_GAP);

  /* отрисовка времени прохождения (в цифрах) и имён игроков  */
  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `#000000`;
    ctx.fillText(names[i], NAME_X + (BAR_WIDTH + BAR_GAP) * i, NAME_Y);
    ctx.fillText(Math.round(times[i]), NAME_X + (BAR_WIDTH + BAR_GAP) * i, NAME_Y - ((BAR_MAX_HEIGHT * times[i]) / maxTime) - GAP * 1.5);

    /* Раскрашиваем столбцы статистики игроков  */
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(` + 240 + `, ` + Math.floor(Math.random() * 101) + `%, ` + 50 + `%)`;
    }
    /* Отрисовка столбцов по итогу прохождения игры  */
    ctx.fillRect(NAME_X + (BAR_WIDTH + BAR_GAP) * i, NAME_Y - ((BAR_MAX_HEIGHT * times[i]) / maxTime) - GAP, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime);
  }
};
