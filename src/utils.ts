export function downloadStringAsFile(s: string, filename: string = 'file.txt') {
  const url = URL.createObjectURL(new Blob([s]));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

export async function loadTextFileAsString(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (inputEvent) => {
      if (input.files) {
        const reader = new FileReader();
        reader.onloadend = (progressEvent => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result);
          }
          else {
            reject('not a text file?');
          }
        });
        reader.readAsText(input.files[0]);
      } else {
        reject('no file found?');
      }
    };
    input.click();
  });

}
