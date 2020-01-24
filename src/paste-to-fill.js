function initImageData(image) {
  if (MSImageData.alloc().initWithImage_convertColorSpace !== undefined) { 
    return MSImageData.alloc().initWithImage_convertColorSpace(image, false); 
  } 
  return MSImageData.alloc().initWithImage(image); 
}

function fillObject(image, selectedLayers, layersCount) {
  for (let i = 0; i < layersCount; i += 1) {
    const layer = selectedLayers[i];
    const fill = layer
      .style()
      .fills()
      .firstObject();

    // https://developer.sketch.com/reference/api/#stylefilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L9
    fill.setFillType(4);
    fill.setImage(initImageData(image));

    // https://developer.sketch.com/reference/api/#stylepatternfilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L25
    fill.setPatternFillType(1);
  }
}

export default function(context) {
  const doc = context.document;
  const pasteBoard = NSPasteboard.generalPasteboard();

  //copy file url from Finder
  const fileURL = pasteBoard.stringForType(NSPasteboardTypeFileURL);
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

  if (fileURL) {
    const image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(fileURL));
    fillObject(image, selectedLayers, layersCount);
    return;
  }

  if (imgData) {
    fillObject(NSImage.alloc().initWithData(imgData), selectedLayers, layersCount);
    return;
  }

  if (imgTiffData) {
    fillObject(NSImage.alloc().initWithData(imgTiffData), selectedLayers, layersCount);
  }
}
