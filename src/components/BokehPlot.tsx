import * as React from 'react';
import * as Bokeh from 'bokehjs';
import { backendURL } from '../settings';

import { CircularProgress } from '@material-ui/core';

const BokehPlot = React.memo((props: { source: string }) => {
  const id = "bokeh" + props.source;

  React.useEffect(() => {
    fetch(backendURL + props.source).then(r=>r.json()).then((data) => {
      const container = document.getElementById(id);
      while (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
      Bokeh.embed.embed_item(data, id);
    });
  }, [props.source]);

  return (
    <div id={id}>
      <CircularProgress />
    </div>
  );
});

export default BokehPlot;
