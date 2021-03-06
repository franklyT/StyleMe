export { Helpers };

class Helpers {
  readonly alphanumericKey: string =
    'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_=+[{]};:,<.>/?'; // length is 89
  getRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  lightenDarkenColor(colorArg: string, percentArg: number) {
    const color: any = colorArg.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      ),
      r =
        color[1] > 16
          ? Math.floor(
              Number(color[1]) - Number(color[1]) * Number(percentArg * 0.01)
            )
          : 16,
      g =
        color[2] > 16
          ? Math.floor(
              Number(color[2]) - Number(color[2]) * Number(percentArg * 0.01)
            )
          : 16,
      b =
        color[3] > 16
          ? Math.floor(
              Number(color[3]) - Number(color[3]) * Number(percentArg * 0.01)
            )
          : 16,
      a = color[4] ? color[4] : 1;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  isLight(color: any) {
    // Variables for red, green, blue values
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> Convert it to HEX: http://gist.github.com/93661
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      r = color[1];
      g = color[2];
      b = color[3];
    }

    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 75) {
      return true;
    } else {
      return false;
    }
  }
}
