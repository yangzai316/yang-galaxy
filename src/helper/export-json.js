export const exportJSON = (data, filename) => {
  let blob = new Blob([data], { type: 'application/json;charset=utf-8' }),
    a = document.createElement('a');
  a.download = filename;

  a.href = window.URL.createObjectURL(blob);

  a.dataset.downloadurl = ['application/json;charset=utf-8', a.download, a.href].join(':');

  let event = new MouseEvent('click', {});

  a.dispatchEvent(event);
};
