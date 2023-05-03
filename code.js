//collect the selected node and it's length
const selectedNodes = figma.currentPage.selection.length;
const nodes = figma.currentPage.selection;

//handle if no node is selected
if (selectedNodes === 0) {
  figma.closePlugin("Must choose anyone of the element");
}

//IIFE
(async () => {
  //fetch the images from unsplash & have count of selected nodes
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=person&count=${selectedNodes}&client_id=_o_m_ilgeQIiAH2ZXGoR6_0vvtr2MjbNew4zRcjAZhc&fit=fill&w=200&h=200`
  );
  //convert to Object
  const json = await response.json();

  for (let i = 0; i < selectedNodes; i++) {
    //pull out the an hotlink in thumb size
    const img = await json[i].urls.regular;

    // Get an image from a URL
    figma.createImageAsync(img).then(async (image) => {
      // Render the image by filling the node.
      nodes[i].fills = [
        {
          type: "IMAGE",
          imageHash: image.hash,
          scaleMode: "FILL",
        },
      ];

      //close the plugin once every node filled with image
      if (nodes[nodes.length - 1].fills[0].imageHash === image.hash) {
        setTimeout(() => {
          figma.closePlugin("Images generated successfully:)");
        }, 100);
      }
    });
  }
})();
