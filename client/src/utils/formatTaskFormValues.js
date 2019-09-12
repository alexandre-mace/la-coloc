export default function (values) {
  if (values.hasOwnProperty('hardness')) {
    values.hardness = parseInt(values.hardness);
  }

  return values;
}
