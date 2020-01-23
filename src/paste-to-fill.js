// https://github.com/sketch-hq/SketchAPI
const { Style } = require('sketch');

function fillObject(imgData, selectedLayers, layersCount) {
  for (let i = 0; i < layersCount; i += 1) {
    const layer = selectedLayers[i];
    const fill = layer
      .style()
      .fills()
      .firstObject();
    const image = NSImage.alloc().initWithData(imgData);

    // https://developer.sketch.com/reference/api/#stylefilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L9
    fill.setFillType(4);
    fill.setImage(MSImageData.alloc().initWithImage(image));

    // https://developer.sketch.com/reference/api/#stylepatternfilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L25
    fill.setPatternFillType(1);
  }
}

export default function(context) {
  const doc = context.document;
  const pasteBoard = NSPasteboard.generalPasteboard();

  // copy image via Chrome
  const imgData = pasteBoard.dataForType(NSPasteboardTypePNG);
  // copy image via Safari
  const imgTiffData = pasteBoard.dataForType(NSPasteboardTypeTIFF);

  const selectedLayers = context.selection;
  const layersCount = selectedLayers.count();

  if (layersCount === 0) {
    doc.showMessage('please select a layer:)');
    return;
  }

  if (imgData) {
    fillObject(imgData, selectedLayers, layersCount);
    return;
  }

  if (imgTiffData) {
    fillObject(imgTiffData, selectedLayers, layersCount);
  }
}
